type Stats = {
  base_stat: number;
  name: string;
};

export type Pokemon = {
  id: number;
  name: string;
  types: string[];
  image: string;
  imageShiny: string | null;
  weight: number;
  height: number;
  stats: Stats[];
  abilities: string[];
  description: string | null;
};
