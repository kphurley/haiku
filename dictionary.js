//----dictionary.js----
//This module provides tools for working with the dictionary

var fs = require('fs');

//----Define the dictionary to use----
var data = fs.readFileSync('./cmudict.txt').toString();
var lines = data.toString().split("\n");
var lineSplit = [];
    
lines.forEach(function(line){    
    lineSplit.push(line.split("  "));    
}); 

//Returns a list where lineSplit[0] is the word and lineSplit[1] is the phoneme structure
var generateList = function(){   
    return lineSplit;
};

//This reorganizes the word list up according to the number of syllables they have
//Ex: syllablesArray[1]=[all of the one-syllable words]
function createSyllablesArray(data){
    var syllArr = [];
    data.forEach(function(element){
        var syllableCount = getSyllableCount(element[1]);
        if(!syllArr[syllableCount]) syllArr[syllableCount] = [];
        syllArr[syllableCount].push(element[0]);
    });
    return syllArr;
}

//Helper method to count the syllables given phoneme layout sylls
function getSyllableCount(sylls){
    if(sylls && sylls.match(/\d/g))
        return sylls.match(/\d/g).length;
    return 0;
}

//Gets the phoneme structure for the indicated word if its in the dictionary, undefined otherwise
var getPhonemeStructure = function(word){
    var wordLoc = -1;
    for (var i=0; i<lineSplit.length; i++) {
        if (lineSplit[i][0] == word){
            wordLoc = i;
            break;
        } 
    }
    if(wordLoc != -1) {
        return lineSplit[wordLoc][1];
    }  
}

module.exports = {
    generateList: generateList,
    getPhonemeStructure: getPhonemeStructure,
    createSyllablesArray: createSyllablesArray,
    getSyllableCount: getSyllableCount
};
