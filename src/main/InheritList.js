import React, { memo } from "react";
import Task from "./Task";

export default memo(function InheritList({ tasks }) {
  return tasks.map((task, index) => (
    <Task key={task.id} task={task} index={index} />
  ));
});
