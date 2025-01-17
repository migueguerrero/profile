function showVideo(idVideo) {
  var modalVideo = $('.c-modal__video');
  var iframeVideo = '<iframe id="player-video" width="560" height="315" src="https://www.youtube.com/embed/' + idVideo + '?enablejsapi=1&autoplay=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
  modalVideo.html(iframeVideo);
}

function centerMenuScrool(target, outer) {
  var out = outer;
  var tar = target;
  var x = out.width();
  var y = tar.outerWidth(true);
  var z = tar.index();
  var q = 0;
  var m = out.find('li');
  for (var i = 0; i < z; i++) {
    q += $(m[i]).outerWidth(true);
  }
  
  var delta = Math.max(0, q - (x - y) / 2)
  if(out.scrollLeft() != delta  ){
  out.scrollLeft(Math.max(0, q - (x - y) / 2));
  }

}


$(document).ready(function () {

  $('.button-play').click(function (evt) {
    $('.c-modal').addClass('active');
    var idVideo = $(evt.currentTarget).data('video-id');
    showVideo(idVideo);
  });

  $('.c-modal, .btn-close').click(function () {
    $('.c-modal__video iframe')[0].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
    $('.c-modal').removeClass('active');
  });

  $(".main-slider .owl-carousel").owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    navText: ['<i class="icon-arrow-left">', '<i class="icon-arrow-right">'],
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 1
      },
      1000: {
        items: 1
      }
    }
  });

  $(".kit-bienvenida .owl-carousel").owlCarousel({
    loop: false,
    margin: 10,
    nav: true,
    navText: ['<i class="icon-arrow-left">', '<i class="icon-arrow-right">'],
    responsive: {
      0: {
        items: 2
      },
      600: {
        items: 1
      },
      1000: {
        items: 4
      }
    }
  });

  $(".aprende .videos .owl-carousel").owlCarousel({
    loop: true,
    margin: 30,
    nav: true,
    navText: ['<i class="icon-arrow-left">', '<i class="icon-arrow-right">'],
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 1
      },
      1000: {
        items: 3
      }
    }
  });

  $(".beneficios-slider .owl-carousel").owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    navText: ['<i class="icon-arrow-left">', '<i class="icon-arrow-right">'],
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 1
      },
      1000: {
        items: 1
      }
    }
  });

  $(".testimonios-slider .owl-carousel").owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    navText: ['<i class="icon-arrow-left">', '<i class="icon-arrow-right">'],
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 1
      },
      1000: {
        items: 1
      }
    }
  });

  $(".comunidad .data .owl-carousel").owlCarousel({
    loop: true,
    autoplay:true,
    autoplayTimeout:4000,
    margin: 0,
    nav: false,
   
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 1
      },
      1000: {
        items: 4
      }
    }
  })

  $('.accordion').on('show.bs.collapse', function (e) {
    el = $(e.target);
    el.parent().addClass("active");
  })

  $('.accordion').on('hide.bs.collapse', function (e) {
    el = $(e.target);
    el.parent().removeClass("active");
  });


/* Main Menu  */
  var sectionOffset = 0;
  var menu;
  var links;
  var activeLine;
  const sectionsContainer = document.querySelector('.page-sections');
  const sections = document.querySelectorAll('section');
  const nav = document.querySelector('.page-home .nav-main');
  if(nav){
  menu = nav.querySelector('.nav-main ul.nav');
  links = nav.querySelectorAll('li.nav-item a');
  sectionOffset = nav.offsetHeight + 10;
  activeLine =nav.querySelector('.active-line');
  }
  const activeClass = 'active';
  const activeLink = null;
  let activeIndex = -1;
  let isScrolling = true;
  let userScroll = true;
  var currentID = "";

  var navMainItems = document.querySelectorAll(".page-home .nav-main ul.nav li.nav-item a");
      navMainItems.forEach(function (navMainItem) {
        navMainItem.addEventListener("click", function (e) {
          userScroll = false;
          currentID = $(e.target).attr("href");
          if(currentID.indexOf("#")==0){
            e.preventDefault();
            handleActiveLinkUpdate(1);
            $(document).scrollTop($(currentID).offset().top-40);
          }

        });
      });


  var logoStickyLink = document.querySelector(".page-home a.logo.sticky");  
 
  if(logoStickyLink){
        logoStickyLink.addEventListener("click", function (e) {
        e.preventDefault();
        anchor = $(e.target).parent().attr("href");
        console.log(anchor);
        if(anchor.indexOf("#")==0){
              
              $(document).scrollTop($(anchor).offset().top-40);
        }
      });
  }

  const moveActiveLine = () => {
    const link = document.querySelector('.page-home .nav-main ul.nav li.nav-item a[href="' + currentID + '"]');
    const linkX = link.getBoundingClientRect().x;
    const menuX = menu.getBoundingClientRect().x;
    activeLine.style.display = `block`;
    activeLine.style.transform = `translateX(${(menu.scrollLeft - menuX) + linkX}px)`;
    activeLine.style.width = `${link.offsetWidth + 10 }px`;
  }

  const setMenuLeftPosition = position => {
    menu.scrollTo({
      left: position,
      behavior: 'smooth',
    });
  };

  const setActiveClass = () => {
    $('.nav-main ul.nav li.nav-item a[href="' + currentID + '"]').parent().addClass("active");
  };

  const checkMenuOverflow = () => {
    const activeLink = document.querySelector('.page-home .nav-main ul.nav li.nav-item a[href="' + currentID + '"]').getBoundingClientRect();
    const offset = 200;
    if (Math.floor(activeLink.right) > window.innerWidth) {
      setMenuLeftPosition(menu.scrollLeft + activeLink.right - window.innerWidth + offset);
    } else {
      setMenuLeftPosition(menu.scrollLeft + activeLink.left  - offset)
    }
  }

  const removeActiveClass = () => {
    $('.page-home .nav-main ul.nav li.nav-item.active').removeClass('active');
  };

  const handleActiveLinkUpdate = current => {
    removeActiveClass();
    activeIndex = current;
    checkMenuOverflow();
    setActiveClass();
    moveActiveLine();
  };


  window.addEventListener("scroll", () => {
    const AuxcurrentIndex = sectionsContainer.getBoundingClientRect().top < 0
 ? (sections.length - 1) - [...sections].reverse().findIndex(section => window.scrollY >= section.offsetTop - sectionOffset * 2)
      : -1;



    const btnSticky = document.querySelector('.btn-sticky');
    if(AuxcurrentIndex>0  ){
        if(btnSticky){
        btnSticky.classList.add("btn-sticky-show");
        }
    }else{
      if(btnSticky){
        btnSticky.classList.remove("btn-sticky-show");
        }
    }
       
    if (AuxcurrentIndex > -1) {
      var  currentIDAux = "#"+sections[AuxcurrentIndex].id;
      if (sections[AuxcurrentIndex].classList.contains('nav-target')) {
        if (userScroll  && currentID !== currentIDAux) {
          console.log(currentIDAux);
          currentID = currentIDAux;
          handleActiveLinkUpdate(currentID);
        } else{
          window.clearTimeout(isScrolling);
          isScrolling = setTimeout(() => {userScroll = true;}, 100);
        }
      }



      if (AuxcurrentIndex == 6) {
        $('.counter-count').each(function () {
          if ($(this).text() == "0") {
            var value = $(this).data("value");
            var parent = $(this).parent().parent();
            console.log(parent.find(".nivel").css("background-color"));
            parent.find(".nivel").css({ "width": value + "%" }, { "background-color": parent.children(".nivel").css("background-color") })
            $(this).prop('Counter', 0).animate({
              Counter: value
            }, {
              duration: 1000,
              easing: 'swing',
              step: function (now) {
                $(this).text(Math.ceil(now));
              }
            });
          }
        });
      }
    } else {
        if(userScroll){
          currentID="";
          $('.page-home .nav-main ul.nav li.nav-item.active').removeClass('active');
          if(activeLine){
            activeLine.style.display = `none`;
          }
        }
    }
  });


  var observer = new IntersectionObserver(function (entries) {
    // no intersection with screen
    if (entries[0].intersectionRatio === 0){
      document.querySelector(".nav-main").classList.add("sticky");
      const link = document.querySelector('.page-home .nav-main ul.nav li.nav-item a[href="' + currentID + '"]');
      if(link){
        const linkX = link.getBoundingClientRect().x;
        const menuX = menu.getBoundingClientRect().x;
        activeLine.style.display = `block`;
        activeLine.style.transform = `translateX(${(menu.scrollLeft - menuX) + linkX}px)`;
        activeLine.style.width = `${link.offsetWidth + 20 }px`;
      }

    // fully intersects with screen
    }
    else if (entries[0].intersectionRatio === 1){
          document.querySelector(".nav-main").classList.remove("sticky");
          currentID="";
          $('.nav-main ul.nav li.nav-item.active').removeClass('active');
          if(activeLine){
            activeLine.style.display = `none`;
          }
    }
  }, { threshold: [0, 1] });

  observer.observe(document.querySelector("#nav-container-top"));

  var tabsLinks = document.querySelectorAll(".yanbal-tabs .nav-tabs .nav-link ");

  tabsLinks.forEach(function (tablink) {
    if (tablink.classList.contains("active")) {
      setLineTab(tablink);
    }

    tablink.addEventListener("click", function (e) {
      setLineTab(e.target)
    });
  });

  function setLineTab(link) {
    let tabs = link.parentElement.parentElement;
    var out = $(tabs);
    var tar = $(link.parentElement);
    var x = out.width();
    var y = tar.outerWidth(true);
    var z = tar.index();
    var q = 0;
    var m = out.find('li');
    for (var i = 0; i < z; i++) {
      q += $(m[i]).outerWidth(true);
    }
    out.animate({
      scrollLeft: Math.max(0, q - (x - y) / 2)
    }, 50, function(){
      const linkX = link.getBoundingClientRect().x;
      const tabX = tabs.getBoundingClientRect().x;
      const line = tabs.querySelector(".active-tab");
      if (line) {
        line.style.transform = `translateX(${(tabs.scrollLeft - tabX) + linkX}px)`;
        line.style.width = `${link.offsetWidth}px`;
      }
    });


  }

  new WOW().init({
    boxClass: 'wow',
    animateClass: 'animated',
    offset: 100,
    mobile: true,
    live: true
  });







  var respuesta1 = "";
  var respuesta2 = "";
  var respuesta3 = "";


  $(".btn.calcular").click(function(){
    $("#respuesta").hide();
    $("#pregunta1").fadeIn();
    $(document).scrollTop($("#pregunta1").offset().top-20);
   
    $("#pregunta2").css("transform", "translateX(-100%)");
    $("#pregunta3").css("transform", "translateX(-100%)");
    $("#respuesta").css("transform", "translateX(-100%)");

  })

  $(".encuesta .opciones .item").click(function () {

    if ($(this).data("pregunta") == "pregunta1") {
      $("#pregunta1").hide();
      respuesta1 = $(this).data("value");
      $("#pregunta2").fadeIn();
      $("#pregunta2").css("transform", "translateX(0)");
      

    }

    if ($(this).data("pregunta") == "pregunta2") {
      $("#pregunta2").hide();
      respuesta2 = $(this).data("value");
      $("#pregunta3").fadeIn();
      $("#pregunta3").css("transform", "translateX(0)");
    }

    if ($(this).data("pregunta") == "pregunta3") {
      $("#pregunta3").hide();
      respuesta3 = $(this).data("value");
      cacularGanancia(respuesta1+"-"+respuesta2+"-"+respuesta3);
      $("#respuesta").fadeIn();
      $("#respuesta").css("transform", "translateX(0)");
    }
  })


  function cacularGanancia(respuesta){

  resultado =  resultados[respuesta] ;
  
  ganancia = resultado.ganancia;
  venta = resultado.venta;
  mensaje = resultado.mensaje
  texto = mensajes[mensaje];
  texto= texto.replace(/{(\w*)}/g,ganancia);


 var ventaHTML = $("#respuesta .caption .venta");
 var gananciaHTML = $("#respuesta .caption .ganancia");

 var ventaText = mensajes.msg4;
 ventaText= ventaText.replace(/{(\w*)}/g,venta);
 ventaHTML.html(ventaText);

 var gananciaText = mensajes.msg3;
 gananciaText= gananciaText.replace(/{(\w*)}/g,ganancia);
 gananciaHTML.html(gananciaText);

 var textoHTML = $("#respuesta .mensaje .texto");
  textoHTML.html(texto);
  }



  var navItems = document.querySelectorAll(".page-home .nav-main ul.nav li.nav-item a");
  navItems.forEach(function (navItem) {
    navItem.style.width = `${navItem.offsetWidth + 10}px`;
  });

  var w =0;
  if(document.querySelector(".page-home .nav-main ul.nav")){
  var w = document.querySelector(".page-home .nav-main ul.nav").offsetWidth;


  navItems = document.querySelectorAll(".page-home .nav-main ul.nav li.nav-item");
  var wd =0;
  var i =1;
  var delta =0
  margin =20;
  found=false;
  navItems.forEach(function (navItem) {
    console.log("ancho:" + (navItem.offsetWidth));
    wd +=navItem.offsetWidth ;
   
    delta= w-(wd-30);
    console.log(delta);
    if((delta) < 0 && !found){
      if(Math.abs(delta) < (navItem.offsetWidth/2)){
           margin =   navItem.offsetWidth/12;
      }else{
           margin =   -1 * navItem.offsetWidth/12;
      }
      found =true ;
    }
  });
  }

  var navItems = document.querySelectorAll(".page-home .nav-main ul.nav li.nav-item a");
  navItems.forEach(function (navItem) {
    navItem.style.marginRight = `${20+margin}px`;
  });

  console.log(i);

  var tabItems = document.querySelectorAll(".page-faq .nav-tabs .nav-item");
  tabItems.forEach(function (tabItem) {
    tabItem.style.width = `${tabItem.offsetWidth }px`;
  });






  $("a.scroll").click(function(e){

   var anchor = $(e.target).attr("href");
          if(anchor.indexOf("#")==0){
            e.preventDefault();
          
            $(document).scrollTop($(anchor).offset().top);
          }


  });


  window.addEventListener("resize", function(){
    var tabsLinks = document.querySelectorAll(".yanbal-tabs .nav-tabs .nav-link ");
    tabsLinks.forEach(function (tablink) {
      if (tablink.classList.contains("active")) {
        setLineTab(tablink);
      }
    });
  });

})



