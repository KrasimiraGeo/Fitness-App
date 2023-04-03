import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home';
import { Navbar } from './components/Navbar';
import { LandingPage } from './pages/LandingPage';
import { Stats } from './pages/Stats'
//Browser Router wraps everywhere we want to use it

// TODO: workout details should be in a different page

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        
        <div className='pages'>
          <Routes>
            {/* <Route 
            path='/'
            element={<LandingPage />}
            /> */}
            <Route
              path='/' 
              element={<Home />}
            />
            
            <Route
              path='/stats'
              element={<Stats />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
