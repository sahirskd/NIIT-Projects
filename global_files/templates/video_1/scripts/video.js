var api;
var fullScreenFlag = false;
var volumeDrag = false;
var globalisPlaying;
var globalisPaused;
var fullscreenboolean = false;
var videoEnded = false;
var userdefinedpaused = false;
var videRef;
var x;
var y;
var IsVolumeMute;
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
		
		$(".btnNext").css("pointer-events","none");
		$(".btnNext").css("opacity","0.5");
		//this.pageLoaded();
		this.container = $("#page_" + globalCurTopic + "_" + globalCurPage)
		ref.xml = xmlName;
		ref.LoadXml(xmlName);
		ref.addFunctionality();
		ref.createMedia(xmlName)
		fullScreenFlag = false;
		
	}
	// function to create media players
	VideoTemplate.prototype.createMedia=function(xmlName){
		var ref = this;
		ref.xml = xmlName;
		$('#' + ref.xml).mediaelementplayer({
			autoRewind: false,
			autoplay: false,
			
			iPhoneUseNativeControls: false,
			enableKeyboard: false,
			//, 'fullscreen'
			features: ['playpause', 'progress', 'volume'],

			success: function (mediaElement, domObject) {

				globalisPlaying = false;
				globalisPaused=false;
				userdefinedpaused = true;
				ref.onMediaLoaded(mediaElement);
				if (isMobile.any()) { } else {
					setTimeout(function () {
						// mediaElement.play();
					}, 500);
				}
				videRef = mediaElement;
				videRef.setMuted (IsVolumeMute)
				////alert(videRef.setMuted (true))
				seekprevent = false;
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
					//alert("video ended")
					globalisPlaying = false;
					
					$(".btnNext").removeAttr("style");
					
					videoEnded = true;
					vidtimeupdate = 0;
					$(ref.container).find(".mejs__time-rail").css({ 'pointer-events': 'all', cursor: 'pointer' });
					seekprevent = false;
					window.shell.updateVisitedPages(globalCurTopic, globalCurPage);
					

					
				}, false);
				
				mediaElement.addEventListener('play', function (e) {
					if (isLocalfileOrServer!=true) {
						window.shell.checkhostReachable()    
						if(onLineFlag=="offline"){
							videRef.pause();
							return;
						}
					}
					//globalisPlaying = true;
					videoEnded = false;
					userdefinedpaused = false;
					globalisPlaying = true;
					

				}, false);

				mediaElement.addEventListener('pause', function (e) {
					if (isLocalfileOrServer!=true) {
						window.shell.checkhostReachable()    
						if(onLineFlag=="offline"){
							return;
						}
					}
					//alert(videoEnded)
					if (globalisPlaying == true) {
						userdefinedpaused = true;
					}
					//alert("111111");
					//videoEnded = true;
					//globalisPlaying = false;
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
							
							IsVolumeMute = mediaElement.muted							
					
				}, false);
				
				
			}
		});
		
		//---function to stop video/audio player
		VideoTemplate.prototype.stopMedia = function () {
			
			//if (globalisPlaying) {
			videRef.pause();
			//}
		}
		//---function to play video/audio player
		VideoTemplate.prototype.playMedia = function () {
			//if(!globalisPlaying){
			videRef.play();
			//}
		}
	}

	//---function to load the xml data 	
	VideoTemplate.prototype.LoadXml = function (xmlNameRef) {	
			
		var ref = this;
		$.ajax({
			type: "GET",
		url: "data/" + xmlNameRef + "/"+ xmlNameRef +".xml",
			dataType: "xml",
			success: function (xml) {			
				ref.xml = xml;				
				var title = $(ref.xml).find('video').find('videoTitle').text();				
				$('.video-title').html(title)
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

		});
			
	}
	//Method to resize the media
	
	VideoTemplate.prototype.onMediaLoaded = function (ele) {
		var h = $(ele).find('video').height();
		var w = $(ele).find('video').width();

		var videoResize = function(){
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
	
	VideoTemplate.prototype.isVideoAudioPlayPause=function(){
     
      
        if($(this.container).find(".mejs__overlay-button").attr("aria-pressed")=="false"){
            globalisPlaying=false; 
		
            videRef.pause();
        }

  
        if(globalisPlaying==true){
                    
            if(videRef.paused){
			
                videRef.play(); 
            }
            else{
				
                videRef.pause();
            }
        }
        
        else{
			
         videRef.pause();
        }
      
     
  }
	// method to call the transcript popups
	VideoTemplate.prototype.addFunctionality = function (xmlNameRef)
	{
		var ref = this;
		$(".videoTranscript").click(function(){
		
		
			if (isLocalfileOrServer!=true) {
				window.shell.checkhostReachable()    
				if(onLineFlag=="offline"){
					return;
				}
			}
			$('.video-player #modalwrapper').show()
			
			ref.isVideoAudioPlayPause()
		});
		$(".vid-btnclose").click(function(){
          		
			if (isLocalfileOrServer!=true) {
				window.shell.checkhostReachable()    
				if(onLineFlag=="offline"){
					return;
				}
			}
			$('.video-player #modalwrapper').hide()			
			ref.isVideoAudioPlayPause()
		});	
	}

	return VideoTemplate;
});