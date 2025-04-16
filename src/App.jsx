import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import BoxesList from './BoxesList';
import BoxDetails from './BoxDetails';
import NotFound from './NotFound';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/boxes" element={<BoxesList />} />
        <Route path="/boxes/:id" element={<BoxDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
