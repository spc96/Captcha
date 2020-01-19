// we create a canvas element
var canvas = document.createElement('canvas');
var height=100;
var width=200;

canvas.height=height;
canvas.width=width;
// getting the context will allow to manipulate the image
var context = canvas.getContext("2d");

// We create a new imageData.
var imageData=context.createImageData(width, height);
// The property data will contain an array of int8
var data=imageData.data;
for (var i=0; i<height*width; i++) {
     data[i*4+0]=Math.random()*128 | 0; // Red
     data[i*4+1]=Math.random()*128 | 0; // Green
     data[i*4+2]=Math.random()*128 | 0; // Blue
     data[i*4+3]=100; // alpha (transparency)
}
// we put this random image in the context
context.putImageData(imageData, 0, 0); // at coords 0,0

let randColor = `rgb(${[Math.random()*128 + 128,
                        Math.random()*128 + 128,
                        Math.random()*128 + 128, .4].join()})`;

context.fillStyle=randColor;
console.log(randColor);
context.font = "40px Times";
context.fillText("LKsN3D", 25, 60);


function createData(type, mimetype) {
    var value=canvas.toDataURL(mimetype);
    if (value.indexOf(mimetype)>0) { // we check if the format is supported
        return {
            type:type,
            value:value
        }
    } else {
        return false;
    }
}

set("png",createData("png","image/png"));
set("jpg",createData("jpg","image/jpeg"));
set("webp",createData("webp","image/webp"));

var image = new Image();
image.src = "http://i.stack.imgur.com/jNAXA.jpg";
context.drawImage(image, 33, 71, 104, 124, 21, 20, 87, 104);
