import React, { useState, Fragment } from "react";
import styled from "styled-components";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { initialData } from "./store/initial-data";
import { reorderColumn } from "./utils/reorderColumn";
import InheritListColumn from "./main/InheritListColumn";

const Container = styled.div`
  display: flex;
  justify-content: ${({ horizontal }) =>
    horizontal ? "center" : "space-around"};
`;

const App = () => {
  const [data, setData] = useState(initialData);
  // const [dataHorizontal, setDataHorizontal] = useState(initialDataHorizontal);

  const onDragStart = (start, provided) => {
    provided.announce(
      `Press space bar to lift the task in position ${start.source.index + 1}`
    );
  };

  const onDragUpdate = (update, provided) => {
    const message = update.destination
      ? `Press space bar to lift the task in position ${update.source.index +
          1}`
      : "You are currently not over a droppable area";
    provided.announce(message);
  };

  const onDragEnd = (result, provided) => {
    document.body.style.backgroundColor = `inherit`;
    const message = result.destination
      ? `You have moved the task from position ${result.source.index +
          1} to ${result.destination.index + 1}`
      : `The task has been returned to its starting position of ${result.source
          .index + 1}`;
    provided.announce(message);
    const reorder = reorderColumn(result, data);
    if (reorder) {
      return setData(reorder);
    }
  };

  // const onDragEndHorizontal = result => {
  //   const reorder = reorderColumn(result, dataHorizontal);
  //   if (reorder) {
  //     return setDataHorizontal(reorder);
  //   }
  // };

  return (
    <Fragment>
      <DragDropContext
        onDragEnd={onDragEnd}
        onDragStart={onDragStart}
        onDragUpdate={onDragUpdate}
      >
        <Droppable
          droppableId="all-colunns"
          direction="horizontal"
          type="column"
        >
          {provided => (
            <Container {...provided.droppableProps} ref={provided.innerRef}>
              {data.columnOrder.map((columnId, index) => {
                const column = data.columns[columnId];
                return (
                  <InheritListColumn
                    key={column.id}
                    column={column}
                    taskMap={data.tasks}
                    index={index}
                  />
                );
              })}
              {provided.placeholder}
            </Container>
          )}
        </Droppable>
      </DragDropContext>
      {/* <DragDropContext onDragEnd={onDragEndHorizontal}>
        <Container horizontal={true}>
          {dataHorizontal.columnOrder.map(columnId => {
            const column = dataHorizontal.columns[columnId];
            const tasks = column.taskIds.map(
              taskId => dataHorizontal.tasks[taskId]
            );
            return (
              <ColumnHorizontal key={column.id} column={column} tasks={tasks} />
            );
          })}
        </Container>
      </DragDropContext> */}
    </Fragment>
  );
};

export default App;
