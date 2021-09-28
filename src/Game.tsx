import React, { useEffect } from "react";

import Game from "./class/Game";

const GameBootstrap = () => {
  useEffect(() => {
    new Game();
  }, []);
  return null;
};

export default GameBootstrap;
