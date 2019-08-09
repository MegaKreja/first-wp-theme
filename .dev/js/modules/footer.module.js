var footerModule = (function($){
	var $subItem = $('.site-footer .menu > .menu-item.menu-item-has-children');

	$(document).ready(function() {
		// Adds sub-menu-toggle in every item that has sub-menu
		$subItem.children('a').after('<button class="sub-menu-toggle" aria-haspopup="true" aria-expanded="true"></button>');

		// Init slidesUp every sub-menu
		$subItem.children('.sub-menu, .children').slideUp(200);
	
		// Mobile sub-menus toggle action
		$subItem.on( 'click', '.sub-menu-toggle', function( e ) {
			e.preventDefault();
			var $parent = $( this ).closest( '.menu-item' );

			$parent.toggleClass( 'open' );
			$parent.children('.sub-menu, .children').slideToggle(200);
		} );
	})
})(jQuery);