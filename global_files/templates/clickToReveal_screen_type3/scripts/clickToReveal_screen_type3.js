define([], function () {

	function ClickRevealTemplate() {
		this.xml = null;		
		this.container = null;		
		this.globalThumb;
		this.xmlName;
		window.isNextDisabled=false;
		this.allThumbVisited=[]			
		this.popupBgURL =[]	
		this.modalID;
		this.WidthHeightOfHotspotPopup = []		
		this.textpositionarray=[]
		this.mapTextReferenceArray=[]

		
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
		//alert(this.container)
		
		$(".btnNext").css("pointer-events","none");
		$(".btnNext").css("opacity","0.5");
		
		this.pageLoaded();	
	}
		
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
	
	ClickRevealTemplate.prototype.createThumb = function () // createThumb function for creating dynamic tabs 
	{	
				var ref = this;	
				var thumbLength = $(ref.xml).find("personal_info").find('HotspotContainer').find("node").length;				
				
				// var ostText=$(ref.xml).find("personal_info").find("PageContent").text()	
				// $(ref.container).find('#osText_hotspot').html(ostText);	
				
				var heading = $(ref.xml).find("personal_info").find("PageContent").find("heading").text()
				var instructionText = $(ref.xml).find("personal_info").find("PageContent").find("instructionText").text()
				var paragraph = $(ref.xml).find("personal_info").find("PageContent").find("paragraph").text()				
				$(ref.container).find('#osText_hotspot .page-title p').html(heading);
				$(ref.container).find('#osText_hotspot .page-body-text p').html(paragraph);
				$(ref.container).find('#osText_hotspot .instruction-text p').html(instructionText);
				
				
				
				var mapImageLength = $(ref.xml).find('HotspotContainer').find('hotspotContent').find('MapButtonContainer').find('mapImage').length;
				var str1= '';

				// console.log(mapImageLength)

				for(var p=0; p<mapImageLength; p++){
					ref.textpositionarray.push({})
				str1 += '<div id="para_'+p+'"><img src="' + $(ref.xml).find('MapButtonContainer').find('mapImage').eq(p).text() + '"></div>'
				ref.textpositionarray[p].top= $(ref.xml).find('MapButtonContainer').find('mapImage').eq(p).attr('top')
				ref.textpositionarray[p].left= $(ref.xml).find('MapButtonContainer').find('mapImage').eq(p).attr('left')
				ref.textpositionarray[p].width= $(ref.xml).find('personal_info').find('hotspotContent').find('mapImage').eq(p).attr('width')
				ref.textpositionarray[p].height= $(ref.xml).find('personal_info').find('hotspotContent').find('mapImage').eq(p).attr('height')
			}
			// console.log(str1)
			$(ref.container).find(".hotspot-content").html(str1);

			for(var p=0; p<mapImageLength; p++){
				$('#para_'+p+'').css('top',''+ref.textpositionarray[p].top)
				$('#para_'+p+'').css('left',''+ref.textpositionarray[p].left)
				$('#para_'+p+'').css('width',''+ref.textpositionarray[p].width)
			}




			
			// console.log(mapImageLength)
			var mapTextLength = $(ref.xml).find('HotspotContainer').find('hotspotContent').find('mapReferenceText').length;
			
				var str2= '<img src="'+ $(ref.xml).find('HotspotContainer').find('hotspotContent').find('imageBox').text() +'">';
				for(var p=0; p<mapTextLength; p++){
					ref.mapTextReferenceArray.push({})
				str2 += '<div id="mapText_'+p+'">' + $(ref.xml).find('hotspotContent').find('mapReferenceText').eq(p).text() + '</div>'
				ref.mapTextReferenceArray[p].top= $(ref.xml).find('hotspotContent').find('mapReferenceText').eq(p).attr('top')
				ref.mapTextReferenceArray[p].left= $(ref.xml).find('hotspotContent').find('mapReferenceText').eq(p).attr('left')
				ref.mapTextReferenceArray[p].width= $(ref.xml).find('hotspotContent').find('mapReferenceText').eq(p).attr('width')
				ref.mapTextReferenceArray[p].height= $(ref.xml).find('hotspotContent').find('mapReferenceText').find('mapImage').eq(p).attr('height')
			}
			console.log(str2)
			$(ref.container).find(".textContentBox").html(str2);


			for(var p=0; p<mapTextLength; p++){
				$('#mapText_'+p+'').css('top',''+ref.mapTextReferenceArray[p].top)
				$('#mapText_'+p+'').css('left',''+ref.mapTextReferenceArray[p].left)
				$('#mapText_'+p+'').css('width',''+ref.mapTextReferenceArray[p].width)
			}



				
				var HotspotContainerWidth=$(ref.xml).find("personal_info").find('HotspotContainer').attr('width')
				var HotspotContainerHeight=$(ref.xml).find("personal_info").find('HotspotContainer').attr('height')
				var xyPositionHotspot=[]
				
				
				var str = '';
				for(var i=0; i<thumbLength; i++){					
					xyPositionHotspot.push({});
					ref.allThumbVisited[i]=0
					str+= '<div class="img_tag" id="img_' + i + '">';			
					str+='<figure class="figure-ctr" id="personal_' + i + '" data-toggle="modal" data-target="#myModal" data-index="' + i + '">';
					
					str+='<img src="' + $(ref.xml).find("personal_info").find('HotspotContainer').find("node").eq(i).find('imageCurrent').text() +'" class="figure-img-2 img-fluid rounded" id="personal_x" alt="lights" >';		
					
					str+='<img class="svgIcon hide" src="' + $(ref.xml).find("personal_info").find('HotspotContainer').find("node").eq(i).find('imageVisited').text()+ '">'		
					str += '<figcaption class="figure-caption">' + $(ref.xml).find("personal_info").find('HotspotContainer').find("node").eq(i).find('hotspot').text()  + '</figcaption>';
					str+= '<div class="disabled-click" id="disabled-click_'+i+'"></div>';		
					str += '</figure>';
					
					str +='</div>'
					
					xyPositionHotspot[i][0]=$(ref.xml).find("personal_info").find('HotspotContainer').find("node").eq(i).attr('posX')
					xyPositionHotspot[i][1]=$(ref.xml).find("personal_info").find('HotspotContainer').find("node").eq(i).attr('posY')
				
								
				
					
				}		
				$(ref.container).find('#hopspotContainer').find('.hotspot_inside-ctr').html(str);			
				$('.hotspot-content').css({
					"width": ""+ HotspotContainerWidth +"px", 
					"height": ""+ HotspotContainerHeight +"px", 				
				})
				
				for(var i=0; i<thumbLength; i++){	
					console.log(xyPositionHotspot[i][0])
					$('#img_'+i+'').css('position','absolute')	
					$('#img_'+i+'').css('left',''+ xyPositionHotspot[i][0] +'px')
					$('#img_'+i+'').css('top',''+ xyPositionHotspot[i][1] +'px')
					
				}
				
	}
	
	ClickRevealTemplate.prototype.createThumbPopUp = function()	//createThumbPopUp function..........
	{				
				var ref = this;
				var boolValue = true;
				var xyPositionHotspotPopup=[]
				var popClosBtnPosition=[]
				var popupLength = $(ref.xml).find("personal_info").find("popup_container").length;				
				var strPop = '';		
				
				for(var i=0; i<popupLength; i++){
					xyPositionHotspotPopup.push({});
					ref.WidthHeightOfHotspotPopup.push({});
					popClosBtnPosition.push({});
				strPop += '<div class="hotspotpopContent" id="mypopUpContent01_' + i +'">';
				strPop+= '<span class="btnclose" id="popUpClose_' + i +'"><img src="global_files/templates/clickToReveal_screen_type1/images/close.png"></span>';
				strPop+='<div class="popContent-inner">'
				strPop+= '<div class="modal-header-custom">';
				
				strPop+= '<div class="modal-body-custom"> '+$(ref.xml).find("personal_info").find('popup_container').eq(i).find("para_content").text() + '</div>';
				
				
				strPop+= '</div>';
				strPop+= '</div>';
				strPop+= '<div class="close-instrution">'+$(ref.xml).find("personal_info").find('instruction_close').find("para_content").text() +'</div>';
				strPop+= '</div>';	

				    xyPositionHotspotPopup[i][0]=$(ref.xml).find("personal_info").find("popup_container").eq(i).attr('posX')
					xyPositionHotspotPopup[i][1]=$(ref.xml).find("personal_info").find("popup_container").eq(i).attr('posY')	
					ref.WidthHeightOfHotspotPopup[i][0]=$(ref.xml).find("personal_info").find("popup_container").eq(i).attr('width')
					ref.WidthHeightOfHotspotPopup[i][1]=$(ref.xml).find("personal_info").find("popup_container").eq(i).attr('height')	
					ref.popupBgURL[i]=$(ref.xml).find("personal_info").find("popup_container").eq(i).find('popupBgImage').text()
					
					popClosBtnPosition[i][0]=$(ref.xml).find("personal_info").find("popup_container").eq(i).find('closeBtnPos').attr('posX')
					popClosBtnPosition[i][1]=$(ref.xml).find("personal_info").find("popup_container").eq(i).find('closeBtnPos').attr('posY')
					
				}

				
				
				$(ref.container).find('.pop-up').html(strPop);		
				for(var i=0; i<popupLength; i++){	
					
					$('.hotspotpopContent').css('position','absolute')	
					$('#mypopUpContent01_'+i+'').css('left',''+ xyPositionHotspotPopup[i][0] +'px')
					$('#mypopUpContent01_'+i+'').css('top',''+ xyPositionHotspotPopup[i][1] +'px')
					
					$('#mypopUpContent01_'+i+'').find('.btnclose').css('right',''+ popClosBtnPosition[i][0] +'px')
					$('#mypopUpContent01_'+i+'').find('.btnclose').css('top',''+ popClosBtnPosition[i][1] +'px')
					
				}
				
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
	
	ClickRevealTemplate.prototype.addFunctionality=function()
	{
		var ref = this;			
		$(ref.container).find('#hopspotContainer').find('.figure-ctr').eq(0).find('div').css('display','none')
		$(ref.container).find('#hopspotContainer').find('.figure-ctr').find('.figure-caption').prop('disabled',true);
		$(ref.container).find('#hopspotContainer').find('.figure-ctr').on('click', openModalPopup);
		
		// function call after visited to all clicks tab
		function enableNext(arg)
		{
			ref.allThumbVisited[arg]=1									
			if(ref.allThumbVisited.join().indexOf(0)==-1)
			{						
				
				$(".btnNext").removeAttr("style");
				window.shell.updateVisitedPages(globalCurTopic, globalCurPage);
				

			}
		}
		// function to close the ThumbpopUP
		function closePopup(){
			if (isLocalfileOrServer!=true) {
				window.shell.checkhostReachable()    
				if(onLineFlag=="offline"){
					return;
				}
			}
			$('#modalwrapper').hide();
			$("#shellHeader").show();	
			$('.figure-ctr').show()
			$(".btnclose").off('click');			
			$(ref.globalThumb).find('.svgIcon').show();	
			$(ref.globalThumb).find('.figure-img').hide();			
			$(ref.container).find('.modal-dialog').find('.modal-content').find('.modal-body').find('div').getNiceScroll().hide();	
			enableNext(ref.modalID)		
		}
		//function to open the ThumbpopUP
		function openModalPopup()
		{	
			if (isLocalfileOrServer!=true) {
				window.shell.checkhostReachable()    
				if(onLineFlag=="offline"){
					return;
				}
			}
			$('.figure-ctr').hide()
			$(this).parent().addClass('selected');						
			ref.globalThumb = $(this).parent();			
			$(".btnclose").on('click', closePopup);
			$('#modalwrapper').show();				
			$(ref.globalThumb).find('.svgIcon').show();	
			ref.modalID = $(this).parent().attr('id').split('_')[1];
			
			
			var myid= parseInt(ref.modalID)+1;
			$('#disabled-click_'+ myid+'').hide();
			$('#disImg_'+ myid+'').hide();		
			$(ref.container).find('#modalwrapper').show();			
			$(ref.container).find('#modalwrapper').find("#mypopUpContent01_" + ref.modalID).fadeIn("slow");
			$(ref.container).find('#modalwrapper').find("#mypopUpContent01_" + ref.modalID).siblings('div.hotspotpopContent').hide();
			
			$(ref.container).find('#modalwrapper').find('.hotspotpopContent').css( 'background','url('+ref.popupBgURL[ref.modalID]+')no-repeat 100% 100%')
			
			$(ref.container).find('#modalwrapper').find('.hotspotpopContent').css({ "width":""+ref.WidthHeightOfHotspotPopup[ref.modalID][0]+"px","height":""+ref.WidthHeightOfHotspotPopup[ref.modalID][1]+"px"	})
			//alert($(ref.container).find('.figure').length + " :::: " + $(ref.container).find('.selected').length)
			
			setTimeout(function(){
				$(ref.container).find('.modal-dialog').find('.modal-content').find('.modal-body').find('div').getNiceScroll().show();				
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
	
		return ClickRevealTemplate;	
});
	
	


	
	
	