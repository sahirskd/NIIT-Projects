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

			//	if(isLocalfileOrServer==true){
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
			//	else{
					
				//		ref.loadXML(xmlName);
					
			//	}
	//
	
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
		var subheading = $(ref.xml).find('LandingPage').find('PageContent').find('subheading').text();
		var paraLength = $(ref.xml).find('LandingPage').find('PageContent').find('para').length
		var str1= ""
			for(var i=0; i<paraLength; i++)
			{
				ref.textpositionarray.push({})
				str1 += '<div id="para_'+i+'">' + $(ref.xml).find('LandingPage').find('PageContent').find('para').eq(i).text() + '</div>'
				
				ref.textpositionarray[i][0]= $(ref.xml).find('LandingPage').find('PageContent').find('para').eq(i).attr('xPOS')
				ref.textpositionarray[i][1]= $(ref.xml).find('LandingPage').find('PageContent').find('para').eq(i).attr('yPOS')
				ref.textpositionarray[i][2]= $(ref.xml).find('LandingPage').find('PageContent').find('para').eq(i).attr('width')
				ref.textpositionarray[i][3]= $(ref.xml).find('LandingPage').find('PageContent').find('para').eq(i).attr('height')

				$('#para_'+i+'').css('left',''+ref.textpositionarray[i][0]+'px')
				$('#para_'+i+'').css('top',''+ref.textpositionarray[i][1]+'px')
				$('#para_'+i+'').css('width',''+ref.textpositionarray[i][2]+'px')
			}
			$(ref.container).find(".wrapper .footer-container .para-container").html(str1);
			for(var i=0; i<paraLength; i++)
			{
				$('#para_'+i+'').css('position','absolute')
				$('#para_'+i+'').css('left',''+ref.textpositionarray[i][0]+'px')
				$('#para_'+i+'').css('top',''+ref.textpositionarray[i][1]+'px')
				$('#para_'+i+'').css('width',''+ref.textpositionarray[i][2]+'px')
				$('#para_'+i+'').css('height',''+ref.textpositionarray[i][3]+'px')
				$(`#para_${i}`).children('span').css('color','green')
				$(`#para_${i}`).children('span').css('font-weight','bold')
			}
		var backgroundImage = $(ref.xml).find('LandingPage').find('PageContent').find('backgroundImage').text();
		$(ref.container).find(".wrapper .header-container .heading").html(heading);
		$(ref.container).find(".wrapper .header-container .subheading").html(subheading);
		$(ref.container).find(".wrapper .start-container-recap").css('background-image', 'url(' + backgroundImage + ')');

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