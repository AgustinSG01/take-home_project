import { AspectRatio, Container, Flex, Image, TextInput } from "@mantine/core";
import { IoIosSearch } from "react-icons/io";
import pokemonLogo from "../assets/icons/International_Pokémon_logo.svg";

const Home = ({
  handleSubmit,
  form,
}: {
  handleSubmit: (pokemonName: string) => void;
  form: any;
}) => {
  return (
    <Flex
      align="center"
      gap={50}
      pos={"absolute"}
      left={0}
      right={0}
      top={0}
      bottom={0}
      direction={"column"}
      justify={"center"}
    >
      <AspectRatio ratio={16 / 9} maw={500}>
        <Image src={pokemonLogo} alt="pokemon_logo" fit="contain" />
      </AspectRatio>
      <Container h={50}>
        <form
          onSubmit={form.onSubmit((values) => handleSubmit(values.pokemonName))}
          target="_self"
        >
          <TextInput
            placeholder="Search for a Pokemon"
            leftSection={<IoIosSearch color="#DC0A2D" size={25} />}
            key={form.key("pokemonName")}
            {...form.getInputProps("pokemonName", {
              onChange: () => form.clearErrors(),
            })}
            classNames={{ input: "searchInput" }}
            radius={20}
            error={form.errors.pokemonName}
            size="lg"
            styles={{
              error: {
                color: "yellow",
              },
            }}
          />
        </form>
      </Container>
    </Flex>
  );
};

export default Home;
