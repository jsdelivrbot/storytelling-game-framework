# Storytelling game framework  
A small framework for developing a storytelling game.  

## Designing a game  
The game is made up of scenes which are defined in JSON. A scene has an image, some text, and some options. Each option contains the scene that will be loaded as a result of the selection. An example scene would look like:    
```
{
  "scene": 4,
  "image": "image-03.jpeg",
  "text": "There is a fork in the road which way do you go?",
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
See data/scene.json for more details  
## Demo  
![demo](https://media.giphy.com/media/3o8dFljDMg8ub3jWGQ/giphy.gif)
