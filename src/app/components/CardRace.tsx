import { Typography, Grid, CardMedia, CardContent } from "@mui/material";
import { Divider } from "@mui/material";

interface ICardRace {
  race: string | undefined;
  subRace: string | undefined;
  images: Array<string>;
}

export function CardRace({ images = [], race, subRace }: ICardRace) {
  return (
    <>
      <Typography ml={2} mb={2} variant="h3">{race}</Typography>
      <Divider />
      <Grid
        style={{ maxHeight: "74vh", overflowY: "auto" }}
        container
        alignItems="center"
        justifyContent="center"
        spacing={2}
      >
        {images.map((image, idx) => (
          <Grid key={idx} item xs={12} sm={6} md={4} textAlign={'center'}>
            <CardMedia
              component="img"
              height={"20%"}
              image={image}
              alt={race}
            />
          </Grid>
        ))}
      </Grid>
      <Divider />
      <CardContent>
        {subRace && (
          <Typography variant="body2" color="text.secondary" align="right">
            {subRace}
          </Typography>
        )}
      </CardContent>
    </>
  );
}
