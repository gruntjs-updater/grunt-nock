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

  grunt.registerMultiTask('nock', 'Your task description goes here.', function() {
    // Merge options with defaults
    var tasks = this.data.tasks || [];
    tasks = Array.prototype.slice.call(tasks) || [];
    var output = this.data.output || 'recordings.js';
    var overwrite = this.options().overwrite || false;

    if (tasks.length === 0) {
      console.log('\nNo tasks specified. Nothing to do here.');
      return;
    }

    // Overwrite old file if so prompted
    if (overwrite) {
      fs.writeFileSync(output, '{}');
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
