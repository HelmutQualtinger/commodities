import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CommodityGoldRatio = () => {
  const years = [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025];

  // Data sources: World Bank Commodity Price Database (2000-2025), currency data from OANDA/Trading Economics
  // Note: Prices for 2025 are annual averages; 2026 data not included as year is still in progress

  const Gold = [279.11, 271.04, 309.73, 363.38, 409.72, 444.74, 603.46, 695.39, 871.96, 972.35, 1224.53, 1571.52, 1668.98, 1411.23, 1266.40, 1160.06, 1250.74, 1257.12, 1269.23, 1392.60, 1770.25, 1799.63, 1800.09, 1940.54, 2389.18, 3441.51];

  const commodities = {
    Gold: Gold,
    Dollar: [1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00],
    CHF: [0.59, 0.59, 0.64, 0.74, 0.81, 0.80, 0.80, 0.83, 0.93, 0.92, 0.96, 1.12, 1.06, 1.08, 1.09, 1.00, 0.99, 1.02, 1.02, 1.01, 1.06, 1.10, 1.04, 1.11, 1.15, 1.18],
    EUR: [0.92, 0.89, 0.94, 0.88, 0.81, 0.81, 0.79, 0.73, 0.72, 0.72, 0.75, 0.72, 0.78, 0.75, 0.75, 0.90, 0.90, 0.88, 0.85, 0.89, 0.88, 0.85, 0.95, 0.93, 0.92, 0.92],
    Lohn: [14.02, 14.36, 14.55, 14.83, 15.17, 15.57, 16.09, 16.68, 17.37, 17.78, 18.32, 18.96, 19.45, 19.96, 20.48, 20.99, 21.50, 22.05, 22.71, 23.32, 23.87, 24.92, 26.09, 27.35, 28.95, 33.50],
    Strom: [0.08, 0.09, 0.09, 0.10, 0.11, 0.12, 0.13, 0.14, 0.16, 0.15, 0.17, 0.19, 0.20, 0.21, 0.22, 0.21, 0.20, 0.21, 0.22, 0.23, 0.24, 0.28, 0.35, 0.32, 0.30, 0.30],
    Öl: [28.23, 24.35, 24.93, 28.90, 37.73, 54.43, 65.39, 72.70, 97.64, 61.86, 79.64, 110.94, 111.97, 108.86, 98.94, 52.37, 44.05, 54.39, 71.07, 64.03, 42.30, 70.44, 99.82, 82.62, 80.70, 69.04],
    Brent: [28.27, 24.42, 24.97, 28.85, 38.30, 54.43, 65.39, 72.70, 97.64, 61.86, 79.64, 110.94, 111.97, 108.86, 98.94, 52.37, 44.05, 54.39, 71.07, 64.03, 42.30, 70.44, 99.82, 82.62, 80.70, 69.04],
    Erdgas: [3.87, 3.96, 3.36, 5.55, 5.89, 9.02, 6.91, 6.98, 8.86, 3.99, 4.38, 4.00, 2.76, 3.73, 4.37, 2.62, 2.52, 2.99, 3.15, 2.56, 2.03, 3.91, 6.45, 2.54, 2.21, 3.95],
    Pflanzenöl: [0.42, 0.38, 0.52, 0.56, 0.51, 0.52, 0.58, 0.93, 1.25, 0.75, 0.98, 1.19, 1.05, 0.87, 0.82, 0.68, 0.74, 0.82, 0.68, 0.70, 0.90, 1.45, 1.89, 1.15, 0.95, 0.88],
    Weizen: [98.91, 107.72, 129.96, 138.58, 144.44, 135.72, 158.97, 238.59, 271.52, 185.95, 229.68, 285.91, 295.37, 276.73, 245.21, 206.38, 176.30, 178.18, 203.89, 211.28, 227.74, 281.66, 381.92, 257.74, 230.88, 219.62],
    Mais: [186.50, 200.00, 274.00, 251.00, 206.00, 200.00, 304.00, 376.00, 478.00, 356.00, 478.00, 622.00, 693.00, 539.00, 370.00, 361.00, 348.00, 349.00, 360.00, 383.00, 430.00, 570.00, 744.00, 550.00, 410.00, 360.00],
    Soja: [211.83, 195.83, 212.67, 264.00, 306.50, 274.69, 268.65, 383.10, 521.87, 423.62, 447.10, 537.52, 595.51, 551.39, 484.86, 392.12, 405.45, 393.38, 394.42, 368.95, 406.64, 583.32, 675.39, 597.90, 462.49, 414.34],
    Stahl: [427, 397, 410, 422, 574, 617, 634, 642, 780, 651, 675, 750, 720, 610, 650, 480, 450, 580, 700, 580, 540, 850, 900, 750, 700, 850],
    Kupfer: [1813.47, 1578.29, 1559.48, 1779.14, 2865.88, 3678.88, 6722.13, 7118.23, 6955.88, 5149.74, 7534.78, 8828.19, 7962.35, 7332.10, 6863.40, 5510.46, 4867.90, 6169.94, 6529.80, 6010.15, 6173.77, 9317.05, 8822.37, 8490.29, 9142.14, 9947.31],
    Alu: [1549.14, 1443.63, 1349.91, 1431.29, 1715.54, 1898.31, 2569.90, 2638.18, 2572.79, 1664.83, 2173.12, 2401.39, 2023.28, 1846.67, 1867.42, 1664.68, 1604.18, 1967.65, 2108.47, 1794.49, 1703.99, 2472.85, 2705.02, 2255.74, 2419.02, 2631.70],
    Silber: [4.95, 4.38, 4.60, 4.88, 6.66, 7.31, 11.56, 13.39, 15.00, 14.64, 20.15, 35.22, 31.14, 23.85, 19.07, 15.72, 17.15, 17.07, 15.71, 16.22, 20.54, 25.16, 21.79, 23.40, 28.27, 39.80],
    Kakao: [0.91, 1.06, 1.77, 1.74, 1.55, 1.53, 1.59, 1.95, 2.58, 2.91, 3.10, 2.98, 2.40, 2.44, 3.06, 3.14, 2.89, 2.03, 2.29, 2.34, 2.57, 2.50, 2.69, 3.95, 5.50, 7.80],
    Kaffee: [0.89, 0.56, 0.62, 0.64, 0.78, 1.10, 1.04, 1.18, 1.34, 1.34, 1.77, 2.64, 1.79, 1.24, 1.87, 1.43, 1.49, 1.28, 1.12, 1.02, 1.20, 1.69, 2.28, 1.77, 2.05, 2.65],
    Hühnerfleisch: [1.31, 1.40, 1.39, 1.46, 1.67, 1.63, 1.53, 1.72, 1.87, 1.89, 1.89, 1.93, 2.08, 2.17, 2.32, 1.99, 1.85, 2.12, 2.24, 2.00, 1.63, 1.99, 1.68, 1.53, 1.46, 1.71],
    Eier: [0.94, 0.91, 0.85, 0.99, 1.08, 1.25, 1.09, 1.15, 1.86, 1.12, 1.15, 1.41, 1.62, 1.57, 1.80, 2.47, 1.68, 1.47, 1.74, 1.40, 1.51, 1.67, 2.86, 2.80, 3.50, 4.92],
    Butter: [1.85, 1.90, 1.85, 2.05, 2.20, 2.45, 2.55, 2.80, 3.60, 2.35, 2.50, 3.75, 3.45, 3.30, 3.50, 3.25, 3.40, 3.55, 3.20, 3.10, 3.45, 3.80, 4.20, 3.90, 4.50, 5.15],
    Milch: [0.65, 0.67, 0.68, 0.70, 0.73, 0.78, 0.82, 0.88, 0.95, 0.85, 0.88, 0.98, 1.05, 1.08, 1.12, 1.08, 1.10, 1.15, 1.12, 1.10, 1.15, 1.25, 1.45, 1.38, 1.42, 1.62],
    Brot: [0.95, 0.97, 0.99, 1.01, 1.04, 1.08, 1.12, 1.17, 1.25, 1.23, 1.27, 1.32, 1.37, 1.39, 1.40, 1.42, 1.44, 1.46, 1.50, 1.29, 1.51, 1.53, 1.74, 1.80, 1.86, 2.18],
    Fleisch: [2.41, 2.28, 2.33, 2.30, 2.33, 2.55, 2.65, 2.94, 3.06, 2.77, 2.97, 3.28, 3.64, 3.78, 3.89, 4.23, 3.77, 3.72, 3.85, 3.80, 4.12, 4.59, 4.81, 5.21, 5.35, 7.60],
    Kohle: [28.38, 23.00, 24.19, 29.08, 39.47, 54.64, 64.05, 70.36, 97.67, 60.95, 77.48, 92.88, 92.05, 95.98, 91.17, 46.66, 41.29, 48.80, 62.94, 54.99, 37.16, 66.14, 92.58, 75.58, 74.55, 66.00]
  };

  const [selectedCommodities, setSelectedCommodities] = useState(['Lohn', 'Dollar', 'Öl', 'Weizen', 'Silber']);
  const [basis, setBasis] = useState('Gold');
  const [timeRange, setTimeRange] = useState([years[0], years[years.length - 1]]);

  // Filter years based on range
  const startIndex = years.indexOf(timeRange[0]);
  const endIndex = years.indexOf(timeRange[1]);
  const filteredYears = years.slice(startIndex, endIndex + 1);

  // Calculate ratios based on selected basis (inverted: commodity/basis)
  const ratios = {};
  const basisArray = commodities[basis];
  
  Object.keys(commodities).forEach(name => {
    // Only map the full range first, will slice later for display data
    ratios[name] = years.map((year, i) => commodities[name][i] / basisArray[i]);
  });

  // Create indexed data with base year = start of selected range = 100
  const data = filteredYears.map((year, i) => {
    // i is the index within the filtered array
    // actualIndex is the index in the original full arrays
    const actualIndex = startIndex + i;
    const point = { year };
    
    Object.keys(commodities).forEach(name => {
      const baseValue = ratios[name][startIndex]; // Normalize to the start of the selection
      const currentValue = ratios[name][actualIndex];
      point[name] = (currentValue / baseValue) * 100;
    });
    return point;
  });

  const colors = {
    Gold: '#fbbf24',
    Dollar: '#22c55e',
    CHF: '#ef4444',
    EUR: '#3b82f6',
    Lohn: '#8b5cf6',
    Strom: '#3b82f6',
    Öl: '#000000',
    Brent: '#404040',
    Erdgas: '#0ea5e9',
    Weizen: '#eab308',
    Mais: '#f59e0b',
    Soja: '#84cc16',
    Stahl: '#64748b',
    Kupfer: '#d97706',
    Alu: '#94a3b8',
    Silber: '#a1a1aa',
    Pflanzenöl: '#65a30d',
    Kakao: '#92400e',
    Kaffee: '#78350f',
    Hühnerfleisch: '#fb923c',
    Eier: '#fcd34d',
    Butter: '#fde047',
    Milch: '#60a5fa',
    Brot: '#d97706',
    Fleisch: '#dc2626',
    Kohle: '#A52A2A'
  };

  const toggleCommodity = (name) => {
    setSelectedCommodities(prev => 
      prev.includes(name) 
        ? prev.filter(c => c !== name)
        : [...prev, name]
    );
  };

  const handleRangeChange = (index, value) => {
    const newRange = [...timeRange];
    newRange[index] = parseInt(value);
    
    // Prevent crossing
    if (index === 0 && newRange[0] > newRange[1]) newRange[0] = newRange[1];
    if (index === 1 && newRange[1] < newRange[0]) newRange[1] = newRange[0];
    
    setTimeRange(newRange);
  };

  return (
    <div className="w-full h-full p-6 bg-gray-50">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-2">Rohstoffpreis-Index (Basis {timeRange[0]} = 100)</h2>
        <p className="text-gray-600 mb-4">Wie sich die Kaufkraft der Rohstoffe seit {timeRange[0]} verändert hat</p>
        
        <div className="mb-4 flex gap-4 items-center flex-wrap">
          <span className="font-medium">Bezugswert:</span>
          <button
            onClick={() => setBasis('Gold')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              basis === 'Gold'
                ? 'bg-yellow-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Gold
          </button>
          <button
            onClick={() => setBasis('Dollar')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              basis === 'Dollar'
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Dollar
          </button>
          <button
            onClick={() => setBasis('CHF')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              basis === 'CHF'
                ? 'bg-red-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            CHF
          </button>
          <button
            onClick={() => setBasis('EUR')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              basis === 'EUR'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            EUR
          </button>
          <button
            onClick={() => setBasis('Lohn')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              basis === 'Lohn'
                ? 'bg-purple-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Lohn
          </button>
        </div>

        {/* Dual Range Slider */}
        <div className="mb-8 px-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Zeitraum: {timeRange[0]} - {timeRange[1]}</label>
          <div className="relative h-2 bg-gray-200 rounded-full">
            {/* Active Range Highlight */}
            <div 
              className="absolute h-full bg-blue-500 rounded-full pointer-events-none"
              style={{
                left: `${((timeRange[0] - years[0]) / (years[years.length - 1] - years[0])) * 100}%`,
                right: `${100 - ((timeRange[1] - years[0]) / (years[years.length - 1] - years[0])) * 100}%`
              }}
            ></div>
            
            {/* Sliders */}
            <input
              type="range"
              min={years[0]}
              max={years[years.length - 1]}
              value={timeRange[0]}
              onChange={(e) => handleRangeChange(0, e.target.value)}
              className="absolute w-full h-full opacity-0 cursor-pointer pointer-events-auto z-10"
              style={{ pointerEvents: 'none' }} 
            />
            {/* We need a specific CSS hack to make the second slider clickable through the first one where they don't overlap. 
                However, standard range inputs stack. A common trick is setting pointer-events to none on the input, 
                and pointer-events to auto on the thumb. Since we can't easily style the thumb in inline styles comfortably across browsers,
                we will position two inputs.
                Actually, simpler approach for this constraints: 
                Just two regular inputs, but we want the visual of a dual slider.
                Let's try the absolute positioning with z-index manipulation or just two inputs side-by-side if it fails?
                No, the prompt asked for "einen Schieberegler mit zwei Reitern". 
                
                Let's use the 'accent-color' or standard appearance.
                The inputs need to be effectively transparent but clickable. 
                But if one is on top of the other, it blocks clicks.
                
                Correction: The standard way without libs is tricky. 
                Let's try a simpler layout: Two range inputs stacked, but using a specific className to allow click-through?
                No, React 'style' prop is safer.
                
                Actually, let's just use two distinct sliders for "Start" and "End" if we can't do a perfect dual one,
                OR use the standard "two inputs on top of each other" trick where `pointer-events: none` is set on the input
                and `pointer-events: auto` on `::-webkit-slider-thumb`.
                Since I can use Tailwind, I can add a custom class or style block.
            */}
             <style>{`
              input[type=range]::-webkit-slider-thumb {
                pointer-events: auto;
                appearance: none;
                height: 16px;
                width: 16px;
                background: #3b82f6;
                border-radius: 50%;
                cursor: pointer;
                margin-top: -6px; /* center thumb */
                position: relative;
                z-index: 20;
              }
              input[type=range]::-moz-range-thumb {
                pointer-events: auto;
                height: 16px;
                width: 16px;
                background: #3b82f6;
                border-radius: 50%;
                cursor: pointer;
                border: none;
                z-index: 20;
              }
              .dual-range-input {
                pointer-events: none;
                position: absolute;
                height: 0;
                width: 100%;
                outline: none;
                z-index: 10;
              }
            `}</style>
             <input
              type="range"
              min={years[0]}
              max={years[years.length - 1]}
              value={timeRange[0]}
              onChange={(e) => handleRangeChange(0, e.target.value)}
              className="dual-range-input top-1"
            />
            <input
              type="range"
              min={years[0]}
              max={years[years.length - 1]}
              value={timeRange[1]}
              onChange={(e) => handleRangeChange(1, e.target.value)}
              className="dual-range-input top-1"
            />
          </div>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {Object.keys(commodities).map(name => (
            <button
              key={name}
              onClick={() => toggleCommodity(name)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                selectedCommodities.includes(name)
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {name}
            </button>
          ))}
        </div>

        <ResponsiveContainer width="100%" height={500}>
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis 
              label={{ value: `Index (${timeRange[0]} = 100)`, angle: -90, position: 'insideLeft' }}
            />
            <Tooltip 
              formatter={(value) => value.toFixed(1)}
              labelFormatter={(label) => `Jahr: ${label}`}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="baseline"
              stroke="#e5e7eb"
              strokeWidth={5}
              strokeDasharray="5 5"
              dot={false}
              data={data.map(d => ({ ...d, baseline: 100 }))}
              name={`Basis (${timeRange[0]})`}
            />
            {selectedCommodities.map(name => (
              <Line
                key={name}
                type="monotone"
                dataKey={name}
                stroke={colors[name]}
                strokeWidth={5}
                dot={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>

        <div className="mt-6 text-sm text-gray-600">
          <p><strong>Interpretation:</strong> Werte über 100 bedeuten, dass der Rohstoff TEURER geworden ist (im Verhältnis zu {basis}).</p>
          <p>Werte unter 100 bedeuten, dass der Rohstoff BILLIGER geworden ist (im Verhältnis zu {basis}).</p>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Rohstoffpreise (in {basis === 'Gold' ? 'USD' : 'CHF'})</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold">Rohstoff</th>
                  {filteredYears.map(year => (
                    <th key={year} className="border border-gray-300 px-2 py-2 text-right font-semibold">{year}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.keys(commodities).map((name, idx) => (
                  <tr key={name} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="border border-gray-300 px-3 py-2 font-medium">{name}</td>
                    {commodities[name].slice(startIndex, endIndex + 1).map((value, i) => (
                      <td key={i} className="border border-gray-300 px-2 py-2 text-right">
                        {value.toLocaleString('de-CH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommodityGoldRatio;