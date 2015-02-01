// 为requirejs 模块名做全局配置
requirejs.config({
    baseUrl: './js',
    paths: {
        'jquery': 'libs/jquery-1.8.2.min',
        'beta': 'utils/jquery.beta',
        'alpha': 'utils/jquery.alpha',
        'a': 'utils/a',
        'b': 'utils/b',
        'c': 'utils/c',
        'd': 'utils/d',
        'e': 'utils/e',
        'main': 'utils/main',
        'math': 'utils/math',
        'domready': 'utils/domready',
        'f': "utils/f"
    }
});
// 非AMD模块配置
requirejs.config({
    shim: {
        'beta': {
            deps: ['jquery']
        },
        'alpha': {
            deps: ['jquery']
        }
    }
});

//jQuery
requirejs(['d', 'e', 'jquery'], function (d, e, $) {
    var i = d.info + ',' + e.info;
    $('.ui-grid-box').html(i);
    console.log($.fn.jquery);
});

//Math
requirejs(['math'], function (math) {
    console.log(math.add(1, 2));
});


// Load the main app module to start the app
requirejs(["f"]);

requirejs(['domready!'], function (doc) {
    //called once the DOM is ready
    console.log(doc.getElementById('J_uiGrid').nodeName);

});
