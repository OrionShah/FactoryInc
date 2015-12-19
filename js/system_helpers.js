var $ = require('jquery');
$(document).ready(function() {
	$('body').append("<canvas id='canvas_id' width= " + ($('body').width()-10) 
		+ " height=" + ($(document).height()-20) + "></canvas>");
});