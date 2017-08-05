// Globals
var autoModeTimeOut;
var autoModeOff;
var interruptAutoMode = false;
var showTextTimeOut;
var windowWidth;
var windowHeight;

// Init Game
window.addEventListener("load", function load(event){
  // Setup UI variables

  nextButton = document.getElementsByClassName("next")[0];
  pauseButton = document.getElementsByClassName("pause")[0];
  playButton = document.getElementsByClassName("play")[0];
  controls = document.querySelector("#controls.modal");
  uiAuthorMsg = document.querySelector("p#author");
  uiAuthorModal = document.querySelector("#author.modal");
  uiAuthorModalContent = document.querySelector("#author.modal-content");
  uiAuthorModalContentJq = $('#author.modal-content');
  uiMessageModalContent = document.querySelector('#message.modal-content');
  uiControlsModalContent = document.querySelector('#controls.modal-content');
  uiControlsModalContentJq = $('#controls.modal-content');


  // Config defaults
  config.mode = config.mode || "linear";
  config.wait = config.wait || 2000;
  config.textDisplay = config.textDisplay || 70;
  if(document.readyState === 'complete') {
    $(window).on('resize', function () {
      snapUIIntoShape()
    });
    $("#options").hide();
    playButton.style.display="none";
    // Init game
    loadScenes();

  }
});
