var ImageView = function(args){
	var view = Ti.UI.createWindow({
		backgroundColor:'white',
		
		
	});
	  var head = Ti.UI.createView({
    	backgroundColor:'#373232',
    	top:0,
    	width : 'auto',
    	height: 50
    });
       var buy = Ti.UI.createButton({
    
      title: 'Buy Now',
      top:7,
      right:5
    
    });
    buy.addEventListener('click',function(e){
    	alert("do something for buy");
    	});
    head.add(buy);
    var but = Ti.UI.createImageView({
    	top:1,
    	left:1,
    	image:'/images/left3.png',
    	
    });
       but.addEventListener('touchend',function(e){
    	view.close();
    });
    head.add(but);
    
    
    view.add(head);
    
     var imageV = Ti.UI.createImageView({    	
    	image:args,
    	canScale : true,
    	enableZoomControls: true,
    	top:50
    	
			
			
    	
    });
    view.add(imageV);
    
 
    
    
    view.open();

	return view;
};

module.exports = ImageView;