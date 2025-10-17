import React, { useReducer, useEffect } from "react";
import { Button, Container, Card, ProgressBar } from "react-bootstrap";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

// ------------------------
// 🔹 State khởi tạo
// ------------------------
const initialState = {
  questions: [
    {
      id: 1,
      question: "What is the capital of Australia?",
      options: ["Sydney", "Canberra", "Melbourne", "Perth"],
      answer: "Canberra",
    },
    {
      id: 2,
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      answer: "Mars",
    },
    {
      id: 3,
      question: "What is the largest ocean on Earth?",
      options: [
        "Atlantic Ocean",
        "Indian Ocean",
        "Pacific Ocean",
        "Arctic Ocean",
      ],
      answer: "Pacific Ocean",
    },
  ],
  currentQuestion: 0,
  selectedOption: "",
  score: 0,
  showScore: false,
  feedback: "", // ✅ thêm phản hồi
  timer: 10, // ✅ đồng hồ đếm ngược
};

// ------------------------
// 🔹 Reducer xử lý hành động
// ------------------------
function quizReducer(state, action) {
  switch (action.type) {
    case "SELECT_OPTION": {
      const currentQ = state.questions[state.currentQuestion];
      const isCorrect = action.payload === currentQ.answer;
      return {
        ...state,
        selectedOption: action.payload,
        feedback: isCorrect
          ? "Correct! 🎉"
          : `Incorrect! The correct answer is: ${currentQ.answer}`,
        score: isCorrect ? state.score + 1 : state.score,
      };
    }

    case "NEXT_QUESTION": {
      const isLast = state.currentQuestion + 1 === state.questions.length;
      return {
        ...state,
        currentQuestion: isLast
          ? state.currentQuestion
          : state.currentQuestion + 1,
        showScore: isLast,
        selectedOption: "",
        feedback: "",
        timer: 10,
      };
    }

    case "TICK_TIMER":
      return { ...state, timer: state.timer - 1 };

    case "TIME_UP": {
      const currentQ = state.questions[state.currentQuestion];
      return {
        ...state,
        feedback: `⏰ Time's up! The correct answer is: ${currentQ.answer}`,
        timer: 0,
      };
    }

    case "RESTART_QUIZ":
      return { ...initialState };

    default:
      return state;
  }
}

// ------------------------
// 🔹 Component chính
// ------------------------
function QuestionBank() {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const {
    questions,
    currentQuestion,
    selectedOption,
    score,
    showScore,
    feedback,
    timer,
  } = state;

  // Đồng hồ đếm ngược
  useEffect(() => {
    if (showScore) return;
    if (timer <= 0) {
      dispatch({ type: "TIME_UP" });
      setTimeout(() => dispatch({ type: "NEXT_QUESTION" }), 2000);
      return;
    }

    const countdown = setInterval(() => {
      dispatch({ type: "TICK_TIMER" });
    }, 1000);
    return () => clearInterval(countdown);
  }, [timer, showScore]);

  const handleOptionSelect = (option) => {
    if (!selectedOption && timer > 0) {
      dispatch({ type: "SELECT_OPTION", payload: option });
    }
  };

  const handleRestartQuiz = () => {
    dispatch({ type: "RESTART_QUIZ" });
  };

  const handleNextQuestion = () => {
    dispatch({ type: "NEXT_QUESTION" });
  };

  const progress = Math.round(((currentQuestion + 1) / questions.length) * 100);

  return (
    <Container className="mt-4">
      <Card className="p-4 shadow-sm">
        {showScore ? (
          <div className="text-center">
            <h2>
              ✅ Your Score: {score} / {questions.length}
            </h2>
            <Button variant="primary" onClick={handleRestartQuiz}>
              Restart Quiz
            </Button>
          </div>
        ) : (
          <div>
            {/* Tiến trình */}
            <div className="d-flex justify-content-between align-items-center mb-2">
              <strong>
                Question {currentQuestion + 1}/{questions.length}
              </strong>
              <span
                style={{
                  color: timer <= 5 ? "red" : "black",
                  fontWeight: "bold",
                }}
              >
                ⏱ {timer}s
              </span>
            </div>
            <ProgressBar
              now={progress}
              label={`${progress}%`}
              className="mb-3"
            />

            {/* Câu hỏi */}
            <h4 className="text-center">
              {questions[currentQuestion].question}
            </h4>

            {/* Lựa chọn */}
            <div className="d-flex flex-wrap justify-content-center mt-3">
              {questions[currentQuestion].options.map((option, index) => (
                <Button
                  key={index}
                  variant={
                    selectedOption === option ? "success" : "outline-secondary"
                  }
                  className="m-2 px-4"
                  onClick={() => handleOptionSelect(option)}
                  disabled={!!selectedOption || timer <= 0}
                >
                  {option}
                </Button>
              ))}
            </div>

            {/* Phản hồi */}
            {feedback && (
              <div className="mt-3 fw-bold text-center">
                {feedback.startsWith("Correct") ? (
                  <span className="text-success">
                    <FaCheckCircle className="me-2" />
                    {feedback}
                  </span>
                ) : (
                  <span className="text-danger">
                    <FaTimesCircle className="me-2" />
                    {feedback}
                  </span>
                )}
              </div>
            )}

            {/* Nút điều hướng */}
            <div className="text-center mt-3">
              <Button
                variant="primary"
                onClick={handleNextQuestion}
                disabled={!selectedOption && timer > 0}
              >
                {currentQuestion === questions.length - 1
                  ? "🏁 Finish Quiz"
                  : "Next Question"}
              </Button>
            </div>
          </div>
        )}
      </Card>
    </Container>
  );
}

export default QuestionBank;
