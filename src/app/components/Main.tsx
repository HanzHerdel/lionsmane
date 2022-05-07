import { Card, Grid } from "@mui/material";

import { Header } from "./Header";
import { RaceList } from "./RaceList";
import { useAppSelector } from "../store/hooks";
import { selectAllRaces, selectFavorite } from "../store/slices/razesSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CardRace } from "./CardRace";

export function Main() {
  const navigate = useNavigate();
  const [racesArray, setracesArray] = useState<Array<string>>([]);
  const races = useAppSelector(selectAllRaces);
  const favorite = useAppSelector(selectFavorite);

  useEffect(() => {
    setracesArray(Object.keys(races));
  }, [races]);

  return (
    <Grid container spacing={2}>
      <Header />
      {favorite && (
        <Grid>
          <Card style={{margin: '10px auto'}} >
            <CardRace
              subRace={favorite.subRace}
              images={[favorite.image]}
              race={`Favourite: ${favorite.race}`}
            />
          </Card>
        </Grid>
      )}
      <RaceList
        handleClick={(race: string = "") => navigate(race)}
        racesArray={racesArray}
      />
    </Grid>
  );
}
