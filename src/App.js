import React from 'react';
import { BrowserRouter as Router, Route, Link, Outlet, Routes } from 'react-router-dom';
import Recommender from './demos/recommender/Recommender';
import VisualSearch from './demos/visual-search/VisualSearch';
import TraitSearch from './demos/trait-search/TraitSearch';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/demo/recommender">Recommender</Link>
            </li>
            <li>
              <Link to="/demo/visual-search">Visual Search</Link>
            </li>
            <li>
              <Link to="/demo/trait-search">Trait Search</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/demo/recommender" element={<Recommender />} />
          <Route path="/demo/visual-search" element={<VisualSearch />} />
          <Route path="/demo/trait-search" element={<TraitSearch />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
