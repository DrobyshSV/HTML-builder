const fs = require('fs/promises');
const path = require('path');
const pathToFolder = path.join(__dirname, 'secret-folder');
const {stdout} = process;

fs.readdir(pathToFolder, {withFileTypes: true}).then(files => {
    for (let file of files) {
        let pathToFile = path.join(pathToFolder, `/${file.name}`);
        if (file.isFile()) {
            let fileType = path.extname(pathToFile).slice(1)
             fs.stat(pathToFile).then(stats => {

                stdout.write(`${file.name.split('.')[0]} - ${fileType} - ${stats.size / 1024}kb\n`);
            })

        }
    }
})