module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
        banner: "/*\n" +
            " *  <%= pkg.name %> - v<%= pkg.version %>\n" +
            " *  <%= pkg.description %>\n" +
            " *  <%= pkg.homepage %>\n" +
            " *\n" +
            " *  Made by <%= pkg.author %>\n" +
            " *  Under <%= pkg.licenses[0].type %> License\n" +
            " */\n"
    },
    concat: {
      options: {
        banner: "<%= meta.banner %>"
      },
      basic: {
        src: ['lib/aisearch.js',
              'lib/util/*.js',
              'lib/algorithms/*.js',
              'lib/benchmarkFunctions/*.js',
              'lib/graph/*.js'],
        dest: 'dist/aisearch.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'dist/aisearch.js',
        dest: 'dist/aisearch.min.js'
      }
    },
    watch: {
      scripts: {
        files: ['lib/aisearch.js',
              'lib/util/*.js',
              'lib/algorithms/*.js',
              'lib/benchmarkFunctions/*.js',
              'lib/graph/*.js'],
        tasks: ['concat'],
        options: {
          nospawn: true,
          debounceDelay: 250,
        },
      },
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Load the plugin that provides the "concat" task.
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['concat']);

};
