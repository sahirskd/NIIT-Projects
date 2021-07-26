define([], function () {	
	
	function ClickRevealTemplate() {
		this.xml = null;		
		this.container = null;		
		this.globalThumb;
		this.xmlName;
		window.isNextDisabled=false;
		this.modalID;
		this.allThumbVisited=[]	;
		
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
		//alert(this.container)
		
		$(".btnNext").css("pointer-events","none");
		$(".btnNext").css("opacity","0.5");
		
		this.pageLoaded();	
	}
	// function to load the external data.......................
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
				var boolValue = true;				
				var thumbLength = $(ref.xml).find("personal_info").find("node").length;	

				var heading = $(ref.xml).find("personal_info").find("PageContent").find("heading").text()
				var instructionText = $(ref.xml).find("personal_info").find("PageContent").find("instructionText").text()
				var paragraph = $(ref.xml).find("personal_info").find("PageContent").find("paragraph").text()				
				$(ref.container).find('#osText_click_to_reveal_typ2 .ost-text02 p').html(heading);
				$(ref.container).find('#osText_click_to_reveal_typ2 .ost-text01 p').html(paragraph);
				$(ref.container).find('#osText_click_to_reveal_typ2 .instruction-text p').html(instructionText);

				var backgroundImage = $(ref.xml).find('backgroundImage').text();
				$(ref.container).find(".clickAndReveal-container_02").css('background-image', 'url(' + backgroundImage + ')');
				

				var str = '';
				for(var i=0; i<thumbLength; i++){
					ref.allThumbVisited[i]=0;					
					str+= '<div class="img_tag">';				
					str+='<figure  class="figure-ctr" id="personal_' + i + '" data-toggle="modal" data-target="#myModal" data-index="' + i + '">';
						
					
					str+='<img src="' + $(ref.xml).find("personal_info").find("node").eq(i).find('imageCurrent').text() +'" class="figure-img-2 img-fluid rounded" id="personal_x" alt="lights" >';					
					str+='<img src="' + $(ref.xml).find("personal_info").find("node").eq(i).find('imageDisabled').text() +'" class="figure-img img-fluid rounded" id="disImg_' + i + '" alt="lights" >';
					str+='<img class="svgIcon hide" src="' + $(ref.xml).find("personal_info").find("node").eq(i).find('imageVisited').text()+ '">'				
					str += '<figcaption class="figure-caption">' + $(ref.xml).find("personal_info").find("node").eq(i).find('caption').text()  + '</figcaption>';
					str+= '<div class="disabled-click" id="disabled-click_'+i+'"></div>';		
					str += '</figure>';
					
					str +='</div>'			
				
				}		
				$(ref.container).find('#thumbContainer').find('.thumbs_inside-ctr').html(str);
				
	}
	//createThumbPopUp call to create the thumb popups function..........
	ClickRevealTemplate.prototype.createThumbPopUp = function()	
	{				
				var ref = this;
				var popupLength = $(ref.xml).find("personal_info").find("popup_container").length;
				var strPop = '';		
				
				for(var i=0; i<popupLength; i++){				
				strPop += '<div class="popContent" id="mypopUpContent_' + i +'">';
				strPop+= '<span  class="btnclose" id="popUpClose_' + i +'"><img src="global_files/templates/clickToReveal_screen_type1/images/close.png"></span>';
				strPop+='<div class="popContent-inner">'
				strPop+= '<div class="modal-header-custom">';
				strPop+= '<p class=""><img src = '+ $(ref.xml).find("personal_info").find("popup_container").eq(i).find('image').text() +'></p>';			
				strPop+= '<div class="modal-title" id="exampleModalLabel">' + $(ref.xml).find("personal_info").find("popup_container").eq(i).find('head_content').text() + '</div>';					
				strPop+= '</div>';
				strPop+= '<div  class="modal-body-custom-left"> '+$(ref.xml).find("personal_info").find('popup_container').eq(i).find("para_content_left").text() + '</div>';
				strPop+= '<div class="divder-line"><img src="global_files/templates/clickToReveal_screen_type1/images/ClickToReveal-1_Popup-1_divider.png"></div>';
				strPop+= '<div  class="modal-body-custom-right">';
				strPop+= '<div>' +$(ref.xml).find("personal_info").find('popup_container').eq(i).find("para_content_right").text() + '</div>';	
				
				strPop+= '</div>';
				strPop+= '</div>';
				strPop+= '<div class="close-instrution">'+$(ref.xml).find("personal_info").find('instruction_close').find("para_content").text() +'</div>';
				strPop+= '</div>';				
				}		
				
				$(ref.container).find('.pop-up').html(strPop);	
				// end
				$(ref.container).find('#thumbContainer').find('.figure-ctr').eq(0).find('div').css('display','none')
		
	
	}
	// function to add the Event on the objects
	ClickRevealTemplate.prototype.addFunctionality = function()
	{
		var ref = this;			
		$(ref.container).find('#thumbContainer').find('.figure-ctr').find('.figure-caption').on('click', openModalPopup);

		$(ref.container).find('#thumbContainer').find('.figure-ctr').find('.figure-caption').on('mouseover', mouseHover);

		$(ref.container).find('#thumbContainer').find('.figure-ctr').find('.figure-caption').on('mouseout', mouseOut);
		
			function mouseHover(){				
			
			if ($(this).prev().is(":visible")) {  //.next()is(":visible")
				return
			}			
			$(this).addClass("bgChange")
		}	
		
		function mouseOut(){
			$(this).removeClass("bgChange")

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
			$(this).parent().addClass('selected');
			$("#shellHeader").hide();				
			ref.globalThumb = $(this).parent();			
			$(".btnclose").on('click', closePopup);
			$('#modalwrapper').show();			
			ref.modalID = $(this).parent().attr('id').split('_')[1];
					
			var myid= parseInt(ref.modalID)+1;
			$('#disabled-click_'+ myid+'').hide();
			$('#disImg_'+ myid+'').hide();		
			$(ref.container).find('#modalwrapper').show();			
			$(ref.container).find('#modalwrapper').find("#mypopUpContent_" + ref.modalID).fadeIn("slow");
			$(ref.container).find('#modalwrapper').find("#mypopUpContent_" + ref.modalID).siblings('div.popContent').hide();		
			
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
	
	
	