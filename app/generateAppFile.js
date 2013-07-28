module.exports = function (context) {

  // We use this to track files that need to 
  // be passed as a variable in the 
  var clientFiles = {
    code: ['libs/jquery.min.js', 'app'],
    css:  []
  };

  // This is the list of formatters to load in the app file
  //
  var formattersToInclude  = [];
  if (context.coffee) { formattersToInclude.push('ss-coffee'); }
  if (context.jade)   { formattersToInclude.push('ss-jade'); }
  formattersToInclude.push('ss-stylus');

  // Tis is used for generating the view path in the  
  var templateChoice    = context.jade ? 'jade' : 'html';

  // Sort the css files, depending on whether the 
  // developer chose to include demo example files
  if (context.demo) { clientFiles.css.push('libs/reset.css'); }
  clientFiles.css.push('app.styl');

  // Start producing the app file's content
  if (context.coffee) {
    // produce an app.coffee file
    var appcoffee =   ""
    appcoffee     +=  "# My SocketStream 0.3 app\n\n"
    appcoffee     +=  "http = require 'http'\n"
    appcoffee     +=  "ss   = require 'socketstream'\n\n"
    appcoffee     +=  "# Define a single-page client called 'main'\n"
    appcoffee     +=  "ss.client.define 'main',\n"
    appcoffee     +=  "  view: 'app." + templateChoice + "',\n"
    appcoffee     +=  "  css:  ['" + clientFiles.css.join("', '") + "']\n"
    appcoffee     +=  "  code: ['" + clientFiles.code.join("', '") + "']\n"
    appcoffee     +=  "  tmpl: '*'\n\n"
    appcoffee     +=  "# Serve this client on the root URL\n"
    appcoffee     +=  "ss.http.route '/', (req, res) ->\n"
    appcoffee     +=  "  res.serveClient 'main' \n\n"

    // Add a section for loading code formatters, if any code formatters
    // were selected
    if (formattersToInclude.length > 0) {
      appcoffee   +=  "# Code formatters\n"
      formattersToInclude.forEach(function(formatter){
        appcoffee +=  "ss.client.formatters.add require '" + formatter + "'\n"
      });
      appcoffee   +=  "\n"
    };

    appcoffee     += "# Use server-side compiled Hogan (Mustache) templates. Others engines available\n"
    appcoffee     += "ss.client.templateEngine.use require 'ss-hogan'\n\n"
    appcoffee     += "# Minimize and pack assets if you type: SS_ENV=production node app.js\n"
    appcoffee     += "if ss.env is 'production' then ss.client.packAssets()\n\n"
    appcoffee     += "# Start web server\n"
    appcoffee     += "server = http.Server ss.http.middleware\n"
    appcoffee     += "server.listen 3000\n\n"
    appcoffee     += "# Start SocketStream\n"
    appcoffee     += "ss.start server\n"
    
    context.write('app.coffee', appcoffee);

  } else {
    
    // produce an app.js file
    var appjs =   ""
    appjs     +=  "// My SocketStream 0.3 app\n\n"
    appjs     +=  "var http = require('http'),\n"
    appjs     +=  "    ss   = require('socketstream');\n\n"
    appjs     +=  "// Define a single-page client called 'main'\n"
    appjs     +=  "ss.client.define('main', {\n"
    appjs     +=  "  view: 'app." + templateChoice + "',\n"
    appjs     +=  "  css:  ['" + clientFiles.css.join("', '") + "'],\n"
    appjs     +=  "  code: ['" + clientFiles.code.join("', '") + "'],\n"
    appjs     +=  "  tmpl: '*'\n"
    appjs     +=  "});\n\n"
    appjs     +=  "// Serve this client on the root URL\n"
    appjs     +=  "ss.http.route('/', function(req, res){\n"
    appjs     +=  "  res.serveClient('main');\n"
    appjs     +=  "});\n\n"

    // Add a section for loading code formatters, if any code formatters
    // were selected
    if (formattersToInclude.length > 0) {
      appjs   +=  "// Code formatters\n"
      formattersToInclude.forEach(function(formatter){
        appjs +=  "ss.client.formatters.add(require('" + formatter + "'));\n"
      });
      appjs   +=  "\n"
    };

    appjs     += "// Use server-side compiled Hogan (Mustache) templates. Others engines available\n"
    appjs     += "ss.client.templateEngine.use(require('ss-hogan'));\n\n"
    appjs     += "// Minimize and pack assets if you type: SS_ENV=production node app.js\n"
    appjs     += "if (ss.env === 'production') ss.client.packAssets();\n\n"
    appjs     += "// Start web server\n"
    appjs     += "var server = http.Server(ss.http.middleware);\n"
    appjs     += "server.listen(3000);\n\n"
    appjs     += "// Start SocketStream\n"
    appjs     += "ss.start(server);\n"

    context.write('app.js', appjs);

  }

}