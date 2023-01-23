import { ITodo } from "src/entities";

interface ICreateTodo {
  (description: string, existingTodos: ITodo[]): ITodo;
}

export const createToDo: ICreateTodo = (description, existingTodos) => {
  if (existingTodos.some((todo) => todo.description === description))
    throw new Error("Duplicated todos are not allowed");

  if (existingTodos.filter((todo) => todo.isDone === false).length >= 3)
    throw new Error(
      "You cannot add a new todo if there is 3 or more todos unfinshed on your list"
    );

  return {
    description: description,
    id: String(new Date().getTime()),
    isDone: false,
  };
};

interface IDeleteTodo {
  (todoId: string, existingTodos: ITodo[]): ITodo[];
}

export const deleteTodo: IDeleteTodo = (todoId, existingTodos) => {
  const hasTodo = existingTodos.find((todo) => todo.id === todoId);
  if (!hasTodo) throw new Error("You cannot delete a todo that does not exist");
  if (!!hasTodo?.isDone) throw new Error("You cannot delete a completed todo");
  return existingTodos.filter((todo) => todo.id !== todoId);
};

interface IGetTodoById {
  (todoId: string, existingTodos: ITodo[]): ITodo | undefined;
}

export const getTodo: IGetTodoById = (todoId, existingTodos) => {
  const todo = existingTodos.find((todo) => todo.id === todoId);
  if (!todo) throw new Error("This todo does not exist");
  return todo;
};

interface ICompleteTodo {
  (todoId: string, existingTodos: ITodo[]): ITodo[];
}

export const completeTodo: ICompleteTodo = (todoId, existingTodos) => {
  const hasTodo = existingTodos.find((todo) => todo.id === todoId);
  if (!hasTodo) throw new Error("This todo does not exist");
  return existingTodos.map((todo) => {
    if (todo.id === todoId) return { ...todo, isDone: true };
    return todo;
  });
};
