/*
 * A tabbed application, consisting of multiple stacks of windows associated with tabs in a tab group.  
 * A starting point for tab-based application with multiple top-level windows. 
 * Requires Titanium Mobile SDK 1.8.0+.
 * 
 * In app.js, we generally take care of a few things:
 * - Bootstrap the application with any data we need
 * - Check for dependencies like device type, platform version or network connection
 * - Require and open our top-level UI component
 *  
 */

//bootstrap and check dependencies
if (Ti.version < 1.8 ) {
	alert('Sorry - this application template requires Titanium Mobile SDK 1.8 or later');
}

   	 login();

// This is a single context application with mutliple windows in a stack
(function() {
	//determine platform and form factor and render approproate components
	var osname = Ti.Platform.osname,
		version = Ti.Platform.version,
		height = Ti.Platform.displayCaps.platformHeight,
		width = Ti.Platform.displayCaps.platformWidth;
	
	//considering tablet to have one dimension over 900px - this is imperfect, so you should feel free to decide
	//yourself what you consider a tablet form factor for android
	var isTablet = osname === 'ipad' || (osname === 'android' && (width > 899 || height > 899));
	
	var Window;
	if (isTablet) {
		Window = require('ui/tablet/ApplicationWindow');
	}
	else {
		Window = require('ui/handheld/ApplicationWindow');
	}

	var ApplicationTabGroup = require('ui/common/ApplicationTabGroup');
	new ApplicationTabGroup(Window).open();
})();

function login(){
               // Login to the website!
               var xhr = Ti.Network.createHTTPClient();
               var url = "http://mediatest.k-int.com/SecurityGlass/j_spring_security_check";
               var postData = "";
               postData += 'j_username=' + "admin";
               postData += '&j_password=' + "admin";
               postData += '&_spring_security_remember_me=on';
               Ti.API.debug(url);
               xhr.open("POST", url);
               xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
               xhr.onload = function() {
                   //alert( xhr.responseText );
                    var response = JSON.parse(xhr.responseText);
                    
                 Ti.API.info("responseText " + xhr.responseText);
                    
                   if( response.error ){
                     alert( response.error );
                   } 
               };
               xhr.onerror = function(){
                 Ti.API.error( "Error Logging in" );   
               };
               xhr.send(postData);
         };
