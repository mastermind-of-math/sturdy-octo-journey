songa = "";
songb = "";
playing = 0;

function preload(){
    songa = loadSound("music.mp3");
    songb = loadSound("music2.mp3");
}

function setup(){
    canvas = createCanvas(600, 600);
    canvas.center();
    video = createCapture(VIDEO)
    video.hide();
    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on('pose', gotResults)
}

function draw(){
    image(video, 0, 0, 600, 500);
    if(leftS > 0.2 && songa.isPlaying() == false){
        songa.play();
        songb.stop();
    } else if(rightS > 0.2 && songb.isPlaying() == false){
        songa.stop();
        songb.play();
    }
}

function modelLoaded(){
    console.log("Model Has Loaded!");
}

function gotResults(results){
    if(results.length > 0){
        result = results[0].pose
        leftX = result.leftWrist.x;
        leftY = result.leftWrist.y;
        rightX = result.rightWrist.x;
        leftS = result.keypoints[9].score;
        rightS = result.keypoints[10].score;
        console.log(results)
        rightY = result.rightWrist.y;
        console.log("Left Wrist X" + leftX + "\nLeft Wrist Y" + leftY + "\nRight Wrist X" + rightX + "\nRight Wrist Y" + rightY);
    }
}