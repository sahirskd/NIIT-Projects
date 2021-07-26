define([], function () {

	function TabActivityTemplate() {
		this.xml = null;		
		this.container = null;		
		this.globalThumb;
		this.xmlName;
		window.isNextDisabled=false;
		this.allThumbVisited=[]	;
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
				var boolValue = true;	
				var sizeOfPoups=[{}]
				var tabSize=[{}]	
				var thumbLength = $(ref.xml).find("personal_info").find('TabContainer').find("tab").length;					
				var popupLength = $(ref.xml).find("personal_info").find("popup_container").length;


				
var backgroundImage = $(ref.xml).find('backgroundImage').text();
$(ref.container).find(".TabActivity-container_type3").css('background-image', 'url(' + backgroundImage + ')');
				
				var heading = $(ref.xml).find("personal_info").find("PageContent").find("heading").text()
				var instructionText = $(ref.xml).find("personal_info").find("PageContent").find("instructionText").text()
				var paragraph = $(ref.xml).find("personal_info").find("PageContent").find("paragraph").text()				
				$(ref.container).find('#osText_tabActivity_typ3 .page-title').html(heading);
				$(ref.container).find('#osText_tabActivity_typ3 .instruction-text').html(instructionText);
				$(ref.container).find('#osText_tabActivity_typ3 .subHead').html(paragraph);



				
				sizeOfPoups[0].width=$(ref.xml).find("personal_info").find("TabPopupSize").attr('width')
				sizeOfPoups[0].height=$(ref.xml).find("personal_info").find("TabPopupSize").attr('height')	
				var tabPopUpWidth=sizeOfPoups[0].width
				var tabPopUpHeight=sizeOfPoups[0].height
				$('.TabActivity-container_type3 #modalwrapper .pop-up').css('width',''+tabPopUpWidth+'px')
				$('.TabActivity-container_type3 #modalwrapper .pop-up').css('height',''+tabPopUpHeight+'px')
								
				var str = '';
				for(var i=0; i<thumbLength; i++){	
					
					ref.allThumbVisited[i]=0
					ref.captionPosition.push({})
					str+= '<div class="img_tag" id="tabimg_' + i + '">';				
					str+='<figure class="figure-ctr" id="personal_' + i + '" data-toggle="modal" data-target="#myModal" data-index="' + i + '">';		
					
					str+='<img  src="' + $(ref.xml).find("personal_info").find('TabContainer').find("tab").eq(i).find('imageCurrent').text() +'" class="figure-img-2 img-fluid rounded" id="personal_x" alt="lights" >';					
					
					str+='<img class="svgIcon hide" src="' + $(ref.xml).find("personal_info").find('TabContainer').find("tab").eq(i).find('imageVisited').text()+ '">'					
					str += '<figcaption  class="figure-caption" id="capTab3_' + i + '">' + $(ref.xml).find("personal_info").find("tab").eq(i).find('caption').text()  + '</figcaption>';
					str += '<clickedText  class="clicked-text">' + $(ref.xml).find("personal_info").find("tab").eq(i).find('clickedText').text()  + '</clickedText>';
					
					str += '</figure>';
					
					str +='</div>'
					
					ref.captionPosition[i][0]=$(ref.xml).find("personal_info").find("TabContainer").find("tab").find('caption').eq(i).attr('leftPos')
					ref.captionPosition[i][1]=$(ref.xml).find("personal_info").find("TabContainer").find("tab").find('caption').eq(i).attr('bottomPos')
				}		
				$(ref.container).find('#tabContainer').find('.tab_inside-ctr').html(str);			
				
				tabSize[0].width=$(ref.xml).find("personal_info").find('TabContainer').find("tabsize").attr('width')
				tabSize[0].height=$(ref.xml).find("personal_info").find('TabContainer').find("tabsize").attr('height')	
				var tabWidth=tabSize[0].width
				var tabHeight=tabSize[0].height
				$('.TabActivity-container_type3 .img_tag').css('width',''+tabWidth+'px')
				$('.TabActivity-container_type3 .img_tag').css('height',''+tabHeight+'px')	
				console.log(ref.captionPosition)
				for (var i=0; i<ref.captionPosition.length; i++){
					$('#capTab3_' + i + '').css('left',''+ref.captionPosition[i][0]+'px')
					$('#capTab3_' + i + '').css('bottom',''+ref.captionPosition[i][1]+'px')
					
				}
				
	}	
	TabActivityTemplate.prototype.addFunctionality=function()
	{
		var ref = this;			
		$(ref.container).find('#tabContainer').find('.figure-ctr').eq(0).find('div').css('display','none')
		$(ref.container).find('#tabContainer').find('.figure-ctr').find('.figure-caption').prop('disabled',true);				
		$(ref.container).find('#tabContainer').find('.figure-ctr').on('click', openModalPopup);
		
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
			$('.clicked-text').hide()
			$('.svgIcon').hide()				
			
			$(this).find('.clicked-text').show()					
			ref.globalThumb = $(this).parent();					
			$(ref.globalThumb).find('.svgIcon').show();	
			var modalID = $(this).parent().attr('id').split('_')[1];
			enableNext(modalID)	
			
			setTimeout(function(){
				$(ref.container).find('.modal-dialog').find('.modal-content').find('.modal-body').find('div').getNiceScroll().show();			
				//$(ref.container).find('.modal-dialog').find('.modal-content').find('.modal-body').find('div').getNiceScroll().scrollTop(0);
				$(ref.container).find('.modal-dialog').find('.modal-content').find('.modal-body').find('div').getNiceScroll().resize();
			}, 500);			
			//prevent native touch activity like scrolling
			$('.modal_bg').on('touchstart touchmove', function(e){ 				 
				 e.preventDefault(); 
			});
		}
			
		function instructionContinue()
			{
			//$(ref.container).find('.click_to_reveal_typ1').find('.instruction-continue').hide();
			//$(ref.container).find('.click_to_reveal_typ1').find('.thumbnail-boxes-ctr').show();
		}

		
	}
	
		return TabActivityTemplate;	
});
	
	


	
	
	