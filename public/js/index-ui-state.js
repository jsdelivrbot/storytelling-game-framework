
// Display Controls UI Component
var enableControls = function() {
  controls.style.display = "";
};

// Hide Controls UI Component
var disableControls = function() {
  controls.style.display = "none";
};

// Enable the pause button and setup the click event
var enablePauseButton = function() {
  // When the user clicks on <span> (x), goto the next scene
  pauseButton.style.display="";
  playButton.style.display="none";
  pauseButton.onclick = function()
  {
      enablePlayButton();
      turnOffAutoMode();
  }
};

// Enable the play button and setup the click event
var enablePlayButton = function() {
  // When the user clicks on <span> (x), goto the next scene
  playButton.style.display="";
  pauseButton.style.display="none";
  playButton.onclick = function()
  {
      nextScene();
      enablePauseButton();
  }
};

// Enable the next button and setup the click event
var enableNextButton = function() {
  // When the user clicks on <span> (x), goto the next scene
  nextButton.style.display="";
  nextButton.onclick = function()
  {
    interruptAutoMode=true;
    nextScene();
  }
};

// Clears the msg box text
var clearMsgBox = function() {
  document.querySelector("p#msg").innerHTML = "";
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
      e.preventDefault();
      setCurrentScene(parseInt(this.target)-1);
      nextScene();
      return false;
    });
  }
}

// Displays the author component or destroys it
var displayAuthor = function(sceneId) {
    if(lookup[sceneId].author)
    {
      uiAuthorModal.style.display = "";
      uiAuthorMsg.innerHTML = lookup[sceneId].author;
    }
    else
    {
      uiAuthorModal.style.display = "none";
    }
};

// Displays text with an animation
var showText = function (target, message, index, interval) {
  if (index < message.length)
  {
    $(target).append(message[index++]);
    showTextTimeOut = setTimeout(function () { showText(target, message, index, interval); }, interval);
  }
  else
  {
    finishedDisplayingText = true;
  }
}

// Stop displaying text. Use to prevent race conditions
var stopDisplayingText = function() {
    clearTimeout(showTextTimeOut);
};

// Fetches the textDisplay value of a scene or returns config.textDisplay
var getTextDisplay = function(sceneId) {
  var displaySpeed = lookup[sceneId].textDisplay || config.textDisplay;
  return displaySpeed;
}
