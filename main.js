var noseX = 0;
var noseY = 0;
var eyeX = 0;
var eyeY = 0;

function preload() {
  clown_nose = loadImage("https://i.postimg.cc/7ZBcjDqp/clownnose.png");
  glasses = loadImage("https://i.postimg.cc/jS8t3gr4/Glasses.png");
}

function setup() {
  img = clown_nose;
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.size(300, 300);
  video.hide();
  classifier = ml5.poseNet(video, model_loaded);
  classifier.on("pose", got_poses);
}

function draw() {
  image(video, 0, 0, 300, 300);
  if (img == clown_nose) {
    image(img, noseX, noseY, 30, 30);
  } else {
    image(img, eyeX - width / 2, eyeY - 25, width * 2, 50);
  }
}

function take_snapshot() {
  save("myFilter.png");
}

function model_loaded() {
  console.log("Posenet is initialized");
}

function got_poses(results) {
  if (results.length > 0) {
    console.log(results);
    noseX = results[0].pose.nose.x - 15;
    noseY = results[0].pose.nose.y - 15;

    eyeX = results[0].pose.rightEye.x;
    eyeY = results[0].pose.rightEye.y;

    leftEyeX = results[0].pose.leftEye.x;
    leftEyeY = results[0].pose.leftEye.y;
    width = Math.sqrt(
      Math.pow(leftEyeX - eyeX, 2) + Math.pow(leftEyeY - eyeY, 2)
    );
    console.log("nose x: " + noseX + " and nose y: " + noseY);
  }
}

function change_filter() {
  option = document.getElementById("filters").value;
  if (option == "clown") {
    img = clown_nose;
  } else {
    img = glasses;
  }
}
