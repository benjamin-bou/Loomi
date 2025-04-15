import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import BoxesList from './BoxesList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/boxes" element={<BoxesList />} />
      </Routes>
    </Router>
  );
}

export default App;
