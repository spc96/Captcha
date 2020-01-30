const charsList = [0,1,2,3,4,5,6,7,8,9,"A", "B", "C", "D", "E", "F", 
            "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", 
            "R", "S", "T", "U", "V", "W", "X", "Y", "Z",'a', 'b',
             'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
              'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x',
               'y', 'z'];

class Captcha {
  constructor(length, characters, width, height, fontSize) {
    this.len = length
    this.chars = characters
    this.width = width
    this.height = height
    this.fontSize = fontSize
  }
  genStr(){
    let charArr = [];
    for (let i = 0; i < this.len; i++) {
      charArr.push(this.chars[Math.floor(Math.random()*(this.chars.length))]);
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
    let randColor = `rgb(${[Math.random()*100 + 156,
                        Math.random()*100 + 156,
                        Math.random()*100 + 156, .45].join()})`;

    ctx.transform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle=randColor;
    ctx.font = `${this.fontSize}px Times`;
    ctx.fillText(str, 5, this.fontSize);
    }
  }
  distortCanvas(){
    let c = document.getElementById("captchaID");
    let ctx = c.getContext("2d");
    let imd = ctx.getImageData(0,0,this.width,this.height);
    let imdCopy = ctx.getImageData(0,0,this.width,this.height);
    
    let w = imd.width * 4
    let h = imd.height * 4
    let d = imd.data
    let d1 = imdCopy.data
    let len = d.length

    for (let i=0; i < len; i+=4) {
      
      //Applies horizontal sine wave transformation
      let row = Math.floor(i/w) + 1;
      let xSin = i + (Math.floor(Math.sin(row * .11) * 18));

      //Applies vertical sine wave transformation to xSin (you can replace xSin with i)
      let ySin = xSin + (w * Math.floor(Math.sin((xSin % w) * .016) * 10));

      let j = ySin;

      d1[j] = d[i];
      d1[j + 1] = d[i + 1];
      d1[j + 2] = d[i + 2];
      d1[j + 3] = d[i + 3];
    } 
    ctx.putImageData(imdCopy, 0, 0);
  }
}

let cap = new Captcha(6,charsList, 270, 90, 70);

let captchaStr = cap.genStr();
cap.genCanvas(captchaStr);
cap.distortCanvas();
//document.getElementById('letters').innerHTML = captchaStr;

function update() {
  captchaStr = cap.genStr();
  cap.genCanvas(captchaStr);
  cap.distortCanvas();
  //document.getElementById('letters').innerHTML = captchaStr;
}

function validateForm() {
  var x = document.forms["myForm"]["fname"].value;
  if (x == captchaStr) {
    alert("Captcha Correct");
    return true;
  }
  else {
    update();
    alert('Captcha Failed')
    return false;
  }
}

const genBtn = document.getElementById("gen_btn");
genBtn.onclick = function() {update()};
