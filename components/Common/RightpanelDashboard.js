import React, { useState } from "react";

import RightPanelData from "../../data/dashboard.json";
import SingleRightPanel from "./Props/SingleRightPanel";
import { useAppContext } from "@/context/Context";

const RightpanelDashboard = () => {
  const { shouldCollapseRightbar } = useAppContext();
  const [sectionStates, setSectionStates] = useState({
    previous: true,
    yesterday: true,
    older: true,
  });

  const toggleSection = (section) => {
    setSectionStates((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };
  return (
    <>
      <div
        className={`rbt-right-side-panel popup-dashboardright-section ${
          shouldCollapseRightbar ? "collapsed" : ""
        }`}
      >
        <div className="right-side-top">
          <a
            className="btn-default bg-solid-primary"
            data-bs-toggle="modal"
            data-bs-target="#newchatModal"
          >
            <span className="icon">
              <i className="feather-plus-circle"></i>
            </span>
            <span>New Chat</span>
          </a>
        </div>
       
      </div>
    </>
  );
};

export default RightpanelDashboard;
