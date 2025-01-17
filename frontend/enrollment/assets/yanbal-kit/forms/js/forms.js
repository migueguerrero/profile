// Password #1

inputTogglePwd = {
  className: ".toggle-pwd",
  element: null,
  input: null,
  icon: null,
  iconHideClass: "icon-eye",
  iconShowClass: "icon-eye-press",
  init: function () {

    pwdToggles = document.querySelectorAll(this.className);
    pwdToggles.forEach(element => {
      this.view(element);
      this.addEvents(element);
    });
  },
  addEvents: function (element) {
    i = element.querySelector('i[class^="icon-eye"]');
    console.log(i);
    i.addEventListener("click", this.toggle.bind(this))
  },
  toggle: function (e) {


    icon = e.target;
    if (icon.className == this.iconShowClass) {
      icon.classList.remove(this.iconShowClass);
      icon.classList.add(this.iconHideClass);
      control = icon.closest(this.className);
      input = control.querySelector("input");
      input.type = "password";
    } else {
      icon.classList.remove(this.iconHideClass);
      icon.classList.add(this.iconShowClass);
      control = icon.closest(this.className);
      input = control.querySelector("input");
      input.type = "text";
    }
  }
  ,
  view: function (element) {
    icon = document.createElement("i");
    icon.classList.add(this.iconHideClass);
    element.appendChild(icon);
  }
}



inputTogglePwd.init();





var x, i, j, l, ll, selElmnt, a, b, c;
/* Look for any elements with the class "select": */
x = document.getElementsByClassName("select");
l = x.length;
for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  ll = selElmnt.length;

  a = x[i].querySelector(".form-control");



  //a.value = selElmnt.options[selElmnt.selectedIndex].innerHTML;

  /* For each element, create a new DIV that will contain the option list: */
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < ll; j++) {
    /* For each option in the original select element,
    create a new DIV that will act as an option item: */
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function (e) {
      /* When an item is clicked, update the original select box,
      and the selected item: */
      var y, i, k, s, h, sl, yl;
      s = this.parentNode.parentNode.getElementsByTagName("select")[0];
      sl = s.length;
      selectObj = this.closest(".select");
      h = selectObj.querySelector(".form-control");
      for (i = 0; i < sl; i++) {
        if (s.options[i].innerHTML == this.innerHTML) {
          s.selectedIndex = i;
          h.value = this.innerHTML;
          y = this.parentNode.getElementsByClassName("same-as-selected");
          yl = y.length;
          for (k = 0; k < yl; k++) {
            y[k].removeAttribute("class");
          }
          this.setAttribute("class", "same-as-selected");
          break;
        }
      }
      closeAllSelect(h);
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);



  a.addEventListener("click", function (e) {
    a = e.target;

    e.stopPropagation();
    closeAllSelect(a);

    console.log("click");

    p = a.closest(".select");
    el = p.querySelector(".select-items");
    el.classList.toggle("select-hide");

    //this.closest(".select").classList.toggle("select-arrow-active");
  });



}

function closeAllSelect(el) {
  /* A function that will close all select boxes in the document,
  except the current select box: */
  var x, y, i, xl, yl, arrNo = [];
  x = document.querySelectorAll(".select .select-items");
  y = document.querySelectorAll(".select .form-control");
  xl = x.length;
  yl = y.length;

  y.forEach(element => {

    if (el == y[i]) {
      arrNo.push(i)
    } else {
      element.closest(".select").classList.remove("select-arrow-active");
    }


  });


  x.forEach((element, index) => {
    if (arrNo.indexOf(index)) {
      element.classList.add("select-hide");
    }
  });

}


function showImage(src, target) {
  var fr = new FileReader();

  fr.onload = function () {
    target.src = fr.result;
  }
  fr.readAsDataURL(src.files[0]);

}
function putImage() {
  var src = document.getElementById("select_image");
  var target = document.getElementById("target");
  showImage(src, target);
}

function autocomplete(inp, arr) {
		
  var currentFocus;
    
  inp.addEventListener("input", function(e) {
    var a, b, i, val = this.value;
    
    closeAllLists();
    if (!val) { return false;}
    currentFocus = -1;
      
    a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    
    this.parentNode.appendChild(a);
    
    for (i = 0; i < arr.length; i++) {
      
      if (arr[i].name.substr(0, val.length).toUpperCase() == val.toUpperCase()) {
      
      b = document.createElement("DIV");
    
      b.innerHTML = "<strong>" + arr[i].name.substr(0, val.length) + " ";
      b.innerHTML += arr[i].name.substr(val.length)+"</strong>";
      b.innerHTML +='<div ">'+ arr[i].address +'</div>'
      b.innerHTML += "<input type='hidden' value='" + arr[i].name + "'>";
      
        b.addEventListener("click", function(e) {
        
        inp.value = this.getElementsByTagName("input")[0].value;
        
        closeAllLists();
      });
      a.appendChild(b);
      }
    }
  });

  inp.addEventListener("keydown", function(e) {
    var x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
    
      currentFocus++;
      
      addActive(x);
    } else if (e.keyCode == 38) { 
     
      currentFocus--;
    
      addActive(x);
    } else if (e.keyCode == 13) {
     
      e.preventDefault();
      if (currentFocus > -1) {
      
      if (x) x[currentFocus].click();
      }
    }
  });
  function addActive(x) {
  
    if (!x) return false;
    
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    
    for (var i = 0; i < x.length; i++) {
    x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
   
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
    if (elmnt != x[i] && elmnt != inp) {
    x[i].parentNode.removeChild(x[i]);
    }
  }
  }
 
  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
  }