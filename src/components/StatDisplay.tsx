import { Container, Flex, Text, Progress } from "@mantine/core";
import { statsAbbr } from "../utils/pokemonUtils";
import styles from "../styles/statDisplay.module.css";
import { lightenHexColor } from "../utils/brightnessColor";

const StatDisplay = ({ statName, statLevel, typeColor }) => {
  const value = ((statLevel - 1) / (255 - 1)) * 100;

  return (
    <Flex w={"100%"} justify={"space-between"}>
      <Container className={styles.textContainer} w={"5rem"}>
        <Text ta={"end"} w={"100%"} c={typeColor} fw={"bold"}>
          {statsAbbr[statName]}
        </Text>
      </Container>
      <Flex flex={1} ml={10} align={"center"}>
        <Text>{statLevel}</Text>
        <Progress
          value={value}
          color={typeColor}
          radius={"xl"}
          size={"sm"}
          flex={1}
          ml={10}
          bg={lightenHexColor(typeColor, 0.7)}
        />
      </Flex>
    </Flex>
  );
};

export default StatDisplay;
