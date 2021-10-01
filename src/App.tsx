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
import { v4 as uuidv4 } from "uuid";

function App() {
  const newTaskRef = useRef<HTMLInputElement>(null);
  const [newTask, setNewTask] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleDelete = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleCheck = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const createTask = () => {
    setTodos([{ id: uuidv4(), title: newTask, done: false }, ...todos]);
    setNewTask("");
    newTaskRef.current?.focus();
  };

  const handleUp = (id: string) => {
    const newTodos = [...todos];
    const index = newTodos.findIndex((todo) => todo.id === id);

    if (index !== 0) {
      const temp = newTodos[index];
      newTodos[index] = newTodos[index - 1];
      newTodos[index - 1] = temp;

      setTodos(newTodos);
    }
  };

  const handleDown = (id: string) => {
    const newTodos = [...todos];
    const index = newTodos.findIndex((todo) => todo.id === id);

    if (index !== newTodos.length - 1) {
      const temp = newTodos[index];
      newTodos[index] = newTodos[index + 1];
      newTodos[index + 1] = temp;

      setTodos(newTodos);
    }
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
            <IconButton>
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
