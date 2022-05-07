import { useEffect } from 'react';
import { Main } from './app/components/MainLayout';
import { useAppDispatch } from './app/store/hooks';
import { getRaces } from './app/store/slices/razesSlice';

import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
  /*** HOOKS ****/
  const dispatch = useAppDispatch();
  /*** EFFECTS ****/
  useEffect(() => {
    dispatch(getRaces())
  }, [dispatch])

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Main />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
