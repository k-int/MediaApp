function ApplicationTabGroup(Window) {
	//create module instance
	var self = Ti.UI.createTabGroup();
	
		var Settings = require('ui/SettingsView');
	var About = require('ui/AboutView');
	var User = require('ui/NewUserView');
	var Search = require('ui/SearchView');
	// //create app tabs
	// var win1 = new Home(L('home')),
		// about = new About(L('about')),
		// search = new Search(L('search')),
		// newUser = new User(L('new user'));
	//create app tabs
	var 
		about = new About('about'),
		search = new Search('Security Glass'),
		newUser = new User('new user'),
		settings = new Settings('settings');
	
	var tab4 = Ti.UI.createTab({
		title: L('settings'),
		icon: '/images/KS_nav_ui.png',
		window: settings
	});
	settings.containingTab = tab4;
	
	var tab1 = Ti.UI.createTab({
		title: L('search'),
		icon: '/images/276.png',
		window: search
	});
	search.containingTab = tab1;
	
	var tab2 = Ti.UI.createTab({
		title: L('new user'),
		icon: '/images/229.png',
		window: newUser
	});
	newUser.containingTab = tab2;
	
	var tab3 = Ti.UI.createTab({
		title: L('about'),
		icon: '/images/458.png',
		window: about
	});
	about.containingTab = tab3;
	
	self.addTab(tab1);
	self.addTab(tab2);
	self.addTab(tab3);
	self.addTab(tab4);
		
	return self;
};

module.exports = ApplicationTabGroup;
