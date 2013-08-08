# grunt-nock

> Run a grunt task while capturingg requests in Nock format

## Getting Started
This plugin requires Grunt `~0.4.1`

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

#### options.tasks
This should be an array of tasks that you want to run while capturing nocks. A good example of a task that should
be included here is a test that uses the `request` module to hit some APIs. You can record nocks of these requests
to use in place of the actual requests so you don't waste precious API quotas.

#### options.output
This should be a string file name that you want to save the nocks to when they are done recording.

### Usage Examples

```js
grunt.initConfig({
  nock: {
    default: {
      options: {
        tasks: ['test1', 'test2', 'test3'],
        output: 'recordings.js'
      }
    }
  },
  ...
});
```
