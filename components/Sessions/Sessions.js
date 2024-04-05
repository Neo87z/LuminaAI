import React from "react";
import Image from "next/image";

import UserNav from "../Common/UserNav";

import SessionData from "../../data/dashboard.json";

const Sessions = () => {
  return (
    <>
      <div className="rbt-main-content mr--0 mb--0">
        <div className="rbt-daynamic-page-content center-width">
          <div className="rbt-dashboard-content">
            <UserNav title="Sessoins" />
            
          </div>
        </div>
      </div>
    </>
  );
};

export default Sessions;
