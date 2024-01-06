import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Box, Flex, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TaskCard from "../Components/TaskCard";
import CreateDrawer from "../Modals/CreateTask";
import { getTasks, updateTasks } from "../Redux/AppReducer/action";

const Homepage = () => {
  const tasks = useSelector((state) => state.AppReducer.tasks);
  const dispatch = useDispatch();

  const col1Data = tasks.filter((item) => item.task_status === "todo");
  const col2Data = tasks.filter((item) => item.task_status === "inprogress");
  const col3Data = tasks.filter((item) => item.task_status === "done");

  //! Drag and Drop function
  function handleOnDragEnd(result) {
    let { destination, source } = result;
    console.log(destination, source);

    let id;
    if (source.droppableId === "inprogress") {
      id = col2Data[source.index].id;
    } else if (source.droppableId === "todo") {
      id = col1Data[source.index].id;
    } else {
      id = col3Data[source.index].id;
    }

    // * if no destination is null do nothing==> return
    if (!destination) return;

    if (id) {
      dispatch(
        updateTasks(id, {
          task_status: destination.droppableId,
        })
      ).then(() => {
        dispatch(getTasks());
      });
    }
  }

  useEffect(() => {
    if (tasks.length === 0) {
      dispatch(getTasks());
    }
  }, [dispatch]);

  return (
    <Box w="85%" paddingTop="10rem">
      <Box>
        <CreateDrawer />
      </Box>

      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Flex justifyContent="space-evenly" columnGap={"1rem"}>
          {/* Todo */}
          <Box
            border="1px solid rgba(0,0,0,0.1)"
            borderRadius="5px"
            width="33%"
          >
            <Box backgroundColor="gray.200" p="2">
              <Text textAlign="center" fontWeight="bold">
                Added <span>{col1Data?.length}</span>
              </Text>
            </Box>

            {/* todo tasks */}
            <Droppable droppableId="todo">
              {(provided) => (
                <div
                  className="todo"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {tasks.length > 0 &&
                    tasks
                      .filter((item) => item.task_status === "todo")
                      .map((item, index) => {
                        return (
                          <Draggable
                            key={item.id.toString()}
                            draggableId={item.id.toString()}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                              >
                                <TaskCard {...item} colorScheme="green" />
                              </div>
                            )}
                          </Draggable>
                        );
                      })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </Box>

          {/* in-progress */}

          <Box
            border="1px solid rgba(0,0,0,0.1)"
            borderRadius="5px"
            width="33%"
          >
            <Box backgroundColor="gray.200" p="2">
              <Text textAlign="center" fontWeight="bold">
                Started <span>{col2Data?.length}</span>
              </Text>
            </Box>
            {/* in-progress tasks */}
            <Droppable droppableId="inprogress">
              {(provided) => (
                <div
                  className="inprogress"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {tasks.length &&
                    tasks
                      .filter((item) => item.task_status === "inprogress")
                      .map((item, index) => {
                        return (
                          <Draggable
                            key={item.id.toString()}
                            draggableId={item.id.toString()}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                              >
                                <TaskCard
                                  key={item.id}
                                  {...item}
                                  colorScheme="yellow"
                                />
                              </div>
                            )}
                          </Draggable>
                        );
                      })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </Box>

          <Box
            border="1px solid rgba(0,0,0,0.1)"
            borderRadius="5px"
            width="33%"
          >
            <Box backgroundColor="gray.200" p="2">
              <Text textAlign="center" fontWeight="bold">
                Completed <span>{col3Data?.length}</span>
              </Text>
            </Box>
            {/* done tasks */}
            <Droppable droppableId="done">
              {(provided) => (
                <div
                  className="done"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {tasks.length &&
                    tasks
                      .filter((item) => item.task_status === "done")
                      .map((item, index) => {
                        return (
                          <Draggable
                            key={item.id.toString()}
                            draggableId={item.id.toString()}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                              >
                                <TaskCard
                                  key={item.id}
                                  {...item}
                                  colorScheme="green"
                                />
                              </div>
                            )}
                          </Draggable>
                        );
                      })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </Box>
        </Flex>
      </DragDropContext>
    </Box>
  );
};

export default Homepage;
