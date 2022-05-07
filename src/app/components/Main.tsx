import { Grid } from '@mui/material';

import { Header } from './Header';
import { RaceList } from './RaceList';

export function Main() {

return (
  <Grid container spacing={2}>
      <Header/>
    <RaceList/>
  </Grid>
);
}
