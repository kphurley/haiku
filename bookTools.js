//This module works with the dictionary, and exports it to a convenient form
var fs = require('fs');
var dict = require('./dictionary')

var Book = function(source){
    //the filename of the source
    this.source = source;
    
    //parse all of the words into an array
    this.words = fs.readFileSync(this.source).toString().match(/[a-zA-Z]+/g);
    
    //all uppercase for convenience
    for(var i=0; i<this.words.length; i++){
        this.words[i] = this.words[i].toUpperCase();
    }
    
}

//get a random phrase from the book of length len
Book.prototype.getRandomPortion = function(len){
    var randSpot = Math.floor(Math.random()*this.words.length);
    return this.words.slice(randSpot, randSpot+len);
}

//Returns a random phrase from this book that is exactly n syllables
Book.prototype.getPhraseBySyllableCount = function(n){
    var excerpt;
    var excerptSyllableCount = [0];
    
    //make sure there are no zeroes in the excerpt (words not in the dictionary)
    //(for some reason I wasnt able to convert excerptSyllableCount to an array using Array.prototype.slice?)
    while(excerptSyllableCount.toString().indexOf('0') != -1){
        excerpt = this.getRandomPortion(n);
        excerptSyllableCount = excerpt.map(dict.getPhonemeStructure).map(dict.getSyllableCount);
    }
    
    //(find x consecutive entries of the array whose sum is n, then join those entries and return it)
    var sumLocs = (function(theArr, n){
        var sum = 0;
        var indices = [];
        for(var i=0; i<theArr.length; i++){
            sum=theArr[i];
            if(sum==n) return [i];
            indices.push(i);
            for(var j=i+1; j<theArr.length; j++){
                sum+=theArr[j];
                indices.push(j);
                if(sum==n) return indices;
                if(sum>n) {
                    indices = [];
                    break;
                }
            }
        }
	
	   return -1})(excerptSyllableCount, n); //IIFEs FTW
    
    var entries = [];
    
    if(sumLocs != -1) {
        sumLocs.forEach(function(idx){
            entries.push(excerpt[idx]);
        });
    }
    
    return entries.join(' ');
    
}

module.exports = Book;

