//---haiku.js---

//This module provides support for working with an existing source material (Gutenberg or other book in txt format)
var bookTools = require('./bookTools');

//This module works with the provided word list and uses it to form a randomly generated haiku poem
var wl = require('./dictionary');
var wordList = wl.generateList();
var syllablesArray = createSyllablesArray(wordList);

function createSyllablesArray(data){
    var syllArr = [];
    data.forEach(function(element){
        var syllableCount = getSyllableCount(element[1]);
        if(!syllArr[syllableCount]) syllArr[syllableCount] = [];
        syllArr[syllableCount].push(element[0]);
    });
    return syllArr;
}


//Helper method to count the syllables given the phoneme layout
function getSyllableCount(sylls){
    if(sylls && sylls.match(/\d/g))
        return sylls.match(/\d/g).length;
    return 0;
}

//source will be an optional parameter indicating which text to draw from
function createHaiku(structure, source){
    var generatedHaiku = '';
    var lineBreakCount = 0;
    
    //TODO - This sometimes works but there's a flaw.  Sometimes the words don't work out so it hits 5 and 12 perfectly
    //Its also problematic when the word doesn't appear in the dictionary (old English)
    //One idea is to map the entire dictionary to syllable values and match that up with the structure passed as an arg
    
    if(source){
        
        var wordsFromBook = bookTools.getExcerpt(source, 20);
        var syllsInWords = wordsFromBook.map(wl.getPhonemeStructure).map(getSyllableCount);
        
        for(var i = 0; i< wordsFromBook.length && lineBreakCount < 18; i++){
            generatedHaiku += wordsFromBook[i] + ' ';
            lineBreakCount += syllsInWords[i];
            if(lineBreakCount == 5 || lineBreakCount == 12) generatedHaiku+='\n';
        }          
             
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
