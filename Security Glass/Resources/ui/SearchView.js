function SearchView(args) {
	var ImageView = require('/ui/ImageView');
	var self = Ti.UI.createWindow({
		title:args,
		backgroundColor:'white'
	});
	
	var logoLabel = Ti.UI.createLabel({
		 font : {
		 fontSize : 30,
		 fontFamily : 'Helvetica Neue'
	 },
    	top: 10,
    	text: "Security Glass"
	});
	
    var searchLabel = Ti.UI.createLabel({
    	 font : {
		 fontSize : 30,
		 fontFamily : 'Helvetica Neue'
	 },
    	top: 50,
    	text: "Search"
    	
    });
    
    var searchField = Ti.UI.createTextField({
    	top:100,
    	width: 300,
    	borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
    	hintText: "Search",
    	returnKeyType : Titanium.UI.RETURNKEY_SEARCH
    });
    self.add(logoLabel);
    self.add(searchLabel);
    self.add(searchField);
    
    
    searchField.addEventListener('return', function(event) {
    var url = "http://mediatest.k-int.com/elasticSearch/media/_search?q=" + event.value + "&from=0&size=1000";
	getSearch(url);
	var sf = searchField
    sf.blur();
});

function getSearch(url) {

	var client = Ti.Network.createHTTPClient({

		// function called when the response data is available
		onload : function(e) {
			Ti.API.info("Received text: " + this.responseText);

			var jsonObj = JSON.parse(this.responseText);
	
            getShow(jsonObj);

		},
		onerror : function(e) {
			Ti.API.debug(e.error);
			alert('error');
		},
		timeout : 5000 // in milliseconds
	});
	// Prepare the connection.
	client.open("GET", url);
	// Send the request.
	client.send();
}


function getShow(obj) {
	

 var win1 = Ti.UI.createWindow({
       layout : 'vertical',
		backgroundColor : '#fff'
	});
	
	var hitsView = Ti.UI.createView({
		backgroundColor:'#373232',
    	top:0,
    	width : 'auto',
    	height: 50
	});
	
	var hitLabel = Ti.UI.createLabel({
		font : {
		 fontSize : 25,
		 fontFamily : 'Helvetica Neue'
		
	 },
	  color : '#fff',
		top:5,
		text: " Total hits found: " + obj.hits.total
	})
	
	hitsView.add(hitLabel);
	win1.add(hitsView);
	 
	var data = [];

	for (var c = 0; c < obj.hits.hits.length; c++) {

		var bgcolor = (c % 2) == 0 ? '#fff' : '#eee';

		var row = Ti.UI.createTableViewRow({
			hasChild : true,
			height : '120dp',
			backgroundColor : bgcolor,
			className : 'row',
			identifier : 'http://mediatest.k-int.com/' + obj.hits.hits[c]._source.thumbnail_path,
			recordId : obj.hits.hits[c]._source._id,
			
			description1 : obj.hits.hits[c]._source.description,
			title1 : obj.hits.hits[c]._source.title
		});

		// Create a vertical layout view to hold all the info labels and images for each tweet
		var post_view = Ti.UI.createView({
			height : '120dp',
			layout : 'vertical',
			left : 5,
			top : 5,
			bottom : 5,
			right : 5,
		});

		var av = Ti.UI.createImageView({
			image : obj.hits.hits[c]._source.identifier,
			left : 0,
			top : 0,
			height:150,
			width : 150
		});
		// Add the avatar image to the view
		post_view.add(av);

		var user_label = Ti.UI.createLabel({
			text : obj.hits.hits[c]._source.title,
			left : 154,
			width : 250,
			top : -150,
			bottom : 2,
			height : 80,
			textAlign : 'left',
			color : '#444444',
			font : {
				fontFamily : 'Trebuchet MS',
				fontSize : 25,
				fontWeight : 'bold'
			}
		});
		// Add the username to the view
		post_view.add(user_label);
		
		var desText = splitStringAtInterval(obj.hits.hits[c]._source.description,100);
		var desText = desText[0] + "....";
		

		var text = Ti.UI.createLabel({
			text : desText,
			left : 154,
			top : 4,
			bottom : 2,
			height : 'auto',
			width : 230,
			textAlign : 'left',
			color : '#000',
			font : {
				fontSize : 14
			}
		});
		// Add the tweet to the view
		post_view.add(text);
		// Add the vertical layout view to the row

		row.add(post_view);
		row.className = 'item' + c;
		data[c] = row;
		
	}
	// Create the tableView and add it to the window.
	var tableview = Titanium.UI.createTableView({
		data : data,
		minRowHeight : 58
	});
	win1.add(tableview);
	self.containingTab.open(win1);
	//.open({animate:true});
	tableview.addEventListener('click',function(e){

		displaySelected(e.rowData.title1,e.rowData.description1,e.rowData.identifier, e.rowData.recordId);

		
	});
}

function displaySelected(title, description, image, ID){
	var win2 = Ti.UI.createWindow({
		backgroundColor:'white',
		layout : 'vertical'
	})
	 var head = Ti.UI.createView({
    //	backgroundColor:'#373232',
    	top:0,
    	width : 'auto',
    	height: 50
    });

      var buy = Ti.UI.createButton({
    
      title: 'Buy Now',
      top:5,
    //  right:5,
  //    style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
    
    });
    buy.addEventListener('click',function(e){
    	if (Ti.App.Properties.getString('username') != null){
    		// alert(image);
    	 saveImage(ID);
    	// alert(ID);
    	//buyImage(ID);
    	}else{
    	alert('Please setup an account from the Settings tab located on the home screen, Thank you.');
    	
    	}
    	});
    head.add(buy);
    
    win2.add(head);
    
    
    var scrollV = Ti.UI.createScrollView(
    	{layout : 'vertical'	}
    );
    
		var titleLabel = Ti.UI.createLabel({
			text: title,
			top:5,
			left:5,
			font : {
				fontFamily : 'Trebuchet MS',
				fontSize : 25,
				fontWeight : 'bold'
			}
		});
		scrollV.add(titleLabel);
	
		var imageView = Ti.UI.createImageView({
			image:image,
			height: 250,
			
			top:5
		});
		var zoom = Ti.UI.createImageView({
			image:'http://cdn1.iconfinder.com/data/icons/brightmix/128/monotone_search_zoom.png',
			right:10,
			bottom:10,
			height:50,
			width:50
		});
		imageView.add(zoom);
		scrollV.add(imageView);
		layout : 'vertical'
			var descriptionLabel = Ti.UI.createLabel({
			text: description,
			color:'black',
			top:5,
			right:10,
			left:10
		});
		scrollV.add(descriptionLabel);
		 
		win2.add(scrollV);
		self.containingTab.open(win2);
		//.open();
	
		imageView.addEventListener('click',function(e){
			// var win3 = Ti.UI.createWindow({
		// backgroundColor:'white',
		// layout : 'vertical'
		// });
// 	
// 			
			// var img = Ti.UI.createImageView({
			// image:image,
			// height: Titanium.Platform.displayCaps.platformWidth,
			// width:Titanium.Platform.displayCaps.platformHeight,
			// top:10,
// 		
		// });
// 
		 // win3.add(img);
		// self.containingTab.open(win3);
			// //img.open();
			
			getWatermarked(ID);
		
		
		});
		zoom.addEventListener('click',function(e){
			
			//var img = new ImageView(image);
			//img.open();
			
		});
}

function saveImage(b){
		var userName = Ti.App.Properties.getString('username');
		var email = Ti.App.Properties.getString('email');
		var encKey = Ti.App.Properties.getString('key');
	var actInd = Titanium.UI.createActivityIndicator({
		bottom:10, 
		height:50,
		width:150
	});
	actInd.show();
    	var a = "http://mediatest.k-int.com/SecurityGlass/create/createLargeSecured?userName="+userName+"&encryptionKey="+encKey+"&email="+email+"&recordId="+b;
    	var xhr = Titanium.Network.createHTTPClient();
	xhr.onload = function()
	{
		//this.responseHeader
		Ti.API.info("Save Image data: " + this.responseText );

		var osname = Ti.Platform.osname;	

		if(osname === 'android'){
		

if(Ti.Filesystem.isExternalStoragePresent){
	var f = Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, b+'.jpg');
	Ti.Media.Android.scanMediaFiles([f.nativePath], null, function(e){});
f.write(this.responseData);
 
if(f.exists){
	
	actInd.hide();
	alert("image saved to gallery");
	Ti.Media.Android.scanMediaFiles([f.nativePath], null, function(e){});
	
}else{
		actInd.hide();
	alert("an error accured saving the image");
}
}else{
var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, b+'.jpg');
Ti.Media.Android.scanMediaFiles([f.nativePath], null, function(e){});
f.write(this.responseData);
 
if(f.exists){
	alert("image saved to gallery");
	Ti.Media.Android.scanMediaFiles([f.nativePath], null, function(e){});
	
}else{
	alert("an error accured saving the image");
}
}


		}else{
		Ti.API.info(" status: "+ this.status);
		Titanium.Media.saveToPhotoGallery(this.responseData);
		Titanium.UI.createAlertDialog({title:'Photo Gallery',message:'Photo saved to gallery'}).show();	
		}	
	};
	xhr.onerror = function(e){
		Ti.API.error(xhr.responseText + "error" +e.value);
	}
	// open the client
	xhr.open('GET',a);
	
	// send the data
	xhr.send();
    	
    }  

	function getWatermarked(b){
	var userName = Ti.App.Properties.getString('username');
		var email = Ti.App.Properties.getString('email');
		var encKey = Ti.App.Properties.getString('key');

    	var a = "http://mediatest.k-int.com/SecurityGlass/create/createLargeWatermarked?userName="+userName+"&encryptionKey="+encKey+"&email="+email+"&recordId="+b;
    	var xhr = Titanium.Network.createHTTPClient();
    	
    	var actInd = Titanium.UI.createActivityIndicator({
		bottom:10, 
		height:50,
		width:150
	});
    	
 	var window7 = Titanium.UI.createWindow();
 	
			actInd.message = 'Loading...';
			var osname = Ti.Platform.osname;	
		if(osname === 'android'){
			actInd.show();
		}
		else{
			window7.add(actInd);
			window7.show();
			actInd.show();
		}
    
	xhr.onload = function()
	{
		//this.responseHeader
		Ti.API.info("Save Image data: " + this.responseText );
		
		Ti.API.info(" status: "+ this.status);
			var win3 = Ti.UI.createWindow({
		backgroundColor:'white',
		layout : 'vertical'
		});
		
			var osname = Ti.Platform.osname;	
		if(osname === 'android'){
			var img = Ti.UI.createImageView({
			image:this.responseData,
			
		//	height: Titanium.Platform.displayCaps.platformWidth,
		//	width:Titanium.Platform.displayCaps.platformWidth,
			top:10,
			canScale: true,
			enableZoomControls: true	
		});
		
	actInd.hide();
	 var head = Ti.UI.createView({
    //	backgroundColor:'#373232',
    	top:0,
    	width : 'auto',
    	height: 50
    });

      var buy = Ti.UI.createButton({
    
      title: 'Buy Now',
      top:5,
    //  right:5,
  //    style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
    
    });
    buy.addEventListener('click',function(e){
    	if (Ti.App.Properties.getString('username') != null){
    		// alert(image);
    	 saveImage(b);
    	// alert(ID);
    	//buyImage(ID);
    	}else{
    	alert('Please setup an account from the Settings tab located on the home screen, Thank you.');
    	
    	}
    	});
    head.add(buy);
    
    win3.add(head);
	
	
	
		 win3.add(img);
		self.containingTab.open(win3);
		}else{
			var sview = Ti.UI.createScrollView();
			
			var img = Ti.UI.createImageView({
			image:this.responseData,
		   height: '100%',
			width: '100%',
			
		});
		sview.add(img);
		 win3.add(sview);
		self.containingTab.open(win3);
		}
	};
	xhr.onerror = function(e){
		Ti.API.error(xhr.responseText + "error" +e.value);
	}
	xhr.open('GET',a);
	
	xhr.send();
    		
	}

  function hexToBytes(hex) {
                for (var bytes = [], c = 0; c < hex.length; c += 2)
                        bytes.push(parseInt(hex.substr(c, 2), 16));
                return bytes;
        }
        
        function splitStringAtInterval (string, interval) {
var result = [];
for (var i=0; i<string.length; i+=interval)
  result.push(string.substring (i, i+interval));
return result;
}
    
	return self;
};

module.exports = SearchView;