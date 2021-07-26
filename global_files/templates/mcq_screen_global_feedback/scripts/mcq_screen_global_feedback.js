define([], function () {

	function McqTemplate() {
		this.xml = null;
		this.totalOptions = 4;
		this.correctOption;
		this.selectedOption = 0;
		this.container = null;
		this.attempts = 0;
		this.totalAttempts;
		this.xmlName;
		window.isNextDisabled=false
		
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
					ref.correctOption = parseInt($(ref.xml).find('options').attr('answer'));
					ref.totalAttempts = parseInt($(ref.xml).find('options').attr('attempts'));
					//alert(ref.totalAttempts)
					//alert("type of " + typeof ref.correctOption + " ---- " + ref.correctOption)
					//alert(ref.xml)
					ref.createOptions();
					ref.createFeedbacks();	

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
		
	
	
		
		
		//ref.LoadXml(xmlName);
		
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
				ref.correctOption = parseInt($(ref.xml).find('options').attr('answer'));
				ref.totalAttempts = parseInt($(ref.xml).find('options').attr('attempts'));
				//alert(ref.totalAttempts)
				//alert("type of " + typeof ref.correctOption + " ---- " + ref.correctOption)
				//alert(ref.xml)
				ref.createOptions();
				ref.createFeedbacks();				
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
		
	}
	
	$(ref.container).find(".popup-bg").find('.feedback-body').html(str);
	

	}
	
	
	
	// Function to create option like redio button no of radio button is created
	McqTemplate.prototype.createOptions = function () {
		
				var ref = this;
				var optionLength = $(ref.xml).find('options').find('option').length;
				var questionText = $(ref.xml).find('questionText').text();


				
				var backgroundImage = $(ref.xml).find('backgroundImage').text();
				$(ref.container).find("#mcq1 .wrapper-container-mcq").css('background-image', 'url(' + backgroundImage + ')');
				var questionNo = $(ref.xml).find('questionNo').text();
				var instructionText = $(ref.xml).find('instructionText').text();
				//alert("option length are " + optionLength)
				$('.mcq_attempt_one').find('.sectionHeader').html(questionNo);
				$('.mcq_attempt_one').find('#qText').html(questionText);
				$('.mcq_attempt_one').find('#instruction_text').html(instructionText);
				var str = '';
				str += '<ul class="cyu-options list-unstyled  cyu-options">';
				//alert(optionLength)
				for(var i=0; i<optionLength; i++){
					str += '<li  id="opt_' + (i+1) +'" class="_item p-3 cyu-option" data-index="' + (i+1) +'">'
					str +=	'<div class="row optionClick">';
					str += '<div class="circle_contianer">';
					str += '<label class="circle"></label>';
					str += '</div>'
					str += '<span class="option_contianer"><span class="option_span">' + $(ref.xml).find('options').find('option').eq(i).text(); + '</span></span>';
					str += '</div>';
					str += '</li>';
				
				}
				str += '<div class="clearfix"></div>';
				str +=	'<li class="mt-3 text-left">';
				str += '<div  class="btn btn-info cyu-submit-btn disabled">Submit<span class="startButton_icon">&nbsp;&#8250;</span></div>';
				str += '</li>';
				str += '</ul>';
				//alert(ref.xmlName)
				//alert($(ref.container))
				$(ref.container).find('#cyu_block_one').html(str);
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
	
	// Function to add functionlity in option's and sumbit button enable or disabled when we select the option
	McqTemplate.prototype.addFunctionality = function () {
	var ref = this;

		//$(".btnNext").addClass("disabled");
		$(ref.container).find(".option_span").click(function(){
			
			if($(this).hasClass('cyuDisabled')){
			return;
			}
			
			
			$(this).closest(".cyu-option").addClass('selected');
			$(this).closest(".cyu-option").siblings('li').removeClass('selected');
			$(ref.container).find(".cyu-submit-btn").removeClass("disabled");
			ref.selectedOption = parseInt($(this).closest(".cyu-option").attr("data-index"),10);
			//alert("selected option are " + ref.selectedOption)	
			
		});

		$(ref.container).find(".circle_contianer").click(function(){
			
			if($(this).hasClass('cyuDisabled')){
			return;
			}
			
			
			$(this).closest(".cyu-option").addClass('selected');
			$(this).closest(".cyu-option").siblings('li').removeClass('selected');
			$(ref.container).find(".cyu-submit-btn").removeClass("disabled");
			ref.selectedOption = parseInt($(this).closest(".cyu-option").attr("data-index"),10);
			//alert("selected option are " + ref.selectedOption)	
			
		});
		
		
		
	
		
		
		
// Event for submit button functionality 
		$(ref.container).find(".cyu-submit-btn").on('click', function(){
			
			if($(this).hasClass('disabled')){
				return;
				}
				if (isLocalfileOrServer!=true) {
					window.shell.checkhostReachable()    
					if(onLineFlag=="offline"){
						return;
					}
				}
				
			//var incorrectFeedback = $(ref.xml).find('mcq').find('FeedbackContentBlocks').find('OptionFeedback').eq(ref.selectedOption-1).text();
			
			//alert(ref.selectedOption + " ---- " + ref.correctOption)
			if(ref.selectedOption == ref.correctOption){
				//$('.cyu-option:nth("'+(ref.correctOption - 1)+'")').find(".circle").hide()
				//$('.cyu-option:nth("'+(ref.correctOption  - 1)+'")').find(".circle_contianer").append("<img src='assests/images/icons/right_3.png' style='height:21px; width:21px;' />")
				

				$('.cyu-option').each(function(){
				   $(this).addClass('cyuDisabled');
				});
						
		
				$(this).addClass('disabled');
				$(ref.container).find(".popup-bg .feedback-body").find("#correct").show().addClass("feedback-option")		
				$(ref.container).find(".popup-bg").show()
				$("#shellHeader").hide()

				window.shell.updateVisitedPages(globalCurTopic, globalCurPage);
				
				setTimeout(function(){
					$(".nextItext").show();
				   }, 300);
				// $(".btnNext").css("pointer-events","all");
				// 	$(".btnNext").css("opacity","1");
				$(".btnNext").removeAttr("style")
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
			         //$(this).off('click');
			}
				else if(ref.attempts == ref.totalAttempts){
					
					//$('.cyu-option:nth("'+(ref.correctOption - 1)+'")').find(".circle").hide()
					//$('.cyu-option:nth("'+(ref.correctOption  - 1)+'")').find(".circle_contianer").append("<img src='assests/images/icons/right_3.png' style='height:21px; width:21px;' />")
					//$('.cyu-option:nth("'+(ref.selectedOption - 1)+'")').find(".circle").hide()
					//$('.cyu-option:nth("'+(ref.selectedOption  - 1)+'")').find(".circle_contianer").append("<img src='assests/images/icons/wrong_2.png' style='height:21px; width:21px;' />")
	
					$('.cyu-option').each(function(){
					$(this).addClass('cyuDisabled');
					});
							
			
					$(this).addClass('disabled');

					var selectOpt=ref.selectedOption-1
					
					$(ref.container).find(".popup-bg .feedback-body").find("#AttemptOver").show().addClass("feedback-option")	
				    $(ref.container).find(".popup-bg").show()
					
					$("#shellHeader").hide()
	
					window.shell.updateVisitedPages(globalCurTopic, globalCurPage);
					
					// $(".btnNext").css("pointer-events","all");
					// 	$(".btnNext").css("opacity","1");
						$(".btnNext").removeAttr("style")
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
				ref.attempts++;
				// $('.cyu-option:nth("'+(ref.correctOption - 1)+'")').find(".circle").hide()
				// 	$('.cyu-option:nth("'+(ref.correctOption  - 1)+'")').find(".circle_contianer").append("<img src='assests/images/icons/right_3.png' style='height:21px; width:21px;' />")
				// 	$('.cyu-option:nth("'+(ref.selectedOption - 1)+'")').find(".circle").hide()
				// 	$('.cyu-option:nth("'+(ref.selectedOption  - 1)+'")').find(".circle_contianer").append("<img src='assests/images/icons/wrong_2.png' style='height:21px; width:21px;' />")
	
					$('.cyu-option').each(function(){
						$(this).addClass('cyuDisabled');
					});
					$(this).addClass('disabled');
					//$(ref.container).find(".popup-bg .feedback-body").find("#inCorrect p").text(incorrectFeedback)
					
					$(ref.container).find(".popup-bg .feedback-body").find("#inCorrect").show().addClass("feedback-option")
					$(ref.container).find(".popup-bg").show()					
					$("#shellHeader").hide()										
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