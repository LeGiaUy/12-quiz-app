// import assets
import quizCompleteImg from "../assets/quiz-complete.png";
import QUESTIONS from "../questions.js";

// userAnswers: câu trả lời của người dùng
export default function Summary({ userAnswers }) {
  // số câu trả lời đã skip
  const skippedAnswers = userAnswers.filter((answer) => answer === null);

  // số câu trả lời đúng
  const correctAnswers = userAnswers.filter(
    (answer, index) => answer === QUESTIONS[index].answers[0],
  );

  // phần trăm câu đã skip
  const skippedAnswersShare = Math.round(
    (skippedAnswers.length / userAnswers.length) * 100,
  );

  // phần câu trả lời đúng
  const correctAnswersShare = Math.round(
    (correctAnswers.length / userAnswers.length) * 100,
  );

  // phần trăm câu trả lời sai
  const wrongAnswersShare = 100 - skippedAnswersShare - correctAnswersShare;

  return (
    <div id="summary">
      <img src={quizCompleteImg} alt="Tropy Icon" />
      <h2>Quiz Completed!</h2>
      <div id="summary-stats">
        {/* phần trăm câu trả lời đã skip */}
        <p>
          <span className="number">{skippedAnswersShare}%</span>
          <span className="text">skipped</span>
        </p>

        {/* phần trăm câu trả lời đúng */}
        <p>
          <span className="number">{correctAnswersShare}%</span>
          <span className="text">answered correctly</span>
        </p>

        {/* phần trăm câu trả lời sai */}
        <p>
          <span className="number">{wrongAnswersShare}%</span>
          <span className="text">answered incorrectly</span>
        </p>
      </div>
      <ol>
        {userAnswers.map((answer, index) => {
          let cssClass = "user-answer";

          //   class khác nhau dựa vào câu trả lời đúng hoặc sai
          if (answer === null) {
            cssClass += " skipped";
          } else if (answer === QUESTIONS[index].answers[0]) {
            cssClass += " correct";
          } else {
            cssClass += " wrong";
          }

          return (
            <li key={index}>
              {/* số thứ tự của câu hỏi */}
              <h3>{index + 1}</h3>

              {/* câu hỏi */}
              <p className="question">{QUESTIONS[index].text}</p>

              {/* câu trả lời người dùng đã chọn nếu null thì hiện "skipped" */}
              <p className={cssClass}>{answer ?? "Skipped"}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
