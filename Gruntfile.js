module.exports = function (grunt) {

    //使用 matchdep，可以自动载入所有任务。
    // require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    require('load-grunt-tasks')(grunt);

    require('time-grunt')(grunt);
    // 构建任务配置
    grunt.initConfig({

        //默认文件目录在这里
        paths: {
            assets: 'assets',//输出的最终文件assets里面
            less: 'assets/css/less',//推荐使用Less
            css: 'assets/css', //若简单项目，可直接使用原生CSS，同样可以grunt watch:base进行监控
            js: 'assets/js', //js文件相关目录
            img: 'assets/image' //图片相关
        },
        buildPaths: {
            build: 'build',
            css: 'build/css',
            js: 'build/js',
            img: 'build/assets/image'
        },
        buildType: 'Build',
        //读取package.json的内容，形成个json数据
        pkg: grunt.file.readJSON('package.json'),
        archive: grunt.option('name') || 'GruntJs',//此处可根据自己的需求修改

        //config
        copyFiles: {
            options: {
                workingDirectory: 'working',
                manifest: [
                    'assets/grunt.html',
                    'assets/css/base.css',
                    'assets/js/docApp.js'
                ]

            }
        },

        //Multi Tasks
        multiTasks: {
            angular: {
                src: ['bower_components/angular/angular.js',
                    'bower_components/angular-resource/angular-resource.js'],
                dest: 'dist/angular.js'
            },
            angularWithjQuery: {
                src: ['bower_components/jquery/dist/jquery.js',
                    'bower_components/angular/angular.js',
                    'bower_components/angular-resource/angular-resource.js'],
                dest: 'dist/jquery-angular.js'
            }
        },

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
            delZip: ['<%= archive %>*.zip'], //先删除先前生成的压缩包
            delTmp: ['.tmp'],
            delInclude: ['build/assets/include']
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
                    {expand: true, src: ['assets/**/*.html'], dest: 'build'}
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
            html: ['build/assets/*.html']
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
                 'build/image/a.png': 'assets/image/a.png',
                 'build/image/b.png': 'assets/image/b.png',
                 'build/image/c.png': 'assets/image/c.png'
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
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                boss: true,
                node: true
            },
            globals: {
                exports: true
            },
            files: ['<%= paths.js %>/*.js']
        },
        less: {
            build: {
                options: {
                    compress: true,
                    optimization: 2,
                    banner: '/*! <%= grunt.template.today("yyyy-mm-dd") %>' + ' Licensed <%= pkg.license %> */\n'
                    //cleancss: true,
                    //sourceMap: true,
                    //sourceMapFilename: "<%= paths.css %>/source.map",
                    //sourceMapBasepath: "<%= paths.css %>"
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
            options:{
              style: 'expanded'
            },
            dist: {
                files: {
                    'assets/css/scss/index.css': 'assets/css/scss/index.scss'
                }
            }
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
        //grunt-cssc整合CSS文件样式规则，最大限度削减重复内容
        cssc: {
            build: {
                options: {
                    consolidateViaDeclarations: true,
                    consolidateViaSelectors: true,
                    consolidateMediaQueries: true
                },
                files: {
                    '<% paths.css %>/source.css': '<%= paths.css %>/source.css'
                }
            }
        },

        //按照预定义的排序格式重新排列CSS中定义的属性
        csscomb: {
            options: {
                config: 'assets/js/libs/csscomb.json'
            },
            files: {
                expand: true,
                cwd: 'assets/css/',
                src: ['**/*.css'],
                dest: 'assets/css/',
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
        filerev: {
            options: {
                algorithm: 'md5',
                length: 8
            },
            dist: {
                files: [
                    {
                        src: [
//                            '<%= paths.img %>/**/*.{jpg,jpeg,gif,png}',
//                            '<%= paths.css %>/**/*.css'
                            'build/**/*.css',
                            'build/**/*.js'
                        ]
                    }
                ]
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
                //src : 'build/assets/css/*.css'
                //src : 'assets/**/*.*'
                //src: 'build/assets/**'
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
        htmlhint: {
            dist: {
                src: ['assets/*.html']
            }
        },
        csslint: {
            dist: {
                src: ['assets/css/*.css']
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
             concat: {
             files: ['assets/js*//*.js'],
             tasks: ['concat']
             },*/
            prd: {
                files: ['assets/**/*.*'],
                tasks: ['copy:copyHtml', 'includereplace', 'useminPrepare', 'concat:generated', 'uglify:generated', 'cssmin:generated', 'usemin', 'clean:delTmp', 'clean:delInclude']
            },
            allJs: {
                files: ['assets/js/**/*.js'],
                tasks: ['newer:uglify:jsMin']
            }
        }
    });

    // 默认执行的任务
    grunt.registerTask('default', ['live', 'prd']);

    // 自定义任务
    grunt.registerTask('buildcss', ['cssmin']);
    grunt.registerTask('live', ['browserSync', 'connect', 'watch']);

    //Prd
    grunt.registerTask('prd', ['clean:build', 'copy:copyHtml', 'includereplace', 'useminPrepare', 'concat:generated', 'uglify:generated', 'cssmin:generated', 'filerev', 'usemin', 'clean:delTmp', 'clean:delInclude']);
};