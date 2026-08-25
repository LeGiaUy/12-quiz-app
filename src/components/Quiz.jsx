// import hooks
import { useState } from "react";
// import dummy data
import QUESTIONS from "../questions.js";

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
  const activeQuestionIndex = userAnswers.length;
  // Hàm xử lý chọn câu trả lời
  function handleSelectAnswer(selectedAnswer) {
    // Cập nhật mảng các câu trả lời dựa vào state trước đó và thêm câu trả lời mới vào mảng
    setUserAnswers((prevUserAnswer) => {
      return [...prevUserAnswer, selectedAnswer];
    });
  }

  return (
    <div id="quiz">
      <div id="question">
        {/* Hiển thị câu hỏi hiện tại */}
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        {/* Danh sách các câu trả lời */}
        <ul id="answers">
          {QUESTIONS[activeQuestionIndex].answers.map((answer) => (
            <li key={answer} className="answer">
              <button onClick={() => handleSelectAnswer(answer)}>
                {answer}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
