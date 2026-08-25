// import assets
import logoImg from ".././assets/quiz-logo.png";

export default function Header() {
  return (
    <header>
      {/* Hiển thị logo */}
      <img src={logoImg} alt="Quiz Logo" />
      {/* Hiển thị title */}
      <h1>React Quiz</h1>
    </header>
  );
}
