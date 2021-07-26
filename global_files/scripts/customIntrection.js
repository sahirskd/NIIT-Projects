// // custom interaction
var interactionWeighting = 1;
var interactionType = "choice";
var thisValueArr = [];
var thisTextArr = [];
var textEntryElement;
//current time of interaction
// latency = time spend in current interact
// student response
// result

var interactionStartTime;
var interactionEndTime;
var interactionTime;

function startTime(){
	interactionStartTime = new Date();
	interactionStartTime.getTime();
}

startTime()

function getInteractionTime(){
	interactionEndTime = new Date();
	interactionEndTime.getTime();
	
	var timeDiff =(interactionEndTime - interactionStartTime);
	msToTime(timeDiff)
}

function msToTime(duration) {
	var milliseconds = Math.floor((duration%1000)/100)
	seconds = Math.floor((duration/1000)%60)
	minutes = Math.floor((duration/(1000*60))%60)
	hours = Math.floor((duration/(1000*60*60))%24);

	hours = (hours < 10) ? "0" + hours : hours;
	minutes = (minutes < 10) ? "0" + minutes : minutes;
	seconds = (seconds < 10) ? "0" + seconds : seconds;

	// alert(hours + ":" + minutes + ":" + seconds + "." + milliseconds);
	interactionTime = hours + ":" + minutes + ":" + seconds
	//   alert(hours + ":" + minutes + ":" + seconds);
}

function getCurTime(){
	//alert(parent.Val)	
	var d = new Date();
	
	var hours = d.getHours()
	var minutes = d.getMinutes()
	var seconds = d.getSeconds();
	
	var currentHours;
	var currentMinutes;
	var currentSeconds;
	
	if(Number(hours) < 10){
		currentHours = "0"+hours;
	}else{
		currentHours = hours;
	}
	
	if(Number(minutes) < 10){
		currentMinutes = "0"+minutes;
	}else{
		currentMinutes = minutes;
	}	
	
	if(Number(seconds) < 10){
		currentSeconds = "0"+seconds;
	}else{
		currentSeconds = seconds;
	}
	
	var fullTime = currentHours+":"+currentMinutes+":"+currentSeconds;

	return fullTime;
}



function submitInteractionAssessment(myQText, finalUserValue, rightAns, user_sel, interactionWeighting, desc){
	
	var time = getCurTime();
	getInteractionTime();
	
	if(user_sel == rightAns){
		var res = "correct";
	}else{
		var res = "wrong";
	}


	

putSCORMInteractions(String(myQText),'',String(time),interactionType,String(rightAns),interactionWeighting,String(finalUserValue),String(res),interactionTime, desc);
	//LMSCommit();
	//scoData.commit()
	//commitValues();
}


function putSCORMInteractions(id,obj,tim,typ,crsp,wgt,srsp,res,lat,txt) {
    
  
  
  var nextInt = parseInt( doLMSGetValue( 'cmi.interactions._count' ), 10 )
  var root    = 'cmi.interactions.' + nextInt
  if(id)   doLMSSetValue( root + '.id', id )
  if(obj)  doLMSSetValue( root + '.objectives.0.id', obj )
  if(tim)  doLMSSetValue( root + '.time', tim )
  if(typ)  doLMSSetValue( root + '.type', typ )
  if(crsp) doLMSSetValue( root + '.correct_responses.0.pattern', crsp )
           doLMSSetValue( root + '.weighting', wgt )
  if(srsp) doLMSSetValue( root + '.student_response', srsp )
  if(res)  doLMSSetValue( root + '.result', res )
  if(lat)  doLMSSetValue( root + '.latency', lat )
  if(txt)  doLMSSetValue( root + '.text', txt )
}

function convJS(s){
	if( s == null ) return '';
	s = s.replace(/\n/g, '<br/>');
	s = s.replace(/\\r/g, '<br/>');
	s = s.replace(/"/g, '&quot;');
	return s;
}
function removeSpaceFromContent(){
	var questionText =  convJS(queText);
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
	strID = 'ETB_'+quesText;
}