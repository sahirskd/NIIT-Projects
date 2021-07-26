define([], function() {	
    function staticScreenType2() {
       this.xml = null;
	   this.classRef = null;
	   this.tabId;
	   this.selectedTabId;
    }
    staticScreenType2.prototype = new Util();
    staticScreenType2.prototype.constructor = staticScreenType2;
    staticScreenType2.prototype.init = function(xmlName) {
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
				}, 30);
			
		// 	}
		// else{
		// 	setTimeout(function() {
		// 		ref.loadXML(xmlName);
		// 	}, 300);
		// }

	
		
	
	
		staticScreenType2.prototype.loadXML = function(xmlNameRef) {
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
	staticScreenType2.prototype.loadIntructionScreen = function() {	
			
		var heading = $(ref.xml).find('staticScreen2').find('PageContent').find('heading').text();
		var paragraph = $(ref.xml).find('staticScreen2').find('PageContent').find('paragraph').text();
		var listLength = $(ref.xml).find('staticScreen2').find('PageContent').find('list').length;
		var backgroundImage = $(ref.xml).find('staticScreen2').find('PageContent').find('backgroundImage').text();
		$(ref.container).find(".wrapper .staticScreen2Container .header-container .heading").html(heading);
		$(ref.container).find(".wrapper .staticScreen2Container .header-container .questionPara").html(paragraph);
		$(ref.container).find(".wrapper .staticScreen2-container").css('background-image', 'url(' + backgroundImage + ')');
		
		//.................set the position and widht of text container
		var TabContainerWidth =$(ref.xml).find("staticScreen2").find("PageContent").attr("width")
		var TabContainerHeight =$(ref.xml).find("staticScreen2").find("PageContent").attr("height")
		var TabContainerPosition =$(ref.xml).find("staticScreen2").find("PageContent").attr("position")
		var TabContainerMargin =$(ref.xml).find("staticScreen2").find("PageContent").attr("margin")
		$('#page1 .staticScreen2-container .right_panel').css('width',''+TabContainerWidth+'')
		$('#page1 .staticScreen2-container .right_panel').css('height',''+TabContainerHeight)
		$('#page1 .staticScreen2-container .right_panel').css('position',''+TabContainerPosition)
		$('#page1 .staticScreen2-container .right_panel').css('margin',''+TabContainerMargin)
		
		// console.log(list)
		
		var str = '';
		for (let i = 0; i < listLength; i++) {
			str += '<li>' + $(ref.xml).find('staticScreen2').find('PageContent').find('list').eq(i).text() + '</li>'
		}
		
		$(ref.container).find(".wrapper .list").html(str);









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
	
    return staticScreenType2;
});