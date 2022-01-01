var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var obj1_X, obj1_Y;
var obj1_Width, obj1_Height;
var obj1_dragging = false;
var obj2_X, obj2_Y;
var obj2_Width, obj2_Height;
var obj2_dragging = false;
var midashi_width, midashi_height;
var x, y, relX, relY;

var img_1s = new Image();
img_1s.src = "1entachi.png";
var img_10 = new Image();
img_10.src = "10en.png";

var img_10s = new Image();
img_10s.src = "10entachi.png";

var img_100 = new Image();
img_100.src = "100en.png";

var img_midashi1 = new Image();
img_midashi1.src = "一.png";
var img_midashi10 = new Image();
img_midashi10.src = "十.png";
var img_midashi100 = new Image();
img_midashi100.src = "百.png";

function init() {
    // 見出し
    midashi_height = 100;
    midashi_width = 100;
    // obj1
    obj1_Width = 250;
    obj1_Height = 100;

    // オブジェクトの座標を定義(キャンバスの中央に表示)
    obj1_X = (canvas.width * 5) / 6 - obj1_Width / 2;
    obj1_Y = canvas.height / 2 - obj1_Height / 2;

    // obj2
    obj2_Width = 250;
    obj2_Height = 100;

    // オブジェクトの座標を定義(キャンバスの中央に表示)
    obj2_X = canvas.width / 2 - obj1_Width / 2;
    obj2_Y = canvas.height / 2 - obj1_Height / 2;

    drawCanvas();
}

function drawCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height); // キャンバスをクリア
    // background color
    context.beginPath();
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);

    // 右の線
    context.beginPath();
    // 起点
    context.moveTo((canvas.width * 2) / 3, 0);
    // 終点
    context.lineTo((canvas.width * 2) / 3, canvas.height);
    // 描画
    context.stroke();

    // 左の線
    context.beginPath();
    // 起点
    context.moveTo(canvas.width / 3, 0);
    // 終点
    context.lineTo(canvas.width / 3, canvas.height);
    // 描画
    context.stroke();

    // 見出し
    context.drawImage(
        img_midashi1,
        (canvas.width * 5) / 6 - midashi_width / 2,
        canvas.height / 8,
        midashi_width,
        midashi_height
    );
    context.drawImage(
        img_midashi10,
        canvas.width / 2 - midashi_width / 2,
        canvas.height / 8,
        midashi_width,
        midashi_height
    );
    context.drawImage(
        img_midashi100,
        (canvas.width * 1) / 6 - midashi_width / 2,
        canvas.height / 8,
        midashi_width,
        midashi_height
    );

    // obj1
    // context.strokeRect(0, 0, canvas.width / 2, canvas.height);
    if (obj1_X < (canvas.width * 2) / 3 - obj1_Width / 2) {
        obj1_Width = 50;
        obj1_Height = 50;
        context.drawImage(img_10, obj1_X, obj1_Y, obj1_Width, obj1_Height);
    } else {
        obj1_Width = 250;
        obj1_Height = 100;
        context.drawImage(img_1s, obj1_X, obj1_Y, obj1_Width, obj1_Height);
    }

    // obj2
    // context.strokeRect(0, 0, canvas.width / 2, canvas.height);
    if (obj2_X < canvas.width / 3 - obj2_Width / 2) {
        obj2_Width = 50;
        obj2_Height = 50;
        context.drawImage(img_100, obj2_X, obj2_Y, obj2_Width, obj2_Height);
    } else {
        obj2_Width = 250;
        obj2_Height = 100;
        context.drawImage(img_10s, obj2_X, obj2_Y, obj2_Width, obj2_Height);
    }
}

function onDown(e) {
    // キャンバスの左上端の座標を取得
    var offsetX = canvas.getBoundingClientRect().left;
    var offsetY = canvas.getBoundingClientRect().top;

    // マウスが押された座標を取得
    x = e.clientX - offsetX;
    y = e.clientY - offsetY;

    // オブジェクト上の座標かどうかを判定
    // obj1
    if (
        obj1_X < x &&
        obj1_X + obj1_Width > x &&
        obj1_Y < y &&
        obj1_Y + obj1_Height > y
    ) {
        obj1_dragging = true; // ドラッグ開始
        relX = obj1_X - x;
        relY = obj1_Y - y;
    }

    // obj2
    if (
        obj2_X < x &&
        obj2_X + obj2_Width > x &&
        obj2_Y < y &&
        obj2_Y + obj2_Height > y
    ) {
        obj2_dragging = true; // ドラッグ開始
        relX = obj2_X - x;
        relY = obj2_Y - y;
    }
    // console.log(x,y, dragging);
    // dragging = false;
}
function onMove(e) {
    // キャンバスの左上端の座標を取得
    var offsetX = canvas.getBoundingClientRect().left;
    var offsetY = canvas.getBoundingClientRect().top;

    // マウスが移動した先の座標を取得
    x = e.clientX - offsetX;
    y = e.clientY - offsetY;

    // ドラッグが開始されていればオブジェクトの座標を更新して再描画
    // obj1
    if (obj1_dragging) {
        if (x + relX >= canvas.width / 2) {
            obj1_X = x + relX;
            obj1_Y = y + relY;
            drawCanvas();
        }
    }
    // obj1
    if (obj2_dragging) {
        if (x + relX < (canvas.width * 2) / 3 - obj2_Width) {
            obj2_X = x + relX;
            obj2_Y = y + relY;
            drawCanvas();
        }
    }
}

function onUp(e) {
    obj1_dragging = false; //ドラッグ終了
    obj2_dragging = false; //ドラッグ終了
}

function onClick(e) {
    console.log("click");
}

function onOver(e) {
    console.log("mouseover");
}

function onOut() {
    console.log("mouseout");
}
canvas.addEventListener("mousemove", onMove, false);
canvas.addEventListener("mousedown", onDown, false);
canvas.addEventListener("mouseup", onUp, false);
canvas.addEventListener("click", onClick, false);
canvas.addEventListener("mouseover", onOver, false);
canvas.addEventListener("mouseout", onOut, false);
