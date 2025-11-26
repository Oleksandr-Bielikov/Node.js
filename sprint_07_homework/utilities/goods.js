import { readFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function getGoods() {
  const filePath = join(__dirname, '../data/goods.json');
  const data = await readFile(filePath, 'utf-8');
  return JSON.parse(data);
}
