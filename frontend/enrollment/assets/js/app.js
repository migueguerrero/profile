

$('input[type="radio"]').change(function () {
  $(".select-radio").removeClass("selected");
  $(".modal-product").removeClass("selected");
  if ($(this).is(':checked')) {
    console.log($(this).parent().parent().parent());
    $(this).parent().parent().parent().addClass("selected");
  }
});

$(".btn-nav-mob").click(function () {
  $(".side-bar").addClass("show");
  $(".nav-overlay-mob").addClass("show");


})
$(".side-bar .close").click(function () {
  $(".side-bar").removeClass("show");
  $(".nav-overlay-mob").removeClass("show");
});


var consultoras = [
  { name: "RoxAnn Placencia", address: "Código 123456789", img: "assets/img/imgs/user.jpg" },
  { name: "RoxAnn Placencia", address: "Código 123456789", img: "assets/img/imgs/user.jpg" },
  { name: "RoxAnn Placencia", address: "Código 123456789", img: "assets/img/imgs/user.jpg" },
  { name: "RoxAnn Placencia", address: "Código 123456789", img: "assets/img/imgs/user.jpg" },
  { name: "RoxAnn Placencia", address: "Código 123456789", img: "assets/img/imgs/user.jpg" },
  { name: "RoxAnn Placencia", address: "Código 123456789", img: "assets/img/imgs/user.jpg" },
  { name: "RoxAnn Placencia", address: "Código 123456789", img: "assets/img/imgs/user.jpg" },
  { name: "RoxAnn Placencia", address: "Código 123456789", img: "assets/img/imgs/user.jpg" }

]

if (document.getElementById("inputConsultora")) {
  autocomplete(document.getElementById("inputConsultora"), consultoras);
}



$(".header-order .link.more").click(function (e) {

  e.preventDefault();
  if ($(this).parent().find(".amounts").hasClass("open")) {
    $(this).parent().find(".amounts").removeClass("open");
    $(this).html("Ver más");
  } else {
    $(this).parent().find(".amounts").addClass("open");
    $(this).html("Ver menos")
  }
})

/* Steps control  */

let stepBar = $(".steps .bar");
let firstStep=$(".steps .steps__item:first-child");
let activeStep= $(".steps .steps__item.is-active");
let offsetActive= activeStep.find(".step__number").offset();
let stepNumber =firstStep.find(".step__number");
let offsetNumber= stepNumber.offset();
let offsetFirst=offsetNumber.left;
let offsetParent= stepNumber.parent().parent().offset();

stepBar.css({left: (offsetFirst-offsetParent.left)+"px"});
stepBar.css({width: (offsetActive.left-offsetFirst)+"px"});



$('.steps__item').on('click', function (evt) {


  stepBar.css({transition: "all 0.5s ease-out"});
  var stepNumber = $(this).find(".step__number");
    let offsetNumber= stepNumber.offset();
    stepBar.css({width: (offsetNumber.left-offsetFirst)+"px"});
    
    var currentIndex = $(this).index();
    var currentCount = $(this).parent().children().length;
    $('.steps__item').removeClass('is-active');
    $(evt.currentTarget).addClass('is-active');
 
    var listElements = $(this).parent().children();
      for (var i = 0; i < currentIndex; i++) {
        var auxLi = listElements.get(i);
        $(auxLi).removeClass('is-active');
        $(auxLi).addClass('is-complete');
      }
      for (var i = currentIndex + 1; i < currentCount; i++) {
        var auxLi = listElements.get(i);
        $(auxLi).removeClass('is-active');
        $(auxLi).removeClass('is-complete');
      }

      if ($(evt.currentTarget).hasClass('is-complete')) {
        $(evt.currentTarget).removeClass('is-complete');
      }
});








