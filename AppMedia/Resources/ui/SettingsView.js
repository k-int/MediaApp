function SettingsView(args) {
  var self = Ti.UI.createWindow({
    	title:args,
        backgroundColor:'white',
        layout: 'vertical' 
    });
    
    var scrollView = Ti.UI.createScrollView(
    	{layout : 'vertical'	}
    );

   var genEncKey = ""; 
   var labelUser = Ti.UI.createLabel({
    	 font : {
		 fontSize : 30,
		 fontFamily : 'Helvetica Neue'
	 },
    	top: 10,
    
    	text: "Create New User"
    	
    });
    scrollView.add(labelUser);
    
    if(Ti.App.Properties.getString('username') != null){
    	
    	var label1 = Ti.UI.createLabel({
    	 font : {
		 fontSize : 20,
		 fontFamily : 'Helvetica Neue'
	 },
    	top: 10,
    
    	text: "Phone already has a registered user."
    	
    });
    scrollView.add(label1);
    
    var label2 = Ti.UI.createLabel({
    	 font : {
		 fontSize : 20,
		 fontFamily : 'Helvetica Neue'
	 },
    	top: 5,
    
    	text: "User: " + Ti.App.Properties.getString('username')
    	
    });
    scrollView.add(label2);
    
    var logoutbutton = Ti.UI.createButton({
    	top: 15,
    	width: 200,
    	title: 'forget details'
    	
    });
    logoutbutton.addEventListener('click',function(event){
    	
    	Ti.App.Properties.setString('email', null);
 		Ti.App.Properties.setString('username', null);
 		Ti.App.Properties.setString('key', null);
 		
 		self.close();
 		self.open();
 		alert('please restart the app for changes to take effect, Thank you');
    });
    scrollView.add(logoutbutton);
    	
    	
    }else{    
    var userField = Ti.UI.createTextField({
    	top:5,
    	width: 200,
    	borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
    	hintText: "Enter a Username",
    	returnKeyType : Titanium.UI.RETURNKEY_NEXT
    });

    scrollView.add(userField);	
    	
    var emailField = Ti.UI.createTextField({
    	top:5,
    	width: 200,
    	borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
    	hintText: "Enter Email Address",
    	returnKeyType : Titanium.UI.RETURNKEY_NEXT
    });

    scrollView.add(emailField);
    
    var encKey = Ti.UI.createTextArea({
  borderWidth: 2,
  borderColor: '#bbb',
  borderRadius: 5,
  color: '#888',
  font: {fontSize:17},
  
  returnKeyType: Ti.UI.RETURNKEY_GO,
  textAlign: 'left',
  value: 'Encription Key',
  top: 5,
  width: 200, height : 100
});
encKey._hintText = encKey.value;
 
encKey.addEventListener('focus',function(e){
    if(e.source.value == e.source._hintText){
        e.source.value = "";
    }
});
encKey.addEventListener('blur',function(e){
    if(e.source.value==""){
        e.source.value = e.source._hintText;
    }
});
    scrollView.add(encKey);
    
   var genButton = Ti.UI.createButton({
   	
   	title:'Generate Key',
   	
   	top:5,
   	width:200
   });
   genButton.addEventListener('click',function(e){
   	
   	var Aes = require('lib/sjcl');
   	

   	
   	 var encrypted = Aes.encrypt("Message", "Hello all");
 
   	 
   	 var decripted = Aes.decrypt("Message", encrypted);

   	 getKey(encKey);
   	 
   	 	

   }); 
   scrollView.add(genButton)
    
    userField.addEventListener('return', function(event){
 
    	emailField.focus();
    		
    });
   
   var passed = false;
    	
    var saveButton = Ti.UI.createButton({

   	title:'Save',
   	
   	top:5,
   	width:200
   });
   saveButton.addEventListener('click',function(event){
   	
   	   	if(encKey.value != "" && emailField.value != "" && userField.value != ""){
 		
 		Ti.App.Properties.setString('email', emailField.value);
 		Ti.App.Properties.setString('username', userField.value);
 		Ti.App.Properties.setString('key', encKey.value);

 		alert("details saved");
 		
 		self.close();
 		self.open();

 		
   	}else{
   		alert('All field must be populated');
   	}
   });
   
   scrollView.add(saveButton);
   
    	
    	
  
    
    
}

self.add(scrollView);

function getKey(args) {

	var client = Ti.Network.createHTTPClient({

		// function called when the response data is available
		onload : function(e) {
			Ti.API.info("Key Text: " + this.responseText);

			var jsonObj = JSON.parse(this.responseText);
			args.value = jsonObj.key;

		},
		onerror : function(e) {
			Ti.API.debug(e.error);
			alert('error');
		},
		timeout : 5000 // in milliseconds
	});
	// Prepare the connection.
	client.open("GET", "http://mediatest.k-int.com/SecurityGlass/create/genKey");
	// Send the request.
	client.send();
}


 
	return self;
};

module.exports = SettingsView;