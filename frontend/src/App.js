import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home';
import { Navbar } from './components/Navbar';
import { LandingPage } from './pages/LandingPage';
//Browser Router wraps everywhere we want to use it

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      <LandingPage/>
        <div className='pages'>
          <Routes>
            <Route
              path='/'
              element={<Home/>}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
