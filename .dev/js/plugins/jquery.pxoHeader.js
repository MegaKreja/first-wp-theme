+(function ($) {
	'use strict';
	// Plugin constructor
	var Plugin = function (elem, options) {
		this.elem = elem;
		this.$elem = $(elem);
		this.options = options;
		this.metadata = this.$elem.data('pxo-header');
	};

	// Plugin prototype
	Plugin.prototype = {
		defaults: {
			absoluteClass: 'menu-absolute-top',
			fixedClass: 'menu-fixed-top',
			toggle: '.menu-toggle',
			top: '.top-button',
			target: 'body',
			collapse: '.navbar-collapse',
			collapseInactiveClass: 'bg-transparent',
			collapseActiveClass: 'bg-dark',
			collapseActionTarget: '.navbar',
			heighter: window,
			offset: 50
		},

		init: function () {
			this.config = $.extend({}, this.defaults, this.options, this.metadata);
			var self = this;
			var $body = $('body');

			self.calc();

			$(self.config.toggle).on("click", function (e) {
				$body.toggleClass(self.config.toggleClass);
			});

			$(self.config.top).on("click", function (e) {
				e.preventDefault();
				$('html,body').animate({
					scrollTop: 0
				}, 1000);
			});

			$(self.config.collapse).on('show.bs.collapse', function(e){
				$(self.config.collapseActionTarget)
									.removeClass(self.config.collapseInactiveClass)
									.addClass(self.config.collapseActiveClass);
			});
			$(self.config.collapse).on('hidden.bs.collapse', function(e){
				$(self.config.collapseActionTarget)
									.removeClass(self.config.collapseActiveClass)
									.addClass(self.config.collapseInactiveClass);
			});

			$(window).on("scroll resize", function () {
				self.calc();
			});


			return this;
		},

		calc: function () {
			var self = this;
			var $body = $('body');
			var $target = $(self.config.target);
			var top = $(window).scrollTop();
			var windowWidth = $(window).width();
			var heighterHeight = ($(self.config.heighter).outerHeight()) ? $(self.config.heighter).outerHeight() : self.config.offset;

			if (top < heighterHeight) {
				$target
					.addClass(self.config.absoluteClass)
					.removeClass(self.config.fixedClass);

			}
			else {
				$target
					.addClass(self.config.fixedClass)
					.removeClass(self.config.absoluteClass);
			}

		}



		// Plugin methods go here
	};

	Plugin.defaults = Plugin.prototype.defaults;

	$.fn.pxoHeader = function (options) {
		return this.each(function () {
			new Plugin(this, options).init();
		});
	};

}(jQuery));
