import { Routes, Route, useLocation } from 'react-router-dom';
import 'reactjs-popup/dist/index.css';
import Layout from './components/Layout/Layout';
import NotFound from './components/NotFound/NotFound';
import PlayerModal from './components/PlayerModal/PlayerModal';
import Movies from './components/Movies/Movies';
import Starred from './components/Starred/Starred';
import WatchLater from './components/WatchLater/WatchLater';

const App = () => {
  const location = useLocation();
  const background = location.state && location.state.background;

  return (
    <>
      <Routes location={background || location}>
        <Route element={<Layout />}>
          <Route
            index
            element={<Movies />}
          />
          <Route
            path="/starred"
            element={<Starred />}
          />
          <Route
            path="/watch-later"
            element={<WatchLater />}
          />
          <Route
            path="*"
            element={<NotFound />}
          />
        </Route>
      </Routes>
      {background && (
        <Routes>
          <Route
            path="modal/:id"
            element={<PlayerModal />}
          />
        </Routes>
      )}
    </>
  );
};

export default App;
