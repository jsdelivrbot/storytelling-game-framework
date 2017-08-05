

// Creates a new scene
var newScene = function (text, image, sceneId) {
  setCurrentScene(sceneId);
  // Override the default mode if needed.
  checkMode(sceneId);

  // Prep the scene
  clearMsgBox();

  showText('#msg', text, 0, getTextDisplay(sceneId));
  displayAuthor(sceneId);
  // Display the image
  document.querySelector("#game").style.backgroundImage = 'url(img/' + image + ')';

  // Display options if any
  displayOptions(sceneId);
  snapUIIntoShape();
  gameSave(sceneId);

}



// Goes to the next scene. Use to create a linear story with .next
var nextScene = function() {
  stopDisplayingText();
  var currentScene = getCurrentScene();
  var sceneText = lookup[currentScene+1].text;
  var sceneImage = lookup[currentScene+1].image;
  newScene(sceneText, sceneImage, currentScene+1);
}

// Fetches the current scene
var getCurrentScene = function() {
  return parseInt(document.querySelector("#game").attributes.scene.value);
}
// Sets the current scene. Useful for non-linear stories
var setCurrentScene = function(id) {
  document.querySelector("#game").attributes.scene.value = id;
}



// Loads the scene. Inits the game
var loadScenes = function () {
  var startScene =  getCurrentScene();
  var sceneText = lookup[startScene].text;
  var sceneImage = lookup[startScene].image;
  newScene(sceneText, sceneImage, startScene);
}
