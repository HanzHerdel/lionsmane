import { Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import { Header } from "./Header";
import { selectRace } from "../store/slices/razesSlice";
import { useAppSelector } from "../store/hooks";

export function RaceDetail() {
  const params = useParams();
  const raceList = useAppSelector(selectRace(params.race || ""));
  return (
    <Grid item xs={12}>
      <Header title={params.race} />
      Race pick here
    </Grid>
  );
}
