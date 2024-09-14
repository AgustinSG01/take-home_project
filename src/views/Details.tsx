import { Pokemon } from "../types/pokemonTypes";
import {
  ActionIcon,
  Badge,
  Button,
  Center,
  Flex,
  Image,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { defaultColor, typeColor } from "../utils/pokemonUtils";
import styles from "../styles/details.module.css";
import {
  IoMdArrowRoundBack,
  IoIosArrowBack,
  IoIosArrowForward,
} from "react-icons/io";
import DataDisplay from "../components/DataDisplay.js";
import { TbWeight, TbRulerMeasure } from "react-icons/tb";
import StatDisplay from "../components/StatDisplay.js";
import { useEffect, useState } from "react";

const Details = ({
  data,
  lastPokemon,
  handleClose,
  getPokemon,
}: {
  data: Pokemon;
  lastPokemon: number | null;
  handleClose: () => void;
  getPokemon: (id: number) => void;
}) => {
  const [loadingImage, setLoadingImage] = useState(true);

  const primaryTypeColor = typeColor[data.types[0]] || defaultColor;

  const description: string | undefined = data.description?.replace(/\f/g, " ");

  useEffect(() => {
    setLoadingImage(true);
    document.title = data.name;
  }, [data]);

  return (
    <Flex
      direction={"column"}
      bg={primaryTypeColor}
      w={"100%"}
      h={"100vh"}
      align={"center"}
      className={styles.generalContainer}
      p={8}
    >
      <Flex
        justify={"space-between"}
        style={{ borderRadius: 20 }}
        className={styles.header}
        w={"100%"}
        h={200}
        align={"self-start"}
        pt={20}
        px={10}
      >
        <Flex
          gap={10}
          className={styles.backAndName}
          align={"center"}
          pos={"relative"}
        >
          <ActionIcon
            variant="transparent"
            aria-label="Go Back"
            color="white"
            size={"md"}
            onClick={handleClose}
          >
            {<IoMdArrowRoundBack size={"100%"} />}
          </ActionIcon>
          <Text c="white" size="xl" fw={"bold"} tt={"capitalize"}>
            {data.name}
          </Text>
        </Flex>
        <Text c="white" size="md" fw={"bold"}>
          #{data.id}
        </Text>
        <Flex
          justify={"space-between"}
          align={"center"}
          className={styles.imageContainer}
        >
          <Button
            variant="transparent"
            c="white"
            size="md"
            disabled={data.id <= 1}
            onClick={() => getPokemon(data.id - 1)}
            aria-label="Previous Pokemon"
          >
            <IoIosArrowBack size={"30px"} />
          </Button>
          <Image
            src={data.image}
            alt={`${data.name} normal image`}
            width={160}
            height={160}
            onLoad={() => setLoadingImage(false)}
            style={{
              filter: loadingImage ? "blur(10px)" : "none",
              transition: "filter 0.3s ease-out",
            }}
          />
          <Button
            variant="transparent"
            c="white"
            size="md"
            disabled={lastPokemon ? data.id >= lastPokemon : true}
            onClick={() => getPokemon(data.id + 1)}
            aria-label="Next Pokemon"
          >
            <IoIosArrowForward size={"30px"} />
          </Button>
        </Flex>
      </Flex>
      <Stack
        className={styles.dataContainer}
        w={"100%"}
        gap={20}
        flex={1}
        bg="white"
      >
        <Center mt={50} w={"90%"} mx={"auto"}>
          {data.types.map((e) => (
            <Badge color={typeColor[e]} mx={"10"} size="md" key={e}>
              {e}
            </Badge>
          ))}
        </Center>
        <Center w={"90%"} mx={"auto"}>
          <Title size="1.5rem" c={primaryTypeColor}>
            About
          </Title>
        </Center>
        <Flex w={"90%"} mx={"auto"} justify={"space-between"}>
          <DataDisplay
            texts={[data.weight / 10]}
            measure="kg"
            icon={<TbWeight size={20} />}
            subtitle="Weight"
            rightBorder={true}
          />
          <DataDisplay
            texts={[data.height / 10]}
            measure="m"
            icon={<TbRulerMeasure size={20} />}
            subtitle="Height"
          />
          <DataDisplay
            texts={data.abilities}
            subtitle="Moves"
            leftBorder={true}
          />
        </Flex>
        <Text w={"90%"} mx={"auto"} size="md">
          {description && description}
        </Text>
        <Center w={"90%"} mx={"auto"}>
          <Title size="1.5rem" c={primaryTypeColor}>
            Base Stats
          </Title>
        </Center>
        <Stack gap={0} w={"90%"} mx={"auto"} mb={5}>
          {data.stats &&
            data.stats.map((stat) => (
              <StatDisplay
                statLevel={stat.base_stat}
                typeColor={primaryTypeColor}
                statName={stat.name}
                key={stat.name}
              />
            ))}
        </Stack>
      </Stack>
    </Flex>
  );
};

export default Details;
