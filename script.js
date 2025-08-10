let questionObj = {
    "Q1": ["What’s the national animal of the Internet?", ["🐱 Cat", "🐶 Doge", "🐍 Python", "📡 Wi - Fi"], "🐶 Doge"],
    "Q2": ["What happens if you microwave your phone?", ["📱 It becomes a time machine", "⚡ Free 5G upgrade", "🔥 You gain firebending powers", "🧨 Boom."], "🧨 Boom."],
    "Q3": ["If I eat 3 pencils, how many alphabets can I write?", ["✏️ 26", "✏️ 0", "🧠 Infinite", "🐍 Snake language only"], "🐍 Snake language only"],
    "Q4": ["What's the best way to install more RAM?", ["💾 Water the laptop", "🧃 Drink an energy drink", "🔨 Hit the PC twice", "🧠 Believe in yourself"], "🧠 Believe in yourself"],
    "Q5": ["Why did the JavaScript developer go broke?", ["🧑‍💻 Because he used `var` instead of `let`", "🧃 Too many semicolon debts", "☕ Bought Java instead", "📉 Because his promises weren’t fulfilled"], "📉 Because his promises weren’t fulfilled"],
    "Q6": ["What is the shape of true love?", ["💔 A broken circle", "🛸 A triangle with trust issues", "🍕 Pizza", "♾️ A loop that never ends"], "♾️ A loop that never ends"],
    "Q7": ["What’s the most dangerous element in the periodic table?", ["🔥 Fire nation", "😠 Rage-ium", "💻 Bug-onium", "🦄 Unicorn-ium"], "💻 Bug-onium"],
    "Q8": ["If a website loads in the forest and no one's around to see it…", ["🌲 Is it still responsive?", "💻 Does it use Tailwind?", "🤔 Does it even exist?", "🎵 Does it autoplay lo-fi beats?"], "🤔 Does it even exist?"],
    "Q9": ["What’s the best way to debug code?", ["🐞 Summon the debugger spirit", "💃 Dance on your keyboard", "🔥 Delete the entire project", "🍪 Bribe the bug with cookies"], "🔥 Delete the entire project"],
    "Q10": ["What does “404” really mean?", ["🤖 Alien abduction", "🧠 Page went on vacation", "🚪 Wrong universe", "📄 Page not found"], "📄 Page not found"]
};

let optNumber,timer;
let questNumber = 1;
let optionClick = 0;
let nextClick = 0;

let score = 0;
let progressBarWidth = 10;

let h4 = document.querySelector("h4");
let correct = document.querySelector('.correctAns');
let question = document.querySelector("h2");
let questionNumberHtml = document.querySelector("h3");
let options = document.querySelectorAll(".option");
let submitButton = document.querySelector(".btn");
let min = document.querySelector(".min");
let sec = document.querySelector(".sec");


for (let element of options) {
    element.addEventListener("click", () => {
        if (optionClick == 0) {
            optNumber = element.dataset.optNum;
            element.style.border = "3px solid #00b3ff";
            optionClick = 1;
        } else {
            options[optNumber].style.border = "3px solid #211700";
            optNumber = element.dataset.optNum;
            element.style.border = "3px solid #00b3ff";
        }
    })
}


function timerFunction() {
    let minute = 0;
    let second = 0;

    let timer = setInterval(() => {
        if (second == 59) {
            minute += 1;
            second = 0;
            min.innerText = minute.toString().padStart(2, '0');
            sec.innerText = second.toString().padStart(2, '0');
        }
        else {
            second += 1;
            sec.innerText = second.toString().padStart(2, '0');
        }

    }, 1000);
}

timerFunction();

function check() {
    if (optNumber == undefined) {                                                                          // checking whether user had chosen an option or not
        alert("please select an option!")
    } else if (nextClick == 0) {                                                                           // checking option is correct or not
        
        if (options[optNumber].innerHTML == questionObj["Q" + questNumber][2]) {                           // if answer is correct

            options[optNumber].style.border = "5px solid green";
            h4.innerText = "Your answer is correct!!";
            h4.style.color = "green";

            score += 10;

        } else {                                                                                             // if answer is wrong

            options[optNumber].style.border = "5px solid red";
            h4.innerText = "Your answer is wrong!";
            h4.style.color = "red";

            correct.innerHTML = "Correct answer is " + questionObj["Q" + questNumber][2];

            score -= 5;
        }

        submitButton.innerText = "NEXT";
        nextClick = 1;
        
    } else {                                                                                               // moving to the next question
        options[optNumber].style.border = "3px solid #211700";
        
        if (questNumber == 10) {                                                                           // last question                                                       
            clearInterval(timer); 
            const finalData= {
                score : score,
                mins: min.innerText, 
                secs : sec.innerText,
            };

            localStorage.setItem('finalUserData', JSON.stringify(finalData));                              // sending dataa to score page
            window.location.href = 'score.html';                                                           // redirecting to score page 
        }

        let i = 0;
        optNumber = undefined;
        optionClick = 0;
        questNumber += 1;
        nextClick = 0;
        progressBarWidth += 9;

        questionNumberHtml.innerText = "Question " + questNumber;
        question.innerText = questionObj["Q" + questNumber][0];
        h4.innerText = "";
        correct.innerText = "";
        submitButton.innerText = "SUBMIT";

        gsap.to(".progressBar", {
            width: progressBarWidth + "%",  
            duration: 0.5,
            ease: "power1.inOut"
        });


        for (let element of options) {
            element.innerText = questionObj["Q" + questNumber][1][i];
            i++;
        }

    }
}


