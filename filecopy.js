var fs = require('fs');
fs.createReadStream('W:/265/16.P.00466_1_1.png').pipe(fs.createWriteStream('newfile.png'));
