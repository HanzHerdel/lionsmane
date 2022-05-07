import { Divider, Grid, Typography, Button } from "@mui/material";

import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

interface IHeader {
  title?: string;
}

export function Header({ title = "Dog Races Window" }: IHeader) {
  const navigate = useNavigate();
  return (
    <Grid item xs={12}>
      <Button
        sx={{ position: "absolute", margin: 2 }}
        onClick={() => navigate("/")}
        variant="text"
      >
        Main
      </Button>
      <Box mt={2}>
        <Typography variant="h2" component="h2" textAlign={"center"}>
          {title}
        </Typography>
      </Box>
      <Divider />
    </Grid>
  );
}
