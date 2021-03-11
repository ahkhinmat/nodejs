'use strict';
const format = require("node.date-time");
console.log(' on '+new Date().format("y-M-d H:m:SS") );

const ftp = require('./FTP');
const client = new ftp('156.67.222.75', 21, 'u469175357', 'Tmk@541981', false);


client.upload('images/footer-image-mail.png', 'public_html', 755);