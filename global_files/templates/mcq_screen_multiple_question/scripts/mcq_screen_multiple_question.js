define([], function () {

	function McqTemplate() {
		this.xml = null;
		this.totalOptions = 4;
		this.correctOption=[];
		this.selectedOption = 0;
		this.container = null;
		this.attempts = 0;
		this.totalAttempts;
		this.xmlName;
		window.isNextDisabled=false
		this.XMLAnswer=[];
		this.selectedOptionArray=[];
		this.QuestionNo;
		
	}

	McqTemplate.prototype = new Util();
	McqTemplate.prototype.constructor = McqTemplate;
	McqTemplate.prototype.init = function (xmlName) {
		//alert("init working")
		var ref = this;
		this.xmlName = xmlName; 
		ref.container = this.getPageContainer();
		
		if(isLocalfileOrServer==true){
			setTimeout(function() {
				landingPageContent=function(data){
					
					var parser = new DOMParser(); 
					xml = parser.parseFromString(data, 'text/xml')
					ref.xml = xml;
						
				ref.totalAttempts = parseInt($(ref.xml).find('questionBlock').attr('attempts'));
				//alert(ref.totalAttempts)
				//alert("type of " + typeof ref.correctOption + " ---- " + ref.correctOption)
				//alert(ref.xml)
				ref.createOptions();
				ref.createFeedbacks();
				ref.populateAnswer();
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
		$(ref.container).find(".close-btn").click(function(){
			

			if($(ref.container).find(".popup-bg .feedback-body").find(".feedback-option .continueBtn").hasClass("inCorrect")){
                ref.creatRetry()
			}
			else{
				$(ref.container).find(".popup-bg").hide();
				$("#shellHeader").show()
			}
			
			
		});		
		
	//	ref.LoadXml(xmlName);		
		//alert(this.container)
			
		
		$(".btnNext").css("pointer-events","none");
		$(".btnNext").css("opacity","0.5");

		this.pageLoaded();

		
	}
	/// Function To Load XML file and get data into XML
	McqTemplate.prototype.LoadXml = function (xmlNameRef) {
		
			//alert("pfa")
			var ref= this;
			$.ajax({
			type: "GET",
			url: "data/" + xmlNameRef + "/" + xmlNameRef+ ".xml",
			dataType: "xml",
			success: function(xml) {
			//alert(xml)
				ref.xml = xml;
				
				ref.totalAttempts = parseInt($(ref.xml).find('questionBlock').attr('attempts'));
				//alert(ref.totalAttempts)
				//alert("type of " + typeof ref.correctOption + " ---- " + ref.correctOption)
				//alert(ref.xml)
				ref.createOptions();
				ref.createFeedbacks();
				ref.populateAnswer();
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
	// Function to create feedback when the page is Load
	McqTemplate.prototype.createFeedbacks = function () {
		
	var ref = this;
	var feedbackLength = $(ref.xml).find('feedbacks').find('feedback').length;
	//alert("feedback length is " + feedbackLength)
	var str = '';
	
	for(var i=0; i<feedbackLength; i++){

		str+='<div id="'+$(ref.xml).find('feedbacks').find('feedback').eq(i).attr('type')+'" style="display:none">'		
		str+='<div class="rightDiv">';
		str+='<h2 >'+ $(ref.xml).find('feedbacks').find('feedback').eq(i).attr('headerText') + '</h2>';
		str+='<div class="leftDiv">';
	    str+='<img src='+$(ref.xml).find('feedbacks').find('feedback').eq(i).attr('icon')+ '>';
    	str+='</div>';
		str+='<p >'+ $(ref.xml).find('feedbacks').find('feedback').eq(i).text() +'</p>';
		str+='<div  class="continueBtn '+$(ref.xml).find('feedbacks').find('feedback').eq(i).attr('type')+'" >' + $(ref.xml).find('feedbacks').find('feedback').eq(i).attr('btnText') +'</div>';
	    str+='</div>';
	    str+='</div>';

		
		// str+= '<div class="CyufeedbackMainContainer' +  $(ref.xml).find('feedbacks').find('feedback').eq(i).attr('type') +'">';
		// str+= '<div class="CyufeedbackContent">';
		// str+= '<h2 id="correctInc">'+ $(ref.xml).find('feedbacks').find('feedback').eq(i).attr('headerText') + '</h2>';
		// str+= '<p id="feedback">'+ $(ref.xml).find('feedbacks').find('feedback').eq(i).text() +'</p>';
		// str += '<button type="button" class="btn btn-info cyu-tryagain mx-auto">' + $(ref.xml).find('feedbacks').find('feedback').eq(i).attr('btnText') +'</button>'
		// str += '</div></div>';
		
	}
	
	$(ref.container).find(".popup-bg").find('.feedback-body').html(str);
	

	}

	// collect option answer and add into a variable
	McqTemplate.prototype.populateAnswer = function() {
		
		var ref = this;
		var optionLength = $(ref.xml).find("questionBlock item").length;
		$.each($(ref.xml).find("questionBlock item"), function(k1,v1){

			var optionsLength = $(v1).find('options').find('option').length;
			for(var i=0;i<optionsLength;i++){
			
				if($(v1).find('options').find('option').eq(i).attr("answer")){
								ref.XMLAnswer.push(i + 1);
								console.log(ref.XMLAnswer);
							}
					 
			}

		})
		 
	
	}
	
	
	
	// Function to create option like redio button no of radio button is created
	McqTemplate.prototype.createOptions = function () {		
				var ref = this;
				var backgroundImage = $(ref.xml).find('backgroundImage').text();
    $(ref.container).find("#mcq3 .wrapper-container-mcq").css('background-image', 'url(' + backgroundImage + ')');

			   var noOfqestion=$(ref.xml).find("questionBlock item").length;
			   var str = '';
			   $.each($(ref.xml).find("questionBlock item"), function(k,v){
				
				ref.correctOption[k] = $(ref.xml).find('item').eq(k).find('options').attr('answer');
				
				
				var optionLength = $(v).find('options').find('option').length;
				if(k==0){
					str +='<div class="cyu-multiple-question active" data-id="'+ (k+1) +'">';
				}
				else{
					str +='<div class="cyu-multiple-question inactive" data-id="'+ (k+1) +'">';
				}
				
				str +='<div class="cyu-title">';
				str +='<div  class="sectionHeader">'+$(v).find('questionNo').text()+'</div>';
				str +='<h1  id="qText">'+$(v).find('questionText').text()+'</h1>';
				str +='<p  id="instruction_text" class="mcq_instruction">'+$(v).find('instructionText').text()+'</p>';
				str +='</div>';
				str +='<div id="cyu_block_two" class="cyuBlock_class">';
				str +='<ul class="cyu-options list-unstyled  cyu-options" id="opt_' + (k) +'">';

				for(var i=0; i<optionLength; i++){
					str += '<li  id="opt_' + (i+1) +'" class="_item p-3 cyu-option" data-index="' + (i+1) +'">'
					str +=	'<div class="row optionClick">';
					str += '<div class="circle_contianer">';
					str += '<label class="circle"></label>';
					str += '</div>'
					str += '<span class="option_contianer"><span class="option_span">' + $(v).find('options').find('option').eq(i).text(); + '</span></span>';
					str += '</div>';
					str += '</li>';
				}
				str +='</ul>';
				str +='</div>';
				str +='</div>';
			   })
				
				console.log(ref.correctOption)
				//alert(ref.xmlName)
				//alert($(ref.container))
				$(ref.container).find('.cyu-question-bind').html(str);
				ref.crouserFunctionality()
			    ref.addFunctionality();
	
	
	}

	// Function to when the attempt more then one
	McqTemplate.prototype.creatRetry=function(){
		
		var ref=this;
		$(ref.container).find(".popup-bg").hide()
		$("#shellHeader").show()

		$('.cyu-option:nth("'+(ref.correctOption - 1)+'")').find(".circle").show()
		$('.cyu-option:nth("'+(ref.selectedOption - 1)+'")').find(".circle").show()

		$('.cyu-option').each(function(k,v){
		$(v).find(".circle_contianer img").remove()
			$(this).removeClass('cyuDisabled');
		});
		$(ref.container).find(".popup-bg .feedback-body").find("#inCorrect").hide()
		$(ref.container).find(".cyu-submit-btn").removeClass('disabled');
		ref.createOptions()
	}
	


	McqTemplate.prototype.crouserFunctionality = function(){
		
		var ref = this;
		$(ref.container).find(".slider-container .block-control").addClass("disabled")

		$(ref.container).find(".slider-container .block-control").click(function(){

			if (isLocalfileOrServer!=true) {
				window.shell.checkhostReachable()    
				if(onLineFlag=="offline"){
					return;
				}
			}
			if($(this).hasClass("block-control-right")){
				ref.attempt=0;
				
				if(ref.QuestionNo==ref.correctOption.length-1)
				{
					$(ref.container).find(".slider-container .block-control").addClass("disabled")
					$('.cyu-option').each(function(){
					$(this).addClass('cyuDisabled');
				});	
				}
				else{
					$('.cyu-option').each(function(){
					$(this).removeClass('cyuDisabled');
				});	
				}
				$(this).closest(".arrow-container").find(".block-control-left").removeClass("disabled");
				$(this).closest(".cyu-container").find(".cyu-multiple-question").fadeOut()

				if($(this).closest(".cyu-container").find(".cyu-multiple-question").hasClass("active")){
					
					var currentId=$(this).closest(".cyu-container").find(".active").attr("data-id")
					var nextSlideId=$(this).closest(".cyu-container").find(".active").next().attr("data-id")
				
					if(nextSlideId==$(this).closest(".cyu-container").find(".cyu-multiple-question").length){
						$(this).addClass("disabled")
						

						$(this).closest(".cyu-container").find("[data-id='"+currentId+"']").removeClass("active").addClass("inactive");
						$(this).closest(".cyu-container").find("[data-id='"+nextSlideId+"']").removeClass("inactive").addClass("active").fadeIn();
					}
					else{
						$(this).removeClass("disabled")
						$(this).closest(".cyu-container").find("[data-id='"+currentId+"']").removeClass("active").addClass("inactive");
						$(this).closest(".cyu-container").find("[data-id='"+nextSlideId+"']").removeClass("inactive").addClass("active").fadeIn();
					}

				}
				
								
			}else{
				$(this).closest(".cyu-container").find(".cyu-multiple-question").fadeOut()

				if($(this).closest(".cyu-container").find(".cyu-multiple-question").hasClass("active")){
				
					
					var currentId=$(this).closest(".cyu-container").find(".active").attr("data-id")
					var prevSlide=$(this).closest(".cyu-container").find(".active").prev().attr("data-id")

					$(this).closest(".arrow-container").find(".block-control-right").removeClass("disabled")
					if(prevSlide==1){
						$(this).addClass("disabled")
						$(this).closest(".cyu-container").find("[data-id='"+currentId+"']").removeClass("active").addClass("inactive");
						$(this).closest(".cyu-container").find("[data-id='"+prevSlide+"']").removeClass("inactive").addClass("active").fadeIn();;	
					}else{
						$(this).removeClass("disabled")
						$(this).closest(".cyu-container").find("[data-id='"+currentId+"']").removeClass("active").addClass("inactive");
					   $(this).closest(".cyu-container").find("[data-id='"+prevSlide+"']").removeClass("inactive").addClass("active").fadeIn();;					
					}
					


				}
			}

			
			
			
		});
		
		
	}
	
	McqTemplate.prototype.addFunctionality = function () {
	var ref = this;

	//$(".btnNext").addClass("disabled");
		$(ref.container).find(".option_span").click(function(){
			
			if($(this).hasClass('cyuDisabled')){
			return;
			}

			if($(this).closest(".cyu-multiple-question").attr("data-id")==1){
				//$(ref.container).find(".block-control-right").removeClass("disabled")
			}

			
			ref.QuestionNo=  parseInt($(this).closest(".cyu-options").attr('id').split('_')[1]);
			
			$(this).closest(".cyu-option").addClass('selected');
			$(this).closest(".cyu-option").siblings('li').removeClass('selected');
			$(ref.container).find(".cyu-submit-btn").removeClass("disabled");
			ref.selectedOption = parseInt($(this).closest(".cyu-option").attr("data-index"),10);					
			ref.selectedOptionArray=[];
				
		});
		$(ref.container).find(".circle_contianer").click(function(){
			
			if($(this).hasClass('cyuDisabled')){
			return;
			}

			if($(this).closest(".cyu-multiple-question").attr("data-id")==1){
				//$(ref.container).find(".block-control-right").removeClass("disabled")
			}

			
			ref.QuestionNo=  parseInt($(this).closest(".cyu-options").attr('id').split('_')[1]);
			
			$(this).closest(".cyu-option").addClass('selected');
			$(this).closest(".cyu-option").siblings('li').removeClass('selected');
			$(ref.container).find(".cyu-submit-btn").removeClass("disabled");
			ref.selectedOption = parseInt($(this).closest(".cyu-option").attr("data-index"),10);					
			ref.selectedOptionArray=[];
				
		});

		$(ref.container).find(".cyu-submit-btn").on('click', function(){
			

			if (isLocalfileOrServer!=true) {
				window.shell.checkhostReachable()    
				if(onLineFlag=="offline"){
					return;
				}
			}
			if($(this).hasClass('disabled')){
				return;
				}
			
				$(ref.container).find(".block-control-right").removeClass("disabled")
				
			$('.cyu-option').each(function(){
					$(this).addClass('cyuDisabled');
				});	
			if(ref.QuestionNo==ref.correctOption.length-1)
				{
					$(ref.container).find(".slider-container .block-control-right").addClass("disabled")
					$('.cyu-option').each(function(){
					$(this).addClass('cyuDisabled');
					$(".btnNext").removeAttr("style")
					//alert("next")
					window.shell.updateVisitedPages(globalCurTopic, globalCurPage);
					
					
				});	
				}	
				
			
			if(ref.selectedOption == ref.correctOption[ref.QuestionNo]){								

					
				$(this).addClass('disabled');
				$(ref.container).find(".popup-bg .feedback-body").find("#correct").show().addClass("feedback-option")		
				$(ref.container).find(".popup-bg").show()
				$("#shellHeader").hide()
				$("#AttemptOver").hide()
				$("#inCorrect").hide()
				//window.shell.updateVisitedPages(globalCurTopic, globalCurPage);
				//window.shell.globalPageVisited[window.shell.curPage-1]=true;
				//setTimeout(function(){
					//$(".nextItext").show();
				  // }, 300);
				// $(".btnNext").css("pointer-events","all");
				// 	$(".btnNext").css("opacity","1");
				
				$(ref.container).find(".popup-bg .feedback-body").find('.correct').on('click', function(){
					if (isLocalfileOrServer!=true) {
						window.shell.checkhostReachable()    
						if(onLineFlag=="offline"){
							return;
						}
					}
						
						$(ref.container).find(".popup-bg").hide()
						
						
						$("#shellHeader").show()
						
						
					});
	
			} 
				else if(ref.attempts == ref.totalAttempts){	
					
					// $(ref.container).find('.cyu-option').attr('data-index',ref.XMLAnswer[0]).find('.lab_container').find(':checkbox').attr('checked', true);					
					// $('.cyu-option:nth("'+(ref.correctOption - 1)+'")').find(".circle").hide()
					// $('.cyu-option:nth("'+(ref.correctOption  - 1)+'")').find(".circle_contianer").append("<img src='assests/images/icons/right_3.png' style='height:21px; width:21px;' />")
					// $('.cyu-option:nth("'+(ref.selectedOption - 1)+'")').find(".circle").hide()
					// $('.cyu-option:nth("'+(ref.selectedOption  - 1)+'")').find(".circle_contianer").append("<img src='assests/images/icons/wrong_2.png' style='height:21px; width:21px;' />")
	
					$('.cyu-option').each(function(){
					//$(this).addClass('cyuDisabled');
					});
							
			
					$(this).addClass('disabled');
					
					//var selectOpt=ref.selectedOption-1
					
					$(ref.container).find(".popup-bg .feedback-body").find("#AttemptOver").show().addClass("feedback-option")	
				    $(ref.container).find(".popup-bg").show()
					
					$("#shellHeader").hide()
					$("#correct").hide()
	
					//window.shell.updateVisitedPages(globalCurTopic, globalCurPage);
					//window.shell.globalPageVisited[window.shell.curPage-1]=true;
					//setTimeout(function(){
						//$(".nextItext").show();
					  // }, 300);
					// $(".btnNext").css("pointer-events","all");
					// 	$(".btnNext").css("opacity","1");
					//$(".btnNext").removeAttr("style")
						$(ref.container).find(".popup-bg .feedback-body").find('.AttemptOver').on('click', function(){
							if (isLocalfileOrServer!=true) {
								window.shell.checkhostReachable()    
								if(onLineFlag=="offline"){
									return;
								}
							}
							$(ref.container).find(".popup-bg").hide()	
							$("#shellHeader").show()				
						});
				}
				else{
				
					//ref.attempts++;
					$("#correct").hide()
					$('.cyu-option').each(function(){
						//$(this).addClass('cyuDisabled');
					});
						$(this).addClass('disabled');
						$(ref.container).find(".popup-bg .feedback-body").find("#inCorrect p").text(incorrectFeedback)
						
						$(ref.container).find(".popup-bg .feedback-body").find("#inCorrect").show().addClass("feedback-option")
						$(ref.container).find(".popup-bg").show()	

						$(ref.container).find(".popup-bg .feedback-body").find('.inCorrect').on('click', function(){
							if (isLocalfileOrServer!=true) {
								window.shell.checkhostReachable()    
								if(onLineFlag=="offline"){
									return;
								}
							}
						ref.creatRetry()
					
					
					});
					
					
					
				}
		
		});
	
	}
	
	
	
	return McqTemplate;
});