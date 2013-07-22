'use strict';

module.exports = function(grunt){

  grunt.initConfig({

    meta: {
      root: {
        src: ['Gruntfile.js', 'test-runner.js']
      },
      server: {
        src: 'src/**/*.js',
        test: 'test/**/*.js'
      },
      tasks: {
        src: 'tasks/**/*.js'
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      root: {
        src: '<%= meta.root.src %>'
      },
      server: {
        src: [
          '<%= meta.server.src %>',
          '<%= meta.server.test %>'
        ]
      },
      tasks: {
        src: '<%= meta.tasks.src %>'
      }
    },

    clean: {
      docs: {
        src: '_docs'
      },
      coverage: {
        src: '_coverage'
      },
      coverage_server: {
        src: '_coverage/server'
      }
    },

    watch: {
      jsRoot: {
        files: '<%= meta.root.src %>',
        tasks: ['jshint:root']
      },
      jsServer: {
        files: ['<%= meta.server.src %>', '<%= meta.server.test %>'],
        tasks: ['jshint:server']
      },
      jsTasks: {
        files: '<%= meta.tasks.src %>',
        tasks: ['jshint:tasks']
      }
    },

    docker: {
      app: {
        expand: true,
        src: [
          '<%= meta.root.src %>',
          '<%= meta.server.src %>',
          '<%= meta.server.test %>',
          '<%= meta.tasks.src %>',
          'README.md'
        ],
        dest: '_docs',
        options: {
          onlyUpdated: true,
          colourScheme: 'default'
        }
      }
    },

    nodemon: {
      server_dev: {
        options: {
          file: 'src/app.js',
          args: ['--ENV=development', '--LOG_LEVEL=1'],
          watchedExtensions: ['js'],
          watchedFolders: ['src'],
          debug: true,
          delayTime: 1
        }
      },
      server_test: {
        options: {
          file: 'src/app.js',
          args: ['--ENV=test', '--LOG_LEVEL=1'],
          watchedExtensions: ['js'],
          watchedFolders: ['src'],
          debug: false,
          delayTime: 1
        }
      },
      server_demo: {
        options: {
          file: 'src/app.js',
          args: ['--ENV=demo', '--LOG_LEVEL=3'],
          watchedExtensions: ['js'],
          watchedFolders: ['src'],
          debug: false,
          delayTime: 1
        }
      },
      nodeInspector: {
        options: {
          file: 'node-inspector.js',
          watchedExtensions: ['js'],
          watchedFolders: ['src'],
          exec: 'node-inspector'
        }
      }
    },

    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      dev: {
        tasks: [
          'nodemon:server_dev',
          'nodemon:nodeInspector',
          'watch'
        ]
      },
      test: {
        tasks: [
          'nodemon:server_test',
          'watch'
        ]
      },
      demo: {
        tasks: [
          'nodemon:server_demo',
          'watch'
        ]
      }
    },

    istanbul: {
      test: {
        options: {
          command: 'test'
        }
      },
      cover: {
        options: {
          coverageOutputDir: '_coverage',
          command: 'cover',
          reportType: 'html'
        }
      }
    }

  });

  grunt.loadTasks('tasks');

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-docker');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');

  grunt.registerTask('docs', ['clean:docs', 'docker']);
  grunt.registerTask('cover', ['clean:coverage_server', 'istanbul:cover']);
  grunt.registerTask('test', ['istanbul:test']);
  grunt.registerTask('start:demo', ['clean:coverage', 'docker', 'concurrent:demo']);
  grunt.registerTask('start', ['clean:coverage', 'docker', 'concurrent:dev']);
};