
const questions = [
    {
        question: "Apa fungsi utama Gendang Beleq dalam kebudayaan masyarakat Sasak?",
        answers: [
            "Sebagai alat musik pengiring pertunjukan",
            "Sebagai alat komunikasi modern",
            "Sebagai alat memasak tradisional",
            "Sebagai alat pertanian"
        ],
        correct: 0
    },
    {
        question: "Gendang Beleq dimainkan dengan cara apa?",
        answers: [
            "Ditiup",
            "Dipetik",
            "Dipukul",
            "Digesek"
        ],
        correct: 2
    },
    {
        question: "Genggong merupakan alat musik yang menghasilkan bunyi melalui...",
        answers: [
            "Getaran",
            "Aliran air",
            "Gesekan batu",
            "Tiupan angin"
        ],
        correct: 0
    },
    {
        question: "Alat musik Serunai termasuk jenis alat musik...",
        answers: [
            "Perkusi",
            "Tiup",
            "Petik",
            "Gesek"
        ],
        correct: 1
    },
    {
        question: "Bagaimana cara memainkan alat musik Rebana?",
        answers: [
            "Ditiup",
            "Dipetik",
            "Dipukul",
            "Digesek"
        ],
        correct: 2
    },
    {
        question: "Gendang Beleq dikenal sebagai salah satu kesenian musik tradisional dari...",
        answers: [
            "Masyarakat Sasak di Lombok",
            "Masyarakat Betawi",
            "Masyarakat Minangkabau",
            "Masyarakat Sunda"
        ],
        correct: 0
    },
    {
        question: "Serunai menghasilkan suara dengan memanfaatkan...",
        answers: [
            "Getaran senar",
            "Pukulan tangan",
            "Tiupan udara",
            "Gesekan kayu"
        ],
        correct: 2
    },
    {
        question: "Rebana termasuk dalam kelompok alat musik...",
        answers: [
            "Petik",
            "Perkusi",
            "Tiup",
            "Gesek"
        ],
        correct: 1
    },
    {
        question: "Apa yang menjadi ciri khas Gendang Beleq?",
        answers: [
            "Ukurannya relatif besar",
            "Dimainkan dengan busur",
            "Memiliki senar panjang",
            "Terbuat dari kaca"
        ],
        correct: 0
    },
    {
        question: "Apa manfaat mempelajari alat musik tradisional Lombok?",
        answers: [
            "Menghilangkan budaya lokal",
            "Menggantikan seluruh musik modern",
            "Mengenal dan melestarikan warisan budaya",
            "Mengurangi kegiatan kesenian"
        ],
        correct: 2
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const questionNumber = document.getElementById("questionNumber");
const scoreDisplay = document.getElementById("scoreDisplay");
const questionText = document.getElementById("questionText");
const answerList = document.getElementById("answerList");
const nextButton = document.getElementById("nextButton");
const progressFill = document.getElementById("progressFill");


// MENAMPILKAN PERTANYAAN
function showQuestion() {

    answered = false;

    const data = questions[currentQuestion];

    questionNumber.textContent =
        `Pertanyaan ${currentQuestion + 1} dari ${questions.length}`;

    scoreDisplay.textContent = `Skor: ${score}`;

    questionText.textContent = data.question;

    answerList.innerHTML = "";

    progressFill.style.width =
        `${(currentQuestion / questions.length) * 100}%`;

    nextButton.disabled = true;

    nextButton.textContent =
        currentQuestion === questions.length - 1
            ? "Lihat Hasil"
            : "Pertanyaan Selanjutnya";

    data.answers.forEach((answer, index) => {

        const button = document.createElement("button");

        button.className = "answer-btn";
        button.textContent =
            `${String.fromCharCode(65 + index)}. ${answer}`;

        button.addEventListener("click", () => {
            selectAnswer(index);
        });

        answerList.appendChild(button);

    });

}


// MEMERIKSA JAWABAN
function selectAnswer(selectedIndex) {

    if (answered) return;

    answered = true;

    const correctIndex = questions[currentQuestion].correct;

    const buttons = answerList.querySelectorAll(".answer-btn");

    buttons.forEach((button, index) => {

        button.disabled = true;

        if (index === correctIndex) {
            button.classList.add("correct");
        }

        if (index === selectedIndex && selectedIndex !== correctIndex) {
            button.classList.add("wrong");
        }

    });

    if (selectedIndex === correctIndex) {
        score++;
    }

    scoreDisplay.textContent = `Skor: ${score}`;

    nextButton.disabled = false;

}


// PERTANYAAN SELANJUTNYA
nextButton.addEventListener("click", () => {

    if (!answered) return;

    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }

});


// MENAMPILKAN HASIL
function showResult() {

    const total = questions.length;
    const wrong = total - score;
    const finalScore = Math.round((score / total) * 100);

    let message = "";

    if (finalScore >= 80) {
        message = "Hebat! Kamu sangat mengenal musik tradisional Lombok.";
    } else if (finalScore >= 60) {
        message = "Bagus! Pengetahuanmu sudah cukup baik.";
    } else {
        message = "Tetap semangat! Pelajari kembali alat musik tradisional Lombok.";
    }

    document.getElementById("quizContainer").innerHTML = `

        <div class="quiz-result">

            <h2>Kuis Selesai!</h2>

            <p>Terima kasih telah mengikuti kuis musik tradisional Lombok.</p>

            <div class="quiz-score">${finalScore}</div>

            <p><strong>Nilai Akhir</strong></p>

            <p>
                Jawaban Benar: ${score} dari ${total}<br>
                Jawaban Salah: ${wrong} dari ${total}
            </p>

            <p>${message}</p>

            <button class="quiz-restart" id="restartButton">
                Ulangi Kuis
            </button>

        </div>

    `;

    document.getElementById("restartButton").addEventListener("click", restartQuiz);

    progressFill.style.width = "100%";

}



// MENGULANGI KUIS
function restartQuiz() {
    window.location.reload();
}



// MEMULAI KUIS
showQuestion();
