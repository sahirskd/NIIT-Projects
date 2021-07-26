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
		
		// Loading static content like heading subheading etc 
		// var landing_page_content = $(ref.xml).find('staticScreen4').find('PageContent').text();
		var heading = $(ref.xml).find('staticScreen4').find('PageContent').find('heading').text();
		var paragraph = $(ref.xml).find('staticScreen4').find('PageContent').find('paragraph').text();
		$(ref.container).find("#page3 .header-container h2").html(heading);
		$(ref.container).find("#page3 .header-container p").html(paragraph);
		
		// Loop for loading image  title dynamically
		imageTitleLenth = $(ref.xml).find('staticScreen4').find('PageContent').find('imageTitle').length;
		var str = '';
		for (let i = 0; i < imageTitleLenth; i++) {
			str += '<div class="imgTitle" id="title'+(i+1)+'" >'+$(ref.xml).find('staticScreen4').find('PageContent').find('imageTitle').eq(i).text()+'</div>'
		}

		// Loop for loading image description 
		for (let i = 0; i < imageTitleLenth; i++) {
			str += '<div  class="imgTitle" id="desc'+(i+1)+'"><p >'+$(ref.xml).find('staticScreen4').find('PageContent').find('imageDescription').eq(i).text()+'</p></div>'
		}
		$(ref.container).find("#page3 .staticScreenT4-container .imageTitlePart").html(str);



		// Loop for loading map title 
		var mapTitleLength = $(ref.xml).find('staticScreen4').find('PageContent').find('mapTitle').length;
		var str2 = '<h4 >'+$(ref.xml).find('staticScreen4').find('PageContent').find('image2Title').text()+'</h4>';
		for (let i = 0; i < mapTitleLength; i++) {
			str2 += '<div class="mapTitle" id="mapTitle'+(i+1)+'"><p >'+$(ref.xml).find('staticScreen4').find('PageContent').find('mapTitle').eq(i).text()+'</p></div>'
		}
		$(ref.container).find("#page3 .staticScreenT4-container .imageMapPart .mapTitleDesc").html(str2);
		
		
		// Loop for loading map description 
		var imageLength = $(ref.xml).find('staticScreen4').find('image').length;
		for (let i = 0; i < imageLength; i++) {
			$(ref.container).find(".imageTitlePart").find('#title'+(i+1)+'').html($(ref.xml).find('staticScreen4').find('image').find('titleText').eq(i).text());
		}


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
	
    return staticScreenType4;
});