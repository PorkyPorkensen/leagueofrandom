
import Header from './components/Header';
import { Routes, Route } from 'react-router-dom';
import FullRandom from './pages/FullRandom';
import ChooseYourChamp from './pages/ChooseYourChamp';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<FullRandom />} />
        <Route path="/cyc" element={<ChooseYourChamp />} />
      </Routes>
    </div>
  );
}

export default App;
