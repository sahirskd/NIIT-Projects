define([], function() {	
    function landingPageTemplate() {
       this.xml = null;
	   this.classRef = null;
	   this.tabId;
	   this.selectedTabId;
	   this.textpositionarray=[]
    }
    landingPageTemplate.prototype = new Util();
    landingPageTemplate.prototype.constructor = landingPageTemplate;
    landingPageTemplate.prototype.init = function(xmlName) {
        var ref = this;
		this.container = this.getPageContainer();	
		
		//if(isLocalfileOrServer==true){
			setTimeout(function() {
				landingPageContent=function(data){
					
					var parser = new DOMParser(); 
					xml = parser.parseFromString(data, 'text/xml')
					ref.xml = xml;
					ref.loadIntructionScreen();
			
				}
				var topicscript = document.createElement('script');
				topicscript.src = "data/" + xmlName + "/" + xmlName + ".js",
				document.getElementsByTagName('head')[0].appendChild(topicscript)
				}, 10);
			
		//	}
	// else{
		
	// 	ref.loadXML(xmlName);
	// }

	
	
	landingPageTemplate.prototype.loadXML = function(xmlNameRef) {		
		$.ajax({
                type: "GET",
                url: "data/" + xmlNameRef + "/" + xmlNameRef+ ".xml",
                dataType: "xml",
                success: function(xml) {
					ref.xml = xml;
					console.log(ref.xml)
					ref.loadIntructionScreen();
					
					if($(ref.xml).find('transcript').length > 0){
					var transcriptText = $(ref.xml).find('transcript').text();
						$('#contentTab_2').html(transcriptText)
					}
					
					if($(ref.xml).find('resources').length > 0){
						var resourcesText = $(ref.xml).find('resources').text();
						$('#contentTab_1').html(resourcesText)
					}
					
					if(isMobile.any()){
				
				}else{
                var obj = $('#contentTab_2');
                setTimeout(function() {
                    window.shell.attachScrollBar(obj, 8, 100, '#cccccc', '#0090DA')
					  
                }, 1000);
				}
					
			}
		});
		
		
	}
	
	//For Loading the Instruction in green place.
	landingPageTemplate.prototype.loadIntructionScreen = function() {	
		ref= this
		var heading = $(ref.xml).find('LandingPage').find('PageContent').find('heading').text();
		var image = $(ref.xml).find('LandingPage').find('PageContent').find('image').text();
		var image_xPOS = $(ref.xml).find('LandingPage').find('PageContent').find('image').attr("xPOS");
		// var image_alt = $(ref.xml).find('LandingPage').find('PageContent').find('image').attr("altText");
		var image_yPOS = $(ref.xml).find('LandingPage').find('PageContent').find('image').attr("yPOS");
		var image_width = $(ref.xml).find('LandingPage').find('PageContent').find('image').attr("width");
		var paraLength = $(ref.xml).find('LandingPage').find('PageContent').find('para').length
		var captionLength = $(ref.xml).find('LandingPage').find('PageContent').find('caption').length
		var str= ""
			for(var i=0; i<paraLength; i++)
			{
				str += '<p >' + $(ref.xml).find('LandingPage').find('PageContent').find('para').eq(i).text() + '</p>'
			}
			$(ref.container).find(".wrapper .header-container .para").html(str);

		var str1= ""
			for(var i=0; i<captionLength; i++)
			{
				ref.textpositionarray.push({})
				str1 += '<div  id="caption_'+i+'">' + $(ref.xml).find('LandingPage').find('PageContent').find('caption').eq(i).text() + '</div>'
				
				ref.textpositionarray[i][0]= $(ref.xml).find('LandingPage').find('PageContent').find('caption').eq(i).attr('xPOS')
				ref.textpositionarray[i][1]= $(ref.xml).find('LandingPage').find('PageContent').find('caption').eq(i).attr('yPOS')
				ref.textpositionarray[i][2]= $(ref.xml).find('LandingPage').find('PageContent').find('caption').eq(i).attr('width')

				$('#caption_'+i+'').css('left',''+ref.textpositionarray[i][0]+'px')
				$('#caption_'+i+'').css('top',''+ref.textpositionarray[i][1]+'px')
				$('#caption_'+i+'').css('width',''+ref.textpositionarray[i][2]+'px')
			}
			$(ref.container).find(".wrapper .footer-container .caption-container").html(str1);
			for(var i=0; i<captionLength; i++)
			{
				$('#caption_'+i+'').css('position','absolute')
				$('#caption_'+i+'').css('text-align','center')
				$('#caption_'+i+'').css('left',''+ref.textpositionarray[i][0]+'px')
				$('#caption_'+i+'').css('top',''+ref.textpositionarray[i][1]+'px')
				$('#caption_'+i+'').css('width',''+ref.textpositionarray[i][2]+'px')
			}
		var backgroundImage = $(ref.xml).find('LandingPage').find('PageContent').find('backgroundImage').text();	

		$(ref.container).find(".wrapper .header-container .heading").html(heading);
		$(ref.container).find(".wrapper .start-container-static_screen-type1").css('background-image', 'url(' + backgroundImage + ')');
		
		$('.image').css('background', 'url('+image+')no-repeat')
		$('.image').css('left',''+image_xPOS+'px')
		$('.image').css('top',''+image_yPOS+'px')
		$('.image').css('width',''+image_width+'px')
		// $('.image').attr('aria-label',''+image_alt)

		// $(ref.container).find(".wrapper .start-container-static_screen-type1").html(landing_page_content);
			// code for nicescroll bar
					if(isMobile.any()){
					
					}else{
					var obj1 = $(ref.container).find('.coachTipContainer');
					
					setTimeout(function() {
					try{
						window.shell.attachScrollBar(obj1, 8, 100, '#cccccc', '#0090DA');
						$(ref.container).find('coachTipContainer').getNiceScroll().show();
						$(ref.container).find('coachTipContainer').getNiceScroll().resize();
						}catch(e){
						
						}
					}, 300);
				}
					
			// nicescroll bar end		
			if(window.shell.globalPageVisited[window.shell.curPage - 1] == true){

			}else{
				window.shell.updateVisitedPages(globalCurTopic, globalCurPage);
			}
			

			
			window.shell.attachEvents();
	}

	
	}
	
    return landingPageTemplate;
});