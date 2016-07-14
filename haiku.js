//---haiku.js---

//This module works with the provided word list and uses it to form a randomly generated haiku poem

var wl = require('./wordList');
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

function createHaiku(structure){
    var generatedHaiku = '';
    var lineBreakCount = 0;
    structure.forEach(function(idx){
       generatedHaiku += syllablesArray[idx][Math.floor(Math.random()*syllablesArray[idx].length)] + ' ';
        lineBreakCount += idx;
        if(lineBreakCount == 5 || lineBreakCount == 12) generatedHaiku+='\n';
    });
    return generatedHaiku;
};

module.exports = {
    createHaiku: createHaiku
};
