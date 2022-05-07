import { Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import { Header } from "./Header";
import {
    clearAvatars,
  getAvatarRaces,
  selectAvatarRaces,
  selectRace,
} from "../store/slices/razesSlice";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { RaceList } from "./RaceList";
import { ModalRace } from "./ModalRace";
import { useState, useEffect } from "react";

interface DinamicObject {
  [key: string]: any;
}

export function RaceDetail() {
  const [open, setOpen] = useState(false);

  const dispatch = useAppDispatch();
  const [selectedSubRace, setSelectedSubRace] = useState<string | undefined>();

  const { race } = useParams();
  const subRaceList = useAppSelector(selectRace(race || ""));
  const subRaceAvatars = useAppSelector(selectAvatarRaces());

  /**
   * collect pictures urls from race and subrace and store them as dictionary to retrieve random pics
   */
  useEffect(() => {
    const urlsDictionary =
      subRaceList && race
        ? subRaceList.reduce((acc, subRace) => {
            const url = `https://dog.ceo/api/breed/${race}/${subRace}/images/random`;
            acc[subRace] = url;
            return acc;
          }, {} as DinamicObject)
        : null;

    urlsDictionary && dispatch(getAvatarRaces(urlsDictionary));
    return () => {
        dispatch(clearAvatars());
    };
  }, [subRaceList, dispatch, race]);

  return (
    <>
      <Grid item xs={12}>
        <Header title={race} />
        <RaceList
          handleClick={(race: string): void => {
            setSelectedSubRace(race);
            setOpen(true);
          }}
          racesArray={subRaceList}
          avatars={subRaceAvatars}
        />
      </Grid>
      <ModalRace
        open={open}
        race={race}
        subRace={selectedSubRace}
        closeModal={() => {
          setOpen(false);
        }}
      />
    </>
  );
}
