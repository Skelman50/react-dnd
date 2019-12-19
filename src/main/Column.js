import React from "react";
import styled from "styled-components";
import { Droppable, Draggable } from "react-beautiful-dnd";
import InheritList from "./InheritList";

const TaskList = styled.div`
  padding: 8px;
  background-color: ${props => (props.isDraggingOver ? "skyblue" : "inherit")};
  flex-grow: 1;
  min-height: 100px;
`;

const Title = styled.h3`
  padding: 8px;
  color: ${props => (props.isOrange ? "orange" : "inherit")};
`;

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgray;
  border-radius: 2px;
  background-color: white;
  width: 30%;
  display: flex;
  flex-direction: column;
`;

const Column = ({ column, tasks, isOrange, isDropDisabled, index }) => {
  return (
    <Draggable draggableId={column.id} index={index}>
      {provided => (
        <Container {...provided.draggableProps} ref={provided.innerRef}>
          <Title isOrange={isOrange} {...provided.dragHandleProps}>
            {column.title}
          </Title>
          <Droppable
            droppableId={column.id}
            isDropDisabled={isDropDisabled}
            type="task"
          >
            {(provided, snapshot) => (
              <TaskList
                {...provided.droppableProps}
                ref={provided.innerRef}
                isDraggingOver={snapshot.isDraggingOver}
              >
                <InheritList tasks={tasks} />
                {provided.placeholder}
              </TaskList>
            )}
          </Droppable>
        </Container>
      )}
    </Draggable>
  );
};

export default Column;
