
// If mode is defined for the scene then set it
var checkMode = function(sceneId) {
  if(lookup[sceneId].mode)
  {
    setMode(lookup[sceneId].mode);
  }
  else
  {
    checkMode(sceneId-1);
  }
};

// Set the mode
// Auto = Display text and go to the nextScene
// non-linear = Display text + Options and wait
// linear = Display text + show a nextScene arrow and wait
var setMode = function(mode) {
  config.mode = mode;
  if(mode == "linear")
  {
    enableControls();
    playButton.style.display="none";
    pauseButton.style.display="none";
    turnOffAutoMode();

    enableNextButton();
  }
  else if (mode == "non-linear")
  {
    turnOffAutoMode();
    // Disable next button
    disableControls();
  }
  else if (mode == "auto")
  {
    enableControls();
    autoModeOff = false;
    turnOnAutoMode();
    enableNextButton();
    enablePauseButton();
  }
  else
  {
      console.log("Invalid mode detected: " + mode);
  }
}

// Enables auto mode
var turnOnAutoMode = function() {
  Object.defineProperty(this, 'finishedDisplayingText', {
    configurable: true,
    get: function () { return myVar; },
    set: function (v) {
      myVar = v;
      if (autoModeOff == false)
      {
        autoModeTimeOut = setTimeout(function(){
            nextScene();
        }, config.wait);
      }
    }
  });
};

// Disables auto mode
var turnOffAutoMode = function() {
    autoModeOff = true;
    clearTimeout(autoModeTimeOut);
};
