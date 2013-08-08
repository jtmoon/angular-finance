module.exports = function(grunt) {

  // Load tasks
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-angular-templates');

  // Configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    ngtemplates: {
      finance: {
        options: {
          base: 'src/views',
        },
        src: 'src/views/**.html',
        dest: 'compiled/templates/templates.js'
      }
    },

    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: [
          'libs/jquery/*.js',
          'libs/angular/angular.js',
          'libs/**/*.js',
          'src/app.js',
          'src/**/*.js',
          'compiled/templates/templates.js'],
        dest: 'dist/front.js'
      }
    },

    uglify: {
      options: {
        mangle: false,
        compress: false
      },
      dist: {
        files: {
          'public/javascripts/front.min.js': ['dist/front.js']
        }
      }
    },

    jade: {
      html: {
        files: [{
          expand: true,
          cwd: './',
          src: ['src/jade/*.jade'],
          dest: 'public/partials',
          ext: '.html',
          flatten: true
        }]
      }
    }

  });

  // Tasks
  grunt.registerTask('all', ['jade', 'ngtemplates', 'concat', 'uglify']);

}