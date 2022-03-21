import React, { useEffect, useState } from "react";
import * as client from "../lib/api";
import BoardList from "../components/BoardList";

const BoardListContainer = () => {
  // 상태 선언
  const [boards, setBoards] = useState("");
  const [isLoading, setLoading] = useState(null);

  // 게시글 목록 조회
  const listBoard = async () => {
    setLoading(true);
    try {
      const response = await client.fetchBoardList();

      setBoards(response.data);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      throw e;
    }
  };

  useEffect(() => {
    listBoard();
  }, []);

  return <BoardList boards={boards} isLoading={isLoading} />;
};

export default BoardListContainer;
