var GUI_View = Backbone.KonvaView.extend({
    initialize: function (params) {
        this.layer = params.layer;
        this.init_el();
    },
    events: {
    	'keypress': 'keyAction',
    	'click': "keyAction"
    },
    keyAction: function (e)  {
    	console.log(e);
    },
    init_el: function () {
        var group = new Konva.Group();
        var imageObj = new Image();
        var player;
        imageObj.onload = function() {
            player = new Konva.Image({
                id: "player",
                x: 100,
                y: 100,
                image: imageObj,
                width: 300,
                height: 300
            });
        	console.log(player);
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
        // group.add(rect);
        // console.log(group);
        this.el = group;
        return group;
    },
    render: function () {
    	var self = this;
    	window.onkeypress = function (e) {
			player = stage.findOne('#player');
			player.attrs.x++;
			console.log(self.el);
		}

        this.layer.add(this.el);
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

gui = new GUI_View({layer: layer});
gui.render();

setInterval(function () {
	gui.render();
	// console.log('render');
}, 20);

window.onkeypress = function (e) {
	console.log(e.keyCode);
}