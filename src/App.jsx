
import Header from './components/Header';
import { Routes, Route } from 'react-router-dom';
import FullRandom from './pages/FullRandom';
import ChooseYourChamp from './pages/ChooseYourChamp';
import About from './pages/About'

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/random" element={<FullRandom />} />
        <Route path="/cyc" element={<ChooseYourChamp />} />
      </Routes>
    </div>
  );
}

export default App;
