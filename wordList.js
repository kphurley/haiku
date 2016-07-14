//----wordList.js----

//This module works with the word list, and exports it to a convenient form
var fs = require('fs');

var generateList = function(){
    //----Define the word back to use----
    var data = fs.readFileSync('./cmudict.txt').toString();
    var lines = data.toString().split("\n"),
       lineSplit = [];
    
    lines.forEach(function(line){    
        lineSplit.push(line.split("  "));    
    }); 
    
    return lineSplit;
};

module.exports = {
    generateList: generateList
};
