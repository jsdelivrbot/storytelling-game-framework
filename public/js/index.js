var defaultTextSpeed = 70;
var haltShowText = false;
var autoModeOff;
// Displays text at speed
var showText = function (target, message, index, interval, override) {
  if (haltShowText && !override)
  {
    haltShowText = false;
    return;
  }

  if (index < message.length)
  {
    $(target).append(message[index++]);
    setTimeout(function () { showText(target, message, index, interval, override); }, interval);
  }
  else
  {
    finishedDisplayingText = true;
  }
}

// Creates a new scene
var newScene = function (text, image, sceneId) {
  setCurrentScene(sceneId);
  // Override the default mode if needed.
  checkMode(sceneId);

  // Prep the scene
  clearMsgBox();
  // Override prevents text from displaying in new scene if a selection is made before it finishes displaying
  var override;
  haltShowText ? override = true :  override = false;
  showText('#msg', text, 0, defaultTextSpeed, override);

  // Display the image
  document.querySelector("img.scene").src = 'img/' + image;

  // Display options if any
  displayOptions(sceneId);
}

// Displays options if there are any and deletes old options
var displayOptions = function(sceneId) {
  $("#listoptions").remove();
  $(".option").remove();
  if(lookup[sceneId].options)
  {
    $("#options").show();
    $("#options").append("<ul id='listoptions'>");
    lookup[sceneId].options.forEach(function(option) {
      $("#listoptions").append("<li><a href='#'  id=" + option.id + " class='option' target= " + option.scene + ">" + option.option + "</a></li>");
    });
    $(".option").on('click', function(e) {
      haltShowText=true;
      e.preventDefault();
      setCurrentScene(parseInt(this.target)-1);
      nextScene();
      return false;
    });
  }
}

// Goes to the next scene. Use to create a linear story with .close
var nextScene = function() {

  var currentScene = getCurrentScene();
  var sceneText = lookup[currentScene+1].text;
  var sceneImage = lookup[currentScene+1].image;
  newScene(sceneText, sceneImage, currentScene+1);
}

// Fetches the current scene
var getCurrentScene = function() {
  return parseInt(document.querySelector("img.scene").id);
}
// Sets the current scene. Useful for non-linear stories
var setCurrentScene = function(id) {
  document.querySelector("img.scene").id = id;
}

// Clears the msg box text
var clearMsgBox = function() {
  document.querySelector("p#msg").innerHTML = "";
}

// Loads the scene. Inits the game
var loadScenes = function () {
  var startScene =  getCurrentScene();
  var sceneText = lookup[startScene].text;
  var sceneImage = lookup[startScene].image;
  newScene(sceneText, sceneImage, startScene);
}
var turnOnLinearMode = function() {
  var span = document.getElementsByClassName("close")[0];
  // When the user clicks on <span> (x), goto the next scene
  span.style.display="";
  span.onclick = function()
  {
      nextScene();
  }
};
var checkMode = function(sceneId) {
  if(lookup[sceneId].mode)
  {
    setMode(lookup[sceneId].mode);
  }
};

var turnOnAutoMode = function() {
  Object.defineProperty(this, 'finishedDisplayingText', {
    configurable: true,
    get: function () { return myVar; },
    set: function (v) {
      myVar = v;
      if (autoModeOff == false)
      {
        setTimeout(function(){
          nextScene();
        }, config.wait);
      }
    }
  });
};

// Set the mode
// Auto = Display text and go to the nextScene
// non-linear = Display text + Options and wait
// linear = Display text + show a nextScene arrow and wait
var setMode = function(mode) {
  var span = document.getElementsByClassName("close")[0];
  console.log(mode);
  if(mode == "linear")
  {
    autoModeOff = true;
    config.mode = mode;
    turnOnLinearMode();
  }
  else if (mode == "non-linear")
  {
    autoModeOff = true;
    span.style.display="none";
  }
  else if (mode == "auto")
  {
    span.style.display="none";
    autoModeOff = false;
    turnOnAutoMode();
  }
  else
  {
      console.log("Invalid mode detected: " + mode);
  }
}

window.addEventListener("load", function load(event){
  config.mode = config.mode || "linear";
  config.wait = config.wait || 2000;
  if(document.readyState === 'complete') {
    $("#options").hide();
    loadScenes();

  }
});
