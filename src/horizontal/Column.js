import React from "react";
import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import Task from "./Task";

const TaskList = styled.div`
  padding: 8px;
  background-color: ${props => (props.isDraggingOver ? "skyblue" : "white")};
  width: 95%;
  display: flex;
  justify-content: space-between;
`;

const Title = styled.h3`
  padding: 8px;
  text-align: center;
  color: ${props => (props.isOrange ? "orange" : "inherit")};
`;

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgray;
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ColumnHorizontal = ({ column, tasks, isOrange, isDropDisabled }) => {
  return (
    <Container>
      <Title isOrange={isOrange}>{column.title}</Title>
      <Droppable
        droppableId={column.id}
        isDropDisabled={isDropDisabled}
        direction="horizontal"
      >
        {(provided, snapshot) => (
          <TaskList
            {...provided.droppableProps}
            ref={provided.innerRef}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {tasks.map((task, index) => (
              <Task
                key={task.id}
                task={task}
                index={index}
                isOrange={isOrange}
              />
            ))}
            {provided.placeholder}
          </TaskList>
        )}
      </Droppable>
    </Container>
  );
};

export default ColumnHorizontal;
