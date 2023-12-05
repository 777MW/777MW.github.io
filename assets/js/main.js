(function($) {

	var $window = $(window),
		$body = $('body'),
		$wrapper = $('#wrapper'),
		$main = $('#main'),
		$panels = $main.children('.panel'),
		$nav = $('#nav'), $nav_links = $nav.children('a');

	// Breakpoints logic
		breakpoints({
			xlarge:  [ '1281px',  '1680px' ],
			large:   [ '981px',   '1280px' ],
			medium:  [ '737px',   '980px'  ],
			small:   [ '361px',   '736px'  ],
			xsmall:  [ null,      '360px'  ]
		});

	// Play initial animation when page loads
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Nav logic
		$nav_links
			.on('click', function(event) {

				var href = $(this).attr('href');

				// Not a panel link? Bail.
					if (href.charAt(0) != '#'
					||	$panels.filter(href).length == 0)
						return;

				// Prevent default.
					event.preventDefault();
					event.stopPropagation();

				// Change panels.
					if (window.location.hash != href)
						window.location.hash = href;

			});

	// Panel logic

		// Initialize portion
			(function() {

				var $panel, $link;

				// Get panel and link
					if (window.location.hash) {

				 		$panel = $panels.filter(window.location.hash);
						$link = $nav_links.filter('[href="' + window.location.hash + '"]');

					}

				// If there are no panels or links, default to first
					if (!$panel
					||	$panel.length == 0) {

						$panel = $panels.first();
						$link = $nav_links.first();

					}

				// Set all panels to inactive aside from the current
					$panels.not($panel)
						.addClass('inactive')
						.hide();

				// Set active link
					$link
						.addClass('active');

				// Reset the window scroll
					$window.scrollTop(0);

			})();

		// Hashchange function
			$window.on('hashchange', function(event) {

				var $panel, $link;

				// Get panel and link
					if (window.location.hash) {

				 		$panel = $panels.filter(window.location.hash);
						$link = $nav_links.filter('[href="' + window.location.hash + '"]');

						// If there is no target panel, return
							if ($panel.length == 0)
								return;

					}

				// If there's no panel or link, default to first
					else {

						$panel = $panels.first();
						$link = $nav_links.first();

					}

				// Set all panels to inactive
					$panels.addClass('inactive');

				// Remove all active link classes
					$nav_links.removeClass('active');

				// Set targeted link to active
					$link.addClass('active');

				// Set maximum and minimum heights
					$main
						.css('max-height', $main.height() + 'px')
						.css('min-height', $main.height() + 'px');

				// Delay for page load
					setTimeout(function() {

						// Hide all visible panels
							$panels.hide();

						// Show targeted panel
							$panel.show();

						// Set the new maximum and minimum heights
							$main
								.css('max-height', $panel.outerHeight() + 'px')
								.css('min-height', $panel.outerHeight() + 'px');

						// Reset page scroll
							$window.scrollTop(0);

						// Another delay
							window.setTimeout(function() {

								// Remove inactive class from targeted panel
									$panel.removeClass('inactive');

								// Clear the maximum and minimum heights
									$main
										.css('max-height', '')
										.css('min-height', '');

								// I.E. Fix: Refresh
									$window.triggerHandler('--refresh');

								// Set locked to false to unlock
									locked = false;

							}, (breakpoints.active('small') ? 0 : 500));

					}, 250);

			});

	

		

})(jQuery);