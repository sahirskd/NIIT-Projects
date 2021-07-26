define([], function () {
	function loginPageTemplate() {
		this.xml = null;
		this.classRef = null;
		this.tabId;
		this.selectedTabId;
		
	}
	loginPageTemplate.prototype = new Util();
	loginPageTemplate.prototype.constructor = loginPageTemplate;
	loginPageTemplate.prototype.init = function (xmlName) {
		
		var ref = this;
		this.container = this.getPageContainer();
		//if (isLocalfileOrServer == true) {
			setTimeout(function () {
				landingPageContent = function (data) {

					var parser = new DOMParser();
					xml = parser.parseFromString(data, 'text/xml')
					ref.xml = xml;
					ref.loadIntructionScreen();
				}
				var topicscript = document.createElement('script');
				topicscript.src = "data/" + xmlName + "/" + xmlName + ".js",
					document.getElementsByTagName('head')[0].appendChild(topicscript)
			}, 10);


		// }
		// else {
		// 	setTimeout(function () {
		// 		ref.loadXML(xmlName);
		// 	}, 300);
		// }
          setTimeout(function() {
		//	$(".nextItext").show();
			
		}, 300);


		$(ref.container).find("#pass, #user").keypress(function (event) {
			
			if ($(this).attr("type") == "number")
				if (event.which != 8 && isNaN(String.fromCharCode(event.which))) {
					event.preventDefault();
				}

	

				if ($(this).attr("type") == "text"){
					
					var theEvent = event || window.event;			
					var key = theEvent.keyCode || theEvent.which;
					key = String.fromCharCode(key);
					var regex = /^[A-Za-z]+$|\ /;
					//var regex = /[0-9]|\.|\,|\-/;
		
					if (!regex.test(key)) {
						theEvent.returnValue = false;
						if (theEvent.preventDefault) {
							theEvent.preventDefault();
		
						}
		
					}
				}
		

			setTimeout(function () {
				if ($(ref.container).find("#pass").val() !== "" && $(ref.container).find("#user").val() !== "") {


					// window.shell.userName=$(ref.container).find("#user").val();
					// window.shell.bankID=$(ref.container).find("#pass").val();
					$("#login-btn").css("visibility", "visible");
				}
				else {
					$("#login-btn").css("visibility", "hidden");
				}
			}, 10)
		});

		window.addEventListener('keydown', function (e) {
			
			if(e.keyCode==8){
				setTimeout(function(){					
					if ($(ref.container).find("#pass").val()== "" && $(ref.container).find("#user").val()== "") {
						$("#login-btn").css("visibility", "hidden");
					}
					else if(($(ref.container).find("#pass").val()== "" && $(ref.container).find("#user").val()!= "")  || $(ref.container).find("#pass").val()!= "" && $(ref.container).find("#user").val()== "") {
						$("#login-btn").css("visibility", "hidden");
					}
					else {
						$("#login-btn").css("visibility", "visible");
					}
				},10)
				
			}
			if(e.keyCode==46){
				setTimeout(function(){
					
					if ($(ref.container).find("#pass").val()== "" && $(ref.container).find("#user").val()== "") {
						$("#login-btn").css("visibility", "hidden");
					}
					else if(($(ref.container).find("#pass").val()== "" && $(ref.container).find("#user").val()!= "")  || $(ref.container).find("#pass").val()!= "" && $(ref.container).find("#user").val()== "") {
						$("#login-btn").css("visibility", "hidden");
					}
					else {
						$("#login-btn").css("visibility", "visible");
					}
				},10)
				
			}
		  }, false);




		loginPageTemplate.prototype.loadXML = function (xmlNameRef) {
			
			$.ajax({
				type: "GET",
				url: "data/" + xmlNameRef + "/" + xmlNameRef + ".xml",
				dataType: "xml",
				success: function (xml) {
					
					ref.xml = xml;
					console.log(ref.xml)
					ref.loadIntructionScreen();

					if ($(ref.xml).find('transcript').length > 0) {
						var transcriptText = $(ref.xml).find('transcript').text();
						$('#contentTab_2').html(transcriptText)
					}

					if ($(ref.xml).find('resources').length > 0) {
						var resourcesText = $(ref.xml).find('resources').text();
						$('#contentTab_1').html(resourcesText)
					}

					if (isMobile.any()) {

					} else {
						var obj = $('#contentTab_2');
						setTimeout(function () {
							window.shell.attachScrollBar(obj, 8, 100, '#cccccc', '#0090DA')

						}, 1000);
					}

				}
			});


		}

		//For Loading the Instruction in green place.
		loginPageTemplate.prototype.loadIntructionScreen = function () {
			
			var input_text = $(ref.xml).find('loginPage').find('inputFieldText field')
			var btn_content = $(ref.xml).find('loginPage').find('buttonText').text()
			$(ref.container).find(".wrapper .login-button-container #login-btn").html(btn_content)




			$('.login-container').find("table tr label").each(function (k, v) {
				$(this).text(input_text[k].textContent)
			});

			// code for nicescroll bar
			if (isMobile.any()) {

			} else {
				var obj1 = $(ref.container).find('.coachTipContainer');

				setTimeout(function () {
					try {
						window.shell.attachScrollBar(obj1, 8, 100, '#cccccc', '#0090DA');
						$(ref.container).find('coachTipContainer').getNiceScroll().show();
						$(ref.container).find('coachTipContainer').getNiceScroll().resize();
					} catch (e) {

					}
				}, 300);
			}

			// nicescroll bar end		
			window.shell.updateVisitedPages(globalCurTopic, globalCurPage);
			window.shell.attachEvents();
		}


	}

	return loginPageTemplate;
});