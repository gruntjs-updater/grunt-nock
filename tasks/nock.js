/*
 * grunt-nock
 * https://github.com/joshgummersall/grunt-nock
 *
 * Copyright (c) 2013 Josh Gummersall
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  var nock = require('nock');
  var fs = require('fs');

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerTask('nock-test', 'Test task for nock recording.', function() {
    var request = require('request');
    var done = this.async();
    request.get('http://www.google.com', function(err, response, body) {
      done();
    });
  });

  grunt.registerMultiTask('nock', 'Your task description goes here.', function() {
    // Merge options with defaults
    var tasks = this.options().tasks || []; 
    tasks = Array.prototype.slice.call(tasks) || [];
    var output = this.options().output || 'recordings.js';

    if (tasks.length === 0) {
      console.log('No tasks specified. Nothing to do here.');
      return;
    }

    nock.recorder.rec(true);
    tasks.push('write-nock:' + output);
    grunt.task.run(tasks);
  });

  grunt.registerTask('write-nock', 'Write recorded nocks to a file.', function(f) {
    if (typeof(f) !== 'string') {
      console.log('Improper use.');
      return;
    }

    var nocks = nock.recorder.play() || [];
    if (nocks.length === 0) {
      console.log('No nocks captured. Nothing to do here.');
      return;
    }

    try {
      fs.writeFileSync(f, 'var nock = require(\'nock\');\n');
      fs.appendFileSync(f, nocks.join(''));
      console.log('\nYour nock recordings have been written to ' + f + '.');
    } catch (e) {
      console.log('\nAn error occurred while writing nocks to disk.');
      console.log('Your nocks will now print to stdout.');
      console.log('\n-----------------------------------------------------\n');
      console.log('var nock = require(\'nock\');');
      console.log(nocks.join(''));
    }
  });
};
