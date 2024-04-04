import React, { useEffect, useRef, useState } from "react";
import useClipboard from "@/context/useFetch";

const HtmlCode = () => {
  const codeRef = useRef(null);
  const cssCodeRef = useRef(null);
  const jsCodeRef = useRef(null);

  const { isCopied } = useClipboard([
    { buttonClass: ".copy-html", contentRef: codeRef },
    { buttonClass: ".copy-css", contentRef: cssCodeRef },
    { buttonClass: ".copy-js", contentRef: jsCodeRef },
  ]);

  const htmlCodeString = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="styles.css">
        <title>5 Column Table</title>
    </head>
    <body>
        <div class="table-container">
            <table id="data-table">
                <thead>
                    <tr>
                        <th>Column 1</th>
                        <th>Column 2</th>
                        <th>Column 3</th>
                        <th>Column 4</th>
                        <th>Column 5</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Table content goes here -->
                </tbody>
            </table>
        </div>
        <script src="script.js"></script>
    </body>
    </html>
  `;

  const cssCodeString = `
body {
    font-family: Arial, sans-serif;
}

.table-container {
    margin: 20px;
    overflow-x: auto;
}

#data-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

#data-table th, #data-table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
}

#data-table th {
    background-color: #f2f2f2;
}`;

  const jsCodeString = `javascript
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
  `

  return (
    <>
      <article className="documentation_body shortcode_text mb--20">
        <p id="from-an-html-element" className="c_head load-order-2">
          HTML Code Blocks
        </p>
        <div className="highlight position-relative">
          {isCopied ? (
            <button className="copy-to-clipboard-button copy-html">
              Copied
            </button>
          ) : (
            <button className="copy-to-clipboard-button copy-html">Copy</button>
          )}
          <pre
            className="language-html"
            tabIndex={0}
            ref={codeRef}
            style={{ backgroundColor: "#070710" }}
          >
            <code className="language-html" language="markup">
              {htmlCodeString}
            </code>
          </pre>
        </div>

        <p id="css-code" className="c_head load-order-2">
          CSS Source Code
        </p>
        <div className="highlight position-relative">
          {isCopied ? (
            <button className="copy-to-clipboard-button copy-css">
              Copied
            </button>
          ) : (
            <button className="copy-to-clipboard-button copy-css">Copy</button>
          )}
          <pre
            className="language-javascript"
            tabIndex={0}
            ref={cssCodeRef}
            style={{ backgroundColor: "#070710" }}
          >
            <code className="language-javascript" language="css">
              {cssCodeString}
            </code>
          </pre>
        </div>

        <p id="css-code" className="c_head load-order-2">
          JavaScript Source Code
        </p>
        <div className="highlight position-relative">
          {isCopied ? (
            <button className="copy-to-clipboard-button copy-js">Copied</button>
          ) : (
            <button className="copy-to-clipboard-button copy-js">Copy</button>
          )}
          <pre
            className="language-javascript"
            tabIndex={0}
            ref={jsCodeRef}
            style={{ backgroundColor: "#070710" }}
          >
            <code className="language-javascript" language="javascript">
              {jsCodeString}
            </code>
          </pre>
        </div>
      </article>
    </>
  );
};

export default HtmlCode;
