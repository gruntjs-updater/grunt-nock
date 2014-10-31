'use strict';

var NockCapture = require('../tasks/lib/nock_capture');
var fs = require('fs');
var nock = require('nock');
var request = require('request');
var should = require('should');
var sinon = require('sinon');

describe('Nock Capture', function() {
  beforeEach(function() {
    this.sandbox = sinon.sandbox.create();
    this.fsMock = this.sandbox.mock(fs);
  });

  afterEach(function() {
    nock.restore();
    this.sandbox.restore();
  });

  describe('initialization', function() {
    it('validates well formed options', function() {
      this.nockCapture = new NockCapture({
        tasks: ['some', 'tasks', 'here'],
        outputFile: 'output.js',
        overwrite: false
      });
      this.nockCapture.validateOptions().should.be.ok;
    });

    it('invalidates bad options', function() {
      this.nockCapture = new NockCapture({});
      this.nockCapture.validateOptions().should.not.be.ok;
    });
  });

  describe('overwriteFile', function() {
    beforeEach(function() {
      var t = this;
      this.initCapture = function(overwrite) {
        t.nockCapture = new NockCapture({
          outputFile: 'test_output.js',
          overwrite: overwrite
        });
      };
    });

    it('overwrites a file', function() {
      this.fsMock.expects('writeFileSync').once();
      this.initCapture(true);
      this.nockCapture.overwriteFile();
      this.fsMock.verify();
    });

    it('does not overwrite a file', function() {
      this.fsMock.expects('writeFileSync').never();
      this.initCapture(false);
      this.nockCapture.overwriteFile();
      this.fsMock.verify();
    });
  });

  describe('simple HTTP request recording', function() {
    beforeEach(function() {
      this.nockCapture = new NockCapture({
        outputFile: 'test_capture.js',
        overwrite: true
      });
    });

    it('records and writes nocks to a file', function(done) {
      var t = this;
      t.fsMock.expects('writeFileSync').twice();
      t.nockCapture.startRecording();
      request.get('https://status.github.com/', function(err, resp, body) {
        t.nockCapture.stopRecording();
        t.fsMock.verify();
        done(err);
      });
    });
  });
});
