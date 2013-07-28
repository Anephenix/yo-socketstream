module.exports = function (context) {
  // Generate directories and files for the app

  var directories = [
    'client',
    'client/code',
    'client/code/app',
    'client/code/libs',
    'client/css',
    'client/css/libs',
    'client/static',
    'client/static/images',
    'client/templates',
    'client/views',
    'server',
    'server/middleware',
    'server/rpc'
  ];

  var filesToCopyAsIs = [
    'client/code/libs/jquery.min.js',
    'client/static/favicon.ico',
    'client/static/images/logo.png',
    'client/templates/.gitkeep',
    'server/middleware/.gitkeep',
    'server/rpc/.gitkeep',
    'README.md'
  ];

  directories.forEach(function (directory) {
    context.mkdir(directory);
  });

  filesToCopyAsIs.forEach(function (file) {
    context.copy(file, file);
  });

  // Keep a record of what choices the developer made,
  // so that we can use those to generate the directories
  // and files based on their choices

  var scriptChoice    = context.coffee ? 'coffee' : 'js';
  var demoChoice      = context.demo   ? 'demo'   : 'minimal';
  var templateChoice  = context.jade   ? 'jade'   : 'html';

  // Generate the rest of the files and directories based on the
  // choices of the developer

  context.copy('client/code/app/app.'+demoChoice+'.'+scriptChoice  , 'client/code/app/app.'+scriptChoice);
  context.copy('client/views/app.'+demoChoice+'.'+templateChoice   , 'client/views/app.'+templateChoice);
  context.copy('client/css/app.'+demoChoice+'.styl'                , 'client/css/app.styl');
  context.copy('client/code/app/entry.'+scriptChoice               , 'client/code/app/entry.'+scriptChoice);      
  context.copy('server/middleware/example.'+scriptChoice           , 'server/middleware/example.'+scriptChoice);

  if (context.demo) {
    // generate extra files for the app containing the demo example
    context.copy('server/rpc/demo.'+scriptChoice                   , 'server/rpc/demo.'+scriptChoice);
    context.mkdir('client/templates/chat');
    context.copy('client/templates/chat/message.'+templateChoice   , 'client/templates/chat/message.'+templateChoice);
    context.copy('client/css/libs/reset.css'                       , 'client/css/libs/reset.css');
  }

}