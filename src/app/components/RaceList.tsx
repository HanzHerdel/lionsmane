import {
  Avatar,
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { Fragment } from "react";
import { DinamicObject } from "../domain/interfaces";

interface IRaceList {
  racesArray?: Array<string>;
  handleClick: Function;
  avatars?: DinamicObject | null;
}

export function RaceList({
  racesArray = [],
  handleClick = () => {},
  avatars = null,
}: IRaceList) {
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      {racesArray.length ? (
        <List
          sx={{
            width: "100%",
            bgcolor: "background.paper",
            marginLeft: "2vh",
          }}
        >
          {racesArray.map((race, idx) => (
            <Fragment key={idx}>
              <ListItem onClick={() => handleClick(race)} component={Button}>
                {avatars && (
                  <Avatar
                    sx={{ marginRight: "8px" }}
                    alt="race"
                    src={avatars[race]}
                  />
                )}
                <Typography variant="h5" component="h2" textAlign={"center"}>
                  {race}
                </Typography>
              </ListItem>
              <Divider />
            </Fragment>
          ))}
        </List>
      ) : (
        "No Races"
      )}
    </Grid>
  );
}
