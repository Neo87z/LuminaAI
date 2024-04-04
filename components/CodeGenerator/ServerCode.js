import React, { useRef } from "react";
import useClipboard from "@/context/useFetch";

const ServerCode = () => {
  const codeBashRefSix = useRef(null);

  const { isCopied } = useClipboard([
    { buttonClass: ".copy-bash-six", contentRef: codeBashRefSix },
  ]);

  const serverCodeString = `javascript
  const questions = [
    {
      question: "What is the capital of France?",
      options: ["Paris", "London", "Berlin", "Rome"],
      answer: "Paris"
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Jupiter", "Mars", "Saturn", "Neptune"],
      answer: "Mars"
    },
    {
      question: "What is the largest mammal on Earth?",
      options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
      answer: "Blue Whale"
    }
  ];
  
  let score = 0;
  
  function startGame() {
    for (let i = 0; i < questions.length; i++) {
      let userAnswer = prompt(questions[i].question + "\n" + questions[i].options.join("\n"));
  
      if (userAnswer === questions[i].answer) {
        score++;
        alert("Correct!");
      } else {
        alert("Wrong! The correct answer is: " + questions[i].answer);
      }
    }
  
    alert("Game Over! Your final score is: " + score);
  }
  
  startGame();
`;

  return (
    <>
      <div className="highlight position-relative">
        {isCopied ? (
          <button className="copy-to-clipboard-button copy-bash-six">
            Copied
          </button>
        ) : (
          <button className="copy-to-clipboard-button copy-bash-six">
            Copy
          </button>
        )}
        <pre
          className="language-javascript"
          tabIndex={0}
          ref={codeBashRefSix}
          style={{ backgroundColor: "#070710" }}
        >
          <code className="language-javascript" language="javascript">
            {serverCodeString}
          </code>
        </pre>
      </div>
    </>
  );
};

export default ServerCode;
