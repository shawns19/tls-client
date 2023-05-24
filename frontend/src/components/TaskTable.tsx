import {
  Button,
  Flex,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Task } from "../types";
import { EventsEmit } from "../../wailsjs/runtime/runtime";

type CTableProps = {
  headers: string[];
  tasks: Task[];
  handleDelete: (task: Task) => void;
};

export const CTable = ({ headers, tasks, handleDelete }: CTableProps) => {
  return (
    <TableContainer>
      <Table borderColor="gray.200">
        <Thead background="black">
          <Tr>
            {headers.map((header) => (
              <Th key={header}>{header}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody background="blackAlpha.200">
          {tasks.map((task) => (
            <Tr key={task.ID}>
              <Td>{task.Method}</Td>
              <Td>{task.Payload}</Td>
              <Td>
                {task.Status.length > 15
                  ? task.Status.substring(0, 15).concat("...")
                  : task.Status}
              </Td>
              <Td>
                <Flex gap="2">
                  <Button
                    onClick={() => {
                      EventsEmit("startTask", task);
                    }}
                  >
                    Start
                  </Button>
                  <Button
                    onClick={() => {
                      EventsEmit("stopTask", task);
                    }}
                  >
                    Stop
                  </Button>
                  <Button onClick={() => handleDelete(task)}>Delete</Button>
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
