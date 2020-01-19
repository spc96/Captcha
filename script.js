let chars = [0,1,2,3,4,5,6,7,8,9,"A", "B", "C", "D", "E", "F", 
            "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", 
            "R", "S", "T", "U", "V", "W", "X", "Y", "Z",'a', 'b',
             'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
              'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x',
               'y', 'z'];

function randStr (len) {
  let str = [];
  for (let i = 0; i < len; i++) {
    str.push(chars[Math.floor(Math.random()*(chars.length+1))]);
  }
  document.getElementById('letters').innerHTML = str.join("");
}


const genBtn = document.getElementById("gen_btn");
genBtn.onclick = function() {randStr(7)};

function validateForm() {
  var x = document.forms["myForm"]["fname"].value;
  if (x == "") {
    alert("Name must be filled out");
    return false;
  }
}
