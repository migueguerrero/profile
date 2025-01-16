// Parametros Usuario: Recibe, extrae y envía valores
$(function() {
    var result = ""; // Variable para validar la expresion regular
    let noParams = false;
    /* Obtener Parametro URL */
    function getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        result = regex.exec(location.search);
        return result === null ? '' : decodeURIComponent(result[1].replace(/\+/g, ' '));
    }
    let country = getUrlParameter("country");
    let user = getUrlParameter("replicated");
    let lang = getUrlParameter("lang");

    /*** Seteamos en el enlace yanbal */
    setParamsYanbalLink(country, user, lang, result);

    function setParamsYanbalLink(country, user, lang, result) {
        //console.log('Param country vacio' + country);
        let endUrl;
        let link = document.getElementById('js-url');
        //console.log('Result tiene: ' + result);
        if (result === null) {
            noParams = true;
            endUrl = 'https://www.yanbal.com/';
            //link.setAttribute('href', endUrl);
            //console.log(result);
        } else {
            endUrl = 'https://www.yanbal.com/' + country + '/' + user + '/' + lang;
            link.setAttribute('href', endUrl);
        }
    }

    /***********  Cambiamos idioma por pagina *******************/
    let pathName = window.location.pathname.split('/').pop();
    //console.log('Solo PathNamesssss: ' + pathName);
    setLanguage(pathName, noParams);

    function setLanguage(pathName, noParams) {
        //console.log('Result langunage tiene: ' + result);
        let esUrl = document.getElementById('js-es-url'); // URL Español
        let enUrl = document.getElementById('js-en-url'); // URL Ingles
        if (noParams == false) {
            //let langEsUrl = 'http://eligeyanbal.yanbal.com/us-es/' + pathName + '?replicated=' + user + '&country=' + country + '&lang=' + lang;
            //let langEnUrl = 'http://eligeyanbal.yanbal.com/us-en/' + pathName + '?replicated=' + user + '&country=' + country + '&lang=' + lang;
            let langEnUrl;
            let langEsUrl;

            if (country == 'us') {
                langEsUrl = 'http://eligeyanbal.yanbal.com/us-es/' + pathName + '?replicated=' + user + '&country=' + country + '&lang=' + lang;
                langEnUrl = 'http://eligeyanbal.yanbal.com/us-en/' + pathName + '?replicated=' + user + '&country=' + country + '&lang=' + lang;
            }

            if (country == 'it') {
                langEsUrl = 'http://eligeyanbal.yanbal.com/it-es/' + pathName + '?replicated=' + user + '&country=' + country + '&lang=' + lang;
                langEnUrl = 'http://eligeyanbal.yanbal.com/it-it/' + pathName + '?replicated=' + user + '&country=' + country + '&lang=' + lang;
            }
            //  inicio código agregado mike

            if (country == 'bo') {
                langEsUrl = 'http://eligeyanbal.yanbal.com/bo/?replicated=&country=' + country + '&lang=' + user;
            }

            if (country == 'co') {
                langEsUrl = 'http://eligeyanbal.yanbal.com/co/?replicated=&country=' + country + '&lang=' + user;
            }

            if (country == 'gt') {
                langEsUrl = 'http://eligeyanbal.yanbal.com/gt/?replicated=&country=' + country + '&lang=' + user;
            }

            if (country == 'mx') {
                langEsUrl = 'http://eligeyanbal.yanbal.com/mx/?replicated=&country=' + country + '&lang=' + user;
            }

            if (country == 'pe') {
                langEsUrl = 'http://eligeyanbal.yanbal.com/pe/?replicated=&country=' + country + '&lang=' + user;
            }

            if (country == 'es') {
                langEsUrl = 'http://eligeyanbal.yanbal.com/es/?replicated=&country=' + country + '&lang=' + user;
            }

            if (country == 'ec') {
                langEsUrl = 'http://eligeyanbal.yanbal.com/ec/?replicated=&country=' + country + '&lang=' + user;
            }

            //  fin código agregado mike

            if (esUrl != null) {
                esUrl.setAttribute('href', langEsUrl);
            }
            if (enUrl != null) {
                enUrl.setAttribute('href', langEnUrl);
            }
        }
    }
    /************************************************************** */

    setParamsNavigationButtons(noParams);
    /*** Seteamos los parametros de la URL en los botones de navegacion de cada pagina*/
    function setParamsNavigationButtons(noParams) {
        let buttonsLink = document.querySelectorAll('.js-buttons-link');
        if (noParams == false) {
            for (let i = 0; i < buttonsLink.length; i++) {
                let href = '';
                let concatUrl = ''
                href = buttonsLink[i].getAttribute('href');
                concatUrl = href + '?' + 'replicated=' + user + '&country=' + country + '&lang=' + lang;
                buttonsLink[i].setAttribute('href', concatUrl);
            }
        }
    }

    /********************************************************************************* */


    /***************** Seteamos en el boton enrollment ********************************/
    setParamEnrollment();

    function setParamEnrollment() {
        let btnEnrollment = document.querySelectorAll('.js-button-enrollment');
        //console.log('Boton enrollment: ' + btnEnrollment);
        if (noParams == false) {
            for (let i = 0; i < btnEnrollment.length; i++) {
                console.log(btnEnrollment[i].getAttribute('href'));
                let urlEnrollment = 'https://www.yanbal.com/' + country + '/' + user + '/' + lang + '/enrollment';
                btnEnrollment[i].setAttribute('href', urlEnrollment);
            }
        }
    }
    /*************************************************************************************** */
});