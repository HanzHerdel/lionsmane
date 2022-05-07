import { Grid } from "@mui/material";

import { Header } from "./Header";
import { RaceList } from "./RaceList";
import { useAppSelector } from "../store/hooks";
import { selectAllRaces } from "../store/slices/razesSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Main() {
  const navigate = useNavigate();
  const [racesArray, setracesArray] = useState<Array<string>>([]);
  const races = useAppSelector(selectAllRaces);
  useEffect(() => {
    setracesArray(Object.keys(races));
  }, [races]);

  return (
    <Grid container spacing={2}>
      <Header />
      <RaceList
        handleClick={(race: string = "") => navigate(race)}
        racesArray={racesArray}
      />
    </Grid>
  );
}
