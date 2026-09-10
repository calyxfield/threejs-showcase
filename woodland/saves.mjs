import {newEconomy,validateEconomy} from './economy.mjs';
import { WorldState, seedHash, LEGACY_GENERATOR, CURRENT_GENERATOR } from './world.mjs';
import { validateConstruction } from './construction.mjs';

export const STORAGE_KEY = 'woodland.worlds.v1';
export const GENERATOR = CURRENT_GENERATOR;
const finite = n => typeof n === 'number' && Number.isFinite(n);
const text = (s, max) => typeof s === 'string' && s.length <= max;

export function validateSave(save) {
  if (!save || ![1, 2, 3, 4, 5, 6, 7, 8, 9].includes(save.version) || ![LEGACY_GENERATOR, CURRENT_GENERATOR].includes(save.generator) || (save.version === 1 && save.generator !== LEGACY_GENERATOR)) throw new Error('This save uses an unsupported world version.');
  const { settings: s, camera: c, edits } = save;
  if (!text(save.id, 100) || !save.id || !text(save.name, 80) || !finite(save.updated) || !s || !text(s.seed, 80) || !finite(s.scale) || s.scale < 8 || s.scale > 160 || !Number.isInteger(s.detail) || s.detail < 1 || s.detail > 5 || !finite(s.density) || s.density < 0 || s.density > 100 || !c || !finite(c.x) || !finite(c.y) || Math.abs(c.x) > 1e12 || Math.abs(c.y) > 1e12 || !finite(save.zoom) || save.zoom < .01 || save.zoom > 60 || !Array.isArray(edits) || edits.length > 200000) throw new Error('A saved world has invalid data.');
  for (const edit of edits) if (!Array.isArray(edit) || edit.length !== 3 || !Number.isSafeInteger(edit[0]) || !Number.isSafeInteger(edit[1]) || !Number.isInteger(edit[2]) || edit[2] < 0 || edit[2] > (save.generator === LEGACY_GENERATOR ? 63 : 127)) throw new Error('A saved world has invalid tile changes.');
  if (save.version >= 2 && (save.generator === CURRENT_GENERATOR || save.construction !== null)) save.construction = validateConstruction(save.construction);
  if(save.version<6)save.economy=save.construction?newEconomy():null;
  if(save.economy!==null)validateEconomy(save.economy,save.construction,seedHash(s.seed));
  return save;
}
export function encodeSave(id, name, world, camera, zoom) {
  const edits = [];
  for (const [key, values] of world.state.edits) {
    const [cx, cy] = key.split(',').map(Number);
    for (const [index, value] of values) edits.push([cx * 32 + index % 32, cy * 32 + Math.floor(index / 32), value]);
  }
  return validateSave({ version: 9, generator: world.generator, id, name, updated: Date.now(), settings: { ...world.settings }, camera: { ...camera }, zoom, edits, economy: world.economy ? structuredClone(world.economy) : null, construction: world.construction ? structuredClone(world.construction) : null });
}
export function decodeState(save) {
  validateSave(save);
  const state = new WorldState();
  for (const [x, y, value] of save.edits) state.setTile(x, y, value);
  return state;
}
export function readSaves(storage = localStorage) {
  const raw = storage.getItem(STORAGE_KEY);
  if (!raw) return [];
  let data;
  try { data = JSON.parse(raw); } catch { throw new Error('Saved world data could not be read. Existing saves have been left untouched.'); }
  if (!data || data.version !== 1 || !Array.isArray(data.worlds)) throw new Error('Saved worlds use an unsupported storage format.');
  return data.worlds.map(validateSave).sort((a, b) => b.updated - a.updated);
}
export function writeSave(save, storage = localStorage) {
  validateSave(save);
  const worlds = readSaves(storage).filter(item => item.id !== save.id);
  worlds.unshift(save);
  storage.setItem(STORAGE_KEY, JSON.stringify({ version: 1, worlds }));
}
