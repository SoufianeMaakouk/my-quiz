function loadQuestion() {
  if (currentQuestion < quizData.length) {
    const q = quizData[currentQuestion];
    document.getElementById('question').textContent = q.question;

    // Display question image if available
    const questionImage = document.getElementById('questionImage');
    if (q.image) {
      questionImage.src = q.image;
      questionImage.style.display = 'block';
    } else {
      questionImage.style.display = 'none';
    }

    // Render answer options
    const optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = '';
    if (q.options && q.options.length > 0) {
      q.options.forEach(option => {
        const btn = document.createElement('button');
        btn.textContent = option;
        btn.className = 'answer-button';
        btn.onclick = () => checkAnswer(option);
        optionsDiv.appendChild(btn);
      });
    } else {
      // Fallback: if no options, show text input
      optionsDiv.innerHTML = `
        <input type="text" id="answer" placeholder="Type your answer here" autocomplete="off" />
        <br>
        <button id="submitBtn" onclick="checkAnswer()">Submit</button>
        <button id="skipBtn" onclick="skipQuestion()">Skip</button>
      `;
    }

    timeLeft = 20;
    updateTimer();
    startTimer();
  } else {
    endQuiz();
  }
}
