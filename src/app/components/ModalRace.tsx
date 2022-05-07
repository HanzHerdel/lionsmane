import {
  Modal,
  Box,
  Typography,
  Grid,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
} from "@mui/material";
import { useEffect } from "react";
import { getRandomSubRacePics } from "../api/api";
import { useState } from "react";
import { Divider } from '@mui/material';

interface IModal {
  open: boolean;
  race: string | undefined;
  subRace: string | undefined;
  closeModal: React.Dispatch<React.SetStateAction<null>>;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export function ModalRace({
  open = false,
  race = "",
  subRace = "",
  closeModal,
}: IModal) {
  const [images, setImages] = useState([]);
  useEffect(() => {
    const _getRandomSubRacePics = async () => {
      const res = await getRandomSubRacePics(race, subRace);
      res.result && setImages(res.result);
    };
    _getRandomSubRacePics();

    return () => {};
  }, [race, subRace]);

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      onClose={() => closeModal(null)}
    >
      <Card sx={style}>
        <CardHeader title={race} titleTypographyProps={{variant:'h3' }} />
        <Divider/>
        <Grid container alignItems="center" justifyContent="center" spacing={2}>
          {images.map((image) => (
            <Grid item xs={12} sm={6} md={4}>
              <CardMedia
                component="img"

                image={image}
                alt={race}
              />
            </Grid>
          ))}
        </Grid>
        <Divider/>
        <CardContent >
          <Typography variant="body2" color="text.secondary" align='right'>
            {subRace}
          </Typography>
        </CardContent>
      </Card>
    </Modal>
  );
}
