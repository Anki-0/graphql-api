import path from 'path';
import { fileURLToPath } from 'url';
import { getRandomValues } from 'crypto';

export function getFilename(metaUrl: string) {
  const __filename = fileURLToPath(metaUrl);

  return __filename;
}

export function getDirname(metaUrl: string) {
  const __dirname = path.dirname(getFilename(metaUrl));

  return __dirname;
}

export function randomString(size: number) {
  const i2hex = (i: number) => ('0' + i.toString(16)).slice(-2);
  const r = (a: string, i: number): string => a + i2hex(i);
  const bytes = getRandomValues(new Uint8Array(size));
  return Array.from(bytes).reduce(r, '');
}
