'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var SocketstreamGenerator = module.exports = function SocketstreamGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(SocketstreamGenerator, yeoman.generators.Base);

SocketstreamGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = require('./prompts');

  this.prompt(prompts, function (props) {
    this.demo     = props.demo;
    this.coffee   = props.coffee;
    this.jade     = props.jade;
    cb();
  }.bind(this));
};

SocketstreamGenerator.prototype.app = function app() {
  require('./generator')(this);
  require('./generateAppFile')(this);
  require('./generatePackageFile')(this);
};

SocketstreamGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('bowerrc', '.bowerrc');
  this.copy('editorconfig', '.editorconfig');
  this.copy('gitignore', '.gitignore');
  this.copy('jshintrc',     '.jshintrc');
};