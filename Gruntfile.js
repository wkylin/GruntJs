module.exports = function (grunt) {

    //使用 matchdep，可以自动载入所有任务。
    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    // 构建任务配置
    grunt.initConfig({
        //读取package.json的内容，形成个json数据
        pkg: grunt.file.readJSON('package.json'),

        uglify: {
            options: {
                banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - '
                    + '<%= grunt.template.today("yyyy-mm-dd") %>\n'
                    + '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>'
                    + '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>;'
                    + ' Licensed <%= pkg.license %> */\n',
                mangle: true
            },
            build: {
                files: {
                    'build/js/getCookie.min.js': ['assets/js/getCookie.js'],
                    'build/js/sayGrunt.min.js': ['assets/js/sayGrunt.js']
                }
            },
            dest: {
                options:{
                    sourceMapRoot: '../',
                    sourceMap: 'build/js/index.min.js.map',
                    sourceMapUrl: 'build/js/index.min.js.map'
                },
                files: {
                    'build/js/index.min.js': ['assets/js/getCookie.js', 'assets/js/sayGrunt.js']
                }
            }
        },
        cssmin: {
            build: {
                options: {
                    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n'
                },
                //src: 'assets/css/base.css',
                //dest: 'build/css/base.min.css'
                files: {
                    'build/css/base.min.css': 'assets/css/base.css',
                    'build/css/fixclear.min.css': 'assets/css/fixclear.css',
                    'build/css/source.min.css': 'assets/css/source.css'
                }
                //files: [
                //{src: ['assets/css/base.css', 'assets/css/fixclear.css'], dest: 'build/css/i.min.css'}
                //]
            }
        },
        clean: {
            build: {
                src: [ 'build/js', 'build/css', 'build/image' ]
            }
        },
        concat: {
            build: {
                options: {
                    separator: '\n'
                },
                src: [ 'assets/js/*.js' ],
                dest: 'build/js/concatIndex.js'
            }
        },
        copy: {
            build: {
                files: {
                    'build/index.html': 'assets/grunt.html'
                }
            }
        },
        htmlmin: {
            build: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'build/grunt.html': 'assets/grunt.html'
                }
            }
        },
        imagemin: {
            build: {
                options: {
                    optimizationLevel: 3
                },
                files: {
                    'build/image/a.png': 'assets/image/a.png',
                    'build/image/b.png': 'assets/image/b.png',
                    'build/image/c.png': 'assets/image/c.png'
                }
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
            files: ['assets/js/*.js']
        },
        less: {
            development: {
                options: {
                    paths: ["assets/css"]
                },
                files: {
                    "assets/css/source.css": "assets/css/source.less"
                }
            }
        },
        compress: {
            main: {
                options: {
                    archive: 'archive.zip'
                },
                files: [
                    {src: 'build/css/*', dest: 'build/css', filter: 'isFile'},
                    {src: 'build/**', dest: 'build/'}
                ]
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
                    'build/css/source.css': 'assets/css/source.css'
                }
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
                    base: '.',
                    livereload: true
                }
            }
        },
        watch: {
            options: {
                livereload: true
            },

            js: {
                files: ['assets/js/*.js'],
                tasks: ['uglify']
            },
            css: {
                files: ['assets/css/*.css'],
                tasks: ['buildcss']
            },
            concat: {
                files: ['assets/js/*.js'],
                tasks: ['concat']
            }
        }
    });


    // 默认执行的任务
    grunt.registerTask('default', ['live']);

    // 自定义任务
    grunt.registerTask('buildcss', ['cssmin']);
    grunt.registerTask('live', ['connect', 'watch']);
};