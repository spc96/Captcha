const charsList = [0,1,2,3,4,5,6,7,8,9,"A", "B", "C", "D", "E", "F", 
            "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", 
            "R", "S", "T", "U", "V", "W", "X", "Y", "Z",'a', 'b',
             'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
              'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x',
               'y', 'z'];

class Captcha {
  constructor(length, characters, width, height) {
    this.len = length
    this.chars = characters
    this.width = width
    this.height = height
  }

  genStr(){
    let charArr = [];
    for (let i = 0; i < this.len; i++) {
      charArr.push(this.chars[Math.floor(Math.random()*(this.chars.length+1))]);
    }
    let charStr = charArr.join("");
    return charStr;
}
  genCanvas(str){
    let c = document.getElementById("captchaID");
    c.width = this.width;
    c.height = this.height;
    let ctx = c.getContext("2d");
    let imageData = ctx.createImageData(this.width, this.height);
    let data=imageData.data;
    for (let i=0; i<this.height*this.width; i++) {
         data[i*4+0]=Math.pow(Math.random(),2)*256 | 0; // Red
         data[i*4+1]=Math.pow(Math.random(),2)*256 | 0; // Green
         data[i*4+2]=Math.pow(Math.random(),2)*256 | 0; // Blue
         data[i*4+3]=100; // alpha (transparency)
    ctx.putImageData(imageData, 0, 0);
    let randColor = `rgb(${[Math.random()*128 + 128,
                        Math.random()*128 + 128,
                        Math.random()*128 + 128, .4].join()})`;

    ctx.transform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle=randColor;
    ctx.font = "45px Times";

    ctx.fillText(captchaStr, 5, 50);
    }

  }
}

let cap = new Captcha(6,charsList, 200, 80);

let captchaStr = cap.genStr();
cap.genCanvas(captchaStr);
document.getElementById('letters').innerHTML = captchaStr;

function update() {
  captchaStr = cap.genStr();
  cap.genCanvas(captchaStr);
  document.getElementById('letters').innerHTML = captchaStr;
}

function validateForm() {
  var x = document.forms["myForm"]["fname"].value;
  if (x == captchaStr) {
    alert("Captcha Correct");
    return true;
  }
  else {
    alert('Captcha Failed')
    return false;
  }
}

const genBtn = document.getElementById("gen_btn");
genBtn.onclick = function() {update()};
