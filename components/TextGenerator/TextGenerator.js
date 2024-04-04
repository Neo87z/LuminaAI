import React, { useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";
import sal from "sal.js";
import Image from "next/image";
import ClipLoader from "react-spinners/ClipLoader";
import TextGeneratorData from "../../data/ImageData.json";
import Reaction from "../Common/Reaction";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ImageGenerator = () => {
  const [message, setMessage] = useState("Generate Content About Blog Post on");
  const [imageData, setImageData] = useState([]);
  const [arrowClicked, setArrowClicked] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state
  const [isChanging, setIsChanging] = useState(false); // Add state to track image division change
  const [selectedOption, setSelectedOption] = useState("Blog Post");

  // Function to handle the selection change
  const handleOptionChange = (option) => {
    setSelectedOption(option);
    // Update the message placeholder dynamically
    setMessage(`Generate Content About ${option} on`);
  };

  // Placeholder text based on the selected option
  let placeholderText = `Generate Content About ${selectedOption} on`;

  const handleArrowClick = () => {
    if (message.trim() === "" || message === placeholderText) {
      toast.error("Please Enter Image Generation Query");
      return;
    }
    setArrowClicked(true);
    setLoading(true); // Set loading to true when arrow is clicked

    toast.dismiss();

    const promise = new Promise((resolve, reject) => {
      fetch("http://localhost:8089/OpenAI/generate-text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: message , selectionData:selectedOption }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (Array.isArray(data.data)) {
            setImageData((prevImageData) => [...prevImageData, ...data.data]);
          } else {
            setImageData((prevImageData) => [...prevImageData, data.data]);
          }
          setMessage(`Generate Content About ${selectedOption} on`);
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        })
        .finally(() => {
          setLoading(false); // Set loading to false when data is received
          setIsChanging(true); // Set isChanging to true to trigger transition effect
          setTimeout(() => {
            setIsChanging(false); // Reset isChanging after a short delay to allow the transition effect
          }, 500);
        });
    });

    toast.promise(
      promise,
      {
        pending: "Generating Image",
        success: {
          render: ({ data }) => {
            setTimeout(toast.dismiss, 20000);
            return `Data fetched successfully! ${data}`;
          },
        },
        error: "Failed to fetch data",
      }
    );
  };

  const handleVoiceSearch = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setMessage(transcript);
    };

    recognition.start();
  };

  const handleMessageChange = (event) => {
    // Check if the placeholder text exists in the beginning of the message
    if (event.target.value.startsWith(placeholderText)) {
      // If so, update the message state to include the typed text after the placeholder
      setMessage(placeholderText + event.target.value.slice(placeholderText.length));
    } else if (event.target.value === "") {
      // If the message is empty, reset the state to only contain the placeholder
      setMessage(placeholderText);
    } else {
      // Otherwise, update the message state with the typed text
      setMessage(event.target.value);
    }
  };

  useEffect(() => {
    sal();

    const cards = document.querySelectorAll(".bg-flashlight");

    cards.forEach((bgflashlight) => {
      bgflashlight.onmousemove = function (e) {
        let x = e.pageX - bgflashlight.offsetLeft;
        let y = e.pageY - bgflashlight.offsetTop;

        bgflashlight.style.setProperty("--x", x + "px");
        bgflashlight.style.setProperty("--y", y + "px");
      };
    });
  }, []);

  useEffect(() => {
    if (arrowClicked) {
      setMessage("");
      setArrowClicked(false);
    }
  }, [arrowClicked]);

  return (
    <>
      <br />
      {imageData.length > 0 ? (
        <div className={`image-container${isChanging ? " changing" : ""}`}>
          {imageData.map((data, index) => (

            <div className="chat-box-list pt--30" id="chatContainer" key={index}>
              <div className="chat-box ai-speech bg-flashlight">
                <div className="inner top-flashlight leftside light-xl" key={index}>

                  <div className="chat-section generate-details-section">

                    <div className="chat-content">
                      <h6 className="title mb--20">{data.title}</h6>
                      <div className="image-caption mb--20">
                        <h5 className="caption-title theme-gradient">{data.caption}</h5>
                      </div>



                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ maxWidth: "50%", height: "auto", margin: "0 auto" }}>
          <br /> <br /> <br />

          <ToastContainer
            position="top-right"
            autoClose={false} // Disable auto close
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={true} // Close on click
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
          <Image
            className="w-100 radius"
            src="https://i.ibb.co/T4bPk2s/ai-personal-assistant.png"
            layout="responsive"
            width={1000}
            height={1380}
            alt="Sample Image"
          />
        </div>
      )}

      <div className="rbt-static-bar" style={{ transform: "translateX(-12.5%)" }}>
        <Tooltip id="my-tooltip" className="custom-tooltip tooltip-inner" />
        <form className="new-chat-form border-gradient">
          <textarea
            onChange={handleMessageChange}
            value={message}
            rows="1"
            placeholder={
              loading
                ? "Lumni AI is Generating The Image"
                : placeholderText
            } // Dynamically set placeholder based on loading state and selected option
            disabled={arrowClicked || loading} // Disable textarea when arrow is clicked or when loading is true
          ></textarea>
          <div className="left-icons">
            <div title="ChatenAI" className="form-icon icon-gpt">
              <i className="feather-aperture"></i>
            </div>
          </div>
          <div className="right-icons">
            
            <a
              className="form-icon icon-mic"
              data-tooltip-id="my-tooltip"
              data-tooltip-content="Voice Search"
              onClick={handleVoiceSearch}
            >
              <i className="feather-mic"></i>
            </a>
            <a
              className="form-icon icon-send"
              data-tooltip-id="my-tooltip"
              data-tooltip-content="Send message"
              onClick={handleArrowClick}
            >
              <i className="feather-send"></i>
            </a>
          </div>
        </form>
        <div className="reaction-section">
          <div className="btn-grp">
            <div className="left-side-btn dropup">


              <button
                type="button"
                className="react-btn btn-default btn-small btn-border dropdown-toggle me-2"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="feather-more-vertical"></i>
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#" onClick={() => handleOptionChange("Blog Post")}>
                    <i className="feather-file-text"></i> Blog Post
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#" onClick={() => handleOptionChange("Social Media Post")}>
                    <i className="feather-file-text"></i> Social Media Post
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#" onClick={() => handleOptionChange("Outline")}>
                    <i className="feather-file-text"></i> Outline
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#" onClick={() => handleOptionChange("Press Release")}>
                    <i className="feather-file-text"></i> Press Release
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#" onClick={() => handleOptionChange("Creative Stroy")}>
                    <i className="feather-file-text"></i> Creative Stroy
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#" onClick={() => handleOptionChange("Essay")}>
                    <i className="feather-file-text"></i> Essay
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#" onClick={() => handleOptionChange("To-Do List")}>
                    <i className="feather-file-text"></i> To-Do List
                  </a>
                </li>
                {/* Include other options here */}
              </ul>
            </div>

          </div>
        </div>
        <p className="b3 small-text">
          ChatenAi can make mistakes. Consider checking important information.
        </p>
      </div>
    </>
  );
};

export default ImageGenerator;
