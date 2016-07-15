//----wordList.js----

//This module works with the dictionary, and exports it to a convenient form
var fs = require('fs');

//----Define the word bank to use----
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
    getPhonemeStructure: getPhonemeStructure
};
