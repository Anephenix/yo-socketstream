module.exports = function (context) {

  // Check what dependencies to include in the app
  var dependenciesToInclude  = [];
  if (context.coffee) { dependenciesToInclude.push('ss-coffee'); }
  if (context.jade)   { dependenciesToInclude.push('ss-jade'); }
  dependenciesToInclude.push('ss-stylus');
  dependenciesToInclude.push('ss-hogan');

  var startCommand = context.coffee ? "coffee app.coffee" : "node app.js";

  var pkgJson   =   "";
  pkgJson       +=  "{\n";
  pkgJson       +=  '  "name": "TODO_GET_APP_NAME",\n'
  pkgJson       +=  '  "description": "An awesome real time application",\n'
  pkgJson       +=  '  "version": "0.0.1",\n'
  pkgJson       +=  '  "author": "Me <me@mydomain.com>",\n'
  pkgJson       +=  '  "private": true,\n',
  pkgJson       +=  '  "engines": { "node": ">= 0.6.0" },\n'
  pkgJson       +=  '  "dependencies": {\n'
  pkgJson       +=  '    "socketstream": "0.3.x",\n'


  // Add dependencies based on the developer's choices
  dependenciesToInclude.forEach(function (dependency) {
    var comma = dependenciesToInclude.indexOf(dependency) === dependenciesToInclude.length-1 ? "" : ","; 
    pkgJson     +=  '    "' + dependency + '": "0.1.x"' + comma + '\n'
  });

  pkgJson       +=  '  },\n'
  pkgJson       +=  '  "scripts":{\n'
  pkgJson       +=  '    "start": "' + startCommand + '",\n' 
  pkgJson       +=  '    "test": "echo \\"Error: no test specified\\" && exit 1"\n' 
  pkgJson       +=  '  }\n'
  pkgJson       +=  '}\n'

  context.write('package.json', pkgJson);

}