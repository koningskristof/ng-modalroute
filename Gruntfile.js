'use strict';

module.exports = function (grunt) {

  grunt.initConfig({

    connect: {
      example: {
        options: {
          port: 9000,
          base: 'example'
        }
      }
    },
    open: {
      server: {
        url: 'http://localhost:9000'
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: ['Gruntfile.js', 'scripts/*.js']
    }
  });


  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-open');


  grunt.registerTask('unittest', []);

  grunt.registerTask('example', function () {
    grunt.task.run([
      'open',
      'connect:example:keepalive:true',
    ]);
  });


};
