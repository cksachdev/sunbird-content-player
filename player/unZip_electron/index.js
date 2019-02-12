const {
  app,
  BrowserWindow,
  ipcMain,
  shell
} = require('electron');
const fs = require('fs');
const os = require('os');
var path = require('path');
const extract = require('extract-zip');
let ArrayElement = require('./content')
var mainWindow = null;
var settingsWindow = null;
var rootPath = (os.platform == "win32") ? os.homedir().split(path.sep)[0] : "/";
//var fixtureJsonContent = fs.readFileSync();
app.on('ready', function () {
  mainWindow = new BrowserWindow({
    height: 600,
    resizable: true,
    width: 800,
    show: false,
    icon: path.join(__dirname, 'app/images/diksha.png')
  });

  // mainWindow.setMenu(null);

  mainWindow.loadURL('file://' + __dirname + '/app/index.html');

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })
});

app.on('window-all-closed', app.quit);

ipcMain.on('close-main-window', function () {
  app.quit();
});




ipcMain.on('import-files', function (event, files) {

  //resetDirs([supportAppDataDir, mainDir, inputDir, outputDir]);

  files.map((ECML_file) => {
    // if (path.extname(ECML_file.name) == '.zip')
    //   pdfFileNames.push(ECML_file.name);
    // var fullpdfDir = JSON.stringify((ECML_file.path));
    // var pdfPacketFull = fullpdfDir.substring(1, fullpdfDir.lastIndexOf('\\') - 1);
    // pdfPacket = pdfPacketFull.substring(pdfPacketFull.lastIndexOf('\\') + 1, pdfPacketFull.length);
    // resetDirs([outputDir + '/' + pdfPacket]);
    extractZip(ECML_file)
    // fs.createReadStream(ECML_file.path).pipe(fs.createWriteStream(`${inputDir}/${ECML_file.name}`))

  })


});


function extractZip(ECML_file) {
  //ecml extraction code starts
  var folder = "C:/Users/anirban/git/sunbird-content-player/player/public/fixture-stories/";
  var do_id = path.parse(ECML_file.name).name;;

  var finalFolder = folder + do_id;
  console.log('----------------------------------------------');
  if (!fs.existsSync(finalFolder)) {
    fs.mkdirSync(finalFolder);
  }
  extract(ECML_file.path, {
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
    //  var fixtureJsonContent = readFixture_contentList();
      //console.log('fixtureJsonContent:::' + JSON.stringify(fixtureJsonContent));
      updateFixtureJson(contentName);
      
    });

    function updateFixtureJson(folderName) {
      var fixtureJsonContent = readFixture_contentList();
      var fixtureObj = objCopy(ArrayElement);
      fixtureObj.identifier = folderName;
      fixtureObj.contentData.name = folderName;
      fixtureObj.contentData.identifier = folderName;
      fixtureObj.path = "fixture-stories/" + folderName;
      fixtureJsonContent.result.content.push(fixtureObj);
      console.log(JSON.stringify(fixtureJsonContent))
      fs.writeFileSync('C:/Users/anirban/git/sunbird-content-player/player/app-data/fixture-content-list.json',JSON.stringify(fixtureJsonContent));
    }

    function objCopy(obj) {
      return JSON.parse(JSON.stringify(obj));
    }
    // var contentList =  fs.readFileSync("C:/Users/anirban/git/sunbird-content-player/player/app-data/fixture-content-list.json");
    // console.log(contentList);
  })
  function readFixture_contentList() {
    return JSON.parse(fs.readFileSync('C:/Users/anirban/git/sunbird-content-player/player/app-data/fixture-content-list.json', {
      encoding: 'utf-8'
    }));

  }
  //ecml extraction done
}