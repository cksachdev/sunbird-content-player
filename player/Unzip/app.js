const extract = require('extract-zip');
const fs = require('fs');
var folder ="C:/Users/anirban/Documents/diksha_data/ecml/do_3125103175748157442352"; 
if (!fs.existsSync(folder)){
    fs.mkdirSync(folder);
}
extract("C:/Users/anirban/Documents/diksha_data/ecml/do_3125103175748157442352.zip", {dir:folder }, function (err) {
});