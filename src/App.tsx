import { useEffect } from "react";
import { Main } from "./app/components/Main";
import { useAppDispatch, useAppSelector } from "./app/store/hooks";
import { getRaces, selectStatus, EStatus } from "./app/store/slices/razesSlice";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RaceDetail } from "./app/components/RaceDetail";
import { Box, CircularProgress } from "@mui/material";
function App() {
  /*** HOOKS ****/
  const dispatch = useAppDispatch();

  const status = useAppSelector(selectStatus);
  /*** EFFECTS ****/
  useEffect(() => {
    dispatch(getRaces());
  }, [dispatch]);

  return (
    <div className="App">
      {status === EStatus.loading ? (
        <Box mt={"50vh"} textAlign={"center"}>
          <CircularProgress />
        </Box>
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/:race" element={<RaceDetail />} />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
