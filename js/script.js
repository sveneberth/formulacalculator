$(document).ready(function() {
	notifyMe('hey!');
});

function notifyMe(title, text, click) {
	if(!Notification) {
		console.error('Notification are not supported in this browser');
		return false;
	}

	if (Notification.permission !== "granted")
		Notification.requestPermission();

	var notification = new Notification(title, {
	icon: $('link[rel="shortcut icon"]').attr('href'),
	body: text,
	});

	notification.onclick = click;
}