# Historic NashGuessr

Test your knowledge of Nashville's historic architecture and development with Historic NashGuessr.

Nashville has a wealth of historic properties. Many of these properties have been listed on the National Register of Historic Places. You can view search these properties on the National Park Service's website, but why not learn more about Nashville's history by playing a game?

Historic NashGuessr gives you a random image from a list of 100 Nashville buildings listed on the National Register of Historic Places. Take a look at the image and then use your knowledge of Nashville geography, development, or architectural history to determine where that building is in Nashville. Place a pin where you think it is located and see how close you are to the actual location. You can learn more about the building, view additional photos or the national register nomination form, and save the building for further research.

If you enjoy this game, checkout [Geoguesser](https://geoguessr.com/), a great game from which I owe all my inspiration.

## Application

Upon intitialization, the user must log-in with Google in order to use the application.

After clicking "Login with Google", the user will be presented with her personal homepage. Here she can view saved places and recent scores. She can also play a new game.

Upon click of "Play Game", she will see an image of a historical building in Nashville. Once she clicks find on map, she will be presented with a google map. She can pan and zoom to find the location she thinks the building is located at. Next, she will place a pin and click "see results".

The results page will show the actual location of the historic building, a score based on proximity, and give the user a few options. She can play again, save the place to her places collection, or view the details of the place she saw in her game.

If she chooses to view details, she will get the name of the place, see the image again, and have the option to view the National Register Nomination and additional photos.

From her homepage she can add notes to the place if she wants to remember the architectural style, location, cool feature, etc.

Information about the National Register of Historic Places and the game can be accessed from the Information link in the navigation bar.

## Installation

Clone this repository to your local machine

Install necessary dependencies and compile necessary files:

```
cd capstone/lib

npm install

grunt

```

You will need a unique API key.
[Contact me](https://github.com/megbrown) for the key and any questions/comments you may have!


## Built With

* [ng-map](https://ngmap.github.io/)
* [AngularJS](https://angularjs.org/)
* [Firebase](https://firebase.google.com/)


## Author

* **Megan Brown** - [megbrown](https://github.com/megbrown)

