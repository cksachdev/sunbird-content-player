const extract = require('extract-zip');
const fs = require('fs');
var folder = "C:/Users/anirban/git/sunbird-content-player/player/public/fixture-stories/";
var do_id = 'ecml-do_21259106171407564812108';
var finalFolder = folder + do_id;
console.log('----------------------------------------------');
if (!fs.existsSync(finalFolder)) {
    fs.mkdirSync(finalFolder);
}
extract("C:/Users/anirban/Documents/diksha_data/ecml/ecml-do_21259106171407564812108/" + do_id + ".zip", {
    dir: finalFolder
}, function (err) {
    if (err) {
        console.log(err);
    }
    if (finalFolder + '/manifest.json')
        var contentName = JSON.parse(fs.readFileSync(finalFolder + '/manifest.json', {
            encoding: 'utf-8'
        })).archive.items[0].name;
    console.log(contentName);
    fs.readdirSync(finalFolder).forEach(file => {
        /*  var stats = fs.statSync(file);
          if(stats.isDirectory){
             console.log("directory name::"+stats);
          } */
        //     console.log(file);
        var stats = fs.statSync(finalFolder+"/"+file);
        if(stats.isDirectory()){
            console.log("directory name::"+file);
            fs.renameSync(finalFolder+"/"+file,contentName);
         }
        
    })
});