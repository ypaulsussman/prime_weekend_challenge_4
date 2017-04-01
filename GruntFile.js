module.exports = function(grunt) {
  // require('load-grunt-tasks')(grunt);
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      main: {
        src: ["client_dev/scripts/client.js"],
        dest: "server/public/scripts/client.min.js"
      }
    },//end uglify
    copy: {
      clientjs: {
        expand: true,
        cwd: 'client_dev/scripts',
        src: ['*.js'],
        dest: 'server/public/scripts'
      },
      html: {
        expand: true,
        cwd: 'client_dev/views',
        src: ['*.html'],
        dest: 'server/public/views'
      },
      css: {
        expand: true,
        cwd: 'client_dev/styles',
        src: ['*.css'],
        dest: 'server/public/styles'
      }
    },//end copy
    watch: {
      options: {
        livereload: true,
      },
      files: ['client_dev/scripts/*.js', 'client_dev/views/*.html', 'client_dev/styles/*.css'],
      tasks: ['uglify', 'copy']
    }//end watch
  });//end grunt.initConfig
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', ['uglify', 'copy', 'watch']);
};//end module.exports
