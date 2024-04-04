import React, { useState } from "react";
import { Tooltip } from "react-tooltip";
const Form = () => {

  const [message, setMessage] = useState("");
  const [imageData, setImageData] = useState(null);
  const handleArrowClick = () => {
    console.log(message)
    // Perform your POST request here
    fetch('http://localhost:8089/OpenAI', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add any other headers if needed
      },
      body: JSON.stringify({ prompt: message }),
    })
      .then(response => response.json()) // Parse response JSON
      .then(data => {
        // Access imageGeneration data from the response
        console.log(data.data); // Assuming 'data.data' holds the imageGeneration data
        

      })
      .catch(error => {
        // Handle error here
      });
  };
  const handleMessageChange = (event) => {
    // Update the message state when the textarea value changes
    setMessage(event.target.value);
  };

  return (
    <>
      <Tooltip id="my-tooltip" className="custom-tooltip tooltip-inner" />
      <form className="new-chat-form border-gradient">
        <textarea onChange={handleMessageChange} alue={message} rows="1" placeholder="Send a message..."></textarea>
        <div className="left-icons">
          <div title="ChatenAI" className="form-icon icon-gpt">
            <i className="feather-aperture"></i>
          </div>
        </div>
        <div className="right-icons">
          <div
            className="form-icon icon-plus"
            data-tooltip-id="my-tooltip"
            data-tooltip-content="Choose File"
          >
            <input type="file" className="input-file" name="myfile" multiple />
            <i className="feather-plus-circle"></i>
          </div>
          <a
            className="form-icon icon-mic"
            data-tooltip-id="my-tooltip"
            data-tooltip-content="Voice Search"
          >
            <i className="feather-mic"></i>
          </a>
          <a
            className="form-icon icon-send"
            data-tooltip-id="my-tooltip"
            data-tooltip-content="Send message"
            onClick={handleArrowClick} // Attach the event handler here
          >
            <i className="feather-send"></i>
          </a>
        </div>
      </form>
    </>
  );
};

export default Form;
