import React from "react";
import { Route } from "react-router-dom";

import BoardListContainer from "./conatiners/BoardListContainer";
import BoardRegisterContainer from "./conatiners/BoardRegisterContainer";
import BoardReadContainer from "./conatiners/BoardReadContainer";
import BoardModifyContainer from "./conatiners/BoardModifyContainer";

function App() {
  return (
    <>
      <Route component={BoardListContainer} path="/" exact />
      <Route component={BoardRegisterContainer} path="/create" />
      <Route component={BoardReadContainer} path="/read/:boardNo" />
      <Route component={BoardModifyContainer} path="/edit/:boardNo" />
    </>
  );
}

export default App;
