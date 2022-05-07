import { Grid } from '@mui/material';

import { Header } from './Header';

export function Main() {

return (
  <Grid container spacing={2}>
    <Grid item xs={12} >
      <Header/>
    </Grid>
  </Grid>
);
}
