import React, { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";

function BoardModify({ board, isLoading, onModify }) {
  // 컴포넌트 상태 설정
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // 함수
  const handleChangeTitle = useCallback((e) => {
    setTitle(e.target.value);
  }, []);

  const handleChangeContent = useCallback((e) => {
    setContent(e.target.value);
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      onModify(board.boardNo, title, content);
    },
    [title, content]
  );

  useEffect(() => {
    if (board) {
      setTitle(board.title);
      setContent(board.content);
    }
  }, [board]);

  // 마운트 될 때 게시글 상세 정보를 가져옴
  return (
    <div align="center">
      <h2>게시판 수정</h2>
      {isLoading && "로딩중..."}
      {!isLoading && (
        <>
          <form onSubmit={handleSubmit}>
            <table>
              <tbody>
                <tr>
                  <td>번호</td>
                  <td>
                    <input type="text" value={board.boardNo} disabled />
                  </td>
                </tr>
                <tr>
                  <td>등록일시</td>
                  <td>
                    <input type="text" value={board.regDate} disabled />
                  </td>
                </tr>
                <tr>
                  <td>제목</td>
                  <td>
                    <input
                      type="text"
                      value={title}
                      onChange={handleChangeTitle}
                    />
                  </td>
                </tr>
                <tr>
                  <td>작성자</td>
                  <td>
                    <input type="text" value={board.writer} disabled />
                  </td>
                </tr>
                <tr>
                  <td>내용</td>
                  <td>
                    <textarea
                      value={content}
                      rows="5"
                      onChange={handleChangeContent}
                    ></textarea>
                  </td>
                </tr>
              </tbody>

              <div>
                <button type="submit">수정</button>
                <Link to={`/read/${board.boardNo}`}>취소</Link>
              </div>
            </table>
          </form>
        </>
      )}
    </div>
  );
}

export default BoardModify;
