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

        self.create_button('Button!', 10, 50, 300, 50, {size: "30", font: "Arial"}, "green", "black");

        self.stage.addEventListener('click', function (e) {
            if (e.target.type == "circle") {
                e.target.x += 100;
            }
            if (e.target.parent.type == "btn") {
                // self.btn_event(e.target);
            }
            if (e.target.type == "btn") {
                self.btn_event(e.target);
            }
            // console.log(e.target);
        });
        createjs.Ticker.addEventListener("tick", self.updater);
        // stage.update();
    };

    self.load_res = function () {

    };

    self.updater = function () {
        self.system_gui.text_fps.set({text: createjs.Ticker.getFPS().toFixed(1)});
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

    self.create_button = function (text_str, x, y, w, h, text_props, color, stroke) {
        var new_btn = new createjs.Container();
        new_btn.name = text_str;
        new_btn.type = 'btn';

        var background = new createjs.Shape();
        background.graphics.beginFill(color).drawRect(x, y, w, h);
        background.type="bgrnd";

        font_settings = text_props.size + "px " + text_props.font;
        var text = new createjs.Text(text_str, font_settings, "#000");
        text.textAlign = "center";
        text.x = x+w/2;
        text.y = y+(h/2) - (text_props.size/2);
        text.type="txt";

        var glass = new createjs.Shape();
        glass.graphics.beginFill('rgba(0,0,0,0.1)').beginStroke(stroke).drawRect(x, y, w, h);
        glass.name = text_str;
        glass.type = 'btn';

        new_btn.addChild(background);
        new_btn.addChild(text);
        new_btn.addChild(glass);

        self.stage.addChild(new_btn);
        self.objects.push(new_btn);
    };
    self.btn_event = function (target) {
        target.parent.x += 100;
        
    };
};

gameObj = new game();
game();
