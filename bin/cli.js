#!/usr/bin/env node
'use strict';

const sao = require('sao');
const cac = require('cac');
const chalk = require('chalk');
const { resolve } = require('path');
const { version } = require('../package.json');

const generator = resolve(__dirname, '..');

const cli = cac('@fmatzy/create-ts-app');

cli
  .command('[out-dir]', 'Generate in a custom directory or current directory')
  .option('--verbose', 'Show debug logs')
  .action((outDir = '.', cliOptions) => {
    console.log();
    console.log(chalk`{gray @fmatzy/}{cyan create-ts-app} {orange v${version}}`);
    console.log(chalk`✨  Generating TypeScript project in {cyan ${outDir}}`);

    const { verbose, answers } = cliOptions;
    const logLevel = verbose ? 4 : 2;
    // See https://saojs.org/api.html#standalone-cli
    sao({ generator, outDir, logLevel, cliOptions })
      .run()
      .catch(err => {
        console.trace(err);
        process.exit(1);
      });
  });

cli.help();

cli.version(version);

cli.parse();
