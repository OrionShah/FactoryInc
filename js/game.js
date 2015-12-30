var fs = require('fs');
var path = require('path');
// var process = require('process');


var game = function () {
    var self = this;
    self.render = null;
    self.game_path = null;
    self.init = function () {
        self.render = new render();
        self.render.init();
        self.game_path = self.getProcessPath();
        // console.log(process.execPath);
    };

    self.getProcessPath = function () {
        var path_dir = process.cwd();
        var paths = path_dir.split(path.sep);
        if (paths[paths.length-1] !== "FactoryInc") {
            path_dir = path.dirname(process.execPath);
        }
        return path_dir;
    };

    self.bytesToSize = function (bytes) {
       var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
       if (bytes == 0) return '0 Byte';
       var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
       return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
    };
};

var gameObj = new game();
// game();
