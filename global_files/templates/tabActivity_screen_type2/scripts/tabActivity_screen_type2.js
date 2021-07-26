define([], function () {

	function TabActivityTemplate() {
		this.xml = null;		
		this.container = null;		
		this.globalThumb;
		this.xmlName;
		window.isNextDisabled=false;
		this.allThumbVisited=[]	;
		this.imageHoverSrc=[]
		this.imageMouseOutSrc=[]
		this.captionPosition=[]; // blank array to get the caption position.
		
	}

	TabActivityTemplate.prototype = new Util();
	TabActivityTemplate.prototype.constructor = TabActivityTemplate;

	TabActivityTemplate.prototype.init = function (xmlName) 
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
	
	//	ref.LoadXml(xmlName);		
		//alert(this.container)
		
		$(".btnNext").css("pointer-events","none");
		$(".btnNext").css("opacity","0.5");
		
		this.pageLoaded();	
	}
		
	TabActivityTemplate.prototype.LoadXml = function (xmlNameRef)  // load xml file 
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
	
	TabActivityTemplate.prototype.createThumb = function () // createThumb function for creating dynamic tabs 
	{					
				var ref = this;	
				var sizeOfPoups=[{}]	
				var tabSize=[{}]
				var thumbLength = $(ref.xml).find("personal_info").find('TabContainer').find("tab").length;					
				var heading = $(ref.xml).find("personal_info").find("PageContent").find("heading").text()
				var instructionText = $(ref.xml).find("personal_info").find("PageContent").find("instructionText").text()
				var paragraph = $(ref.xml).find("personal_info").find("PageContent").find("paragraph").text()				
				$(ref.container).find('#osText_tabActivity_typ2 .page-title').html(heading);
				$(ref.container).find('#osText_tabActivity_typ2 .instruction-text').html(instructionText);
				$(ref.container).find('#osText_tabActivity_typ2 .subHead').html(paragraph);


				sizeOfPoups[0].width=$(ref.xml).find("personal_info").find("TabPopupSize").attr('width')
				sizeOfPoups[0].height=$(ref.xml).find("personal_info").find("TabPopupSize").attr('height')	
				var tabPopUpWidth=sizeOfPoups[0].width
				var tabPopUpHeight=sizeOfPoups[0].height
				$('.TabActivity-container_type2 #modalwrapper .pop-up').css('width',''+tabPopUpWidth+'px')
				$('.TabActivity-container_type2 #modalwrapper .pop-up').css('height',''+tabPopUpHeight+'px')
					
									
			var str = '';
				for(var i=0; i<thumbLength; i++){					
					
					ref.allThumbVisited[i]=0
					ref.captionPosition.push({})
					str+= '<div class="img_tag" id="tabimg_' + i + '">';
					
					str+='<figure class="figure-ctr" id="personal_' + i + '" data-toggle="modal" data-target="#myModal" data-index="' + i + '">';				
					str+='<img  src="' + $(ref.xml).find("personal_info").find('TabContainer').find("tab").eq(i).find('imageNormal').text() +'" class="figure-img-2 img-fluid rounded" id="personal_x" alt="lights" >';					
					str+='<img  src="' + $(ref.xml).find("personal_info").find('TabContainer').find("tab").eq(i).find('imageHover').text() +'" class="figure-img-hover-2 img-fluid rounded" id="personal_x" alt="lights" >';					
					
					str+='<img  class="svgIcon hide" src="' + $(ref.xml).find("personal_info").find('TabContainer').find("tab").eq(i).find('imageVisited').text()+ '">'	
					
					str += '<figcaption  class="figure-caption" id="capTab1_' + i + '">' + $(ref.xml).find("personal_info").find("tab").eq(i).find('caption').text()  + '</figcaption>';
					
					str += '</figure>';
					
					str +='</div>'
					
					ref.imageHoverSrc[i]=$(ref.xml).find("personal_info").find('TabContainer').find("tab").eq(i).find('imageHover').text()
					ref.imageMouseOutSrc[i]=$(ref.xml).find("personal_info").find('TabContainer').find("tab").eq(i).find('imageNormal').text()
					ref.captionPosition[i][0]=$(ref.xml).find("personal_info").find("TabContainer").find("tab").find('caption').eq(i).attr('leftPos')
					ref.captionPosition[i][1]=$(ref.xml).find("personal_info").find("TabContainer").find("tab").find('caption').eq(i).attr('bottomPos')
				}		
				$(ref.container).find('#tabContainer').find('.tab_inside-ctr').html(str);			
				
				tabSize[0].width=$(ref.xml).find("personal_info").find('TabContainer').find("tabsize").attr('width')
				tabSize[0].height=$(ref.xml).find("personal_info").find('TabContainer').find("tabsize").attr('height')	
				var tabWidth=tabSize[0].width
				var tabHeight=tabSize[0].height
				$('.TabActivity-container_type2 .img_tag').css('width',''+tabWidth+'px')
				$('.TabActivity-container_type2 .img_tag').css('height',''+tabHeight+'px')
				var tabcontainerHeight=$(ref.xml).find("personal_info").find('TabContainer').attr('height')	
				$('.TabActivity-container_type2 .tabActivity-boxes-ctr').css('height',''+tabcontainerHeight+'px')
				
				for (var i=0; i<ref.captionPosition.length; i++){
					$('#capTab1_' + i + '').css('left',''+ref.captionPosition[i][0]+'px')
					$('#capTab1_' + i + '').css('bottom',''+ref.captionPosition[i][1]+'px')
					
				}
				
	}
	
	TabActivityTemplate.prototype.createThumbPopUp = function()	//createThumbPopUp function..........
	{
				var ref = this;	
				var boolValue = true;			
				var popupLength = $(ref.xml).find("personal_info").find("popup_container").length;
				var strPop = '';				
				for(var i=0; i<popupLength; i++){				
				strPop += '<div class="tabpopContent" id="tabpopUpContent01_' + i +'">';
				
				strPop+='<div class="popContent-inner">'
				
				strPop+= '<div class="modal-header-custom">';
				
				strPop+= '<img   alt="'+$(ref.xml).find("personal_info").find("popup_container").eq(i).find('imgbg').attr("altText")+'" src = '+ $(ref.xml).find("personal_info").find("popup_container").eq(i).find('imgbg').text() +' class="popup-bgImg">';		
				
				strPop+= '<div  class="modal-body-custom"> '+$(ref.xml).find("personal_info").find('popup_container').eq(i).find("para_content").text() + '</div>';					
				
				strPop+= '</div>';
				strPop+= '</div>';
				strPop+= '<div  class="close-instrution">'+$(ref.xml).find("personal_info").find('instruction_close').find("para_content").text() +'</div>';
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
				
			
				
				// code for nicescroll bar				
				if(isMobile.any()){
				
				}else{
					
				var obj = $(ref.container).find('#instructionScreen').find('.instruction_inner').find('.instruction_content');
				//alert("coming here");
				setTimeout(function() {					
					//$('.nicescroll-rails').each(function(){
                      //          $(this).remove();
                        //        });
					try{
					window.shell.attachScrollBar(obj, 4, 100, '#fff', '#ff0000');
					}
					catch(e){		
					}
				}, 1000);
				
				}
				
				// code for nicescroll bar ends							
				// code for nicescroll bar				
				if(isMobile.any()){
				
				}else{
					
				var obj = $(ref.container).find('#modalwrapper').find('.popContent').find('.modal-body-custom');
				setTimeout(function() {
					
					//$('.nicescroll-rails').each(function(){
                      //          $(this).remove();
                        //        });
					try{
					window.shell.attachScrollBar(obj, 4, 100, '#fff', '#ff0000');
					}
					catch(e){
					
					}
				}, 1000);
				
				}
	
	}
	
	TabActivityTemplate.prototype.addFunctionality=function()
	{
		var ref = this;			
		$(ref.container).find('#tabContainer').find('.figure-ctr').eq(0).find('div').css('display','none')
		$(ref.container).find('#tabContainer').find('.figure-ctr').find('.figure-caption').prop('disabled',true);				
		$(ref.container).find('#tabContainer').find('.figure-ctr').on('click', openModalPopup);
		$(ref.container).find('#tabContainer').find('.figure-ctr').on('mouseover', onMouseHover);
		$(ref.container).find('#tabContainer').find('.figure-ctr').on('mouseout', onMouseOut);
		
		
		function onMouseHover()
		{
			var id = $(this).attr('id').split('_')[1];			
			// $(this).find('img').eq(0).attr('src',''+ref.imageHoverSrc[id]+'')
			$(this).find('img').eq(1).show()
			//$(this).find('img').eq(1).attr('src',''+ref.imageHoverSrc[id]+'')			
			
		}
		function onMouseOut()
		{
			var id = $(this).parent().attr('id').split('_')[1];			
			// $(this).find('img').eq(0).attr('src',''+ref.imageMouseOutSrc[id]+'')
			$(this).find('img').eq(1).hide()
			
		}
		
		
		
		
		
		function enableNext(arg)
		{
			ref.allThumbVisited[arg]=1									
			if(ref.allThumbVisited.join().indexOf(0)==-1)
			{						
				
				$(".btnNext").removeAttr("style");
				window.shell.updateVisitedPages(globalCurTopic, globalCurPage);
				
			
			}
		}
		
		function closePopup(){
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
			$(ref.globalThumb).find('.figure-img').hide();			
			//$(ref.globalThumb).addClass('selected');
			$(ref.container).find('.modal-dialog').find('.modal-content').find('.modal-body').find('div').getNiceScroll().hide();		
		}
		
		function openModalPopup()//  function to open the ThumbpopUP
		{	
			if (isLocalfileOrServer!=true) {
				window.shell.checkhostReachable()    
				if(onLineFlag=="offline"){
					return;
				}
			}
			$(this).parent().addClass('selected');				
			ref.globalThumb = $(this).parent();			
			$(".btnclose").on('click', closePopup);
			$('#modalwrapper').show();				
			$(ref.globalThumb).find('.svgIcon').show();	
			var modalID = $(this).parent().attr('id').split('_')[1];
			enableNext(modalID)			
			var myid= parseInt(modalID)+1;
			$('#disabled-click_'+ myid+'').hide();
			$('#disImg_'+ myid+'').hide();		
			$(ref.container).find('#modalwrapper').show();			
			$(ref.container).find('#modalwrapper').find("#tabpopUpContent01_" + modalID).fadeIn("slow");
			$(ref.container).find('#modalwrapper').find("#tabpopUpContent01_" + modalID).siblings('div.tabpopContent').hide();			
			if($(ref.container).find('.figure-ctr').length == $(ref.container).find('.selected').length){			
				window.shell.updateVisitedPages(globalCurTopic, globalCurPage);
				
			}
			setTimeout(function(){
				$(ref.container).find('.modal-dialog').find('.modal-content').find('.modal-body').find('div').getNiceScroll().show();$(ref.container).find('.modal-dialog').find('.modal-content').find('.modal-body').find('div').getNiceScroll().resize();
			}, 500);		
			
		}
		
		function instructionContinue()
			{
			//$(ref.container).find('.click_to_reveal_typ1').find('.instruction-continue').hide();
			//$(ref.container).find('.click_to_reveal_typ1').find('.thumbnail-boxes-ctr').show();
		}		
	}
	
		return TabActivityTemplate;	
});
	
	


	
	
	