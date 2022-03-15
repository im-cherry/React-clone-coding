import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import * as client from "../lib/api";
import BoardRead from "../components/BoardRead";

const BoardReadContainer = ({ match, history }) => {
  // params 속성값 참조
  const { boardNo } = match.params;

  // 컴포넌트 상태 정의
  const [board, setBoard] = useState(null);
  const [isLoading, setLoading] = useState(false);

  // 게시글 상세 조회
  const readBoard = async (boardNo) => {
    setLoading(true);

    try {
      const response = await client.fetchBoard(boardNo);

      setBoard(response.data);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      throw e;
    }
  };

  // 마운트 될 때 게시글 상세 정보를 가져옴
  useEffect(() => {
    readBoard(boardNo);
  }, [boardNo]);

  // 삭제 처리 함수
  const onRemove = async () => {
    console.log("boardNo = " + boardNo);

    try {
      await client.removeBoard(boardNo);
      alert("삭제 되었습니다.");

      history.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <BoardRead
      boardNo={boardNo}
      board={board}
      isLoading={isLoading}
      onRemove={onRemove}
    />
  );
};

export default withRouter(BoardReadContainer);
