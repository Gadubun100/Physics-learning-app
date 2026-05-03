let score = 0;
let currentQuestion = 0;
let lessonQuestions = [];
let currentLesson = "";
let reviewMode = false;

let level = localStorage.getItem("level") ? parseInt(localStorage.getItem("level")) : 1;
let xp = localStorage.getItem("xp") ? parseInt(localStorage.getItem("xp")) : 0;
let earnedBadges = localStorage.getItem("badges") ? JSON.parse(localStorage.getItem("badges")) : [];
let completedLessons = localStorage.getItem("completedLessons") ? JSON.parse(localStorage.getItem("completedLessons")) : [];

const lessonOrder = ["gravity", "force", "energy", "motion", "friction", "speed", "electricity", "magnetism", "acceleration", "mass"];

const lessons = {
    gravity: {
        title: "Gravity pulls objects toward Earth.",
        intro: "In this lesson, you will learn that gravity is a force that pulls objects downward.",
        anim: "gravityAnim",
        label: "Gravity pulls downward",
        badge: "Gravity Master 🏆",
        questions: [
            ["What does gravity do?", "Pulls objects down", "Makes objects disappear", "Turns objects blue", "Stops all motion", "Gravity pulls objects toward Earth."],
            ["What happens when you drop a ball?", "It falls", "It floats forever", "It becomes electricity", "It changes color", "Gravity makes objects fall."],
            ["Gravity pulls objects toward what?", "Earth", "The clouds", "The Moon only", "A magnet", "Gravity pulls objects toward Earth."],
            ["Gravity is a type of what?", "Force", "Color", "Sound", "Shape", "Gravity is a force."],
            ["Which object is affected by gravity?", "A falling apple", "Only light", "Only magnets", "Only electricity", "Objects with mass feel gravity."]
        ]
    },
    force: {
        title: "A force is a push or pull.",
        intro: "In this lesson, you will learn how pushes and pulls can make objects move, stop, or change direction.",
        anim: "forceAnim",
        label: "Force pushes or pulls",
        badge: "Force Builder 💪",
        questions: [
            ["What is a force?", "A push or pull", "A color", "A number", "A sound", "A force is a push or pull."],
            ["Which is an example of force?", "Pushing a door", "Looking at a door", "Naming a door", "Painting a door", "Pushing uses force."],
            ["A pull is a type of what?", "Force", "Shape", "Light", "Heat", "Pulling is a force."],
            ["Force can make objects do what?", "Move", "Disappear", "Freeze time", "Become weightless", "Force can cause motion."],
            ["Kicking a ball uses what?", "Force", "Silence", "Color", "Magnetism only", "Kicking applies force."]
        ]
    },
    energy: {
        title: "Energy is the ability to do work or cause change.",
        intro: "In this lesson, you will learn that energy helps objects move, light shine, and changes happen.",
        anim: "energyAnim",
        label: "Energy causes change",
        badge: "Energy Explorer ⚡",
        questions: [
            ["What is energy?", "Ability to do work", "A shape", "A color", "A button", "Energy allows work to happen."],
            ["Energy can cause what?", "Change", "Nothing", "Only darkness", "Only silence", "Energy causes change."],
            ["A moving ball has what?", "Energy", "No motion", "No mass", "No force", "A moving object has energy."],
            ["Food gives your body what?", "Energy", "Gravity", "Friction", "Magnetism", "Food provides energy."],
            ["Light is a form of what?", "Energy", "Weight", "Mass only", "Speed only", "Light is energy."]
        ]
    },
    motion: {
        title: "Motion means changing position.",
        intro: "In this lesson, you will learn that motion happens when an object changes position over time.",
        anim: "motionAnim",
        label: "Motion is change in position",
        badge: "Motion Champion 🚀",
        questions: [
            ["What is motion?", "Changing position", "Standing still forever", "Changing name", "Changing color only", "Motion means change in position."],
            ["A rolling ball is an example of what?", "Motion", "Silence", "Stillness", "Color", "Rolling is motion."],
            ["Motion involves a change in what?", "Position", "Color only", "Name only", "Temperature only", "Motion means a change in position."],
            ["A car driving is in what?", "Motion", "Stillness", "Nothing", "A shadow", "Driving is motion."],
            ["If something moves, it changes what?", "Position", "Name", "Color", "Shape only", "Movement changes position."]
        ]
    },
    friction: {
        title: "Friction slows objects when surfaces rub.",
        intro: "In this lesson, you will learn how friction slows motion when surfaces touch and rub together.",
        anim: "frictionAnim",
        label: "Friction slows motion",
        badge: "Friction Fighter 🛞",
        questions: [
            ["What does friction do?", "Slows objects", "Makes objects invisible", "Creates light only", "Removes gravity", "Friction usually slows motion."],
            ["Friction happens when?", "Surfaces rub", "Objects float", "Lights turn off", "Air disappears", "Friction happens when surfaces rub."],
            ["More friction usually happens on what?", "Rough surface", "Smooth ice", "Empty space", "A mirror only", "Rough surfaces usually have more friction."],
            ["Friction is a type of what?", "Force", "Color", "Sound", "Food", "Friction is a force."],
            ["Brakes use what to slow wheels?", "Friction", "Gravity disappearing", "Light", "Magnetism only", "Brakes use friction."]
        ]
    },
    speed: {
        title: "Speed tells how fast something moves.",
        intro: "In this lesson, you will learn that speed tells how fast an object moves over time.",
        anim: "speedAnim",
        label: "Speed is how fast something moves",
        badge: "Speed Star ⚡",
        questions: [
            ["Speed tells us what?", "How fast something moves", "What color it is", "How loud it is", "How old it is", "Speed tells how fast something moves."],
            ["A fast car has what?", "High speed", "No motion", "No mass", "No energy", "A fast car has high speed."],
            ["Which is faster?", "A running cheetah", "A sleeping cat", "A parked car", "A still rock", "The running cheetah has greater speed."],
            ["Speed relates motion to what?", "Time", "Color", "Shape", "Sound", "Speed compares movement over time."],
            ["Slow movement means what?", "Low speed", "No mass", "No gravity", "No force", "Slow movement means low speed."]
        ]
    },
    electricity: {
        title: "Electricity is the movement of electric charge.",
        intro: "In this lesson, you will learn that electricity powers lights, devices, and many tools we use every day.",
        anim: "electricityAnim",
        label: "Electricity = moving charge",
        badge: "Electricity Expert ⚡",
        questions: [
            ["Electricity is movement of what?", "Electric charge", "Water only", "Rocks", "Air only", "Electricity is moving charge."],
            ["What can electricity power?", "Lights", "Rocks only", "Paper only", "Nothing", "Electricity powers devices."],
            ["A battery stores what?", "Electrical energy", "Friction", "Mass", "Gravity", "A battery stores electrical energy."],
            ["Electricity often moves through what?", "Wires", "Paper only", "Wood only", "Sand", "Electricity moves through conductors like wires."],
            ["Lightning is a form of what?", "Electricity", "Mass", "Friction", "Sound only", "Lightning is electricity."]
        ]
    },
    magnetism: {
        title: "Magnetism is a force that can attract or repel.",
        intro: "In this lesson, you will learn how magnets pull some materials closer and push others away.",
        anim: "magnetismAnim",
        label: "Magnets attract and repel",
        badge: "Magnet Master 🧲",
        questions: [
            ["Magnets can attract or what?", "Repel", "Sleep", "Eat", "Freeze", "Magnets can attract or repel."],
            ["Magnetism is a type of what?", "Force", "Food", "Color", "Liquid", "Magnetism is a force."],
            ["Magnets often attract what?", "Iron", "Wood only", "Plastic only", "Paper only", "Magnets attract materials like iron."],
            ["Opposite magnetic poles do what?", "Attract", "Disappear", "Melt", "Make sound only", "Opposite poles attract."],
            ["Same magnetic poles do what?", "Repel", "Melt", "Combine forever", "Turn off gravity", "Same poles repel."]
        ]
    },
    acceleration: {
        title: "Acceleration means speed is changing.",
        intro: "In this lesson, you will learn that acceleration happens when speed or direction changes.",
        anim: "accelerationAnim",
        label: "Acceleration = changing speed",
        badge: "Acceleration Ace 🚗",
        questions: [
            ["Acceleration means a change in what?", "Speed", "Color", "Name", "Taste", "Acceleration means speed changes."],
            ["A car speeding up is doing what?", "Accelerating", "Freezing", "Sleeping", "Shrinking", "Speeding up is acceleration."],
            ["A car slowing down has what?", "Acceleration", "No motion", "No mass", "No energy", "Slowing down is also acceleration."],
            ["Acceleration can change speed or what?", "Direction", "Name", "Color only", "Texture only", "Acceleration can change speed or direction."],
            ["Which shows acceleration?", "Bike speeding up", "Book resting", "Rock sitting still", "Lamp turned off", "A bike speeding up is accelerating."]
        ]
    },
    mass: {
        title: "Mass is the amount of matter in an object.",
        intro: "In this lesson, you will learn that mass describes how much matter something has.",
        anim: "massAnim",
        label: "Mass = amount of matter",
        badge: "Mass Master ⚖️",
        questions: [
            ["Mass means amount of what?", "Matter", "Color", "Sound", "Speed", "Mass is the amount of matter."],
            ["A heavy object usually has more what?", "Mass", "Speed only", "Electricity only", "Light only", "Heavy objects usually have more mass."],
            ["Mass is measured in what?", "Kilograms", "Seconds", "Meters only", "Degrees", "Mass is often measured in kilograms."],
            ["More mass can make objects harder to what?", "Move", "See", "Name", "Color", "More mass can make objects harder to move."],
            ["A bowling ball has more mass than what?", "Tennis ball", "Truck", "Car", "Elephant", "A bowling ball has more mass than a tennis ball."]
        ]
    }
};

function enterApp() {
    let name = document.getElementById("studentName").value.trim();
    if (name === "") name = "Student";

    localStorage.setItem("name", name);

    document.getElementById("startScreen").style.display = "none";
    document.getElementById("mainApp").style.display = "block";
    document.getElementById("welcomeText").innerHTML = "Welcome, " + name + "! Follow the learning path to unlock new lessons.";

    updateDashboard();
    updateLessonButtons();
    updateReviewMenu();
    checkCourseComplete();
}

function startLesson(topic) {
    reviewMode = false;

    if (!isLessonUnlocked(topic)) {
        document.getElementById("output").innerHTML = "🔒 This lesson is locked. Complete the previous lesson with a perfect score first.";
        return;
    }

    prepareLesson(topic);
    showLessonIntro();
}

function startReviewLesson(topic) {
    reviewMode = true;

    if (!completedLessons.includes(topic)) {
        document.getElementById("output").innerHTML = "Review is only available after completing that lesson.";
        return;
    }

    prepareLesson(topic);
    showReviewIntro();
}

function prepareLesson(topic) {
    currentLesson = topic;
    score = 0;
    currentQuestion = 0;

    let lesson = lessons[topic];

    document.getElementById("output").innerHTML = lesson.title;
    document.getElementById("quiz").innerHTML = "";
    document.getElementById("scoreBox").innerHTML = "Score: 0";
    document.getElementById("ball").className = lesson.anim;
    document.getElementById("sceneLabel").innerHTML = lesson.label;

    lessonQuestions = lesson.questions;
    updateProgress();
}

function showLessonIntro() {
    let lesson = lessons[currentLesson];

    document.getElementById("quiz").innerHTML =
        "<div class='completionBox'>" +
        "<h2>Lesson Preview</h2>" +
        "<h3>" + getLessonDisplayName(currentLesson) + "</h3>" +
        "<p>" + lesson.intro + "</p>" +
        "<p><strong>Goal:</strong> Answer all 5 questions correctly to earn the badge and unlock the next lesson.</p>" +
        "<button onclick='beginQuiz()'>Begin Quiz</button>" +
        "</div>";
}

function showReviewIntro() {
    let lesson = lessons[currentLesson];

    document.getElementById("quiz").innerHTML =
        "<div class='completionBox'>" +
        "<h2>Review Mode</h2>" +
        "<h3>" + getLessonDisplayName(currentLesson) + "</h3>" +
        "<p>" + lesson.intro + "</p>" +
        "<p><strong>Note:</strong> Review mode is for practice only. It does not add XP, badges, or unlocks.</p>" +
        "<button onclick='beginQuiz()'>Begin Review</button>" +
        "</div>";
}

function beginQuiz() {
    currentQuestion = 0;
    showQuestion();
}

function showQuestion() {
    updateProgress();

    if (currentQuestion >= lessonQuestions.length) {
        if (reviewMode) {
            showReviewCompleteScreen();
        } else {
            showCompletionScreen();
        }
        return;
    }

    let q = lessonQuestions[currentQuestion];

    document.getElementById("quiz").innerHTML =
        "<p>Question " + (currentQuestion + 1) + " of " + lessonQuestions.length + "</p>" +
        "<h3>" + q[0] + "</h3>" +
        "<div class='answerGrid'>" +
        "<button onclick='answer(true)'>" + q[1] + "</button>" +
        "<button onclick='answer(false)'>" + q[2] + "</button>" +
        "<button onclick='answer(false)'>" + q[3] + "</button>" +
        "<button onclick='answer(false)'>" + q[4] + "</button>" +
        "</div>";
}

function answer(isCorrect) {
    let explanation = lessonQuestions[currentQuestion][5];

    if (isCorrect) {
        score++;
        document.getElementById("quiz").innerHTML =
            "<p>✅ Correct!</p><button onclick='nextQuestion()'>Next</button>";
    } else {
        document.getElementById("quiz").innerHTML =
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
    let perfectScore = score === lessonQuestions.length;
    let badge = lessons[currentLesson].badge;

    awardXP();

    if (perfectScore) {
        awardBadge(badge);
        markLessonCompleted(currentLesson);
    }

    updateDashboard();
    updateLessonButtons();
    updateReviewMenu();

    if (completedLessons.length === lessonOrder.length) {
        awardCourseCompleteBadge();
        showCourseCompleteScreen();
        return;
    }

    document.getElementById("quiz").innerHTML =
        "<div class='completionBox'>" +
        "<h2>🎉 Lesson Complete!</h2>" +
        "<p><strong>Score:</strong> " + score + " out of " + lessonQuestions.length + "</p>" +
        "<p><strong>XP Earned:</strong> " + xpEarned + "</p>" +
        "<p><strong>Badge:</strong> " + (perfectScore ? badge : "Not earned yet") + "</p>" +
        "<p>" + (perfectScore ? "Great job! The next lesson is now unlocked." : "Try again for a perfect score to unlock the next lesson.") + "</p>" +
        "<button onclick='startLesson(\"" + currentLesson + "\")'>Try Again</button>" +
        "</div>";
}

function showReviewCompleteScreen() {
    document.getElementById("quiz").innerHTML =
        "<div class='completionBox'>" +
        "<h2>Review Complete</h2>" +
        "<p><strong>Practice Score:</strong> " + score + " out of " + lessonQuestions.length + "</p>" +
        "<p>This was practice only. Your XP, badges, and unlocks were not changed.</p>" +
        "<button onclick='startReviewLesson(\"" + currentLesson + "\")'>Review Again</button>" +
        "</div>";
}

function showCourseCompleteScreen() {
    document.getElementById("output").innerHTML = "🏆 Course Complete! You finished the full Physics Learning Path.";

    document.getElementById("quiz").innerHTML =
        "<div class='completionBox courseCompleteBox'>" +
        "<h2>🏆 Congratulations!</h2>" +
        "<h3>You completed the full Physics Learning Course.</h3>" +
        "<p>You finished all " + lessonOrder.length + " lessons.</p>" +
        "<p><strong>Final Level:</strong> " + level + "</p>" +
        "<p><strong>Current XP:</strong> " + xp + " / 100</p>" +
        "<p><strong>Total Badges:</strong> " + earnedBadges.length + "</p>" +
        "<p><strong>Final Badge:</strong> Physics Course Champion 🌟</p>" +
        "<button onclick='resetProgress()'>Restart Course</button>" +
        "</div>";

    document.getElementById("progressBar").style.width = "100%";
    document.getElementById("progressText").innerHTML = "Progress: 100%";
    document.getElementById("sceneLabel").innerHTML = "Course Complete!";
}

function checkCourseComplete() {
    if (completedLessons.length === lessonOrder.length) {
        showCourseCompleteScreen();
    }
}

function awardCourseCompleteBadge() {
    let finalBadge = "Physics Course Champion 🌟";

    if (!earnedBadges.includes(finalBadge)) {
        earnedBadges.push(finalBadge);
        localStorage.setItem("badges", JSON.stringify(earnedBadges));
    }

    updateDashboard();
}

function updateProgress() {
    let progress = lessonQuestions.length > 0 ? (currentQuestion / lessonQuestions.length) * 100 : 0;
    document.getElementById("progressBar").style.width = progress + "%";
    document.getElementById("progressText").innerHTML = "Progress: " + Math.round(progress) + "%";
}

function awardXP() {
    xp += score * 10;

    while (xp >= 100) {
        level++;
        xp -= 100;
    }

    localStorage.setItem("level", level);
    localStorage.setItem("xp", xp);
}

function awardBadge(badge) {
    if (!earnedBadges.includes(badge)) {
        earnedBadges.push(badge);
        localStorage.setItem("badges", JSON.stringify(earnedBadges));
    }
}

function markLessonCompleted(lesson) {
    if (!completedLessons.includes(lesson)) {
        completedLessons.push(lesson);
        localStorage.setItem("completedLessons", JSON.stringify(completedLessons));
    }
}

function isLessonUnlocked(lesson) {
    let index = lessonOrder.indexOf(lesson);

    if (index === 0) {
        return true;
    }

    let previousLesson = lessonOrder[index - 1];
    return completedLessons.includes(previousLesson);
}

function updateLessonButtons() {
    for (let i = 0; i < lessonOrder.length; i++) {
        let lesson = lessonOrder[i];
        let button = document.getElementById(lesson + "Btn");

        if (completedLessons.includes(lesson)) {
            button.className = "completed";
            button.innerHTML = getLessonDisplayName(lesson) + " ✅";
        } else if (isLessonUnlocked(lesson)) {
            button.className = "";
            button.innerHTML = getLessonDisplayName(lesson);
        } else {
            button.className = "locked";
            button.innerHTML = getLessonDisplayName(lesson) + " 🔒";
        }
    }
}

function updateReviewMenu() {
    let reviewMenu = document.getElementById("reviewMenu");

    if (completedLessons.length === 0) {
        reviewMenu.innerHTML = "<p>No completed lessons to review yet.</p>";
        return;
    }

    let html = "";

    for (let i = 0; i < completedLessons.length; i++) {
        let lesson = completedLessons[i];
        html += "<button class='reviewButton' onclick='startReviewLesson(\"" + lesson + "\")'>" + getLessonDisplayName(lesson) + " Review</button>";
    }

    reviewMenu.innerHTML = html;
}

function getLessonDisplayName(lesson) {
    let names = {
        gravity: "Gravity",
        force: "Force",
        energy: "Energy",
        motion: "Motion",
        friction: "Friction",
        speed: "Speed",
        electricity: "Electricity",
        magnetism: "Magnetism",
        acceleration: "Acceleration",
        mass: "Mass"
    };

    return names[lesson];
}

function updateDashboard() {
    document.getElementById("levelBox").innerHTML = "Level: " + level + " | XP: " + xp + " / 100";
    document.getElementById("completedBox").innerHTML = "Lessons Completed: " + completedLessons.length + " / 10";
    document.getElementById("badgeCountBox").innerHTML = "Badges Earned: " + earnedBadges.length;
    document.getElementById("badges").innerHTML = earnedBadges.length ? earnedBadges.join("<br>") : "No badges yet.";
}

function resetProgress() {
    localStorage.removeItem("level");
    localStorage.removeItem("xp");
    localStorage.removeItem("badges");
    localStorage.removeItem("completedLessons");

    level = 1;
    xp = 0;
    earnedBadges = [];
    completedLessons = [];
    reviewMode = false;

    document.getElementById("scoreBox").innerHTML = "Score: 0";
    document.getElementById("output").innerHTML = "Progress reset. Gravity is unlocked. Complete lessons to unlock more.";
    document.getElementById("quiz").innerHTML = "";
    document.getElementById("progressBar").style.width = "0%";
    document.getElementById("progressText").innerHTML = "Progress: 0%";
    document.getElementById("sceneLabel").innerHTML = "";
    document.getElementById("ball").className = "";

    updateDashboard();
    updateLessonButtons();
    updateReviewMenu();
}