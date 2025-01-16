/* MUESTRA Y OCULTA NAV-STICKY */
myID = document.getElementById("myID");
var myScrollFunc = function() {
    var y = window.scrollY;
    if (y >= 250 && y <= 9999999) {
        myID.className = "bottomMenu muestra"
    } else {
        myID.className = "bottomMenu oculta"
    }
};

window.addEventListener("scroll", myScrollFunc);
/* DETIENE AUTO PLAY DE VIDEOS AL CERRAR UNA VENTANA MODAL */
$(function() {
    $('.js-video-play').click(function(evt) {
        // $('.c-modal').addClass('active');
        let idVideo = $(evt.currentTarget).data('video-id');
        //console.log(idVideo);
        showVideo(idVideo);
    });

    $('.btn-close').click(function() {
        $('.js-modal iframe')[0].contentWindow.postMessage('{"event":"command","func":"' +
            'stopVideo' + '","args":""}', '*');
        $('.c-modal').removeClass('active');
    });

    function showVideo(idVideo) {
        let modalVideo = $('.js-modal');
        let iframeVideo = '<iframe id="player-video" width="560" height="315" src="https://www.youtube.com/embed/' + idVideo + '?enablejsapi=1&autoplay=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
        modalVideo.html(iframeVideo);
    }
});
/* RECIBE PARAMETROS DESDE YANBAL.COM */