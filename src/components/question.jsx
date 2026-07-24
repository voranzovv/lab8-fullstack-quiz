import { useEffect, useState } from "react";

function Question() {
  const [category, setCategory] = useState(null);
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const getQuestion = async () => {
      try {
        const response = await fetch(
          "https://opentdb.com/api.php?amount=1&type=boolean",
        );

        const data = await response.json();

        const quiz = data.results[0];

        setCategory(quiz.category);
        setQuestion(quiz.question);
        setAnswer(quiz.correct_answer);
      } catch (error) {
        console.log("Error fetching question:", error);
      }
    };

    getQuestion();
  }, []);

  function revealAnswer() {
    setRevealed(true);
  }

  if (!question) {
    return (
      <div className="container text-center mt-5">
        <div className="spinner-border "></div>
        <p className="mt-3 text-muted">Loading question...</p>
      </div>
    );
  }

  return (
    <main className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-lg  ">
            <div className="card-header bg-primary text-white text-center ">
              <h5
                className="mb-0"
                dangerouslySetInnerHTML={{ __html: category }}
              ></h5>
            </div>

            <div className="card-body p-4">
              <h4 className="card-title mb-4">Trivia Question</h4>

              <p
                className="fs-5 text-secondary"
                dangerouslySetInnerHTML={{ __html: question }}
              ></p>

              <div className="text-center mt-4">
                <button
                  type="button"
                  className="btn btn-primary btn-lg px-5 "
                  onClick={revealAnswer}
                >
                  Reveal Answer
                </button>
              </div>

              {revealed && (
                <div className="alert alert-success text-center mt-4 mb-0 ">
                  <strong>Correct Answer:</strong> {answer}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Question;
