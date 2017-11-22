


var initDevTools = function() {
  document.querySelector('.ui-dev-tools').style.display = 'block';
	enableShakeButton();
};


// Enable the shake button and setup the click event
var enableShakeButton = function() {
  shakeButton.onclick = function()
  {
      shakeScene();
  }
};

var shakeScene = function() {
  shake(document.querySelector("#game"), 10, false);
}
