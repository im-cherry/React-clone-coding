import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import * as client from "../lib/api";
import BoardModify from "../components/BoardModify";

const BoardModifyContainer = ({ match, history }) => {
  // params 속성 값 참고
  const { boardNo } = match.params;

  // 컴포넌트 상태 선언
  const [board, setBoard] = useState([]);
  const [isLoading, setLoading] = useState(null);

  // 수정 처리 함수
  const onModify = async (boardNo, title, content) => {
    try {
      await client.modifyBoard(boardNo, title, content);
      alert("수정되었습니다.");
      console.log(boardNo);
      history.push("/read/" + boardNo);
    } catch (e) {
      console.log(e);
    }
  };

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

  // 마운트될 때 게시글 상세정보를 가져옴
  useEffect(() => {
    readBoard(boardNo);
  }, [boardNo]);

  return (
    <BoardModify board={board} isLoading={isLoading} onModify={onModify} />
  );
};

export default withRouter(BoardModifyContainer);
