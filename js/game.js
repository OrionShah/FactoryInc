var fs = require('fs');
var path = require('path');
// var process = require('process');

var res_paths = [
    {id: "char", src: 'Person.png'},
    {id: "space", src: "http://upload.wikimedia.org/wikipedia/commons/a/a2/Polycyclic_Aromatic_Hydrocarbons_In_Space.jpg"}
];

var game = function () {
    var self = this;
    self.render = null;
    game_path = null;
    self.init = function () {
        self.render = new render();
        self.render.init();
        self.game_path = self.getProcessPath();
        // console.log(process.execPath);
    };

    self.getProcessPath = function () {
        var path;
        console.log(process.cwd());

        return parh;
    }
};

gameObj = new game();
// game();
