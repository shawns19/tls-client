import { Button, Flex, Grid, GridItem, Heading, Input } from "@chakra-ui/react";
import { CTable } from "../components/TaskTable";
import { useEffect, useState } from "react";
import { Task } from "../types";
import { EventsEmit, EventsOn } from "../../wailsjs/runtime/runtime";
import { createRequestTask } from "../tasks/createTask";

export const TasksV2 = () => {
  const [url, setUrl] = useState("");
  const [taskAmt, setTaskAmt] = useState("1");
  const [tasks, setTasks] = useState<Task[]>([]);
  useEffect(() => {
    const handleSetStatus = (task: Task) => {
      setTasks((prev) => prev.map((x) => (x.ID === task.ID ? task : x)));
      // change to redux for state management
      // change home page
      return task;
    };

    EventsOn("taskUpdate", handleSetStatus);
  }, []);
  const handleEmitStartAllTasks = async () => {
    tasks.forEach((x) => EventsEmit("startTask", x));
  };
  const handleEmitStopAllTasks = async () => {
    tasks.forEach((x) => EventsEmit("stopTask", x));
  };
  const handleDeleteTask = (task: Task) => {
    const idx = tasks.findIndex((t) => t.ID === task.ID);
    tasks.splice(idx, 1);
    const newTasks = [...tasks];
    setTasks(newTasks);
  };
  const handleDeleteAllTasks = () => {
    setTasks([]);
  };
  const handleCreateTask = async () => {
    if (isNaN(Number(taskAmt))) return;
    if (!url.length) return;
    const newTasks: any[] = [];
    for (let i = 0; i < Number(taskAmt); i++) {
      const task = createRequestTask(url);
      newTasks.push(task);
    }
    setTasks([...tasks, ...newTasks]);
  };
  const handleSetUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };
  const handleSetTaskAmt = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskAmt(event.target.value);
  };
  return (
    <Flex ml="200px" flexDirection="column" minHeight="100vh" bg="tertiary">
      <Heading>Task Page V2 </Heading>
      <Heading size="sm">{tasks.length} Tasks</Heading>
      <Flex gap="2" justifyContent="center" py={4}>
        <Input
          placeholder="Set the request URL"
          value={url}
          onChange={handleSetUrl}
        />
        <Input
          placeholder="Number of tasks to create"
          value={taskAmt}
          onChange={handleSetTaskAmt}
          w="xs"
        />
        <Button bg="blackAlpha.500" onClick={handleCreateTask}>
          CREATE
        </Button>
      </Flex>
      <Flex pb={4}>
        <Button
          p="2"
          mx={2}
          bg="blackAlpha.500"
          onClick={handleEmitStartAllTasks}
        >
          START ALL
        </Button>
        <Button
          p="2"
          mx={2}
          bg="blackAlpha.500"
          onClick={handleEmitStopAllTasks}
        >
          STOP ALL
        </Button>
        <Button p="2" mx={2} bg="blackAlpha.500" onClick={handleDeleteAllTasks}>
          DELETE ALL
        </Button>
      </Flex>
      <CTable
        headers={["method", "payload", "status", "actions"]}
        tasks={tasks}
        handleDelete={handleDeleteTask}
      />
    </Flex>
  );
};
