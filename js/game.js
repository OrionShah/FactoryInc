var Backbone = require('backbone');
// var _ = require('underscore');
var Konva = require('konva');

var GUI_View = Backbone.View.extend({
    initialize: function (params) {
        this.layer = params.layer;
    },
    el: function () {
        var group = new Konva.Group();
        var imageObj = new Image();
        imageObj.src = 'Person.png';
        imageObj.onload = function() {
            var player = new Konva.Image({
                id: "player",
                x: 100,
                y: 100,
                image: imageObj,
                width: 100,
                height: 100
            });
            group.add(player);
        }
        
        console.log(group);
        return group;
    },
    render: function () {
        console.log('render');
        this.layer.add(this.el);
        this.layer.draw();
    },
});


var stage = new Konva.Stage({
    container: 'game_view',
    width: 1000,
    height: 700,
    // width: ($('body').width()-10),
    // height: ($(document).height()-20)
});

var layer = new Konva.Layer();
stage.add(layer);

gui = new GUI_View({layer: layer});
gui.render();