import React from "react";

const ProgressLine = ({stage,handleStageClick}) => {
    const progressWidths = [12, 37, 62, 100];

  return (
    <div className="progress-container">
      <div
        className={`progress-circle ${stage >= 1 ? "active" : ""}`}
        onClick={() => handleStageClick(1)}
      >
        1
      </div>
      <div
        className={`progress-circle ${stage >= 2 ? "active" : ""}`}
        onClick={() => handleStageClick(2)}
      >
        2
      </div>
      <div
        className={`progress-circle ${stage >= 3 ? "active" : ""}`}
        onClick={() => handleStageClick(3)}
      >
        3
      </div>
      <div
        className={`progress-circle ${stage >= 4 ? "active" : ""}`}
        onClick={() => handleStageClick(4)}
      >
        4
      </div>
      <div
        className="progress-line"
        style={{
          width: `${progressWidths[stage - 1]}%`,
        }}
      ></div>
    </div>
  );
};

export default ProgressLine;
