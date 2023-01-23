import React from "react";
import { ITodo } from "src/entities";
import { completeTodo, createToDo, deleteTodo } from "src/usecases";

export const useTodos = () => {
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

  return {
    state: {
      todos,
      todo,
    },
    methods: {
      handleOnChange,
      handleAddTodo,
      handleRemoveTodo,
      handleCompleteTodo,
    },
  };
};
