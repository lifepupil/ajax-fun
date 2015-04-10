'use strict';

$(document).ready(init);

function init() {
  $('#getRandom').click(getRandom);

}

function getRandom() {
  var number = $('#number').val();

  // can think of this as a function call that goes over the Internet
  $.getJSON('https://qrng.anu.edu.au/API/jsonI.php?length=' + number + '&type=uint16', function(response) {
    $('#sum').text(sumRands(response.data));
    displayRoots(response.data);
  });

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
