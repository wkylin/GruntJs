/**
 * getCookie
 * @param name
 * @returns {*}
 */
function getCookie(name) {
    var cookieValue = null;
    if (window.document.cookie && window.document.cookie !== '') {
        var cookies = window.document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

(function () {
    var num =1;
    $(".sbar_oper li").hover(function () {
        if(num ==2 ){
            $(this).addClass("curr");
        }

    }, function () {
        $(this).removeClass("curr");
    });
})();
