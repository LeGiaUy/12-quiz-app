// import components
import Header from "./components/Header.jsx";
import Quiz from "./components/Quiz.jsx";

function App() {
  return (
    <>
      {/* Header */}
      <Header />
      {/* Hiển thị câu hỏi và câu trả lời */}
      <main>
        <Quiz />
      </main>
    </>
  );
}

export default App;
