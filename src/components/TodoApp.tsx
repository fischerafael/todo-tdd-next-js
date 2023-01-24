import React from "react";
import { useTodos } from "src/hooks/useTodos";

export const TodoApp = () => {
  const { state, methods } = useTodos();

  //

  return (
    <div>
      <input
        value={state.todo}
        onChange={(e) => methods.handleOnChange(e.target.value)}
      />
      <button onClick={methods.handleAddTodo}>Add Todo</button>

      <div>
        {state.todos.map((todo) => (
          <div key={todo.id}>
            {todo.description} - {todo.isDone ? "Completed" : "Not Completed"}{" "}
            <button onClick={() => methods.handleCompleteTodo(todo.id)}>
              Complete
            </button>
            <button onClick={() => methods.handleRemoveTodo(todo.id)}>
              Remove Todo
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
