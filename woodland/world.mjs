export const CHUNK_SIZE = 32;
export const LEGACY_GENERATOR = 'woodland-perlin-v1';
export const CURRENT_GENERATOR = 'steel-space-biomes-v2';
export const DEFAULTS = Object.freeze({ seed: 'woodland-01', scale: 48, detail: 3, density: 38 });

export function seedHash(text) {
  let h = 2166136261;
  for (const c of String(text)) h = Math.imul(h ^ c.codePointAt(0), 16777619);
  return h >>> 0;
}

// Coordinate hashing avoids the short, repeating permutation table of classic Perlin.
export function hash(x, y, seed) {
  let h = Math.imul(x | 0, 0x1f123bb5) ^ Math.imul(y | 0, 0x5f356495) ^ seed;
  h = Math.imul(h ^ (h >>> 16), 0x7feb352d);
  h = Math.imul(h ^ (h >>> 15), 0x846ca68b);
  return (h ^ (h >>> 16)) >>> 0;
}
const fade = t => t * t * t * (t * (t * 6 - 15) + 10);
const lerp = (a, b, t) => a + (b - a) * t;
const gradients = [[1,0],[-1,0],[0,1],[0,-1],[Math.SQRT1_2,Math.SQRT1_2],[-Math.SQRT1_2,Math.SQRT1_2],[Math.SQRT1_2,-Math.SQRT1_2],[-Math.SQRT1_2,-Math.SQRT1_2]];

export function perlin(x, y, seed) {
  const ix = Math.floor(x), iy = Math.floor(y), fx = x - ix, fy = y - iy;
  const dot = (dx, dy) => {
    const g = gradients[hash(ix + dx, iy + dy, seed) & 7];
    return g[0] * (fx - dx) + g[1] * (fy - dy);
  };
  return lerp(lerp(dot(0,0), dot(1,0), fade(fx)), lerp(dot(0,1), dot(1,1), fade(fx)), fade(fy));
}

// Authoritative mutable state is separate from all disposable generation/render caches.
// This initial layer stores sparse tile overrides. Future factory entities and their
// simulation scheduler belong here/alongside it, never in viewport-owned chunks.
export class WorldState {
  constructor() { this.edits = new Map(); this.revision = 0; }
  setTile(x, y, value) {
    x = Math.floor(x); y = Math.floor(y);
    const cx = Math.floor(x / CHUNK_SIZE), cy = Math.floor(y / CHUNK_SIZE);
    const key = `${cx},${cy}`, index = (y - cy * CHUNK_SIZE) * CHUNK_SIZE + x - cx * CHUNK_SIZE;
    if (value === null) {
      const edits = this.edits.get(key);
      if (!edits?.delete(index)) return;
      if (!edits.size) this.edits.delete(key);
    } else {
      if (!Number.isInteger(value) || value < 0 || value > 127) throw new RangeError('Tile value must be an integer from 0 to 127.');
      if (!this.edits.has(key)) this.edits.set(key, new Map());
      this.edits.get(key).set(index, value);
    }
    this.revision++;
  }
  chunkEdits(cx, cy) { return this.edits.get(`${cx},${cy}`); }
}

export class World {
  constructor(settings = DEFAULTS, cacheLimit = 96, state = new WorldState(), generator = LEGACY_GENERATOR) {
    if (![LEGACY_GENERATOR, CURRENT_GENERATOR].includes(generator)) throw new Error('Unsupported terrain generator.');
    this.generator = generator;
    this.settings = Object.freeze({
      seed: String(settings.seed ?? DEFAULTS.seed),
      scale: Math.max(8, Math.min(160, Number(settings.scale) || DEFAULTS.scale)),
      detail: Math.max(1, Math.min(5, Math.round(Number(settings.detail) || DEFAULTS.detail))),
      density: Math.max(0, Math.min(100, Number(settings.density) || 0)),
    });
    this.seed = seedHash(this.settings.seed);
    this.state = state;
    this.cacheLimit = Math.max(1, Math.floor(cacheLimit));
    this.chunks = new Map();
    this.generated = 0;
  }
  field(x, y) {
    let sum = 0, weight = 1, total = 0, frequency = 1 / this.settings.scale;
    for (let i = 0; i < this.settings.detail; i++) {
      sum += perlin((x + 0.5) * frequency + 17.31, (y + 0.5) * frequency - 8.73, this.seed + i * 1013) * weight;
      total += weight;
      weight *= 0.5;
      frequency *= 2;
    }
    return Math.max(0, Math.min(1, 0.5 + sum / total * 1.35));
  }
  sample(x, y) {
    const f = this.field(x, y);
    const t = Math.max(0, Math.min(1, (f - 0.27) / 0.43));
    const grassland = this.isGrassland(x, y);
    const chance = grassland ? 0 : t * t * (3 - 2 * t) * this.settings.density / 100 * 0.92;
    const tree = hash(x, y, this.seed ^ 0xa31c29d7) / 4294967296 < chance;
    // Low 3 bits: grass shade. Bit 3: tree. High 2 bits: tree variant.
    return Math.min(7, Math.floor(f * 8)) | (tree ? 8 : 0) | ((hash(x, y, this.seed ^ 7793) & 3) << 4) | (grassland ? 64 : 0);
  }
  isGrassland(x, y) {
    return this.generator === CURRENT_GENERATOR && perlin((x + .5) / 180 + 41.7, (y + .5) / 180 - 29.3, this.seed ^ 0x6ab20c91) > -.02;
  }
  chunk(cx, cy) {
    const key = `${cx},${cy}`;
    let data = this.chunks.get(key);
    if (data) {
      this.chunks.delete(key);
      this.chunks.set(key, data);
      return data;
    }
    data = new Uint8Array(CHUNK_SIZE * CHUNK_SIZE);
    for (let y = 0; y < CHUNK_SIZE; y++) for (let x = 0; x < CHUNK_SIZE; x++) {
      data[y * CHUNK_SIZE + x] = this.sample(cx * CHUNK_SIZE + x, cy * CHUNK_SIZE + y);
    }
    this.chunks.set(key, data);
    this.generated++;
    if (this.chunks.size > this.cacheLimit) this.chunks.delete(this.chunks.keys().next().value);
    return data;
  }
  tile(x, y) {
    x = Math.floor(x); y = Math.floor(y);
    const cx = Math.floor(x / CHUNK_SIZE), cy = Math.floor(y / CHUNK_SIZE);
    const index = (y - cy * CHUNK_SIZE) * CHUNK_SIZE + x - cx * CHUNK_SIZE;
    return this.state.chunkEdits(cx,cy)?.get(index) ?? this.chunk(cx, cy)[index];
  }
  isTree(x, y) { return (this.tile(x, y) & 8) !== 0; }
}
