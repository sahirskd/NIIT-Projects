define([], function() {	
    function staticScreenType3() {
       this.xml = null;
	   this.classRef = null;
	   this.tabId;
	   this.selectedTabId;
    }
    staticScreenType3.prototype = new Util();
    staticScreenType3.prototype.constructor = staticScreenType3;
    staticScreenType3.prototype.init = function(xmlName) {
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
		$(ref.container).find(".mcqBackBtn").click(function(){
			$(ref.container).hide();
			$('.fixed_block').show();
			$('body').removeClass('activityOpened');
			$('#shellContainer_content_box').removeClass('changingPadding');
		});
	
	
		staticScreenType3.prototype.loadXML = function(xmlNameRef) {
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
	staticScreenType3.prototype.loadIntructionScreen = function() {	
			
		var heading = $(ref.xml).find('staticScreen3').find('PageContent').find('heading').text();
		var paragraph = $(ref.xml).find('staticScreen3').find('PageContent').find('paragraph').text();
		var listLength = $(ref.xml).find('staticScreen3').find('PageContent').find('Images').length;
		var backgroundImage = $(ref.xml).find('staticScreen3').find('PageContent').find('backgroundImage').text();
		$(ref.container).find(".wrapper .staticScreen3Container .header-container .heading").html(heading);
		$(ref.container).find(".wrapper .staticScreen3Container .header-container .questionPara").html(paragraph);
		$(ref.container).find(".wrapper .staticScreen3-container").css('background-image', 'url(' + backgroundImage + ')');
		
		// console.log(list)
		
		var str = '';
		for (let i = 0; i < listLength; i++) {
			str += '<li><img alt="'+$(ref.xml).find("staticScreen3").find("PageContent").find('Images').eq(i).attr("altText")+'"  src=' + $(ref.xml).find('staticScreen3').find('PageContent').find('Images').eq(i).text() + '><span aria-label="" >'+ $(ref.xml).find('staticScreen3').find('PageContent').find('ImageText').eq(i).text() +'</span></li>'
		}
		
		// console.log($(ref.xml).find('staticScreen3').find('PageContent').find('ImageText').text())
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
	
    return staticScreenType3;
});