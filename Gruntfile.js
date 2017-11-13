'use strict';

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        concat: {
          bluefile: {
            src: [
                    'js/license.js',
                    'js/typedarray.js',
                    'js/common.js',
                    'js/bluefile.js'
            ],
            dest: 'dist/bluefile.js'
          },
          sigplot: {
            src: [
                    'js/license.js',
                    'js/typedarray.js',
                    'js/common.js',
                    'js/bluefile.js',
                    'js/tinycolor.js',
                    'js/CanvasInput.js',
                    'js/spin.js',
                    'js/loglevel.js',
                    'js/m.js',
                    'js/mx.js',
                    'js/sigplot.layer1d.js',
                    'js/sigplot.layer2d.js',
                    'js/sigplot.js'
            ],
            dest: 'dist/sigplot.js'
          },
          sigplot_plugins: {
            src: [
                    'js/license.js',
                    'js/sigplot.annotations.js',
                    'js/sigplot.slider.js',
                    'js/sigplot.accordion.js',
                    'js/sigplot.boxes.js',
                    'js/sigplot.playback.js',
            ],
            dest: 'dist/sigplot.plugins.js'
          }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            gruntfile: {
                src: 'Gruntfile.js'
            },
            js: {
                options: {
                    jshintrc: 'js/.jshintrc'
                },
                src: ['js/**/*.js']
            },
        },
        qunit: {
            options: { '--web-security': 'no', '--local-to-remote-url-access': 'yes',
                coverage: {
                    src: ['dist/*.js', 'test/tests.js'],
                    instrumentedFiles: 'instrumented',
                    lcovReport: 'coverage',
                    linesThresholdPct: 30
                }
            },
            all: ['test/passfail.html'],
        },
        'closure-compiler': {
            bluefile_debug: {
                closurePath: 'support/google-closure-compiler',
                js: 'dist/bluefile.js',
                jsOutputFile: 'dist/bluefile-debug.js',
                options: {
                    formatting: 'PRETTY_PRINT',
                    compilation_level: 'WHITESPACE_ONLY'
                }
            },
            sigplot_debug: {
                closurePath: 'support/google-closure-compiler',
                js: 'dist/sigplot.js',
                jsOutputFile: 'dist/sigplot-debug.js',
                options: {
                    formatting: 'PRETTY_PRINT',
                    compilation_level: 'WHITESPACE_ONLY',
                }
            },
            sigplot_plugins_debug: {
                closurePath: 'support/google-closure-compiler',
                js: 'dist/sigplot.plugins.js',
                jsOutputFile: 'dist/sigplot.plugins-debug.js',
                options: {
                    formatting: 'PRETTY_PRINT',
                    compilation_level: 'WHITESPACE_ONLY'
                }
            },
            bluefile_minimized: {
                closurePath: 'support/google-closure-compiler',
                js: 'dist/bluefile.js',
                jsOutputFile: 'dist/bluefile-minimized.js',
                options: {
                    compilation_level: 'SIMPLE_OPTIMIZATIONS'
                }
            },
            sigplot_minimized: {
                closurePath: 'support/google-closure-compiler',
                js: 'dist/sigplot.js',
                jsOutputFile: 'dist/sigplot-minimized.js',
                options: {
                    compilation_level: 'SIMPLE_OPTIMIZATIONS'
                }
            },
            sigplot_plugins_minimized: {
                closurePath: 'support/google-closure-compiler',
                js: 'dist/sigplot.plugins.js',
                jsOutputFile: 'dist/sigplot.plugins-minimized.js',
                options: {
                    compilation_level: 'SIMPLE_OPTIMIZATIONS'
                }
            } 
        },
        jsdoc: {
            sigplot: {
                src: ['js/*.js'],
                options: {
                    destination: 'doc',
                    template: 'docstrap-master/template',
                    configure: 'docstrap-master/conf.json'
                }
            }
        },
        clean: {
            build: ["dist/**/*", "!dist/*.zip"],
            doc: ["doc/**/*"]
        },
        compress: {
            main: {
                options: {
                    archive: "dist/sigplot-<%= pkg.version %>-<%= grunt.template.today('yyyy-mm-dd') %>.zip",
                },
                files: [
                    {expand: true, cwd: 'dist/', src: ['*-debug.js'], dest: 'sigplot-<%= pkg.version %>'},
                    {expand: true, cwd: 'dist/', src: ['*-minimized.js'], dest: 'sigplot-<%= pkg.version %>'},
                    {src: ['doc/**/*'], dest: 'sigplot-<%= pkg.version %>'}
                ]
            }
        },
        web_server: {
            options: {
                cors: true,
                nevercache: true,
                logRequests: true
            },
            foo: 'bar' // necessary for some odd reason, see the docs
        },
        jsbeautifier: {
            check: {
                // Only check a subset of the files
                src: [
                        'js/bluefile.js',
                        'js/m.js',
                        'js/mx.js',
                        'js/sigplot.layer1d.js',
                        'js/sigplot.layer2d.js',
                        'js/sigplot.js',
                        'js/sigplot.annotations.js',
                        'js/sigplot.slider.js',
                        'js/sigplot.accordion.js',
                        'js/sigplot.boxes.js',
                        'js/sigplot.playback.js',
                        'test/tests.js'
                ],
                options: {
                    mode: "VERIFY_ONLY"
                }
            },
            cleanup: {
                // Only cleanup a subset of the files
                src: [
                        'js/bluefile.js',
                        'js/m.js',
                        'js/mx.js',
                        'js/sigplot.layer1d.js',
                        'js/sigplot.layer2d.js',
                        'js/sigplot.js',
                        'js/sigplot.annotations.js',
                        'js/sigplot.slider.js',
                        'js/sigplot.accordion.js',
                        'js/sigplot.boxes.js',
                        'js/sigplot.playback.js',
                        'test/tests.js'
                ],
                options: {
                    indentSize: 4,
                    indentWithTabs: false,
                    wrapLineLength: 0
                }
            }
        },
        coveralls: {
            // Options relevant to all targets
            options: {
                // When true, grunt-coveralls will only print a warning rather than
                // an error, to prevent CI builds from failing unnecessarily (e.g. if
                // coveralls.io is down). Optional, defaults to false.
                force: false
            },

            your_target: {
                // LCOV coverage file (can be string, glob or array)
                //src: 'coverage-results/extra-results-*.info',
                src: 'coverage/lcov.info',
                options: {
                    // Any options for just this target
                }
            },
        },
        exec: {
            make_lcov: './node_modules/browserify/bin/cmd.js -t coverify js/sigplot.js | node | ./node_modules/coverify-lcov/bin/cmd.js > sigplot-lcov.info',
            icover: 'istanbul cover js/sigplot.js -x \'**/coverage/**\' -x \'**/node_modules/**\''
        }
   });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-closure-compiler');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    //grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-web-server');
    grunt.loadNpmTasks('grunt-jsbeautifier');
    grunt.loadNpmTasks('grunt-coveralls');
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-qunit-istanbul');

    grunt.registerTask('build', ['concat', 'jsbeautifier:check']);

    // Check everything is good
    grunt.registerTask('test', ['build', 'jshint', 'qunit', 'coveralls']);
    
    // Build a distributable release
    grunt.registerTask('dist', ['clean', 'test', 'closure-compiler', 'jsdoc', 'compress']);
    
    // Default task.
    grunt.registerTask('default', 'test');

};
