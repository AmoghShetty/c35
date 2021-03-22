var ball;
var database;
var position;
function setup(){
    database = firebase.database();
    console.log(database);
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
    var bpos=database.ref('ball/position');
    console.log(bpos);
    bpos.on("value",readPosition,showError);
}
function readPosition(data){
    position=data.val();
    console.log("Position = "+position);
    ball.x=position.x;
    ball.y=position.y;    
}
function showError(){
    console.log("error");
}
function writePosition(x,y){
database.ref('ball/position').set({
    'x':position.x+x,
    'y':position.y+y
});

}
function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    drawSprites();
}

function changePosition(x,y){
    ball.x = ball.x + x;
    ball.y = ball.y + y;
    writePosition(x,y);
}
