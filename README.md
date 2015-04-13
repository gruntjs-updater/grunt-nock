# grunt-nock (deprecated)

> Run a grunt task while capturingg requests in Nock format

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-nock --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-nock');
```

## The "nock" task

### Overview
In your project's Gruntfile, add a section named `nock` to the data object passed into `grunt.initConfig()`.

### Options

#### tasks
This should be an array of tasks that you want to run while capturing nocks. A good example of a task that should
be included here is a test that uses the `request` module to hit some APIs. You can record nocks of these requests
to use in place of the actual requests so you don't waste precious API quotas.

#### output
This should be a string file name that you want to save the nocks to when they are done recording.

### options.overwrite
This option allows you to decide whether the file specified in the output option will be overwritten prior to running
the tasks specified in the tasks option. This is useful and should usually be true so the (potentially) old nock
recordings will be removed before running the tasks.

### Usage Examples

```js
grunt.initConfig({
  nock: {
    all: {
      tasks: ['test1', 'test2', 'test3'],
      output: 'recordings.js'
    },
    options: {
      overwrite: true
    }
  },
  ...
});
```
