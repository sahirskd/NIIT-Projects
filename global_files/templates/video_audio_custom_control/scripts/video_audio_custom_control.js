var api;
var fullScreenFlag = false;
var volumeDrag = false;
var globalisPlaying;
var fullscreenboolean = false;
var videoEnded = false;
var userdefinedpaused = false;
var videRef;
var x;
var y;
var IsVolumeMute;
var fileName = "";
var audioVideosrc;
define(['Shell', "util"], function (Shell, util) {
	var lastVideoTime = 0;
	function VideoTemplate() {
		this.xml = null;
		this.container = null;
		this.videoElement = null;
		this.playPauseBtn = null;
		this.fullScreenBtn = null;
		this.stoppedManually = false;
		this.isPlaying = false;
		this.fullscreenvideo = false;
		this.videoSeekbarElement = null;
		this.videoSeekbarCircleElement = null;
		this.currentTimeElement = null;
		this.totalTimeElement = null;
	}
	VideoTemplate.prototype = new Util();
	VideoTemplate.prototype.constructor = VideoTemplate;

	VideoTemplate.prototype.init = function (xmlName) {
		var ref = this;
		fileName = xmlName;

		$(".btnNext").css("pointer-events", "none");
		$(".btnNext").css("opacity", "0.5");

		this.container = $("#page_" + globalCurTopic + "_" + globalCurPage)
		ref.xml = xmlName;

		if (isLocalfileOrServer == true) {
			setTimeout(function () {
				landingPageContent = function (data) {

					var parser = new DOMParser();
					xml = parser.parseFromString(data, 'text/xml')
					ref.xml = xml;
					ref.LoadAudioVideocontent()
					ref.addFunctionality();
					ref.createMedia(xmlName)
				}
				var topicscript = document.createElement('script');
				topicscript.src = "data/" + xmlName + "/" + xmlName + ".js",
					document.getElementsByTagName('head')[0].appendChild(topicscript)
			}, 10);

		}
		else {
			setTimeout(function () {

				ref.LoadXml(xmlName);
			}, 100);
		}


		// setTimeout(function(){

		// ref.addFunctionality();
		// ref.createMedia(xmlName)

		// }, 400)

		fullScreenFlag = false;
	}

	VideoTemplate.prototype.createMedia = function (xmlName) {
		var ref = this;
		ref.xml = xmlName;
		$('.' + ref.xml).mediaelementplayer({
			autoRewind: false,
			autoplay: false,
			iPhoneUseNativeControls: false,
			enableKeyboard: false,
			features: ['playpause', 'progress', 'volume'],

			success: function (mediaElement, domObject) {

				//videRef.setMuted (IsVolumeMute)
				globalisPlaying = false;
				userdefinedpaused = true;
				ref.onMediaLoaded(mediaElement);
				if (isMobile.any()) { } else {
					setTimeout(function () {
						// mediaElement.play();
					}, 500);
				}
				videRef = mediaElement;
				videRef.src = ref.audioVideosrc
				videRef.setMuted(IsVolumeMute)

				if (shell.forceSeekbar == 'true' && !$("#page_" + globalCurTopic + "_" + globalCurPage).hasClass('is-completed')) {
					$(ref.container).find(".mejs__controls").attr('style', function (i, s) { return (s || '') + ';cursor: auto !important' });
					$(ref.container).find(".mejs__time-rail").attr('style', function (i, s) { return (s || '') + ';pointer-events: none !important;cursor: auto !important;' });
					seekprevent = true;
				} else {
					$(ref.container).find(".mejs__time-rail").css({ 'pointer-events': 'all', cursor: 'pointer' });
					seekprevent = false;
				}

				var vidtimeupdate = 0;

				mediaElement.addEventListener('timeupdate', function (e) {

					if (!mediaElement.seeking) {
						vidtimeupdate = mediaElement.currentTime;
					}
					if (mediaElement.currentTime - lastVideoTime > 1 || mediaElement.currentTime == mediaElement.duration) {
						lastVideoTime = mediaElement.currentTime;
						//saveVideoProgress("player2", mediaElement.currentTime.toFixed(2));
						//window.shell.updatevideoProgress("player2", mediaElement.duration);
					}
				}, false);

				mediaElement.addEventListener('ended', function (e) {

					//console.log("video ended");
					//$(".btnNext").css("pointer-events","all");
					//$(".btnNext").css("opacity","1");	

					globalisPlaying = false;

					videoEnded = true;
					vidtimeupdate = 0;
					$(ref.container).find(".mejs__time-rail").css({ 'pointer-events': 'all', cursor: 'pointer' });
					seekprevent = false;

					$(".btnNext").removeAttr("style");
					window.shell.updateVisitedPages(globalCurTopic, globalCurPage);

				}, false);

				mediaElement.addEventListener('play', function (e) {
					//globalisPlaying = true;

					//check if the internet connection is online or not
					if (isLocalfileOrServer != true) {
						window.shell.checkhostReachable()
						if (onLineFlag == "offline") {
							return;
						}
					}
					videoEnded = false;
					userdefinedpaused = false;
					globalisPlaying = true;
					$('#video-instruction').hide()

				}, false);

				mediaElement.addEventListener('pause', function (e) {
					//alert(videoEnded)

					//check if the internet connection is online or not
					if (isLocalfileOrServer != true) {
						window.shell.checkhostReachable()
						if (onLineFlag == "offline") {
							return;
						}
					}
					if (globalisPlaying == true) {
						userdefinedpaused = true;
					}
					//videoEnded = true;
					//globalisPlaying = false;
					$('#video-instruction').show()
				}, false);

				mediaElement.addEventListener('seeking', function (e) {
					lastVideoTime = mediaElement.currentTime;
					if (!$("#page_" + globalCurTopic + "_" + globalCurPage).hasClass('is-completed') && shell.forceSeekbar == 'true') {
						var diff_time = mediaElement.currentTime - vidtimeupdate;
						diff_time = Math.abs(diff_time);
						if (diff_time > 0.01) {
							mediaElement.currentTime = vidtimeupdate;
						}
					}

				}, false);

				mediaElement.addEventListener('volumechange', function (e) {
					IsVolumeMute = mediaElement.muted;

				}, false);

			}
		});

		VideoTemplate.prototype.stopMedia = function () {
			//if (globalisPlaying) {
			videRef.pause();
			$('#video-instruction').show()

			//}
		}

		VideoTemplate.prototype.playMedia = function () {
			//if(!globalisPlaying){
			$('#video-instruction').hide()
			videRef.play();
			//}
		}

	}
	VideoTemplate.prototype.LoadXml = function (xmlNameRef) {

		var ref = this;
		$.ajax({
			type: "GET",
			url: "data/" + xmlNameRef + "/" + xmlNameRef + ".xml",
			dataType: "xml",
			success: function (xml) {

				ref.xml = xml;


				ref.LoadAudioVideocontent()
				ref.addFunctionality();
				ref.createMedia(xmlNameRef)

			}

		});

	}

	VideoTemplate.prototype.LoadAudioVideocontent = function () {

		var ref = this;
		var backgroundImage = $(ref.xml).find('PageContent').find('backgroundImage').text();
		var heading = $(ref.xml).find('PageContent').find('heading').text();
		var paralength = $(ref.xml).find('PageContent').find('para').length;

		$(ref.container).find(".video-audio-container-custom-controller").css('background-image', 'url(' + backgroundImage + '');

		$(ref.container).find('.audio-video-ost-text .heading').html(heading)
		var str = ''
		for (var i = 0; i < paralength; i++) {
			str += '<p>' + $(ref.xml).find('PageContent').find('para').text() + '</p>'
		}

		$(ref.container).find('.audio-video-ost-text .text-para').html(str)

		var audioImgstr = '<img src= ' + $(ref.xml).find('audio').find('audioImage').text() + '>'
		$('.audio-image').html(audioImgstr)



		$(this.container).find("video").closest("#" + fileName).hide()
		$(this.container).find("audio").closest("#" + fileName).hide()
		//$('#l2_p4_audio').hide()
		var isVideo_visible = $(ref.xml).find('video').find('videoVisible').text();
		var isAudio_visible = $(ref.xml).find('audio').find('audioVisible').text();


		if (isVideo_visible == "true") {
			$('#page22_audio').hide()
			$('#page22_video').show()
			$(this.container).find("video").closest("#" + fileName).show()
			ref.audioVideosrc = $(ref.xml).find('video').find('videSource').text();


		}
		if (isAudio_visible == "true") {
			$('#page22_audio').show()
			$('#page22_video').hide()
			$(this.container).find("audio").closest("#" + fileName).hide()
			ref.audioVideosrc = $(ref.xml).find('audio').find('audioSource').text();
			//alert(ref.audioVideosrc)
		}
		else {
			//$('#page22_audio').hide()
			//$('#page22_video').hide()				
		}


		if ($(ref.xml).find('transcript').length > 0) {
			var transcriptText = $(ref.xml).find('transcript').text();
			$('#video-transcript-text').html(transcriptText)
		}
		if (isMobile.any()) {

		} else {
			var obj = $('#contentTab_2');
			setTimeout(function () {
				window.shell.attachScrollBar(obj, 8, 100, '#cccccc', '#0090DA')

			}, 1000);
		}
	}

	VideoTemplate.prototype.onMediaLoaded = function (ele) {
		var h = $(ele).find('video').height();
		var w = $(ele).find('video').width();

		var videoResize = function () {
			var win = shell.getParentWindow(window);
			var winW = $(win).width();
			var isActivity = $(ele).closest("#activity_container").length ? true : false;
			var winW = $(win).width();
			var tempW = winW < 992 ? winW : 992;
			var calcW = winW < 550 ? tempW - 60 : tempW - 100;
			var calcH = (h / w) * calcW;
			$(ele).find('video').css('width', (calcW) + 'px');
			$(ele).closest('.mejs__container').css('width', (calcW) + 'px');
			$(ele).find('video').css('height', (calcH) + 'px');
			$(ele).closest('.mejs__container').css('height', (calcH) + 'px');
		}

		$(window).on('resize', function () {
			//setTimeout(videoResize, 350)
		});
		//setTimeout(videoResize, 350)
	}

	VideoTemplate.prototype.addFunctionality = function (xmlNameRef) {
		var ref = this;
		$(".videoTranscript").click(function () {
			//check if the internet connection is online or not
			if (isLocalfileOrServer != true) {
				window.shell.checkhostReachable()
				if (onLineFlag == "offline") {
					return;
				}
			}
			$('.video-player #modalwrapper').show()
			videRef.pause();
		});
		$(".vid-btnclose").click(function () {
			//check if the internet connection is online or not
			if (isLocalfileOrServer != true) {
				window.shell.checkhostReachable()
				if (onLineFlag == "offline") {
					return;
				}
			}
			$('.video-player #modalwrapper').hide()
			if (globalisPlaying) {
				videRef.play();
			}
		});
	}

	return VideoTemplate;
});