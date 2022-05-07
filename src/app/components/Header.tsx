import { Divider, Grid, Typography } from '@mui/material';
import React from 'react';

import Box from '@mui/material/Box';

interface IHeader {
    title?: string;
}

export function Header({title='Dog Races Window'}:IHeader) {

return (
<Grid container spacing={2}>
  <Grid item xs={12} >
    <Box mt={2}>

    <Typography variant="h2" component="h2" textAlign={'center'}>
      {title}
    </Typography>
    </Box>
    <Divider/>
  </Grid>
</Grid>
  );
}
