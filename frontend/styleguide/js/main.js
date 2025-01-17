// BUSCAR *************************************** */
$("#buscar").on("click", function () {
	$(".search-top").fadeIn();
});
$("#closebuscartop").on("click", function () {
	$(".search-top").fadeOut();
});
$("#chkbtn").click(function () {
	if ($(this).is(":checked")) {
		$(".box-tag").removeClass("act");
	} else {
		$(".box-tag").addClass("act");
	}
});
//SLIBAR ************************************ */
$(document).ready(function () {
	$("#sidebar").mCustomScrollbar({
		theme: "minimal"
	});
	$('#close, .overlay').on('click', function () {
		$('#sidebar').removeClass('active');
		$('.overlay').fadeOut();
	});
	$('#sidebarCollapse').on('click', function () {
		$('#sidebar').addClass('active');
		$('.overlay').fadeIn();
		$('.collapse.in').toggleClass('in');
		$('a[aria-expanded=true]').attr('aria-expanded', 'false');
	});
});
//QUANTIY ************************************ */
$(document).on('click', '.number-spinner button', function () {
	var btn = $(this),
		oldValue = btn.closest('.number-spinner').find('input').val().trim(),
		newVal = 0;
	if (btn.attr('data-dir') == 'up') {
		newVal = parseInt(oldValue) + 1;
	} else {
		if (oldValue > 1) {
			newVal = parseInt(oldValue) - 1;
		} else {
			newVal = 1;
		}
	}
	btn.closest('.number-spinner').find('input').val(newVal);
});
//SELECT COMPONENT  ************************************ */
var util = {
	f: {
		addStyle: function (elem, prop, val, vendors) {
			var i, ii, property, value;
			if (!util.f.isElem(elem)) {
				elem = document.getElementById(elem);
			}
			if (!util.f.isArray(prop)) {
				prop = [prop];
				val = [val];
			}
			for (i = 0; i < prop.length; i += 1) {
				var thisProp = String(prop[i]),
					thisVal = String(val[i]);
				if (typeof vendors !== "undefined") {
					if (!util.f.isArray(vendors)) {
						vendors.toLowerCase() == "all"
							? (vendors = ["webkit", "moz", "ms", "o"])
							: (vendors = [vendors]);
					}
					for (ii = 0; ii < vendors.length; ii += 1) {
						elem.style[vendors[i] + thisProp] = thisVal;
					}
				}
				thisProp = thisProp.charAt(0).toLowerCase() + thisProp.slice(1);
				elem.style[thisProp] = thisVal;
			}
		},
		cssLoaded: function (event) {
			var child = util.f.getTrg(event);
			child.setAttribute("media", "all");
		},
		events: {
			cancel: function (event) {
				util.f.events.prevent(event);
				util.f.events.stop(event);
			},
			prevent: function (event) {
				event = event || window.event;
				event.preventDefault();
			},
			stop: function (event) {
				event = event || window.event;
				event.stopPropagation();
			}
		},
		getSize: function (elem, prop) {
			return parseInt(elem.getBoundingClientRect()[prop], 10);
		},
		getTrg: function (event) {
			event = event || window.event;
			if (event.srcElement) {
				return event.srcElement;
			} else {
				return event.target;
			}
		},
		isElem: function (elem) {
			return util.f.isNode(elem) && elem.nodeType == 1;
		},
		isArray: function (v) {
			return v.constructor === Array;
		},
		isNode: function (elem) {
			return typeof Node === "object"
				? elem instanceof Node
				: elem &&
				typeof elem === "object" &&
				typeof elem.nodeType === "number" &&
				typeof elem.nodeName === "string" &&
				elem.nodeType !== 3;
		},
		isObj: function (v) {
			return typeof v == "object";
		},
		replaceAt: function (str, index, char) {
			return str.substr(0, index) + char + str.substr(index + char.length);
		}
	}
},
	form = {
		f: {
			init: {
				register: function () {
					console.clear(); // just cuz codepen
					var child,
						children = document.getElementsByClassName("field"),
						i;
					for (i = 0; i < children.length; i += 1) {
						child = children[i];
						util.f.addStyle(child, "Opacity", 1);
					}
					children = document.getElementsByClassName("psuedo_select");
					for (i = 0; i < children.length; i += 1) {
						child = children[i];
						child.addEventListener("click", form.f.select.toggle);
					}
				},
				unregister: function () {
				}
			},
			select: {
				blur: function (field) {
					field.classList.remove("focused");
					var child,
						children = field.childNodes,
						i,
						ii,
						nested_child,
						nested_children;
					for (i = 0; i < children.length; i += 1) {
						child = children[i];
						if (util.f.isElem(child)) {
							if (child.classList.contains("deselect")) {
								child.parentNode.removeChild(child);
							} else if (child.tagName == "SPAN") {
								if (!field.dataset.value) {
									util.f.addStyle(child, ["FontSize", "Top"], ["16px", "32px"]);
								}
							} else if (child.classList.contains("psuedo_select")) {
								nested_children = child.childNodes;
								for (ii = 0; ii < nested_children.length; ii += 1) {
									nested_child = nested_children[ii];
									if (util.f.isElem(nested_child)) {
										if (nested_child.tagName == "SPAN") {
											if (!field.dataset.value) {
												util.f.addStyle(
													nested_child,
													["Opacity", "Transform"],
													[0, "translateY(24px)"]
												);
											}
										} else if (nested_child.tagName == "UL") {
											util.f.addStyle(
												nested_child,
												["Height", "Opacity"],
												[0, 0]
											);
										}
									}
								}
							}
						}
					}
				},
				focus: function (field) {
					field.classList.add("focused");
					var bool = false,
						child,
						children = field.childNodes,
						i,
						ii,
						iii,
						nested_child,
						nested_children,
						nested_nested_child,
						nested_nested_children,
						size = 0;
					for (i = 0; i < children.length; i += 1) {
						child = children[i];
						util.f.isElem(child) && child.classList.contains("deselect")
							? (bool = true)
							: null;
					}
					if (!bool) {
						child = document.createElement("div");
						child.className = "deselect";
						child.addEventListener("click", form.f.select.toggle);
						field.insertBefore(child, children[0]);
					}
					for (i = 0; i < children.length; i += 1) {
						child = children[i];
						if (
							util.f.isElem(child) &&
							child.classList.contains("psuedo_select")
						) {
							nested_children = child.childNodes;
							for (ii = 0; ii < nested_children.length; ii += 1) {
								nested_child = nested_children[ii];
								if (
									util.f.isElem(nested_child) &&
									nested_child.tagName == "UL"
								) {
									size = 0;
									nested_nested_children = nested_child.childNodes;
									for (iii = 0; iii < nested_nested_children.length; iii += 1) {
										nested_nested_child = nested_nested_children[iii];
										if (
											util.f.isElem(nested_nested_child) &&
											nested_nested_child.tagName == "LI"
										) {
											size += util.f.getSize(nested_nested_child, "height");
											console.log("size: " + size);
										}
									}
									util.f.addStyle(
										nested_child,
										["Height", "Opacity"],
										[size + "px", 1]
									);
								}
							}
						}
					}
				},
				selection: function (child, parent) {
					var children = parent.childNodes,
						i,
						ii,
						nested_child,
						nested_children,
						time = 0,
						value;
					if (util.f.isElem(child) && util.f.isElem(parent)) {
						parent.dataset.value = child.dataset.value;
						value = child.innerHTML;
					}
					for (i = 0; i < children.length; i += 1) {
						child = children[i];
						if (util.f.isElem(child)) {
							if (child.classList.contains("psuedo_select")) {
								nested_children = child.childNodes;
								for (ii = 0; ii < nested_children.length; ii += 1) {
									nested_child = nested_children[ii];
									if (
										util.f.isElem(nested_child) &&
										nested_child.classList.contains("selected")
									) {
										if (nested_child.innerHTML) {
											time = 1e2;
											util.f.addStyle(
												nested_child,
												["Opacity", "Transform"],
												[0, "translateY(24px)"],
												"all"
											);
										}
										setTimeout(
											function (c, v) {
												c.innerHTML = v;
												util.f.addStyle(
													c,
													["Opacity", "Transform", "TransitionDuration"],
													[1, "translateY(0px)", ".1s"],
													"all"
												);
											},
											time,
											nested_child,
											value
										);
									}
								}
							} else if (child.tagName == "SPAN") {
								util.f.addStyle(child, ["FontSize", "Top", "Color"], ["10px", "3px", "#999999"]);
							}
						}
					}
				},
				toggle: function (event) {
					util.f.events.stop(event);
					var child = util.f.getTrg(event),
						children,
						i,
						parent;
					switch (true) {
						case child.classList.contains("psuedo_select"):
						case child.classList.contains("deselect"):
							parent = child.parentNode;
							break;
						case child.classList.contains("options"):
							parent = child.parentNode.parentNode;
							break;
						case child.classList.contains("option"):
							parent = child.parentNode.parentNode.parentNode;
							form.f.select.selection(child, parent);
							break;
					}
					parent.classList.contains("focused")
						? form.f.select.blur(parent)
						: form.f.select.focus(parent);
				}
			}
		}
	};
window.onload = form.f.init.register;
//ACORDEON MENU DESKTOP ************************************ */
let AccordionMenu = function (selector) {
	this.colMenu = document.querySelectorAll(`${selector} li`);
	let This = this;
	this.colMenu.forEach(function (items) {
		if (items.querySelector('ul')) {
			items.firstElementChild.insertAdjacentHTML('beforeend', '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 451.847 451.847" xml:space="preserve"> <g> <path d="M225.923,354.706c-8.098,0-16.195-3.092-22.369-9.263L9.27,151.157c-12.359-12.359-12.359-32.397,0-44.751 c12.354-12.354,32.388-12.354,44.748,0l171.905,171.915l171.906-171.909c12.359-12.354,32.391-12.354,44.744,0 c12.365,12.354,12.365,32.392,0,44.751L248.292,345.449C242.115,351.621,234.018,354.706,225.923,354.706z"/> </g> </svg>');
			items.firstElementChild.onclick = function (e) {
				e.preventDefault();
				let isTrue = this.parentElement.classList.toggle('open');
				if (isTrue) {
					This.show(this.nextElementSibling);
				} else {
					This.hide(this.nextElementSibling);
				}
			}
		}
	})
}
AccordionMenu.prototype.show = function (elem) {
	var getHeight = function () {
		elem.style.display = 'block'; // Make it visible
		var height = elem.scrollHeight + 'px'; // Get it's height
		return height;
	};
	var height = getHeight(); // Get the natural height
	elem.style.height = height; // Update the height
	setTimeout(function () {
		elem.style.height = 'auto';
	}, 350);
};
// Hide an element
AccordionMenu.prototype.hide = function (elem) {
	// Give the element a height to change from
	elem.style.height = elem.scrollHeight + 'px';
	// Set the height back to 0
	setTimeout(function () {
		elem.style.height = '0';
	}, 110);
	setTimeout(function () {
		elem.style.display = '';
	}, 700);
};
//SLIDER MENU MOBILE ************************************ */
'use strict';
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
(function ($) {
	var PLUGIN_NAME = 'slideMenu';
	var DEFAULT_OPTIONS = {
		position: 'right',
		showBackLink: true,
		keycodeOpen: null,
		keycodeClose: 27, //esc
		submenuLinkBefore: '',
		submenuLinkAfter: '',
		backLinkBefore: '',
		backLinkAfter: ''
	};
	var SlideMenu = function () {
		function SlideMenu(options) {
			_classCallCheck(this, SlideMenu);
			this.options = options;
			this._menu = options.elem;
			// Add wrapper
			this._menu.find('ul:first').wrap('<div class="slider">');
			this._anchors = this._menu.find('a');
			this._slider = this._menu.find('.slider:first');
			this._level = 0;
			this._isOpen = false;
			this._isAnimating = false;
			this._hasMenu = this._anchors.length > 0;
			this._lastAction = null;
			this._setupEventHandlers();
			this._setupMenu();
			if (this._hasMenu) this._setupSubmenus();
		}
		/**
		 * Toggle the menu
		 * @param {boolean|null} open
		 * @param {boolean} animate
		 */
		_createClass(SlideMenu, [{
			key: 'toggle',
			value: function toggle() {
				var open = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
				var animate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
				var offset = void 0;
				if (open === null) {
					if (this._isOpen) {
						this.close();
					} else {
						this.open();
					}
					return;
				} else if (open) {
					offset = 0;
					this._isOpen = true;
				} else {
					offset = this.options.position === 'left' ? '-100%' : '100%';
					this._isOpen = false;
				}
				this._triggerEvent();
				if (animate) this._triggerAnimation(this._menu, offset); else {
					this._pauseAnimations(this._triggerAnimation.bind(this, this._menu, offset));
					this._isAnimating = false;
				}
			}
			/**
			 * Open the menu
			 * @param {boolean} animate Use CSS transitions
			 */
		}, {
			key: 'open',
			value: function open() {
				var animate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
				this._lastAction = 'open';
				this.toggle(true, animate);
			}
			/**
			 * Close the menu
			 * @param {boolean} animate Use CSS transitions
			 */
		}, {
			key: 'close',
			value: function close() {
				var animate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
				this._lastAction = 'close';
				this.toggle(false, animate);
			}
			/**
			 * Navigate one menu hierarchy back if possible
			 */
		}, {
			key: 'back',
			value: function back() {
				this._lastAction = 'back';
				this._navigate(null, -1);
			}
			/**
			 * Navigate to a specific link on any level (useful to open the correct hierarchy directly)
			 * @param {string|object} target A string selector a plain DOM object or a jQuery instance
			 */
		}, {
			key: 'navigateTo',
			value: function navigateTo(target) {
				var _this = this;
				target = this._menu.find($(target)).first();
				if (!target.length) return false;
				var parents = target.parents('ul');
				var level = parents.length - 1;
				if (level === 0) return false;
				this._pauseAnimations(function () {
					_this._level = level;
					parents.show().first().addClass('active');
					_this._triggerAnimation(_this._slider, -_this._level * 100);
				});
			}
			/**
			 * Set up all event handlers
			 * @private
			 */
		}, {
			key: '_setupEventHandlers',
			value: function _setupEventHandlers() {
				var _this2 = this;
				if (this._hasMenu) {
					this._anchors.click(function (event) {
						var anchor = $(event.target).is('a') ? $(event.target) : $(event.target).parents('a:first');
						_this2._navigate(anchor);
					});
				}
				$(this._menu.add(this._slider)).on('transitionend msTransitionEnd', function () {
					_this2._isAnimating = false;
					_this2._triggerEvent(true);
				});
				$(document).keydown(function (e) {
					switch (e.which) {
						case _this2.options.keycodeClose:
							_this2.close();
							break;
						case _this2.options.keycodeOpen:
							_this2.open();
							break;
						default:
							return;
					}
					e.preventDefault();
				});
				this._menu.on('sm.back-after', function () {
					var lastActiveUl = 'ul ' + '.active '.repeat(_this2._level + 1);
					_this2._menu.find(lastActiveUl).removeClass('active').hide();
				});
			}
			/**
			 * Trigger a custom event to support callbacks
			 * @param {boolean} afterAnimation Mark this event as `before` or `after` callback
			 * @private
			 */
		}, {
			key: '_triggerEvent',
			value: function _triggerEvent() {
				var afterAnimation = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
				var eventName = 'sm.' + this._lastAction;
				if (afterAnimation) eventName += '-after';
				this._menu.trigger(eventName);
			}
			/**
			 * Navigate the _menu - that is slide it one step left or right
			 * @param {jQuery} anchor The clicked anchor or button element
			 * @param {int} dir Navigation direction: 1 = forward, 0 = backwards
			 * @private
			 */
		}, {
			key: '_navigate',
			value: function _navigate(anchor) {
				var dir = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
				if (this._isAnimating) {
					return;
				}
				var offset = (this._level + dir) * -100;
				if (dir > 0) {
					if (!anchor.next('ul').length) return;
					anchor.next('ul').addClass('active').show();
				} else if (this._level === 0) {
					return;
				}
				this._lastAction = dir > 0 ? 'forward' : 'back';
				this._level = this._level + dir;
				this._triggerAnimation(this._slider, offset);
			}
			/**
			 * Start the animation (the CSS transition)
			 * @param elem
			 * @param offset
			 * @private
			 */
		}, {
			key: '_triggerAnimation',
			value: function _triggerAnimation(elem, offset) {
				this._triggerEvent();
				if (!(String(offset).indexOf('%') !== -1)) offset += '%';
				elem.css('transform', 'translateX(' + offset + ')');
				this._isAnimating = true;
			}
			/**
			 * Initialize the menu
			 * @private
			 */
		}, {
			key: '_setupMenu',
			value: function _setupMenu() {
				var _this3 = this;
				this._pauseAnimations(function () {
					switch (_this3.options.position) {
						case 'left':
							_this3._menu.css({
								left: 0,
								right: 'auto',
								transform: 'translateX(-100%)'
							});
							break;
						default:
							_this3._menu.css({
								left: 'auto',
								right: 0
							});
							break;
					}
					_this3._menu.show();
				});
			}
			/**
			 * Pause the CSS transitions, to apply CSS changes directly without an animation
			 * @param work
			 * @private
			 */
		}, {
			key: '_pauseAnimations',
			value: function _pauseAnimations(work) {
				this._menu.addClass('no-transition');
				work();
				this._menu[0].offsetHeight; // trigger a reflow, flushing the CSS changes
				this._menu.removeClass('no-transition');
			}
			/**
			 * Enhance the markup of menu items which contain a submenu
			 * @private
			 */
		}, {
			key: '_setupSubmenus',
			value: function _setupSubmenus() {
				var _this4 = this;
				this._anchors.each(function (i, anchor) {
					anchor = $(anchor);
					if (anchor.next('ul').length) {
						anchor.click(function (ev) {
							ev.preventDefault();
						});
						var anchorTitle = anchor.text();
						anchor.html(_this4.options.submenuLinkBefore + anchorTitle + _this4.options.submenuLinkAfter);
						if (_this4.options.showBackLink) {
							var backLink = $('<a href class="slide-menu-control" data-action="back">' + anchorTitle + '</a>');
							backLink.html(_this4.options.backLinkBefore + backLink.text() + _this4.options.backLinkAfter);
							anchor.next('ul').prepend($('<li>').append(backLink));
						}
					}
				});
			}
		}]);
		return SlideMenu;
	}();
	$('body').on('click', '.slide-menu-control', function (e) {
		var menu = void 0;
		var target = $(this).data('target');
		if (!target || target === 'this') {
			menu = $(this).parents('.slide-menu:first');
		} else {
			menu = $('#' + target);
		}
		if (!menu.length) return;
		var instance = menu.data(PLUGIN_NAME);
		var action = $(this).data('action');
		if (instance && typeof instance[action] === 'function') {
			instance[action]();
		}
		return false;
	});
	$.fn[PLUGIN_NAME] = function (options) {
		if (!$(this).length) {
			console.warn('Slide Menu: Unable to find menu DOM element. Maybe a typo?');
			return;
		}
		options = $.extend({}, DEFAULT_OPTIONS, options);
		options.elem = $(this);
		var instance = new SlideMenu(options);
		$(this).data(PLUGIN_NAME, instance);
		return instance;
	};
})(jQuery);
//TABS COMPONENT  ************************************ */
let tabHeader = document.getElementsByClassName("tab-header")[0];
let tabIndicator = document.getElementsByClassName("tab-indicator")[0];
let tabBody = document.getElementsByClassName("tab-body")[0];
let tabsPane = tabHeader.getElementsByTagName("div");
for (let i = 0; i < tabsPane.length; i++) {
	tabsPane[i].addEventListener("click", function () {
		tabHeader.getElementsByClassName("active")[0].classList.remove("active");
		tabsPane[i].classList.add("active");
		tabBody.getElementsByClassName("active")[0].classList.remove("active");
		tabBody.getElementsByTagName("div")[i].classList.add("active");
		tabIndicator.style.left = `calc(calc(100% / 4) * ${i})`;
	});
}
// SELECT COLOR PICKER *************************************** */
(function ($) {
	$.fn.colorSelect = function () {
		if (!this.is('select')) {
			return false;
		}
		var select = this;
		select.hide();
		var multiple = select.prop('multiple');
		var container = createGroup(select)
			.removeClass('color-select-optgroup')
			.addClass('color-select-container')
			.insertAfter(select);
		// when the selected value changed
		select.change(function () {
			container.find('.color-select-option')
				.removeClass('color-select-option-selected');
			select.find(':selected').each(function () {
				container.find('.color-select-option[data-color = "' + $(this).attr('value') + '"]')
					.addClass('color-select-option-selected');
			});
		});
		// call onChange for initialization
		//select.change();
		return this;
		function createGroup(parent) {
			var children = parent.children();
			var group = $('<div class="color-select-optgroup" />');
			children.each(function () {
				if ($(this).is('optgroup')) {
					createGroup($(this)).appendTo(group);
				}
				if ($(this).is('option')) {
					createOption($(this)).appendTo(group);
				}
			});
			return group;
		}
		function createOption(option) {
			var color = option.attr('value');
			return $('<div class="color-select-option" />')
				.css('background-color', color)
				.attr('data-color', color)
				.click(function () {
					if (multiple) {
						select.find('option[value="' + color + '"]').prop('selected', function (i, v) { return !v; });
					}
					else {
						select.val(color);
					}
					select.change();
				});
		}
	};
}(jQuery));
// HOME ANIMATION  ************************************ */
const scrollElements = document.querySelectorAll(".js-scroll");
const elementInView = (el, dividend = 1) => {
	const elementTop = el.getBoundingClientRect().top;
	return (
		elementTop <=
		(window.innerHeight || document.documentElement.clientHeight) / dividend
	);
};
const elementOutofView = (el) => {
	const elementTop = el.getBoundingClientRect().top;
	return (
		elementTop > (window.innerHeight || document.documentElement.clientHeight)
	);
};
const displayScrollElement = (element) => {
	element.classList.add("scrolled");
};
const hideScrollElement = (element) => {
	element.classList.remove("scrolled");
};
const handleScrollAnimation = () => {
	scrollElements.forEach((el) => {
		if (elementInView(el, 1.25)) {
			displayScrollElement(el);
		} else if (elementOutofView(el)) {
			hideScrollElement(el)
		}
	})
}
window.addEventListener("scroll", () => {
	handleScrollAnimation();
});
Resources
//COPY CLIPBOARD & TOOL TIP COLORS ************************************ */
function myFunction1() {
	var copyText1 = document.getElementById("copyText1");
	copyText1.select();
	copyText1.setSelectionRange(0, 99999);
	document.execCommand("copy");
	var tooltip1 = document.getElementById("myTooltip1");
	tooltip1.innerHTML = "Copied!";
}
function outFunc1() {
	var tooltip1 = document.getElementById("myTooltip1");
	tooltip1.innerHTML = "Copy";
}
function myFunction2() {
	var copyText2 = document.getElementById("copyText2");
	copyText2.select();
	copyText2.setSelectionRange(0, 99999);
	document.execCommand("copy");
	var tooltip2 = document.getElementById("myTooltip2");
	tooltip2.innerHTML = "Copied!";
}
function outFunc2() {
	var tooltip2 = document.getElementById("myTooltip2");
	tooltip2.innerHTML = "Copy";
}
function myFunction3() {
	var copyText3 = document.getElementById("copyText3");
	copyText3.select();
	copyText3.setSelectionRange(0, 99999);
	document.execCommand("copy");
	var tooltip3 = document.getElementById("myTooltip3");
	tooltip3.innerHTML = "Copied!";
}
function outFunc3() {
	var tooltip3 = document.getElementById("myTooltip3");
	tooltip3.innerHTML = "Copy";
}
function myFunction4() {
	var copyText4 = document.getElementById("copyText4");
	copyText4.select();
	copyText4.setSelectionRange(0, 99999);
	document.execCommand("copy");
	var tooltip4 = document.getElementById("myTooltip4");
	tooltip4.innerHTML = "Copied!";
}
function outFunc4() {
	var tooltip4 = document.getElementById("myTooltip4");
	tooltip4.innerHTML = "Copy";
}
function myFunction5() {
	var copyText5 = document.getElementById("copyText5");
	copyText5.select();
	copyText5.setSelectionRange(0, 99999);
	document.execCommand("copy");
	var tooltip5 = document.getElementById("myTooltip5");
	tooltip5.innerHTML = "Copied!";
}
function outFunc5() {
	var tooltip5 = document.getElementById("myTooltip5");
	tooltip5.innerHTML = "Copy";
}
function myFunction6() {
	var copyText6 = document.getElementById("copyText6");
	copyText6.select();
	copyText6.setSelectionRange(0, 99999);
	document.execCommand("copy");
	var tooltip6 = document.getElementById("myTooltip6");
	tooltip6.innerHTML = "Copied!";
}
function outFunc6() {
	var tooltip6 = document.getElementById("myTooltip6");
	tooltip6.innerHTML = "Copy";
}
function myFunction7() {
	var copyText7 = document.getElementById("copyText7");
	copyText7.select();
	copyText7.setSelectionRange(0, 99999);
	document.execCommand("copy");
	var tooltip7 = document.getElementById("myTooltip7");
	tooltip7.innerHTML = "Copied!";
}
function outFunc7() {
	var tooltip7 = document.getElementById("myTooltip7");
	tooltip7.innerHTML = "Copy";
}
function myFunction8() {
	var copyText8 = document.getElementById("copyText8");
	copyText8.select();
	copyText8.setSelectionRange(0, 99999);
	document.execCommand("copy");
	var tooltip8 = document.getElementById("myTooltip8");
	tooltip8.innerHTML = "Copied!";
}
function outFunc8() {
	var tooltip8 = document.getElementById("myTooltip8");
	tooltip8.innerHTML = "Copy";
}
function myFunction9() {
	var copyText9 = document.getElementById("copyText9");
	copyText9.select();
	copyText9.setSelectionRange(0, 99999);
	document.execCommand("copy");
	var tooltip9 = document.getElementById("myTooltip9");
	tooltip9.innerHTML = "Copied!";
}
function outFunc9() {
	var tooltip9 = document.getElementById("myTooltip9");
	tooltip9.innerHTML = "Copy";
}
function myFunction10() {
	var copyText10 = document.getElementById("copyText10");
	copyText10.select();
	copyText10.setSelectionRange(0, 99999);
	document.execCommand("copy");
	var tooltip10 = document.getElementById("myTooltip10");
	tooltip10.innerHTML = "Copied!";
}
function outFunc10() {
	var tooltip10 = document.getElementById("myTooltip10");
	tooltip10.innerHTML = "Copy";
}
function myFunction11() {
	var copyText11 = document.getElementById("copyText11");
	copyText11.select();
	copyText11.setSelectionRange(0, 99999);
	document.execCommand("copy");
	var tooltip11 = document.getElementById("myTooltip11");
	tooltip11.innerHTML = "Copied!";
}
function outFunc11() {
	var tooltip11 = document.getElementById("myTooltip11");
	tooltip11.innerHTML = "Copy";
}
function myFunction12() {
	var copyText12 = document.getElementById("copyText12");
	copyText12.select();
	copyText12.setSelectionRange(0, 99999);
	document.execCommand("copy");
	var tooltip12 = document.getElementById("myTooltip12");
	tooltip12.innerHTML = "Copied!";
}
function outFunc12() {
	var tooltip12 = document.getElementById("myTooltip12");
	tooltip12.innerHTML = "Copy";
}
function myFunction13() {
	var copyText13 = document.getElementById("copyText13");
	copyText13.select();
	copyText13.setSelectionRange(0, 99999);
	document.execCommand("copy");
	var tooltip13 = document.getElementById("myTooltip13");
	tooltip13.innerHTML = "Copied!";
}
function outFunc13() {
	var tooltip13 = document.getElementById("myTooltip13");
	tooltip13.innerHTML = "Copy";
}
function myFunction14() {
	var copyText14 = document.getElementById("copyText14");
	copyText14.select();
	copyText14.setSelectionRange(0, 99999);
	document.execCommand("copy");
	var tooltip14 = document.getElementById("myTooltip14");
	tooltip14.innerHTML = "Copied!";
}
function outFunc14() {
	var tooltip14 = document.getElementById("myTooltip14");
	tooltip14.innerHTML = "Copy";
}
function myFunction15() {
	var copyText15 = document.getElementById("copyText15");
	copyText15.select();
	copyText15.setSelectionRange(0, 99999);
	document.execCommand("copy");
	var tooltip15 = document.getElementById("myTooltip15");
	tooltip15.innerHTML = "Copied!";
}
function outFunc15() {
	var tooltip15 = document.getElementById("myTooltip15");
	tooltip15.innerHTML = "Copy";
}
function myFunction16() {
	var copyText16 = document.getElementById("copyText16");
	copyText16.select();
	copyText16.setSelectionRange(0, 99999);
	document.execCommand("copy");
	var tooltip16 = document.getElementById("myTooltip16");
	tooltip16.innerHTML = "Copied!";
}
function outFunc16() {
	var tooltip16 = document.getElementById("myTooltip16");
	tooltip16.innerHTML = "Copy";
}
function myFunction17() {
	var copyText17 = document.getElementById("copyText17");
	copyText17.select();
	copyText17.setSelectionRange(0, 99999);
	document.execCommand("copy");
	var tooltip17 = document.getElementById("myTooltip17");
	tooltip17.innerHTML = "Copied!";
}
function outFunc17() {
	var tooltip17 = document.getElementById("myTooltip17");
	tooltip17.innerHTML = "Copy";
}
function myFunction18() {
	var copyText18 = document.getElementById("copyText18");
	copyText18.select();
	copyText18.setSelectionRange(0, 99999);
	document.execCommand("copy");
	var tooltip18 = document.getElementById("myTooltip18");
	tooltip18.innerHTML = "Copied!";
}
function outFunc18() {
	var tooltip18 = document.getElementById("myTooltip18");
	tooltip18.innerHTML = "Copy";
}
function myFunction19() {
	var copyText19 = document.getElementById("copyText19");
	copyText19.select();
	copyText19.setSelectionRange(0, 99999);
	document.execCommand("copy");
	var tooltip19 = document.getElementById("myTooltip19");
	tooltip19.innerHTML = "Copied!";
}
function outFunc19() {
	var tooltip19 = document.getElementById("myTooltip19");
	tooltip19.innerHTML = "Copy";
}
function myFunction20() {
	var copyText20 = document.getElementById("copyText20");
	copyText20.select();
	copyText20.setSelectionRange(0, 99999);
	document.execCommand("copy");
	var tooltip20 = document.getElementById("myTooltip20");
	tooltip20.innerHTML = "Copied!";
}
function outFunc20() {
	var tooltip20 = document.getElementById("myTooltip20");
	tooltip20.innerHTML = "Copy";
}
function myFunction21() {
	var copyText21 = document.getElementById("copyText21");
	copyText21.select();
	copyText21.setSelectionRange(0, 99999);
	document.execCommand("copy");
	var tooltip21 = document.getElementById("myTooltip21");
	tooltip21.innerHTML = "Copied!";
}
function outFunc21() {
	var tooltip21 = document.getElementById("myTooltip21");
	tooltip21.innerHTML = "Copy";
}
function myFunction22() {
	var copyText22 = document.getElementById("copyText22");
	copyText22.select();
	copyText22.setSelectionRange(0, 99999);
	document.execCommand("copy");
	var tooltip22 = document.getElementById("myTooltip22");
	tooltip22.innerHTML = "Copied!";
}
function outFunc22() {
	var tooltip22 = document.getElementById("myTooltip22");
	tooltip22.innerHTML = "Copy";
}
//Copy Clipboard & Tool Tip Icons  ************************************ */
function myFunction23() {
	var copyText23 = document.getElementById("copyText23");
	copyText23.select();
	copyText23.setSelectionRange(0, 99999);
	document.execCommand("copy");
	var tooltip23 = document.getElementById("myTooltip23");
	tooltip23.innerHTML = "Copied!";
}
function outFunc23() {
	var tooltip23 = document.getElementById("myTooltip23");
	tooltip23.innerHTML = "Copy";
}
function myFunction24() {
	var copyText24 = document.getElementById("copyText24");
	copyText24.select();
	copyText24.setSelectionRange(0, 99999);
	document.execCommand("copy");
	var tooltip24 = document.getElementById("myTooltip24");
	tooltip24.innerHTML = "Copied!";
}
function outFunc24() {
	var tooltip24 = document.getElementById("myTooltip24");
	tooltip24.innerHTML = "Copy";
}
//Copy Clipboard & Tool Tip Typography  ************************************ */
function myFunction25() {
	var copyText25 = document.getElementById("copyText25");
	copyText25.select();
	copyText25.setSelectionRange(0, 99999);
	document.execCommand("copy");
	var tooltip25 = document.getElementById("myTooltip25");
	tooltip25.innerHTML = "Copied!";
}
function outFunc25() {
	var tooltip25 = document.getElementById("myTooltip25");
	tooltip25.innerHTML = "Copy";
}
//Copy Clipboard & Tool Tip Buttons  ************************************ */
function myFunction26() {
	var copyText26 = document.getElementById("copyText26");
	copyText26.select();
	copyText26.setSelectionRange(0, 99999);
	document.execCommand("copy");
	var tooltip26 = document.getElementById("myTooltip26");
	tooltip26.innerHTML = "Copied!";
}
function outFunc26() {
	var tooltip26 = document.getElementById("myTooltip26");
	tooltip26.innerHTML = "Copy";
}
function myFunction27() {
	var copyText27 = document.getElementById("copyText27");
	copyText27.select();
	copyText27.setSelectionRange(0, 99999);
	document.execCommand("copy");
	var tooltip27 = document.getElementById("myTooltip27");
	tooltip27.innerHTML = "Copied!";
}
function outFunc27() {
	var tooltip27 = document.getElementById("myTooltip27");
	tooltip27.innerHTML = "Copy";
}
function myFunction28() {
	var copyText28 = document.getElementById("copyText28");
	copyText28.select();
	copyText28.setSelectionRange(0, 99999);
	document.execCommand("copy");
	var tooltip28 = document.getElementById("myTooltip28");
	tooltip28.innerHTML = "Copied!";
}
function outFunc28() {
	var tooltip28 = document.getElementById("myTooltip28");
	tooltip28.innerHTML = "Copy";
}
function myFunction29() {
	var copyText29 = document.getElementById("copyText29");
	copyText29.select();
	copyText29.setSelectionRange(0, 99999);
	document.execCommand("copy");
	var tooltip29 = document.getElementById("myTooltip29");
	tooltip29.innerHTML = "Copied!";
}
function outFunc29() {
	var tooltip29 = document.getElementById("myTooltip29");
	tooltip29.innerHTML = "Copy";
}
function myFunction30() {
	var copyText30 = document.getElementById("copyText30");
	copyText30.select();
	copyText30.setSelectionRange(0, 99999);
	document.execCommand("copy");
	var tooltip30 = document.getElementById("myTooltip30");
	tooltip30.innerHTML = "Copied!";
}
function outFunc30() {
	var tooltip30 = document.getElementById("myTooltip30");
	tooltip30.innerHTML = "Copy";
}
