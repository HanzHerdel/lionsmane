import { Box, Grid, Typography } from "@mui/material";

import { useAppSelector } from "../store/hooks";
import {
  selectAllRaces,
} from "../store/slices/razesSlice";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export function RaceList() {
  const [racesArray, setracesArray] = useState<Array<string>>([]);
  const races = useAppSelector(selectAllRaces);
  useEffect(() => {
    setracesArray(Object.keys(races));
    return () => {};
  }, [races]);

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      {racesArray.length
        ? racesArray.map((race, idx) => (
            <Box mt={1} key={idx}>
              <Link to={`/${race}`}>
                <Typography variant="h4" component="h2" textAlign={"center"}>
                  {race}
                </Typography>
              </Link>
            </Box>
          ))
        : "No Races"}
    </Grid>
  );
}
