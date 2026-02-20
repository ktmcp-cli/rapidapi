import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import { getConfig, setConfig, isConfigured } from './config.js';
import { listItems, getItem, createItem, updateItem, deleteItem } from './api.js';

const program = new Command();

function printSuccess(message) {
  console.log(chalk.green('✓') + ' ' + message);
}

function printError(message) {
  console.error(chalk.red('✗') + ' ' + message);
}

function printJson(data) {
  console.log(JSON.stringify(data, null, 2));
}

async function withSpinner(message, fn) {
  const spinner = ora(message).start();
  try {
    const result = await fn();
    spinner.stop();
    return result;
  } catch (error) {
    spinner.stop();
    throw error;
  }
}

function requireAuth() {
  if (!isConfigured()) {
    printError('API key not configured.');
    console.log('\nRun the following to configure:');
    console.log(chalk.cyan('  rapidapi config set --api-key YOUR_API_KEY'));
    process.exit(1);
  }
}

program
  .name('rapidapi')
  .description(chalk.bold('IdealSpot GeoData CLI') + ' - hyperlocal demographics and market intelligence from your terminal')
  .version('1.0.0');

const configCmd = program.command('config').description('Manage CLI configuration');

configCmd
  .command('set')
  .description('Set configuration values')
  .option('--api-key <key>', 'API key')
  .option('--base-url <url>', 'Base URL for API')
  .action((options) => {
    if (options.apiKey) {
      setConfig('apiKey', options.apiKey);
      printSuccess('API key set');
    }
    if (options.baseUrl) {
      setConfig('baseURL', options.baseUrl);
      printSuccess('Base URL set');
    }
    if (!options.apiKey && !options.baseUrl) {
      printError('No options provided. Use --api-key or --base-url');
    }
  });

configCmd
  .command('show')
  .description('Show current configuration')
  .action(() => {
    const apiKey = getConfig('apiKey');
    const baseURL = getConfig('baseURL');
    console.log(chalk.bold('\nIdealSpot GeoData CLI Configuration\n'));
    console.log('API Key:  ', apiKey ? chalk.green(apiKey.substring(0, 6) + '...') : chalk.red('not set'));
    console.log('Base URL: ', chalk.cyan(baseURL));
    console.log('');
  });

program
  .command('list')
  .description('List items')
  .option('--json', 'Output as JSON')
  .action(async (options) => {
    requireAuth();
    try {
      const data = await withSpinner('Fetching items...', () => listItems());
      if (options.json) {
        printJson(data);
      } else {
        console.log(chalk.bold('\nItems\n'));
        console.log(data);
      }
    } catch (error) {
      printError(error.message);
      process.exit(1);
    }
  });

program
  .command('get <id>')
  .description('Get item by ID')
  .option('--json', 'Output as JSON')
  .action(async (id, options) => {
    requireAuth();
    try {
      const data = await withSpinner(`Fetching item ${id}...`, () => getItem(id));
      if (options.json) {
        printJson(data);
      } else {
        console.log(chalk.bold('\nItem Details\n'));
        console.log(data);
      }
    } catch (error) {
      printError(error.message);
      process.exit(1);
    }
  });

program.parse(process.argv);

if (process.argv.length <= 2) {
  program.help();
}
