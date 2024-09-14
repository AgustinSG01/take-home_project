import { Flex, Text } from "@mantine/core";
import style from "../styles/dataDisplay.module.css";
import { ReactNode } from "react";

type Props = {
  icon?: ReactNode;
  texts: string[] | number[];
  measure?: string;
  subtitle: string;
  leftBorder?: boolean;
  rightBorder?: boolean;
};
const DataDisplay = ({
  icon,
  texts = [],
  measure = "",
  subtitle,
  leftBorder = false,
  rightBorder = false,
}: Props) => {
  return (
    <Flex
      direction={"column"}
      justify={"space-between"}
      py={10}
      className={
        leftBorder
          ? style.leftBorder
          : rightBorder
          ? style.rightBorder
          : undefined
      }
      flex={1}
    >
      {texts.map((e) => (
        <Flex align={"center"} gap={10} w={"100%"} justify={"center"} key={e}>
          {icon && icon}
          <Flex gap={5}>
            <Text size="sm" tt={"capitalize"}>
              {e}
            </Text>
            {measure && <Text size="sm">{measure}</Text>}
          </Flex>
        </Flex>
      ))}
      <Text size="sm" mt={5} ta={"center"} c={"#666666"}>
        {subtitle}
      </Text>
    </Flex>
  );
};

export default DataDisplay;
