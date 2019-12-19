import React, { memo } from "react";
import Column from "./Column";

export default memo(function InheritListColumn({ column, taskMap, index }) {
  const tasks = column.taskIds.map(taskId => taskMap[taskId]);
  return <Column column={column} tasks={tasks} index={index} />;
});
