import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const Container = styled.div`
  border: 1px solid lightgray;
  padding: 8px;
  margin-bottom: 8px;
  border-radius: 2px;
  background-color: ${props =>
    props.isDragDisabled
      ? "lightgrey"
      : props.isDragging
      ? "lightgreen"
      : "white"};
  color: ${props => (props.isOrange ? "orange" : "inherit")};
  display: flex;
`;

const Task = ({ task, index, isOrange }) => {
  const isDragDisabled = task.id === "task-1";
  return (
    <Draggable
      draggableId={task.id}
      index={index}
      isDragDisabled={isDragDisabled}
    >
      {(provided, snaphot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snaphot.isDragging}
          isOrange={isOrange}
          isDragDisabled={isDragDisabled}
        >
          {task.content}
        </Container>
      )}
    </Draggable>
  );
};

export default Task;
