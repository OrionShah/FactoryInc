timer_for_fps = 0;

var fps_model = Backbone.Model.extend({
    id: 'timer',
    fps: 0,
    screens: 0,
    calc: function () {
        this.fps = this.screens / 0.1;
        this.screens = 0;
        // console.log(this.fps);
    }
});
var GUI_View = Backbone.KonvaView.extend({
    fps_timer: 123213,
    initialize: function (params) {
        this.layer = params.layer;
        this.fps_timer = params.fps_timer;
        console.log(this.fps_timer);
    },
    events: {
    	'keypress': 'keyAction',
    	'click': "keyAction"
    },
    keyAction: function (e)  {
    	console.log(e);
    },
    g: function () {
        var group = new Konva.Group();
        var imageObj = new Image();
        var player;
        var self = this;
        console.log(self.fps_timer);
        imageObj.onload = function() {
            player = new Konva.Image({
                id: "player",
                x: 100,
                y: 100,
                image: imageObj,
                width: 300,
                height: 300
            });
        	group.add(player);
        }
        imageObj.src = "Person.png";
        
        var rect = new Konva.Rect({
          	x : 100,
          	y : 100,
          	width : 50,
          	height : 50,
          	fill : 'green',
          	id : 'rect'
        });
        var fps_text = new Konva.Text({
            x: 20,
            y: 20,
            text: 'sadsf',
            fontSize: 30,
            fontFamily: 'Calibri',
            fill: 'green'
        });
        group.add(fps_text);
        // group.add(rect);
        // console.log(group);
        return group;
    },
    render: function () {
        console.log(this);
        this.layer.add(this.g);
        this.layer.draw();
    },
});


var stage = new Konva.Stage({
    container: 'game_view',
    // width: 1000,
    // height: 700,
    width:  window.innerWidth-20,
    height: window.innerHeight-20
});

var layer = new Konva.Layer();
stage.add(layer);

fps = new fps_model();
gui = new GUI_View({layer: layer, fps_timer: fps});
gui.render();
setInterval(function () {
    // gui.render();
    // fps.screens++;
    // console.log('render');
}, 20);


setInterval(function () {
    fps.calc();
}, 100);