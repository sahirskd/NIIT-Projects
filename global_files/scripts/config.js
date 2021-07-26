require.config({
	baseUrl: './',
	map: {
	  '*': {
	    'css': ['global_files/plugins/require/require.css.min']
	  }
	},
	
    paths: {
		'text':['global_files/plugins/require/require.text'],	
	    'jquery':['global_files/plugins/jquery'],
		'flexSlider':['global_files/plugins/flexSlider/jquery.flexslider'],
		'niceScroll':['global_files/plugins/jquery.nicescroll'],
		'mediaelement':['global_files/plugins/build/mediaelement-and-player'],										
		'owlc':['global_files/plugins/owlc/js/owl.carousel'],
		'jquery.easing':['global_files/plugins/jquery/jquery.easing.1.3'],       
        'bootstrap':['global_files/plugins/bootstrap/js/bootstrap.min'],
		//'hammer':['global_files/plugins/hammer/hammer.min'],
		'popper':['global_files/plugins/bootstrap/js/popper.min'],
		'util':['global_files/scripts/util'],
		'Shell':['global_files/scripts/shell'],
		'scaleToFit':['global_files/scripts/scaleToFit'],
		'progressbar' : ['global_files/scripts/jQuery-plugin-progressbar']
    },
	
    waitSeconds: 0,
    shim:{ 
		'popper':{
			deps:['jquery'],
    		exports:"Popper"
		}, 
		// 'hammer':{
    		// deps:['jquery'],
    		// exports:"Hammer"
    	// },
    	'bootstrap':{
    		deps:['jquery','popper']
    	},
		'mediaelement':{
			deps:['jquery']
		},
		'owlc':{
    		deps:['jquery']
    	},
		'niceScroll':{
    		deps:['jquery']
    	},
    	'util':{
    		deps:['jquery']
    	},
    	
		'Shell':{
    		deps:['jquery','popper','bootstrap','util']
    	},
    	'scaleToFit':{
    		deps:['jquery']
    	},
		'progressbar' : {
			deps:['jquery']
		}
    } 
}); 

window.shell = null;
(function (){ 
	require(["Shell","util", "owlc", "niceScroll", "progressbar","scaleToFit"],function(Shell){
		//flowplayerLoaded();
		//loadFile('plugins/flow-player/flowplayer.min.js', flowplayerLoaded, document.body);
	
		window.shell = new Shell();
    window.shell.init();	
	})
})();
