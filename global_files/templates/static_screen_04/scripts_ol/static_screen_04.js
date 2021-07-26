define([], function() {	
    function staticScreenType4() {
       this.xml = null;
	   this.classRef = null;
	   this.tabId;
	   this.selectedTabId;
    }
    staticScreenType4.prototype = new Util();
    staticScreenType4.prototype.constructor = staticScreenType4;
    staticScreenType4.prototype.init = function(xmlName) {
        var ref = this;
        this.container = this.getPageContainer();		
//        if(isLocalfileOrServer==true){
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
				}, 30);
			
		// 	}
		// else{
		// 	setTimeout(function() {
		// 		ref.loadXML(xmlName);
		// 	}, 300);
		// }
		
		setTimeout(function() {
			//$(".nextItext").show();
			
		}, 300);
		
		$(ref.container).find(".mcqBackBtn").click(function(){
			$(ref.container).hide();
			$('.fixed_block').show();
			$('body').removeClass('activityOpened');
			$('#shellContainer_content_box').removeClass('changingPadding');
		});
	
	
		staticScreenType4.prototype.loadXML = function(xmlNameRef) {
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
	staticScreenType4.prototype.loadIntructionScreen = function() {	
			
		var landing_page_content = $(ref.xml).find('staticScreen4').find('PageContent').text();
		$(ref.container).find(".wrapper .staticScreen4Container").html(landing_page_content);
		
		var title1head = $(ref.xml).find('staticScreen4').find('image1').find('titleText').text();
		var title2head = $(ref.xml).find('staticScreen4').find('image2').find('titleText').text();
		var title3head = $(ref.xml).find('staticScreen4').find('image3').find('titleText').text();
		var title4head = $(ref.xml).find('staticScreen4').find('image4').find('titleText').text();
		
		$(ref.container).find(".imageTitlePart").find('#title1').html(title1head);
		$(ref.container).find(".imageTitlePart").find('#title2').html(title2head);
		$(ref.container).find(".imageTitlePart").find('#title3').html(title3head);
		//$(ref.container).find(".imageTitlePart").find('#title1').html(title1head);
		
		

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
			window.shell.updateVisitedPages(globalCurTopic, globalCurPage);
			
			window.shell.attachEvents();
	 }	
	}
	
    return staticScreenType4;
});