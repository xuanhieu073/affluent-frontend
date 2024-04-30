/**
 * @file jus importing pug files
 */

const req = require.context('../pug/pages', true, /\.pug/);
req.keys().forEach((fileName) => {
  req(fileName);
});
