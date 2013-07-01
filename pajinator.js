;(function ($) {
	$.fn.pajinate = function (options) {
		var current_page = 'current_page',
		items_per_page = 'items_per_page',
		meta,
		defaults = {
			items_id: '.item',
			pages_id: '.page',
			items_per_page: 10,
			nav_info_id: '.pajinator-info',
			nav_label_first: 'First',
			nav_label_info: 'Showing {0}-{1} of {2} results',
			nav_label_last: 'Last',
			nav_label_next: 'Next',
			nav_label_prev: 'Prev',
			nav_order : ["first", "prev", "num", "next", "last"],
			nav_panel_id: '.pajinator',
			num_pages_to_display: 2,
			show_first_last: true
		},
		$container,
		$items,
		$pajinators,
		total_page_links;
		options = $.extend(defaults, options);
		return this.each(function () {
			$container = $(this);
			$items = $(this).find(options.items_id);
			if(options.items_per_page >= $items.size())
				return $container;
			meta = $container;
			meta.data(current_page,0);
			meta.data(items_per_page, options.items_per_page);
			var num_pages = Math.ceil($items.size()/options.items_per_page),
			more = '<li class="more ellipsis" >...</li>',
			less = '<li class="less ellipsis" >...</li>',
			first = !options.show_first_last ? '' : '<li class="first" ><a>' + options.nav_label_first + '</a></li>',
			last = !options.show_first_last ? '' : '<li class="last" ><a>' + options.nav_label_last + '</a></li>',
			pajinator_html = '', i, j;
			for (i = 0; i < options.nav_order.length; i++) {
				switch (options.nav_order[i]) {
					case 'first':
					pajinator_html += first;
					break;
					case 'last':
					pajinator_html += last;
					break;
					case 'next':
					pajinator_html += '<li class="next" ><a>' + options.nav_label_next + '</a></li>';
					break;
					case 'prev':
					pajinator_html += '<li class="previous" ><a>' + options.nav_label_prev + '</a></li>';
					break;
					case 'page':
					for (j = 0; j < num_pages; j++) {
						if (j === 1)
							pajinator_html += less;
						pajinator_html += '<li class="' + options.pages_id + '" data-link="' + j + '" ><a>' + j + '</a></li>';
						if (j === (num_pages - 2))
							pajinator_html += more;
					}
					break;
					default:break;
				}
			}
			$pajinators = $container.find(options.nav_panel_id);
			$pajinators.html(pajinator_html).each(function () {
				$(this).find(options.pages_id+':first').addClass('first_page');
				$(this).find(options.pages_id+':last').addClass('last_page');
			});
			$pajinators.find('.ellipsis').hide();
			$pajinators.find('.first_page').addClass('active');
			$items.hide();
			$items.slice(0, meta.data(items_per_page)).show();
			total_page_links = $pajinators.first().find(options.pages_id).size();
			options.num_pages_to_display = Math.min(options.num_pages_to_display, total_page_links);
			$pajinators.find(options.pages_id+':not(.first_page):not(.last_page)').hide();
			$pajinators.each(function () {
				$(this).find(options.pages_id+':not(.first_page):not(.last_page)').slice();
			});
		});
	};
})(jQuery);