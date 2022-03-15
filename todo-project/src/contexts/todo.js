import React, { createContext, useState, useCallback, useRef } from "react";

// createContext : 전역 데이터를 담고 있는 하나의 저장 공간
const TodoContext = createContext({
  state: {
    todos: [],
    input: "",
  },
  actions: {
    setTodos: () => {},
    setInput: () => {},
    onInsert: () => {},
    onRemove: () => {},
    onToggle: () => {},
    onClearAll: () => {},
    onChange: () => {},
    onSubmit: () => {},
  },
});

const TodoProvider = ({ children }) => {
  // 상태 정의
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const nextId = useRef(1);

  // 함수 정의
  const onInsert = useCallback((text) => {
    const todo = {
      id: nextId.current,
      text,
      done: false,
    };

    setTodos((todos) => todos.concat(todo));
    nextId.current += 1;
  }, []);

  const onRemove = useCallback((id) => {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  }, []);

  const onToggle = useCallback((id) => {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  }, []);

  const onClearAll = useCallback(() => {
    setTodos(() => []);
  }, []);

  const onChange = useCallback((e) => {
    setInput(e.target.value);
  }, []);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      onInsert(input);
      setInput("");
    },
    [onInsert, input]
  );

  // 상태와 함수를 묶어 value 객체 생성
  const value = {
    state: { todos, input },
    actions: {
      setTodos,
      setInput,
      onInsert,
      onRemove,
      onToggle,
      onClearAll,
      onChange,
      onSubmit,
    },
  };

  // Provider 컴포넌트를 통하여 Context의 값을 정합니다. (value 속성으로 값을 설정)
  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

// Consumer 를 이용하여 Context에 저장되어 있는 전역 데이터에 접근할 수 있습니다.
// TodoContext의 Consumer 속성을 TodoConsumer 변수에 저장
const TodoConsumer = TodoContext.Consumer;

// TodoProvider, TodoConsumer 내보내기
export { TodoProvider, TodoConsumer };

// TodoContext 내보내기
export default TodoContext;
