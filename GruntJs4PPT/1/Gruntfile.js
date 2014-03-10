module.exports = function (grunt) {

    // 构建任务配置
    grunt.initConfig({

        //读取package.json的内容，形成个json数据
        pkg: grunt.file.readJSON('package.json')

        //配置任务

    });


    // 加载提供 "uglify" 任务的插件
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // 默认执行的任务
    grunt.registerTask('default', ['uglify']);

};