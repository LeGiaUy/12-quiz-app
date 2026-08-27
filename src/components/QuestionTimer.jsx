// import hooks
import { useState, useEffect } from "react";

// component thanh để hiện thanh progress
// nếu không chọn câu trả lời sau {timeout} mili giây thì gọi hàm onTimeout
export default function QuestionTimer({ timeout, onTimeout, mode }) {
  // state quản lý thời gian còn lại để update thanh progress
  const [remainingTime, setRemainingTime] = useState(timeout);

  // side effect xử lý sau khoảng thời gian "timeout" mili giây thì onTimeout sẽ được gọi để chuyển câu hỏi
  // useEffect sẽ không chạy lại bởi vì timeout không thay đổi và onTimeout đã được bọc trong callBack
  // nếu useEffect này được chạy lại thì là do component cha đã thêm prop key={} cho component này
  useEffect(() => {
    console.log("SETTING TIMEOUT");
    const timer = setTimeout(onTimeout, timeout);

    // hàm cleaner để xóa timeout cũ khi useEffect được chạy lại
    return () => {
      clearTimeout(timer);
    };
  }, [timeout, onTimeout]);

  // side effect xử lý việc trừ thời gian của remainingTime
  // sau mỗi 100ms thì giảm 100ms
  useEffect(() => {
    console.log("SETTING INTERVAL");
    const interval = setInterval(() => {
      // đảm bảo remainingTime luôn là giá trị mới nhất nên không cần dependencies
      setRemainingTime((prevRemainingTime) => prevRemainingTime - 100);
    }, 100);

    // hàm cleaner để xóa interval cũ khi useEffect được chạy lại
    return () => {
      clearInterval(interval);
    };
  }, []);

  // thanh progress
  return (
    <progress
      id="question-time"
      max={timeout}
      value={remainingTime}
      className={mode}
    />
  );
}
