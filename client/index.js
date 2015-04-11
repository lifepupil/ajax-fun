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
      setGlobalVariable(response.data);
    }
  );
  // there's no point to putting any code after this API, e.g. console.log(respArr), because it will always be undefined
  // so must create function to call and set global variable to get these data out.
}

function setGlobalVariable(arr) {
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

  // var maxRoot = 0;
  // var maxNum = 0;

  var divs = roots.map(function(r,i){
    var $div = $('<div>');
    $div.addClass('root');

    var $div1 = $('<div>');
    $div1.text(numbers[i]);
    var numCol = numbers[i]%2 === 0 ? $div1.css('color', 'red') : $div1.css('color', 'blue');
    // numbers[i]>maxNum ? maxNum = numbers[i] : maxNum;

    var $div2 = $('<div>');
    var intRoot = parseInt(r);
    $div2.text(intRoot);

    $div.append($div1, $div2);
    return $div;
  });

  // var maxRoot = Math.max.apply(null, numbers);
  // var maxNum = Math.max.apply(null, roots);
  //
  // var $divMaxRoot = $('<div>');
  // $divMaxRoot.text(maxRoot);
  //
  // var $divMaxNum = $('<div>');
  // $divMaxNum.text(maxNum);
  //
  // var $div = $('<div>');
  // $div.append($divMaxNum, $divMaxRoot);


  // this puts the divs that were created and puts them into the #roots tag
  $('#roots').append(divs);
}
