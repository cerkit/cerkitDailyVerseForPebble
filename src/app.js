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
  body: 'Press any button.'
});

main.show();

function getVerse(bookChapterVerse) {
  ajax(
  {
    url: 'http://labs.bible.org/api/?passage=votd&type=json',
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
    position: new Vector2(0, 30),
    size: new Vector2(144, 100),
    font: 'gothic-14',
    text: verseString,
    textAlign: 'left'
  });
  
  
  wind.add(chapterVerseText);
  wind.add(verseText);
  wind.show();
}

main.on('click', 'select', function(e) {
  getVerse();
});

main.on('click', 'up', function(e) {
  getVerse();
});

main.on('click', 'down', function(e) {
  getVerse();
});
