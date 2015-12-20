var canvas = CE.defines("canvas_id")
	.extend(Input)
	.ready(function() { 
		canvas.Scene.call('Factory', {params: {'id': 1}});
	});


canvas.Scene.New({
	name: "Factory",
	timer: 0,
	materials: {
        // Usually put relatives links
		images: {
            // For CanvasEngine load "bar" first, we add index property
            "bar": {path: "http://rsamaium.github.io/CanvasEngine/samples/preload/images/bar_full.jpg", index: 0},
            "person": {path: "Person.png"},
		},
		fonts: {
            google: {
                families: ['Droid Sans']
            }
        }
	},
	called: function(stage) {
		this.el = this.createElement();
		stage.append(this.el);
	},
	preload: function(stage, pourcent, material) {
		console.log(pourcent);
		// this.el.drawImage("bar", 0, 0, pourcent + "%");
	},
	ready: function(stage, params) {
	    this.element = this.createElement();
	    this.element.drawImage("person", 0, 0, 250, 250);
	    stage.append(this.element);
	    console.log(this.element);
	    canvas.Input.keyDown(Input.Right);
	    canvas.Input.keyUp(Input.Right);
	    canvas.Input.keyDown(Input.Left);
	    canvas.Input.keyUp(Input.Left);
	},
	render: function(stage) {
		// var time = new Date();
		// var el = this.createElement();
  //       el.font = '40pt "Droid Sans"';
  //       el.fillStyle = 'black';
  //       el.fillText(this.timeFormat(time.getHours()) + ":" + this.timeFormat(time.getMinutes()) + ":" + this.timeFormat(time.getSeconds()) + "---" + (time.getTimezoneOffset()/60), 50, 50);
  //       stage.append(el);
        // stage.empty();
        speed = 3;
        if (canvas.Input.isPressed(Input.Right)) {
        	this.element.scaleTo(1,0.1);
        	this.element.x = this.element.x+speed;
        }
        if (canvas.Input.isPressed(Input.Left)) {
        	this.element.scaleTo(1,1);
        	this.element.x = this.element.x-speed;
        }
		stage.refresh();
	},
	exit: function(stage) {
		console.log('exit');
	},

	timeFormat: function (time) {
		if (time < 10) {
			return '0'+time;
		}
		return time;
	}
});