export const SHIP = Object.freeze({ w: 40, h: 12 });
export const BUILDING = Object.freeze({ w: 6, h: 6 });
export const BUILD_SECONDS = 6;
export const DRONE_SPEED = 24;
export const MAX_SITES = 1000;
export const overlaps = (a, b) => a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
const point = p => p && Number.isFinite(p.x) && Number.isFinite(p.y) && Math.abs(p.x) <= 1e9 && Math.abs(p.y) <= 1e9;
const grid = p => point(p) && Number.isInteger(p.x) && Number.isInteger(p.y);
const footprint = (p, size) => grid(p) && p.w === size.w && p.h === size.h;
export function newConstruction() {
  return { ship: null, pending: { x: -20, y: -6 }, sites: [], cursor: 0, drone: null };
}
export function validateConstruction(game) {
  if (!game || !Array.isArray(game.sites) || game.sites.length > MAX_SITES || !Number.isInteger(game.cursor) || game.cursor < 0 || game.cursor > game.sites.length) throw new Error('Invalid construction state.');
  if (!game.ship) {
    if (!grid(game.pending) || game.sites.length || game.cursor || game.drone !== null) throw new Error('Invalid landing state.');
    return game;
  }
  if (!footprint(game.ship, SHIP) || game.pending !== null || !point(game.drone) || !['idle','outbound','building','returning'].includes(game.drone.stage)) throw new Error('Invalid ship or drone state.');
  for (let i = 0; i < game.sites.length; i++) {
    const site = game.sites[i];
    if (!footprint(site, BUILDING) || !Number.isFinite(site.progress) || site.progress < 0 || site.progress > 1 || (i < game.cursor ? site.progress !== 1 : i > game.cursor && site.progress !== 0) || overlaps(site, game.ship)) throw new Error('Invalid building state.');
    for (let j = 0; j < i; j++) if (overlaps(site, game.sites[j])) throw new Error('Saved buildings overlap.');
  }
  if (['outbound','building'].includes(game.drone.stage) && game.cursor >= game.sites.length) throw new Error('Drone target is missing.');
  return game;
}
export function canPlace(game, rect) {
  if (!grid(rect)) return false;
  return (!game.ship || !overlaps(game.ship, rect)) && !game.sites.some(site => overlaps(site, rect));
}
export function clearFootprint(world, rect) {
  for (let y = rect.y; y < rect.y + rect.h; y++) for (let x = rect.x; x < rect.x + rect.w; x++) {
    const value = world.tile(x, y);
    if (value & 8) world.state.setTile(x, y, value & ~8);
  }
}
export function land(world, game) {
  if (game.ship || !grid(game.pending)) return false;
  game.ship = { ...game.pending, ...SHIP }; game.pending = null;
  clearFootprint(world, game.ship);
  game.drone = { x: game.ship.x + SHIP.w / 2, y: game.ship.y + SHIP.h / 2, stage: 'idle' };
  return true;
}
export function placeBuilding(world, game, position) {
  const rect = { ...position, ...BUILDING };
  if (!game.ship || game.sites.length >= MAX_SITES || !canPlace(game, rect)) return false;
  clearFootprint(world, rect); game.sites.push({ ...rect, progress: 0 }); return true;
}
// One active drone, O(1) work per update plus completed queue transitions.
// No terrain queries, camera coordinates or render-cache state are consulted.
export function advanceConstruction(game, seconds) {
  if (!game?.ship || !Number.isFinite(seconds) || seconds <= 0) return false;
  const d = game.drone; let changed = false;
  while (seconds > 1e-8) {
    if (d.stage === 'idle') {
      if (game.cursor >= game.sites.length) break;
      d.stage = 'outbound'; changed = true;
    }
    const site = game.sites[game.cursor];
    if (d.stage === 'building') {
      const needed = (1 - site.progress) * BUILD_SECONDS, used = Math.min(seconds, needed);
      site.progress = Math.min(1, site.progress + used / BUILD_SECONDS); seconds -= used; changed = true;
      if (used >= needed) { site.progress = 1; game.cursor++; d.stage = 'returning'; }
      else break;
    } else {
      const target = d.stage === 'returning' ? game.ship : site;
      const tx = target.x + target.w / 2, ty = target.y + target.h / 2;
      const distance = Math.hypot(tx - d.x, ty - d.y), needed = distance / DRONE_SPEED;
      if (seconds >= needed) {
        d.x = tx; d.y = ty; seconds -= needed; d.stage = d.stage === 'returning' ? 'idle' : 'building'; changed = true;
      } else {
        const t = seconds / needed; d.x += (tx - d.x) * t; d.y += (ty - d.y) * t; changed = true; break;
      }
    }
  }
  return changed;
}
