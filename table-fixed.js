
var tableFixed = (function($){
	var defaultOpt = {
		'width': 1680,
		'height': 1050
		},
		scrollBarSize = 20,
		columnWidth = 0,
		$tableFixed,
		$tableFixedHeaderHead,
		$tableFixedColumnHead,
		$tableFixedColumnBody;

	function init(options){
		if(options) {
			$.each(options, function(k, v){
				defaultOpt[k] = v;
			})
		}

		$tableFixed = $("table.table-fixed");
		columnWidth = $tableFixed.find("th:first-child").outerWidth();
		$tableFixed.find("th").each(function(i, th){
			var width = $(this).width();
			$(this).append('<div style="width:' + (width).toString() + 'px;"></div>');
		});

		$tableFixedHeaderHead = $tableFixed.clone().removeClass('table-fixed');
		$tableFixedColumnHead = $tableFixed.clone().removeClass('table-fixed');
		$tableFixedColumnBody = $tableFixed.clone().removeClass('table-fixed');
	}

	function setup(){
		var $tableFixedWrap,
		$tableFixedContent,
		$tableFixedBody;

		// wrap div
		$tableFixed.wrap('<div class="table-fixed-wrap"></div>').wrap('<div class="table-fixed-container"></div>').wrap('<div class="table-fixed-content"></div>').wrap('<div class="table-fixed-body"></div>');

		// fix header
		$tableFixedHeaderHead.insertBefore($(".table-fixed-body")).wrap('<div class="table-fixed-head"></div>');
		$tableFixedHeaderHead.find("tbody").remove();
		$tableFixed.css("margin-top", "-" + $tableFixedHeaderHead.height().toString() + "px");

		// fixed column head
		$tableFixedColumnHead.find("th:not(:first-child), tbody").remove();
		$tableFixedColumnHead.insertBefore($(".table-fixed-content")).wrap('<div class="table-fixed-column"></div>').wrap('<div class="table-fixed-head"></div>');
		$tableFixedColumnHead.parent().width(columnWidth);
		$tableFixedColumnHead.find("tr").each(function(i, tr){
			var height = $tableFixed.find("tr:eq("+i+")").height();
			$(this).height(height);
		})

		// fixed column body
		$tableFixedColumnBody.find("thead, td:not(:first-child)").remove();
		$tableFixedColumnBody.insertAfter($(".table-fixed-column .table-fixed-head")).wrap('<div class="table-fixed-body"></div>');
		$tableFixedColumnBody.parent().width(columnWidth);
		$tableFixedColumnBody.find("tr").each(function(i, tr){
			var height = $tableFixed.find("tr:eq("+(i+1)+")").height();
			$(this).height(height);
		})

		$tableFixedWrap = $(".table-fixed-wrap");
		$tableFixedWrap.width(defaultOpt['width']);
		$tableFixedWrap.height(defaultOpt['height']);

		$tableFixedContent = $(".table-fixed-content");
		$tableFixedContent.width(defaultOpt['width']);

		// set table body height
		$tableFixed.parent().height(defaultOpt['height'] - $tableFixed.find("thead").height());
		$tableFixedColumnBody.parent().height(defaultOpt['height'] - $tableFixed.find("thead").height() -20);

		$tableFixed.parent().scroll(function(){
			$tableFixedHeaderHead.css("margin-left", "-" + $(this).scrollLeft().toString() + "px");
			$tableFixedColumnBody.css("margin-top", "-" + $(this).scrollTop().toString() + "px");
		})
	}

	function tableFixed(options){
		init(options);

		setup();
	}

	return tableFixed;

})(jQuery);