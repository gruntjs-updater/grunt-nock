/*
 * grunt-nock
 * https://github.com/joshgummersall/grunt-nock
 *
 * Copyright (c) 2014 Josh Gummersall
 * Licensed under the MIT license.
 */

'use strict';

var fs = require('fs');
var nock = require('nock');

function NockCapture(options) {
  if (!(this instanceof NockCapture)) {
    return new NockCapture(options);
  }

  this.outputFile = options.outputFile;
  this.overwrite = options.overwrite;
  this.recordedNocks = [];
};

NockCapture.prototype.validateOptions = function() {
  return typeof(this.outputFile) === 'string';
};

NockCapture.prototype.writeFile = function(contents) {
  fs.writeFileSync(this.outputFile, contents);
};

// Overwrite old file if so prompted. We do this before the tasks are
// executed so that if the tasks require the same file we are outputting
// to it is an empty JSON file. Then the HTTP requests the task makes will
// not be replayed from the nock file and we capture fresh HTTP requests.
NockCapture.prototype.overwriteFile = function() {
  if (this.overwrite) {
    this.writeFile('{}');
  }
};

NockCapture.prototype.formatNocks = function() {
  var nockRequireStatement = 'var nock = require(\'nock\');\n';
  return [].concat(nockRequireStatement, this.recordedNocks).join('');
};

NockCapture.prototype.writeNockFile = function() {
  this.writeFile(this.formatNocks());
};

NockCapture.prototype.startRecording = function() {
  this.overwriteFile();
  nock.recorder.rec({dont_print: true});
};

NockCapture.prototype.stopRecording = function() {
  this.recordedNocks = nock.recorder.play();
  this.writeNockFile();
};

module.exports = NockCapture;
