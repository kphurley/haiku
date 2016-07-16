//---haiku.js---

//Book provides support for working with an existing source material (Gutenberg or any other file in txt format)
var Book = require('./bookTools');

//This module works with the provided word list and uses it to form a randomly generated haiku poem
var wl = require('./dictionary');
var wordList = wl.generateList();
var syllablesArray = wl.createSyllablesArray(wordList);

/*  --createHaiku--
  - source will be an optional parameter indicating which text to draw from
  - if the source is present createHaiku will search the source for a Haiku matching the structure
  - otherwise, it will generate one randomly from the dictionary
*/
function createHaiku(structure, source){
    var generatedHaiku = '';
    var lineBreakCount = 0;
    
    if(source){
        var myBook = new Book(source);
        generatedHaiku = myBook.getPhraseBySyllableCount(5)+'\n'+
            myBook.getPhraseBySyllableCount(7)+'\n'+
            myBook.getPhraseBySyllableCount(5);        
    } 
    else{  
        structure.forEach(function(idx){
            generatedHaiku += syllablesArray[idx][Math.floor(Math.random()*syllablesArray[idx].length)] + ' ';
            lineBreakCount += idx;
            if(lineBreakCount == 5 || lineBreakCount == 12) generatedHaiku+='\n';
        });
    }
    return generatedHaiku;
};

module.exports = {
    createHaiku: createHaiku
};
