jsonPTocCallback('<?xml version="1.0" encoding="utf-8"?>\
	<course>\
		<courseTitle><![CDATA[SCB Custom Shell]]></courseTitle>\
		<courseDesc><![CDATA[To create a custome course in cutome build]]></courseDesc>\
		<courseProgressTitle><![CDATA[]]></courseProgressTitle>\
		<aboutCourseTitle><![CDATA[]]></aboutCourseTitle>\
		<aboutCourseContent><![CDATA[]]>\
		</aboutCourseContent>\
		<forceVideoSeekBar><![CDATA[false]]></forceVideoSeekBar>\
		<global heading="" type="Video" require="0">\
				<title><![CDATA[]]></title>\
				<launch><![CDATA[]]></launch>\
		</global>\
		<globalPopup>\
		<exitPopup>\
			  <heading><![CDATA[Exit]]></heading>\
			  <content><![CDATA[Are you sure that you want to exit?]]></content>\
			  <icon><![CDATA[assests/images/exitPopupIcon.png]]></icon>\
			  <btnText>\
			    <btn data-btn="yes"><![CDATA[Ok]]></btn>\
				<btn data-btn="exitpopup"><![CDATA[Cancel]]></btn>\
			  </btnText>\
		</exitPopup>\
		<accessibilityPopup>\
		<heading><![CDATA[Please select a version]]></heading>\
		<content><![CDATA[Select the Standard version to start the course.]]></content>\
		<content><![CDATA[Select the Accessible version if you have a visual impairment or use a JAWS Reader on your computer.]]></content>\
		<icon><![CDATA[assests/images/standard_icon.png]]></icon>\
		<icon><![CDATA[assests/images/accessible_icon.png]]></icon>\
		<btnText>\
		  <btn data-btn="standard"><![CDATA[Standard version]]></btn>\
		  <btn data-btn="accessibile"><![CDATA[Accessibile version]]></btn>\
		</btnText>\
  </accessibilityPopup>\
		<bookmarkPopup>\
			  <heading><![CDATA[Bookmark]]></heading>\
			  <content><![CDATA[Are you sure that you want to go that slide where you left?]]></content>\
			  <!--<icon><![CDATA[assests/images/exitPopupIcon.png]]></icon>-->\
			  <btnText>\
			    <btn data-btn="yes"><![CDATA[Ok]]></btn>\
				<btn data-btn="bookmark"><![CDATA[Cancel]]></btn>\
			  </btnText>\
		</bookmarkPopup>\
		<orientationPopup>\
			  <heading><![CDATA[Orientation]]></heading>\
			  <content><![CDATA[Please change your device orientation to Landscape to continue the course.]]></content>\
			  <icon><![CDATA[assests/images/icon-orientation.png]]></icon>\
		</orientationPopup>\
		<connectionPopup>\
			  <heading><![CDATA[Internet connection failed]]></heading>\
			  <topcontent><![CDATA[<p>Retrieval of data failed this may be due to</p>\
											<p>a) Failure in internet connection</p>\
											<p>b) Failure in VPN connection</p>\
											<p>c) Session Timeout</p>]]></topcontent>\
				<bodycontent><![CDATA[<p>Please check all the above instances and review the course for succcessfull completion</p>\
								<p><b>Note:</b> The bookmark will help you to go to the last page you visited</p>]]></bodycontent>\
			  <icon><![CDATA[assests/images/connectionIcon.png]]></icon>\
			  <btnText>\
				<btn data-btn="exitpopup"><![CDATA[Ok]]></btn>\
			  </btnText>\
		</connectionPopup>\
		<sessionPopup>\
			  <heading><![CDATA[Session Expired]]></heading>\
			  <bodycontent><![CDATA[Kindly note that your session has expired and you are logged out due to inactivity for more than 30 minutes. Exit and re-launch the course to complete it. Use the bookmark feature to go to the last page you visited.]]></bodycontent>\
			  <icon><![CDATA[assests/images/Session-expired-logo.png]]></icon>\
			  <btnText>\
				<btn data-btn="exitpopup"><![CDATA[Ok]]></btn>\
			  </btnText>\
		</sessionPopup>\
	  <resourcePopupItem>\
			<item>\
				<url><![CDATA[assests/pdf/AgencyCoaching_L3T1_Resource.pdf]]></url>\
				<title><![CDATA[Document 1]]></title>\
			</item>\
			<item>\
				<url><![CDATA[assests/pdf/AgencyCoaching_L3T1_Resource.pdf]]></url>\
				<title><![CDATA[Document 1]]></title>\
			</item>\
			<item>\
				<url><![CDATA[assests/pdf/AgencyCoaching_L3T1_Resource.pdf]]></url>\
				<title><![CDATA[Document 1]]></title>\
			</item>\
				<item>\
				<url><![CDATA[assests/pdf/AgencyCoaching_L3T1_Resource.pdf]]></url>\
					<title><![CDATA[Document 1]]></title>\
			</item>\
			<item>\
				<url><![CDATA[assests/pdf/AgencyCoaching_L3T1_Resource.pdf]]></url>\
				<title><![CDATA[Document 1]]></title>\
			</item>\
	  </resourcePopupItem>\
	  <glossaryPopupItem>\
				<item>\
					<title><![CDATA[true]]></title>\
					<description><![CDATA[true]]></description>\
				</item>\
				<item>\
					<title><![CDATA[true]]></title>\
					<description><![CDATA[true]]></description>\
				</item>\
				<item>\
					<title><![CDATA[true]]></title>\
					<description><![CDATA[true]]></description>\
				</item>\
				<item>\
					<title><![CDATA[true]]></title>\
					<description><![CDATA[true]]></description>\
				</item>\
				<item>\
					<title><![CDATA[true]]></title>\
					<description><![CDATA[true]]></description>\
				</item>\
	</glossaryPopupItem>\
</globalPopup>\
		<topics>\
		<!--Topic 1 Starts Here-->\
		<topic>\
			<title><![CDATA[Single Page]]></title>\
			<pages>\
				<page type="Activity" heading="Now Playing" layout="primary">\
					<title><![CDATA[Login Page]]></title>\
					<template><![CDATA[login_page]]></template>\
					<forceNavigation><![CDATA[false]]></forceNavigation>\
					<url><![CDATA[login_page]]></url>\
				</page>\
				<page type="Activity" heading="Now Playing" layout="primary">\
				<title><![CDATA[splash]]></title>\
				<template><![CDATA[splash]]></template>\
				<forceNavigation><![CDATA[false]]></forceNavigation>\
				<url><![CDATA[splash]]></url>\
			</page>\
				<page type="Activity" heading="Now Playing" layout="primary">\
					<title><![CDATA[Start cource page]]></title>\
					<template><![CDATA[static_screen_01]]></template>\
					<forceNavigation><![CDATA[false]]></forceNavigation>\
					<url><![CDATA[page1]]></url>\
				 <!--<subpages>\
				   <subpage type="Activity" heading="Now Playing" layout="primary">\
					<title><![CDATA[Login Page]]></title>\
					<template><![CDATA[start_page1]]></template>\
					<forceNavigation><![CDATA[false]]></forceNavigation>\
					<url><![CDATA[start_page1]]></url>\
				   </subpage>\
			     </subpages>-->\
				</page>\
						<page type="Activity" heading="Now Playing" layout="primary">\
						<title><![CDATA[Static Screen type 2]]></title>\
						<template><![CDATA[static_screen_02]]></template>\
						<forceNavigation><![CDATA[false]]></forceNavigation>\
					<url><![CDATA[page2]]></url>\
					</page>\
					<page type="Activity" heading="Now Playing" layout="primary">\
						<title><![CDATA[Static Screen type 3]]></title>\
						<template><![CDATA[static_screen_03]]></template>\
						<forceNavigation><![CDATA[false]]></forceNavigation>\
					<url><![CDATA[page3]]></url>\
					</page>\
					<page type="Activity" heading="Now Playing" layout="primary">\
						<title><![CDATA[Static Screen type 4]]></title>\
						<template><![CDATA[static_screen_04]]></template>\
						<forceNavigation><![CDATA[false]]></forceNavigation>\
					<url><![CDATA[page4]]></url>\
					</page>\
				<page type="Activity" heading="Now Playing" layout="primary">\
					<title><![CDATA[Mcq Screen]]></title>\
					 <template><![CDATA[mcq_screen_global_feedback]]></template>\
					 <forceNavigation><![CDATA[false]]></forceNavigation>\
				  <url><![CDATA[page5]]></url>\
				</page>\
				<page type="Activity" heading="Now Playing" layout="primary">\
					 <title><![CDATA[Mcq with spacific feedback Screen]]></title>\
					 <template><![CDATA[mcq_screen_options_feedback]]></template>\
					 <forceNavigation><![CDATA[false]]></forceNavigation>\
				  <url><![CDATA[page6]]></url>\
				 </page>\
				 <page type="Activity" heading="Now Playing" layout="primary">\
					 <title><![CDATA[Mcq with multiple question Screen]]></title>\
					 <template><![CDATA[mcq_screen_multiple_question]]></template>\
					 <forceNavigation><![CDATA[false]]></forceNavigation>\
				  <url><![CDATA[page7]]></url>\
				 </page>\
				 <page type="Activity" heading="Now Playing" layout="primary">\
					 <title><![CDATA[MMCQ with single Screen]]></title>\
					 <template><![CDATA[mmcq_screen_global_feedback]]></template>\
					 <forceNavigation><![CDATA[false]]></forceNavigation>\
				  <url><![CDATA[page8]]></url>\
				</page>\
				 <page type="Activity" heading="Now Playing" layout="primary">\
					 <title><![CDATA[MMCQ with 3 feedback Screen]]></title>\
					 <template><![CDATA[mmcq_screen_partial_feedback]]></template>\
					 <forceNavigation><![CDATA[false]]></forceNavigation>\
				  <url><![CDATA[page9]]></url>\
				</page>\
				<page type="Activity" heading="Now Playing" layout="primary">\
					 <title><![CDATA[MMCQ with scoring screen]]></title>\
					 <template><![CDATA[mmcq_screen_with_scoring]]></template>\
					 <forceNavigation><![CDATA[false]]></forceNavigation>\
				  <url><![CDATA[page10]]></url>\
				</page>\
				<page type="Activity" heading="Now Playing" layout="primary">\
					<title><![CDATA[Click to Reveal Type 1]]></title>\
					<template><![CDATA[clickToReveal_screen_type1]]></template>\
					<forceNavigation><![CDATA[false]]></forceNavigation>\
					<url><![CDATA[page11]]></url>\
				</page>\
				<page type="Activity" heading="Now Playing" layout="primary">\
					<title><![CDATA[Click to Reveal Type 2]]></title>\
					<template><![CDATA[clickToReveal_screen_type2]]></template>\
					<forceNavigation><![CDATA[false]]></forceNavigation>\
					<url><![CDATA[page12]]></url>\
				</page>\
				<page type="Activity" heading="Now Playing" layout="primary">\
					<title><![CDATA[Click to Hotspot]]></title>\
					<template><![CDATA[clickToReveal_screen_type3]]></template>\
					<forceNavigation><![CDATA[false]]></forceNavigation>\
					<url><![CDATA[page13]]></url>\
				</page>\
				<page type="Activity" heading="Now Playing" layout="primary">\
					<title><![CDATA[Tab Activity Type1]]></title>\
					<template><![CDATA[tabActivity_screen_type1]]></template>\
					<forceNavigation><![CDATA[false]]></forceNavigation>\
					<url><![CDATA[page14]]></url>\
				</page>\
				<page type="Activity" heading="Now Playing" layout="primary">\
					<title><![CDATA[Tab Activity Type2]]></title>\
					<template><![CDATA[tabActivity_screen_type2]]></template>\
					<forceNavigation><![CDATA[false]]></forceNavigation>\
					<url><![CDATA[page15]]></url>\
				</page>\
				<page type="Activity" heading="Now Playing" layout="primary">\
					<title><![CDATA[Tab Activity Type3]]></title>\
					<template><![CDATA[tabActivity_screen_type3]]></template>\
					<forceNavigation><![CDATA[false]]></forceNavigation>\
					<url><![CDATA[page16]]></url>\
				</page>\
				<page type="Activity" heading="Now Playing" layout="primary">\
					<title><![CDATA[Dropdown Activity Type 1]]></title>\
					 <template><![CDATA[dropdown_screen_type1]]></template>\
					 <forceNavigation><![CDATA[false]]></forceNavigation>\
				  <url><![CDATA[page17]]></url>\
				</page>\
				<page type="Activity" heading="Now Playing" layout="primary">\
					<title><![CDATA[Dropdown Activity Type 2]]></title>\
					 <template><![CDATA[dropdown_screen_type2]]></template>\
					 <forceNavigation><![CDATA[false]]></forceNavigation>\
				  <url><![CDATA[page18]]></url>\
				</page>\
			<page type="Activity" heading="Now Playing" layout="primary">\
					<title><![CDATA[Static Screen 1]]></title>\
					<template><![CDATA[static_screen_05]]></template>\
					<forceNavigation><![CDATA[false]]></forceNavigation>\
					<url><![CDATA[page19]]></url>\
				</page>\
				<page type="Activity" heading="Now Playing" layout="primary">\
					<title><![CDATA[Recap]]></title>\
					<template><![CDATA[static_screen_06]]></template>\
					<forceNavigation><![CDATA[false]]></forceNavigation>\
					<url><![CDATA[page20]]></url>\
				</page>\
				<page type="Activity" heading="Now Playing" layout="primary">\
					<title><![CDATA[Video with custom control]]></title>\
					<template><![CDATA[video]]></template>\
					<forceNavigation><![CDATA[false]]></forceNavigation>\
			  	<url><![CDATA[page21]]></url>\
				</page>\
			   		<page type="Activity" heading="Now Playing" layout="primary">\
					<title><![CDATA[Content Screen with Video custom controls]]></title>\
					<template><![CDATA[video_audio_custom_control]]></template>\
					<forceNavigation><![CDATA[false]]></forceNavigation>\
					<url><![CDATA[page22]]></url>\
				</page>\
					<page type="Activity" heading="Now Playing" layout="primary">\
					<title><![CDATA[Assessment]]></title>\
					<template><![CDATA[assessment]]></template>\
					<forceNavigation><![CDATA[false]]></forceNavigation>\
				<url><![CDATA[page23]]></url>\
			  </page>\
			</pages>\
		</topic>\
		<!--Topic 1 Ends Here-->\
	</topics>\
</course>');