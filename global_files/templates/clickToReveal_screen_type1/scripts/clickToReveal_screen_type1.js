define([], function () {

	function ClickRevealTemplate() {
		this.xml = null;		
		this.container = null;		
		this.globalThumb;
		this.xmlName;
		this.modalID
		window.isNextDisabled=false;
		this.allThumbVisited=[]	;// blank array to track all tab visited.
		this.imageHoverSrc=[];
		this.imageMouseOutSrc=[];
		this.captionPosition=[]; // blank array to get the caption position of images.
		
	}

	ClickRevealTemplate.prototype = new Util();
	ClickRevealTemplate.prototype.constructor = ClickRevealTemplate;

	ClickRevealTemplate.prototype.init = function (xmlName) 
	{		
		
		var ref = this;	
		this.container = this.getPageContainer();
		
		if(isLocalfileOrServer==true){
			setTimeout(function() {
				landingPageContent=function(data){
					
					var parser = new DOMParser(); 
					xml = parser.parseFromString(data, 'text/xml')
					ref.xml = xml;
					ref.createThumb() // call createThumb function
				ref.createThumbPopUp() // call createThumbPopUp function
				ref.addFunctionality() // call addFunctionality function of clickToReveal template type 1
				}
				var topicscript = document.createElement('script');
				topicscript.src = "data/" + xmlName + "/" + xmlName + ".js",
				document.getElementsByTagName('head')[0].appendChild(topicscript)
				}, 10);
			
			}
		else{
			setTimeout(function() {
				ref.LoadXml(xmlName);
			}, 300);
		}
		//ref.LoadXml(xmlName);	
		
		$(".btnNext").css("pointer-events","none");
		$(".btnNext").css("opacity","0.5");		
		//this.pageLoaded();	
	}
	
	// Method to load the external xml data	
	ClickRevealTemplate.prototype.LoadXml = function (xmlNameRef)  // load xml file 
	{	
			var ref= this;
			$.ajax({
			type: "GET",
			url: "data/" + xmlNameRef + "/"+ xmlNameRef +".xml",
			dataType: "xml",
			success: function(xml) {
				ref.xml = xml;
				
				ref.createThumb() // call createThumb function
				ref.createThumbPopUp() // call createThumbPopUp function
				ref.addFunctionality() // call addFunctionality function of clickToReveal template type 1
				
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
	// createThumb function for creating dynamic tabs 
	ClickRevealTemplate.prototype.createThumb = function () 
	{					
				var ref = this;						
				var thumbLength = $(ref.xml).find("personal_info").find("TabContainer").find("node").length;				
				var heading = $(ref.xml).find("personal_info").find("PageContent").find("heading").text()
				var instructionText = $(ref.xml).find("personal_info").find("PageContent").find("instructionText").text()
				var paragraph = $(ref.xml).find("personal_info").find("PageContent").find("paragraph").text()				
				$(ref.container).find('#osText_click_to_reveal_typ1 .click-to-reval-heading-type01 p').html(heading);
				$(ref.container).find('#osText_click_to_reveal_typ1 .instruction-text p').html(instructionText);
				$(ref.container).find('#osText_click_to_reveal_typ1 .ost-text01 p').html(paragraph);



				var backgroundImage = $(ref.xml).find('backgroundImage').text();
				$(ref.container).find(".clickAndReveal-container_01").css('background-image', 'url(' + backgroundImage + ')');
				
				// set the Thumbs container dimension by CSS...........	
				var TabContainerWidth=$(ref.xml).find("personal_info").find("TabContainer").attr("width")
				var TabContainerHeight=$(ref.xml).find("personal_info").find("TabContainer").attr("height")
				$('.click_to_reveal_typ1.thumbs_inside-ctr').css('width',''+TabContainerWidth+'px')
				$('.click_to_reveal_typ1.thumbs_inside-ctr').css('height',''+TabContainerHeight+'px')	
					
									
				var str = '';
				for(var i=0; i<thumbLength; i++){
					ref.allThumbVisited[i]=0;
					ref.captionPosition.push({})
					str+= '<div class="img_tag">';
					str+='<figur  class="figure-ctr1" id="personal_' + i + '" data-toggle="modal" data-target="#myModal" data-index="' + i + '">';
					str+='<div class="figure-ctr1-body">'
					
					str+='<img src="' + $(ref.xml).find("personal_info").find("TabContainer").find("node").eq(i).find('imageNormal').text()  +'" class="figure-img img-fluid rounded" id="personal_y" alt="lights" >';
					str+='<img src="' + $(ref.xml).find("personal_info").find('TabContainer').find("node").eq(i).find('imageHover').text()  +'" class="figure-img-hover img-fluid rounded" id="personal_y" alt="lights" >';
					str+='<img class="svgIcon hide" src="' + $(ref.xml).find("personal_info").find("TabContainer").find("node").eq(i).find('imageVisited').text()+ '">'
					str += '<figcaption  class="figure-caption" id="capRev1_' + i + '">' + $(ref.xml).find("personal_info").find("TabContainer").find("node").eq(i).find('caption').text()  + '</figcaption>'
					str += '</figure>';
					str +='</div>'				
					str +='</div>'	
					ref.imageHoverSrc[i]=$(ref.xml).find("personal_info").find('TabContainer').find("node").eq(i).find('imageHover').text()
					ref.imageMouseOutSrc[i]=$(ref.xml).find("personal_info").find('TabContainer').find("node").eq(i).find('imageNormal').text()
				
					ref.captionPosition[i][0]=$(ref.xml).find("personal_info").find("TabContainer").find("node").find('caption').eq(i).attr('leftPos')
					ref.captionPosition[i][1]=$(ref.xml).find("personal_info").find("TabContainer").find("node").find('caption').eq(i).attr('bottomPos')
						
				}
				
				$(ref.container).find('#thumbContainer').find('.thumbs_inside-ctr').html(str);
				
				// set the Thumbs dimension by CSS...........	
				var tabImgWidth=$(ref.xml).find("personal_info").find("TabContainer").find("node").attr("width")
				var tabImgHeight=$(ref.xml).find("personal_info").find("TabContainer").find("node").attr("height")				
				$('.figure-ctr1').css('width',''+tabImgWidth+'px')
				$('.figure-ctr1').css('height',''+tabImgHeight+'px')
				
				
				// set the position of images captions dynamically by xml
				for (var i=0; i<ref.captionPosition.length; i++){
						$('#capRev1_' + i + '').css('left',''+ref.captionPosition[i][0]+'px')
						$('#capRev1_' + i + '').css('bottom',''+ref.captionPosition[i][1]+'px')
					
				}
				
				
	}
	//createThumbPopUp function for creating poppup data
	ClickRevealTemplate.prototype.createThumbPopUp = function()	
	{				
				var ref = this;
				var boolValue = true;				
				var popupLength = $(ref.xml).find("personal_info").find("popup_container").length;				
				var strPop = '';				
				for(var i=0; i<popupLength; i++)
				{				
				strPop += '<div class="popContent" id="mypopUpContent_' + i +'">';
				strPop+= '<span  class="btnclose" id="popUpClose_' + i +'"><img src="global_files/templates/clickToReveal_screen_type1/images/close.png"></span>';
				strPop+='<div class="popContent-inner">'
				strPop+= '<div class="modal-header-custom">';
				strPop+= '<p class=""><img src = '+ $(ref.xml).find("personal_info").find("popup_container").eq(i).find('image').text() +'></p>';			
				strPop+= '<h5 class="modal-title" id="exampleModalLabel">' + $(ref.xml).find("personal_info").find("popup_container").eq(i).find('head_content').text() + '</h5>';
					
				strPop+= '</div>';
				strPop+= '<div class="divder-line"><img src="global_files/templates/clickToReveal_screen_type1/images/ClickToReveal-1_Popup-1_divider.png"></div>';
				strPop+= '<div class="modal-body-custom">';
				strPop+= '<div >' +$(ref.xml).find("personal_info").find('popup_container').eq(i).find("para_content").text() + '</div>';	
				
				strPop+= '</div>';
				strPop+= '</div>';
				strPop+= '<div class="close-instrution">'+$(ref.xml).find("personal_info").find('instruction_close').find("para_content").text() +'</div>';
				strPop+= '</div>';				
				}				
				$(ref.container).find('.pop-up').html(strPop);
				
				var instructionStr = '';
				if(boolValue == true){
					instructionStr += '<div class="instruction_inner padding-left-right-zero-custom">';
					instructionStr += '<h2>' + $(ref.xml).find("personal_info").find("instruction").find("head_content").text() + '</h2>';
					instructionStr += '<div class="padding-left-right-zero-custom instruction_content">' +$(ref.xml).find("personal_info").find("instruction").find("para_content").text() + '</div>';
					
					instructionStr += '</div';
				}			
				
				$(ref.container).find('#instructionScreen').find('.instruction_inner').find('.instruction_content').getNiceScroll().show();
				$(ref.container).find('#instructionScreen').find('.instruction_inner').find('.instruction_content').getNiceScroll().resize();
				
				$(ref.container).find('.click_to_reveal_typ1').find('#instructionScreen').html(instructionStr);
				
				// end
			
	}
	// function for creating tab events 
	ClickRevealTemplate.prototype.addFunctionality=function()
	{
		var ref = this;			
		$(ref.container).find('#thumbContainer').find('.figure-ctr1').on('click', openModalPopup);		
		$(ref.container).find('#thumbContainer').find('.figure-ctr1').on('mouseover', onMouseHover);
		$(ref.container).find('#thumbContainer').find('.figure-ctr1').on('mouseout', onMouseOut);
		
		function onMouseHover()
		{
			if ($(this).find('img').eq(0).next().is(":visible")) {  //.next()is(":visible")
				return
			}	
			var id = $(this).attr('id').split('_')[1];			
			// $(this).find('img').eq(0).attr('src',''+ref.imageHoverSrc[id]+'')	
			$(this).find('img').eq(1).show()
			
		}
		function onMouseOut()
		{
			var id = $(this).attr('id').split('_')[1];			
			// $(this).find('img').eq(0).attr('src',''+ref.imageMouseOutSrc[id]+'')
			$(this).find('img').eq(1).hide()
			
		}
		
		// function call to tack all tab visited 
		function enableNext(arg){
			ref.allThumbVisited[arg]=1									
			if(ref.allThumbVisited.join().indexOf(0)==-1){
				$(".btnNext").removeAttr("style");
				window.shell.updateVisitedPages(globalCurTopic, globalCurPage);				
			}
		}
		
		// function  call to close the popups
		function closePopup()
		{				
			if (isLocalfileOrServer!=true) {
				window.shell.checkhostReachable()    
				if(onLineFlag=="offline"){
					return;
				}
			}
			$('#modalwrapper').hide();
			$("#shellHeader").show();	
			$(".btnclose").off('click');			
			$(ref.globalThumb).find('.svgIcon').show();			
			$(ref.container).find('.modal-dialog').find('.modal-content').find('.modal-body').find('div').getNiceScroll().hide();
			enableNext(ref.modalID)
		}
		
		//  function to open the ThumbpopUP
		function openModalPopup()		  
		{	
			
			if (isLocalfileOrServer!=true) {
				window.shell.checkhostReachable()    
				if(onLineFlag=="offline"){
					return;
				}
			}
			$(this).addClass('selected');			
			$("#shellHeader").hide();	
			ref.globalThumb = $(this);			
			$(".btnclose").on('click', closePopup);
			$('#modalwrapper').show();			
			ref.modalID = $(this).attr('id').split('_')[1];
			ref.allThumbVisited[ref.modalID]=1
			$(ref.container).find('#modalwrapper').show();			
			$(ref.container).find('#modalwrapper').find("#mypopUpContent_" + ref.modalID).fadeIn("slow");
			$(ref.container).find('#modalwrapper').find("#mypopUpContent_" + ref.modalID).siblings('div.popContent').hide();
			// if($(ref.container).find('.figure-ctr1').length == $(ref.container).find('.selected').length){			
			// 	window.shell.updateVisitedPages(globalCurTopic, globalCurPage);
			// }
			setTimeout(function(){
				$(ref.container).find('.modal-dialog').find('.modal-content').find('.modal-body').find('div').getNiceScroll().show();				
				$(ref.container).find('.modal-dialog').find('.modal-content').find('.modal-body').find('div').getNiceScroll().resize();
			}, 500);
					
					//prevent native touch activity like scrolling
					$('.modal_bg').on('touchstart touchmove', function(e){ 				 
						 e.preventDefault(); 
					});
		}	

		
	}	
		return ClickRevealTemplate;	
});
	
	


	
	
	