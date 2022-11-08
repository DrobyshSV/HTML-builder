const fs = require('fs');
const path = require('path');

const pathToProject = path.join(__dirname, 'project-dist');
const pathToStylesFolder = path.join(__dirname, 'styles');
const pathToStyleFile = path.join(pathToProject, 'style.css');
const pathToAssetsFolder = path.join(__dirname, 'assets');
const pathToCopyAssetsFolder = path.join(pathToProject, 'assets');
const pathToComponentsFolder = path.join(__dirname, 'components');
const pathToTemplate = path.join(__dirname, 'template.html');
const writeStream = fs.createWriteStream(pathToStyleFile);

fs.mkdir(pathToProject, () => {
    fs.copyFile(pathToTemplate, path.join(pathToProject, 'index.html'), () => {
        fs.readdir(pathToComponentsFolder, (error, files) => {
            let i = files.length
            const writeF = () => {
                if (i !== 0) {
                    i--
                    fs.readFile(path.join(pathToComponentsFolder, files[i]), 'utf8', (error, data) => {
                        fs.readFile(path.join(pathToProject, 'index.html'), 'utf8', (error, dat) => {
                            console.log(i, 'порядковый')
                            console.log(files[i], "файл")
                            let arr = files[i].split('.')
                            console.log(arr[0], 'реплейснуть')
                            let res = dat.replace(`{{${arr[0]}}}`, data)

                            fs.writeFile(path.join(pathToProject, 'index.html'), res, 'utf8', () => {
                                writeF()
                            })
                        })
                    })
                }

            }
            writeF()
        })
    })
});
fs.readdir(pathToStylesFolder, {withFileTypes: true}, (error, files) => {
    for (let file of files) {
        if (file.isFile()) {
            let arr = file.name.split('.');
            if (arr[arr.length - 1] === 'css') {
                fs.readFile(path.join(pathToStylesFolder, file.name), (error, data) => {
                    writeStream.write(data)
                })
            }
        }
    }
})
fs.mkdir(pathToCopyAssetsFolder, () => {
    const copyAssets = (folder) => {
        fs.readdir(pathToCopyAssetsFolder, {withFileTypes: true}, () => {
            fs.stat(path.join(pathToCopyAssetsFolder,folder), (error) => {
                if (error) {
                    fs.mkdir(path.join(pathToCopyAssetsFolder,folder), () => {
                        fs.readdir(path.join(pathToCopyAssetsFolder,folder), {withFileTypes: true}, (error, files) => {
                            for (let file of files) {
                                fs.copyFile(path.join(pathToAssetsFolder,folder, file.name), path.join(pathToCopyAssetsFolder,folder, file.name), () => {
                                })
                            }
                        })
                    })
                } else {
                    fs.readdir(path.join(pathToAssetsFolder,folder), {withFileTypes: true}, (error, files) => {
                        for (let file of files) {
                            fs.unlink(path.join(pathToAssetsFolder,folder, file.name), () => {
                            })
                        }
                        fs.readdir(path.join(pathToAssetsFolder,folder), {withFileTypes: true}, (error, files) => {
                            for (let file of files) {
                                fs.copyFile(path.join(pathToCopyAssetsFolder,folder, file.name), path.join(pathToCopyAssetsFolder,folder, file.name), () => {
                                })
                            }
                        })
                    })
                }
            })
        })
    }
    fs.readdir(pathToAssetsFolder, {withFileTypes:true}, (error,files) => {
        for (let file of files) {
            if(file.isDirectory()) {
                copyAssets(file.name)
            }
        }
    })
})