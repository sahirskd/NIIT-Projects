define([], function () {

	function DropdownTemplate() {
		this.xml = null;
		this.totalOptions = 4;
		this.correctOption;
		this.selectedOption = 0;
		this.container = null;
		this.attempts = 0;
		this.totalAttempts;
		this.attempCheck = [];
		this.isAllAttempt = false;
		this.xmlName;
		window.isNextDisabled=false
		this.selectedOptionArray=[];
		this.XMLAnswer=[];
		this.userAnswer=[];	
		this.myanswer=["0","1","2"]
		
	}
	
	DropdownTemplate.prototype = new Util();
	DropdownTemplate.prototype.constructor = DropdownTemplate;
	DropdownTemplate.prototype.init = function (xmlName) {
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
					ref.correctOption = parseInt($(ref.xml).find('option').attr('answer'));
				ref.totalAttempts = parseInt($(ref.xml).find('questionBlocks').attr('attempts'));
				//function call for creating options
				ref.createOptions();
				//function call for populating xml answers
				ref.populateAnswer();
				ref.createfeedbackBlocks();				

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
			if (isLocalfileOrServer!=true) {
				window.shell.checkhostReachable()    
				if(onLineFlag=="offline"){
					return;
				}
			}
			if($(ref.container).find(".popup-bg .feedback-body").find(".feedback-option .continueBtn").hasClass("inCorrect")){
                ref.creatRetry()
			}
			else{
				$(ref.container).find(".popup-bg").hide();
				$("#shellHeader").show()
			}
			
			
		});
		
	
	
		
		// funtion call for loading xml file
		
		
			
		
		$(".btnNext").css("pointer-events","none");
		$(".btnNext").css("opacity","0.5");

		this.pageLoaded();

		
	}


	// function for loading xml file
	DropdownTemplate.prototype.LoadXml = function (xmlNameRef) {
		
			//alert("pfa")
			var ref= this;
			$.ajax({
			type: "GET",
			url: "data/" + xmlNameRef + "/" + xmlNameRef+ ".xml",
			dataType: "xml",
			success: function(xml) {
			//alert(xml)
				ref.xml = xml;
				ref.correctOption = parseInt($(ref.xml).find('option').attr('answer'));
				ref.totalAttempts = parseInt($(ref.xml).find('questionBlocks').attr('attempts'));
				//function call for creating options
				ref.createOptions();
				//function call for populating xml answers
				ref.populateAnswer();
				ref.createfeedbackBlocks();				
				

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


	//function for creating feedback block and its functionalities
	DropdownTemplate.prototype.createfeedbackBlocks = function () {
		
	var ref = this;
	
	var ref = this;
	var feedbackLength = $(ref.xml).find('feedbacks').find('feedback').length;
	var str = '';
	

	//loop for writing feedbacks
	for(var i=0; i<feedbackLength; i++){

		str+='<div id="'+$(ref.xml).find('feedbacks').find('feedback').eq(i).attr('type')+'" style="display:none">'
		
		str+='<div class="rightDiv">';
		str+='<h2 >'+ $(ref.xml).find('feedbacks').find('feedback').eq(i).attr('headerText') + '</h2>';
		str+='<div class="leftDiv">';
	    str+='<img src='+$(ref.xml).find('feedbacks').find('feedback').eq(i).attr('icon')+ '>';
    	str+='</div>';
		str+='<p >'+ $(ref.xml).find('feedbacks').find('feedback').eq(i).text() +'</p>';
		str+='<div   class="continueBtn '+$(ref.xml).find('feedbacks').find('feedback').eq(i).attr('type')+'" >' + $(ref.xml).find('feedbacks').find('feedback').eq(i).attr('btnText') +'</div>';
	    str+='</div>';
	    str+='</div>';
	}
	
	//putting string 'str' into feedback body
	$(ref.container).find(".popup-bg").find('.feedback-body').html(str);
	}



	//function for finding the right answers from the xml and pushing
	//into XMLAnswer array
	DropdownTemplate.prototype.populateAnswer = function() {
		
		var ref = this;
		

		$.each($(ref.xml).find('questionBlocks item'), function(k,v){

            $.each($(v).find("option"), function(k1,v1){
				if($(v1).attr("answer")){
					ref.XMLAnswer.push(k1 + 1);
					console.log(ref.XMLAnswer); 
				}
			})
		})
	}
	
	
	
	
	//function for creating options
	DropdownTemplate.prototype.createOptions = function () {
		
				var ref = this;
				var questionBlocks = $(ref.xml).find('questionBlocks').find('item').length;
				var questionText = $(ref.xml).find('questionText').text();
				var questionNo = $(ref.xml).find('questionNo').text();
				var instructionText = $(ref.xml).find('instructionText').text();

				var backgroundImage = $(ref.xml).find('backgroundImage').text();
				$(ref.container).find(".wrapper-container-dropdown-type1").css('background-image', 'url(' + backgroundImage + ')');


				//alert("option length are " + questionBlocks)
				$('.mcq_attempt_one').find('.sectionHeader').html(questionNo);
				$('.mcq_attempt_one').find('#qText').html(questionText);
				$('.mcq_attempt_one').find('#instruction_text').html(instructionText);
				//srting 'str' started containing elements
				var str = '';
				str += '<ul  class="cyu-options">';
				// loop for pulling values from xml into string 'str'
				// and for creating select button
				for(var i=0; i<questionBlocks; i++){
					ref.userAnswer[i]= 0
					ref.selectedOptionArray[i]=0
					str += '<li  id="opt_' + (i+1) +'" class="_item cyu-option" data-index="' + (i+1) +'">'
					str +=	'<span class="row d-flex flex-row">';
					str += '<span class="">' + $(ref.xml).find('item').find('subquestiontext').eq(i).text(); + '</span>';
					// str += $(ref.xml).find('item').find('subquestiontext').eq(i).text();
					str += '<span id="dynamic_'+ (i) +'">';
					str += '<select  class="selectBox">'
					str += '<option value="0">Select One</option>'
					
					
					//loop for the options inside selector button
					var optionBlocks = $(ref.xml).find('questionBlocks').find('item').eq(i).find('option').length;
					for (var j = 0; j < optionBlocks; j++) {

						var optText = $(ref.xml).find('questionBlocks').find('item').eq(i).find('option').eq(j).text();
	
						str += '<option value=' + (j + 1) + '>' + optText + '</option>'
						
						
	
					}
					ref.attempCheck[i] = -1;
					
					str += '</select>'
					str += '</span>'
					str += '</span>';
					str += '</li>';
				}
				
				
				str += '</ul>';
				str += '<div class="clearfix"></div>';
				str += '<div class="btn btn-info cyu-submit-btn disabled">Submit<span class="startButton_icon">&nbsp;&#8250;</span></div>';
				//alert(ref.xmlName)
				//alert($(ref.container))
				
				// click function for disabling the first option in the selector

				$(ref.container).find("div.row").click(function(){
					$(ref.container).find(".selectBox").find('option:first-child').attr("disabled", "disabled");

				})
				// putting the string 'str' containing all  the Elements into the cyu_block_one
				$(ref.container).find('#cyu_block_one').html(str);
				ref.addFunctionality();
			}
			

	// retry function 		
	DropdownTemplate.prototype.creatRetry=function()
	{				
		var ref=this;
		$(ref.container).find(".popup-bg").hide()
		$("#shellHeader").show()		 
		$(ref.container).find(".popup-bg .feedback-body").find("#inCorrect").hide()		
		ref.createOptions()		
		 $('.selectBox').prop('selectedIndex',0);
		 
	}
	
	// function for adding Functionality to the cyu_block
 	DropdownTemplate.prototype.addFunctionality = function () {
		var ref = this;		
	$(ref.container).find("select.selectBox").change(function(){
			
					
			// finding the selected option from the dropdown selector 
			var isCheckboxChecked = $(this).find("option").is(":selected");
			
			
			
			ref.selectedOption = parseInt($(this).find("option:selected").val(),10);			
			var no=$(this).parent().attr('id').split('_')[1]
			// condition if option is selected 
			 if(isCheckboxChecked)
			 {				
							
				ref.selectedOptionArray[no]=1
						 
			}
			else{
				 
				 ref.selectedOptionArray.splice( ref.selectedOptionArray.indexOf(ref.selectedOption) ,1);
			
			}
			
			// disabling the  submit button if all options are not selected
			
			
			if(ref.selectedOptionArray.join(',').indexOf(0)==-1){
				
				$(ref.container).find(".cyu-submit-btn").removeClass("disabled");
			}
			else{
				$(ref.container).find(".cyu-submit-btn").addClass("disabled");
			}
			
		});
		
		
		// hiding the container on clicking the back button 
	
		
		
		// functionalities after clicing submit button 
		$(ref.container).find(".cyu-submit-btn").on('click', function(){
			if (isLocalfileOrServer!=true) {
				window.shell.checkhostReachable()    
				if(onLineFlag=="offline"){
					return;
				}
			}
			
			// if the button is disabled 
			if($(this).hasClass('disabled')){
				return;
				}
				var XMLstrAns = ref.XMLAnswer.join(',');
				var UserStrAns = ref.userAnswer.join(',');
				console.log(XMLstrAns)
				console.log(UserStrAns)
				// show the feedback pop up 
				$(ref.container).find(".popup-bg").show()
				// diasabling the submit button 
				$(this).addClass('disabled')	
				// checking  if answers are equal to xml answers 
				if (XMLstrAns==UserStrAns) {
					$('.selectBox').addClass('disabled');
					$("#inCorrect").hide();
					$("#AttemptOver").hide();							
					$(ref.container).find(".popup-bg .feedback-body").find("#correct").show().addClass("feedback-option")	
					$(this).addClass('disabled');
					$(ref.container).find(".popup-bg .feedback-body").find("#correct").show().addClass("feedback-option")		
					
					$("#shellHeader").hide()
					// updating the visited page in the shell 
					window.shell.updateVisitedPages(globalCurTopic, globalCurPage);
					
					$(".btnNext").removeAttr("style")
					
					$(ref.container).find(".popup-bg .feedback-body").find('.correct').on('click', function(){
						if (isLocalfileOrServer!=true) {
							window.shell.checkhostReachable()    
							if(onLineFlag=="offline"){
								return;
							}
						}
						//hiding the pop up
						$(ref.container).find(".popup-bg").hide()
						$("#shellHeader").show()
					});	
					
					
				}
				// checking if the attempts are equal to the total attempts 
				else if(ref.attempts == ref.totalAttempts){
					// show the attampts over pop up 
					$(this).addClass('disabled');					
					$("#inCorrect").hide();
					$('.selectBox').addClass('disabled');
					$(ref.container).find(".popup-bg").show()								
					$(ref.container).find(".popup-bg .feedback-body").find("#AttemptOver").show().addClass("feedback-option")				   		
					$("#shellHeader").hide()
					window.shell.updateVisitedPages(globalCurTopic, globalCurPage);
					
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
						$(".btnNext").removeAttr("style")
				}
				else{
					
					ref.attempts++;
				
					$("#AttemptOver").hide();							 
					$("#inCorrect").show();					
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
				$(ref.container).find(".popup-bg").show()	
			
		
		});




		 
		 
		//  function will run on selector dropdown option change 
		 $('select.selectBox').on('change', function() {
			 // userAnswer.push(changedAnswer);
			 var optText = $(ref.xml).find('questionBlocks').find('item')
			 let changedAnswer = parseInt($(this).find(":selected").val());
			// alert($(this).parent().attr("id"))
			 var  id =$(this).parent().attr("id").split('_')[1]
			//  alert(id)
			// updating the user submitted array values 
			 ref.userAnswer[id]= changedAnswer;
				// alert(ref.userAnswer)
			});
			
		
		
	}
	
	
	
	return DropdownTemplate;
});