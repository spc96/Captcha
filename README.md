# Captcha
A tool used to verify if a user is a robot or a human. 

The script.js file uses canvas to create an image of distorted characters. This uses sine functions on the x and y axies as the method of distortion, as well as a randomly generated background. Both the character distortion and the random colored background are both intended to make character recognition more difficult for computers.

The style.css and index.html files are very barebones and really just work with the script.js file.

The image_creator.js file can really just be ignored, I used that to do some testing while I was learning how to use canvas.

This project was not meant to be super secure, it was just an exploration into image manipulation and javascript. If this code were employed client-side there would be easy ways to get circumvent the captcha so keep that in mind if you use this.

![alt text](https://raw.githubusercontent.com/spc96/Captcha/master/captcha_image.png)
