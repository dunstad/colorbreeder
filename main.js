var COLOR_MAX = 255;
var COLOR_MIN = 0;

function makeKuhlurDiv(kuhlur) {

  var kuhlurDiv = document.createElement('div');

  kuhlurDiv.kuhlur = kuhlur;
  kuhlurDiv.className = 'kuhlurDiv';
  kuhlurDiv.innerHTML = kuhlur.color.toString();
  kuhlurDiv.style.color = invertColorObject(kuhlur.color).toString();
  kuhlurDiv.style.backgroundColor = kuhlur.color.toString();

  // select one, or if one's already selected, breed
  kuhlurDiv.onclick = function() {

    if (!selected) {
      selected = this;
      this.className += " selected";
    }
    else if (selected === this) {
      this.className = 'kuhlurDiv';
      selected = undefined;
    }
    else {
      document.body.appendChild(makeKuhlurDiv(this.kuhlur.breed(selected.kuhlur)));
      selected.className = 'kuhlurDiv';
      selected = undefined;
    }

    // prevent default behavior
    return false;

  }

  kuhlurDiv.oncontextmenu = function() {

    if (selected === this) {selected = undefined;}
    document.body.removeChild(this);

    // prevent default behavior
    return false;

  }

  return kuhlurDiv;

}

function Kuhlur(color) {
  this.color = color;
  this.breed = function(partner) {
    var newColor = mixColorObjects(this.color, partner.color);
    return new Kuhlur(newColor);
  }
}

function ColorObject(red, green, blue) {

  // make sure the values are between 0 and COLOR_MAX (inclusive)
  this.red = Math.max(Math.min(red, COLOR_MAX), COLOR_MIN);
  this.blue = Math.max(Math.min(blue, COLOR_MAX), COLOR_MIN);
  this.green = Math.max(Math.min(green, COLOR_MAX), COLOR_MIN);

  this.toString = function() {
    return 'rgb(' + this.red + ',' + this.green + ',' + this.blue + ')';
  }

}

function average(numA, numB) {
  return Math.round((numA + numB) / 2);
}

function mutate(number) {
  var mutationStrength = 20;
  var direction = [-1, 1][Math.round(Math.random())];
  return Math.round(number + Math.random() * direction * mutationStrength);
}

function mixColorObjects(colorA, colorB) {
  var newRed =   mutate(average(colorA.red,   colorB.red));
  var newGreen = mutate(average(colorA.green, colorB.green));
  var newBlue =  mutate(average(colorA.blue,  colorB.blue));
  return new ColorObject(newRed, newGreen, newBlue);
}

function invertColorObject(color) {
  var newRed = COLOR_MAX - color.red;
  var newGreen = COLOR_MAX - color.green;
  var newBlue = COLOR_MAX - color.blue;
  return new ColorObject(newRed, newGreen, newBlue);
}

// hardcoded demo
var selected;

var blue = new ColorObject(0, 0, 255);
var red = new ColorObject(255, 0, 0);
var bob = new Kuhlur(blue);
var rob = new Kuhlur(red);
var bobDiv = makeKuhlurDiv(bob);
var robDiv = makeKuhlurDiv(rob);
document.body.appendChild(bobDiv);
document.body.appendChild(robDiv);
