// import hooks
import { useState } from "react";
// import dummy data
import QUESTIONS from "../questions.js";
// import assets
import quizCompleteImg from "../assets/quiz-complete.png";

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
  // biến để xử lý khi hết câu hỏi
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;
  // Hàm xử lý chọn câu trả lời
  function handleSelectAnswer(selectedAnswer) {
    // Cập nhật mảng các câu trả lời dựa vào state trước đó và thêm câu trả lời mới vào mảng
    setUserAnswers((prevUserAnswer) => {
      return [...prevUserAnswer, selectedAnswer];
    });
  }
  // Khi hết câu trả lời thì trả về màn hình hoàn thành
  if (quizIsComplete) {
    return (
      <div id="summary">
        <img src={quizCompleteImg} alt="Tropy Icon" />
        <h2>Quiz Completed!</h2>
      </div>
    );
  }

  // biến chứa các câu trả lời của câu hỏi hiện tại để thực hiện xáo trộn các câu trả lời
  // biến này đặt ở sau if block trên bởi vì
  // nếu trước khi thực hiện trả về màn hình hoàn thành mà vẫn cố truy cập vào index lớn hơn index lớn nhất trong mảng
  // thì sẽ lỗi
  //   tức là đoạn code này chỉ hoạt động khi ta vẫn còn câu hỏi để hiện
  const shuffledAnswer = [...QUESTIONS[activeQuestionIndex].answers];
  // thực xáo trộn các câu trả lời của câu hỏi hiện tại và trả về chính array đó
  // sort() cần 1 function trả về:
  // <0 => đổi thứ tự
  // >0 => giữ/đảo theo quy tắc sort
  // =0 => coi như bằng nhau
  // trong khi đó,
  // Math.random() sẽ trả về số thực ngẫu nhiên >=0 và <1
  // Math.random() - 0.5 sẽ trả về số thực ngẫu nhiên >=-0.5 và <0.5, tức là có thể âm, dương hoặc =0
  shuffledAnswer.sort(() => Math.random() - 0.5);

  return (
    <div id="quiz">
      <div id="question">
        {/* Hiển thị câu hỏi hiện tại */}
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        {/* Danh sách các câu trả lời */}
        <ul id="answers">
          {shuffledAnswer.map((answer) => (
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
