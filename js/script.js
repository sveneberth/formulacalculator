$(document).ready(function() {
	
	var category = 
	{
		'Maths': ['Area', 'Volume', 'Length'],
		'Phsics': ['Power', 'Weight'],
	}
	
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
	

	$("menu.category ul li").bind('click', function() {
		var val = $(this).text();
		console.log("clicked on \"%s\"", val);

	});
	
});