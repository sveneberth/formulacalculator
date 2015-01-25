$(document).ready(function() {
	
	/* build category menu */
	function buildcategorymenu(callback) {
		for(key in category) {
			var data = '<h2>' + key + '</h2><ul>';
			for(val of category[key]) {
				data += '<li>' + val + '</li>';
			}
			data += '</ul>';
			$('menu.category').append(data);
		}
		callback();
	}
	
	/* run build category menu with callback */
    buildcategorymenu(function() {
		// category accordion
		$("menu.category").accordion({
			icons: false,
		});
	})
	
	function fillcontent(section) {
		for(key in formula[section]) {
		
			$('section.' + section).append('<h3>' + key + ':</h3>');
				
			var str = formula[section][key].replace(/\[(\w+)\]/g, function replacer(all, match){
				return '<input style="margin: 0;display:inline-block;width:100px;" name="' + key + '_' + match + '" type="number" placeholder="' + match + '" />';
			});
			
			$('section.' + section).append(str);
			
		}
	}
	

	$("menu.category ul li").bind('click', function() {
		var val = $(this).text();
		console.log("clicked on \"%s\"", val);
				
		if($('section.' + val).length == 0) {
			$('.wrapper').append('<section class="' + val + '"><h1>' + val + '</h1></section>');
			fillcontent(val);
		}
		
		// FIXME: if created new section
		$('section').not($('section.' + val)).filter(':visible').fadeOut(300, function() {
			$('section.' + val).fadeIn(300);
		});
		
		
	});
	
});