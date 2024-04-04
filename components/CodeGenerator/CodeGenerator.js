import { Tooltip } from "react-tooltip";
import Image from "next/image";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useEffect, useRef, useState } from "react";
import sal from "sal.js";
import Prism from "prismjs";
import "prismjs/themes/prism-okaidia.css";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-css";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-bash";
import avatar from "../../public/images/team/avater.png";
import useClipboard from "./useClipboard";

const CodeGenerator = () => {
  const [message, setMessage] = useState("");
  const [arrowClicked, setArrowClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isChanging, setIsChanging] = useState(false);
  const [ServerCode, setServerCode] = useState([]);
  const codeBashRefSix = useRef(null);
  const { isCopied, handleCopy } = useClipboard();

  const handleArrowClick = () => {
    if (message.trim() === "") {
      toast.error("Please Enter Image Generation Query");
      return;
    }
    setArrowClicked(true);
    setLoading(true);
    toast.dismiss();

    const promise = new Promise((resolve, reject) => {
      fetch("http://localhost:8089/OpenAI/generate-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: message }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (Array.isArray(data.data)) {
            setServerCode((prevImageData) => [...prevImageData, ...data.data]);
          } else {
            setServerCode((prevImageData) => [...prevImageData, data.data]);
          }
          setMessage("");
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        })
        .finally(() => {
          setLoading(false);
          setIsChanging(true);
          setTimeout(() => {
            setIsChanging(false);
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
    setMessage(event.target.value);
  };

  useEffect(() => {
    sal();
    Prism.highlightAll();

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
      {ServerCode.length > 0 ? (
        <div className={`image-container${isChanging ? " changing" : ""}`}>
          {ServerCode.map((data, index) => (
            <div className="chat-box-list pt--30" id="chatContainer" key={index}>
              <div className="chat-box ai-speech bg-flashlight">
                <div className="inner top-flashlight leftside light-xl">
                  <div className="chat-section generate-details-section">
                    <div className="author">
                      <Image
                        className="w-100"
                        src={avatar}
                        width={40}
                        height={40}
                        alt="ChatenAI"
                      />
                    </div>
                    <div className="chat-content">
                      <h6 className="title mb--20">
                        Certainly! Here&apos;s an example of a simple 5-column table
                        using HTML, CSS, and JavaScript:
                      </h6>
                      <div className="highlight position-relative">
                        <button
                          className={`copy-to-clipboard-button copy-bash-six`}
                          onClick={() => handleCopy(codeBashRefSix)}
                        >
                          {isCopied ? "Copied" : "Copy"}
                        </button>
                        <pre
                          className="language-javascript"
                          tabIndex={0}
                          ref={codeBashRefSix}
                          style={{ backgroundColor: "#070710" }}
                        >
                          <code className="language-javascript" language="javascript">
                            {ServerCode[index].caption}
                          </code>
                        </pre>
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
                : "Send a message..."
            }
            disabled={arrowClicked || loading}
          ></textarea>
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
              <input
                type="file"
                className="input-file"
                name="myfile"
                multiple
              />
              <i className="feather-plus-circle"></i>
            </div>
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

export default CodeGenerator;
