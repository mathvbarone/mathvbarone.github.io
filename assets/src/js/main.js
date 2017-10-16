const start = {
	//EVENTS

	functions: {

		//SHOW NAVIGATION
		showNavConstructor: element => {
			($(window).scrollTop() > 40) ? (
				element.addClass("is-active")
			) : (
				element.removeClass("is-active")
			);
		},

		showNavigation: () => {
			start.functions.showNavConstructor($(".up-arrow"));
			start.functions.showNavConstructor($(".is-index"));
		},

		//HERO SCROLL
		heroScroll: () => {
			const headerContent = $(".hero-body");
			const headerContentHeight = headerContent.height();
			const scrollPos = window.scrollY;
		 
			if (scrollPos <= headerContentHeight) {
			  headerContent.css(
			    "transform",
			    "translateY(" + -scrollPos / 2 + "px" + ")"
			  );
			  headerContent.css("opacity", 1 - scrollPos / headerContentHeight);
			}
		}

	},

	//EVENTS
	events: {
		init: () => {

			$(() => {
				const startFunctions = start.functions;

				//SHOW NAVIGATION INIT
				$(window).on("scroll", startFunctions.showNavigation);

				//HERO SCROLL
				$(window).on("scroll", startFunctions.heroScroll );
			});



		}
	},

	//PLUGINS

	plugins: {
		init: () => {
			$(() => {

				//WOW
				const notAndroid = !/Android/i.test(navigator.userAgent);
				if (notAndroid) {
					const wow = new WOW({
						mobile: true
					});
					wow.init();
				}

				//TYPESCRIPT
				const typeScript = (() => {
					Typed.new('#typed', {
						stringsElement: document.getElementById('typed-strings'),
						loop: true,
						typeSpeed: 60
					});
				})();



			});
		}
	},


	//INIT OBJECT

	init: () => {
		start.events.init();

		start.plugins.init();

	}
};


//INIT OBJECTS

start.init();
