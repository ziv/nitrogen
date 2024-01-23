#!ts-node-esm
if (process.argv.length !== 3) {
  console.error('./scripts/generate-data.ts <data file>');
  process.exit(1);
}

const file = process.argv[2];
import('../' + file)
  .then(o => process.stdout.write(JSON.stringify(o.default) + '\n'))
  .finally(() => process.exit(0));
