var _ = require('underscore');

var render = function () {
    var self = this;
    self.textures = {};
    self.system_gui = [];
    self.objects = [];
    self.stage = null;

    self.init = function () {
        createjs.Ticker.setFPS(30);
        self.stage = new createjs.Stage('canvas_id');
        self.initSystemLabel();

        var circle = new createjs.Shape();
        circle.graphics.beginFill('DeepSkyBlue').drawCircle(0, 0, 50);
        circle.type = 'circle';
        circle.name = '1';
        circle.x = 100;
        circle.y = 100;
        self.objects.push(circle);
        self.stage.addChild(circle);

        var circle1 = new createjs.Shape();
        circle1.graphics.beginFill('green').drawCircle(0, 0, 50);
        circle1.name = '2';
        circle1.type = 'circle';
        circle1.x = 300;
        circle1.y = 500;
        self.objects.push(circle1);
        self.stage.addChild(circle1);

        // console.log(createjs.EaselJS.version);
        
        self.create_button({
            name: "btn1",
            text_str: "Button",
            sprite_path: 'btn1.png',
            pic_size: 15,
            size: 55,
            font: "Times New Roman",
            color: "green",
            stroke: "black",
            obj: circle1,
            click_event: function () {
                console.log('click');
                // this.event_obj.x += 50;
                // this.event_obj.y += 50;
            }
        });

        // self.create_button({
        //     name: "btn2",
        //     text_str: "Test",
        //     x: 10,
        //     y: 70,
        //     w: 200,
        //     h: 35,
        //     size: 25,
        //     font: "Times New Roman",
        //     color: "green",
        //     stroke: "black",
        //     // obj: circle1,
        //     click_event: function () {
        //         // el = self.stage.getChildByName('1');
        //         // el.x += 10;
        //         // console.log();
        //         console.log(self.stage.getNumChildren());
        //         self.stage.clear();
        //     }
        // });

        // var data = {
        //     images: ["btn1.png"],
        //     framerate: 1,
        //     frames: {width:32*15, height:32*15},
        //     animations: {
        //         out: 0,
        //         down: 2,
        //     }
        // };
        // var spriteSheet = new createjs.SpriteSheet(data);
        // var Sprite = new createjs.Sprite(spriteSheet);
        // Sprite.x = 150;
        // Sprite.y = 150;
        // var btn_text = new createjs.Text('text', "50px Arial", "#000");
        // btn_text.textAlign = "center";
        // btn_text.x = 300;
        // btn_text.y = 350;

        // var helper = new createjs.ButtonHelper(Sprite);
        // var animation = new createjs.Sprite(spriteSheet, "gen");
        // 
        // self.stage.addChild(Sprite);
        // self.stage.addChild(btn_text);
        // self.stage.addChild(helper);



        self.stage.addEventListener('click', function (e) {
            if (e.target.type === "circle") {
                e.target.x += 100;
            }
            if (e.target.type === "btn") {
                self.btn_event(e.target);
            }
            // console.log(e.target);
        });
        createjs.Ticker.addEventListener("tick", self.updater);
    };

    self.updater = function () {
        _.each(self.system_gui, function (el) {
            if (el.name === 'fps') {
                el.update();
            }
        });
        _.each(self.objects, function (el) {
            if (el.x > (self.stage.canvas.width-40)) {
                el.x = 40;
            }
            if (el.y > (self.stage.canvas.height-40)) {
                el.y = 40;
            }
        });
        self.stage.update();
    };

    self.create_button = function (button) {
        // text_str, sprite_path, pic_size, font, size, color, stroke, obj, click_event
        var new_btn = new createjs.Container();
        new_btn.name = button.name;
        new_btn.type = 'btn';

        var data = {
            images: [button.sprite_path],
            framerate: 1,
            frames: {width:32*button.pic_size, height:32*button.pic_size},
            animations: {
                out: 0,
                down: 1,
            }
        };
        var spriteSheet = new createjs.SpriteSheet(data);
        var Sprite = new createjs.Sprite(spriteSheet);
        console.log(Sprite);
        var font_settings = button.size + "px " + button.font;
        var text = new createjs.Text(button.text_str, font_settings, "#000");
        text.textAlign = "center";
        // text.x = 32*button.pic_size;
        // text.y = 32*button.pic_size;

        new_btn.event_obj = button.obj;

        new_btn.addChild(Sprite);
        new_btn.addChild(text);

        // new_btn.x = 100;
        // new_btn.y = 100;
        var helper = new createjs.ButtonHelper(Sprite, "out", "over", "down", false, new_btn);
        new_btn.addEventListener("click", button.click_event);

        self.stage.addChild(new_btn);
        self.system_gui.push(new_btn);
        return new_btn.id;
    };
    self.btn_event = function (target) {
        // console.log(target);
        target.click_event();
        // self.stage.getChildAt(1).x += 100;
        // console.log(self.stage.getChildAt(1));
        
    };

    self.initSystemLabel = function () {
        var text_fps = new createjs.Text(createjs.Ticker.getMeasuredFPS(), "20px Arial", "#000");
        text_fps.x = 15;
        text_fps.name = 'fps';
        text_fps.update = function () {
            var str = "FPS: " + createjs.Ticker.getFPS().toFixed(1) +
                "| workDir: " + gameObj.game_path +
                "| CreateJS v. " + createjs.EaselJS.version +
                "| Memory: " + gameObj.bytesToSize(process.memoryUsage().rss);
            this.set({text: str});
        };

        self.system_gui.push(text_fps);
        self.stage.addChild(text_fps);
    };
};