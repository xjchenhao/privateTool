var fs = require('fs'),
    path = require('path');

var picPath = '/Users/chenhao/Desktop/Instagram';

var miuiReg = /IMG_(\d+)_(\d+)\.(\w+)/i;

fs.readdir(picPath, function (err, files) {
    if (err) {
        return console.error(err);
    }

    var handleNumber=0;
    files.forEach(function (fileName) {
        if (miuiReg.test(fileName)) {
            var fileNameNew='',         // 新文件名
                picDate = RegExp.$1,    // 文件名中的日期部分,例如20141019
                picTime = RegExp.$2,    // 文件名中的时间部分,例如232450
                picType = RegExp.$3;    // 文件后缀名

            // picDate改成ios的格式
            picDate = picDate.slice(0, 4) + '-' + picDate.slice(4, 6) + '-' + picDate.slice(6, 8);

            fileNameNew = picDate + ' ' + picTime + '.' + picType;
            fs.renameSync(picPath + '/' + fileName, picPath + '/' + fileNameNew);
            handleNumber++;
        }
    });

    console.log('已处理 '+handleNumber+' 个文件');
});