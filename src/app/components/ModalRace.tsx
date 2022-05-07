import {
  Modal,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
} from "@mui/material";
import { useEffect } from "react";
import { getRandomSubRacePics } from "../api/api";
import { useState } from "react";
import { Divider } from "@mui/material";
import { setFavorite } from "../store/slices/razesSlice";
import { useAppDispatch } from "../store/hooks";
import { CardRace } from "./CardRace";

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
  width: "80vw",
  maxHeight: "80vh",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
};
export function ModalRace({
  open = false,
  race = "",
  subRace = "",
  closeModal,
}: IModal) {
  const [images, setImages] = useState([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const _getRandomSubRacePics = async () => {
      const res = await getRandomSubRacePics(race, subRace);
      res.result && setImages(res.result);
    };
    race && subRace && _getRandomSubRacePics();

    return () => {};
  }, [race, subRace]);

  const handleSetFavorite = () => {
    dispatch(setFavorite({ race: race, image: images[0], subRace: subRace }));
    closeModal(null)
  };

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      onClose={() => closeModal(null)}
    >
      <Card sx={style}>
        <CardRace images={images} race={race} subRace={subRace} />
        <Button
          variant="contained"
          style={{ position: "absolute", bottom: "24px" }}
          onClick={handleSetFavorite}
        >
          favourite
        </Button>
      </Card>
    </Modal>
  );
}
