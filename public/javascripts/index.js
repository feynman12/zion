// Global variable set when a user is logged in
currentUser = undefined;

// A few global convenience methods for rendering HTML
// on the client

var loadPage = function(template, data) {
	data = data || {};
	$('#main-container').html(Handlebars.templates[template](data));
};

var loadHomePage = function(profile) {
	if (currentUser) {
		loadPage('newsfeed', { currentUser: currentUser, profile: profile });
	} else {
		loadPage('index');
	}
};

$(document).ready(function() {
	$.get('/users/current', function(response) {
		if (response.content.loggedIn) {
			currentUser = response.content.user;
		}
		loadHomePage();
	});
});

$(document).on('click', '#home-link', function(evt) {
	evt.preventDefault();
	loadHomePage();
});

$(document).on('click', '#signin-btn', function(evt) {
	loadPage('signin');
});

$(document).on('click', '#register-btn', function(evt) {
	loadPage('register');
});