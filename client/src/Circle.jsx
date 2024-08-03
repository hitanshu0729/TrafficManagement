import React from "react";

const Circle = ({ color }) => {
  const circleStyle = {
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    backgroundColor: color,
    display: "inline-block",
  };

  return <div style={circleStyle}></div>;
};

export default Circle;
