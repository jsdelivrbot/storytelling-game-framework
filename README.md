# Storytelling game framework  
A small framework for developing a storytelling game.  

## Designing a game  
The game is made up of scenes which are defined in JSON. A scene has an image, some text, and some options. Each option contains the scene that will be loaded as a result of the selection. An example scene would look like:    
```
{
  "scene": 4,
  "image": "image-03.jpeg",
  "text": "There is a fork in the road which way do you go?",
  "mode": "non-linear",
  "options":
  [
    {
      "id": 1,
      "option": "Go left (Dangerous)",
      "scene": 5
    },
    {
      "id": 2,
      "option": "Go right (Safe)",
      "scene": 6
    }
  ]
}
```  

## Scene
- *scene*: The scene id. Define these sequentially.
- *image*: The image file name that will be loaded from public/img.  
- *text*: The text that will be displayed in the message box.  
- *author*: Text displayed above the message box indicating it was spoken by [author].
- *mode*: Defines how the scene is displayed
  - *non-linear*: Expects options to exist and will wait for a selection.  
  - *auto*: Displays the text and waits for the config.wait setting (default 2000ms).  
  - *linear*: Displays the text and will wait for a the next scene button to be pressed.  
- *textDisplay*: Defines the delay between characters being displayed in ms in the message box.  
- *options*: Defines options to use when in non-linear mode  
  - *id*: The id of the option  
  - *option*: The text value of the option  
  - *scene*: The target scene that the user will be taken to upon selection  

See data/scene.json for examples.    
## Config
Inside of scene.json can be a config that is defined with the following properties:  
- *wait*: Defines the wait time in ms of the auto mode.  
- *mode*: Defines the starting/default mode. Note: Once a mode is set in a scene this is not used so it's best practice to not rely on this unless the entire game is in single mode.  
- *textDisplay*: Defines the default seconds in between each letter displayed in the message box. 50-80 seems to be ideal. If a scene doesn't define this then this value will be used.
```
"config":
{
    "mode": "non-linear",
    "wait": 2000
    "textDisplay": 80
}
```  

See data/scene.json for more details  
## Demo  
Heroku: https://mighty-journey-33323.herokuapp.com/  
![demo](https://media.giphy.com/media/3o8dFljDMg8ub3jWGQ/giphy.gif)
