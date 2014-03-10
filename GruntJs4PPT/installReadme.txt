D:\github>cd gruntjs

D:\github\GruntJs>npm init
This utility will walk you through creating a package.json file
It only covers the most common items, and tries to guess sane d

See `npm help json` for definitive documentation on these field
and exactly what they do.

Use `npm install <pkg> --save` afterwards to install a package
save it as a dependency in the package.json file.

Press ^C at any time to quit.

name: (GruntJs) GruntJs
version: (0.0.0)
description: GruntJs
entry point: (index.js)
test command:
git repository: (https://github.com/wkylin/GruntJs.git)
keywords: GruntJs
author: wkylin
license: (ISC)
About to write to D:\github\GruntJs\package.json:

{
  "name": "GruntJs",
  "version": "0.0.0",
  "description": "GruntJs",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/wkylin/GruntJs.git"
  },
  "keywords": [
    "GruntJs"
  ],
  "author": "wkylin",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/wkylin/GruntJs/issues"
  },
  "homepage": "https://github.com/wkylin/GruntJs"
}

Is this ok? (yes) yes

///创建好了package.json

///install grunt

D:\github\GruntJs>npm install grunt --save-dev
npm http GET https://registry.npmjs.org/grunt
npm http 200 https://registry.npmjs.org/grunt
npm http GET https://registry.npmjs.org/async
.
.
.
npm http 200 https://registry.npmjs.org/underscore
grunt@0.4.2 node_modules\grunt
├── dateformat@1.0.2-1.2.3
├── which@1.0.5
├── eventemitter2@0.4.13
├── getobject@0.1.0
├── colors@0.6.2
├── async@0.1.22
├── hooker@0.2.3
├── exit@0.1.2
├── lodash@0.9.2
├── nopt@1.0.10 (abbrev@1.0.4)
├── coffee-script@1.3.3
├── rimraf@2.0.3 (graceful-fs@1.1.14)
├── underscore.string@2.2.1
├── iconv-lite@0.2.11
├── minimatch@0.2.14 (sigmund@1.0.0, lru-cache@2.5.0)
├── findup-sync@0.1.2 (lodash@1.0.1)
├── glob@3.1.21 (inherits@1.0.0, graceful-fs@1.2.3)
└── js-yaml@2.0.5 (esprima@1.0.4, argparse@0.1.15)

///查看package.json对比安装后文件的变化
///创建node_modules文件夹 查看内容

D:\github\GruntJs>npm install grunt-contrib-uglify --save-dev
npm http GET https://registry.npmjs.org/grunt-contrib-uglify
npm http 200 https://registry.npmjs.org/grunt-contrib-uglify
-
-
-
npm http 200 https://registry.npmjs.org/amdefine
grunt-contrib-uglify@0.3.2 node_modules\grunt-contrib-uglify
├── chalk@0.4.0 (has-color@0.1.3, ansi-styles@1.0.0, strip-ansi@0.1.1)
├── grunt-lib-contrib@0.6.1 (zlib-browserify@0.0.1)
└── uglify-js@2.4.12 (uglify-to-browserify@1.0.2, async@0.2.10, optimist@0.3.7, source-map@0.1.31)

///查看package.json对比安装后文件的变化

D:\github\GruntJs>grunt
A valid Gruntfile could not be found. Please see the getting started guide for
more information on how to configure grunt: http://gruntjs.com/getting-started
Fatal error: Unable to find Gruntfile.

///创建Gruntfile.js文件：
///创建文件夹,增加js文件
///执行默认任务

D:\github\GruntJs>grunt
Running "uglify:build" (uglify) task
File build/js/getCookie.min.js created.
File build/js/sayGrunt.min.js created.

Running "uglify:dest" (uglify) task
File build/js/index.min.js created.

Done, without errors.

///说明执行默认任务情况，看对比

D:\github\GruntJs>grunt default
Running "uglify:build" (uglify) task
File build/js/getCookie.min.js created.
File build/js/sayGrunt.min.js created.

Running "uglify:dest" (uglify) task
File build/js/index.min.js created.

///查看相应目录及文件

///改变mangle: true 查看变化 

///Grunt Plugins 所有插件及配置选项

///执行一个不存在的任务

D:\github\GruntJs>grunt cssmin
Warning: Task "cssmin" not found. Use --force to continue.

Aborted due to warnings.

D:\github\GruntJs>grunt buildcss
Warning: Task "cssmin" not found. Use --force to continue.

Aborted due to warnings.

///加载插件 Gruntfile.js中增加 grunt.loadNpmTasks('grunt-contrib-cssmin');

D:\github\GruntJs>grunt cssmin
>> Local Npm module "grunt-contrib-cssmin" not found. Is it installed?
Warning: Task "cssmin" not found. Use --force to continue.

Aborted due to warnings.

///install grunt-contrib-cssmin

D:\github\GruntJs>npm install grunt-contrib-cssmin  --save-dev
npm http GET https://registry.npmjs.org/grunt-contrib-cssmin
npm http 200 https://registry.npmjs.org/grunt-contrib-cssmin
.
.
npm http 200 https://registry.npmjs.org/commander/-/commander-2.0.0.tgz
grunt-contrib-cssmin@0.7.0 node_modules\grunt-contrib-cssmin
├── grunt-lib-contrib@0.6.1 (zlib-browserify@0.0.1)
└── clean-css@2.0.8 (commander@2.0.0)

D:\github\GruntJs>grunt cssmin
>> No "cssmin" targets found.
Warning: Task "cssmin" failed. Use --force to continue.

Aborted due to warnings.

///增加任务 cssmin

D:\github\GruntJs>grunt cssmin
Running "cssmin:build" (cssmin) task
File build/css/base.min.css created.
File build/css/fixclear.min.css created.

///配置三种方式,合并并压缩css文件

///使用 matchdep，可以自动载入所有任务。

D:\github\GruntJs>grunt
Loading "Gruntfile.js" tasks...ERROR
>> Error: Cannot find module 'matchdep'
Warning: Task "default" not found. Use --force to continue.

Aborted due to warnings.

///install matchdep

D:\github\GruntJs>npm install matchdep --save-dev
npm http GET https://registry.npmjs.org/matchdep
npm http 200 https://registry.npmjs.org/matchdep
.
.
npm http 304 https://registry.npmjs.org/inherits
matchdep@0.3.0 node_modules\matchdep
├── stack-trace@0.0.7
├── resolve@0.5.1
├── globule@0.1.0 (minimatch@0.2.14, lodash@1.0.1, glob@3.1.21)
└── findup-sync@0.1.2 (lodash@1.0.1, glob@3.1.21)

D:\github\GruntJs>grunt cssmin
Running "cssmin:build" (cssmin) task
File build/css/i.min.css created.

Done, without errors.

//安装所使用到的其他插件

D:\github\GruntJs>npm install grunt-contrib-clean --save-dev

D:\github\GruntJs>grunt clean
Running "clean:build" (clean) task
Cleaning build/js...OK
Cleaning build/css...OK
Done, without errors.

D:\github\GruntJs>npm install grunt-contrib-concat --save-dev
D:\github\GruntJs>npm install grunt-contrib-copy --save-dev
D:\github\GruntJs>npm install grunt-contrib-htmlmin --save-dev
D:\github\GruntJs>npm install grunt-contrib-htmlhint --save-dev ///'grunt-contrib-htmlhint' is not in the npm registry.
D:\github\GruntJs>npm install grunt-contrib-imagemin --save-dev
D:\github\GruntJs>npm install grunt-contrib-jshint --save-dev
D:\github\GruntJs>npm install grunt-contrib-less --save-dev
D:\github\GruntJs>npm install grunt-contrib-compress --save-dev
D:\github\GruntJs>npm install grunt-contrib-qunit --save-dev  ///npm install -g phantomjs

http://cdn.bitbucket.org/ariya/phantomjs/downloads/phantomjs-1.9.7-windows.zip

C:\Users\ADMINI~1\AppData\Local\Temp\phantomjs\phantomjs-1.9.7-windows.zip

D:\github\GruntJs>npm install grunt-cssc --save-dev //css-condense 功能在cssmin中也实现了，可以不要。

D:\github\GruntJs>npm install connect-livereload --save-dev

D:\github\GruntJs>grunt connect
Warning: Task "connect" not found. Use --force to continue.

Aborted due to warnings.

D:\github\GruntJs>npm install grunt-contrib-watch --save-dev

D:\github\GruntJs>npm install grunt-contrib-connect --save-dev

D:\github\GruntJs>grunt connect
Running "connect:livereload" (connect) task
Started connect web server on http://localhost:8000

///配置live任务
grunt.registerTask('live', ['connect', 'watch']);

///访问页面：
http://localhost:8088/assets/grunt.html
http://localhost:35729/

///删除connect-livereload

D:\github\GruntJs>npm  uninstall connect-livereload
unbuild connect-livereload@0.3.2

///在package.json中手动删除

D:\github\GruntJs>grunt live
Loading "Gruntfile.js" tasks...ERROR
>> Error: Cannot find module 'connect-livereload'
Warning: Task "live" not found. Use --force to continue.

Aborted due to warnings.

D:\github\GruntJs>npm install grunt-contrib-livereload --save-dev
npm http GET https://registry.npmjs.org/grunt-contrib-livereload
npm http 200 https://registry.npmjs.org/grunt-contrib-livereload
.
.
npm http 304 https://registry.npmjs.org/abbrev
grunt-contrib-livereload@0.1.2 node_modules\grunt-contrib-livereload
└── tiny-lr@0.0.5 (debug@0.7.4, faye-websocket@0.4.4, qs@0.5.6, noptify@0.0.3
)

D:\github\GruntJs>grunt live
Loading "connect.js" tasks...ERROR
>> Error: Cannot find module 'connect-livereload'

D:\github\GruntJs>npm install connect-livereload --save-dev
