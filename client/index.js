'use strict';

$(document).ready(init);

var respArr;

function init() {
  $('#getRandom').click(getRandom);

}

function getRandom() {
  var number = $('#number').val();
  var respArr;

  // can think of this as a function call that goes over the Internet
  // the function inside the getJSON function is a CALLBACK FUNCTION
  $.getJSON('https://qrng.anu.edu.au/API/jsonI.php?length=' + number + '&type=uint16',
    function(response) {
      $('#sum').text(sumRands(response.data));
      displayRoots(response.data);
      dostuff(response.data);
    }
  );
  // there's no point to putting any code after this API, e.g. console.log(respArr), because it will always be undefined
  // so must create function to call and set global variable to get these data out.
}

function dostuff(arr) {
  respArr = arr;
  console.log(respArr);
}

function sumRands(resp) {
  var rsum = 0;
  // debugger;
  for (var i=0; i<resp.length ; i++) {
    rsum+=resp[i];
  }
  return rsum;
}

function displayRoots(numbers) {
  var roots = numbers.map(function(n) {
    return Math.sqrt(n);
  });

  var divs = roots.map(function(r){
    var $div = $('<div>');
    $div.addClass('root');
    $div.text(r);
    return $div;
  });

  $('#roots').append(divs);
}
