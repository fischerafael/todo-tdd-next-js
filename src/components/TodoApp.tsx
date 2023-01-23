import React from "react";
import { ITodo } from "src/entities";
import { completeTodo, createToDo, deleteTodo } from "src/usecases";

export const TodoApp = () => {
  const [todo, setTodo] = React.useState<string>("");
  const [todos, setTodos] = React.useState<ITodo[]>([]);

  const handleOnChange = (value: string) => {
    setTodo(() => value);
  };

  const handleAddTodo = () => {
    try {
      const newTodo = createToDo(todo, todos);
      setTodos((existing) => [...existing, newTodo]);
      setTodo("");
    } catch (e: any) {
      alert(e);
    }
  };

  const handleRemoveTodo = (id: string) => {
    try {
      const newTodos = deleteTodo(id, todos);
      setTodos(newTodos);
    } catch (e: any) {
      alert(e);
    }
  };

  const handleCompleteTodo = (id: string) => {
    try {
      const newTodos = completeTodo(id, todos);
      setTodos(newTodos);
    } catch (e: any) {
      alert(e);
    }
  };

  return (
    <div>
      <input value={todo} onChange={(e) => handleOnChange(e.target.value)} />
      <button onClick={handleAddTodo}>Add Todo</button>

      <div>
        {todos.map((todo) => (
          <div key={todo.id}>
            {todo.description} - {todo.isDone ? "Completed" : "Not Completed"}{" "}
            <button onClick={() => handleCompleteTodo(todo.id)}>
              Complete
            </button>
            <button onClick={() => handleRemoveTodo(todo.id)}>
              Remove Todo
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
