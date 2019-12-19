export const reorderColumn = (result, data) => {
  const { source, destination, draggableId, type } = result;
  if (!destination) return null;
  if (
    destination.droppableId === source.droppableId &&
    destination.index === source.index
  ) {
    return null;
  }

  if (type === "column") {
    const newColumnOrder = Array.from(data.columnOrder);
    newColumnOrder.splice(source.index, 1);
    newColumnOrder.splice(destination.index, 0, draggableId);
    return {
      ...data,
      columnOrder: newColumnOrder
    };
  }

  const start = data.columns[source.droppableId];
  const end = data.columns[destination.droppableId];
  if (start === end) {
    const newTaskIds = Array.from(start.taskIds);
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);
    const newColumn = {
      ...start,
      taskIds: newTaskIds
    };
    return {
      ...data,
      columns: {
        ...data.columns,
        [newColumn.id]: newColumn
      }
    };
  }
  const startTaskIds = Array.from(start.taskIds);
  startTaskIds.splice(source.index, 1);
  const newStart = {
    ...start,
    taskIds: startTaskIds
  };

  const endTaskIds = Array.from(end.taskIds);
  endTaskIds.splice(destination.index, 0, draggableId);
  const newEnd = {
    ...end,
    taskIds: endTaskIds
  };
  return {
    ...data,
    columns: {
      ...data.columns,
      [newStart.id]: newStart,
      [newEnd.id]: newEnd
    }
  };
};
