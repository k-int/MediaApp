function ApplicationTabGroup(Window) {
	//create module instance
	var self = Ti.UI.createTabGroup();
	
	var Settings = require('ui/SettingsView');
	var About = require('ui/AboutView');
	var Search = require('ui/SearchView');

	var	about = new About('about'),
		search = new Search('Security Glass'),
		settings = new Settings('settings');
	
	var tab3 = Ti.UI.createTab({
		title: L('settings'),
		icon: '/images/KS_nav_ui.png',
		window: settings
	});
	settings.containingTab = tab3;
	
	var tab1 = Ti.UI.createTab({
		title: L('search'),
		icon: '/images/276.png',
		window: search
	});
	search.containingTab = tab1;

	var tab2 = Ti.UI.createTab({
		title: L('about'),
		icon: '/images/458.png',
		window: about
	});
	about.containingTab = tab2;
	
	self.addTab(tab1);
	self.addTab(tab2);
	self.addTab(tab3);
		
	return self;
};

module.exports = ApplicationTabGroup;
