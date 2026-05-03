let score = 0;
let currentQuestion = 0;
let lessonQuestions = [];
let currentLesson = "";

let level = localStorage.getItem("level") ? parseInt(localStorage.getItem("level")) : 1;
let xp = localStorage.getItem("xp") ? parseInt(localStorage.getItem("xp")) : 0;
let earnedBadges = localStorage.getItem("badges") ? JSON.parse(localStorage.getItem("badges")) : [];

function enterApp() {
    let name = document.getElementById("studentName").value.trim();

    if (name === "") {
        name = "Student";
    }

    localStorage.setItem("name", name);

    document.getElementById("startScreen").style.display = "none";
    document.getElementById("mainApp").style.display = "block";

    document.getElementById("welcomeText").innerHTML =
        "Welcome, " + name + "! Choose a physics lesson to begin.";

    updateLevelBox();
    displayBadges();
}

function startLesson(topic) {
    let output = document.getElementById("output");
    let quiz = document.getElementById("quiz");
    let ball = document.getElementById("ball");
    let label = document.getElementById("sceneLabel");

    currentLesson = topic;
    score = 0;
    currentQuestion = 0;
    quiz.innerHTML = "";
    ball.className = "";
    label.innerHTML = "";

    document.getElementById("scoreBox").innerHTML = "Score: 0";

    if (topic === "gravity") {
        output.innerHTML = "Gravity pulls objects toward Earth.";
        ball.className = "gravityAnim";
        label.innerHTML = "Gravity pulls downward";

        lessonQuestions = [
            ["What does gravity do?", "Pulls objects down", "Makes objects disappear", "Gravity pulls objects toward Earth."],
            ["What happens when you drop a ball?", "It falls", "It floats forever", "Gravity makes objects fall."],
            ["Gravity pulls objects toward what?", "Earth", "The clouds", "Gravity pulls objects toward Earth."],
            ["Which object is affected by gravity?", "A falling apple", "Only light", "Objects with mass feel gravity."],
            ["Gravity is a type of what?", "Force", "Color", "Gravity is a force."]
        ];
    }

    else if (topic === "force") {
        output.innerHTML = "A force is a push or pull.";
        ball.className = "forceAnim";
        label.innerHTML = "Force pushes or pulls";

        lessonQuestions = [
            ["What is a force?", "A push or pull", "A color", "A force is a push or pull."],
            ["Which is an example of force?", "Pushing a door", "Looking at a door", "Pushing uses force."],
            ["A pull is a type of what?", "Force", "Shape", "Pulling is a force."],
            ["Force can make objects do what?", "Move", "Disappear", "Force causes motion."],
            ["Kicking a ball uses what?", "Force", "Silence", "Kicking applies force."]
        ];
    }

    else if (topic === "energy") {
        output.innerHTML = "Energy is the ability to do work or cause change.";
        ball.className = "energyAnim";
        label.innerHTML = "Energy causes change";

        lessonQuestions = [
            ["What is energy?", "Ability to do work", "A shape", "Energy allows work to happen."],
            ["Energy can cause what?", "Change", "Nothing", "Energy causes change."],
            ["A moving ball has what?", "Energy", "No motion", "Movement means energy."],
            ["Food gives your body what?", "Energy", "Gravity", "Food provides energy."],
            ["Light is a form of what?", "Energy", "Weight", "Light is energy."]
        ];
    }

    else if (topic === "motion") {
        output.innerHTML = "Motion means changing position.";
        ball.className = "motionAnim";
        label.innerHTML = "Motion is change in position";

        lessonQuestions = [
            ["What is motion?", "Changing position", "Standing still forever", "Motion = change in position."],
            ["A rolling ball is an example of what?", "Motion", "Silence", "Rolling = motion."],
            ["Motion involves a change in what?", "Position", "Color only", "Motion = change in position."],
            ["A car driving is in what?", "Motion", "Stillness", "Driving = motion."],
            ["If something moves, it changes what?", "Position", "Name", "Movement changes position."]
        ];
    }

    else if (topic === "friction") {
        output.innerHTML = "Friction slows objects when surfaces rub.";
        ball.className = "frictionAnim";
        label.innerHTML = "Friction slows motion";

        lessonQuestions = [
            ["What does friction do?", "Slows objects", "Speeds them up", "Friction slows motion."],
            ["Friction happens when?", "Surfaces rub", "Objects float", "Friction = rubbing surfaces."],
            ["More friction on?", "Rough surface", "Ice", "Rough = more friction."],
            ["Friction is a?", "Force", "Color", "Friction is a force."],
            ["Brakes use?", "Friction", "Gravity", "Brakes use friction."]
        ];
    }

    else if (topic === "speed") {
        output.innerHTML = "Speed tells how fast something moves.";
        ball.className = "speedAnim";
        label.innerHTML = "Speed is how fast something moves";

        lessonQuestions = [
            ["Speed tells?", "How fast", "Color", "Speed = how fast."],
            ["Fast car has?", "High speed", "No motion", "Fast = high speed."],
            ["Faster?", "Cheetah", "Sleeping cat", "Cheetah is faster."],
            ["Speed relates to?", "Time", "Color", "Speed involves time."],
            ["Slow means?", "Low speed", "No mass", "Slow = low speed."]
        ];
    }

    else if (topic === "electricity") {
        output.innerHTML = "Electricity is the movement of electric charge.";
        ball.className = "electricityAnim";
        label.innerHTML = "Electricity = moving charge";

        lessonQuestions = [
            ["Electricity is movement of what?", "Electric charge", "Water only", "Electricity is the movement of electric charge."],
            ["What can electricity power?", "Lights", "Rocks only", "Electricity can power lights and devices."],
            ["A battery stores what?", "Electrical energy", "Friction", "A battery stores electrical energy."],
            ["Electricity often moves through what?", "Wires", "Paper only", "Electricity moves through conductors like wires."],
            ["Lightning is a form of what?", "Electricity", "Mass", "Lightning is electrical energy."]
        ];
    }

    else if (topic === "magnetism") {
        output.innerHTML = "Magnetism is a force that can attract or repel certain materials.";
        ball.className = "magnetismAnim";
        label.innerHTML = "Magnets attract and repel";

        lessonQuestions = [
            ["Magnets can attract or what?", "Repel", "Sleep", "Magnets can attract or repel."],
            ["Magnetism is a type of what?", "Force", "Food", "Magnetism is a force."],
            ["Magnets often attract what?", "Iron", "Wood only", "Magnets attract materials like iron."],
            ["Opposite magnetic poles do what?", "Attract", "Disappear", "Opposite poles attract."],
            ["Same magnetic poles do what?", "Repel", "Melt", "Same poles repel."]
        ];
    }

    else if (topic === "acceleration") {
        output.innerHTML = "Acceleration means speed is changing.";
        ball.className = "accelerationAnim";
        label.innerHTML = "Acceleration = changing speed";

        lessonQuestions = [
            ["Acceleration means a change in what?", "Speed", "Color", "Acceleration means speed changes."],
            ["A car speeding up is doing what?", "Accelerating", "Freezing", "Speeding up is acceleration."],
            ["A car slowing down has what?", "Acceleration", "No motion", "Slowing down is also acceleration because speed changes."],
            ["Acceleration can change speed or what?", "Direction", "Name", "Acceleration can change speed or direction."],
            ["Which shows acceleration?", "Bike speeding up", "Book resting", "A bike speeding up is accelerating."]
        ];
    }

    else if (topic === "mass") {
        output.innerHTML = "Mass is the amount of matter in an object.";
        ball.className = "massAnim";
        label.innerHTML = "Mass = amount of matter";

        lessonQuestions = [
            ["Mass means amount of what?", "Matter", "Color", "Mass is the amount of matter."],
            ["A heavy object usually has more what?", "Mass", "Speed only", "Heavy objects usually have more mass."],
            ["Mass is measured in what?", "Kilograms", "Seconds", "Mass is often measured in kilograms."],
            ["More mass makes objects harder to what?", "Move", "See", "More mass can make objects harder to move."],
            ["A bowling ball has more mass than what?", "Tennis ball", "Truck", "A bowling ball has more mass than a tennis ball."]
        ];
    }

    showQuestion();
}

function showQuestion() {
    let quiz = document.getElementById("quiz");
    updateProgress();

    if (currentQuestion >= lessonQuestions.length) {
        showCompletionScreen();
        return;
    }

    let q = lessonQuestions[currentQuestion];

    quiz.innerHTML =
        "<p>Question " + (currentQuestion + 1) + " of " + lessonQuestions.length + "</p>" +
        "<h3>" + q[0] + "</h3>" +
        "<button onclick='answer(true)'>" + q[1] + "</button>" +
        "<button onclick='answer(false)'>" + q[2] + "</button>";
}

function answer(isCorrect) {
    let quiz = document.getElementById("quiz");
    let explanation = lessonQuestions[currentQuestion][3];

    if (isCorrect) {
        score++;
        quiz.innerHTML =
            "<p>✅ Correct!</p><button onclick='nextQuestion()'>Next</button>";
    } else {
        quiz.innerHTML =
            "<p>❌ Not quite.</p><p>" + explanation + "</p><button onclick='nextQuestion()'>Next</button>";
    }

    document.getElementById("scoreBox").innerHTML = "Score: " + score;
}

function nextQuestion() {
    currentQuestion++;
    showQuestion();
}

function showCompletionScreen() {
    let xpEarned = score * 10;
    let badge = getBadgeName(currentLesson);
    let perfectScore = score === lessonQuestions.length;

    awardXP();
    awardBadge();

    let message = "";

    if (perfectScore) {
        message = "Excellent work! You earned a badge.";
    } else if (score >= 3) {
        message = "Good job! Keep practicing to earn the badge.";
    } else {
        message = "Keep going. Learning takes practice.";
    }

    document.getElementById("quiz").innerHTML =
        "<div class='completionBox'>" +
        "<h2>🎉 Lesson Complete!</h2>" +
        "<p>" + message + "</p>" +
        "<p><strong>Score:</strong> " + score + " out of " + lessonQuestions.length + "</p>" +
        "<p><strong>XP Earned:</strong> " + xpEarned + "</p>" +
        "<p><strong>Badge:</strong> " + (perfectScore ? badge : "Not earned yet") + "</p>" +
        "<button onclick='startLesson(\"" + currentLesson + "\")'>Try Again</button>" +
        "</div>";
}

function updateProgress() {
    let progress = lessonQuestions.length > 0
        ? (currentQuestion / lessonQuestions.length) * 100
        : 0;

    document.getElementById("progressBar").style.width = progress + "%";
    document.getElementById("progressText").innerHTML = "Progress: " + Math.round(progress) + "%";
}

function getBadgeName(lesson) {
    let badgesMap = {
        gravity: "Gravity Master 🏆",
        force: "Force Builder 💪",
        energy: "Energy Explorer ⚡",
        motion: "Motion Champion 🚀",
        friction: "Friction Fighter 🛞",
        speed: "Speed Star ⚡",
        electricity: "Electricity Expert ⚡",
        magnetism: "Magnet Master 🧲",
        acceleration: "Acceleration Ace 🚗",
        mass: "Mass Master ⚖️"
    };

    return badgesMap[lesson];
}

function awardBadge() {
    let badge = getBadgeName(currentLesson);

    if (score === lessonQuestions.length && !earnedBadges.includes(badge)) {
        earnedBadges.push(badge);
        localStorage.setItem("badges", JSON.stringify(earnedBadges));
    }

    displayBadges();
}

function displayBadges() {
    document.getElementById("badges").innerHTML =
        earnedBadges.length ? earnedBadges.join("<br>") : "No badges yet.";
}

function awardXP() {
    xp += score * 10;

    while (xp >= 100) {
        level++;
        xp -= 100;
    }

    localStorage.setItem("level", level);
    localStorage.setItem("xp", xp);

    updateLevelBox();
}

function updateLevelBox() {
    document.getElementById("levelBox").innerHTML =
        "Level: " + level + " | XP: " + xp + " / 100";
}

function resetProgress() {
    localStorage.removeItem("level");
    localStorage.removeItem("xp");
    localStorage.removeItem("badges");

    level = 1;
    xp = 0;
    earnedBadges = [];

    updateLevelBox();
    displayBadges();

    document.getElementById("scoreBox").innerHTML = "Score: 0";
    document.getElementById("output").innerHTML = "Progress reset. Choose a lesson to begin.";
    document.getElementById("quiz").innerHTML = "";
    document.getElementById("progressBar").style.width = "0%";
    document.getElementById("progressText").innerHTML = "Progress: 0%";
    document.getElementById("sceneLabel").innerHTML = "";
    document.getElementById("ball").className = "";
}