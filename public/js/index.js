// Globals
var autoModeTimeOut;
var autoModeOff;
var interruptAutoMode = false;
var showTextTimeOut;



// Init Game
window.addEventListener("load", function load(event){
  // Setup UI variables
  nextButton = document.getElementsByClassName("next")[0];
  pauseButton = document.getElementsByClassName("pause")[0];
  playButton = document.getElementsByClassName("play")[0];
  controls = document.querySelector("#controls.modal");
  uiAuthorMsg = document.querySelector("p#author");
  uiAuthorModal = document.querySelector("#author.modal");

  // Config defaults
  config.mode = config.mode || "linear";
  config.wait = config.wait || 2000;
  config.textDisplay = config.textDisplay || 70;
  if(document.readyState === 'complete') {
    $("#options").hide();
    playButton.style.display="none";

    // Init game
    loadScenes();

  }
});
