import { Box, Button, Grid, Typography } from "@mui/material";

interface IRaceList {
    racesArray?: Array<string>;
    handleClick: Function
}


export function RaceList({racesArray=[], handleClick=()=>{}}:IRaceList) {
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
              <Button onClick={()=>handleClick(race)}>
                <Typography variant="h4" component="h2" textAlign={"center"}>
                  {race}
                </Typography>
              </Button>
            </Box>
          ))
        : "No Races"}
    </Grid>
  );
}
