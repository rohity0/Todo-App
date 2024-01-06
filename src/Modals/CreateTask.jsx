import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormLabel,
  Input,
  ListItem,
  OrderedList,
  Select,
  Stack,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useReducer, useState } from "react";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { createTask, getTasks } from "../Redux/AppReducer/action";

const initialState = {
  title: "",
  description: "Default Description",
  task_status: "todo",
  priority: "Low",
  subTasks: [],
  dueDate: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "title":
      return {
        ...state,
        title: action.payload,
      };

    case "description":
      return {
        ...state,
        description: action.payload,
      };
    case "task_status":
      return {
        ...state,
        task_status: action.payload,
      };
    case "priority":
      return {
        ...state,
        priority: action.payload,
      };
    case "owner":
      return {
        ...state,
        owner: action.payload,
      };
    case "subTasks":
      return {
        ...state,
        subTasks: [...state.subTasks, action.payload],
      };
    case "reset":
      return initialState;
    default:
      return state;
  }
};

const CreateDrawer = () => {
  const [state, setState] = useReducer(reducer, initialState);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [task, setTask] = useState({
    subTaskTitle: "",
    status: false,
  });
  const dispatch = useDispatch();
  const firstField = useRef();

  const createTaskHandler = () => {
    dispatch(createTask(state))
      .then(() => dispatch(getTasks()))
      .then(() => {
        onClose();
        setState({ type: "reset" });
      });
  };

  return (
    <>
      <Button
        leftIcon={<AddIcon />}
        colorScheme="blue"
        size="sm"
        onClick={onOpen}
      >
        Create Todo
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        initialFocusRef={firstField}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Create a Task</DrawerHeader>
          <DrawerBody>
            <Stack spacing="24px">
              <Box>
                <FormLabel htmlFor="title">Task Name</FormLabel>
                <Input
                  isRequired
                  onChange={(e) =>
                    setState({ type: "title", payload: e.target.value })
                  }
                  ref={firstField}
                  id="username"
                  placeholder="Please Enter you Task"
                />
              </Box>

              <Box>
                <FormLabel htmlFor="Status">Status</FormLabel>
                <Select
                  id="status"
                  defaultValue="Low"
                  onChange={(e) =>
                    setState({ type: "task_status", payload: e.target.value })
                  }
                >
                  <option value="todo">Todo</option>
                  <option value="inprogress">Inprogress</option>
                  <option value="done">Done</option>
                </Select>
              </Box>

              <Box>
                <FormLabel htmlFor="owner">Owner Name</FormLabel>
                <Input
                  onChange={(e) =>
                    setState({ type: "owner", payload: e.target.value })
                  }
                  ref={firstField}
                  id="owner"
                  placeholder="Please Enter you owner"
                />
              </Box>

              <Box>
                <FormLabel htmlFor="desc">Description</FormLabel>
                <Textarea
                  id="desc"
                  onChange={(e) =>
                    setState({ type: "description", payload: e.target.value })
                  }
                />
              </Box>
              <Box>
                <FormLabel htmlFor="priority">Priority</FormLabel>
                <Select
                  id="status"
                  defaultValue="Low"
                  onChange={(e) =>
                    setState({ type: "priority", payload: e.target.value })
                  }
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </Select>
              </Box>
              <Box>
                <FormLabel htmlFor="SubTask">SubTask</FormLabel>
                <Input
                  w="12rem"
                  id="subTask"
                  value={task.subTaskTitle}
                  placeholder="Sub Task"
                  onChange={(e) =>
                    setTask({
                      subTaskTitle: e.target.value,
                      status: false,
                    })
                  }
                />
                <Button
                  variant={"outline"}
                  bg="gray.100"
                  onClick={() => {
                    setState({ type: "subTasks", payload: task });
                    setTask({
                      subTaskTitle: "",
                      status: false,
                    });
                  }}
                >
                  Add
                </Button>
                <OrderedList>
                  {state.subTasks.length > 0 &&
                    state.subTasks?.map((items) => (
                      <ListItem>{items.subTaskTitle}</ListItem>
                    ))}
                </OrderedList>
              </Box>
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={createTaskHandler}>
              Submit
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CreateDrawer;
