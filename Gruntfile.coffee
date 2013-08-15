module.exports = (grunt) ->
  sources = [
    'bin/**/*.js'
    'lib/**/*.js'
    'test/**/*.js'
  ]

  grunt.initConfig
    jshint:
      all: sources
    mochaTest:
      test:
        options: reporter: 'min'
        src: ['test/**/*.js']
    watch:
      test:
        files: sources
        tasks: ['test']

  grunt.loadNpmTasks('grunt-contrib-jshint')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-mocha-test')

  grunt.registerTask('test', ['jshint', 'mochaTest'])
  grunt.registerTask('default', ['test'])
