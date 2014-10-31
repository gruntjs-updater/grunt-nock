/*
 * grunt-nock
 * https://github.com/joshgummersall/grunt-nock
 *
 * Copyright (c) 2014 Josh Gummersall
 * Licensed under the MIT license.
 */

'use strict';

var NockCapture = require('./lib/nock_capture.js');
var fs = require('fs');
var nock = require('nock');

module.exports = function(grunt) {
  var nockCapture;

  grunt.registerMultiTask('nock', 'Perform a grunt task and record any HTTP requests it makes.', function() {
    var tasks = this.data.tasks || [];
    if (!tasks.length) {
      grunt.log.warn('\nNo tasks specified.');
      return;
    }

    nockCapture = new NockCapture({
      outputFile: this.data.output || 'recordings.js',
      overwrite: this.options().overwrite || false
    });

    if (!nockCapture.validateOptions()) {
      grunt.log.warn('\nInvalid options.');
      return;
    }

    nockCapture.startRecording();
    grunt.task.run([].concat(tasks, 'write-nock'));
  });

  grunt.registerTask('write-nock', 'Write recorded nocks to a file.', function() {
    if (typeof nockCapture === 'undefined') {
      grunt.log.warn('\nImproper use.');
      return;
    }

    try {
      nockCapture.stopRecording();
      grunt.log.ok('\nDone recording.');
    } catch (err) {
      grunt.log.warn('\nFile output failed, printing nocks to stdout.');
      console.log(nockCapture.formatNocks());
    }
  });
};
