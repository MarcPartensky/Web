var generateDownloadLink = require('generate-download-link');
 
var opt = {
    data: 'Here is the content of the file',
    title: 'Click to download your file',
    filename: 'example.txt'
};
 
var anchor = generateDownloadLink(opt);