import QuestionTimer from "./QuestionTimer.jsx";
import Answers from "./Answers.jsx";

export default function Question({
  questionText,
  answers,
  onSelectAnswer,
  selectedAnswer,
  answerState,
  onSkipAnswer,
}) {
  return (
    <div id="question">
      {/* component thanh để hiện thanh progress
        nếu không chọn câu trả lời sau 10s thì đưa null vào danh sách câu trả lời được chọn
        Do timeout và onTimeout không thay đổi
        nên nếu muốn QuestionTimer cũ được unmount và mount lại QuestionTimer mới
        để useEffect trong QuestionTimer được chạy lại khi component QuestionTimer render xong
        thì ta thêm prop key={}*/}
      <QuestionTimer timeout={10000} onTimeout={onSkipAnswer} />

      {/* Hiển thị câu hỏi hiện tại */}
      <h2>{questionText}</h2>
      <Answers
        answers={answers}
        selectedAnswer={selectedAnswer}
        answerState={answerState}
        onSelect={onSelectAnswer}
      />
    </div>
  );
}
