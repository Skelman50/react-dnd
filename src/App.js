import React, { useState, Fragment } from "react";
import styled from "styled-components";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { initialData, initialDataHorizontal } from "./store/initial-data";
import ColumnHorizontal from "./horizontal/Column";
import { reorderColumn } from "./utils/reorderColumn";
import InheritListColumn from "./main/InheritListColumn";

const Container = styled.div`
  display: flex;
  justify-content: ${({ horizontal }) =>
    horizontal ? "center" : "space-around"};
`;

const App = () => {
  const [data, setData] = useState(initialData);
  const [dataHorizontal, setDataHorizontal] = useState(initialDataHorizontal);

  // const onDragStart = () => {
  //   setIsOrange(true);
  //   document.body.style.transition = `background-color 0.5s ease`;
  // };

  // const onDragUpdate = update => {
  //   const { destination } = update;
  //   const opacity = destination
  //     ? destination.index / Object.keys(data.tasks).length
  //     : 0;
  //   document.body.style.backgroundColor = `rgba(152, 141, 217, ${opacity})`;
  // };

  const onDragEnd = result => {
    document.body.style.backgroundColor = `inherit`;
    const reorder = reorderColumn(result, data);
    if (reorder) {
      return setData(reorder);
    }
  };

  const onDragEndHorizontal = result => {
    const reorder = reorderColumn(result, dataHorizontal);
    if (reorder) {
      return setDataHorizontal(reorder);
    }
  };

  return (
    <Fragment>
      <DragDropContext onDragEnd={onDragEnd}>
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
      <DragDropContext onDragEnd={onDragEndHorizontal}>
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
      </DragDropContext>
    </Fragment>
  );
};

export default App;
