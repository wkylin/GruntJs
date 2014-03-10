module.exports = function (grunt) {

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
        }

    });


    // 加载提供 "uglify" 任务的插件
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // 默认执行的任务
    grunt.registerTask('default', ['uglify']);

};