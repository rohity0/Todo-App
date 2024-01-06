import { DeleteIcon } from "@chakra-ui/icons";
import {
  Badge,
  Box,
  Checkbox,
  CheckboxGroup,
  Flex,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  deleteTask,
  getTasks,
  updateSubtasksList,
} from "../Redux/AppReducer/action";

const TaskCard = ({
  id,
  title,
  description,
  owner,
  priority,
  subTasks,
  colorScheme,
}) => {
  const dispatch = useDispatch();
  const [checkbox, setCheckBox] = useState(() => {
    let data = subTasks
      .filter((item) => {
        return item.status && item.subTaskTitle;
      })
      .map((item) => item.subTaskTitle);
    return data;
  });

  const updateSubTaskStatus = (value) => {
    let newSubTaskData = subTasks.map((item) => {
      if (value.includes(item.subTaskTitle)) {
        return {
          ...item,
          status: true,
        };
      }
      return { ...item, status: false };
    });

    dispatch(updateSubtasksList(id, { subTasks: newSubTaskData })).then(() =>
      dispatch(getTasks())
    );
  };

  const deleteTasks = (id) => {
    dispatch(deleteTask(id)).then(() => {
      dispatch(getTasks());
    });
  };

  return (
    <>
      <Box
        width="90%"
        boxShadow="0px 10px 15px -3px rgba(0,0,0,0.1)"
        margin="0.5rem auto 1rem"
        padding="10px"
      >
        <Flex justifyContent="space-between">
          <Text>{title.toUpperCase()}</Text>
          <Flex px="2" gap={"2"}>
            <DeleteIcon onClick={() => deleteTasks(id)} />
          </Flex>
        </Flex>
        <Box>
          <Flex justifyContent="space-between">
            <Badge colorScheme={colorScheme}>{owner && owner}</Badge>
            <Badge
              colorScheme={
                priority === "High"
                  ? "red"
                  : priority === "Low"
                  ? "blue"
                  : "gray"
              }
            >
              {priority}
            </Badge>
          </Flex>
        </Box>
        <Text>{description}</Text>
        <Flex flexDirection={"column"} rowGap={"2px"}>
          <CheckboxGroup
            value={checkbox}
            onChange={(value) => {
              setCheckBox(value);
              updateSubTaskStatus(value);
            }}
          >
            {subTasks.length > 0 &&
              subTasks.map((item, index) => (
                <Checkbox key={index} value={item.subTaskTitle}>
                  <span
                    style={{
                      textDecoration: item.status ? "line-through" : "",
                    }}
                  >
                    {item.subTaskTitle}
                  </span>
                </Checkbox>
              ))}
          </CheckboxGroup>
        </Flex>
      </Box>
    </>
  );
};

export default TaskCard;
