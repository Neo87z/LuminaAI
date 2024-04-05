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
  const [message, setMessage] = useState("");
  const [imageData, setImageData] = useState([]);
  const [arrowClicked, setArrowClicked] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state
  const [isChanging, setIsChanging] = useState(false); // Add state to track image division change
  const [selectedOption, setSelectedOption] = useState("Blog Post");

  // Function to handle the selection change
  const handleOptionChange = (option) => {
    setSelectedOption(option);
    // Update the message placeholder dynamically

  };

  // Placeholder text based on the selected option


  const handleArrowClick = () => {
    if (message.trim() === "") {
      toast.error("Please Enter Image Generation Query");
      return;
    }
    setArrowClicked(true);
    setLoading(true); // Set loading to true when arrow is clicked

    toast.dismiss();

    const promise = new Promise((resolve, reject) => {
      fetch("https://luminaaibackend-97ca5384e45f.herokuapp.com/OpenAI/AI-Asistant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: message, selectionData: selectedOption }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (Array.isArray(data.data)) {
            setImageData((prevImageData) => [...prevImageData, ...data.data]);
          } else {
            setImageData((prevImageData) => [...prevImageData, data.data]);
          }

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

    // Otherwise, update the message state with the typed text
    setMessage(event.target.value);

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
          <div className="chat-box bg-flashlight">
            {imageData.map((data, index) => (
              <div key={index} className="chat-section generate-details-section">
                <div className="chat-content">
                  <h6 className="title">
                    <span className="rainbow-badge-card">User</span>
                  </h6>
                  <div className="image-caption mb--20">
                    <h6 className="caption-title ">
                      {data.title}
                    </h6>
                  </div>
                </div>
                <div className="chat-content">
                  <h6 className="title">
                    <span className="rainbow-badge-card">Lumina AI</span>
                  </h6>
                  <div className="image-caption mb--20" style={{ marginLeft: '50px' }}>
                    <h6 className="caption-title ">
                      {data.caption}
                    </h6>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div style={{ maxWidth: "50%", height: "auto", margin: "0 auto" }}>
          <br /> <br /> <br />
          <ToastContainer
            position="top-right"
            autoClose={false}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={true}
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
                : 'Ask Me Anything'
            }
            disabled={arrowClicked || loading}
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
        <p className="b3 small-text">
          ChatenAi can make mistakes. Consider checking important information.
        </p>
      </div>
    </>
  );
};

export default ImageGenerator;
