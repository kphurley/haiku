//This module works with the dictionary, and exports it to a convenient form
var fs = require('fs');

//constructor for a book object
var Book = function(source){
    //the url/filename of the source
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

var getExcerpt = function(source, len){
    var book = new Book(source);
    return book.getRandomPortion(len);
}

module.exports = {
    getExcerpt: getExcerpt
};
