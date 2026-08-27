// import hooks
import { useState } from "react";

// import component
import QuestionTimer from "./QuestionTimer.jsx";
import Answers from "./Answers.jsx";

// import dummy data
import QUESTIONS from "../questions.js";

// index: nhận index của câu hỏi hiện tại
// onSelectAnswer: nhận hàm xử lý thêm answer vào mảng của state UserAnswers
// onSkipAnswer: nhận hàm xử lý khi skip câu hỏi
export default function Question({ index, onSelectAnswer, onSkipAnswer }) {
  // state quản lý câu trả lời được người dùng chọn để truyền vào onSelectAnswer
  const [answer, setAnswer] = useState({
    // câu trả lời được người dùng chọn
    selectedAnswer: "",
    // trạng thái của câu trả lời ('', 'answered', 'correct', 'wrong')
    isCorrect: null,
  });

  // biến quản lý só giây để skip sang câu hỏi mới
  let timer = 10000;

  // nếu người dùng đã chọn câu trả lời => sau 1 giây sẽ hết thanh progress
  if (answer.selectedAnswer) {
    timer = 1000;
  }

  // nếu câu trả lời có trạng thái đúng hoặc sai thì tạo lại thanh progress với timer là 2 giây
  if (answer.isCorrect) {
    timer = 2000;
  }

  function handleSelectAnswer(answer) {
    // cập nhật trạng thái của câu trả lời
    setAnswer({
      selectedAnswer: answer,
      // tạm thời để là null để biến answerState là chuỗi rỗng ''
      isCorrect: null,
    });

    // sau 1 giây thì isCorrect chuyển thành true hoặc false để biến answerState thành 'wrong' hoặc 'correct'
    setTimeout(() => {
      setAnswer({
        selectedAnswer: answer,
        isCorrect: QUESTIONS[index].answers[0] === answer,
      });

      // sau 2 giây nữa thì chuyền câu trả lời của người dùng vào onSelectAnswer để đưa câu trả lời vào mảng userAnswers của component cha
      setTimeout(() => {
        onSelectAnswer(answer);
      }, 2000);
    }, 1000);
  }

  // biến chứa giá trị để truyền vào prop answerState
  let answerState = "";

  // xử lý giá trị của biến answerState dựa vào state answer.isCorrect
  // nếu người dùng đã chọn câu trả lời và isCorrect đã được cập nhật từ null sau timeout thành wrong hoặc correct
  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? "correct" : "wrong";

    // nếu người dùng chỉ mới chọn câu trả lời và isCorrect chưa được cập nhật do timeout
  } else if (answer.selectedAnswer) {
    answerState = "answered";
  }

  return (
    <div id="question">
      {/* component thanh để hiện thanh progress
        nếu không chọn câu trả lời sau 10s thì đưa null vào danh sách câu trả lời được chọn
        Do timeout và onTimeout không thay đổi
        nên nếu muốn QuestionTimer cũ được unmount và mount lại QuestionTimer mới
        để useEffect trong QuestionTimer được chạy lại khi component QuestionTimer render xong
        thì ta thêm prop index={}*/}
      <QuestionTimer
        key={timer}
        timeout={timer}
        onTimeout={answer.selectedAnswer === "" ? onSkipAnswer : null}
        mode={answerState}
      />

      {/* Hiển thị câu hỏi hiện tại */}
      <h2>{QUESTIONS[index].text}</h2>
      {/* answers: các câu trả lời của câu hỏi
      selected answer: câu trả lời được người dùng chọn
      answerState: trạng thái của câu trả lời
      onSelect: hàm xử lý chọn câu trả lời */}
      <Answers
        answers={QUESTIONS[index].answers}
        selectedAnswer={answer.selectedAnswer}
        answerState={answerState}
        onSelect={handleSelectAnswer}
      />
    </div>
  );
}
