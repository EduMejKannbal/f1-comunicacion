var startTimeStamp = null, processedUnload = false, reachedEnd = false;
var  strAvance = null, my_user_id = null,user_name = null;

function doStart() {
  //console.log("entra doStart");
  startTimeStamp = new Date();
  ScormProcessInitialize();
  strAvance = ScormProcessGetValue("cmi.suspend_data");
  my_user_id = ScormProcessGetValue("cmi.core.student_id");
  user_name = ScormProcessGetValue("cmi.core.student_name");
  console.log('El ID del usuario es: ' + my_user_id);
  var completionStatus = ScormProcessGetValue("cmi.core.lesson_status");
  console.log("el valor de completionStatus es: " + completionStatus);
  if (completionStatus === "not attempted") {
    ScormProcessSetValue("cmi.core.lesson_status", "incomplete");
  } else if (completionStatus === "incomplete") {
    if (strAvance !== '' || strAvance !== null) {
      load_strAvance();
    }
  } else if (completionStatus === "completed" || completionStatus === "passed") {
    reachedEnd = true;
    console.log('Ya haz completado la actividad con éxito');
    load_strAvance();
  }
}

function save_Status() {
  const avanceData = Object.values(myAvance).join("-");
  ScormProcessSetValue("cmi.suspend_data", avanceData);
}

function load_strAvance() {
  const avanceArray = strAvance.split('-');
  Object.keys(myAvance).forEach((key, index) => {
    myAvance[key] = parseInt(avanceArray[index]);
  });
}

function setComplete() {
  ScormProcessSetValue("cmi.core.score.raw", 100);
  ScormProcessSetValue("cmi.core.score.min", "0");
  ScormProcessSetValue("cmi.core.score.max", "100");
  ScormProcessSetValue("cmi.core.lesson_status", "passed");
  reachedEnd = true;
  doExit();
}

function doExit() {
  //note use of short-circuit AND. If the user reached the end, don't prompt.
  //just exit normally and submit the results.
  if (reachedEnd === false && confirm("Would you like to save your progress to resume later?")) {
    //set exit to suspend
    ScormProcessSetValue("cmi.core.exit", "suspend");
  } else {
    //set exit to normal
    ScormProcessSetValue("cmi.core.exit", "");
  }
  //process the unload handler to close out the session.
  //the presense of an adl.nav.request will cause the LMS to 
  //take the content away from the user.
  doUnload(false);
}


function RecordTest(score) {
  ScormProcessSetValue("cmi.core.score.raw", score);
  ScormProcessSetValue("cmi.core.score.min", "0");
  ScormProcessSetValue("cmi.core.score.max", "100");
  //if we get a test result, set the lesson status to passed/failed instead of completed
  //consider 70% to be passing
  if (score >= 70) {
    ScormProcessSetValue("cmi.core.lesson_status", "passed");
  } else {
    ScormProcessSetValue("cmi.core.lesson_status", "failed");
  }
}

function doUnload(pressedExit) {
  console.log("entra doUnload");
  //don't call this function twice
  if (processedUnload == true) {
    return;
  }
  processedUnload = true;
  //record the session time
  var endTimeStamp = new Date();
  var totalMilliseconds = (endTimeStamp.getTime() - startTimeStamp.getTime());
  var scormTime = ConvertMilliSecondsToSCORMTime(totalMilliseconds, false);
  console.log("scormTime " + scormTime);
  ScormProcessSetValue("cmi.core.session_time", scormTime);
  //if the user just closes the browser, we will default to saving 
  //their progress data. If the user presses exit, he is prompted.
  //If the user reached the end, the exit normall to submit results.
  if (pressedExit == false && reachedEnd == false) {
    ScormProcessSetValue("cmi.core.exit", "suspend");
  }

  ScormProcessFinish();
}


//onbeforeunload="doUnload(false);" onunload="doUnload();
document.body.onbeforeunload = function () {
  save_Status();
  window.scrollTo(0, 0);
  doUnload(false);
};
document.body.addEventListener("unload",  doUnload);

function ConvertMilliSecondsToSCORMTime(intTotalMilliseconds, blnIncludeFraction) {
  var intHours, intintMinutes, intSeconds, intMilliseconds, intHundredths, strCMITimeSpan;

  if (blnIncludeFraction == null || blnIncludeFraction == undefined) {
    blnIncludeFraction = true;
  }

  //extract time parts
  intMilliseconds = intTotalMilliseconds % 1000;
  intSeconds = ((intTotalMilliseconds - intMilliseconds) / 1000) % 60;
  intMinutes = ((intTotalMilliseconds - intMilliseconds - (intSeconds * 1000)) / 60000) % 60;
  intHours = (intTotalMilliseconds - intMilliseconds - (intSeconds * 1000) - (intMinutes * 60000)) / 3600000;

  /*
   deal with exceptional case when content used a huge amount of time and interpreted CMITimstamp 
   to allow a number of intMinutes and seconds greater than 60 i.e. 9999:99:99.99 instead of 9999:60:60:99
   note - this case is permissable under SCORM, but will be exceptionally rare
   */

  if (intHours == 10000) {
    intHours = 9999;
    intMinutes = (intTotalMilliseconds - (intHours * 3600000)) / 60000;
    if (intMinutes == 100) {
      intMinutes = 99;
    }
    intMinutes = Math.floor(intMinutes);
    intSeconds = (intTotalMilliseconds - (intHours * 3600000) - (intMinutes * 60000)) / 1000;
    if (intSeconds == 100) {
      intSeconds = 99;
    }
    intSeconds = Math.floor(intSeconds);
    intMilliseconds = (intTotalMilliseconds - (intHours * 3600000) - (intMinutes * 60000) - (intSeconds * 1000));
  }
  //drop the extra precision from the milliseconds
  intHundredths = Math.floor(intMilliseconds / 10);
  //put in padding 0's and concatinate to get the proper format
  strCMITimeSpan = ZeroPad(intHours, 4) + ":" + ZeroPad(intMinutes, 2) + ":" + ZeroPad(intSeconds, 2);

  if (blnIncludeFraction) {
    strCMITimeSpan += "." + intHundredths;
  }
  //check for case where total milliseconds is greater than max supported by strCMITimeSpan
  if (intHours > 9999) {
    strCMITimeSpan = "9999:99:99";
    if (blnIncludeFraction) {
      strCMITimeSpan += ".99";
    }
  }
  return strCMITimeSpan;
}

function ZeroPad(intNum, intNumDigits) {
  var strTemp;
  var intLen;
  var i;

  strTemp = new String(intNum);
  intLen = strTemp.length;

  if (intLen > intNumDigits) {
    strTemp = strTemp.substr(0, intNumDigits);
  } else {
    for (i = intLen; i < intNumDigits; i++) {
      strTemp = "0" + strTemp;
    }
  }
  return strTemp;
}
