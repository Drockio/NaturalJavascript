(function () {
   'use strict';
}());

module.exports = function(grunt) {

  grunt.initConfig({
    dirs: {
      handlebars: 'templates'
    },
    //for sass: #1: ruby -v to see if you have ruby installed
    //#2: gem install sass
    sass: {
      dist: {
          files: {
            'css/main.css' : 'css/sass/main.scss'
          },
          options: {
            'style': 'expanded'
          }
        }
    },
    jshint: {
      options: {
        jshintrc: true,
        reporterOutput: "",
        'esversion': 6
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      src: {
        src: ['*.js', 'js/*.js', 'src/**/*.js']
      },
      test: {
        src: ['test/**/*.js']
      },
    },
    watch: {
      sass: {
        files: ['css/sass/main.scss'],
        tasks: ['sass:dist']
      },
      handlebars: {
        files: ['<%= handlebars.compile.src %>'],
        tasks: ['handlebars:compile']
      },
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      js: {
        files: ['*.js', 'js/*.js', 'src/**/*.js'],
        tasks: ['jshint:src']
      },
      options: {
        debounceDelay: 500,
        reload: true
      }
    },
    handlebars: {
      compile: {
        src: 'templates/*.handlebars',
        dest: 'templates/compiledHandlebars.js'
      },
      options: {
        namespace: 'DD'
      },
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('grunt-contrib-sass');

  // Default task.
  grunt.registerTask('default', ['jshint', 'handlebars']);
};
