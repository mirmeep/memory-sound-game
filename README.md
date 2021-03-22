# Pre-work - *Memory Game*

**Memory Game** is a Light & Sound Memory game to apply for CodePath's SITE Program. 

Submitted by: Miranda Peak

Time spent: 5.25 hours spent in total

Link to project: https://glitch.com/edit/#!/memory-sound-game?path=README.md%3A10%3A0

## Required Functionality

The following **required** functionality is complete:

* [y] Game interface has a heading (h1 tag), a line of body text (p tag), and four buttons that match the demo app
* [y] "Start" button toggles between "Start" and "Stop" when clicked. 
* [y] Game buttons each light up and play a sound when clicked. 
* [y] Computer plays back sequence of clues including sound and visual cue for each button
* [y] Play progresses to the next turn (the user gets the next step in the pattern) after a correct guess. 
* [y] User wins the game after guessing a complete pattern
* [y] User loses the game after an incorrect guess

The following **optional** features are implemented:

* [y] Any HTML page elements (including game buttons) has been styled differently than in the tutorial
* [y] Buttons use a pitch (frequency) other than the ones in the tutorial
* [y] More than 4 functional game buttons
* [y] Playback speeds up on each turn
* [y] Computer picks a different pattern each time the game is played
* [y] Player only loses after 3 mistakes (instead of on the first mistake)
* [ ] Game button appearance change goes beyond color (e.g. add an image)
* [ ] Game button sound is more complex than a single tone (e.g. an audio file, a chord, a sequence of multiple tones)
* [ ] User has a limited amount of time to enter their guess on each turn

The following **additional** features are implemented:

- [y] When the program plays the sequence, disable the buttons
- [y] Instead of adding an image, I added the corresponding letter to the pitch frequency, which shows only when the user presses the button
and when the sequence plays.
- [y] Display the current level.

## Video Walkthrough

Here's a walkthrough of implemented user stories:
![]
<img src="https://cdn.glitch.com/6983e0b6-5c29-484e-a925-3c9cd8633e83%2Fsubmit1.gif?v=1616439270301"/><br>
<img src="https://cdn.glitch.com/6983e0b6-5c29-484e-a925-3c9cd8633e83%2Fsubmit2.gif?v=1616439615852"/><br>

## Reflection Questions
1. If you used any outside resources to help complete your submission (websites, books, people, etc) list them here. 

For Math.ceil when randomizing in order to obtain an int: https://www.w3schools.com/jsref/jsref_ceil.asp

Math.ceil when dealing with randomizing numbers: https://stackoverflow.com/questions/15830658/random-number-math-floor-vs-math-ceil

Syntax for innerHTML to display the number of mistakes: https://www.w3schools.com/js/js_output.asp

Syntax for disabling buttons: https://www.w3schools.com/jsref/prop_pushbutton_disabled.asp

Syntax for setTimeout: https://www.w3schools.com/jsref/met_win_settimeout.asp

Piano key frequencies: https://en.wikipedia.org/wiki/Piano_key_frequencies

To prevent buttons from shifting when letters show: https://developer.mozilla.org/en-US/docs/Web/CSS/float


2. What was a challenge you encountered in creating this submission (be specific)? How did you overcome it? (recommended 200 - 400 words) 

I had issues when trying to calculate the ceiling for randomizing numbers. Since I was using both Math.random and Math.ceil at the same time, 
I thought I was facing syntax issues with the combined built-in functions. My process of debugging was printing to the console and seeing what numbers I was generating. 
I played around with randomizing a variable of a number from 1-6, and then taking the ceiling of that variable. However, I was still having issues.
Eventually, I found out my error was the syntax for just the Math.random() function. To get a number between 1 and 6, you have to 
multiply 6 by Math.random() and for a while, I was convinced it was Math.random() + 6, which is Java syntax (my primary language).

I had issues with syntax for getElementById to display the current number of mistakes. I thought I was having issues with passing the value of the variable to the html element,
since that seems like a place a mistake could occur. I printed to the console whether the variable had a value stored in the first place, which it did.
Eventually, I looked at an example online and realized I had getElementbyId instead of a capital b.

I had another issue when trying to disable the buttons when the sequence was playing. I chose to add this feature since I noticed that
the player was still able to input their guesses before the sequence stopped playing, which would confuse the player and inevitably mess up
their guesses. At first, I disabled all the buttons right before playClueSequence was called, and then enable the buttons right after
playClueSequence. However, enabling the buttons seemed to have never disabled them in the first place. After debugging by printing to the console
to make sure that my buttons were both able to disable and enable, I realized that I needed to use setTimeout before I called my disableButtons
function. I realized that the code compiles immediately, without waiting for the tones to finish playing. I used setTimeout and the delay variable
to delay the buttons enabling until after the sequence completed. 

Lastly, since I decided to implement the feature where the user has multiple chances and the sequence speeds up per each level, I realized that
when the user would make a mistake, the sequence would repeat, but would continue to speed up. This doesn't make sense on the user end, since
if the user makes a mistake, they would want to hear the same sequence again at the same pace. I created a variabe called isRepeat, that when set to true,
it means that the user made a mistake and needs to hear the same sequence at the same pace. In my playClueSequence function, I only decremented the clueHoldTime
if isRepeat is false, so that if isRepeat is true, theClueHold time wouldn't get shorter. 

3. What questions about web development do you have after completing your submission? (recommended 100 - 300 words) 

Is it possible to have JavaScript syntax in HTML? If I had more time, I would want to refactor the buttons in the HTML, especially
the gameButtonsArea div, which has redundant code for displaying the buttons. Instead of having multiple button elements with all similar features, 
I would add a for loop to render the buttons

I would want to learn how to save the user's progress when the page is reloaded. Of course, if the user was in the middle of a game and the page reloaded,
it should start at the beginning of the game. If I knew how to save progress when the page was reloaded, I would display the total games the player won and maybe have an achievements
bar (such as "win a game 10 times!" or "win 5 games in a row!").


4. If you had a few more hours to work on this project, what would you spend them doing (for example: refactoring certain functions, adding additional features, etc). Be specific. (recommended 100 - 300 words) 

If I had more time, I would figure out a way to play chords using the built in library AudioContext. Button 1 would be a C major chord,
which would play the pitch frequences for C, E, and G at the same time. For button 2 I would have a D major chord, which would play D, F#, and A
at the same time. I would do this for E, F, G, and A major chords for the rest of the buttons respectively. This was my first time messing around with audio
in a web development context so I am not familiar with AudioContext, but I would love to add these features later. 

Lastly, if I had more time, I would add a timer. If the player makes a mistake, the timer would pause while the sequence would play again, and then continue once the user is able to input guesses. This
would add a challenge on the user end as the timer wouldn't reset after each mistake, which acts as a penalty. At the start of the game, the timer would be set to 10000ms(10s). 
At the end of each level, the timer would decrement by 500ms(.5s), and by the last level, the player would only have 5500ms (5.5s) left.





## License

    Copyright Miranda Peak

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.