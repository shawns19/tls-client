import {
  Heading,
  Grid,
  GridItem,
  HStack,
  Button,
  Flex,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment, incrementByAmount } from "../redux/counterSlice";
export const HomePage = () => {
  const [incAmt, setIncAmt] = useState("");
  const count = useSelector((state: any) => state.counter.count);
  const dispatch = useDispatch();

  const handleIncrement = () => {
    dispatch(increment());
  };
  const handleDecrement = () => {
    dispatch(decrement());
  };
  const handleSetIncAmt = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isNaN(Number(event.target.value))) return;
    setIncAmt(event.target.value);
  };
  const handleIncrementByAmount = () => {
    dispatch(incrementByAmount(Number(incAmt)));
  };
  return (
    <Grid h="100vh" w="100vw" bg="tertiary">
      <GridItem mx="auto" maxW="sm" textAlign="center">
        <Heading>This is home</Heading>
        <Heading paddingTop="10">Count: {count}</Heading>
        <HStack spacing={4} mt={4}>
          <Input
            value={incAmt}
            onChange={handleSetIncAmt}
            placeholder="Enter amount to increment by"
            size="sm"
            flex={1}
          />
          <Button onClick={handleIncrementByAmount} flex={1}>
            Increment by{" "}
            {incAmt.length > 3 ? incAmt.substring(0, 3).concat("...") : incAmt}
          </Button>
        </HStack>
        <HStack spacing={4} mt={4}>
          <Button onClick={handleIncrement} flex={1}>
            Increment
          </Button>
          <Button onClick={handleDecrement} flex={1}>
            Decrement
          </Button>
        </HStack>
      </GridItem>
    </Grid>
  );
};
