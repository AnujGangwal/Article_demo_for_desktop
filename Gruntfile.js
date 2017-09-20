module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json')
    });
    //copy
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.config('copy', {
        main: {
            files: [
                // makes all src relative to cwd
                {
                    expand: true,
                    cwd: 'app/',
                    src: ['**/*.html', '**/*.json'],
                    dest: 'build/app/'
                }, {
                    expand: true,
                    cwd: 'app/assets/',
                    src: ['**'],
                    dest: 'build/app/assets/'
                }, {
                    expand: true,
                    cwd: 'js',
                    src: ['**'],
                    dest: 'build/'
                }
            ],
        }
    });
    //concat
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.config('concat', {
        options: {},
        dist: {
            src: [
                'app/app.mdl.js',
                'app/app.route.js',
                'app/*/**/*.mdl.js',
                //new addition
                'app/*/**/*.serv.js',
                'app/*/**/*.fact.js',
                'app/*/**/*.drv.js',
                'app/*/**/*.ctrl.js' //,
                //'app/*/config.**.js',
                //'app/**/**/*.js',
                //'app/*/*.cnst.js',
                //'app/*/**/*.ctrl.js'
            ],
            dest: 'js/<%= pkg.name %>-<%= pkg.version %>.js',
        },
        index: {
            src: [
                'build.tmpl.html'
            ],
            dest: 'build/index.html'
        }
    });
    //jshint
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.config('jshint', {
        options: grunt.file.readJSON('jshintrc.json'),
        files: {
            src: ['app/*.js', 'app/**/*.js', 'app/**/**/*.js']
        }
    });
    //less
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.config('less', {
        development: {
            options: {
                paths: ['app/']
            },
            files: {
                "app/assets/css/quest-admin.css": 'app/assets/css/main.less'
            }
        }
    });
    //uglify
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.config('uglify', {
        options: {
            banner: '/*! <%= pkg.name %>-<%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        },
        build: {
            src: 'js/<%= pkg.name %>-<%= pkg.version %>.js',
            dest: 'js/<%= pkg.name %>-<%= pkg.version %>.min.js'
        },
        watch: {
            scripts: {
                files: ['app/*.js', 'app/**/*.js', 'app/**/**/*.js'],
                tasks: ['jshint'],
                options: {
                    debounceDelay: 1000,
                }
            }
        }
    });
    //jsbeautifier
    grunt.loadNpmTasks('grunt-jsbeautifier');
    grunt.config('jsbeautifier', {
        files: ['Gruntfile.js', 'app/**/*.js'],
        /*options: {}*/
        options: {
            js: {
                braceStyle: "collapse",
                breakChainedMethods: false,
                e4x: false,
                evalCode: false,
                indentChar: " ",
                indentLevel: 0,
                indentSize: 4,
                indentWithTabs: false,
                jslintHappy: false,
                keepArrayIndentation: false,
                keepFunctionIndentation: false,
                maxPreserveNewlines: 1,
                preserveNewlines: true,
                spaceBeforeConditional: true,
                spaceInParen: false,
                unescapeStrings: false,
                wrapLineLength: 0,
                endWithNewline: true
            }
        }
    });
    //cssmin
    //grunt.loadNpmTasks('grunt-contrib-cssmin');
    //grunt.config('cssmin', {
    //    target: {
    //        files: {
    //            'production/css/<%= pkg.name %>-<%= pkg.version %>.min.css': ['app/assets/css/*.css', 'app/assets/**/!*.min.css']
    //        }
    //    }
    //});
    //html compress
    grunt.loadNpmTasks('grunt-htmlcompressor');
    grunt.config('htmlcompressor', {
        compile: {
            files: [{
                expand: true, // Enable dynamic expansion.
                cwd: 'build/app/', // Src matches are relative to this path.
                src: ['**/*.html'], // Actual pattern(s) to match.
                dest: 'build/app/' // Destination path prefix.
            }],
            options: {
                type: 'html',
                preserveServerScript: true
            }
        }
    });
    //clean
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.config('clean', {
        folder: ['build/'],
        //css: ['production/css/*.css'],
        js: ['js/*.js'],
        nomin: ['js/*.js', '!js/*.min.js']
    });
    grunt.registerTask('default', ['jshint', 'clean:js', 'less', 'concat:dist', 'jsbeautifier']);
}
