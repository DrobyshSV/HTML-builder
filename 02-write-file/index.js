const fs = require('fs');
const path = require('path');
const {stdin,stdout,exit} = process;

const pathToFile = path.join(__dirname, 'text.txt');
const writeStream = fs.createWriteStream(pathToFile);
stdout.write("Hello, tell me about you! ");
stdin.on('data', data => {
    if(data.toString().trim() === 'exit') {
        exit()
    } else {
        writeStream.write(data.toString())
    }
})
process.on('SIGINT',exit);
process.on('exit', () => stdout.write('Bye'))
