var start;

function compress(str) {
	str = str.replace(/[^\w]+/g, '');
	str = str.toLowerCase();
	return str;
};

function getRunTime() {
	return ( new Date().getTime() - start ) / 1000;
}

$(document).ready(function() {
	start = new Date().getTime();
	
	/* build category menu */
	function buildcategorymenu(callback) {
		
		for(key in category) {
			var data = '<h2>' + key + '</h2><ul>';
			
			for(val of category[key]) {
			
				if(typeof first === 'undefined') var first = compress(val);
			
				data += '<li data-value="' + compress(val) + '" data-rubric="' + compress(key) + '">' + val + '</li>';
				
				$('.wrapper').append('<section style="display:none;" class="' + compress(val) + '" data-original="' + val.replace('"', '&quot;') + '"><h1>' + val + '</h1></section>');
				
				fillcontent(val);
			}
			
			data += '</ul>';
			
			$('menu.category').append(data);
		}
		
		$('.wrapper > section.' + first).show();
		$('menu.category li[data-value="' + first + '"]').addClass('active');
		
		callback();
	}
	
	/* run build category menu with callback */
    buildcategorymenu(function() { // callback function
	
		// category accordion
		$("menu.category").accordion({
			icons: false,
		});
		
	})
	
	function fillcontent(section) {
		for(key in formula[section]) {
			$('section.' + compress(section)).append('<h3>' + key + ':</h3>');
				
			var str = formula[section][key].replace(/\[(\w+)\]/g, function replacer(all, match){
				return '<input style="margin: 0;display:inline-block;width:100px;" name="' + key + '_' + match + '" type="number" placeholder="' + match + '" />';
			});
			
			$('section.' + compress(section)).append(str);
			
			$('section.' + compress(section)).append('<input name="submit_' + key + '" type="button" value="result" /><input name="result_' + key + '" type="number" placeholder="result" readonly />');
			
		}
	}
	

	$("menu.category ul li").bind('click', function() {
		var val = $(this).attr('data-value');
		var text = $(this).text();
		
		// active
		$('menu.category li[data-value!="' + val + '"]').removeClass('active');
		$('menu.category li[data-value="' + val + '"]').addClass('active');
		
		$('section:not(.' + val + '):visible').fadeOut(300, function() {
			$('section.' + val).fadeIn(300);
		});
		
		
	});
	
	$('section > input[type="button"]').bind('click', function() {
		var name = $(this).attr('name');
		var rubric = $(this).parent().attr('data-original');
		
		var formulaName = name.substr(7);
		var thisFormula = formula[rubric][formulaName];
		
		
		var formulaWithValues = thisFormula.replace(/\[(\w+)\]/g, function replacer(all, match){
			return $('input[name="' + formulaName + '_' + match + '"]').val();
		});
		
		console.log(formulaWithValues);
		console.log(formulaName);
		
		
		var result = Parser.evaluate(formulaWithValues);
		
		$('input[name="result_' + formulaName + '"]').val(result);
		
	});
	
});