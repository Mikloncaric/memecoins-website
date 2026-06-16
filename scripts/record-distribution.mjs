// Records a holder distribution: appends an entry to data/distributions.json.
// Run manually via .github/workflows/record-distribution.yml (Actions tab > Run workflow).

import { readFile, writeFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_PATH = join(__dirname, '..', 'data', 'distributions.json');

const tokenName = process.env.TOKEN_NAME;
if (!tokenName) {
  console.error('TOKEN_NAME is required.');
  process.exit(1);
}

const num = (v) => {
  const n = parseFloat(v);
  return Number.isFinite(n) ? n : 0;
};

const entry = {
  date: new Date().toISOString(),
  tokenName,
  tokenSymbol: process.env.TOKEN_SYMBOL || '',
  tokenCa: process.env.TOKEN_CA || '',
  tokenX: process.env.TOKEN_X || '',
  logo: process.env.LOGO || '',
  category: (process.env.CATEGORY || 'pick').toLowerCase() === 'collab' ? 'collab' : 'pick',
  tokenAmount: num(process.env.TOKEN_AMOUNT),
  usdValue: num(process.env.USD_VALUE),
  holders: Math.round(num(process.env.HOLDERS)),
};

const raw = await readFile(DATA_PATH, 'utf-8');
const data = JSON.parse(raw);
data.distributions = [entry, ...(data.distributions || [])];

await writeFile(DATA_PATH, JSON.stringify(data, null, 2) + '\n');
console.log(`Recorded distribution: $${entry.usdValue} of ${tokenName} (${entry.tokenSymbol}) to ${entry.holders} holders [${entry.category}]`);
