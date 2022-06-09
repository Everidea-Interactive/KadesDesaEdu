onStart("kadesdesaedu"); //folder game name

function onStart(project_name) {
    $("#body").css("margin", "0");
    $("#loading_content").css("display", "grid");
    $("#gameContainer").css("display", "none");
    $("#progress-value").html("0%");

    gameInstance = UnityLoader.instantiate("gameContainer", "Build/" + project_name + ".json", {
        onProgress: UnityProgress
    });
}

function UnityProgress(gameInstance, progress) {
    // console.log = function() {}
    // console.disableYellowBox = true;

    if (!gameInstance.Module) {
        return;
    }
    var progress_raw = progress * 100;
    var progress_int = Number((progress_raw).toFixed(0));

    $("#progress-value").html(progress_int + "%");
    $("#progress").css("width", progress_int + "%");

    if (progress === 1 && !gameInstance.removeTimeout) {
        gameInstance.removeTimeout = setTimeout(function() {
            console.log("Time out");
            $("#loading_content").css("display", "none");
            $("#gameContainer").css("display", "block");

            if (/Android|webOS|iPhone|iPad|Mac|Macintosh|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                tutorialKey = 0;
            } else {
                tutorialKey = 1;
            }

            setTutorial(parseInt(tutorialKey));
            gameInstance.SendMessage('RacingManager', 'ResetPlayerPref');

            gameStart();
        }, 1000);
    }
}

function submitScore(score) {
    //do some code here while user submitting  score
    //postMessage //submit district
    console.log("Score Masuk : " + score);
    postMessage("district2_game_1");
}

function exit() {
    //console.log("Quit 1");
}

function gameQuit1() {
    console.log("Quit");
}

function gameStart() {
    var point = window.localStorage.getItem("point");
    var car = window.localStorage.getItem("car");

    if (point == null) {
        window.localStorage.setItem("point", 0);
        point = window.localStorage.getItem("point");
    }

    if (car == null) {
        window.localStorage.setItem("car", 0);
        car = window.localStorage.getItem("car");
    }

    setPoint(parseInt(point));
    setCar(parseInt(car));


}

function play() {
    //do some code here while user starting to play
    console.log("PLAY!");
}

function setPoint(pointStatus) {
    gameInstance.SendMessage('RacingManager', 'SetPoint', pointStatus);
}

function setCar(carCode) {
    gameInstance.SendMessage('RacingManager', 'SetCar', carCode);
}

function setTutorial(tutorialCode) {
    gameInstance.SendMessage('RacingManager', 'SetTutorial', tutorialCode);
}

function share() {
    console.log("Sharing is carring!!");
}