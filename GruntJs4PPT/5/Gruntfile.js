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
            }
        },
        cssmin: {
            build: {
                options: {
                    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n'
                },
                files: {
                    'build/css/base.min.css': 'assets/css/base.css',
                    'build/css/fixclear.min.css': 'assets/css/fixclear.css',
                    'build/css/source.min.css': 'assets/css/source.css'
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
            }
        }
    });

    // 默认执行的任务
    grunt.registerTask('default', ['uglify']);

    //自定义任务
    grunt.registerTask('buildcss', ['cssmin']);

    grunt.registerTask('live', ['connect', 'watch']);

};