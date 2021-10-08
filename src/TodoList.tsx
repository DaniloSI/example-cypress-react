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
  handleCheck: (index: number) => void;
  handleDelete: (index: number) => void;
  handleUp: (index: number) => void;
  handleDown: (index: number) => void;
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
      {todos.map((todo, index) => {
        const labelId = `checkbox-list-label-${index}`;

        return (
          <ListItem
            key={index}
            secondaryAction={
              <ButtonGroup aria-label="text button group">
                <IconButton aria-label="up" onClick={() => handleUp(index)}>
                  <ArrowUpward color="action" />
                </IconButton>
                <IconButton aria-label="down" onClick={() => handleDown(index)}>
                  <ArrowDownward color="action" />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  onClick={() => handleDelete(index)}
                >
                  <DeleteForever color="error" />
                </IconButton>
              </ButtonGroup>
            }
            disablePadding
          >
            <ListItemButton
              role={undefined}
              onClick={() => handleCheck(index)}
              dense
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  color="success"
                  checked={todo.done}
                  tabIndex={-1}
                  disableRipple
                  inputProps={
                    {
                      "data-cy": "done",
                      "aria-labelledby": labelId,
                    } as any
                  }
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
