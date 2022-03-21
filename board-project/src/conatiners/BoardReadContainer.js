import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import * as client from "../lib/api";
import BoardRead from "../components/BoardRead";

const BoardReadContainer = ({ match, history }) => {
  // 파라미터 속성값 참조
  const { boardNo } = match.params;

  // 상태 정의
  const [board, setBoard] = useState([]);
  const [isLoading, setLoading] = useState(null);

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

  useEffect(() => {
    readBoard(boardNo);
  }, [boardNo]);

  // 삭제 처리 함수
  const onRemove = async () => {
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
