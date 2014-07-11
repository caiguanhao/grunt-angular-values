grunt-angular-values
====================

Convert YAML, JSON or plain text file to angular.value or angular.constant.

## Getting Started

This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out
the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains
how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as
install and use Grunt plugins. Once you're familiar with that process, you may
install this plugin with this command:

```shell
npm install grunt-angular-values --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile
with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-angular-values');
```

## Example

```js
grunt.initConfig({
  values: {
    all: {
      options: {
        constant: true,
        module: 'MyApp',
        files: {
          'public/values.js': {
            'example.json': function() {
              return { example: true };
            }
          }
        }
      },
      files: {
        'public/values.js': [ 'posts/*.yml', 'posts/*.json', 'posts/*.md' ]
      }
    }
  }
});
```

## Developer

* caiguanhao &lt;caiguanhao@gmail.com&gt;
