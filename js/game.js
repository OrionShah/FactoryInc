var path_url = require('file-url');
var fs = require('fs');

var res_paths = [
    {id: "char", src: 'Person.png'},
    {id: "space", src: "http://upload.wikimedia.org/wikipedia/commons/a/a2/Polycyclic_Aromatic_Hydrocarbons_In_Space.jpg"}
];

var game = function () {
    var self = this;
    self.textures = {};
    self.system_gui = [];
    self.objects = [];
    self.stage = null;
    self.init = function () {
        self.load_res();
        createjs.Ticker.setFPS(60);
        self.stage = new createjs.Stage('canvas_id');

        var circle = new createjs.Shape();
        circle.graphics.beginFill('DeepSkyBlue').drawCircle(0, 0, 50);
        circle.type = 'circle';
        circle.name = '1';
        circle.x = 100;
        circle.y = 100;
        self.objects['circle'] = circle;
        self.stage.addChild(circle);

        var circle1 = new createjs.Shape();
        circle1.graphics.beginFill('green').drawCircle(0, 0, 50);
        circle1.name = '2';
        circle1.type = 'circle';
        circle1.x = 300;
        circle1.y = 500;
        self.objects['circle1'] = circle1;
        self.stage.addChild(circle1);

        var text_fps = new createjs.Text(createjs.Ticker.getMeasuredFPS(), "20pt Arial", "#000");
        text_fps.x = 15;
        self.system_gui['text_fps'] = text_fps;
        self.stage.addChild(text_fps);
        // console.log(createjs.EaselJS.version);

        console.log('1');
        self.create_button('test', 10, 50, 300, 50);
        console.log('2');

        self.stage.addEventListener('click', function (e) {
            if (e.target.type == "circle") {
                e.target.x += 100;
            }
            if (e.target.type == "btn") {
                self.btn_event(e.target);
            }
            console.log(e.target.type);
        });
        createjs.Ticker.addEventListener("tick", self.updater);
        // stage.update();
    };

    self.load_res = function () {

    };

    self.updater = function () {
        self.system_gui.text_fps.set({text: createjs.Ticker.getFPS()});
        self.objects.circle1.x+=10;
        // objects.circle.x += 10;
        if (self.objects.circle.x > (self.stage.canvas.width - 40)) {
            self.objects.circle.x = 40;
        }
        if (self.objects.circle1.x > (self.stage.canvas.width - 40)) {
            self.objects.circle1.x = 40;
        }
        self.stage.update();
    };

    self.create_button = function (name, x, y, w, h) {
        var new_btn = new createjs.Shape();
        // var new_btn = new createjs.ButtonHelper(myInstance, 'out', 'over', 'down', false, myInstance, 'text');
        new_btn.name = name;
        new_btn.type = 'btn';
        new_btn.graphics.beginFill('green').drawRect(x, y, w, h);
        console.log('3');
        console.log(new_btn.graphics);
        self.stage.addChild(new_btn);
        self.objects.push(new_btn);
    };
    self.btn_event = function (target) {
        console.log(target);
    };
};

gameObj = new game();
