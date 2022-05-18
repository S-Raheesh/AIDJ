song ="";
function preload(){
    song = loadSound("music.mp3");
}
function setup(){
    canvas= createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}
function modelLoaded(){
   console.log("Model is loaded");
}


ScoreRightWrist = 0;
ScoreLeftWrist = 0;

LeftWristX = 0;
LeftWristY = 0;

RightWristX = 0;
RightWristY = 0;


function gotPoses(results){
   if(results.length > 0){
      console.log(results);
      ScoreRightWrist = results[0].pose.keypoints[10].score;
      ScoreLeftWrist = results[0].pose.keypoints[9].score;
      console.log("Score of right Wrist = "+ScoreRightWrist + "Score of Left Wrist = "+ScoreLeftWrist );

      LeftWristX = results[0].pose.leftWrist.x;
      RightWristX = results[0].pose.rightWrist.x;
      console.log("X position of right wrist = "+RightWristX+"X position of Left wrist = "+LeftWristX);

      LeftWristY = results[0].pose.leftWrist.y;
      RightWristY = results[0].pose.rightWrist.y;
      console.log("Y position of right wrist = "+RightWristY+"Y position of Left wrist = "+LeftWristY);
   }
}
function draw(){
    image(video, 0, 0, 600, 500);
    fill("red");
    stroke("black");
    
    if(ScoreRightWrist > 0.2 ){
        circle(RightWristX,RightWristY,20);
        if(RightWristY > 0 && RightWristY <= 100){
            document.getElementById("speed").innerHTML = "Speed = 0.5x";
            song.rate(0.5);
        }
        else if(RightWristY > 100 && RightWristY <= 200){
            document.getElementById("speed").innerHTML = "Speed = 1x";
            song.rate(1);
        }
        else if(RightWristY > 200 && RightWristY <= 300){
            document.getElementById("speed").innerHTML = "Speed = 1.5x";
            song.rate(1.5);
        }
        else if(RightWristY > 300 && RightWristY <= 400){
            document.getElementById("speed").innerHTML = "Speed = 2x";
            song.rate(2);
        }
        else if(RightWristY > 400 ){
            document.getElementById("speed").innerHTML = "Speed = 2.5x";
            song.rate(2.5);
        }
    }
if(ScoreLeftWrist > 0.2){
    circle(LeftWristX,LeftWristY,20);
    Num = Number(LeftWristY);
    Integr = floor(Num);
    Volume = Integr/500;
    song.setVolume(Volume);
    console.log(Volume);
    document.getElementById("volume").innerHTML = "Volume =" + Volume;
}

}
function Play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

