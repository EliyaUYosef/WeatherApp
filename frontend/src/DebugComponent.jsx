import React from "react";

const DebugComponent = ({ object }) => {
  return (
    <pre className="debug_component">{JSON.stringify(object, null, 2)}</pre>
  );
};

export default DebugComponent;
