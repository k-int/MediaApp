function AboutView(args) {
	var self = Ti.UI.createWindow({
		title:args,
		backgroundColor:'white'
	});
	

	var label3 = Ti.UI.createLabel({
					 font : {
		 fontSize : 30,
		 fontFamily : 'Helvetica Neue'
	 },
    	top: 10,
    	text: "Security Glass"
	});
	self.add(label3);
	var label = Ti.UI.createLabel({
		text:'Secured digital resources through steganography and embedded tracking metadata'
	});
	self.add(label);
	
	var label2 = Ti.UI.createLabel({
		
		text:'© Knowledge Integration Ltd 2013' ,
		bottom:10
	});
	self.add(label2);
	return self;
};

module.exports = AboutView;