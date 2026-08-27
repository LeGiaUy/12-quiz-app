// import hooks
import { useState, useCallback } from "react";
// import dummy data
import QUESTIONS from "../questions.js";

// import components
import Question from "./Question.jsx";
import Summary from "./Summary.jsx";

export default function Quiz() {
  // state quản lý câu hỏi nào đang được hiển thị
  // const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  // Ta không cần state này ở đây vì
  // dựa vào state quản lý câu trả lời ở dưới mà ở đây là một mảng
  // nếu mảng đang chứa 2 phần tử, câu hỏi được hiển thị tiếp theo chắc chắn là câu hỏi 3
  // và index của câu hỏi đó sẽ là vì mảng bắt đầu với index là 0

  // state quản lý những câu trả lời được người dùng lựa chọn
  const [userAnswers, setUserAnswers] = useState([]);

  // biến chứa index của câu hỏi tính bằng độ dài của mảng câu trả lời
  // mảng chứa 2 câu trả lời => index = 2 => câu hỏi thứ 3
  // chỉ thay đổi khi answerState được reset hoặc mới được khởi tạo
  const activeQuestionIndex = userAnswers.length;

  // biến để xử lý khi hết câu hỏi
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  // Hàm xử lý chọn câu trả lời
  // sử dụng useCallback để hàm handleSelectAnswer không bị tạo mới khi re-render
  // trừ khi dependencies thay đổi
  const handleSelectAnswer = useCallback((selectedAnswer) => {
    // Cập nhật mảng các câu trả lời dựa vào state trước đó và thêm câu trả lời mới vào mảng
    setUserAnswers((prevUserAnswer) => {
      // thêm câu trả lời đã chọn vào sau mảng các câu trả lời đã chọn
      return [...prevUserAnswer, selectedAnswer];
    });
  }, []);

  // hàm xử lý skip câu trả lời bằng cách gọi hàm handleSelectAnswer và truyền vào null
  // sử dụng callBack để hàm handleSkipAnswer không bị tạo lại khi component re-render
  // trừ khi dependencies thay đổi
  const handleSkipAnswer = useCallback(() => {
    handleSelectAnswer(null);
  }, [handleSelectAnswer]);

  // Khi hết câu trả lời thì trả về màn hình hoàn thành
  if (quizIsComplete) {
    return <Summary userAnswers={userAnswers} />;
  }

  return (
    <div id="quiz">
      {/* comporent hiển thị câu hỏi, câu trả lời và thanh progress
      key: dùng để unmount component cũ và mount component mới giúp setTimeout và setInterval trong QuestionProgress hoạt động
      index: index của question hiện tại 
      onSelectAnswer: truyền hàm thêm câu trả lời vào mảng của state userAnswers
      onSkipAnswer: truyền hàm xử lý khi skip câu hỏi*/}
      <Question
        key={activeQuestionIndex}
        index={activeQuestionIndex}
        onSelectAnswer={handleSelectAnswer}
        onSkipAnswer={handleSkipAnswer}
      />
    </div>
  );
}
