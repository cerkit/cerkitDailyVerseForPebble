/*******************************
 * cerkit.com Daily Verse app
 *******************************/

var UI = require('ui');
//var Vector2 = require('vector2');
var ajax = require('ajax');
var PASSAGE_TYPE_DAILY = 'votd';
var PASSAGE_TYPE_RANDOM = 'random';

var main = new UI.Card({
  title: 'cerkit.com Daily Verse',
  icon: '',
  subtitle: 'NET Version',
  body: 'Press up or select for daily. Press down for random.'
});

main.show();

var verseCard = function(bookChapterVerse, verseText) { 
  var vCard = new UI.Card({
    title: bookChapterVerse,
    subtitle: '',
    scrollable: true,
    body: verseText
  });
  
  vCard.show();
};

function getVerse(passage) {
  ajax(
  {
    url: 'http://labs.bible.org/api/?passage=' + passage + '&type=json&formatting=plain',
    type: 'json'
  },
  function(data, status, request) {
    showVerse(data);
  },
  function(error, status, request) {
    console.log('The ajax request failed: ' + error);
  });
}

function showVerse(data) {
  
  // divide up the data into separate verses if necessary
  var bookChapterVerse = data[0].bookname + ' ' + data[0].chapter + ':' + data[0].verse;
  if(data.length > 1) {
    bookChapterVerse += '-' + data[data.length -1].verse;
  }
  
  var verseString = '';
  
  for(var i = 0; i < data.length; i++){
    verseString += data[i].verse + ' ' + data[i].text + ' ';
  }
  
  verseCard(bookChapterVerse, verseString);
  
}

main.on('click', 'select', function(e) {
  getVerse(PASSAGE_TYPE_DAILY);
});

main.on('click', 'up', function(e) {
  getVerse(PASSAGE_TYPE_DAILY);
});

main.on('click', 'down', function(e) {
  getVerse(PASSAGE_TYPE_RANDOM);
});