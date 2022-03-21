import React from "react";
import { withRouter } from "react-router-dom";
import * as client from "../lib/api";
import BoardRegister from "../components/BoardRegister";

const BoardRegisterContainer = ({ history }) => {
  // 게시글 등록
  const onRegister = async (title, content, writer) => {
    try {
      const response = await client.registerBoard(title, content, writer);

      alert("등록되었습니다.");
      history.push("/read/" + response.data.boardNo);
    } catch (e) {
      console.log(e);
    }
  };

  return <BoardRegister onRegister={onRegister} />;
};

export default withRouter(BoardRegisterContainer);
