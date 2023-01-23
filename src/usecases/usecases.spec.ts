import { ITodo } from "src/entities";
import { completeTodo, createToDo, deleteTodo, getTodo } from "./index";

const mockedResult: ITodo = {
  description: "test todo",
  id: "test",
  isDone: false,
};

const mockedExistingTodos: ITodo[] = [
  {
    description: "todo one",
    id: "test1",
    isDone: false,
  },
  {
    description: "todo two",
    id: "test2",
    isDone: true,
  },
  {
    description: "todo three",
    id: "test3",
    isDone: false,
  },
  {
    description: "todo five",
    id: "test5",
    isDone: false,
  },
];

describe("createTodo", () => {
  it("should return a todo", () => {
    const result = createToDo("test todo", []);
    expect(result.description).toBe(mockedResult.description);
  });

  it("should return a todo with an auto-generated ID", () => {
    const result = createToDo("test todo", []);
    expect(result.id).toBeTruthy();
  });

  it("should return a todo with done status as false", () => {
    const result = createToDo("test todo", []);
    expect(result.isDone).toBe(false);
  });

  it("should not allow two todos with the same description", () => {
    const t = () => {
      createToDo("test todo", [mockedResult]);
    };
    expect(t).toThrow("Duplicated todos are not allowed");
  });

  it("should not be possible to create a new todo if there is at least 3 uncompleted todos in the list", () => {
    const t = () => {
      createToDo("test todo", mockedExistingTodos);
    };
    expect(t).toThrow(
      "You cannot add a new todo if there is 3 or more todos unfinshed on your list"
    );
  });
});

describe("deleteTodo", () => {
  it("should delete a todo", () => {
    const result = deleteTodo("test1", mockedExistingTodos);
    expect(result.length).toBe(3);
  });

  it("should not be possible to delete a todo that has been done", () => {
    const t = () => {
      deleteTodo("test2", mockedExistingTodos);
    };
    expect(t).toThrow("You cannot delete a completed todo");

    const t2 = () => {
      deleteTodo("test3", mockedExistingTodos);
    };
    expect(t2).not.toThrow("You cannot delete a completed todo");
  });

  it("should throw if todo does not exist", () => {
    const t = () => {
      deleteTodo("test4", mockedExistingTodos);
    };
    expect(t).toThrow("You cannot delete a todo that does not exist");
  });
});

describe("getTodo", () => {
  it("should return the todo, if it exists", () => {
    const result = getTodo("test1", mockedExistingTodos);
    expect(result?.description).toBe("todo one");
    expect(result?.isDone).toBe(false);
    expect(result?.id).toBe("test1");
  });

  it("should throw if todo does not exist", () => {
    const t = () => {
      getTodo("test4", mockedExistingTodos);
    };
    expect(t).toThrow("This todo does not exist");
  });
});

describe("completeTodo", () => {
  it("should set an existin todo isDone status to true", () => {
    const result = completeTodo("test1", mockedExistingTodos);
    expect(result[0].isDone).toBe(true);
  });

  it("should throw if todo does not exist", () => {
    const t = () => {
      completeTodo("test4", mockedExistingTodos);
    };
    expect(t).toThrow("This todo does not exist");
  });
});
