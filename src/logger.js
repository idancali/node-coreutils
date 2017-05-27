const chalk = require('chalk')

const logger  = {

  log: function(text) {
    console.log(text);
  },

  // Second level logging
  ok: function (text) {
    logger.log(chalk.green('   ✔ ') + chalk.dim(text));
  },

  skip: function (text){
    logger.log(chalk.cyan('   ★ ') + chalk.dim(text));
  },

  fail: function (text){
    logger.log(chalk.red('   ✗ ') + chalk.dim(text));
  },

  // First level logging
  done: function (text) {
    logger.log(chalk.dim('  Done ') + chalk.green('✔') + "\n");
  },

  info: function (text) {
    logger.log(chalk.bold('➡ ') + chalk.bold(text));
  },

  // Top level logging
  footer: function (text) {
    logger.header(text);
  },

  header: function (text) {
    var char      = "—";
    var space     = " ";
    var max       = 80;
    var spacing   = 2;
    var buffer    = (text.length % 2);
    var padding   = (max - spacing * 2 - text.length + buffer) / 2;
    var line      = char.repeat(max);

    logger.log("");
    logger.log(chalk.bold(char.repeat(padding) + space.repeat(spacing) +
                text.toUpperCase() +
                space.repeat(spacing) + char.repeat(padding - buffer)));
    logger.log("");
  },

  error: function (text) {
    logger.log(chalk.bgRed.bold(text));
  },

  asset: function(category, file) {
    var attributes = chalk.cyan(category);
    attributes    += chalk.dim(" ❯ ");
    attributes    += chalk.bold(file.path ? path.basename(file.path) : file);
    logger.log("   " + attributes);
  },

  cache: function (fromCache, entry) {
   var attributes = chalk.dim(entry.locale);
   attributes += chalk.dim(" ❯ ");

   if (entry.type === 'component') {
     attributes += chalk.dim(entry.page);
     attributes += chalk.dim(" ❯ ");
     attributes += chalk.cyan(entry.component);
     attributes += chalk.dim (" ❯ ");
     attributes += chalk.bold(entry.componentFileType);
   } else if (entry.type === 'page') {
     attributes += chalk.cyan(entry.page);
     attributes += chalk.dim (" ❯ ");
     attributes += chalk.bold(entry.pageFileType);
   } else {
     attributes += chalk.dim(entry.source + ":") + chalk.bold(entry.file);
   }
   logger.log("   " + (fromCache ? chalk.green("[FROM CACHE]") : chalk.green.bold("[NOW CACHED]")) + " " + attributes);
  },

  fromCache: function (entry) {
    logger.cache(true, entry);
  },

  toCache: function (entry) {
    logger.cache(false, entry);
  },
}

module.exports = logger
