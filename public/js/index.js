var defaultTextSpeed = 70;
var haltShowText = false;
// Displays text at speed
var showText = function (target, message, index, interval, override) {
  if (haltShowText && !override)
  {
    haltShowText = false;
    return;
  }

  if (index < message.length) {
    $(target).append(message[index++]);
    setTimeout(function () { showText(target, message, index, interval, override); }, interval);
  }
}

// Creates a new scene
var newScene = function (text, image, sceneId) {
  setCurrentScene(sceneId);
  clearMsgBox();
  var override;
  haltShowText ? override = true :  override = false;
  showText('#msg', text, 0, defaultTextSpeed, override);
  document.querySelector("img.scene").src = 'img/' + image;
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

window.addEventListener("load", function load(event){
  if(document.readyState === 'complete') {
    $("#options").hide();
    loadScenes();

    // Get the modal
    var modal = document.getElementById('myModal');

    // Get the button that opens the modal
    var btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        nextScene();
    }



  }
});
