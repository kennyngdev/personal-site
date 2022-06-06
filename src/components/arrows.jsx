import React, { useState, useEffect, useRef } from "react";
function Arrows({ switchDirection }) {
  return (
    <div className="arrows">
      <ul>
        <li onClick={() => switchDirection("UP")}>&#8593;</li>
        <li onClick={() => switchDirection("LEFT")}>&#8592;</li>
        <li onClick={() => switchDirection("BOTTOM")}>&#8595;</li>
        <li onClick={() => switchDirection("RIGHT")}>&#8594;</li>
      </ul>
    </div>
  );
}

export default Arrows;
