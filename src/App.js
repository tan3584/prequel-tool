import React from 'react';
import bossData from './bossData.json';
import BossGrid from './components/BossGrid';

const BossZone = ({ zone, bossesData }) => {
  return (
    <div className="boss-zone">
      <h5 style={{ color: bossesData.color }} className="zone-title">{zone} {bossesData.food}</h5>
      <div className="bosses">
        {bossesData.bosses.map((boss, index) => (
          <BossGrid key={index} boss={boss} />
        ))}
      </div>
    </div >
  );
};

const App = () => {
  return (
    <div className="App">
      <div className="boss-table">
        {Object.entries(bossData).map(([zone, bossesAndFood]) => (
          <BossZone key={zone} zone={zone} bossesData={bossesAndFood} />
        ))}
      </div>
    </div>
  );
};

export default App;