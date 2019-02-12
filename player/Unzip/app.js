const extract = require('extract-zip');
const fixture_element = require('./content');
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
                readFixture_contentList();

                function readFixture_contentList() {
                    var contentList = JSON.parse(fs.readFileSync('C:/Users/anirban/git/sunbird-content-player/player/app-data/fixture-content-list.json', {
                        encoding: 'utf-8'
                    })).result.content.push(updateFixtureJson(contentName));
                    /*  var stats = fs.statSync(file);
                      if(stats.isDirectory){
                         console.log("directory name::"+stats);
                      } */
                    //     console.log(file);
                    var stats = fs.statSync(finalFolder + "/" + file);
                    /* if(stats.isDirectory()){
                        console.log("directory name::"+file);
                        fs.renameSync(finalFolder+"/"+file,contentName);
                     } */

                }
        });

    function updateFixtureJson(folderName) {
        //console.log(fixture_element);
        var fixtureObj = objCopy(_constant.fixtureArrayIdentifier);
        fixtureObj.identifier = folderName;
        fixtureObj.contentData.name = folderName;
        fixtureObj.contentData.identifier = folderName;
        fixtureObj.path = "fixture-stories/" + folderName;
        fixtureJsonContent.result.content.push(fixtureObj);
    }

    function objCopy(obj) {
        return JSON.parse(JSON.stringify(obj));
    }
    // var contentList =  fs.readFileSync("C:/Users/anirban/git/sunbird-content-player/player/app-data/fixture-content-list.json");
    // console.log(contentList);
}
