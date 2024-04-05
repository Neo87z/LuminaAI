import React, { useEffect } from "react";
import sal from "sal.js";

import BannerArea from "./BannerArea";

import Form from "@/pages/Form";
import Items from "./items";

const Dashboard = () => {
  useEffect(() => {
    sal();
  }, []);
  return (
    <>
      <div className="rbt-main-content mr--0">
        <div className="rbt-daynamic-page-content">
          <div className="rbt-dashboard-content">
            
            <div className="content-page">
              <div className="chat-box-list">
                
                <div className="rainbow-generartor-section rainbow-section-gap">
                  <div
                    className="section-title text-center sal-animate"
                    data-sal="slide-up"
                    data-sal-duration="700"
                    data-sal-delay="100"
                  >
                    <h4 className="subtitle ">
                      <span className="theme-gradient">ChaetenAssI</span>
                    </h4>
                    <h2 className="title w-600 mb--20">
                      Unleashing the Power of ChatAI
                    </h2>
                    <p className="description b1">
                      We provide Mastering the Art of ChatAI generate your text{" "}
                      <br />
                      Pioneering Conversations with AI.
                    </p>
                  </div>
                  <div className="genarator-section">
                    <ul className="genarator-card-group">
                      <Items />
                    </ul>
                  </div>
                </div>
              </div>
            </div>

          
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
