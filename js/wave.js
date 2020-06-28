/*****波*****/
(function () {

    var unit = 100,
        canvas, context, canvas2, context2,
        height, width, xAxis, yAxis,
        draw;

    function init() {
        console.log(document)
    canvas = document.getElementById("sineCanvas");
    console.log(canvas);
    canvas.width = document.documentElement.clientWidth;
    //キャンバスをウィンドウの幅に合わせる
    canvas.height = 200;
    context = canvas.getContext("2d");
    height = canvas.height;
    width = canvas.width;

    xAxis = Math.floor(height/2);
    yAxis = 0;
     draw();
    }

    function draw() {
     // キャンバスの描画を一度クリアにする
     context.clearRect(0, 0, width, height);
    //波～
        drawWave('#FFD700', 0.9, 3, 0);
        /*
        drawWave('#0000ff', 1, 2, 250);
        drawWave('#ffffff', 0.2, 1.6, 100);
        */
        draw.seconds = draw.seconds + .014;
        draw.t = draw.seconds*Math.PI;
        setTimeout(draw, 35);
    };
    draw.seconds = 0;
    draw.t = 0;

    /**
    * 波(色,波幅のzoom,  不透明度, 波の開始位置の遅れを指示)
    */
    function drawWave(color, alpha, zoom, delay) {
        context.fillStyle = color;
        context.globalAlpha = alpha;

        context.beginPath(); //パススタート
        drawSine(draw.t / 3, zoom, delay);//第一引数で波の速さ
        context.lineTo(width + 10, height); //右下へ
        context.lineTo(0, height); //左下へ
        context.closePath() //パスエンド
        context.fill(); //塗りつぶし
    }


    function drawSine(t, zoom, delay) {
        var x = t; //時間軸を横に
        var y = Math.sin(x)/zoom;
        context.moveTo(yAxis, unit*y+xAxis); //パスをスタートに置く

        // 横幅の波を描く
        for (i = yAxis; i <= width + 10; i += 10) {
            x = t+(-yAxis+i)/unit/zoom;
            y = Math.sin(x - delay)/3;
            context.lineTo(i, unit*y+xAxis);
        }
    }
    init();
})();
