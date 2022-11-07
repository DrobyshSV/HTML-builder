const fs = require('fs');
const path = require('path');

const pathToBundleFile = path.join(__dirname, 'project-dist', 'bundle.css');
const pathToStyleFolder = path.join(__dirname, 'styles');
const writeStream = fs.createWriteStream(pathToBundleFile);

fs.readdir(pathToStyleFolder, {withFileTypes: true}, (error, files) => {
    for (let file of files) {
        if (file.isFile()) {
            let arr = file.name.split('.');
            if (arr[arr.length - 1] === 'css') {
                fs.readFile(path.join(pathToStyleFolder, file.name), (error, data) => {
                    writeStream.write(data)
                })
            }
        }
    }
})