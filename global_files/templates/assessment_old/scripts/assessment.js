define([], function () {

	var noOfquestionShow = [];
	var questionShowInaQuize = [];
	var userInteractiionData = [];
	function CyuMixTemplate() {
		this.xml = null;
		this.totalOptions = 4;
		this.correctOption;
		this.selectedOption = 0;
		this.container = null;
		this.attempts = 0;
		this.totalAttempts;
		this.xmlName;
		this.questionCount = 0;
		this.XMLAnswer = [];
		this.selectedOptionArray = [];
		this.partialAnswer = [];
		this.token = 0
		this.score = 0;
		this.isCorrect;
		this.totalNoQuestionarr = [];
		this.rendomquestionNo;
		this.showQuestion;



	}

	CyuMixTemplate.prototype = new Util();
	CyuMixTemplate.prototype.constructor = CyuMixTemplate;
	CyuMixTemplate.prototype.init = function (xmlName) {
		
		
		var ref = this;
		this.xmlName = xmlName;
		ref.container = this.getPageContainer();


		if(isLocalfileOrServer==true){ 
			setTimeout(function() {
				landingPageContent=function(data){
					
					var parser = new DOMParser(); 
					xml = parser.parseFromString(data, 'text/xml')
					
					ref.xml = xml;

				ref.totalAttempts = parseInt($(ref.xml).find('options').attr('attempts'));
				ref.showQuestion = parseInt($(ref.xml).find("showQuestion").text())
				//ref.isPrevBtn = $(ref.xml).find('PreviousBtn').attr('required').toLowerCase() === "yes";
				ref.prevBtnTxt = $(ref.xml).find('PreviousBtn').text();
				ref.totalQuestion = $(ref.xml).find('cyuBlocks').length;
				for (var i = 0; i < ref.totalQuestion; i++) {
					noOfquestionShow.push(i)
				}
				noOfquestionShow.sort(function () { return (Math.random() > .5) ? 1 : -1 })
				questionShowInaQuize = noOfquestionShow.slice(0, ref.showQuestion)
				//alert("no of question"+ noOfquestionShow)
				ref.startPageContent()
				//ref.McqCreateOptions();								
				//ref.MMcqCreateOptions();
				ref.rendomValue();

				//ref.loadCoachingContent();
				//ref.populateAnswer();
				ref.templateTypeDeclaration();
				ref.accessiblitydata()
				ref.startScreen();

				ref.assessmentResultData();

				if ($(ref.xml).find('transcript').length > 0) {
					var transcriptText = $(ref.xml).find('transcript').text();
					$('#contentTab_2').html(transcriptText)
				}

				if ($(ref.xml).find('resources').length > 0) {
					var resourcesText = $(ref.xml).find('resources').text();
					$('#contentTab_1').html(resourcesText)
				}

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
		$(".btnNext").css("pointer-events","none");
		$(".btnNext").css("opacity","0.5");
		//ref.LoadXml(xmlName);

		
	}

	CyuMixTemplate.prototype.LoadXml = function (xmlNameRef) {

		//alert("pfa")
		var ref = this;
		$.ajax({
			type: "GET",
			url: "data/" + xmlNameRef + "/" + xmlNameRef + ".xml",
			dataType: "xml",
			success: function (xml) {

				//alert(xml)
				ref.xml = xml;

				ref.totalAttempts = parseInt($(ref.xml).find('options').attr('attempts'));
				ref.showQuestion = parseInt($(ref.xml).find("showQuestion").text())
				ref.isPrevBtn = $(ref.xml).find('PreviousBtn').attr('required').toLowerCase() === "yes";
				ref.prevBtnTxt = $(ref.xml).find('PreviousBtn').text();
				ref.totalQuestion = $(ref.xml).find('cyuBlocks').length;


				for (var i = 0; i < ref.totalQuestion; i++) {
					noOfquestionShow.push(i)
				}

				noOfquestionShow.sort(function () { return (Math.random() > .5) ? 1 : -1 })
				questionShowInaQuize = noOfquestionShow.slice(0, ref.showQuestion)
				//alert("no of question"+ noOfquestionShow)
				ref.startPageContent()
				//ref.McqCreateOptions();								
				//ref.MMcqCreateOptions();
				ref.rendomValue();
				ref.accessiblitydata()
				//ref.loadCoachingContent();
				//ref.populateAnswer();
				ref.templateTypeDeclaration();
				ref.startScreen();

				ref.assessmentResultData();

				if ($(ref.xml).find('transcript').length > 0) {
					var transcriptText = $(ref.xml).find('transcript').text();
					$('#contentTab_2').html(transcriptText)
				}

				if ($(ref.xml).find('resources').length > 0) {
					var resourcesText = $(ref.xml).find('resources').text();
					$('#contentTab_1').html(resourcesText)
				}
			}

		});
	}

	CyuMixTemplate.prototype.rendomValue = function () {

		var ref = this;
		rendomquestionNo = Math.floor(Math.random() * questionShowInaQuize.length);

		ref.checkIsQuestionAttempt()
	}

	CyuMixTemplate.prototype.checkIsQuestionAttempt = function () {
		var ref = this;
		if (ref.totalNoQuestionarr.length != 0) {
			for (var i = 0; i < ref.totalNoQuestionarr.length; i++) {
				if (rendomquestionNo == ref.totalNoQuestionarr[i]) {
					ref.rendomValue();
				}
			}
		}
	}


	CyuMixTemplate.prototype.templateTypeDeclaration = function () {
		var ref = this;
		ref.checkIsQuestionAttempt()
		var templateType = $(ref.xml).find('mcq').find('cyuBlocks').eq(rendomquestionNo).attr('type');

		if (templateType == "mcq") {
			//alert(templateType);
			ref.McqCreateOptions();
			ref.createMcqFeedbacks();


		} else if (templateType == "mmcq") {
			//alert(templateType);
			ref.MMcqCreateOptions();
			//ref.populateAnswer();
			ref.createMMcqFeedbacks();
		}
	}

	CyuMixTemplate.prototype.populateAnswer = function () {
		var ref = this;
		var optionLength = $(ref.xml).find('cyuBlocks').eq(rendomquestionNo).find('options').find('option');
		for (var i = 0; i < optionLength.length; i++) {

			if ($(ref.xml).find('cyuBlocks').eq(rendomquestionNo).find('options').find('option').eq(i).attr("answer")) {
				ref.XMLAnswer.push(i);
				console.log(ref.XMLAnswer);
			}

		}
	}

	CyuMixTemplate.prototype.startPageContent = function () {
        
		var ref = this;
		var backgroundImgChage = $(this.xml).find("MainInstructionText").find("backgroundImage").text();
		var paraLength = $(ref.xml).find("MainInstructionText").find("para")
		var heading = $(ref.xml).find("MainInstructionText").find("heading").text()
		var subheading = $(ref.xml).find("MainInstructionText").find("subHead").text()
		var btn_content = $(ref.xml).find("MainInstructionText").find('buttonText').text()

		$(ref.container).find("#assessment .startscreen .heading").html(heading);
		$(ref.container).find("#assessment .startscreen .start").html(btn_content)
		$(ref.container).find("#assessment .startscreen .subhead").html(subheading)
		// console.log(backgroundImage)
		$(ref.container).find("#assessment .start-container").css('background-image', 'url(' + backgroundImgChage + ')');
		var str = '';
		$.each(paraLength, function (k, v) {
			str += $(v).text()
		})
		$(ref.container).find("#assessment .startscreen .teraf-body-container").html(str);
	}

	CyuMixTemplate.prototype.accessiblitydata = function () {
      

	}
	CyuMixTemplate.prototype.startScreen = function () {
         
		var ref = this;
		$(ref.container).find('#start_screen').show();
		$(ref.container).find('#mainMCQ').hide();
		$(ref.container).find('#start-test').on('click', function (e) {
	    //window.shell.userInteractionDataSet("imran",1,"","choice","1","","1","wrong","","abc")

			

			if (isLocalfileOrServer!=true) {
					window.shell.checkhostReachable()    
					if(onLineFlag=="offline"){
						return;
					}
				}

			if (window.scoreRaw >= 80) {
				$(ref.container).find(".score-screen-pass").show()
				$(ref.container).find("#start_screen").hide();


			var correctQuestion=window.scoreRaw*questionShowInaQuize.length/100
			$(ref.container).find('.score-screen-pass #totalNoOfQuestion').text(questionShowInaQuize.length)
			$(ref.container).find('.score-screen-pass #correctPersentage, #percentage').text(window.scoreRaw + "%")
			$(ref.container).find('.score-screen-pass #correctQuestion').text(correctQuestion)
			$(ref.container).find('.score-screen-pass #totalQuestion').text(correctQuestion + "/" + questionShowInaQuize.length)
			$(ref.container).find('.score-screen-pass .percent svg').find("circle:nth-child(2)").css("stroke-dashoffset", "calc(440 - (440 * " + (window.scoreRaw) + ")/100)")
			$(ref.container).find('#certificate').on('click', function (e) {
				if (isLocalfileOrServer!=true) {
					window.shell.checkhostReachable()    
					if(onLineFlag=="offline"){
						return;
					}
				}
				ref.certificateShow()
				
			});
                 
			} else {
				ref.questionCount = 0;
				ref.launchMCQ();
				ref.templateTypeDeclaration();
				//ref.populateAnswer();
				ref.createMMcqFeedbacks();
				ref.createMcqFeedbacks();
			}


		});
	}

	CyuMixTemplate.prototype.launchMCQ = function () {
		var ref = this;
		$(ref.container).find('section').addClass('cyu-screen-show');
		$(ref.container).find('#start_screen').hide();
		$(ref.container).find('#mainMCQ').show();
		// !ref.token && $(window).on('resize', ref.setCyuMinHeight.bind(ref));
		// ref.setCyuMinHeight();
	}

	// CyuMixTemplate.prototype.setCyuMinHeight = function () {
	// 	var ref = this;
	// 	setTimeout(function () {
	// 		var h = $(ref.container).width() * 0.561;
	// 		//console.log('%c' + h, 'font-size:24px;color:teal')
	// 		$(ref.container).find('.cyu-container').css('min-height', h + "px");
	// 	}, 0)
	// 	ref.token = 1;
	// }


	CyuMixTemplate.prototype.assessmentResultData = function () {
		
		var ref = this;

		//Result Page Data
		var certificatebtnTxt = $(ref.xml).find('mcq').find("scorePassbtnText").text()
		var retrybtnTxt = $(ref.xml).find('mcq').find("scoreFailbtnText").text()
		var scoreText = $(ref.xml).find('mcq').find('scoreText').text();
		var scorePassText = $(ref.xml).find('mcq').find('scorePassText').text();
		var scoreFailText = $(ref.xml).find('mcq').find('scoreFailText').text();

		var failBottomtxt = $(ref.xml).find('mcq').find("resultBottomText").find("failText");
		var passBottomtxt = $(ref.xml).find('mcq').find("resultBottomText").find("passText");
		$.each($('.cyu_with_context').find('.score-screen-pass .bottomtxt'), function (k, v) {
			$(v).html(passBottomtxt.find("node").eq(k).text())
		})
		$.each($('.cyu_with_context').find('.score-screen-fail .bottomtxt'), function (k1, v1) {
			$(v1).html(failBottomtxt.find("node").eq(k1).text())
		})

		$('.cyu_with_context').find(".score-screen").find('.heading h4').html(scoreText);
		$('.cyu_with_context').find('.score-screen-pass .paragraph').html(scorePassText);
		$('.cyu_with_context').find('.score-screen-fail .paragraph').html(scoreFailText);
		$('.cyu_with_context').find('.score-screen-fail .retake-assesment').html(retrybtnTxt)
		$('.cyu_with_context').find('.score-screen-pass .retake-assesment').html(certificatebtnTxt)


		// Result Page Data End

		//Certificate Page data

		var heading = $(ref.xml).find('mcq').find("certificateData").find("heading").text()
		var paragraphItem = $(ref.xml).find('mcq').find("certificateData").find("paraGraph").find("node")
		var certificateIcon = $(ref.xml).find('mcq').find("certificateData").find("icon").text();
		var certificateBtnTxt = $(ref.xml).find('mcq').find("certificateData").find("certificateBtnTxt").text();
		
		$('.cyu_with_context').find("#certificate-screen .heading").html(heading)
		$('.cyu_with_context').find("#certificate-screen .logo").attr("src", certificateIcon)
		$('.cyu_with_context').find("#certificate-screen #printBtn b").html(certificateBtnTxt)
		
		var current_date = new Date().toLocaleString('en-us',{month:'long', year:'numeric', day:'numeric'})
		$('.cyu_with_context').find("#certificate-screen .current_date").html(current_date)


		$('.cyu_with_context').find("#certificate-screen #printBtn").click(function (e){
			if (isLocalfileOrServer!=true) {
				window.shell.checkhostReachable()   
				if(onLineFlag=="offline"){
					return;
				}
			}
			$('body').css('visibility', 'hidden');
			$('#container').css('visibility', 'visible');
			$('#printBtn').css('visibility', 'hidden');
			window.print();
			$('body').css('visibility', 'visible');
			$('#printBtn').css('visibility', 'visible');
			})
		
		$('.cyu_with_context').find("#certificate-screen .pera").each(function(k,v){

			$(v).html(paragraphItem.eq(k).text());
		})
	}

	


	CyuMixTemplate.prototype.McqCreateOptions = function () {

		var ref = this;


		var questionBgChaange = $(ref.xml).find('mcq').find('cyuBlocks').eq(rendomquestionNo).find('backgroundImage').text();
		var optionLength = $(ref.xml).find('mcq').find('cyuBlocks').eq(rendomquestionNo).find('options').find('option').length;
		var questionText = $(ref.xml).find('mcq').find('cyuBlocks').eq(rendomquestionNo).find('questionText').text();
		//var mainInstText = $(ref.xml).find('mcq').find('MainInstructionText').text();

		var instructionText = $(ref.xml).find('mcq').find('cyuBlocks').eq(rendomquestionNo).find('instructionText').text();
		$(ref.container).find("#assessment #mainMCQ").css('background-image', 'url(' + questionBgChaange + ')');


		$('.cyu_with_context').find('.curr-ques').html(ref.questionCount + 1);
		$('.cyu_with_context').find('.total-ques').html(questionShowInaQuize.length);
		$('.cyu_with_context').find('#instruction_text').html(instructionText);
		$('.cyu_with_context').find('#qText').html(questionText);

		var str = '';
		str += '<ul aria-label="" tabindex="0" class="cyu-options list-unstyled cyu-options">';
		//alert(optionLength)
		for (var i = 0; i < optionLength; i++) {
			var optionContent = $(ref.xml).find('mcq').find('cyuBlocks').eq(rendomquestionNo).find('options').find('option').eq(i).text();

			str += '<li aria-label="" tabindex="0" class="_item">'
			str += '<label id="opt_' + (i + 1) + '" data-index="' + (i + 1) + '" class="option_contianer  cyu-option"><span class="circle_contianer"><i class="circle"></i></span>' + optionContent + '</label>';
			str += '</li>';
		}
		str += '</ul>';
		str += '<div class="text-left submit-btn-container">' + (ref.isPrevBtn && rendomquestionNo ? '<button class="btn btn-link  prev-btn"><i class="ion-ios-arrow-left"></i>' + ref.prevBtnTxt + '</button>' : '') + '<button aria-label="" tabindex="0" class="btn btn-info cyu-submit-btn disabled" role="button">Submit</button><div class="feedbackBox"></div></div>';
		// str += '</li>';
		//alert(ref.xmlName)
		//alert($(ref.container))
		$(ref.container).find('#cyu_block').html(str);
		ref.addMCQFunctionality();
	}



	CyuMixTemplate.prototype.MMcqCreateOptions = function () {

		var ref = this;

		var questionBgChaange = $(ref.xml).find('mcq').find('cyuBlocks').eq(rendomquestionNo).find('backgroundImage').text();

		var optionLength = $(ref.xml).find('mcq').find('cyuBlocks').eq(rendomquestionNo).find('options').find('option').length;
		var questionText = $(ref.xml).find('mcq').find('cyuBlocks').eq(rendomquestionNo).find('questionText').text();

		//var mainInstText = $(ref.xml).find('mcq').find('MainInstructionText').text();

		$(ref.container).find("#assessment #mainMCQ").css('background-image', 'url(' + questionBgChaange + ')');

		var instructionText = $(ref.xml).find('mcq').find('cyuBlocks').eq(rendomquestionNo).find('instructionText').text();

		//var QuestionLength = $(ref.xml).find('mcq').find('cyuBlocks').length;
		//alert("option length are " + optionLength)
		$('.cyu_with_context').find('.curr-ques').html(ref.questionCount + 1);

		$('.cyu_with_context').find('#qText').html(questionText);
		$('.cyu_with_context').find('#instruction_text').html(instructionText);
		var str = '';
		str += '<ul class="cyu-options list-unstyled  cyu-options">';

		for (var i = 0; i < optionLength; i++) {
			str += '<li  aria-label="" tabindex="0" id="opt_' + (i + 1) + '" class="_item cyu-option" data-index="' + (i) + '">'
			str += '<label class="lab_container">' + $(ref.xml).find('mcq').find('cyuBlocks').eq(rendomquestionNo).find('options').find('option').eq(i).text();
			str += '<input type="checkbox" id="chkBox">'
			str += '<span class="checkmark"></span>'
			str += '</label>'
			str += '</li>';
		}
		str += '<div class="clearfix"></div>';
		str += '</ul>';
		str += '<div class="text-left submit-btn-container">' + (ref.isPrevBtn && rendomquestionNo ? '<button class="btn btn-link  prev-btn"><i class="ion-ios-arrow-left"></i>' + ref.prevBtnTxt + '</button>' : '') + '<button aria-label="" tabindex="0" class="btn btn-info cyu-submit-btn disabled">Submit</button><div class="feedbackBox"></div></div>';

		$(ref.container).find('#cyu_block').html(str);
		ref.addMMCQFunctionality();

	}


	// MCQ Functionality add
	CyuMixTemplate.prototype.addMCQFunctionality = function () {
		var ref = this;

		$(ref.container).find(".cyu-options .cyu-option").click(function (e) {

			if (isLocalfileOrServer!=true) {
					window.shell.checkhostReachable()    
					if(onLineFlag=="offline"){
						return;
					}
				}
			var $this = e.currentTarget;
			if ($($this).hasClass('cyuDisabled')) {
				return;
			}

			$($this).closest('.cyu-options').find('.cyu-option').removeClass('selected');
			$($this).addClass('selected');
			$(ref.container).find(".cyu-submit-btn").removeClass("disabled");
			ref.selectedOption = parseInt($($this).attr("data-index"), 10);


		});






		$(ref.container).find(".prev-btn").off('click').on('click', ref.loadPrevCyu.bind(ref));

		$(ref.container).find(".cyu-submit-btn").on('click', function (e) {
       
			if (isLocalfileOrServer!=true) {
					window.shell.checkhostReachable()    
					if(onLineFlag=="offline"){
						return;
					}
				}

			$('.cyu-options').find("._item").each(function () {
				$(this).addClass('cyuDisabled');
			});

			


			window.shell.getEnableDisableNext();
			//window.shell.updateAssesmentProgress(ref.questionCount, ref.totalQuestion);
			if ($(this).hasClass('disabled')) {
				return;
			}
			$(this).addClass('disabled');
			var incorrectFeedback = $(ref.xml).find('mcq').find('cyuBlocks').eq(ref.questionCount).find('FeedbackContentBlocks').find('OptionFeedback').eq(ref.selectedOption - 1).text();
			var quesText=$(ref.xml).find('cyuBlocks').eq(rendomquestionNo).find("questionText").text();
			var topic = parseInt($(ref.xml).find('cyuBlocks').eq(rendomquestionNo).attr("topic-type"));
			var questioType = $(ref.xml).find('cyuBlocks').eq(rendomquestionNo).attr("type");
			ref.correctOption = parseInt($(ref.xml).find('cyuBlocks').eq(rendomquestionNo).find('options').attr('answer'));

		
			// Send User Interation data

			if(window.globalConfig.isScorm){
				var quesText=ref.removeSpaceFromContent(quesText)
				submitInteractionAssessment(quesText, ref.selectedOption, ref.correctOption, ref.selectedOption, "", ""); 
			}
	    	

			

			//alert(ref.selectedOption + " ---- " + ref.correctOption)
			if (ref.selectedOption == ref.correctOption) {
				ref.score++



				$(this).addClass('disabled');
				$(ref.container).find(".feedbackBox").find('.correct').show();
				$(ref.container).find(".feedbackBox").find('.correct').find('.cyu-tryagain').addClass('cyuContinue');

				//var QuestionLength = $(ref.xml).find('mcq').find('cyuBlocks').length;
				if (ref.questionCount == (questionShowInaQuize.length - 1)) {
					//alert(ref.score);
					$(ref.container).find('#start_screen').hide();
					//window.shell.updateVisitedPages(globalCurTopic, globalCurPage, ref.score);
					if ((ref.score / questionShowInaQuize.length).toFixed(2) >= 0.8) {
						window.shell.updateVisitedPages(globalCurTopic, globalCurPage, ref.score);
						window.shell.updateScore(((ref.score / questionShowInaQuize.length) * 100))
						window.shell.studentNameUpdate(window.shell.userName)
						window.shell.studentIdUpdate(window.shell.bankID)
						ref.showResult(true)
						$(ref.container).find('#certificate').on('click', function (e) {
							

							if (isLocalfileOrServer!=true) {
								window.shell.checkhostReachable()    
								if(onLineFlag=="offline"){
									return;
								}
							}
							
							ref.certificateShow()
						



							
							//window.shell.updateAssesmentProgress(-1, ref.totalQuestion);
						});

					} else {
						ref.showResult(false)

						$(ref.container).find('#retry').on('click', function (e) {

							if (isLocalfileOrServer!=true) {
								window.shell.checkhostReachable()    
								if(onLineFlag=="offline"){
									return;
								}
							}
							ref.score = 0;
							ref.totalNoQuestionarr = [];
							$(ref.container).find('#start_screen').show();
							$(ref.container).find('.score-screen-fail').hide();
							$(ref.container).find(".cyu-options .cyu-option").removeClass('selected');
							//window.shell.updateAssesmentProgress(-1, ref.totalQuestion);
						});
					}

					$(ref.container).find('.sc-value').html(((ref.score / questionShowInaQuize.length) * 100) + '%');
					$(ref.container).find('.cyu-container').hide();
					$(ref.container).find('.feedbackBox').hide();

					if (window.shell.getEnableDisableNext() == false) {
						//window.shell.updateVisitedPages(globalCurTopic, globalCurPage, ref.score);
						$(ref.container).find(".feedbackBox").find('.correct').find('.cyuContinue').hide();
					} else {
						$(ref.container).find(".feedbackBox").find('.correct').find('.cyuContinue').show();
					}
				}

				else {
					$(ref.container).find('.correctBtn').on('click', function (e) {
						if (isLocalfileOrServer!=true) {
							window.shell.checkhostReachable()    
							if(onLineFlag=="offline"){
								return;
							}
						}
						ref.loadNextCyu(e);

						// clickStream
					});

				}
				//	$(this).off('click');

			}
			else {
				//var QuestionLength = $(ref.xml).find('mcq').find('cyuBlocks').length;
				if (ref.questionCount == (questionShowInaQuize.length - 1)) {
					//alert(ref.score);
					$(ref.container).find('#start_screen').hide();
					//window.shell.updateVisitedPages(globalCurTopic, globalCurPage, ref.score);
					$(ref.container).find('.sc-value').html(((ref.score / questionShowInaQuize.length) * 100) + '%');
					$(ref.container).find('.cyu-container').hide();
					$(ref.container).find('.feedbackBox').hide();
					if ((ref.score / questionShowInaQuize.length).toFixed(2) >= 0.8) {
						ref.showResult(true)
						$(ref.container).find('#certificate').on('click', function (e) {
							

							if (isLocalfileOrServer!=true) {
								window.shell.checkhostReachable()    
								if(onLineFlag=="offline"){
									return;
								}
							}
							
							ref.certificateShow()
						



							
							//window.shell.updateAssesmentProgress(-1, ref.totalQuestion);
						});
					} else {

						// Function to show fail result
						ref.showResult(false)

						$(ref.container).find('#retry').on('click', function (e) {
							if (isLocalfileOrServer!=true) {
								window.shell.checkhostReachable()    
								if(onLineFlag=="offline"){
									return;
								}
							}
							ref.score = 0;
							ref.totalNoQuestionarr = [];
							$(ref.container).find('#start_screen').show();
							$(ref.container).find('.score-screen-fail').hide();
							$(ref.container).find(".cyu-options .cyu-option").removeClass('selected');
							//window.shell.updateAssesmentProgress(-1, ref.totalQuestion);
						});
					}

					if (window.shell.getEnableDisableNext() == false) {
						//window.shell.updateVisitedPages(globalCurTopic, globalCurPage, ref.score);
						$(ref.container).find(".feedbackBox").find('.correct').find('.cyuContinue').hide();
					} else {
						$(ref.container).find(".feedbackBox").find('.correct').find('.cyuContinue').show();
					}
				}

				else {
					$(ref.container).find(".feedbackBox").find('.inCorrect').show();
					$(ref.container).find(".feedbackBox").find('.inCorrect').find('#feedback').text(incorrectFeedback);
					$(ref.container).find('.incorrectBtn').on('click', function (e) {
						if (isLocalfileOrServer!=true) {
							window.shell.checkhostReachable()    
							if(onLineFlag=="offline"){
								return;
							}
						}
						ref.loadNextCyu(e);


					});
				}
			}

			// clickStream
			//window.shell.captureEvent(e, 'submitMCQ', {template: "CyuWithContextTemplate"})


		});

		ref.createMcqFeedbacks();

	}

	CyuMixTemplate.prototype.certificateShow =function(){
		
        var ref=this;
		$(ref.container).find('#start_screen').hide();
		$(ref.container).find('.score-screen-pass').hide();
		$(ref.container).find('.score-screen-fail').hide();
		$(ref.container).find('#assessment #certificate-screen').show();
		
		if(scoreRaw==0){
			scoreRaw=((ref.score / questionShowInaQuize.length) * 100)
		}else{
			scoreRaw=window.scoreRaw
		}

		$(ref.container).find('#assessment #certificate-screen').find("#certificateScore").text(scoreRaw + "%")

		console
		if(studentName==null || studentName==undefined ||studentName=="" || studentID==null || studentID==undefined || studentID==""){
			$(ref.container).find('#assessment #certificate-screen').find(".name").text(localStorage.getItem("user")) 
			$(ref.container).find('#assessment #certificate-screen').find(".roll-no").text(localStorage.getItem("bankId"))
		}
		else{
			$(ref.container).find('#assessment #certificate-screen').find(".name").text(studentName) 
			$(ref.container).find('#assessment #certificate-screen').find(".roll-no").text(studentID)
		}

	}

	CyuMixTemplate.prototype.showResult = function (bool) {        
		var ref = this;
		if (bool) {
			$(ref.container).find('.score-screen-pass').show();
			$(ref.container).find('.score-screen-fail').hide();
			$(ref.container).find('.score-screen-pass #correctQuestion').text(ref.score)
			$(ref.container).find('.score-screen-pass #totalNoOfQuestion').text(questionShowInaQuize.length)
			$(ref.container).find('.score-screen-pass #correctPersentage, #percentage').text(((ref.score / questionShowInaQuize.length) * 100) + "%")
			$(ref.container).find('.score-screen-pass #totalQuestion').text(ref.score + "/" + questionShowInaQuize.length)

			$(ref.container).find('.score-screen-pass .percent svg').find("circle:nth-child(2)").css("stroke-dashoffset", "calc(440 - (440 * " + ((ref.score / questionShowInaQuize.length) * 100) + ")/100)")
		} else {

			window.shell.updateScore(((ref.score / questionShowInaQuize.length) * 100))
			$(ref.container).find('.score-screen-fail').show();
			$(ref.container).find('.score-screen-pass').hide();
			$(ref.container).find('.score-screen-fail #correctQuestion').text(ref.score)
			$(ref.container).find('.score-screen-fail #totalNoOfQuestion').text(questionShowInaQuize.length)
			$(ref.container).find('.score-screen-fail #correctPersentage, #percentage').text(((ref.score / questionShowInaQuize.length) * 100) + "%")
			$(ref.container).find('.score-screen-fail #totalQuestion').text(ref.score + "/" + questionShowInaQuize.length)
			$(ref.container).find('.score-screen-fail .percent svg').find("circle:nth-child(2)").css("stroke-dashoffset", "calc(440 - (440 * " + ((ref.score / questionShowInaQuize.length) * 100) + ")/100)")
		}

	}

	

	// CyuMixTemplate.prototype.markQuestionStaus = function (queInx) {
	// 	var ref = this;

	// 	if(ref.questionArr[queInx]){
	// 		ref.questionArr[queInx].isAttemped = true;
	// 	}
	// }


	// MMCQ Functionality add
	CyuMixTemplate.prototype.addMMCQFunctionality = function (e) {

		var ref = this;

		$(ref.container).find(".cyu-options .cyu-option").find('#chkBox').on("change", function (e) {

			if (isLocalfileOrServer!=true) {
					window.shell.checkhostReachable()    
					if(onLineFlag=="offline"){
						return;
					}
				}
			if ($(this).hasClass('cyuDisabled')) {
				return;
			}
			//$(this).off('click');
			var isCheckboxChecked = $(this).is(":checked");
			//alert(isCheckboxChecked);
			$(ref.container).find(".cyu-submit-btn").removeClass("disabled");
			ref.selectedOption = parseInt($(this).parents('li').attr("data-index"), 10);

			if (isCheckboxChecked) {

				ref.selectedOptionArray.push(ref.selectedOption);
				//console.log(ref.selectedOptionArray);
			}
			else {
				ref.selectedOptionArray.splice(ref.selectedOptionArray.indexOf(ref.selectedOption), 1);
				// $(ref.container).find(".cyu-submit-btn").addClass("disabled");
				//console.log(ref.selectedOptionArray);
			}

			if (ref.selectedOptionArray.length == 0) {
				$(ref.container).find(".cyu-submit-btn").addClass("disabled");
			}
			else {
				$(ref.container).find(".cyu-submit-btn").removeClass("disabled");
			}

			// clickStream
			// var _dataObj = {
			// 	template: "CyuWithContextTemplate",
			// 	option:$(this).parents('li').data('index')
			// }
			// window.shell.captureEvent(e, 'mmcqOption', _dataObj)
		});




		$(ref.container).find(".prev-btn").off('click').on('click', ref.loadPrevCyu.bind(ref));

		$(ref.container).find(".cyu-submit-btn").on('click', function (e) {


			if (isLocalfileOrServer!=true) {
					window.shell.checkhostReachable()    
					if(onLineFlag=="offline"){
						return;
					}
				}
			window.shell.getEnableDisableNext();

			//window.shell.updateAssesmentProgress(ref.questionCount, ref.totalQuestion);
			if ($(this).hasClass('disabled')) {
				return;
			}

			$('.cyu-options').find("._item").each(function () {
				$(this).addClass('cyuDisabled');
			});
			$(this).addClass('disabled');
			var incorrectFeedback = $(ref.xml).find('mcq').find('cyuBlocks').eq(rendomquestionNo).find('FeedbackContentBlocks').find('OptionFeedback').eq(ref.selectedOption - 1).text();

			ref.selectedOptionArray.sort();

			ref.populateAnswer()



			for (var i = 0; i < ref.selectedOptionArray.length; i++) {
				var sel_value = ref.selectedOptionArray[i];
				for (var j = 0; j < ref.XMLAnswer.length; j++) {
					if (sel_value == ref.XMLAnswer[j]) {
						ref.partialAnswer.push(1);
					} else {
					}
				}
			}

			var quesText = $(ref.xml).find('cyuBlocks').eq(rendomquestionNo).find("questionText").text();
			var topic = parseInt($(ref.xml).find('cyuBlocks').eq(rendomquestionNo).attr("topic-type"));
			var questioType = $(ref.xml).find('cyuBlocks').eq(rendomquestionNo).attr("type");
			ref.correctOption = parseInt($(ref.xml).find('cyuBlocks').eq(rendomquestionNo).find('options').attr('answer'));

			// Send User Interation data	
			
			if(window.globalConfig.isScorm){
				var quesText=ref.removeSpaceFromContent(quesText)
				submitInteractionAssessment(quesText, encodeURI(ref.selectedOptionArray), encodeURI(ref.XMLAnswer), encodeURI(ref.selectedOptionArray), "", ""); 
			}

			//alert(ref.selectedOption + " ---- " + ref.correctOption)
			if (encodeURI(ref.selectedOptionArray) == encodeURI(ref.XMLAnswer)) {
				ref.score++;

				//alert("correct");
				// $('.cyu-option').each(function () {
				// 	$(this).addClass('cyuDisabled');
				// });


				$(ref.container).find(".feedbackBox").find('.correct').show();
				$(ref.container).find(".feedbackBox").find('.correct').find('.cyu-tryagain').addClass('cyuContinue');
				$(ref.container).find(".feedbackBox").find('.correct').find('.cyuContinue').show();

				//var QuestionLength = $(ref.xml).find('mcq').find('cyuBlocks').length;
				if (ref.questionCount == (questionShowInaQuize.length - 1)) {
					//alert(ref.score);
					$(ref.container).find('#start_screen').hide();
					//window.shell.updateVisitedPages(globalCurTopic, globalCurPage, ref.score);
					$(ref.container).find('.sc-value').html(((ref.score / questionShowInaQuize.length) * 100) + '%');
					$(ref.container).find('.cyu-container').hide();
					$(ref.container).find('.feedbackBox').hide();
					if ((ref.score / questionShowInaQuize.length).toFixed(2) >= 0.8) {
						window.shell.updateVisitedPages(globalCurTopic, globalCurPage, ref.score);
						window.shell.updateScore(((ref.score / questionShowInaQuize.length) * 100))

						window.shell.studentNameUpdate(window.shell.userName)
						window.shell.studentIdUpdate(window.shell.bankID)

						ref.showResult(true)

						$(ref.container).find('#certificate').on('click', function (e) {
							

							if (isLocalfileOrServer!=true) {
								window.shell.checkhostReachable()    
								if(onLineFlag=="offline"){
									return;
								}
							}
							
							ref.certificateShow()
						



							
							//window.shell.updateAssesmentProgress(-1, ref.totalQuestion);
						});

					} else {
						ref.showResult(false)
						$(ref.container).find('#retry').on('click', function (e) {

							if (isLocalfileOrServer!=true) {
								window.shell.checkhostReachable()    
								if(onLineFlag=="offline"){
									return;
								}
							}
							ref.score = 0;
							ref.totalNoQuestionarr = [];
							$(ref.container).find('#start_screen').show();
							$(ref.container).find('.score-screen-fail').hide();
							$(ref.container).find(".cyu-options .cyu-option").removeClass('selected');
							//window.shell.updateAssesmentProgress(-1, ref.totalQuestion);
						});
					}

					if (window.shell.getEnableDisableNext() == false) {
						//window.shell.updateVisitedPages(globalCurTopic, globalCurPage, ref.score);
						$(ref.container).find(".feedbackBox").find('.correct').find('.cyuContinue').hide();
					} else {
						$(ref.container).find(".feedbackBox").find('.correct').find('.cyuContinue').show();
					}
				}
				else {
					$(ref.container).find('.correctBtn').on('click', function (e) {
						ref.loadNextCyu(e);
						$(ref.container).find(".cyu-submit-btn").addClass("disabled");
						$(ref.container).find(".feedbackBox").find('.inCorrect').hide();
						$(ref.container).find(".cyu-options .cyu-option").removeClass('selected');
						ref.selectedOptionArray = [];
						$(ref.container).find(".cyu-options .cyu-option").find('#chkBox').prop('checked', false);
					});
				}

				// $(ref.container).find(".feedbackBox").find('.correct').find('.cyuContinue').on('click', function (e) {
				// 	ref.loadNextCyu(e);
				// });

			}
			else {
				//var QuestionLength = $(ref.xml).find('mcq').find('cyuBlocks').length;
				if (ref.questionCount == (questionShowInaQuize.length - 1)) {
					//alert(ref.score);
					$(ref.container).find('#start_screen').hide();
					//window.shell.updateVisitedPages(globalCurTopic, globalCurPage, ref.score);
					$(ref.container).find('.sc-value').html(((ref.score / questionShowInaQuize.length) * 100) + '%');
					$(ref.container).find('.cyu-container').hide();
					$(ref.container).find('.feedbackBox').hide();
					if ((ref.score / questionShowInaQuize.length).toFixed(2) >= 0.8) {
						window.shell.updateVisitedPages(globalCurTopic, globalCurPage, ref.score);
						window.shell.updateScore(((ref.score / questionShowInaQuize.length) * 100))

						window.shell.studentNameUpdate(window.shell.userName)
						window.shell.studentIdUpdate(window.shell.bankID)
						ref.showResult(true)


						$(ref.container).find('#certificate').on('click', function (e) {
							

							if (isLocalfileOrServer!=true) {
								window.shell.checkhostReachable()    
								if(onLineFlag=="offline"){
									return;
								}
							}
							
							ref.certificateShow()
						



							
							//window.shell.updateAssesmentProgress(-1, ref.totalQuestion);
						});
					} else {
						ref.showResult(false)

						$(ref.container).find('#retry').on('click', function (e) {
							window.shell.checkhostReachable();
							if (onLineFlag != "online") {
								return
							}
							ref.score = 0;
							ref.totalNoQuestionarr = [];

							$(ref.container).find('#start_screen').show();
							$(ref.container).find('.score-screen-fail').hide();
							$(ref.container).find(".cyu-options .cyu-option").removeClass('selected');
							//window.shell.updateAssesmentProgress(-1, ref.totalQuestion);
						});
					}

					if (window.shell.getEnableDisableNext() == false) {
						//window.shell.updateVisitedPages(globalCurTopic, globalCurPage, ref.score);
						$(ref.container).find(".feedbackBox").find('.correct').find('.cyuContinue').hide();
					} else {
						$(ref.container).find(".feedbackBox").find('.correct').find('.cyuContinue').show();
					}
				}

				else {
					$(ref.container).find(".feedbackBox").find('.inCorrect').show();
					$(ref.container).find(".feedbackBox").find('.inCorrect').find('#feedback').text(incorrectFeedback);
					$(ref.container).find('.incorrectBtn').on('click', function (e) {
						if (isLocalfileOrServer!=true) {
							window.shell.checkhostReachable()    
							if(onLineFlag=="offline"){
								return;
							}
						}
						ref.loadNextCyu(e);
						$(ref.container).find(".cyu-submit-btn").addClass("disabled");
						$(ref.container).find(".feedbackBox").find('.inCorrect').hide();
						$(ref.container).find(".cyu-options .cyu-option").removeClass('selected');
						ref.selectedOptionArray = [];
						$(ref.container).find(".cyu-options .cyu-option").find('#chkBox').prop('checked', false);
					});

				}
				//ref.attempts++;

			}



		});

	}

	CyuMixTemplate.prototype.createMcqFeedbacks = function () {

		var ref = this;
		var feedbackLength = $(ref.xml).find('cyuBlocks').eq(rendomquestionNo).find('feedbacks').find('feedback').length;
		//alert("feedback length is " + feedbackLength)
		var str = '';
		for (var i = 0; i < feedbackLength; i++) {
			str += '<div class="CyufeedbackMainContainer ' + $(ref.xml).find('cyuBlocks').eq(rendomquestionNo).find('feedbacks').find('feedback').eq(i).attr('type') + '">';
			str += '<div class="CyufeedbackContent"><div class="feed-content">';
			str += '<h2 aria-label="" tabindex="0" id="correctInc" class="feedback-heading"><img src=' + $(ref.xml).find('cyuBlocks').eq(rendomquestionNo).find('feedbacks').find('feedback').eq(i).attr('icon') + ' style="margin-right: 10px" />' + $(ref.xml).find('cyuBlocks').eq(rendomquestionNo).find('feedbacks').find('feedback').eq(i).attr('headerText') + '</h2>';
			str += '</div>';
			str += '<div aria-label="" tabindex="0" class="text-center cyu-submit-container ' + $(ref.xml).find('cyuBlocks').eq(rendomquestionNo).find('feedbacks').find('feedback').eq(i).attr('btnclass') + '"><img src="global_files/templates/assessment/images/next_question_load.png" /></button></div>'
			str += '</div></div>';
		}


		$(ref.container).find('.feedbackBox').html(str);

	}

	CyuMixTemplate.prototype.createMMcqFeedbacks = function () {
		var ref = this;
		var feedbackLength = $(ref.xml).find('cyuBlocks').eq(rendomquestionNo).find('feedbacks').find('feedback').length;
		//alert("feedback length is " + feedbackLength)
		var str = '';
		for (var i = 0; i < feedbackLength; i++) {
			str += '<div class="CyufeedbackMainContainer ' + $(ref.xml).find('cyuBlocks').eq(rendomquestionNo).find('feedbacks').find('feedback').eq(i).attr('type') + '">';
			str += '<div class="CyufeedbackContent"><div class="feed-content">';
			str += '<h2 id="correctInc" class="feedback-heading"><img src=' + $(ref.xml).find('cyuBlocks').eq(rendomquestionNo).find('feedbacks').find('feedback').eq(i).attr('icon') + ' style="margin-right: 10px" />' + $(ref.xml).find('cyuBlocks').eq(rendomquestionNo).find('feedbacks').find('feedback').eq(i).attr('headerText') + '</h2>';
			str += '</div>';
			str += '<div class="text-center cyu-submit-container ' + $(ref.xml).find('cyuBlocks').eq(rendomquestionNo).find('feedbacks').find('feedback').eq(i).attr('btnclass') + '"><img src="global_files/templates/assessment/images/next_question_load.png" /></button></div>'
			str += '</div></div>';
		}
		$(ref.container).find('.feedbackBox').html(str);

	}

	CyuMixTemplate.prototype.loadNextCyu = function (e) {

		var ref = this;
		ref.attempts = 0;
		//var QuestionLength = $(ref.xml).find('mcq').find('cyuBlocks').length;
		if (ref.questionCount == (questionShowInaQuize.length - 1)) {

			$(ref.container).find('#start_screen').hide();
			//window.shell.updateVisitedPages(globalCurTopic, globalCurPage, ref.score);
			$(ref.container).find('.sc-value').html(((ref.score / questionShowInaQuize.length) * 100) + '%');
			$(ref.container).find('.cyu-container').hide();
			$(ref.container).find('.feedbackBox').hide();
			//window.shell.updateVisitedPages(globalCurTopic, globalCurPage, ref.score);
			if ((ref.score / questionShowInaQuize.length).toFixed(2) >= 0.8) {
				window.shell.updateVisitedPages(globalCurTopic, globalCurPage, ref.score);
				window.shell.updateScore(((ref.score / questionShowInaQuize.length) * 100))

				window.shell.studentNameUpdate(window.shell.userName)
				window.shell.studentIdUpdate(window.shell.bankID)
				ref.showResult(true)
				$(ref.container).find('#certificate').on('click', function (e) {
					

					if (isLocalfileOrServer!=true) {
						window.shell.checkhostReachable()    
						if(onLineFlag=="offline"){
							return;
						}
					}
					
					ref.certificateShow()
				



					
					//window.shell.updateAssesmentProgress(-1, ref.totalQuestion);
				});


			} else {
				ref.showResult(false)

				$(ref.container).find('#retry').on('click', function (e) {
					if (isLocalfileOrServer!=true) {
						window.shell.checkhostReachable()    
						if(onLineFlag=="offline"){
							return;
						}
					}
					ref.score = 0;
					ref.totalNoQuestionarr = [];
					$(ref.container).find('#start_screen').show();
					$(ref.container).find('.score-screen-fail').hide();
					$(ref.container).find(".cyu-options .cyu-option").removeClass('selected');
					//window.shell.updateAssesmentProgress(-1, ref.totalQuestion);
				});
			}
			$(this).off('click');
			// if (isMobile.any() && $(window).width() < 768) {
			// 	$(ref.container).hide();
			// 	$('.fixed_block').show();
			// 	$('#shellContainer_content_box').removeClass('changingPadding');

			// 	window.shell.setNextPage(shell);
			// } else {
			// 	window.shell.setNextPage(shell);
			// }
		} else {

			ref.questionCount++;
			$(ref.container).find(".feedbackBox").find('.correct').hide();
			ref.XMLAnswer = [];
			ref.selectedOptionArray = [];
			ref.totalNoQuestionarr.push(rendomquestionNo);
			rendomquestionNo = "";
			ref.rendomValue();
			ref.launchMCQ();
			ref.templateTypeDeclaration();
			//ref.populateAnswer();
			ref.createMMcqFeedbacks();
			ref.createMcqFeedbacks();

		}

		// clickStream
		//window.shell.captureEvent(e, 'loadNextCYU', {template: "CyuWithContextTemplate"})
	}
	CyuMixTemplate.prototype.loadPrevCyu = function (e) {
		var ref = this;
		ref.attempts = 0;
		ref.questionCount--;
		$(ref.container).find(".feedbackBox").find('.correct').hide();
		ref.XMLAnswer = [];
		ref.selectedOptionArray = [];
		ref.launchMCQ();
		ref.templateTypeDeclaration();
		//ref.populateAnswer();
		ref.createMMcqFeedbacks();
		ref.createMcqFeedbacks();

		// clickStream
		//window.shell.captureEvent(e, 'loadPrevCYU', {template: "CyuWithContextTemplate"})

	}

	CyuMixTemplate.prototype.convJS= function(s){
		if( s == null ) return '';
		s = s.replace(/\n/g, '<br/>');
		s = s.replace(/\\r/g, '<br/>');
		s = s.replace(/"/g, '&quot;');
		return s;
	}
	CyuMixTemplate.prototype.removeSpaceFromContent=function(qext){
		var questionText =  convJS(qext);
		questionText = questionText.replace(/&quot;/g, '');
		questionText = questionText.replace(/"/g, '');
		questionText = questionText.replace(/“/g, '');
		questionText = questionText.replace(/”/g, '');
		questionText = questionText.replace(/,/g, '');
		questionText = questionText.replace(/'/g, '');
		questionText = questionText.replace(/’/g, '');
		//var breakstr = questionText.split('\n\n Select')[0];
		var quesText = questionText.split(' ').join('_');
		//quesText = quesText.split('\n\n ').join('_');
		quesText = quesText.substring( 0, 245 );
		strID = quesText;

		return strID;
	}
	return CyuMixTemplate;

});