module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    // 构建任务配置
    grunt.initConfig({

        //默认文件目录在这里
        paths: {
            assets: 'assets',
            less: 'assets/css/less',
            css: 'assets/css',
            js: 'assets/js',
            img: 'assets/image'
        },
        buildPaths: {
            build: 'build',
            css: 'build/css',
            js: 'build/js',
            img: 'build/assets/image'
        },

        pkg: grunt.file.readJSON('package.json'),
        archive: grunt.option('name') || 'GruntJs',

        //Task配置
        jsonlint: {
            sample: {
                src: ['<%= paths.js %>/json/lint.json']
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - '
                + '<%= grunt.template.today("yyyy-mm-dd") %>\n'
                + '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>'
                + '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>;'
                + ' Licensed <%= pkg.license %> */\n',
                mangle: true,
                beautify: false
            },
            build: {
                files: {
                    '<%= buildPaths.js %>/getCookie.min.js': ['<%= paths.js %>/getCookie.js'],
                    '<%= buildPaths.js %>/docApp.min.js': ['<%= paths.js %>/docApp.js'],
                    '<%= buildPaths.js %>/require.js': ['<%= paths.js %>/libs/require.js']
                }
            },
            dest: {
                options: {
                    sourceMapRoot: '../',
                    sourceMap: '<%= buildPaths.js %>/index.min.js.map',
                    sourceMapUrl: '<%= buildPaths.js %>/index.min.js.map'
                },
                files: {
                    '<%= buildPaths.js %>/index.min.js': ['<%= paths.js %>/getCookie.js', '<%= paths.js %>/docApp.js']
                }
            },
            jsMin: {
                files: [{
                    expand: true,
                    cwd: 'assets/js',
                    src: '**/*.js',
                    dest: 'build/assets/js'
                }]
            }
        },
        cssmin: {
            build: {
                options: {
                    banner: '/*! <%= grunt.template.today("yyyy-mm-dd") %>' + ' Licensed <%= pkg.license %> */\n',
                    beautify: {
                        //中文ascii化，非常有用！防止中文乱码的神配置
                        ascii_only: true
                    }
                },
                //src: '<%= paths.css %>/base.css',
                //dest: '<%= buildPaths.css %>/base.min.css'
                files: {
                    '<%= buildPaths.css %>/base.min.css': '<%= paths.css %>/base.css',
                    '<%= buildPaths.css %>/fn-clear.min.css': '<%= paths.css %>/fn-clear.css',
                    '<%= buildPaths.css %>/source.min.css': '<%= paths.css %>/source.css'
                }
                //files: [
                //{src: ['<%= paths.css %>/base.css', '<%= paths.css %>/fn-clear.css'], dest: '<%= buildPaths.css %>/i.min.css'}
                //]
            }
        },
        htmlhint: {
            options: {
                htmlhintrc: '.htmlhintrc'
            },
            dist: {
                src: ['assets/*.html']
            }
        },
        cssLint: {
            options: {
                csslintrc: '.csslintrc'
            },
            dist: {
                src: ['assets/css/*.css']
            }
        },
        jshint: {
            /*  options: {
             curly: true,
             eqeqeq: true,
             newcap: true,
             noarg: true,
             sub: true,
             undef: true,
             boss: true,
             node: true
             },*/
            options: {
                jshintrc: '.jshintrc'
            },
            files: ['<%= paths.js %>/*.js']
        },
        htmlmin: {
            build: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },

                files: [
                    {
                        expand: true,
                        cwd: '<%= paths.assets %>',
                        src: ['**/*.html'],
                        dest: '<%= buildPaths.build %>'
                    }
                ]
            }
        },
        imagemin: {
            build: {
                options: {
                    optimizationLevel: 4
                },
                /*files: {
                 'build/image/banner.png': 'assets/image/banner.png',
                 'build/image/qd.png': 'assets/image/qd.png'
                 }*/
                files: [
                    {
                        expand: true,
                        cwd: '<%= paths.img %>',
                        src: ['**/*.{jpg,png,gif}'],
                        dest: '<%= buildPaths.img %>'
                    }
                ]
            }
        },
        concat: {
            build: {
                options: {
                    separator: '\n'
                },
                src: ['<%= paths.js %>/*.js'],
                dest: '<%= buildPaths.js %>/concatIndex.js'
            }
        },
        less: {
            build: {
                options: {
                    compress: true,
                    optimization: 2,
                    banner: '/*! <%= grunt.template.today("yyyy-mm-dd") %>' + ' Licensed <%= pkg.license %> */ \n',
                    cleancss: true,
                    sourceMap: true,
                    sourceMapFilename: "<%= paths.css %>/source.map",
                    sourceMapBasepath: "<%= paths.css %>"
                },
//                files:{
//                    '<%= paths.css %>/source.css':['<%= paths.less %>/source.less','<%= paths.less %>/source2.less']
//                },
                files: [
                    {
                        expand: true,
                        cwd: "<%= paths.less %>",
                        src: ["**/*.less"],
                        dest: "<%= paths.css %>",
                        ext: ".css"
                    }
                ]
            }
        },
        sass: {
            options: {
                style: 'expanded'
            },
            dist: {
                files: {
                    'assets/css/scss/index.css': 'assets/css/scss/index.scss'
                }
            }
        },
        scsslint: {
            allFiles: [
                'assets/css/scss/*.scss'
            ],
            options: {
                bundleExec: true,
                colorizeOutput: true
            }
        },
        compass: {
            dist: {
                options: {
                    sourcemap: true,
                    config: "config.rb"
                    //sassDir: 'assets/css/scss',
                    //cssDir: 'assets/css/scss'
                }
            }
        },
        copy: {
            main: {
                files: [
                    {expand: true, src: ['<%= paths.assets %>/*.html'], dest: 'build/'},
                    {expand: true, src: ['<%= paths.css %>/*.css'], dest: 'build/'},
                    {expand: true, src: ['<%= paths.img %>/**'], dest: 'build/'},
                    {expand: true, src: ['<%= paths.js %>/**'], dest: 'build/'},
                    {
                        expand: true,
                        src: ['*', '!build', '!test', '!.gitignore', '!.DS_Store', '!Gruntfile.js', '!package.json', '!node_modules/**', '!go.sh', '!.ftppass', '!<%= archive %>*.zip'],
                        dest: 'build/'
                    }
                ]
            },
            images: {
                expand: true,
                cwd: '<%= paths.img %>',
                src: ['**', '!github.png'],
                dest: '<%= buildPaths.img %>',
                flatten: true,
                filter: 'isFile'
            },
            copyHtml: {
                files: [
                    //{expand: true, src: ['assets/**/*.html'], dest: 'build'}
                    {expand: true, src: ['assets/**/grunt.html'], dest: 'build'}
                ]
            },
            copyJs: {
                files: [
                    {expand: true, src: ['<%= paths.js %>/**'], dest: 'build/'}
                ]
            }
        },

        useminPrepare: {
            html: ['assets/*.html'],
            options: {
                dest: 'build/assets'
            }
        },
        usemin: {
            html: ['build/assets/*.html'],
            css: ['build/assets/{,*/}*.css'],
            options: {
                assetsDirs: ['build/assets/', 'build/assets/images']
            }
        },
        filerev: {
            options: {
                algorithm: 'md5',
                length: 8
            },
            dist: {
                files: [
                    {
                        src: [
                            'build/**/*.css',
                            'build/**/*.js',
                            'build/**/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                        ]
                    }
                ]
            }
        },

        jscoverage: {
            src: {
                expand: true,
                cwd: 'assets/',
                src: ['**/*.js'],
                dest: 'coverage/',
                ext: '.js'
            },
            options: {
                // custom options
            }
        },
        clean: {
            build: {
                src: ['build']
            },
            delDoc: {
                src: ['docs']
            },
            delCss: {
                src: ['<%= buildPaths.css %>']
            },
            delJs: {
                src: ['<%= buildPaths.js %>']
            },
            delHtml: {
                src: ['<%= buildPaths.html %>']
            },
            delZip: ['<%= archive %>*.zip'],
            delTmp: ['.tmp'],
            delInclude: ['build/assets/include']
        },
        compress: {
            main: {
                options: {
                    archive: '<%= archive %>-<%= grunt.template.today("yyyy") %>年<%= grunt.template.today("mm") %>月<%= grunt.template.today("dd") %>日<%= grunt.template.today("h") %>时<%= grunt.template.today("TT") %>.zip'
                },
                expand: true,
                cwd: 'build/',
                src: ['**/*'],
                dest: ''
            }
        },
        sprite: {
            all: {
                src: 'assets/image/*.png',
                dest: 'assets/image/sprites.png',
                destCss: 'assets/css/sprites.css'
            }
        },
        cssc: {
            build: {
                options: {
                    consolidateViaDeclarations: true,
                    consolidateViaSelectors: true,
                    consolidateMediaQueries: true
                },
                files: {
                    '<%= paths.css %>/cssc2.css': '<%= paths.css %>/source.css'
                }
            }
        },
        csso: {
            build: {
                expand: true,
                cwd: '<%= paths.css %>/',
                src: ['*.css', '!*.min.css'],
                dest: '<%= buildPaths.css %>/',
                ext: '.min.css'
            }
        },
        csscomb: {
            options: {
                config: 'csscomb.json'
            },
            files: {
                expand: true,
                cwd: 'assets/css/',
                src: ['**/*.css'],
                dest: 'build/css/',
                ext: '.css'
            }
        },
        uncss: {
            dist: {
                options: {
                    csspath: 'css/',
                    stylesheets: ['base.css', 'fn-clear.css'],
                    report: 'min'
                },
                files: {
                    '<%= paths.css %>/tidy.css': ['<%= paths.assets %>/grunt.html', '<%= paths.assets %>/requirejs.html']
                }
            }
        },
        csscss: {
            options: {
                outputJson: true
            },
            files: {
                'build/output.json': ['assets/css/*.css']
            }
        },

        perfbudget: {
            dist: {
                options: {
                    url: 'http://pai.chexiang.com',
                    budget: {
                        visualComplete: '4000',
                        speedIndex: '1500'
                    }
                }
            }
        },
        yuidoc: {
            compile: {
                options: {
                    paths: '<%= paths.js %>/',
                    themedir: 'theme/',
                    outdir: 'docs/'
                }
            }
        },
        requirejs: {
            build: {
                options: {
                    appDir: 'assets',
                    baseUrl: 'js',
                    dir: 'build',
                    optimize: 'uglify2',
                    generateSourceMaps: false,
                    preserveLicenseComments: false,
                    useSourceUrl: true,
                    optimizeCss: 'standard',
                    paths: {
                        'jquery': 'libs/jquery-1.8.2.min',
                        'a': 'utils/a',
                        'b': 'utils/b',
                        'c': 'utils/c',
                        'd': 'utils/d',
                        'e': 'utils/e',
                        'f': 'utils/f',
                        'alpha': 'utils/jquery.alpha',
                        'beta': 'utils/jquery.beta',
                        'domready': 'utils/domready',
                        'math': 'utils/math',
                        'main': 'app/main'
                    },
                    shim: {},
                    modules: [
                        {
                            name: 'main'
                        }
                    ]
                }
            }
        },
        qunit: {
            files: ['test/*.html']
        },
        svgstore: {
            options: {
                includedemo: true,
                cleanup: ['fill']
            },
            dist: {
                files: {
                    'build/svg/dest.svg': ['assets/svgs/*.svg']
                }
            }
        },
        webfont: {
            icons: {
                src: 'assets/svgs/*.svg',
                dest: 'build/fonts'

            }
        },

        browserSync: {
            bsFiles: {
                src: 'assets/**'
            },
            options: {
                server: {
                    baseDir: "./"
                },
                watchTask: true,
                port: 3000,
                reloadDelay: 100
            }
        },
        includereplace: {
            dist: {
                options: {
                    prefix: '@@',
                    suffix: ''
                },
                src: 'assets/grunt.html',
                dest: 'build/'
            }
        },

        // 通过connect任务，创建一个静态服务器
        connect: {
            server: {
                options: {
                    // 服务器端口号
                    port: 8088,
                    // 服务器地址(可以使用主机名localhost，也能使用IP)
                    hostname: 'localhost',
                    // 物理路径(默认为. 即根目录)
                    base: './',
                    livereload: true
                }
            }
        },
        watch: {
            options: {
                livereload: true
            },

            /*js: {
             files: ['assets/js*//*.js'],
             tasks: ['uglify']
             },
             css: {
             files: ['assets/css*//*.css'],
             tasks: ['buildcss']
             },
             */
            prd: {
                files: ['assets/**/*.*'],
                tasks: ['copy:copyHtml',
                    'includereplace',
                    'useminPrepare',
                    'concat:generated',
                    'uglify:generated',
                    'cssmin:generated',
                    'usemin',
                    'clean:delTmp',
                    'clean:delInclude'
                ]
            },
            allJs: {
                files: ['assets/js/**/*.js'],
                tasks: ['newer:uglify:jsMin']
            }
        }
    });

    // 默认执行的任务
    grunt.registerTask('default', ['build']);

    // 自定义任务
    grunt.registerTask('buildCss', ['csscomb', 'cssmin']);
    grunt.registerTask('live', ['connect', 'watch']);
    grunt.registerTask('sync', ['browserSync', 'watch']);


    //Build
    grunt.registerTask('build', [
        'clean:build',
        'copy:copyHtml',
        'copy:images',
        'includereplace',
        'useminPrepare',
        'concat:generated',
        'uglify:generated',
        'cssmin:generated',
        'filerev',
        'usemin',
        'clean:delTmp',
        'clean:delInclude'
    ]);
};