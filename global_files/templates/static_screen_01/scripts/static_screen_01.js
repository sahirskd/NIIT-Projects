define([], function() {	
    function landingPageTemplate() {
       this.xml = null;
	   this.classRef = null;
	   this.tabId;
	   this.selectedTabId;
    }
    landingPageTemplate.prototype = new Util();
    landingPageTemplate.prototype.constructor = landingPageTemplate;
    landingPageTemplate.prototype.init = function(xmlName) {
        var ref = this;
        this.container = this.getPageContainer();		
        if(isLocalfileOrServer==true){
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
			
			}
		else{
			setTimeout(function() {
				ref.loadXML(xmlName);
			}, 300);
		}	
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
			
		// var landing_page_content = $(ref.xml).find('LandingPage').find('PageContent').text();
		var paraLength = $(ref.xml).find('LandingPage').find('PageContent').find('para').length;
		var heading =$(ref.xml).find('LandingPage').find('PageContent').find('heading').text();
		var subheading =$(ref.xml).find('LandingPage').find('PageContent').find('subHead').text();
		var btn_content=$(ref.xml).find('LandingPage').find('buttonText').text()
		var copyrightText=$(ref.xml).find('LandingPage').find('copyrightText').text()
		var backgroundImage = $(ref.xml).find('backgroundImage').text();
		$(ref.container).find(".wrapper .header-container .heading").html(heading);
		$(ref.container).find(".wrapper .button-container .start").html(btn_content)
		$(ref.container).find(".subhead").html(subheading)
		$(ref.container).find(".wrapper .button-container #copyright").html(copyrightText)
		// console.log(backgroundImage)
		$(ref.container).find(".wrapper .start-container").css('background-image', 'url(' + backgroundImage + ')');
		var str = '';
		for (let i = 0; i < paraLength; i++) {
			str += $(ref.xml).find('LandingPage').find('PageContent').eq(i).find('para').text()
		}
		$(ref.container).find(".teraf-body-container").html(str);

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