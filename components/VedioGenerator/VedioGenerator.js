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
  const [message, setMessage] = useState("Write A Song About");
  const [imageData, setImageData] = useState([]);
  const [arrowClicked, setArrowClicked] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state
  const [isChanging, setIsChanging] = useState(false); // Add state to track image division change
  const [selectedOption, setSelectedOption] = useState("Blog Post");

  // Function to handle the selection change
  const handleOptionChange = (option) => {
    setSelectedOption(option);
    // Update the message placeholder dynamically
    setMessage(`Write A Song About `);
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
      fetch("https://luminaaibackend-97ca5384e45f.herokuapp.com/OpenAI/lyrics", {
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
          setMessage(`Write A Song About `);
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
        pending: "Generating Lyrics",
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


            <div className="chat-box-list " id="chatContainer" >
              <div className="chat-box  bg-flashlight">

                <div
                  className="inner  leftside light-xl"

                >
                  <div className="chat-section generate-details-section">
                   
                    <div className="chat-content">

                      <h6 className="title">
                         <span className="rainbow-badge-card">User</span>
                      </h6>
                      <div className="image-caption mb--20">
                        <h6  className="caption-title">

                          {data.title}
                        </h6>
                      </div>


                    </div>
                  </div>
                </div>

              </div>
              <div className="chat-box-list pt--30" id="chatContainer" style={{ transform: 'translateY(-30px)' }}>


                <div className="chat-box ai-speech bg-flashlight">

                  <div
                    className="inner top-flashlight leftside light-xl"

                  >
                    <div className="chat-section">
                      
                      <div className="chat-content" >
                       <center>
                        <b> <p className="mb--20">Verse 1</p></b>
                        <p className="mb--20">{data.Verse1Part1}<br></br> {data.Verse1Part2}<br></br>{data.Verse1Part3}<br></br> {data.Verse1Part4}</p>
                        <p className="mb--20">Verse 2</p>
                        <p className="mb--20">{data.Verse2Part41}<br></br> {data.Verse2Part2}<br></br>{data.Verse2Part3}<br></br> {data.Verse2Part45}</p>
                        <p className="mb--20">Verse 3</p>
                        <p className="mb--20">{data.Verse3Part42}<br></br> {data.Verse3Part41}<br></br>{data.Verse3Part43}<br></br> {data.Verse3Part44}</p></center>
                        <Reaction />
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

      <div className="rbt-static-bar">
        <Tooltip id="my-tooltip" className="custom-tooltip tooltip-inner" />
        <form className="new-chat-form border-gradient">
          <textarea
            onChange={handleMessageChange}
            value={message}
            rows="1"
            placeholder={
              loading
                ? "Lumni AI is Generating The Lyrics"
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

        <p className="b3 small-text">
          ChatenAi can make mistakes. Consider checking important information.
        </p>
      </div>
    </>
  );
};

export default ImageGenerator;
