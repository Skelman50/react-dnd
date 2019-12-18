import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const Container = styled.div`
  border: 1px solid lightgray;
  padding: 8px;
  margin-bottom: 8px;
  border-radius: 2px;
  background-color: ${props => (props.isDragging ? "lightgreen" : "white")};
  color: ${props => (props.isOrange ? "orange" : "inherit")};
  display: flex;
`;

const Task = ({ task, index, isOrange }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snaphot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snaphot.isDragging}
          isOrange={isOrange}
        >
          {task.content}
        </Container>
      )}
    </Draggable>
  );
};

export default Task;
