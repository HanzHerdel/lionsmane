import { Modal, Box, Typography } from "@mui/material";

interface IModal {
  open: boolean;
  race: string | null;
  closeModal:React.Dispatch<React.SetStateAction<null>>;
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
export function ModalRace({ open = false, race = null, closeModal }: IModal) {
  console.log("race: ", race);

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      onClose={()=>closeModal(null)}
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {race}
        </Typography>
      </Box>
    </Modal>
  );
}
