/*******************************
 * cerkit.com Daily Verse app
 *******************************/

var UI = require('ui');
var Vector2 = require('vector2');
var ajax = require('ajax');

var main = new UI.Card({
  title: 'cerkit.com Daily Verse',
  icon: 'ICON_BIBLE',
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

function getVerse() {
  ajax(
  {
    url: 'http://labs.bible.org/api/?passage=votd&type=json&formatting=plain',
    type: 'json'
  },
  function(data, status, request) {
    showVerse(data);
  },
  function(error, status, request) {
    console.log('The ajax request failed: ' + error);
  });
}

function getRandomVerse() {
  ajax(
  {
    url: 'http://labs.bible.org/api/?passage=random&type=json&formatting=plain',
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
  
  /*
  var wind = new UI.Window({
    fullscreen: true,
  });
  var chapterVerseText = new UI.Text({
    position: new Vector2(0, 0),
    size: new Vector2(144, 30),
    font: 'gothic-18-bold',
    text: bookChapterVerse,
    textAlign: 'center'
  });
  
  var verseText = new UI.Text({
    position: new Vector2(0, 25),
    size: new Vector2(144, 160),
    font: 'gothic-14',
    text: verseString.replace('&#8211;','-'),
    textAlign: 'left'
  });
  
  
  wind.add(chapterVerseText);
  wind.add(verseText);
  wind.show();
  
  wind.on('click', 'select', function(e) {
    getVerse();
  });
  
  wind.on('click', 'up', function(e) {
    getVerse();
  });
  
  wind.on('click', 'down', function(e) {
    getRandomVerse();
  });
 */
  
}

main.on('click', 'select', function(e) {
  getVerse();
});

main.on('click', 'up', function(e) {
  getVerse();
});

main.on('click', 'down', function(e) {
  getRandomVerse();
});