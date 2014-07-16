/*de.js*/

// 为requirejs 模块名做全局配置
// 此处配置与打包配置无关（官方解释）
// 打包配置，需要重写，写在了gruntfile.js中
// 请保持两处命名一致
requirejs.config({
    baseUrl: './js',
    paths: {
        'jquery': 'libs/jquery-1.8.2',
        'beta':'app/jquery.beta',
        'a': 'utils/a',
        'b': 'utils/b',
        'c': 'utils/c',
        'd': 'utils/d',
        'e': 'utils/e',
        'main': 'utils/main',
        'math': 'utils/math',
        'domready':'utils/domready',
        'f':"utils/f"
    }
});
// 非AMD模块配置
requirejs.config({
    shim: {
        'beta':{
            deps:['jquery']
        },
        'jquery.alpha':{
            deps:['jquery']
        }
    }
});

requirejs(['d', 'e', 'jquery'], function (d, e, $) {
    var i = d.info + ',' + e.info;
    $('.ui-grid-box').html(i);
    console.log($.fn.jquery);
});

requirejs(['math'], function (math) {
    console.log(math.add(1, 2));
});


// Load the main app module to start the app
requirejs(["f"]);

requirejs(['domready!'], function (doc){
    //called once the DOM is ready
    console.log(doc.getElementById('J_uiGrid').nodeName);

});
