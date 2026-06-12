// Records a treasury purchase: moves the current weeklyFees total into
// totalSpent/purchases and resets weeklyFees to 0. Run manually via
// .github/workflows/record-purchase.yml (Actions tab > Run workflow).

import { readFile, writeFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_PATH = join(__dirname, '..', 'data', 'fee-stats.json');

const tokenName = process.env.TOKEN_NAME;
const tokenSymbol = process.env.TOKEN_SYMBOL || '';
const tokenCa = process.env.TOKEN_CA || '';

if (!tokenName) {
  console.error('TOKEN_NAME is required.');
  process.exit(1);
}

const raw = await readFile(DATA_PATH, 'utf-8');
const stats = JSON.parse(raw);

const feesUsed = stats.weeklyFees;
const purchase = {
  tokenName,
  tokenSymbol,
  tokenCa,
  feesUsed,
  date: new Date().toISOString(),
};

stats.totalSpent += feesUsed;
stats.purchases = [purchase, ...stats.purchases];
stats.weeklyFees = 0;
stats.lastReset = purchase.date;

await writeFile(DATA_PATH, JSON.stringify(stats, null, 2) + '\n');
console.log(`Recorded purchase: ${feesUsed} SOL -> ${tokenName} (${tokenSymbol})`);
