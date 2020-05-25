#!/usr/bin/env node
const mdLinks = require('./mdLinks.js');

const statsOption = (arrayOfMDLinks) => {
  const totalLinks = arrayOfMDLinks.length;
  const uniqueLinks = new Set(arrayOfMDLinks.map((element) => element.href)).size;
  if (totalLinks === 0) {
    return 'There is 0 Links in this path! Try another one!';
  }
  const statsTemplate = `
    Final Stats:
    👌TOTAL: ${totalLinks}
    👍UNIQUE: ${uniqueLinks}
      `;
  return statsTemplate;
};

const statsValidate = (arrayOfMDLinks) => {
  const totalLinks = arrayOfMDLinks.length;
  const uniqueLinks = new Set(arrayOfMDLinks.map((element) => element.href)).size;
  const brokenLinks = new Set(arrayOfMDLinks.filter((href) => (href.status >= 400))).size;
  const statsValidateTemplate = `
    Final Stats Validate
    👌TOTAL: ${totalLinks}
    👍UNIQUE: ${uniqueLinks}
    👎BROKEN: ${brokenLinks}
      `;
  return statsValidateTemplate;
};
const help = `
Remember that to use this library you need to insert:
👉 md-links <path-to-file>
👉 md-links <path-to-file> [valid arguments]
*****************Valid Arguments*****************
⭐md-links <path-to-file> --validate   --stats
⭐md-links <path-to-file> --v   --s
⭐md-links <path-to-file> --V   --S
⭐md-links <path-to-file> --validate
⭐md-links <path-to-file> --stats
*************************************************
`;
const route = process.argv[2]; // argumento 2
const arg1 = process.argv[3]; // argumento 3
const arg2 = process.argv[4]; // argumento 4

const cliFunction = (route, arg1, arg2) => {
  if (route === '--help' || arg1 === '--help' || arg2 === '--help') {
    console.log(help);
  }
  if ((route === undefined) && (arg1 === undefined) && (arg2 === undefined)) {
    console.log(help);
  }
  if ((route) && (arg1 === undefined) && (arg2 === undefined)) {
    return mdLinks(route, { validate: false })
      .then((links) => console.table(links))
      .catch((error) => console.error('Invalid path'));
  }
  if ((arg1 === '--validate' || arg1 === '--v' || arg1 === '--V') && (arg2 === '--stats' || arg2 === '--s' || arg2 === '--S')) {
    return mdLinks(route, { validate: true })
      .then((links) => console.table(statsValidate(links)))
      .catch((error) => console.log(error));
  }
  if ((arg1 === '--validate' || arg1 === '--v' || arg1 === '--V') && (arg2 === undefined)) {
    return mdLinks(route, { validate: true })
      .then((links) => console.log(links))
      .catch((error) => console.log(help));
  }
  if ((arg1 === '--stats' || arg1 === '--s' || arg1 === '--S') && (arg2 === undefined)) {
    return mdLinks(route, { validate: false })
      .then((links) => console.log(statsOption(links)))
      .catch((error) => console.error(error));
  }
  if ((arg1 === '--stats' || arg1 === '--s' || arg1 === '--S') && (arg2 === '--validate' || arg2 === '--v' || arg2 === '--V')) {
    return mdLinks(route, { validate: true })
      .then((links) => console.table(statsValidate(links)))
      .catch((error) => console.error(error));
  }
};
cliFunction(route, arg1, arg2);
module.exports = { cliFunction };
