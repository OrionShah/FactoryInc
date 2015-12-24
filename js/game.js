var res_paths = {
    "manifest": [
        {id: "char", src:"Person.png"}
    ]
};

function init () {
    load_res();
    createjs.Ticker.setFPS(60);
    var stage = new createjs.Stage('canvas_id');
    var circle = new createjs.Shape();
    circle.graphics.beginFill('DeepSkyBlue').drawCircle(0, 0, 50);
    circle.x = 100;
    circle.y = 100;
    circle.addEventListener('click', function (e) {
        console.log(e);
    });
    stage.addChild(circle);

    var text_fps = new createjs.Text(createjs.Ticker.getMeasuredFPS(), "20pt Arial", "#000");
    text_fps.x = 15;
    stage.addChild(text_fps);
    console.log(createjs.EaselJS.version);
    createjs.Ticker.addEventListener("tick", function () {
        text_fps.set({text: createjs.Ticker.getFPS()});
        circle.x += 10;
        if (circle.x > stage.canvas.width) {
            circle.x = 0;
        }
        stage.update();
    });

    // stage.update();
}

function load_res () {
    var res = new createjs.LoadQueue();
    res.on("progress", function() {
        console.log("Progress:", res.progress);
    });
    res.on("complete", function (e) {

        console.log('all loaded');
        console.log(res);
        console.log(e.item);
    });
    res.loadManifest(res_paths);
}