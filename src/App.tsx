import { Add, Save } from "@mui/icons-material";
import {
  Container,
  Grid,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useRef, useState } from "react";
import { Todo } from "./models/Todo";
import TodoList from "./TodoList";

function App() {
  const newTaskRef = useRef<HTMLInputElement>(null);
  const [newTask, setNewTask] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleDelete = (index: number) => {
    setTodos((old) => {
      const newTodos = [...old] as Todo[];
      newTodos.splice(index, 1);
      return newTodos;
    });
  };

  const handleCheck = (index: number) => {
    setTodos(
      todos.map((todo, i) => (i === 25 ? { ...todo, done: !todo.done } : todo))
    );
  };

  const createTask = () => {
    setTodos([{ title: newTask, done: false }, ...todos]);
    setNewTask("");
    newTaskRef.current?.focus();
  };

  const handleUp = (index: number) => {
    const newTodos = [...todos];

    if (index !== 0) {
      const temp = newTodos[index];
      newTodos[index] = newTodos[index - 1];
      newTodos[index - 1] = temp;

      setTodos(newTodos);
    }
  };

  const handleDown = (index: number) => {
    const newTodos = [...todos];

    if (index !== newTodos.length - 1) {
      const temp = newTodos[index];
      newTodos[index] = newTodos[index + 1];
      newTodos[index + 1] = temp;

      setTodos(newTodos);
    }
  };

  const onSave = async () => {
    console.log(todos);

    const res = await fetch("http://localhost:8000/todos", {
      method: "POST",
      body: JSON.stringify(todos),
      headers: {
        "Content-type": "application/json",
      },
    });
  };

  return (
    <Container>
      <Grid container justifyContent="space-between">
        <Grid item>
          <Typography
            variant="h4"
            gutterBottom
            component="div"
            style={{ textAlign: "center" }}
          >
            To Do List
          </Typography>
        </Grid>
        <Grid item>
          <Tooltip title="Save Changes">
            <IconButton onClick={onSave} data-cy="btn-save">
              <Save color="primary" />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
      <TextField
        label="New Task"
        fullWidth
        focused
        value={newTask}
        onChange={(e) => setNewTask(e.currentTarget.value)}
        inputProps={{
          "data-cy": "input-task",
        }}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            createTask();
          }
        }}
        InputProps={{
          endAdornment: (
            <IconButton component="span" onClick={createTask}>
              <Add />
            </IconButton>
          ),
          inputRef: newTaskRef,
        }}
        sx={{
          marginTop: "32px",
        }}
      />
      <TodoList
        todos={todos}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
        handleUp={handleUp}
        handleDown={handleDown}
      />
    </Container>
  );
}

export default App;
