import "./App.css";
import Home from "./views/Home";
import Details from "./views/Details";
import { AppShell } from "@mantine/core";
import { useEffect, useState } from "react";
import { Pokemon } from "./types/pokemonTypes";
import { useForm } from "@mantine/form";
import { fetchPokemon } from "./utils/fetchPokemon";

function App() {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [lastPokemon, setLastPokemon] = useState<number | null>(null);

  const form = useForm({
    mode: "controlled",
    initialValues: {
      path: "",
      pokemonName: "",
    },
  });

  async function getPokemon(pokemonName: string | number): Promise<void> {
    try {
      const data: Pokemon | undefined = await fetchPokemon(pokemonName);
      if (data) setPokemon(data);
      form.reset();
    } catch (error) {
      console.log(error);
      form.setErrors({ pokemonName: "Pokemon not found" });
    }
  }

  async function getLastPokemonId(): Promise<void> {
    try {
      const res = await fetch(
        "https://pokeapi.co/api/v2/pokemon-species/?limit=0"
      );
      const data = await res.json();
      setLastPokemon(data.count);
    } catch (error) {
      console.error("Failed to fetch last Pokemon ID", error);
    }
  }

  function closeDetails(): void {
    setPokemon(null);
  }

  useEffect(() => {
    getLastPokemonId();
    document.title = "Home";
  }, []);

  return (
    <>
      <AppShell
        header={{ height: !pokemon ? 60 : 0 }}
        bg="#DC0A2D"
        pos={"relative"}
      >
        <AppShell.Main maw={500} mx={"auto"} h={"100%"}>
          {pokemon ? (
            <Details
              key={pokemon.id}
              data={pokemon}
              handleClose={closeDetails}
              lastPokemon={lastPokemon}
              getPokemon={getPokemon}
            />
          ) : (
            <Home handleSubmit={getPokemon} form={form} />
          )}
        </AppShell.Main>
      </AppShell>
    </>
  );
}

export default App;
