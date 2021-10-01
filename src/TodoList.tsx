import { ArrowDownward, ArrowUpward, DeleteForever } from "@mui/icons-material";
import {
  List,
  ListItem,
  IconButton,
  ListItemButton,
  ListItemIcon,
  Checkbox,
  ListItemText,
  ButtonGroup,
} from "@mui/material";
import * as React from "react";
import { Todo } from "./models/Todo";

interface ITodoListProps {
  todos: Todo[];
  handleCheck: (id: string) => void;
  handleDelete: (id: string) => void;
  handleUp: (id: string) => void;
  handleDown: (id: string) => void;
}

const TodoList: React.FC<ITodoListProps> = ({
  todos,
  handleCheck,
  handleDelete,
  handleUp,
  handleDown,
}) => {
  return (
    <List
      sx={{ width: "100%", bgcolor: "background.paper", marginTop: "32px" }}
    >
      {todos.map((todo) => {
        const labelId = `checkbox-list-label-${todo.id}`;

        return (
          <ListItem
            key={todo.id}
            secondaryAction={
              <ButtonGroup aria-label="text button group">
                <IconButton aria-label="up" onClick={() => handleUp(todo.id)}>
                  <ArrowUpward color="action" />
                </IconButton>
                <IconButton
                  aria-label="down"
                  onClick={() => handleDown(todo.id)}
                >
                  <ArrowDownward color="action" />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  onClick={() => handleDelete(todo.id)}
                >
                  <DeleteForever color="error" />
                </IconButton>
              </ButtonGroup>
            }
            disablePadding
          >
            <ListItemButton
              role={undefined}
              onClick={() => handleCheck(todo.id)}
              dense
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  color="success"
                  checked={todo.done}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <ListItemText
                id={labelId}
                primary={todo.title}
                primaryTypographyProps={{
                  variant: "body1",
                }}
                style={{ textDecoration: todo.done ? "line-through" : "" }}
              />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};

export default TodoList;
