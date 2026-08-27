import { useRef } from "react";

export default function Answers({
  answers,
  selectedAnswer,
  answerState,
  onSelect,
}) {
  const shuffledAnswers = useRef();

  if (!shuffledAnswers.current) {
    // biến chứa các câu trả lời của câu hỏi hiện tại để thực hiện xáo trộn các câu trả lời
    // biến này đặt ở sau if block trên bởi vì
    // nếu trước khi thực hiện trả về màn hình hoàn thành mà vẫn cố truy cập vào index lớn hơn index lớn nhất trong mảng
    // thì sẽ lỗi
    //   tức là đoạn code này chỉ hoạt động khi ta vẫn còn câu hỏi để hiện
    shuffledAnswers.current = [...answers];

    // thực hiện xáo trộn các câu trả lời của câu hỏi hiện tại và trả về chính array đó
    // sort() cần 1 function trả về:
    // <0 => đổi thứ tự
    // >0 => giữ/đảo theo quy tắc sort
    // =0 => coi như bằng nhau
    // trong khi đó,
    // Math.random() sẽ trả về số thực ngẫu nhiên >=0 và <1
    // Math.random() - 0.5 sẽ trả về số thực ngẫu nhiên >=-0.5 và <0.5, tức là có thể âm, dương hoặc =0
    shuffledAnswers.current.sort(() => Math.random() - 0.5);
  }

  return (
    <ul id="answers">
      {shuffledAnswers.current.map((answer) => {
        // xem câu trả lời này có phải là câu trả lời mà người dùng chọn không
        const isSelected = selectedAnswer === answer;
        let cssClass = "";

        // nếu câu người dùng đã chọn câu trả lời và câu trả lời này là câu được người dùng chọn thì thay đổi className
        if (answerState === "answered" && isSelected) {
          cssClass = "selected";
        }

        // Nếu câu trả là sai hoặc đúng và đây là câu trả lời mà người dùng chọn thì thay đổi className
        if (
          (answerState === "correct" || answerState === "wrong") &&
          isSelected
        ) {
          cssClass = answerState;
        }

        return (
          <li key={answer} className="answer">
            <button onClick={() => onSelect(answer)} className={cssClass}>
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
