
var progressI = 0;
var onStar = 4;
var globalCurTopic = 0;
var globalCurPage = 1;
var GlobalVisitedPages = '';
var GlobarProgressPages = '';
var orientationFlag = false;
var globalsavetimeforvideos = [-1, -1, -1];
var globalisPlaying = false;
var isLocalfileOrServer = false;
var resourceData = '';
var glossaryData = '';
var resourceGlossaryData = '';
var globalPopupData = '';
var onLineFlag = '';
var popuptype = '';
var studentName;
var studentID;
var isaccessibile;


//UL Changes
var scoreRaw = 0;
define("Shell", ["mediaelement"], function (mediaelem) {

    function Shell() {
        this.curTopic = 0;
        this.courseFlag = false;
        this.bookMarkingEnabled = false;
        this.curPage = 1;
        this.globalProgressArray = [];
        this.prevPage = 0;
        this.totalLessons = null;
        this.screenType = null
        this.eachTopicPagesArray = [];
        this.courseProgressArray = [];
        this.visitedPages = [];
        this.totalTopics = 1;
        this.currentSlideNo;
        this.totalPages = 1;
        this.tocXml = null;
        this.suspendString = '';
        this.topics = [];
        this.totalTopicLength;
        this.isLoading = false;
        this.isPageTrans = false;
        this.isPrevEnabled = true;
        this.isNextEnabled = true;
        this.prevNavControlsHandler = "shell";
        this.nextNavControlsHandler = "shell";
        this.templateInstance = null;
        this.currentPageUrl = "";
        this.lms = null;
        this.isPopupvideo = [];
        this.forceSeekbar;
        this.globalPageVisited = [];
        this.userName;
        this.bankID;
        this.isExitPopupbtnClick=false;
        this.accessiblityVersion="";
        this.certificateDate="";
    }

    // LMS Initilizeation start
    var lms = {};
    (function () {

        var scoData;

        // function to get commit value
        var commitValues = function () {
            try {
                scoData.commit();
            } catch (e) { }
        }

        // function to set bookmarking
        this.setBookmark = function (valueRef) {
            try {
                scoData.setValue("lessonLocation", valueRef);
                commitValues();
            } catch (e) { }
        }
        // function to send LMS status whether it is complet or incomplet the course
        var setStatus = function (status) {
            try {
                scoData.setValue("lessonStatus", status);
                commitValues();
            } catch (e) { }
        }

        // Function to set the suspend data and send it to LMS
        this.setSuspendData = function (suspendstring) {
            try {

                scoData.setValue("suspendData", suspendstring);
                commitValues();
            } catch (e) { }
        }
        // Function to set the score data and send it to LMS
        this.setScore = function (userScore) {

            var score = scoData.getValue("score");
            scoreRaw = isNaN(parseInt(score)) ? 0 : parseInt(score);
            if (scoreRaw < userScore) {
                scoreRaw = userScore;
            }
            try {
                scoData.setValue("score", scoreRaw);
                commitValues();
            } catch (e) { }
        }

        //Set user interactio data

        this.setInteractionData=function(correctans,userselect,type){

            // LMS function calling to send Interation data
            scoData.SendUserInterationData(correctans,userselect,type);
        }
        // Function to set the score data and send it to LMS
        this.studentname = function (studentname) {
            try {
                scoData.setValue("studentName", studentname);
                commitValues();
            } catch (e) { }
        }
        // Function to set the score data and send it to LMS
        this.studentId = function (studentId) {
            try {
                scoData.setValue("studentID", studentId);
                commitValues();
            } catch (e) { }
        }


        this.init = function () {
            //
            //
            try {
            
                scoData = new SCOData();
                scoData.initialize();

                // this condetion is when we run thepackeg to stand alon and local server the login page will be disable automatically
                if(typeof scoData.getValue("lessonStatus")=="object"){
                    window.globalConfig.isScorm=false
                }else{
                    window.globalConfig.isScorm=true
                }
                if (scoData.getValue("lessonStatus") != "completed") {
                    setStatus("incomplete");
                }

                var score = scoData.getValue("score");
                studentName = scoData.getValue("studentName");
                studentID = scoData.getValue("studentID");

                scoreRaw = isNaN(parseInt(score)) ? 0 : parseInt(score);

                var suspendstring = scoData.getValue("suspendData");

                if (suspendstring != '') {
                    GlobalVisitedPages = suspendstring.split('+')[0];
                    GlobarProgressPages = suspendstring.split('+')[1];
                    window.shell.accessiblityVersion=suspendstring.split('+')[2]
                    window.shell.certificateDate=suspendstring.split('+')[3]
                }
                var tempArray = GlobalVisitedPages.split(',');
                var tempArray2 = GlobarProgressPages.split(',');
                globalProgressArray = tempArray2;

          if (suspendstring != '') {
               for(let i=0;i<globalProgressArray.length;i++){
                if(globalProgressArray[i]==1){
                    window.shell.globalPageVisited.push(true)
                  }else{
                    window.shell.globalPageVisited.push(false)
                  }
               }
            }
                for (var i = 0; i < tempArray.length; i++) {
                    $('#thumb_' + tempArray[i]).find('.video_completion_overlay').show();
                    $("#page_" + tempArray[i]).addClass('is-completed');
                    $('#thumb_' + tempArray[i]).find('.progress-bar').css('width', '100%').attr('aria-valuenow', 100);
                }

                var pageVistedforprogresslengthTemp = occurrence(tempArray2)[1].length;
                var valeur = 0;

                if ($(this).attr('value') > valeur) {
                    valeur = $(this).attr('value');
                }
                valeur = Math.round((parseInt(pageVistedforprogresslengthTemp) / parseInt(tempArray2.length)) * 100);
                $('.course_progress').find('.progress-bar').css('width', valeur + '%').attr('aria-valuenow', valeur);
                $('.courseProgressperc').html(valeur + '%');
            } catch (e) { }
        }
        this.checkLessonCompletion = function (startPageNo, endPageNo) {
            var totalVisitedPages = TVisitedPages.length;
            var lessonVisited = 0;
            if (totalVisitedPages > 0) {
                for (var i = startPageNo; i <= (startPageNo + endPageNo); i++) {
                    var isPageFound = isPageVisited(i);
                    if (isPageFound == false) {
                        break;
                    } else {
                        lessonVisited++;
                    }
                }
            }
            return lessonVisited;
        }
        this.getBookmark = function () {
            try {
                var bookmark = scoData.getValue("lessonLocation");
                if (bookmark != null && bookmark.length > 0) {
                    return bookmark;
                } else {
                    return -1;
                }
            } catch (e) { }
        }
        this.markComplete = function (status) {
            setStatus(status);
        }
        this.unloadCourse = function () {
            lms.setBookmark(ref.curTopic + "_" + ref.curPage);
        }
    }).apply(lms);


    $(document).ready(function () {
        $("body").on("contextmenu", function (e) {
            return false;
        });

        var htmlcls = isMobile.any() ? isMobile.any() + ' is-mobile' : '';
        $('html').addClass(htmlcls);

        // Added for Android fullscreen video isuue
        $(document).on('click', '.mejs__fullscreen-button button', function (e) {
            // $(window).resize();

            // if($('.mejs__fullscreen-button').hasClass('mejs__unfullscreen')){
            setTimeout(function () {
                $(window).resize();
                // console.log('%c/*----window resized on video fullscreen/unfullscreen----*/',"font-size:20px;color:#999;")
            }, 60);
            // }

        })
    });
    //end


    heightl = $(window).height()
    widthl = $(window).width()
    $(document).ready(function () {
        // console.log(widthl)
        // console.log(heightl)
        if (heightl > widthl) {
            $('#orientationpopup').css("display", "flex");
        }
    });


    $(window).on("orientationchange", function (event) {
        // setTimeout(function () {
        //     window.dispatchEvent(new Event('resize'));
        // }, 555);
        if (window.orientation == 0 || window.orientation == 180) {
            $('html').addClass('is-portrait').removeClass('is-landscape');
            $('#orientationpopup').css("display", "flex");
        } else {
            $('html').removeClass('is-portrait').addClass('is-landscape');
            $('#orientationpopup').css("display", "none");
        }
    });

    Shell.prototype = new Util();
    Shell.prototype.constructor = Shell;
    Shell.prototype.init = function () {


        var ref = this;
        scaleToFit()
        // check the server is local or not
        switch (window.location.protocol) {
            case 'http:':
            case 'https:':
                isLocalfileOrServer = false;
                break;
            case 'file:':
                //local file
                isLocalfileOrServer = true;
                break;
            default:
            //some other protocol
        }

        if (isLocalfileOrServer == true) {
            ref.localFileProceed(ref);
            ref.interactivityChecker()
            window.shell.accessiblityVersion="";
        }
        else {
            ref.loadXML("toc.xml", function (xml) {

                //alert("function 1")
                ref.courseXmlLoaded(xml);
                ref.interactivityChecker()
            });
        }
    }

    Shell.prototype.localFileProceed = function (ref) {
        //toc Js File Function
        jsonPTocCallback = function (data) {
            var parser = new DOMParser();
            xml = parser.parseFromString(data, 'text/xml')
            ref.courseXmlLoaded(xml);
        }
        var script = document.createElement('script');
        script.src = 'global_files/scripts/toc.js',
            document.getElementsByTagName('head')[0].appendChild(script)
    }

    Shell.prototype.exitCourse = function () {
        //lms.unloadCourse();
        //lms.setSuspendData(ref.suspendString);
        //return 'Are you sure you want to leave this course?';
    }



    Shell.prototype.getParentWindow = function (win) {
        try {
            if (win.top != win) {
                return win.top;
            }
            if (win.parent != win) {
                return getTopIframe(win.parent);
            }
        } catch (e) {
        }
        return win;
    }

    Shell.prototype.addThumbnailCorousel = function () {
        var ref = this;
        for (var i = 1; i <= ref.totalTopics; i++) {
            $('#owl-' + i).owlCarousel({
                loop: false,
                margin: 10,
                nav: true,
                items: 2,
                navText: ["<i class='fa fa-chevron-left left_icon' style='color:#ffffff; font-size:2em;'></i>", "<i class='fa fa-chevron-right right_icon' style='color:#ffffff; font-size:2em;'></i>"],
                rewindNav: true,
                responsive: {
                    550: {
                        items: 2
                    },
                    767: {
                        items: 3
                    },
                    1024: {
                        items: 3,
                        mouseDrag: false,
                    }
                }
            })
        }
        // console.log("%cHOLA-HOLA","font-size:25px;color:teal")
        $(".topic_container .item").each(function (i, v) {

            $(v).off('click').on('click', $.proxy(ref.thumbnailClickEvents, null, ref));
        })
    }

    // Function to
    Shell.prototype.thumbnailClickEvents = function (ref, e) {
        if ($(this).find('.display_block').length > 0) {
            return;
        }
        ref.prevPage = ref.curTopic + "_" + ref.curPage;
        ref.curTopic = $(this).attr('id').split('_')[1];
        ref.curPage = $(this).attr('id').split('_')[2];

        $('html, body').animate({
            scrollTop: 0
        }, function () {
            if ($("#activity_container").is(':visible')) {
                $("#activity_container").hide();
                $(".fixed_block").show();
                $('#shellContainer_content_box').removeClass('changingPadding');
            }
        });
        setTimeout(ref.loadPage.bind(ref), 400);
        //$('body, html', parent.document).animate({ scrollTop: 0 },1500);
        return false;

    }

    // function to return which page is visit
    Shell.prototype.getVisitedPages = function () {
        var ref = this;
        return ref[visitedPages];
    };

    // Function to add global content in the course
    Shell.prototype.addGlobalContent = function () {
        var ref = this;
        var courseTitle = $(ref.tocXml).find('courseTitle').text();
        var courseDesc = $(ref.tocXml).find('courseDesc').text();
        var courseProgressTtile = $(ref.tocXml).find('courseProgressTitle').text();
        var splashTitle = $(ref.tocXml).find('global').find('title').text();
        var splashHeading = $(ref.tocXml).find('global').attr('heading');
        var aboutCourseTitle = $(ref.tocXml).find('aboutCourseTitle').text();
        var aboutCourseContent = $(ref.tocXml).find('aboutCourseContent').text();
        var firstPageTitle = $(ref.tocXml).find('topics').find('topic').eq(0).find('page').eq(0).find('title').text();
        $('#mainBody').find('#course_title').html(courseTitle);
        $('#mainBody').find('#course_desc').html(courseDesc);
        $('#mainBody').find('#course_desc').html(courseDesc);
        $('#mainBody').find('#aboutCourseTitle').html(aboutCourseTitle);
        $('#mainBody').find('#aboutCourseContent').html(aboutCourseContent);
        $('#mainBody').find('#courseProgressTitle').html(courseProgressTtile);
        $('#mainBody').find('.topic_title').html(firstPageTitle);
        //alert($(ref.tocXml).find('global').attr('require'))
        if ($(ref.tocXml).find('global').attr('require') == '1') {
            $('#mainBody').find('.video_heading').find('.topic_title').html(splashTitle);
            $('#mainBody').find('.video_heading').find('.last_viewed').html(splashHeading);
        }
        //ref.loadnavigationCorousel();
    }

    // Function to add shell crousel navigation
    Shell.prototype.loadnavigationCorousel = function () {

        var ref = this;
        var topics = ref.tocXml.find("topics topic");
        ref.totalTopics = topics.length;
        var str = '';
        if ($(ref.tocXml).find('global').attr('require') == '1') {
            str += '<section class="topic_container" id="topic_' + 0 + '">';
            str += '<h2 class="topic_title_container">' + $(ref.tocXml).find('global').children('title').text() + '</h2>';
            str += '<div class="owl-carousel" id="owl-' + 0 + '">';
            str += '<div class="item" id="thumb_' + 0 + '_' + 1 + '">';
            str += '<div class="lo_type">' + $(ref.tocXml).find('global').attr('type') + '</div>'
            str += '<div class="lo_current_video">' + $(ref.tocXml).find('global').attr('heading') + '</div>';
            str += '<div class="lo_title">' + $(ref.tocXml).find('global').find('title').text() + '</div>'
            str += '<div class="lo_progress">'
            str += '<div class="progress-bar w-0" id="myBar_' + 0 + '_' + 1 + '"  role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>';
            str += '</div>'
            str += '<img class="img-fluid" src="./assests/images/skin/thumbnails/' + (isMobile.any() ? "mob/" : "") + 0 + '_' + 1 + '.jpg">';
            str += '<div class="video_completion_overlay">';
            str += '<i class="fa fa-check-circle checkCircle"></i>'
            str += '</div>';
            str += '<div class="video_security_overlay">';
            str += '<img class="desktop_tick security_tick" src="" alt="Locked Video"/>';
            str += '<img class="mobile_tick security_tick" src="g" alt="Locked Video"/>';
            str += '</div>';
            str += '</div>';
            str += '</div>';
            str += '</section>';
            for (var i = 0; i < ref.totalTopics; i++) {
                str += '<section class="topic_container" id="topic_' + (i + 1) + '">';
                str += '<h2 class="topic_title_container">' + $(ref.tocXml).find('topics').find('topic').eq(i).children('title').text() + '</h2>';
                str += '<div class="owl-carousel" id="owl-' + (i + 1) + '">';
                var p = [];
                var pages = this.tocXml.find("topics topic:eq(" + i + ")").find("pages page");
                ref.eachTopicPagesArray.push(pages.length);
                for (var j = 1; j <= pages.length; j++) {
                    p.push(0);
                    str += '<div class="item" id="thumb_' + (i + 1) + '_' + j + '">';
                    str += '<div class="lo_type">' + $(ref.tocXml).find('topics').find('topic').eq(i).find('pages').find('page').eq(j - 1).attr('type') + '</div>'
                    str += '<div class="lo_current_video">' + $(ref.tocXml).find('topics').find('topic').eq(i).find('pages').find('page').eq(j - 1).attr('heading') + '</div>';
                    str += '<div class="lo_title">' + $(ref.tocXml).find('topics').find('topic').eq(i).find('pages').find('page').eq(j - 1).find('title').text() + '</div>'
                    str += '<div class="lo_progress">'
                    str += '<div class="progress-bar w-0" id="myBar_' + (i + 1) + '_' + j + '"  role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>';
                    str += '</div>'
                    str += '<img class="img-fluid" src="./assests/images/skin/thumbnails/' + (isMobile.any() ? "mob/" : "") + (i + 1) + '_' + j + '.jpg">';
                    str += '<div class="video_completion_overlay">';
                    str += '<i class="fa fa-check-circle checkCircle"></i>'
                    str += '</div>';
                    str += '<div class="video_security_overlay">';
                    str += '<img class="desktop_tick security_tick" src="" alt="Locked Video"/>';
                    str += '<img class="mobile_tick security_tick" src="" alt="Locked Video"/>';
                    str += '</div>';
                    str += '</div>';
                }
                str += '</div>';
                str += '</section>';
            }
        } else {
            for (var i = 0; i < ref.totalTopics; i++) {
                str += '<section class="topic_container" id="topic_' + (i + 1) + '">';
                str += '<h2 class="topic_title_container">' + $(ref.tocXml).find('topics').find('topic').eq(i).children('title').text() + '</h2>';
                str += '<div class="owl-carousel" id="owl-' + (i + 1) + '">';
                var p = [];
                var pages = this.tocXml.find("topics topic:eq(" + i + ")").find("pages page");
                ref.eachTopicPagesArray.push(pages.length);
                for (var j = 1; j <= pages.length; j++) {
                    p.push(0);
                    str += '<div class="item" id="thumb_' + (i + 1) + '_' + j + '">';
                    str += '<div class="lo_type">' + $(ref.tocXml).find('topics').find('topic').eq(i).find('pages').find('page').eq(j - 1).attr('type') + '</div>'
                    str += '<div class="lo_current_video">' + $(ref.tocXml).find('topics').find('topic').eq(i).find('pages').find('page').eq(j - 1).attr('heading') + '</div>';
                    str += '<div class="lo_title">' + $(ref.tocXml).find('topics').find('topic').eq(i).find('pages').find('page').eq(j - 1).find('title').text() + '</div>'
                    str += '<div class="lo_progress">'
                    str += '<div class="progress-bar w-0" id="myBar_' + (i + 1) + '_' + j + '"  role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>';
                    str += '</div>'
                    str += '<img loading="lazy" class="img-fluid" src="./assests/images/skin/thumbnails/' + (isMobile.any() ? "mob/" : "") + (i + 1) + '_' + j + '.jpg">';
                    str += '<div class="video_completion_overlay">';
                    str += '<i class="icon ion-ios-checkmark-outline checkCircle"></i>'
                    str += '</div>';
                    str += '<div class="video_security_overlay">';
                    str += '<img class="desktop_tick security_tick" src="./assests/images/skin/security-icon.png" alt="Locked Video"/>';
                    str += '<img class="mobile_tick security_tick" src="./assests/images/skin/security-icon-m.png" alt="Locked Video"/>';
                    str += '</div>';
                    str += '</div>';
                }
                str += '</div>';
                str += '</section>';
            }
        }
        $('#topic_corousel').html(str);
    }

    // Function to load the course when the course first time run....BC
    Shell.prototype.courseXmlLoaded = function (xml) {
        var ref = this;
        ref.tocXml = $(xml);
        globalPopupData = $(xml).find("globalPopup");
        ref.showHideHeader(false);
        ref.setTopicPages();
        $("#slider").carousel({
            interval: false,
            keyboard: false
        });
        ref.attachEvents();
        ref.addGlobalContent();
        ref.addThumbnailCorousel();
        ref.loadGlossaryandResource(ref);
        ref.loadPopUp();
        ref.bookMarkPopup();

        ref.connectionPopupData();
        ref.sessionPopupData();
        lms.init();
        //
        var totalPagesLength = $(ref.tocXml).find('page').length;
        this.totalTopicLength = $(ref.tocXml).find('topic').length;

        for (var i = 0; i < totalPagesLength; i++) {
           if(window.globalConfig.isScorm && i==0){
            ref.courseProgressArray.push(1);
            ref.globalPageVisited.push(true)
           }else{
            ref.courseProgressArray.push(-1);
            ref.globalPageVisited.push(false)
           }


        }


        var obj = this.getLessonLocation();
        if(window.shell.accessiblityVersion==""){
            if(isLocalfileOrServer){
                $("#shellContainer").find("#accessibilitypopup").hide();
            }else{
                if(window.globalConfig.Isaccessiblity){
                    $("#shellContainer").find("#accessibilitypopup").hide();
                }else{
                    $("#shellContainer").find("#accessibilitypopup").css("display","flex");
                    setTimeout(function(){
                        $("#shellContainer").find("#accessibilitypopup").find(".accessibility-title span").eq(0).focus()
                    },150)
                }

            }

        }else{

             if(window.shell.accessiblityVersion=="true"){
                //
                this.curTopic = parseInt(obj.lesson);
            this.curPage = parseInt(obj.page);
              // For force Video seek bar starts
              shell.forceSeekbar = $(ref.tocXml).find('course').find('forceVideoSeekBar').text();
              // For force Video seek bar ends
              ref.NowPlayingFunctionlity(this.curTopic, this.curPage);
              ref.loadPage();
              $("#shellContainer").find("#accessibilitypopup").hide()
              }
              else{
                $("#shellContainer").find("#accessibilitypopup").hide()
              }
        }
        //alert(this.getLessonLocation())
        if (obj.lesson == "" || obj.lesson == "home" || obj.lesson == "help") {
            if ($(ref.tocXml).find('global').attr('require') == '1') {
                this.curTopic = 0;
                this.curPage = 1;
            } else {

                if (window.globalConfig.isScorm) {
                    this.curTopic = 1;
                    this.curPage = 2;
                } else {
                    this.curTopic = 1;
                    this.curPage = 1;
                }

            }
            // For force Video seek bar starts
            shell.forceSeekbar = $(ref.tocXml).find('course').find('forceVideoSeekBar').text();
            // For force Video seek bar ends
            ref.NowPlayingFunctionlity(this.curTopic, this.curPage);
            ref.loadPage();


        } else {
            //ref.bookMarkingEnabled = true;
            this.curTopic = parseInt(obj.lesson);
            this.curPage = parseInt(obj.page);
            if(window.shell.accessiblityVersion=="false"){
                ref.openBookmark()
            }else{
                if(window.globalConfig.Isaccessiblity){
                    ref.openBookmark()
                }
            }


        }

    }

    Shell.prototype.NowPlayingFunctionlity = function (curTopicRef, curPageRef) {

        $('.topic_container').find('.lo_current_video').hide();
        $('#thumb_' + curTopicRef + '_' + curPageRef).find('.lo_current_video').show();
    }
    Shell.prototype.getLessonLocation = function () {
        var lms_loc = lms.getBookmark();

        var obj = {
            lesson: "",
            page: ""
        };
        if (lms_loc != "" && lms_loc != "-1") {
            var arr = lms_loc.split("_");
            if (arr.length == 2) {
                obj.lesson = parseInt(arr[0]);
                obj.page = parseInt(arr[1]);
            } else {
                obj.lesson = arr[0];
                obj.page = 1;
            }
        }
        return obj;
    }

    Shell.prototype.getLessonPagesCount = function (lessonid) {
        var lesson = this.getLessonNode(lessonid);
        if (!lesson) return;
        return $(lesson).find("pages page").length;
    }


    Shell.prototype.getLessonNode = function (lessonid) {
        var node = null;
        switch (lessonid) {
            case "splash":
            case "help":
            case "home":
                node = null;
                break;
            default:
                node = this.tocXml.find("course topic:eq(" + (lessonid) + ")");
        }
        return node;
    }
    var occurrence = function (array) {
        "use strict";
        var result = {};
        if (array instanceof Array) { // Check if input is array.
            array.forEach(function (v, i) {
                if (!result[v]) { // Initial object property creation.
                    result[v] = [i]; // Create an array for that property.
                } else { // Same occurrences found.
                    result[v].push(i); // Fill the array.
                }
            });
        }
        return result;
    };

    // Function to update the score
    Shell.prototype.updateScore = function (userScore) {//UL Changes
        lms.setScore(userScore);
    }

    Shell.prototype.studentNameUpdate = function (name) {//UL Changes
        //
        lms.studentname(name)
    }
    Shell.prototype.studentIdUpdate = function (userId) {//UL Changes
        //
        lms.studentId(userId);
    }
// function to send User Interation data
Shell.prototype.userInteractionDataSet = function (correctans,userselect,type) {//UL Changes
    // Call function for interation data send to LMS
    lms.setInteractionData(correctans,userselect,type);
}



    // Function when the page is visited and page is complete
    Shell.prototype.updateVisitedPages = function (currTopicRef, currPageRef) {
        //
        ref = this;

        // for course progress
        //alert("updateVisitedPages called");

        window.shell.globalPageVisited[window.shell.curPage - 1] = true;
        if (ref.currentSlideNo == ref.courseProgressArray.length - 1) {
            $(".nextItext").hide()
            $(".nextItext").css('bottom', '0px')
        }
        else if($("#page_" + ref.curTopic + "_" + ref.curPage).hasClass('assessment')){
            $(".nextItext").hide()
        }
        else {
            if(window.shell.curPage - 1 ==1){
                $(".nextItext").hide()
            }else{
                $(".nextItext").show()
            }


        }
        if (GlobarProgressPages.length > 0) {
            ref.courseProgressArray = globalProgressArray;

        }
        if (ref.courseProgressArray[ref.currentSlideNo] < 0) {
            ref.courseProgressArray[ref.currentSlideNo] = 1;
        } else {

        }



        pageVistedforprogresslength = occurrence(ref.courseProgressArray)[1].length;
        if (ref.courseProgressArray.length == pageVistedforprogresslength) {
            lms.markComplete("completed");
        }
        var valeur = 0;
        if ($(this).attr('value') > valeur) {
            valeur = $(this).attr('value');
        }

        $("#page_" + currTopicRef + "_" + currPageRef).addClass("is-completed");
        $("#page_" + ref.curTopic + "_" + ref.curPage).removeClass("visited")

        valeur = Math.round((parseInt(pageVistedforprogresslength) / parseInt(ref.courseProgressArray.length)) * 100);
        $('.course_progress').find('.progress-bar').css('width', valeur + '%').attr('aria-valuenow', valeur);
        $('.courseProgressperc').html(valeur + '%');
        $('#thumb_' + currTopicRef + '_' + currPageRef).find('.video_completion_overlay').show();
        $('#thumb_' + currTopicRef + '_' + currPageRef).find('.progress-bar').css('width', '100%').attr('aria-valuenow', 100);
        //console.log("global visited pages are " + GlobalVisitedPages)
        if (GlobalVisitedPages != '') {
            ref.visitedPages = GlobalVisitedPages.split(',')
        }
        var topicPage = currTopicRef + "_" + currPageRef;
        if (ref.searchNum(topicPage, ref.visitedPages) == -1) {

            ref.visitedPages[ref.currentSlideNo] = topicPage;
            GlobalVisitedPages = ref.visitedPages.toString();
        }
        //alert("visited pages after search no " + ref.visitedPages)
        //

        var len = ref.visitedPages.length;
        var suspendString = '';
        if (len > 0) {
            ref.suspendString = ref.visitedPages.toString() + '+' + ref.courseProgressArray.toString()+'+'+ window.shell.accessiblityVersion.toString()+'+'+window.shell.certificateDate.toString();
            //alert("suspend string is " + ref.suspendString)
        }
        //alert("update visited pages lms object " + typeof lms)
        lms.setSuspendData(ref.suspendString);

    }


    Shell.prototype.searchNum = function (num, arr) {
        var len = arr.length;
        for (var i = 0; i < len; i++) {
            if (num == arr[i]) {
                return 1;
            }
        }
        return -1;
    }

    // Function to Load the Perticular Page
    Shell.prototype.loadPage = function () {

        ref = this;
        // console.log("%c WHO AM I?","font-size:50px")
        $('body').removeClass('activityOpened');

        if (ref.courseFlag == false) {
            //alert("11111");
            ref.courseFlag = true;
        } else {
            //alert("2222");
            $('#info_icon').addClass('disable');
        }

        $('.nicescroll-rails').each(function () {
            $(this).hide();
        })
        //alert("2222222222")
        ref.prevNavControlsHandler = "shell";
        ref.nextNavControlsHandler = "shell";
        var index = $("#slider .carousel-inner .carousel-item[data-topic='" + ref.curTopic + "'][data-page='" + ref.curPage + "']").index();




        ref.screenType = $(ref.tocXml).find('topic').eq(ref.curTopic - 1).find('page').eq(ref.curPage - 1).attr('type').toLowerCase();
        var thumbnail = $(ref.tocXml).find('topic').eq(ref.curTopic - 1).find('page').eq(ref.curPage - 1).find('thumbnail').text();


        ref.currentSlideNo = index;
        globalCurTopic = ref.curTopic;
        globalCurPage = ref.curPage;
        this.NowPlayingFunctionlity(ref.curTopic, ref.curPage);
        var layout = this.whichLayoutNeedToLoad(ref.curPage);

        var templateurl = this.currenttemplateUrl = ref.getTemplateURL(ref.curTopic, ref.curPage, layout);
        var pageUrl = this.currentPageUrl = ref.getPageURL(ref.curTopic, ref.curPage, layout);
        $('#infoBox, .videoBlocker').hide();
        $("#info_icon").find('i').removeClass('ion-ios-close-outline').addClass('ion-ios-information-outline');
        ref.supportFilesLoaded();
        if (ref.screenType == "activity" || ref.screenType == "actividad") {
            $('.last_viewed').html($(ref.tocXml).find('topic').eq(ref.curTopic - 1).find('page').eq(ref.curPage - 1).attr('heading'));
            if (isMobile.any() && ($(window).width() < 550 || $(window).height() < 550)) {
                //alert(thumbnail)
                if (thumbnail != "") {
                    $("#page_" + ref.curTopic + "_" + ref.curPage).html("<div class='btn btn-info custom-btn activity'>Start the activity</div><img src='" + "./images/" + thumbnail + "' class='img-fluid' />");

                    //$('.activity').find('img').load(function(){
                    //$("#page_" + ref.curTopic + "_" + ref.curPage).find('.placeHolderImage').hide();
                    //})

                    var resourceLength = $(ref.tocXml).find('topic').eq(ref.curTopic - 1).find('page').eq(ref.curPage - 1).find('resources').length;
                    if (resourceLength > 0) {
                        var resourcesText = $(ref.tocXml).find('topic').eq(ref.curTopic - 1).find('page').eq(ref.curPage - 1).find('resources').text();
                        $('#contentTab_1').html(resourcesText)
                    } else {
                        $('#contentTab_1').html('<p>There are no resources in this topic.</p>');
                    }

                    var transcriptLength = $(ref.tocXml).find('topic').eq(ref.curTopic - 1).find('page').eq(ref.curPage - 1).find('transcript').length;
                    if (transcriptLength > 0) {
                        var transcriptText = $(ref.tocXml).find('topic').eq(ref.curTopic - 1).find('page').eq(ref.curPage - 1).find('transcript').text();
                        $('#contentTab_2').html(transcriptText)
                    } else {
                        $('#contentTab_2').html('<p>There is no transcript in this activity.</p>');
                    }
                    $('#activity_container').html('');
                    //ref.unloadAllPages();
                    $("#page_" + ref.curTopic + "_" + ref.curPage).find('img,.activity').off('click').on('click', $.proxy(ref.activityLoading, null, ref));
                    setTimeout(function () {
                        $("#slider").carousel(index);


                        $("#page_" + ref.curTopic + "_" + ref.curPage).find('.placeHolderImage').hide();
                        $('.topic_title').html(ref.tocXml.find("topics topic").eq(ref.curTopic - 1).find('page').eq(ref.curPage - 1).find('title').text());

                    }, 300);

                    //updated code for i disable fix
                    if (ref.prevPage == (ref.curTopic + "_" + ref.curPage)) {
                        $('#info_icon').removeClass('disable');
                    }
                    //updated code for i disable fix ends

                    if (ref.currentSlideNo == 0 || ref.currentSlideNo == 1) {

                        ref.enableDisablePrev(false);
                        return;
                    }
                    $("#slider").on("slid.bs.carousel", function () {

                        //alert("sdsdsdsdsdsds")

                        ref.enableDisableNext(true);
                        ref.enableDisablePrev(true);

                        $('#info_icon').removeClass('disable');

                        if (ref.currentSlideNo == ref.courseProgressArray.length - 1) {
                            ref.enableDisableNext(false);
                            $(".nextItext").hide()
                            $(".nextItext").css('bottom', '0px')
                            return;
                        }
                        //alert(ref.currentSlideNo);

                        if (ref.currentSlideNo == 0 || ref.currentSlideNo == 1) {

                            ref.enableDisablePrev(false);
                            return;
                        }

                    });
                    return;
                }
            }
        } else {
            $('.last_viewed').html($(ref.tocXml).find('topic').eq(ref.curTopic - 1).find('page').eq(ref.curPage - 1).attr('heading'));
            $('#info_icon').show();
        }
        //alert("33333")
        var template = ref.getTemplateName(ref.curTopic, ref.curPage, layout);

        $("#page_" + ref.curTopic + "_" + ref.curPage).addClass(template + " " + layout);
        var dependencyFiles = [
            "text!" + pageUrl + "/index.html",
            templateurl + "/scripts/" + template,
            "css!" + templateurl + "/styles/" + template
        ];

        /// Function for Require File get and remover current instance for the slide and Append current slide
        require(dependencyFiles, function (templateHtml, templateObj) {
            if (isLocalfileOrServer == true) {
                PageContent = function (data) {
                    templateHtml = data;
                    if (ref.templateInstance != null) {
                        if (ref.templateInstance.destroy) {
                            ref.templateInstance.destroy();
                        }
                        delete ref.templateInstance;
                    }
                    ref.templateInstance = new templateObj();
                    //$("#page_" + ref.curTopic + "_" + ref.curPage).html('');
                    //alert("working")
                    $("#page_" + ref.curTopic + "_" + ref.curPage).html(templateHtml);
                    $('#coursePreloader').hide();
                    setTimeout(function(){
                        //
                        if(ref.globalPageVisited[ref.curPage-1] == true){
                            if(ref.currentSlideNo==1){
                                $(".nextItext").hide();
                            }else{
                                if($("#page_" + ref.curTopic + "_" + ref.curPage).hasClass('assessment')){
                                    $(".nextItext").hide();
                                }else{
                                    $(".nextItext").show();
                                }
                            }
                            if($(".btnNext").attr("style")){
                                $(".btnNext").removeAttr("style");

                            }else{
                                $(".btnNext").css("pointer-events","all");
                                $(".btnNext").css("opacity","1");
                            }

                        }

                        $("#slider").carousel(index);
                         if (GlobalVisitedPages.indexOf(ref.curTopic + "_" + ref.curPage) > -1) {
                            $("#page_" + ref.curTopic + "_" + ref.curPage).addClass('is-completed');
                         }

                        $("#shellFooter").find("#totalTopic").text($(ref.tocXml).find('topic').find('page').length - 2)
                        $("#shellFooter").find("#currentPageTopic").text(ref.curPage - 2)

                        $('.topic_title').html(ref.tocXml.find("topics topic").eq(ref.curTopic - 1).find('page').eq(ref.curPage - 1).find('title').text())
                        $("#page_" + ref.curTopic + "_" + ref.curPage).addClass("visited")
                        }, 200);


                        //updated code for i disable fix
                            if(ref.prevPage == (ref.curTopic + "_" + ref.curPage)){
                                $('#info_icon').removeClass('disable');
                            }
                            //updated code for i disable fix ends


                        $("#slider").on("slid.bs.carousel", function() {




                          ref.unloadAllPages();

                            $('#info_icon').removeClass('disable');
                            ref.enableDisableNext(true);
                            ref.enableDisablePrev(true);
                            //alert("lms object is " + typeof lms)
                            ref.enableDisableHeaderFooter(ref.currentSlideNo)
                            lms.unloadCourse();



                            if (ref.currentSlideNo == ref.courseProgressArray.length - 1) {
                                if($("#page_" + ref.curTopic + "_" + ref.curPage).hasClass("assessment")){
                                    $(".nextItext").hide();
                                    ref.enableDisableNext(false);                                    
                                    return;
                                }else{
                                $(".nextItext").hide();
                                ref.enableDisableNext(false);
                                return;
                                }

                            }

                            if (ref.currentSlideNo == 0) {

                                ref.enableDisableHeaderFooter(ref.currentSlideNo)
                                ref.enableDisablePrev(false);
                                return;
                            }

                            $("#page_" + ref.curTopic + "_" + ref.curPage).find('.placeHolderImage').hide();


                            //assessment


                        });
                        var pageXmlName = pageUrl.split('/')[1];
                        //alert(pageXmlName)
                        ref.templateInstance.init(pageXmlName);
                        if (ref.currentSlideNo == 0) {

                            ref.enableDisableHeaderFooter(ref.currentSlideNo)
                            ref.enableDisablePrev(false);
                            return;
                        }

                }
                var topicscript = document.createElement('script');
                topicscript.src = pageUrl + "/index.js",
                    document.getElementsByTagName('head')[0].appendChild(topicscript)
            }
            else {
                if (ref.templateInstance != null) {
                    if (ref.templateInstance.destroy) {
                        ref.templateInstance.destroy();
                    }
                    delete ref.templateInstance;
                }
                ref.templateInstance = new templateObj();
                //$("#page_" + ref.curTopic + "_" + ref.curPage).html('');
                //alert("working")

                $("#page_" + ref.curTopic + "_" + ref.curPage).html(templateHtml);



                $('#coursePreloader').hide();
                setTimeout(function(){
                    //

                    if(ref.globalPageVisited[ref.curPage-1] == true){
                        if(ref.currentSlideNo==1){
                            $(".nextItext").hide();
                        }else{
                            if($("#page_" + ref.curTopic + "_" + ref.curPage).hasClass('assessment')){
                                $(".nextItext").hide();
                            }else{
                                $(".nextItext").show();
                            }
                        }
                        if($(".btnNext").attr("style")){
                            $(".btnNext").removeAttr("style");

                        }else{
                            $(".btnNext").css("pointer-events","all");
                            $(".btnNext").css("opacity","1");
                        }

                    }
                    $("#slider").carousel(index);

                    if( window.shell.accessiblityVersion==true){
                        setTimeout(function(){
                            $("#shellContainer").find("#accessibilitypopup").hide()
                        }, 200)
                    }
                     if (GlobalVisitedPages.indexOf(ref.curTopic + "_" + ref.curPage) > -1) {
                        $("#page_" + ref.curTopic + "_" + ref.curPage).addClass('is-completed');
                    }
                    $("#shellFooter").find("#totalTopic").text($(ref.tocXml).find('topic').find('page').length - 2)
                    $("#shellFooter").find("#currentPageTopic").text(ref.curPage - 2)

                    $('.topic_title').html(ref.tocXml.find("topics topic").eq(ref.curTopic - 1).find('page').eq(ref.curPage - 1).find('title').text())
                    }, 200);
                    $("#page_" + ref.curTopic + "_" + ref.curPage).addClass("visited")
                    //updated code for i disable fix
                        if(ref.prevPage == (ref.curTopic + "_" + ref.curPage)){
                            $('#info_icon').removeClass('disable');
                        }
                        //updated code for i disable fix ends


                    $("#slider").on("slid.bs.carousel", function() {




                      ref.unloadAllPages();

                        $('#info_icon').removeClass('disable');
                        ref.enableDisableNext(true);
                        ref.enableDisablePrev(true);
                        //alert("lms object is " + typeof lms)
                        ref.enableDisableHeaderFooter(ref.currentSlideNo)
                        lms.unloadCourse();


                        if (ref.currentSlideNo == ref.courseProgressArray.length - 1) {
                            if($("#page_" + ref.curTopic + "_" + ref.curPage).hasClass("assessment")){
                                $(".nextItext").hide();
                                ref.enableDisableNext(false);                                
                                return;
                            }else{
                            $(".nextItext").hide();
                            ref.enableDisableNext(false);
                            return;
                            }

                        }

                        if (ref.currentSlideNo == 0) {

                            ref.enableDisableHeaderFooter(ref.currentSlideNo)
                            ref.enableDisablePrev(false);
                            return;
                        }

                        $("#page_" + ref.curTopic + "_" + ref.curPage).find('.placeHolderImage').hide();


                        //assessment


                    });
                    var pageXmlName = pageUrl.split('/')[1];
                    //alert(pageXmlName)
                    ref.templateInstance.init(pageXmlName);
                    if (ref.currentSlideNo == 0) {

                        ref.enableDisableHeaderFooter(ref.currentSlideNo)
                        ref.enableDisablePrev(false);
                        return;
                    }
            }
        });
    }
    // Function to load Support file
    Shell.prototype.supportFilesLoaded = function () {

        var ref = this;

        if (window.globalConfig.isScorm) {
            ref.enableDisableloginPrevNextBtn(true)

        }
        else {

            $('.main_container, .video_heading, #shellContainer_content_box, #shellHeader').show();
        }

        if (window.globalConfig.isResourceEnabel == true) {
            $("#shellFooter").find("[data-type='resource']").show()
        }
        else {
            $("#shellFooter").find("[data-type='resource']").hide()
        }
        if (window.globalConfig.isGlossaryEnable == true) {
            $("#shellFooter").find("[data-type='glossary']").show()
        }
        else {
            $("#shellFooter").find("[data-type='glossary']").hide()
        }
        if (window.globalConfig.isMenuBtnEnable == true) {
            $("#shellFooter").find("[data-type='menu']").show()
        }
        else {
            $("#shellFooter").find("[data-type='menu']").hide()
        }


        // $('.nicescroll-rails').each(function(){
        // $(this).hide();
        // })
    }

    // Function to load TOC activity
    Shell.prototype.activityLoading = function () {
        //alert("working")
        //Mark is completed activity
        $(".activity_container").removeClass('is-completed')
        if ($("#page_" + ref.curTopic + "_" + ref.curPage).hasClass('is-completed')) {
            $(".activity_container").addClass('is-completed')
        }
        var layout = ref.whichLayoutNeedToLoad();
        $('body').addClass('activityOpened');
        var templateurl = this.currenttemplateUrl = ref.getTemplateURL(ref.curTopic, ref.curPage, layout);
        var pageUrl = this.currentPageUrl = ref.getPageURL(ref.curTopic, ref.curPage, layout);
        var template = ref.getTemplateName(ref.curTopic, ref.curPage, layout);
        $(".activity_container").addClass(template + " " + layout);
        var dependencyFiles = [
            "text!" + pageUrl + "/index.html",
            templateurl + "/scripts/" + template,
            "css!" + templateurl + "/styles/" + template
        ];
        require(dependencyFiles, function (templateHtml, templateObj) {
            if (ref.templateInstance != null) {
                if (ref.templateInstance.destroy) {
                    ref.templateInstance.destroy();
                }
                delete ref.templateInstance;
            }
            ref.templateInstance = new templateObj();
            //ref.unloadAllPages();
            $(".activity_container").html(templateHtml);
            $(".activity_container").show();
            $('.fixed_block').hide();
            $('#shellContainer_content_box').addClass("changingPadding");
            ref.supportFilesLoaded();
            var pageXmlName = pageUrl.split('/')[1];
            //alert(pageXmlName)
            ref.templateInstance.init(pageXmlName);
        });
    }
    //function
    Shell.prototype.showHidePreloader = function () {

        var ref = this;
        if (!ref.isLoading && !ref.isPageTrans) {
            $("#preloader").hide();
        } else {
            $("#preloader").show();
        }
    }

    // Set loader
    Shell.prototype.setLoading = function (bool) {

        var ref = this;
        ref.isLoading = bool;
        ref.showHidePreloader();
    }

    // function for slide information
    Shell.prototype.slideinfo = function (ref, e) {
        e.preventDefault();
        $this = $(e.currentTarget);
        $parent = $this.closest('.main_container');
        if ($("#info_icon").hasClass('disable')) {
            return;
        }
        if ($("#info_icon").find('i').hasClass('ion-ios-close-outline')) {
            $('.videoBlocker').hide();
            $('#infoBox').hide();
            $("#info_icon").find('i').addClass("ion-ios-information-outline");
            $("#info_icon").find('i').removeClass('ion-ios-close-outline');


            $parent.find('video:visible').each(function (i, v) {
                var vidDuration = $(v).prop('duration');
                var currentTime = $(v).prop('currentTime');
                if (vidDuration !== currentTime && currentTime !== 0) {
                    v.play();
                }
            });

        } else {
            $('.videoBlocker').show();
            $('#infoBox').show();
            $("#info_icon").find('i').removeClass("ion-ios-information-outline");
            $("#info_icon").find('i').addClass('ion-ios-close-outline');
            $parent.find('video:visible').each(function (i, v) {
                var vidDuration = $(v).prop('duration');
                var currentTime = $(v).prop('currentTime');
                if (vidDuration >= currentTime) {
                    v.pause();
                }
            });
        }
        $('#infoBox').find('li').removeClass('selected');
        $('#infoBox').find('li').eq(0).addClass('selected');
        // $('#infoBox').find('#contentTab_1').show();
        // $('#infoBox').find('#contentTab_2').hide();
        $('a[href="#contentTab_1"]').tab('show');
        setTimeout(function () {
            if (!$('html').hasClass('is-mobile')) {
                !$('.info_box .tab-content').getNiceScroll().length && ref.attachScrollBar2('.info_box .tab-content', '8px');
                $('.info_box .tab-content').getNiceScroll().show();
            }
        }, 50)
    }

    Shell.prototype.selectTabinsideInfo = function () {
        // var infoTabId = $(this).attr('id').split('_')[1];
        $(this).closest('.nav').find('li').removeClass('selected');
        $(this).closest('li').addClass('selected');
        setTimeout(function () {
            // $('.info_box .tab-content').getNiceScroll().show();
            $('.info_box .tab-content').getNiceScroll().resize();
        }, 50)
    }

    // Add Global event function
    Shell.prototype.attachEvents = function () {
        var ref = this;
        $("#navBtnHolder .btnBack").bind('click', $.proxy(ref.setPrevPage, null, ref));
        $("#navBtnHolder .btnNext").bind('click', $.proxy(ref.setNextPage, null, ref));
        $(".start").bind('click', $.proxy(ref.setNextPage, null, ref));
        $("#login-btn").bind('click', $.proxy(ref.setNextPage, null, ref));
        $(".popupBtn").off().on('click', $.proxy(ref.openGlossaryResourcePopup, null, ref));
        $(".openPdf").off().on('click', $.proxy(ref.openPdf, null, ref));
        $(".menuBtn").off().on("click", $.proxy(ref.openMenuPopup, null, ref));
        $(".exit-btn").off().on('click', $.proxy(ref.openExitPopup, null, ref));
        $(".exit-popup-btn").off().on('click', $.proxy(ref.CloseExitPopup, null, ref));
        $(".accessibility-popup-btn").bind('click', $.proxy(ref.openCloseaccessibilityPopup, null, ref));
        $(".bookmarkpoup-popup-btn").bind('click', $.proxy(ref.openCloseBookmarkPopup, null, ref));
        $('#infoBox').find('.nav').find('a').off('click').on('click', $.proxy(ref.selectTabinsideInfo, null, ref));
        $('#info_icon').bind('click', $.proxy(ref.slideinfo, null, ref))
        $('.redirecttoslide').bind('click', $.proxy(ref.redirectToSlide, null, ref))
        $(".resource-close, .glossary-close, .menu-close").off().on('click', $.proxy(ref.closeGlossaryResourcePopup, null, ref));
        $(".connecton-close-btn").bind('click', $.proxy(ref.closeConnnectionPopup, null, ref));
        $(".session-close-btn").bind('click', $.proxy(ref.closesessionPopup, null, ref));

        $(".home-btn").bind('click', function () {
            ref.openCloseToc(ref, null, "close");
            ref.openCloseTranscript(ref, null, "close");
            ref.setPage(0, 2);
        });
        $(".course-title-btn").bind('click', function () {
            ref.openCloseToc(ref, null, "close");
            ref.openCloseTranscript(ref, null, "close");
            ref.setPage(0, 1);

        });



        $(".help-btn").bind('click', function () { });
        $(".toc-menu").bind('click', $.proxy(ref.openCloseToc, null, ref));
        $(".transcript-menu").bind('click', $.proxy(ref.openCloseTranscript, null, ref));
        $(".toc-topic").bind("click", function () {
            ref.setTopic(parseInt($(this).attr("data-topic"), 10));
        });
        //alert(isMobile.any())
        if (isMobile.any()) {
            $('body').addClass("showingControls");
        } else {
            $("#shellContainer").hover(function () {
                $('body').addClass("showingControls");
                $('body').addClass("seekbaron");
            }, function () {
                $('body').removeClass("showingControls");
                $('body').removeClass("seekbaron");
            });
        }
        $(document).click(function (event) {
            if ($(".toc-menu").hasClass("opened")) {
                ref.openCloseToc(ref, event, "close");
            }
            if ($(".transcript-menu").hasClass("transcript-opened")) {
                ref.openCloseTranscript(ref, event, "close");
            }
        });
        $('#blocker').click(function (event) {
            if ($(".toc-menu").hasClass("opened")) {
                ref.openCloseToc(ref, event, "close");
            }
            if ($(".transcript-menu").hasClass("transcript-opened")) {
                ref.openCloseTranscript(ref, event, "close");
            }
        });



        $('.videoBlocker').click(function () {
            $('#info_icon').click();
        });
        var options = {
            dragLockToAxis: false,
            dragBlockHorizontal: false
        };
        var element = document.getElementById('slider');
        if (isMobile.any()) {
            //code is commented because this code is for swipe event for mobiles ------------- donot delete...........
            //var hammertime = new Hammer(element, options);
            //var hammertime = Hammer(element).on("dragleft  swipeleft", function (event) {
            // if (event.target.className == 'thumbImage' || event.target.className == 'owl-stage') {
            // return;
            // }
            // if ($('html').hasClass('mejs__fullscreen')) {
            // return;
            // }
            // ref.setNextPage(ref);
            // });
            // var hammertime2 = Hammer(element).on("dragright  swiperight", function (event) {
            // if (event.target.className == 'thumbImage' || event.target.className == 'owl-stage') {
            // return;
            // }
            // if ($('html').hasClass('mejs__fullscreen')) {
            // return;
            // }
            // ref.setPrevPage(ref);
            // });
        }
    }

    //
    Shell.prototype.markCompleted = function () {
        var ref = this;
        if (ref.visitedPages.indexOf(ref.curPage) == -1) {
            ref.visitedPages.push(ref.curPage);
        }
        ref.enableDisableNext(true);
    }

    // Function move to back page
    Shell.prototype.setPrevPage = function (ref, e) {

        $(".nextItext").css("bottom","0px");
        if (isLocalfileOrServer!=true) {
            ref.checkhostReachable();
            if(onLineFlag=="offline"){
                return;
            }
        }
            if (!ref.isPrevEnabled || this.isLoading || this.isPageTrans) {
                return;
            }
            ref.enableDisablePrev(false);
            if (ref.curTopic == 1 && ref.curPage == 1) {
                ref.prevPage = ref.curTopic + "_" + ref.curPage;
                ref.curPage = 1;
                ref.curTopic = 0;
                //$('.topic_title').html(ref.tocXml.find("global").find('title').text())
                ref.loadPage();
                return;
            }
            //alert(ref.curTopic + " ::: " + ref.curPage)
            if (ref.curPage > 1) {
                ref.prevPage = ref.curTopic + "_" + ref.curPage;
                ref.curPage--;
                //$('.topic_title').html(ref.tocXml.find("topics topic").eq(ref.curTopic - 1).find('page').eq(ref.curPage - 1).find('title').text())
                ref.loadPage();
            } else {

                ref.prevPage = ref.curTopic + "_" + ref.curPage;
                ref.curPage = ref.eachTopicPagesArray[ref.curTopic - 2];
                ref.curTopic--;
                //$('.topic_title').html(ref.tocXml.find("topics topic").eq(ref.curTopic - 1).find('page').eq(ref.curPage - 1).find('title').text())
                ref.loadPage();
            }

    }



    // Resource and Glossary
    Shell.prototype.loadGlossaryandResource = function (ref) {
        ResourcePageContent = function (data) {
            var parser1 = new DOMParser();
            ResorurceDataCollect = parser1.parseFromString(data, 'text/xml');
            ref.resourceData = $(ResorurceDataCollect).find("resourcePopupItem item")
        }
        var resourceScript = document.createElement('script');
        resourceScript.src = 'global_files/scripts/resource.js',
            document.getElementsByTagName('head')[0].appendChild(resourceScript)



        GlossaryPageContent = function (data) {
            var parser2 = new DOMParser();
            var GlossaryDataCollect = parser2.parseFromString(data, 'text/xml')
            ref.glossaryData = $(GlossaryDataCollect).find("glossaryPopupItem item")
        }
        var glossaryScript = document.createElement('script');
        glossaryScript.src = 'global_files/scripts/glossary.js',
            document.getElementsByTagName('head')[0].appendChild(glossaryScript)
    }





    //function to open glossary resource and Menu popup
    Shell.prototype.openGlossaryResourcePopup = function (ref, e) {

        if (isLocalfileOrServer!=true) {
            ref.checkhostReachable();
            if(onLineFlag=="offline"){
                return;
            }
        }
            console.log("event working")
            e.preventDefault();
            popuptype = $(e.currentTarget).attr("data-type");
            $("#shellContainer").find("#" + popuptype).show();
            ref.attachEvents()
            ref.isVideoAudioPlayPauseGlobally()
    }
    Shell.prototype.openPdf=function(ref,e){

        if (isLocalfileOrServer!=true) {
            ref.checkhostReachable();
            if(onLineFlag=="offline"){
                return;
            }
        }
        var url=$(this).attr("pdf-url");
        //window.open(url,'_blank');
        $(this).attr('href', url);
        $(this).attr('target', "_blank");
        var that=$(this)
        setTimeout(function(){
            that.attr('href', "javascript:void(0)");
            that.removeAttr("target")
        }, 20)

    }




    //Funtion to Retun where the is online or offline
    Shell.prototype.hostReachable = function () {
        return navigator.onLine;
    }


    // function is check to the internet connetion is on or not
    Shell.prototype.checkhostReachable = function () {
        var ref = this;
        if (ref.hostReachable()) {
            onLineFlag = "online";
        } else {
            onLineFlag = "offline";
            ref.openConnectionPopup()

        }
    }

    // All popup data bind and Load
    Shell.prototype.loadPopUp = function () {

        //Exit popup data Load
        $("#shellContainer").find("#exitpopup").find(".bodyIcon").attr("src", globalPopupData.find("exitPopup icon").text())

        $("#shellContainer").find("#exitpopup").find(".exit-title").text(globalPopupData.find("exitPopup heading").text())

        $("#shellContainer").find("#exitpopup").find(".img-text p").text(globalPopupData.find("exitPopup content").text())
        var str = '';
        $.each($(globalPopupData.find("exitPopup btnText btn")), function (k, v) {
            str += '<a href="#" type="button" class="exit-popup-btn" data-btn=' + $(v).attr("data-btn") + '>' + $(v).text() + '</a>';
        })
        $("#shellContainer").find("#exitpopup").find(".exit-btn-container").empty().append(str)
        //Exit popup data Load
        // orientation popup data
        $("#shellContainer").find("#orientationpopup").find(".bodyIcon").attr("src", globalPopupData.find("orientationPopup icon").text())

        $("#shellContainer").find("#orientationpopup").find(".orientation-title").text(globalPopupData.find("orientationPopup heading").text())

        $("#shellContainer").find("#orientationpopup").find(".img-text p").text(globalPopupData.find("orientationPopup content").text())
        // orientation popup data

          // accessibility popup data

         // accessibility popup data
        $.each($(globalPopupData.find("accessibilityPopup content")), function (k, v) {
            $("#shellContainer").find("#accessibilitypopup").find(".img-text p").eq(k).html(globalPopupData.find("accessibilityPopup content").eq(k).text())

            // $("#shellContainer").find("#accessibilitypopup").find(".bodyIcon").eq(k).attr("src", globalPopupData.find("accessibilityPopup icon").eq(k).text())
        })

        $("#shellContainer").find("#accessibilitypopup").find(".accessibility-title").html(globalPopupData.find("accessibilityPopup heading").text())


        var str1 = '';
        $.each($(globalPopupData.find("accessibilityPopup btnText btn")), function (k, v) {
            str1 += '<a href="#" role="button" type="button" class="accessibility-popup-btn" tabindex=' + $(v).attr("tabindex") +' data-btn=' + $(v).attr("data-btn") + '>' + $(v).text() +'</a>';
        })

        $("#shellContainer").find("#accessibilitypopup").find(".accessibility-btn-container").empty().append(str1)
        // accessibility popup data



        //Glossary popup data Load
        var restr = '';
        $.each(globalPopupData.find("glossaryPopupItem item"), function (k, v) {
            restr += '<tr>\
        <td aria-label="" tabindex="0">'+ $(v).find("title").text() + '</td> <td aria-label="" tabindex="0">' + $(v).find("description").text() + '</td>\
        </tr>';
        })
        $("#shellContainer").find("#glossary").find(".table tbody").empty().append(restr)
        //Glossary popup data Load End




        //Resource popup data Load
        var glostr = '';
        $.each(globalPopupData.find("resourcePopupItem item"), function (k, v) {
            glostr += '<tr>\
            <td><a href="javascript:void(0)" class="openPdf" pdf-url='+ $(v).find("url").text() +'> <img src="assests/images/ResourceRef.png"> ' + $(v).find("title").text() + '</a></td>\
         </tr>';
        })

        $("#shellContainer").find("#resource").find(".table tbody").empty().append(glostr)
        //Resource popup data Load End





    }


    //check globally where the audio vd=ideo is playing or not if play then pause when the popup is open
    Shell.prototype.isVideoAudioPlayPauseGlobally = function () {

        if ($("#shellContainer").find(".active").find("video").length == 1 || $("#shellContainer").find(".active").find("audio").length == 1) {

            if ($("#shellContainer").find(".active").find(".media-wrapper").find(".mejs__overlay-button").attr("aria-pressed") == "false") {
                globalisPlaying = false;
                $("#shellContainer").find(".active").find("video")[0].pause()
            }


            if (globalisPlaying == true) {

                if ($("#shellContainer").find(".active").find("video")[0].paused) {
                    $("#shellContainer").find(".active").find("video")[0].play()
                }
                else {
                    $("#shellContainer").find(".active").find("video")[0].pause()
                }
            }

            else {
                $("#shellContainer").find(".active").find("video")[0].pause()
            }

        }
    }

    //function to open exit and connection popup and append data to run time
    Shell.prototype.openExitPopup = function (ref, e) {
       if (isLocalfileOrServer!=true) {
        window.shell.checkhostReachable()

        if(onLineFlag=="offline"){
            $("#shellContainer").find("#exitpopup").css("display", "flex")
            ref.isVideoAudioPlayPauseGlobally()
         }else{
            $("#shellContainer").find("#exitpopup").css("display", "flex")
            ref.isVideoAudioPlayPauseGlobally()
         }
       }else{
        $("#shellContainer").find("#exitpopup").css("display", "flex")
        ref.isVideoAudioPlayPauseGlobally()
       }
                
        if(window.shell.accessiblityVersion==true || window.shell.accessiblityVersion=="true"){
            setTimeout(function(){
                $("#shellContainer").find("#exitpopup").find(".exit-title").focus()
            }, 100)
        }

       //ref.attachEvents();
    }


    //Close exit or connection popup
    Shell.prototype.CloseExitPopup = function (ref, e) {


        var popupData = $(ref.xml);
        ref.isVideoAudioPlayPauseGlobally()
        e.preventDefault();
        let btntype = $(e.currentTarget).attr("data-btn");

        //If the yesy button is click then close the browser
        if (btntype == "yes") {
            window.shell.isExitPopupbtnClick=true;
            console.log("exit")
            window.parent.close()
        } else {
            //

            $("#shellContainer").find("#" + btntype).hide()
        }
    }



    //Close exit or accessibility-popup popup
    Shell.prototype.openCloseaccessibilityPopup = function (ref, e) {
        //

        if (isLocalfileOrServer!=true) {
            window.shell.checkhostReachable()
            if(onLineFlag=="offline"){
                return
              }
            }
        var popupData = $(ref.xml);
        // ref.isVideoAudioPlayPauseGlobally()
        e.preventDefault();
        let btntype = $(e.currentTarget).attr("data-btn");
        //If the yesy button is click then close the browser
        if (btntype == "accessibile") {
            this.isaccessibile = "accessibile";
            console.log(this.isaccessibile)
            var assessmentPageIndex;
            $(".carousel-inner").find(".carousel-item").each(function(k,v){
                if($(v).attr("data-value")=="assessment"){
                    assessmentPageIndex=k + 1;
                }
            })

            window.shell.accessiblityVersion=true;
            window.shell.updateVisitedPages(ref.curTopic, ref.curPage);

            ref.prevPage = ref.curTopic + "_" + ref.curPage;
            ref.curPage = assessmentPageIndex;

            ref.loadPage();

        } else {
            //
            window.shell.accessiblityVersion=false;

            window.shell.updateVisitedPages(ref.curTopic, ref.curPage);
            $("#shellContainer").find("#accessibilitypopup").hide()
            document.onkeydown = function (e) {
                //
                if (e.keyCode == 32 || e.keyCode == 13 || e.keyCode == 9 || e.keyCode == 116 || e.keyCode == 18 || e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40) {
                    return false;
                }
            }
            console.log("standard")
        }
        // console.log(this.isaccessibile)
    }

    //

    //function to open exit and connection popup and append data to run time
    Shell.prototype.openBookmark = function () {

        $("#shellContainer").find("#bookmarkpoup").css("display", "flex")
        //ref.isVideoAudioPlayPauseGlobally()
        this.attachEvents();
    }

    Shell.prototype.openCloseBookmarkPopup = function (ref, e) {
        //var ref =this
        if (isLocalfileOrServer != true) {
            window.shell.checkhostReachable()
            if (onLineFlag == "offline") {
                return;
            }
        }
        ref.curTopic
        ref.curPage
        e.preventDefault();
        let btntype = $(e.currentTarget).attr("data-btn");
        //If the yesy button is click then close the browser
        if (btntype == "yes") {
            // For force Video seek bar starts
            shell.forceSeekbar = $(ref.tocXml).find('course').find('forceVideoSeekBar').text();
            // For force Video seek bar ends
            ref.NowPlayingFunctionlity(ref.curTopic, ref.curPage);
            ref.loadPage();
            $("#shellContainer").find("#bookmarkpoup").css("display", "none")
        } else {

            ref.curTopic = 1;
            ref.curPage = 2;
            //alert( this.curTopic +"______"+  this.curPage)
            ref.NowPlayingFunctionlity(ref.curTopic, ref.curPage);
            ref.loadPage();
            $("#shellContainer").find("#bookmarkpoup").css("display", "none")
        }
    }

    //bookmark pupup data
    Shell.prototype.bookMarkPopup = function () {
        var ref = this;
        $("#shellContainer").find("#bookmarkpoup").find(".bodyIcon").attr("src", globalPopupData.find("bookmarkPopup icon").text())
        $("#shellContainer").find("#bookmarkpoup").find(".bookmarkpoup-title").text(globalPopupData.find("bookmarkPopup heading").text())
        $("#shellContainer").find("#bookmarkpoup").find(".img-text p").text(globalPopupData.find("bookmarkPopup content").text())
        var str = '';
        $.each($(globalPopupData.find("bookmarkPopup btnText btn")), function (k, v) {
            str += '<a href="#" type="button" class="bookmarkpoup-popup-btn" data-btn=' + $(v).attr("data-btn") + '>' + $(v).text() + '</a>';
        })
        $("#shellContainer").find("#bookmarkpoup").find(".bookmarkpoup-btn-container").empty().append(str)

    }

    //Function to bind data for connection popup
    Shell.prototype.connectionPopupData = function () {
        var ref = this
        globalPopupData.find("connectionPopup")
        $("#shellContainer").find("#connection").find("#connctionData").find(".bodyIcon").attr("src", globalPopupData.find("connectionPopup icon").text())

        $("#shellContainer").find("#connection").find(".connection-title").text(globalPopupData.find("connectionPopup heading").text())
        $("#shellContainer").find("#connection").find("#connctionData").find(".retriv-data").html(globalPopupData.find("connectionPopup topcontent").text())
        $("#shellContainer").find("#connection").find("#connctionData").find(".body-content").html(globalPopupData.find("connectionPopup bodycontent").text())
        $("#shellContainer").find("#connection").find(".connection-popup-btn").text(globalPopupData.find("connectionPopup btnText btn").text())
    }
    //Function to bind data for session popup
    Shell.prototype.sessionPopupData = function () {

        globalPopupData.find("sessionPopup")
        $("#shellContainer").find("#session").find("#sessionData").find(".bodyIcon").attr("src", globalPopupData.find("sessionPopup icon").text())
        $("#shellContainer").find("#session").find(".session-title").text(globalPopupData.find("sessionPopup heading").text())
        $("#shellContainer").find("#session").find("#sessionData").find(".body-content").html(globalPopupData.find("sessionPopup bodycontent").text())
        $("#shellContainer").find("#session").find(".session-popup-btn").text(globalPopupData.find("sessionPopup btnText btn").text())
    }



    //open connection popup
    Shell.prototype.openConnectionPopup = function () {

        var ref = this
        $("#shellContainer").find("#connection").css("display", "flex");
        ref.attachEvents();
    }

    //open connection popup
    Shell.prototype.openSessionPopup = function () {
        var ref = this
        $("#shellContainer").find("#session").css("display", "flex");
        ref.attachEvents();
    }

    // Close glossary, Resource, and Menu popup
    Shell.prototype.closeGlossaryResourcePopup = function (ref, e) {
        if (isLocalfileOrServer!=true) {
            ref.checkhostReachable();
            if(onLineFlag=="offline"){
                return;
            }
        }
        var closepopuptype = $(e.currentTarget).attr("data-type");
        $("#shellContainer").find("#" + closepopuptype).hide();

        ref.isVideoAudioPlayPauseGlobally()
    }

    // close connection popup and check other popup is request to open it
    Shell.prototype.closeConnnectionPopup = function (ref, e) {
        var closepopuptype = $(e.currentTarget).attr("data-type");
        $("#shellContainer").find("#" + closepopuptype).hide();

    }

    // close connection popup and check other popup is request to open it
    Shell.prototype.closesessionPopup = function (ref, e) {
        window.shell.isExitPopupbtnClick=true;
        var closepopuptype = $(e.currentTarget).attr("data-type");
        $("#shellContainer").find("#" + closepopuptype).hide();
        window.parent.close()

    }
    // Function to open menu popup and bind menu data in run time.
    Shell.prototype.openMenuPopup = function (ref, e) {
        //
        if (isLocalfileOrServer!=true) {
            ref.checkhostReachable();
            if(onLineFlag=="offline"){
                return;
            }
        }
        ref.isVideoAudioPlayPauseGlobally()

            var popuptype = $(e.currentTarget).attr("data-type");

            var menuStr = '';
            $("#slider").find(".carousel-item").each(function (k, v) {
                if (k==0 || k==1) {

                }else{
                    if ($(v).hasClass('active') && $(v).hasClass('is-completed')) {
                        menuStr += '<li aria-label="" tabindex="0" class="list-group-item d-flex align-items-center complete redirecttoslide" data-page-index=' + $(v).attr("data-page") + ' data-topic=' + $(v).attr("data-topic") + '>\
                        <img src="assests/images/completed-icon.png" class="icon-list" /><span class="title">'+ $(v).attr("data-menutitle") + '</span></li>';
                    }
                    else if ($(v).hasClass('is-completed')) {
                        menuStr += '<li aria-label="" tabindex="0" class="list-group-item d-flex align-items-center complete redirecttoslide" data-page-index=' + $(v).attr("data-page") + ' data-topic=' + $(v).attr("data-topic") + '>\
                        <img src="assests/images/completed-icon.png" class="icon-list" /><span class="title">'+ $(v).attr("data-menutitle") + '</span></li>';

                    }
                    else if ($(v).hasClass('visited')) {
                        menuStr += '<li aria-label="" tabindex="0" class="list-group-item d-flex align-items-center redirecttoslide visited" data-page-index=' + $(v).attr("data-page") + ' data-topic=' + $(v).attr("data-topic") + '>\
                        <img src="assests/images/incompleted-icon.png" class="icon-list" /><span class="title">'+ $(v).attr("data-menutitle") + '</span></li>';
                    }
                    else {
                        menuStr += '<li aria-label="" tabindex="0" class="list-group-item d-flex align-items-center disabled" data-page-index=' + $(v).attr("data-page") + ' data-topic=' + $(v).attr("data-topic") + '>\
                        <img src="assests/images/notstarted-icon.png" class="icon-list" /><span class="title">'+ $(v).attr("data-menutitle") + '</span></li>';
                    }
                }
            })

            $("#shellContainer").find("#" + popuptype).find(".list-group").empty().append(menuStr);

            $("#shellContainer").find("#" + popuptype).find(".list-group .list-group-item").each(function (k, v) {

                if ($(v).hasClass("complete")) {
                    $(v).next().removeClass("disabled").addClass("redirecttoslide");
                }

            })
            ref.attachEvents();
            $("#shellContainer").find("#" + popuptype).show();

    }

    // Function to redirect page into menu.
    Shell.prototype.redirectToSlide = function (ref, e) {

        $(".nextItext").hide();
        if (isLocalfileOrServer!=true) {
            ref.checkhostReachable();
            if(onLineFlag=="offline"){
                return;
            }
        }
        //
        var pageIndex = parseInt($(e.currentTarget).attr("data-page-index"));
        if ($("#page_" + ref.curTopic + "_" + ref.curPage).attr("data-page") == $(e.currentTarget).attr("data-page-index")) {

            if ($("#page_" + ref.curTopic + "_" + ref.curPage).hasClass("assessment")) {
                if (scoreRaw >= 80) {
                    $("#page_" + ref.curTopic + "_" + ref.curPage).find('#start_screen').show();
                    $("#page_" + ref.curTopic + "_" + ref.curPage).find('.score-screen-pass').hide();
                    $("#page_" + ref.curTopic + "_" + ref.curPage).find('.score-screen-fail').hide();
                    $("#page_" + ref.curTopic + "_" + ref.curPage).find('#assessment #certificate-screen').hide();
                } else {
                    ref.prevPage = ref.curTopic + "_" + ref.curPage;
                    ref.curPage = pageIndex;
                    ref.loadPage();
                    $(e.currentTarget).closest("#menu").hide();
                }
            }

            $(e.currentTarget).closest("#menu").hide();
        }
        else {
            ref.prevPage = ref.curTopic + "_" + ref.curPage;
            ref.curPage = pageIndex;
            ref.loadPage();
            $(e.currentTarget).closest("#menu").hide();
        }
    }




    Shell.prototype.setNextPage = function (ref, e) {

        $(".nextItext").css("bottom","0px");
        if($("#page_" + ref.curTopic + "_" + ref.curPage).hasClass("login_page")){


            ref.userName= $("#page_" + ref.curTopic + "_" + ref.curPage).find(".login-container").find("#user").val()
            ref.bankID=$("#page_" + ref.curTopic + "_" + ref.curPage).find(".login-container").find("#pass").val()

            localStorage.setItem("user", ref.userName)
            localStorage.setItem("bankId", ref.bankID)

        }

        // function to check the internet connection whether the internet is connect or not
        if (isLocalfileOrServer!=true) {
            ref.checkhostReachable();
            if(onLineFlag=="offline"){
                return;
            }
        }

        //console.log(typeof ref.isNextEnabled)
        if (typeof ref.isNextEnabled != "undefined") {
            if (!ref.isNextEnabled || ref.isLoading || ref.isPageTrans) {
                return;
            }
        }
        ref.enableDisableNext(false);
        if (ref.curTopic == 0 && ref.curPage == 1) {
            ref.prevPage = ref.curTopic + "_" + ref.curPage;
            ref.curTopic++;
            ref.curPage = 1;
            ref.loadPage();
            //$('.topic_title').html(ref.tocXml.find("topics topic").eq(ref.curTopic - 1).find('page').eq(ref.curPage - 1).find('title').text());
            return;
        }
        //alert(ref.curTopic)
        //alert(ref.curPage + " :::: " + ref.eachTopicPagesArray[ref.curTopic - 1])
        if (ref.curPage < ref.eachTopicPagesArray[ref.curTopic - 1]) {
            //alert("coming here 1");
            if ($(ref.tocXml).find('topic').eq(ref.curTopic - 1).find('page').eq(ref.curPage).length > 0) {
                ref.prevPage = ref.curTopic + "_" + ref.curPage;
                ref.curPage++;
                //	$('.topic_title').html(ref.tocXml.find("topics topic").eq(ref.curTopic - 1).find('page').eq(ref.curPage - 1).find('title').text())
                ref.loadPage();
            }
        } else {
            //alert("coming here 2");
            ref.prevPage = ref.curTopic + "_" + ref.curPage;
            ref.curPage = 1;
            ref.curTopic++;
            //$('.topic_title').html(ref.tocXml.find("topics topic").eq(ref.curTopic - 1).find('page').eq(ref.curPage - 1).find('title').text())
            ref.loadPage();
        }
    }



    Shell.prototype.openCloseTranscript = function (ref, e, type) {
        type = type || undefined;
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        if (type == undefined) {
            if ($(".transcript-menu").hasClass("transcript-opened")) {
                $('.transcript').hide();
                $(".transcript-menu").addClass("transcript-close");
                $(".transcript-menu").removeClass("transcript-opened");
                if (ref.templateInstance.playMedia) {
                    ref.templateInstance.playMedia();
                }
                ref.transcript_flag = true;
            } else {
                $('.transcript').show();
                $(".transcript-menu").addClass("transcript-opened");
                $(".transcript-menu").removeClass("transcript-close");
                if (ref.templateInstance.stopMedia) {
                    ref.templateInstance.stopMedia();
                }
                ref.transcript_flag = false;
            }
        } else if (type == "open") {
            $('.transcript').show();
            $(".transcript-menu").addClass("transcript-opened");
            $(".transcript-menu").removeClass("transcript-close");
            if (ref.templateInstance.stopMedia) {
                ref.templateInstance.stopMedia();
            }
            ref.transcript_flag = true;
        } else if (type == "close") {
            $('.transcript').hide();
            $(".transcript-menu").addClass("transcript-close");
            $(".transcript-menu").removeClass("transcript-opened");
            if (ref.templateInstance.playMedia) {
                ref.templateInstance.playMedia();
            }
            ref.transcript_flag = false;
        }
    }
    Shell.prototype.openCloseToc = function (ref, e, type) {
        type = type || undefined;
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        if (type == undefined) {
            if ($(".toc-menu").hasClass("closed")) {
                $(".toc-menu").removeClass("closed").addClass("opened");
                $('body').addClass('sidemenu-opened');
                if (ref.templateInstance.stopMedia) {
                    ref.templateInstance.stopMedia();
                }
                $("#blocker").show();
            } else {
                $(".toc-menu").addClass("closed").removeClass("opened");
                $('body').removeClass('sidemenu-opened');
                $("#blocker").hide();
                if (ref.templateInstance.playMedia) {
                    //ref.templateInstance.isPlaying = true;
                    ref.templateInstance.playMedia();
                }
            }
        } else if (type == "open") {
            $(".toc-menu").removeClass("closed").addClass("opened");
            $('body').addClass('sidemenu-opened');
            $("#blocker").show();
            if (ref.templateInstance.stopMedia) {
                ref.templateInstance.stopMedia();
            }

        } else if (type == "close") {
            $(".toc-menu").addClass("closed").removeClass("opened");
            $('body').removeClass('sidemenu-opened');
            $("#blocker").hide();
            if (ref.templateInstance.playMedia) {

                ref.templateInstance.playMedia();
            }
        }
    }
    Shell.prototype.setTopic = function (topicid) {
        var ref = this;
        ref.prevPage = ref.curPage;
        ref.curPage = 1;
        ref.curTopic = topicid;
        ref.totalPages = ref.tocXml.find("topics topic:eq(" + (topicid - 1) + ") pages page").length;
        ref.loadPage();
    }
    Shell.prototype.setPage = function (topicid, pageid) {

        var ref = this;
        ref.prevPage = ref.curPage;
        ref.curPage = pageid;
        ref.curTopic = topicid;
        ref.totalPages = ref.tocXml.find("topics topic:eq(" + (topicid - 1) + ") pages page").length;
        ref.loadPage();
    }
    Shell.prototype.setBackNext = function () {
        var ref = this;

        if (ref.currentSlideNo == ref.totalPages) {

            ref.enableDisableNext(false);
        } else {

            ref.enableDisableNext(true);

        }
    }
    Shell.prototype.enableDisablePrev = function (bool) {
        var ref = this;
        if (bool == false) {
            $("#navBtnHolder .btnBack").addClass("disabled");
            ref.isPrevEnabled = false;
            $(".nextItext").hide()
        } else {
            $("#navBtnHolder .btnBack").removeClass("disabled");

            ref.isPrevEnabled = true;
        }
    }

    Shell.prototype.enableDisableloginPrevNextBtn = function (bool) {

        var ref = this;

        if (bool == true) {
            if($("#page_" + ref.curTopic + "_" + ref.curPage).attr("data-value")=="splash"){
                $('.main_container, .video_heading, #shellContainer_content_box, #shellHeader').show();
            }
            else{
                $('.main_container, .video_heading, #shellContainer_content_box, #shellHeader, #shellFooter').show();
            }
            //$('.main_container, .video_heading, #shellContainer_content_box, #shellHeader, #shellFooter').show();
            $("#shellFooter").find("#totalTopic").text($(ref.tocXml).find('topic').find('page').length - 2)
            $("#shellFooter").find("#currentPageTopic").text(ref.curPage - 2)

            if (ref.currentSlideNo == 1) {
                $("#navBtnHolder .btnBack").addClass("disabled");
                $("#navBtnHolder .btnNext").addClass("disabled");
                $("#navBtnHolder .btnNext").removeAttr("style");
                $(".nextItext").hide();
                ref.isPrevEnabled = false;
                ref.isNextEnabled = true;
            }

        }
        else {
            if (ref.currentSlideNo == 1) {
                $("#navBtnHolder .btnBack").addClass("disabled");
                $("#navBtnHolder .btnNext").addClass("disabled");
                $("#navBtnHolder .btnNext").removeAttr("style");
                $(".nextItext").hide();
                ref.isPrevEnabled = false;
                ref.isNextEnabled = true;
            }
        }
    }


    Shell.prototype.enableDisableNext = function (bool) {
        //

        var ref = this;
        if (bool == false) {
            $("#navBtnHolder .btnNext").addClass("disabled");
            $(".nextItext").hide()
            ref.isNextEnabled = false;
        } else {
            $("#navBtnHolder .btnNext").removeClass("disabled");
            ref.isNextEnabled = true;

        }
    }
    Shell.prototype.getEnableDisableNext = function () {
        var ref = this;
        return ref.isNextEnabled;
    }
    Shell.prototype.showHideHeader = function (bool) {
        if (bool) {
            $("body").addClass("showingHeader");
        } else {
            $("body").removeClass("showingHeader");
        }
    }
    Shell.prototype.setTopicPages = function () {


        var ref = this;
        var topics = this.tocXml.find("topics topic");
        ref.totalTopics = topics.length;
        ref.totalPages = this.tocXml.find('topics topic').find('pages page').length;
        //launch page
        if ($(ref.tocXml).find('global').attr('require') == '1') {
            $("<div/>").attr("id", "page_" + 0 + "_" + 1)
                .attr("data-topic", 0)
                .attr("data-page", 1)
                .addClass("carousel-item")
                .appendTo("#slider .carousel-inner");
            for (var i = 0; i < ref.totalTopics; i++) {
                var p = [];
                var pages = this.tocXml.find("topics topic:eq(" + i + ")").find("pages page");
                ref.eachTopicPagesArray.push(pages.length);
                for (var j = 0; j < pages.length; j++) {
                    p.push(0);
                    $("<div/>").attr("id", "page_" + (i + 1) + "_" + (j + 1))
                        .attr("data-topic", i + 1)
                        .attr("data-menutitle", $(pages[j]).find("title").text())
                        .attr("data-value", $(pages[j]).attr("data-value"))
                        .attr("data-page", j + 1)
                        .addClass("carousel-item")
                        .appendTo("#slider .carousel-inner");
                }
            }
            ref.curTopic = 0;
            ref.curPage = 1;
            $("#page_0_1").addClass("active");
        } else {

            for (var i = 0; i < ref.totalTopics; i++) {
                var p = [];
                var pages = this.tocXml.find("topics topic:eq(" + i + ")").find("pages page");
                ref.eachTopicPagesArray.push(pages.length);
                for (var j = 0; j < pages.length; j++) {
                    p.push(0);
                    $("<div/>").attr("id", "page_" + (i + 1) + "_" + (j + 1))
                        .attr("data-topic", i + 1)
                        .attr("data-menutitle", $(pages[j]).find("title").text())
                        .attr("data-value", $(pages[j]).attr("data-value"))
                        .attr("data-page", j + 1)
                        .addClass("carousel-item")
                        .appendTo("#slider .carousel-inner");

                }
            }


            //$("#page_1_1").html("<h2>default image</h2>");
            //alert(ref.totalTopics + " :::: " + pages.length)
            for (var i = 0; i < ref.totalTopics; i++) {
                for (var j = 0; j < pages.length; j++) {
                    console.log('#page_' + (i + 1) + '_' + (j + 1))
                    //$('#page_' + (i+1) + '_' + (j+1)).html("<img src='./images/placeholder.jpg' class='placeHolderImage' />")

                }
            }


            if (window.globalConfig.isScorm) {
                ref.curTopic = 1;
                ref.curPage = 2;
                $("#page_1_2").find('.placeHolderImage').hide();
                $("#page_1_2").addClass("active");
            }
            else {
                ref.curTopic = 1;
                ref.curPage = 1;
                $("#page_1_1").find('.placeHolderImage').hide();
                $("#page_1_1").addClass("active");
            }
        }
    }
    Shell.prototype.setTitle = function (txt) {
        var ref = this;
        $(".title .txt").html(txt);
        document.title = $(".title .txt").text();
    };
    Shell.prototype.enableDisableHeaderFooter=function(pag_val){

        var isSplash=$("#page_" + ref.curTopic + "_" + ref.curPage).hasClass("splash")
        var isAssessment=$("#page_" + ref.curTopic + "_" + ref.curPage).hasClass("assessment")
        if(pag_val==0 || isSplash){
            $("#shellFooter").hide()
            $("#shellHeader").show();
        }
        else if(isAssessment){
            
            // when accessiblity popup is show then accessment footer button is hide only exit button will be show
            if(window.shell.accessiblityVersion){
                ref.enableDisableNext(false);
                ref.enableDisablePrev(false);
                $("#shellHeader").show();
                $("#shellFooter").find(".navigation-container").hide()
                $("#shellFooter").find(".btn-container .footer-btn").hide()
                $("#shellFooter").find(".btn-container .exit-btn").show()
                $("#shellFooter").show();
                $(".nextItext").hide()
            }else{                
                ref.enableDisableNext(false);
                $("#shellHeader, #shellFooter").show();
                $(".nextItext").hide()
            }


        }
        else{
            //if after splash page the first page will be appear then add disabled class in footer back button
          if(pag_val==2){
            $("#navBtnHolder .btnBack").addClass("disabled");
          }
        $("#shellHeader, #shellFooter").show()
        }
    }
    Shell.prototype.getTemplateName = function (topicid, pageid, type) {
        if (topicid == 0) {
            if (pageid == 1) {
                return "splash";
            }
        }
        var page = this.tocXml.find("topics topic:eq(" + (topicid - 1) + ") pages page:eq(" + (pageid - 1) + ")");
        if (type === undefined || type === null || type == "primary") {
            if (page.find("primary").length > 0) {
                return page.find("primary template").text();
            } else {
                return page.find("template:eq(0)").text();
            }
        } else {
            if (page.find("alternate").length > 0) {
                return page.find("alternate template").text();
            } else if (page.find("template").length > 1) {
                return page.find("template:eq(1)").text();
            } else {
                return page.find("template:eq(0)").text();
            }
        }
    };
    Shell.prototype.getTemplateInstance = function (pageid) {
        return this.templateInstance;
    };
    Shell.prototype.getPageURL = function (topicid, pageid, type) {
        if (topicid == 0) {
            if (pageid == 1) {
                return "pages/splash";
            }
        }
        var page = this.tocXml.find("topics topic:eq(" + (topicid - 1) + ") pages page:eq(" + (pageid - 1) + ")");
        if (type === undefined || type === null || type == "primary") {

            if (page.find("primary").length > 0) {
                return "pages/" + page.find("url").text();
            } else {
                return "pages/" + page.find("url:eq(0)").text();
            }
        } else {

            if (page.find("alternate").length > 0) {
                return "pages/" + page.find("alternate url").text();
            } else if (page.find("url").length > 1) {
                return "pages/" + page.find("url:eq(1)").text();
            } else {
                return "pages/" + page.find("url:eq(0)").text();
            }
        }
    };
    Shell.prototype.getTemplateURL = function (topicid, pageid, type) {
        if (topicid == 0) {
            if (pageid == 1) {
                return "pages/splash";
            }
        }
        var page = this.tocXml.find("topics topic:eq(" + (topicid - 1) + ") pages page:eq(" + (pageid - 1) + ")");
        if (type === undefined || type === null || type == "primary") {

            if (page.find("primary").length > 0) {
                return "global_files/templates/" + page.find("template").text();
            } else {
                return "global_files/templates/" + page.find("template").text();
            }
        } else {
            //alert("coming here 2")
            if (page.find("alternate").length > 0) {
                return "global_files/templates/" + page.find("template").text();
            } else if (page.find("url").length > 1) {
                return "global_files/templates/" + page.find("template").text();
            } else {
                return "global_files/templates/" + page.find("template").text();
            }
        }
    };
    Shell.prototype.isForceNavigation = function (pageid) {
        return this.tocXml.find("pages page:eq(" + (pageid - 1) + ") forceNavigation").text();
    };
    Shell.prototype.whichLayoutNeedToLoad = function (pageid) {

        if (this.tocXml.find("pages page:eq(" + (pageid - 1) + ")").attr('layout') == "primary") {
            return "primary";
        } else {

            return "alternate";
        }
    };
    Shell.prototype.pageLoaded = function () {

        this.isLoading = false;
        $("#preloader").hide();
        if (isMobile.any()) {

        } else {

        }
    }


    Shell.prototype.setTopicsCompletionStatus = function () {
        for (var i = 1; i <= ref.totalTopics; i++) {
            if (this.isTopicCompleted(i)) {
                $(".toc-topics .toc-topic[data-topic='" + i + "']").addClass("visited");
            } else {
                $(".toc-topics .toc-topic[data-topic='" + i + "']").removeClass("visited");
            }
        }
    }
    Shell.prototype.isTopicCompleted = function (topicid) {
        var bool = true;
        for (var i = 0; i < ref.topics[topicid].length; i++) {
            if (ref.topics[topicid][i] == 0) {
                bool = false;
                break;
            }
        }
        return bool;
    }
    Shell.prototype.getTopicsStatus = function () {
        return this.topics;
    }
    Shell.prototype.unloadAllPages = function () {

        //alert("111111111111");
        $('#activity_container').html('');
        //alert("#page_" + this.prevPage)
        $("#page_" + this.prevPage).html('');
        if ($("#page_" + this.prevPage).find('video').length > 0) {
            $("#page_" + this.prevPage).find('video').each(function () {
                $(this).attr('src', '');
            })

            //alert($('#activity_container').find('audio').length)

        }

        if ($("#page_" + this.prevPage).find('audio').length > 0) {
            $("#page_" + this.prevPage).find('audio').each(function () {
                $(this).attr('src', '');
            })

            //alert($('#activity_container').find('audio').length)

        }
        $("#page_" + this.prevPage).empty(); //.attr("src","pages/blank.html");
        //ref.unloadSupportFiles(ref.prevPage);
    }
    Shell.prototype.getPageContainer = function () {
        var ref = this;
        if (isMobile.any() && ($(window).width() < 550 || $(window).height() < 550) && (ref.screenType == "activity" || ref.screenType == "actividad")) {
            // if (isMobile.any() && ref.screenType == "activity" || ref.screenType == "actividad" && $(window).width() < 768) {
            //return ".activity_container";
            return "#shellContainer #slider #page_" + this.curTopic + "_" + this.curPage;
        } else {
            return "#shellContainer #slider #page_" + this.curTopic + "_" + this.curPage;
        }
    }
    Shell.prototype.getURL = function () {
        return this.currentPageUrl;
    };

    Shell.prototype.attachScrollBar = function (obj, cw, ch, trackcolor, thumbcolor) {

        $(obj).niceScroll({
            horizrailenabled: false,
            cursorborder: "0px",
            cursorwidth: cw + "px",
            cursorborder: "0px",
            cursorborderradius: "0px",
            background: trackcolor,
            autohidemode: "false"
        })
        // .cursor.css({
        //     "background": thumbcolor,
        //     "width": cw,
        //     "height": ch,
        //     "left": "0px"
        // });
        $(obj).niceScroll().hide();
    }

    Shell.prototype.attachScrollBar2 = function (obj, cw, ch, trackcolor, thumbcolor) {
        //alert(trackcolor + " -- " + thumbcolor)
        $(obj).niceScroll({
            horizrailenabled: false,
            cursorcolor: trackcolor,
            cursorborder: "0px",
            cursorwidth: cw + "px",
            cursorborder: "0px",
            cursorborderradius: "0px",
            background: '#cccccc',
            autohidemode: "false"
        }).cursor.css({
            "background": '#0090DA',
            "width": cw,
            "height": ch,
            "left": "0px"
        });
        $(obj).niceScroll().hide();
    }

    Shell.prototype.interactivityChecker = function () {
        var ref = this
        // Initialise a variable to store an alert and logout timer
        var alertTimer;

        // Set the timer thresholds in seconds
        var alertThreshold = 1800;

        // Start the timer
        window.onload = resetAlertTimer;

        // Ensure timer resets when activity logged
        registerActivityLoggers(resetAlertTimer);

        // ***** FUNCTIONS ***** //

        // Function to register activities for alerts
        function registerActivityLoggers(functionToCall) {
            document.onmousemove = functionToCall;
            document.onkeypress = functionToCall;
        }

        // Function to reset the alert timer
        function resetAlertTimer() {
            clearTimeout(alertTimer);
            alertTimer = setTimeout(sendAlert, alertThreshold * 1000);
        }
        function sendAlert() {
            // Send a logout alert
            ref.openSessionPopup()
            console.log("you are idle for 5 seconds")
            //document.getElementById("container").style.display = "block";
            registerActivityLoggers(reset);
        }

        function reset() {
            window.onmousemove = resetAlertTimer;
            document.onkeypress = resetAlertTimer;
            document.onkeyup = resetAlertTimer;
        }

    }


    Shell.prototype.loadPdf = function (pdfPathRef) {
        //alert("loading pdf");
        window.open(pdfPathRef, '_blank');
    }

    Shell.prototype.loadVideo = function (videoPathRef, videoIndex) {
        if (isMobile.any() == 'Android') {

            if (shell.isPopupvideo.length == 0) {
                shell.isPopupvideo.length = $('ul.resource_lists li').length;
            }
            if (shell.isPopupvideo[videoIndex] == null || shell.isPopupvideo[videoIndex] == "") {
                shell.isPopupvideo[videoIndex] = videoPathRef;
                $("body").append('<div id="modal_dialog_' + videoIndex + '" style="z-index:2000;pointer-events: default;" class="modal_dialog"><video id="video_inner_' + videoIndex + '" autoplay = true playsinline="" webkit-playsinline="" preload="true" style="position:absolute;width:100%;width:100%"  class=""><source src=' + videoPathRef + ' type="video/mp4"></video></div>');
                $(".modal_dialog").append('<span class="close_video"><i class="icon info_icon ion-ios-close-outline" style="color:#ffffff;font-size:1.5em;"></i><span>');
                $('#video_inner_' + videoIndex).mediaelementplayer({
                    features: ['playpause', 'progress', 'current', 'tracks'],
                });
                console.log(videoPathRef);


            }

            var player = new MediaElementPlayer('#video_inner_' + videoIndex + ' source', {
                type: ['video/mp4', 'video/webm', 'video/flv'],
                success: function (mediaElement, domObject) {
                    var sources = [
                        { src: videoPathRef, type: 'video/mp4' }
                    ];
                    player.setSrc(videoPathRef);
                    source.setSrc(videoPathRef);

                    mediaElement.load();
                    mediaElement.play();
                }
            });


            if ($('#modal_dialog_' + videoIndex).is(':visible')) {

                $('.fixed_block').css("display", "none");
                $('.shellContainer').css("display", "none");

                $(".modal_dialog .mejs__container").css({ "top": "50%" });

                //$('#mainBody').addClass("overflow_body");
                $('.close_video').click(function () {
                    $('.fixed_block').css("display", "block");
                    $('.shellContainer').css("display", "block");

                    console.log('hii' + videoIndex);
                    $('.modal_dialog').addClass('show_popup');
                    //videoPathRef='';
                    // player.setSrc(videoPathRef);
                    // $('#video_inner_1_html5').attr("src","");
                    // $('#video_inner_0_html5').attr("src","");
                    // $('#video_inner_1_html5 source').attr("src","");
                    // $('#video_inner_0_html5 source').attr("src","");
                    $('.modal_dialog').find('video').each(function () {
                        $(this).attr("src", "");
                        $(this).find('source').attr("src", "");
                        $(this).attr("autoplay", "false");
                        $(".mejs__pause").trigger("click");



                    });



                });
            }

            else {
                $('.fixed_block').css("display", "none");
                $('.shellContainer').css("display", "none");
                // $('#video_inner_1_html5').attr("src",videoPathRef);
                // $('#video_inner_0_html5').attr("src",videoPathRef);
                // $('#video_inner_1_html5 source').attr("src",videoPathRef);
                // $('#video_inner_0_html5 source').attr("src",videoPathRef);

                $('.modal_dialog').find('video').each(function () {
                    $(this).attr("src", videoPathRef);
                    $(this).find('source').attr("src", videoPathRef);
                    $(".mejs__play").trigger("click");

                });

                // $('body').removeClass('overflow_body');
                $('#modal_dialog_' + videoIndex).removeClass('show_popup');
            }

            //alert("loading pdf");
            // window.open(videoPathRef, '_self');
            // $("body").append("<div style="position:absolute"></div>");

        }
        else {
            window.open(videoPathRef, '_blank');
        }
    }
    return Shell;
});

document.onkeydown = function (e) {
    //
    if(window.shell.accessiblityVersion==""){

        if(window.globalConfig.Isaccessiblity){
            if (e.keyCode == 32 || e.keyCode == 13 || e.keyCode == 9 || e.keyCode == 116 || e.keyCode == 18 || e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40) {
                return false;
            }
        }

    }else if(window.shell.accessiblityVersion=="false"){
        if (e.keyCode == 32 || e.keyCode == 13 || e.keyCode == 9 || e.keyCode == 116 || e.keyCode == 18 || e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40) {
            return false;
        }
    }

}



