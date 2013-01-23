function SettingsView(args) {
	var self = Ti.UI.createWindow({
		title:args,
		backgroundColor:'white'
	});
	
	
	var label = Ti.UI.createLabel({
		text:'This is the home screen'
	});
	self.add(label);
	
	
	
	return self;
};

module.exports = SettingsView;