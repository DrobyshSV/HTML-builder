const fs = require('fs');
const path = require('path');

const pathFromFolder = path.join(__dirname, 'files');
const pathToCopyFolder = path.join(__dirname, 'files-copy');

const copyFolder = () => {
    fs.readdir(__dirname, {withFileTypes: true}, () => {
        fs.stat(pathToCopyFolder, (error) => {
            if (error) {
                fs.mkdir(pathToCopyFolder, () => {
                    fs.readdir(pathFromFolder, {withFileTypes: true}, (error, files) => {
                        for (let file of files) {
                            fs.copyFile(path.join(pathFromFolder, file.name), path.join(pathToCopyFolder, file.name), () => {
                            })
                        }
                    })
                })
            } else {
                fs.readdir(pathToCopyFolder, {withFileTypes: true}, (error, files) => {
                    for (let file of files) {
                        fs.unlink(path.join(pathToCopyFolder, file.name), () => {
                        })
                    }
                    fs.readdir(pathFromFolder, {withFileTypes: true}, (error, files) => {
                        for (let file of files) {
                            fs.copyFile(path.join(pathFromFolder, file.name), path.join(pathToCopyFolder, file.name), () => {
                            })
                        }
                    })
                })
            }
        })
    })
}
copyFolder()