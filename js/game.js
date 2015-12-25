var path_url = require('file-url');
var fs = require('fs');

var res_paths = [
    {id: "char", src: 'Person.png'},
    {id: "space", src: "http://upload.wikimedia.org/wikipedia/commons/a/a2/Polycyclic_Aromatic_Hydrocarbons_In_Space.jpg"}
];

textures = {};
system_gui = [];
objects = [];
var stage = null;
function init () {
    load_res();
    createjs.Ticker.setFPS(60);
    stage = new createjs.Stage('canvas_id');

    var circle = new createjs.Shape();
    circle.graphics.beginFill('DeepSkyBlue').drawCircle(0, 0, 50);
    circle.type = 'circle';
    circle.name = '1';
    circle.x = 100;
    circle.y = 100;
    objects['circle'] = circle;
    stage.addChild(circle);

    var circle1 = new createjs.Shape();
    circle1.graphics.beginFill('green').drawCircle(0, 0, 50);
    circle1.name = '2';
    circle1.type = 'circle';
    circle1.x = 300;
    circle1.y = 500;
    objects['circle1'] = circle1;
    stage.addChild(circle1);

    var text_fps = new createjs.Text(createjs.Ticker.getMeasuredFPS(), "20pt Arial", "#000");
    text_fps.x = 15;
    system_gui['text_fps'] = text_fps;
    stage.addChild(text_fps);
    // console.log(createjs.EaselJS.version);
    
    console.log('1');
    create_button(10, 10, 300, 50);
    console.log('2');

    stage.addEventListener('click', function (e) {
        e.target.x += 50;
        console.log(e.target.type);
    });
    createjs.Ticker.addEventListener("tick", updater);
    // stage.update();
}

function load_res () {

}

function updater () {
    system_gui.text_fps.set({text: createjs.Ticker.getFPS()});
    // objects.circle.x += 10;
    if (objects.circle.x > stage.canvas.width) {
        objects.circle.x = 0;
    }
    stage.update();
}

function create_button (name, x, y, w, h) {
    var new_btn = new createjs.Rectangle(x, y, w, h);
    new_btn.type = 'btn';
    console.log('3');
    stage.addChild(new_btn);
    objects.push(new_btn);
}

