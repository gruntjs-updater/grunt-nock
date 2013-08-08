/*
 * grunt-nock
 * https://github.com/joshgummersall/grunt-nock
 *
 * Copyright (c) 2013 Josh Gummersall
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Configuration to be run (and then tested).
    nock: {
      default: {
        options: {
          output: 'recordings.js',
          tasks: []
        },
      },
    },
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.registerTask('test', ['jshint', 'nock']);
  grunt.registerTask('default', ['jshint', 'nock']);
};
