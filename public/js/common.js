"use strict";
const JSCCommon = {
	modalCall() {
		const link = '[data-fancybox="modal"], .link-modal-js';

		Fancybox.bind(link, {
			arrows: false,
			type: 'inline',
			touch: false,
			showClass: "fancybox-throwOutUp",
			hideClass: "fancybox-throwOutDown",
			l10n: {
				Escape: "Закрыть",
				NEXT: "Вперед",
				PREV: "Назад",
			},
		});
		document.querySelectorAll(".modal-close-js").forEach(el => {
			el.addEventListener("click", () => {
				Fancybox.close();
			})
		})
		Fancybox.bind('[data-fancybox]', {
			placeFocusBack: false,
		});
		const linkModal = document.querySelectorAll(link);
		function addData() {
			linkModal.forEach(element => {
				element.addEventListener('click', () => {
					let modal = document.querySelector(element.getAttribute("href"));
					const data = element.dataset;

					function setValue(val, elem) {
						if (elem && val) {
							const el = modal.querySelector(elem)
							el.tagName == "INPUT"
								? el.value = val
								: el.innerHTML = val;
							// console.log(modal.querySelector(elem).tagName)
						}
					}
					setValue(data.title, '.ttu');
					setValue(data.text, '.after-headline');
					setValue(data.btn, '.btn');
					setValue(data.order, '.order');
				})
			})
		}
		if (linkModal) addData();
	},
	// /modalCall
	toggleMenu() {
		document.addEventListener("click", function (event) {
			const toggle = document.querySelectorAll(".toggle-menu-mobile--js");
			const menu = document.querySelector(".menu-mobile--js");
			const topnav = document.querySelector(".top-nav");
			const toggleEv = event.target.closest(".toggle-menu-mobile--js");
			if (!toggleEv) return;
			toggle.forEach(el => el.classList.toggle("on"));
			menu.classList.toggle("active");
			topnav.classList.toggle("active");
			[document.body, document.querySelector('html')].forEach(el => el.classList.toggle("fixed"));
		}, { passive: true });
	},
	closeMenu() {
		const toggle = document.querySelectorAll(".toggle-menu-mobile--js");
		const menu = document.querySelector(".menu-mobile--js");
		if (!menu) return;
		if (menu.classList.contains("active")) {
			toggle.forEach(element => element.classList.remove("on"));
			menu.classList.remove("active");
			[document.body, document.querySelector('html')].forEach(el => el.classList.remove("fixed"));
		}

	},
	mobileMenu() {
		const menu = document.querySelector(".menu-mobile--js");
		if (!menu) return;
		this.toggleMenu();
		document.addEventListener('mouseup', (event) => {
			let container = event.target.closest(".menu-mobile--js.active"); // (1)
			let link = event.target.closest(".menu-mobile .menu a"); // (1)
			let toggle = event.target.closest('.toggle-menu-mobile--js.on'); // (1)
			if (!container && !toggle) this.closeMenu();
		}, { passive: true });

		window.addEventListener('resize', () => {
			if (window.matchMedia("(min-width: 992px)").matches) this.closeMenu();
		}, { passive: true });
	},

	// tabs  .
	tabscostume(tab) {
		// const tabs = document.querySelectorAll(tab);
		// const indexOf = element => Array.from(element.parentNode.children).indexOf(element);
		// tabs.forEach(element => {
		// 	let tabs = element;
		// 	const tabsCaption = tabs.querySelector(".tabs__caption");
		// 	const tabsBtn = tabsCaption.querySelectorAll(".tabs__btn");
		// 	const tabsWrap = tabs.querySelector(".tabs__wrap");
		// 	const tabsContent = tabsWrap.querySelectorAll(".tabs__content");
		// 	const random = Math.trunc(Math.random() * 1000);
		// 	tabsBtn.forEach((el, index) => {
		// 		const data = `tab-content-${random}-${index}`;
		// 		el.dataset.tabBtn = data;
		// 		const content = tabsContent[index];
		// 		content.dataset.tabContent = data;
		// 		if (!content.dataset.tabContent == data) return;

		// 		const active = content.classList.contains('active') ? 'active' : '';
		// 		// console.log(el.innerHTML);
		// 		content.insertAdjacentHTML("beforebegin", `<div class="tabs__btn-accordion  btn btn-primary  mb-1 ${active}" data-tab-btn="${data}">${el.innerHTML}</div>`)
		// 	})


		// 	tabs.addEventListener('click', function (element) {
		// 		const btn = element.target.closest(`[data-tab-btn]:not(.active)`);
		// 		if (!btn) return;
		// 		const data = btn.dataset.tabBtn;
		// 		const tabsAllBtn = this.querySelectorAll(`[data-tab-btn`);
		// 		const content = this.querySelectorAll(`[data-tab-content]`);
		// 		tabsAllBtn.forEach(element => {
		// 			element.dataset.tabBtn == data
		// 				? element.classList.add('active')
		// 				: element.classList.remove('active')
		// 		});
		// 		content.forEach(element => {
		// 			element.dataset.tabContent == data
		// 				? (element.classList.add('active'), element.previousSibling.classList.add('active'))
		// 				: element.classList.remove('active')
		// 		});
		// 	})
		// })

		$('.' + tab + '__caption').on('click', '.' + tab + '__btn:not(.active)', function (e) {
			$(this)
				.addClass('active').siblings().removeClass('active')
				.closest('.' + tab).find('.' + tab + '__content').hide().removeClass('active')
				.eq($(this).index()).fadeIn().addClass('active');

		});

	},
	// /tabs

	inputMask() {
		// mask for input
		let InputTel = [].slice.call(document.querySelectorAll('input[type="tel"]'));
		InputTel.forEach(element => element.setAttribute("pattern", "[+][0-9]{1}[(][0-9]{3}[)][0-9]{3}-[0-9]{2}-[0-9]{2}"));
		Inputmask({ "mask": "+9(999)999-99-99", showMaskOnHover: false }).mask(InputTel);
	},
	// /inputMask
	ifie() {
		var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
		if (isIE11) {
			document.body.insertAdjacentHTML("beforeend", '<div class="browsehappy">	<p class=" container">К сожалению, вы используете устаревший браузер. Пожалуйста, <a href="http://browsehappy.com/" target="_blank">обновите ваш браузер</a>, чтобы улучшить производительность, качество отображаемого материала и повысить безопасность.</p></div>');
		}
	},
	sendForm() {
		var gets = (function () {
			var a = window.location.search;
			var b = new Object();
			var c;
			a = a.substring(1).split("&");
			for (var i = 0; i < a.length; i++) {
				c = a[i].split("=");
				b[c[0]] = c[1];
			}
			return b;
		})();
		// form
		$(document).on('submit', "form", function (e) {
			e.preventDefault();
			const th = $(this);
			var data = th.serialize();
			th.find('.utm_source').val(decodeURIComponent(gets['utm_source'] || ''));
			th.find('.utm_term').val(decodeURIComponent(gets['utm_term'] || ''));
			th.find('.utm_medium').val(decodeURIComponent(gets['utm_medium'] || ''));
			th.find('.utm_campaign').val(decodeURIComponent(gets['utm_campaign'] || ''));
			$.ajax({
				url: 'action.php',
				type: 'POST',
				data: data,
			}).done(function (data) {

				Fancybox.close();
				Fancybox.show([{ src: "#modal-thanks", type: "inline" }]);
				// window.location.replace("/thanks.html");
				setTimeout(function () {
					// Done Functions
					th.trigger("reset");
					// $.magnificPopup.close();
					// ym(53383120, 'reachGoal', 'zakaz');
					// yaCounter55828534.reachGoal('zakaz');
				}, 4000);
			}).fail(function () { });

		});
	},
	heightwindow() {
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		let vh = window.innerHeight * 0.01;
		// Then we set the value in the --vh custom property to the root of the document
		document.documentElement.style.setProperty('--vh', `${vh}px`);

		// We listen to the resize event
		window.addEventListener('resize', () => {
			// We execute the same script as before
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		}, { passive: true });
	},
	animateScroll() {
		$(document).on('click', ".scroll-link", function () {
			const elementClick = $(this).attr("href");
			if (!document.querySelector(elementClick)) {
				$(this).attr("href", '/' + elementClick)
			}
			else {
				let destination = $(elementClick).offset().top;
				$('html, body').animate({ scrollTop: destination - 120 }, 400);
				return false;
			}
		});
	},
	getCurrentYear(el) {
		let now = new Date();
		let currentYear = document.querySelector(el);
		if (currentYear) currentYear.innerText = now.getFullYear();
	},
	toggleShow(toggle, drop) {

		let catalogDrop = drop;
		let catalogToggle = toggle;

		$(document).on('click', catalogToggle, function () {
			$(this).toggleClass('active').next().fadeToggle('fast', function () {
				$(this).toggleClass("active")
			});
		})

		document.addEventListener('mouseup', (event) => {
			let container = event.target.closest(catalogDrop + ".active"); // (1)
			let link = event.target.closest(catalogToggle); // (1)
			if (!container || !catalogToggle) {
				$(catalogDrop).removeClass('active').fadeOut();
				$(catalogToggle).removeClass('active');
			};
		}, { passive: true });
	},
	makeDDGroup() {
		let parents = document.querySelectorAll('.dd-group-js');
		for (let parent of parents) {
			if (parent) {
				// childHeads, kind of funny))
				let ChildHeads = parent.querySelectorAll('.dd-head-js:not(.disabled)');
				$(ChildHeads).click(function () {
					let clickedHead = this;

					$(ChildHeads).each(function () {
						if (this === clickedHead) {
							//parent element gain toggle class, style head change via parent
							$(this.parentElement).toggleClass('active');
							$(this.parentElement).find('.dd-content-js').slideToggle(function () {
								$(this).toggleClass('active');
							});
						}
						else {
							$(this.parentElement).removeClass('active');
							$(this.parentElement).find('.dd-content-js').slideUp(function () {
								$(this).removeClass('active');
							});
						}
					});

				});
			}
		}
	},
};
const $ = jQuery;

function eventHandler() {
	// JSCCommon.ifie();
	JSCCommon.modalCall();
	// JSCCommon.tabscostume('tabs');
	JSCCommon.mobileMenu();
	JSCCommon.inputMask();
	// JSCCommon.sendForm();
	JSCCommon.heightwindow();
	JSCCommon.makeDDGroup();
	// JSCCommon.toggleShow(".catalog-block__toggle--desctop", '.catalog-block__dropdown');
	// JSCCommon.animateScroll();

	// JSCCommon.CustomInputFile(); 
	var x = window.location.host;
	let screenName;
	screenName = document.body.dataset.bg;
	if (screenName && x.includes("localhost:30")) {
		document.body.insertAdjacentHTML("beforeend", `<div class="pixel-perfect" style="background-image: url(screen/${screenName});"></div>`);
	}



	// $(`.sForm__ask`).click(function () {
	// 	$(`.sForm form-wrap__input`).toggleClass(`hide`);
	// });

	let defaultSl = {
		spaceBetween: 0,
		lazy: {
			loadPrevNext: true,
		},
		watchOverflow: true,
		spaceBetween: 0,
		loop: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		pagination: {
			el: ' .swiper-pagination',
			type: 'bullets',
			clickable: true,
			// renderBullet: function (index, className) {
			// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
			// }
		},
	}
	var interleaveOffset = 0.5;

	var swiperOptions = {
		// slidesPerView: 1,
		// pagination: {
		// 	el: ".swiper-pagination",
		// 	type: "fraction",
		// },
		// navigation: {
		// 	nextEl: ".swiper-button-next",
		// 	prevEl: ".swiper-button-prev",
		// },
		loop: true,
		speed: 1500,
		grabCursor: true,
		watchSlidesProgress: true,
		mousewheelControl: true,
		keyboardControl: true,
		// Disable preloading of all images
		preloadImages: false,
		// Enable lazy loading
		lazy: {
			enabled: true,
			loadPrevNext: true
		},
		// autoplay: {
		// 	delay: 5000,
		// },
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev"
		},
		pagination: {
			el: ".swiper-pagination",
			type: "fraction",
			clickable: true,
		},
		on: {
			progress: function () {
				var swiper = this;
				for (var i = 0; i < swiper.slides.length; i++) {
					var slideProgress = swiper.slides[i].progress;
					var innerOffset = swiper.width * interleaveOffset;
					var innerTranslate = slideProgress * innerOffset;
					swiper.slides[i].querySelector(" picture").style.transform =
						"translate3d(" + innerTranslate + "px, 0, 0)";
				}
			},
			touchStart: function (swiper) {
				for (var i = 0; i < swiper.slides.length; i++) {
					swiper.slides[i].style.transition = "";
				}
			},
			setTransition: function (swiper, transition) {
				for (var i = 0; i < swiper.slides.length; i++) {
					swiper.slides[i].style.transition = transition + "ms";
					swiper.slides[i].querySelector(" picture").style.transition =
						transition + "ms";
				}
			}
		}

	};

	if (document.body.classList.contains("plan-page")) {
		function setFixedNav() {
			let topNav = document.querySelector('.top-nav  ');
			if (!topNav) return;
			window.scrollY > 0
				? topNav.classList.add('fixed')
				: topNav.classList.remove('fixed');
		}
	
		function whenResize() {
			setFixedNav();
		}
	
		window.addEventListener('scroll', () => {
			setFixedNav();
	
		}, { passive: true })
		window.addEventListener('resize', () => {
			whenResize();
		}, { passive: true });
	
		whenResize();
	}

	let slidersBlock = document.querySelectorAll(".sIndexSlider");
	
	for (const slider of slidersBlock) {
		
		let slImg = slider.querySelector('.sIndexSlider__pic-slider--js');
		let slText = slider.querySelector('.sIndexSlider__caption-slider--js');
		const IndexPicSlider = new Swiper(slImg, swiperOptions);
		const IndexCaptionSlider = new Swiper(slText, {
			slidesPerView: 1,
			loop: true,
			spaceBetween: 20,
			speed: 1500,
			pagination: {
				el: slider.querySelector(".swiper-pagination"),
				type: "fraction",
			},
			navigation: {
				nextEl: slider.querySelector(".swiper-button-next"),
				prevEl: slider.querySelector(".swiper-button-prev"),
			},
			// thumbs: {
			// 	swiper: IndexPicSlider,
			// }
		});
		if (slText) {
			IndexCaptionSlider.controller.control = IndexPicSlider;
			IndexPicSlider.controller.control = IndexCaptionSlider;
		}
	}
	const HeaderSlider = new Swiper('.headerBlockIndex__caption ', {
		slidesPerView: '1',
		// effect: "fade",
		effect: "fade",
		autoplay: {
			delay: 4000,
		},
		loop: true
	});
	const swiper4 = new Swiper('.sBanners__slider--js', {
		// slidesPerView: 5,
		...defaultSl,
		slidesPerView: 'auto',
		freeMode: true,
		loopFillGroupWithBlank: true,
		touchRatio: 0.2,
		slideToClickedSlide: true,
		freeModeMomentum: true,

	});
	// modal window



	// const scroll = new Scrooth({
	// 	strength: 8,
	// 	acceleration: 1.2,
	// });

	/* Main navigation */
	gsap.registerPlugin(ScrollTrigger);

	let scroller = document.querySelector(".scroller") ,
tween;




	ScrollTrigger.defaults({
		toggleActions: "play none play none",
	});
	let bodyScrollBar;
	if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
		bodyScrollBar = Scrollbar.init(scroller, {
			// let bodyScrollBar = Scrollbar.init(document.body, {
			damping: 0.1,
			thumbMinSize: 20,
			delegateTo: document,
		});
	}
	ScrollTrigger.scrollerProxy(scroller, {
		scrollTop(value) {
			if (arguments.length) {
				bodyScrollBar.scrollTop = value;
			}
			return bodyScrollBar.scrollTop;
		},
	});
	bodyScrollBar.addListener(ScrollTrigger.update);

	document.querySelectorAll(".scroll-link").forEach(anchor => {
	
		anchor.addEventListener("click", function (e) {
	
			e.preventDefault(); 
			let targetElem = document.querySelector(this.getAttribute("href")),
				y = targetElem.offsetTop;
				bodyScrollBar.scrollTo(0, y, 1600);
			// console.log(this.getAttribute("href"));
			// gsap.to(scroller, {
				
			// 	scrollTo: {
			// 		y: y,
			// 		// autoKill: true,
			// 	},
			// 	duration: 1
			// });
		});
});


	ScrollTrigger.create({
		scroller: scroller,
		start: 'top -80',
		end: 99999,
		toggleActions: "play none none none",
		// markers: true,
		toggleClass: { className: 'fixed', targets: '.top-nav' }
	});

	ScrollTrigger.create({
		scroller: scroller,
		trigger: `.headerBlockProject__btn-wrap`,
		start: 'top -5%',
		end: 99999,
		toggleActions: "play none none none",
		// markers: true,
		toggleClass: { className: 'fixed', targets: '.fixed-wrap' }
	});

	gsap.utils.toArray(" .wow").forEach(wow => {


		const animate = wow.dataset.animate;
		function myfunction() {
			wow.classList.toggle(`animate__animated`);
			if (animate) {
				wow.classList.toggle(animate);
			}
		};
		const rect = wow.getBoundingClientRect(); 
		ScrollTrigger.create({
			scroller: scroller,
			trigger: wow,
			start: 'top 90%',
			end: 'bottom +100 top',
			// markers: true,
			toggleActions: "play none reverse none",
			onEnter: () => myfunction(),
			// onLeave: () => myfunction(),
			onLeaveBack: () => myfunction(),
			// onEnterBack: () => myfunction(),
			invalidateOnRefresh: true,
		});
	})

	$('.headerBlockProject__rent').hover(function(){
		$(this).parent().children(`.headerBlockProject__show`).toggleClass(`colorize`);
	});
	$('.headerBlockProject__show').hover(function(){
		$(this).parent().children(`.headerBlockProject__rent`).toggleClass(`colorize`);
	});

	if (document.querySelector(".sAboutIndexInfo__picture-bg")) {

		gsap.from(".sAboutIndexInfo__picture-bg", {
			scrollTrigger: {
				scroller,
				trigger: ".sAboutIndexInfo__picture-bg",
				start: 'top 90%',
				end: 'bottom +100 top',
				toggleActions: "play none none none",

				// markers: true,
			},
			x: '-100%'
		});
	}



	if (document.querySelector(".sAboutIndexInfo")) {
		var t2 = gsap.timeline({

			scrollTrigger: {
				trigger: ".sAboutIndexInfo",
				scroller,
				start: '-10% bottom',
				end: 'bottom',
				scrub: true,
				// markers: true, 
				invalidateOnRefresh: true,
			}

		})

		t2
			.to(".sAboutIndexInfo__phylosophy-block-wrap", { y: -320 })
			;

		var t3 = gsap.timeline({

			scrollTrigger: {
				trigger: ".sIndexInfo",
				scroller,
				start: 'top bottom',
				end: '100%',
				scrub: true,
				// markers: true, 
				invalidateOnRefresh: true,
			}

		})

		t3
			.fromTo(".sIndexInfo__picture img", { x: 150 }, { x: 50 })
			;


	}
	if (document.querySelector(".sProjectInfo")) {
		var t4 = gsap.timeline({

			scrollTrigger: {
				trigger: ".sProjectInfo",
				scroller,
				start: '40% bottom',
				end: '100%',
				scrub: true,
				// markers: true, 
				invalidateOnRefresh: true,
			}

		})

		t4
			.fromTo(".sProjectInfo__picture", { y: 300 }, { y: -100 })
			;


	}
	if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
		if (document.querySelector(".sProjectBuild")) {
			// 	var t5 = gsap.timeline({

			// 		scrollTrigger: {
			// 			trigger: ".sProject__caption-item",
			// 			scroller,
			// 			start: '40% bottom',
			// 			end: '100%',
			// 			scrub: true,
			// 			// markers: true, 
			// 			invalidateOnRefresh: true,
			// 		}

			// 	})

			// 	t5
			// 		.fromTo(".sProject__caption-block", { y: 300 }, { y: -100 })
			// 		;


			// }
			gsap.utils.toArray(" .sProject__caption-item").forEach(trigger => {
				var capItem = gsap.timeline({
					scrollTrigger: {
						trigger,
						scroller,
						start: '-10% bottom',
						end: 'bottom',
						scrub: true,
						// toggleActions: "play none reverse none"
						// markers: true, 
						invalidateOnRefresh: true
					}
				})

				capItem
					.fromTo(trigger.querySelector('.sProject__caption-block'), { y: 600 }, { y: -100 })
					;
			})
			gsap.utils.toArray(".sProject__caption-pic-bg").forEach(trigger => {
				gsap.from(trigger, {
					scrollTrigger: {
						scroller,
						trigger,
						start: 'top 20%',
						end: 'bottom +100 top',
						toggleActions: "play none none none",

						// markers: true,
					},
					x: '-100%'
				});
			})
		}
	}

	var foot = gsap.timeline({

		scrollTrigger: {
			scroller,
			trigger: '.footer-wrap',
			start: 'top bottom',
			// endTrigger: "html",
			end: 'bottom bottom',
			// markers: true,
			// toggleActions: "play none reverse none",
			scrub: true,
		}

	})
	foot
		.from(".footer", { y: '-100%' });
	const bread = document.querySelectorAll('.breadcrumb-item');
	bread.forEach((element, index) => {
		element.style.setProperty('--animate-delay', `${index * 0.5}s`);
		element.classList.add(`animate__animated`, `animate__fadeInLeft`, `animate__delay-1s`)
	});



};
if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}



// var player;
// 			function onYouTubeIframeAPIReady() {
// 				player = new YT.Player('player', {
// 					width: '100%',
// 					height: '100%',
// 					videoId: 'fmoEYkgMTEo', // <--- Change this to your video ID
// 					playerVars: {
// 						'autoplay': 1,
// 						'showinfo': 0,
// 						'autohide': 1,
// 						'loop': 1,
// 						'controls': 0,
// 						'modestbranding': 1,
// 						'vq': 'hd1080'
// 					},
// 					events: {
// 						'onReady': onPlayerReady,
// 						'onStateChange': onPlayerStateChange
// 					}
// 				});
// 			}
// onYouTubeIframeAPIReady();

// 			// 4. The API will call this function when the video player is ready.
// 			function onPlayerReady(event) {
// 				event.target.playVideo();
// 				player.setVolume(0); // comment out if you don't want the auto played video muted
// 			}

// 			// 5. The API calls this function when the player's state changes.
// 			// The function indicates that when playing a video (state=1),
// 			// the player should play for six seconds and then stop.
// 			function onPlayerStateChange(event) {
// 				if (event.data == YT.PlayerState.ENDED) {
// 					player.seekTo(0);
// 					player.playVideo();
// 				}
// 			}
// 			function stopVideo() {
// 				player.stopVideo();
// 			}


// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player; 
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    videoId: 'nfWlot6h_JM',
    playerVars: {
      autoplay: 1,
      controls: 0,
      modestbranding: 1,
      loop: 1
    }
  });
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
// var done = false;
// function onPlayerStateChange(event) {
// 	if (event.data == YT.PlayerState.PLAYING && !done) {
// 		setTimeout(stopVideo, 6000);
// 		done = true;
// 	}
// }
// function stopVideo() {
// 	player.stopVideo();
// }