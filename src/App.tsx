import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CommodityGoldRatio = () => {
  const years = [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025];
  
  const Gold = [279.11, 271.04, 309.73, 363.38, 409.72, 444.74, 603.46, 695.39, 871.96, 972.35, 1224.53, 1571.52, 1668.98, 1411.23, 1266.40, 1160.06, 1250.74, 1257.12, 1269.23, 1392.60, 1770.25, 1799.63, 1800.09, 1940.54, 2389.18, 3257.71];
  
  const commodities = {
    Gold: Gold,
    Dollar: [1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00],
    CHF: [0.59, 0.59, 0.64, 0.74, 0.81, 0.80, 0.80, 0.83, 0.93, 0.92, 0.96, 1.12, 1.06, 1.08, 1.09, 1.00, 0.99, 1.02, 1.02, 1.01, 1.06, 1.10, 1.04, 1.11, 1.15, 1.18],
    EUR: [0.92, 0.89, 0.94, 0.88, 0.81, 0.81, 0.79, 0.73, 0.72, 0.72, 0.75, 0.72, 0.78, 0.75, 0.75, 0.90, 0.90, 0.88, 0.85, 0.89, 0.88, 0.85, 0.95, 0.93, 0.92, 0.92],
    Lohn: [14.02, 14.36, 14.55, 14.83, 15.17, 15.57, 16.09, 16.68, 17.37, 17.78, 18.32, 18.96, 19.45, 19.96, 20.48, 20.99, 21.50, 22.05, 22.71, 23.32, 23.87, 24.92, 26.09, 27.35, 28.95, 32.56],
    Strom: [0.08, 0.09, 0.09, 0.10, 0.11, 0.12, 0.13, 0.14, 0.16, 0.15, 0.17, 0.19, 0.20, 0.21, 0.22, 0.21, 0.20, 0.21, 0.22, 0.23, 0.24, 0.28, 0.35, 0.32, 0.30, 0.28],
    Öl: [30.38, 25.00, 26.19, 31.08, 41.47, 56.64, 66.05, 72.36, 99.67, 61.95, 79.48, 94.88, 94.05, 97.98, 93.17, 48.66, 43.29, 50.80, 64.94, 56.99, 39.16, 68.14, 94.58, 77.58, 76.55, 72.00],
    Brent: [28.50, 24.45, 25.02, 29.82, 38.24, 54.52, 65.14, 72.39, 97.33, 61.67, 79.61, 111.26, 111.63, 108.66, 98.95, 52.32, 43.74, 54.19, 71.31, 64.21, 41.96, 70.86, 99.04, 82.17, 79.69, 71.91],
    Erdgas: [2.42, 2.95, 2.75, 5.55, 6.18, 9.02, 6.91, 6.98, 8.86, 3.99, 4.38, 4.00, 2.76, 3.73, 4.37, 2.62, 2.52, 2.99, 3.15, 2.56, 2.03, 3.91, 6.45, 2.54, 2.21, 4.30],
    Pflanzenöl: [0.42, 0.38, 0.52, 0.56, 0.51, 0.52, 0.58, 0.93, 1.25, 0.75, 0.98, 1.19, 1.05, 0.87, 0.82, 0.68, 0.74, 0.82, 0.68, 0.70, 0.90, 1.45, 1.89, 1.15, 0.95, 0.92],
    Weizen: [2.59, 2.78, 3.56, 3.56, 3.40, 3.42, 4.26, 6.48, 6.78, 4.87, 5.70, 7.24, 7.78, 6.87, 5.99, 5.13, 3.89, 4.43, 5.16, 5.17, 4.83, 6.78, 9.47, 7.49, 5.50, 5.20],
    Mais: [1.85, 2.00, 2.74, 2.51, 2.06, 2.00, 3.04, 3.76, 4.78, 3.56, 4.78, 6.22, 6.93, 5.39, 3.70, 3.61, 3.48, 3.49, 3.60, 3.83, 4.30, 5.70, 7.44, 5.50, 4.10, 3.90],
    Soja: [4.54, 4.90, 5.53, 5.58, 5.74, 5.66, 6.43, 10.13, 10.66, 9.59, 11.31, 12.50, 14.15, 13.02, 10.10, 8.97, 9.47, 9.34, 8.48, 8.74, 9.30, 12.37, 14.20, 12.55, 11.20, 11.00],
    Stahl: [427, 397, 410, 422, 574, 617, 634, 642, 780, 651, 675, 750, 720, 610, 650, 480, 450, 580, 700, 580, 540, 850, 900, 750, 700, 800],
    Kupfer: [1873.93, 1388.91, 1521.19, 1741.65, 2954.19, 3659.67, 6724.09, 8377.56, 6944.55, 5224.95, 7539.80, 8818.48, 8068.91, 7297.29, 6856.37, 5445.41, 4850.16, 6172.94, 6525.67, 5996.57, 6172.94, 9325.54, 8818.48, 8487.79, 9259.40, 9920.79],
    Alu: [1505, 1441, 1516, 1538, 1798, 2111, 2354, 2724, 2461, 1605, 2108, 2509, 2021, 1813, 1917, 1586, 1602, 1895, 2009, 1765, 1610, 2571, 2795, 2356, 2450, 2600],
    Silber: [4.95, 4.37, 4.60, 4.88, 6.67, 7.31, 11.55, 13.38, 14.99, 14.67, 20.19, 35.12, 31.15, 23.79, 19.08, 15.68, 17.14, 17.05, 15.71, 16.21, 20.55, 25.14, 21.73, 23.40, 28.50, 35.91],
    Kakao: [0.91, 1.06, 1.77, 1.74, 1.55, 1.53, 1.59, 1.95, 2.58, 2.91, 3.10, 2.98, 2.40, 2.44, 3.06, 3.14, 2.89, 2.03, 2.29, 2.34, 2.57, 2.50, 2.69, 3.95, 5.50, 8.50],
    Kaffee: [0.89, 0.56, 0.62, 0.64, 0.78, 1.10, 1.04, 1.18, 1.34, 1.34, 1.77, 2.64, 1.79, 1.24, 1.87, 1.43, 1.49, 1.28, 1.12, 1.02, 1.20, 1.69, 2.28, 1.77, 2.05, 2.80],
    Hühnerfleisch: [1.85, 1.88, 1.92, 1.95, 2.05, 2.18, 2.28, 2.42, 2.58, 2.48, 2.62, 2.78, 2.95, 3.05, 3.12, 3.28, 3.15, 3.08, 3.22, 3.18, 3.45, 3.85, 4.15, 4.55, 4.75, 5.50],
    Eier: [0.94, 0.91, 0.85, 0.99, 1.08, 1.25, 1.09, 1.15, 1.86, 1.12, 1.15, 1.41, 1.62, 1.57, 1.80, 2.47, 1.68, 1.47, 1.74, 1.40, 1.51, 1.67, 2.86, 2.80, 3.50, 3.60],
    Butter: [1.85, 1.90, 1.85, 2.05, 2.20, 2.45, 2.55, 2.80, 3.60, 2.35, 2.50, 3.75, 3.45, 3.30, 3.50, 3.25, 3.40, 3.55, 3.20, 3.10, 3.45, 3.80, 4.20, 3.90, 4.50, 4.80],
    Milch: [0.65, 0.67, 0.68, 0.70, 0.73, 0.78, 0.82, 0.88, 0.95, 0.85, 0.88, 0.98, 1.05, 1.08, 1.12, 1.08, 1.10, 1.15, 1.12, 1.10, 1.15, 1.25, 1.45, 1.38, 1.42, 1.50],
    Brot: [0.95, 0.97, 0.99, 1.01, 1.04, 1.08, 1.12, 1.17, 1.25, 1.23, 1.27, 1.32, 1.37, 1.39, 1.40, 1.42, 1.44, 1.46, 1.50, 1.29, 1.51, 1.53, 1.74, 1.80, 1.86, 2.00],
    Fleisch: [2.41, 2.28, 2.33, 2.30, 2.33, 2.55, 2.65, 2.94, 3.06, 2.77, 2.97, 3.28, 3.64, 3.78, 3.89, 4.23, 3.77, 3.72, 3.85, 3.80, 4.12, 4.59, 4.81, 5.21, 5.35, 6.20]
  };

  const [selectedCommodities, setSelectedCommodities] = useState(['Lohn', 'Dollar', 'Öl', 'Weizen', 'Silber']);
  const [basis, setBasis] = useState('Gold');

  // Calculate ratios based on selected basis (inverted: commodity/basis)
  const ratios = {};
  const basisArray = commodities[basis];
  
  Object.keys(commodities).forEach(name => {
    ratios[name] = years.map((year, i) => commodities[name][i] / basisArray[i]);
  });

  // Create indexed data with base year 2000 = 100
  const data = years.map((year, i) => {
    const point = { year };
    Object.keys(commodities).forEach(name => {
      const baseValue = ratios[name][0];
      const currentValue = ratios[name][i];
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
    Fleisch: '#dc2626'
  };

  const toggleCommodity = (name) => {
    setSelectedCommodities(prev => 
      prev.includes(name) 
        ? prev.filter(c => c !== name)
        : [...prev, name]
    );
  };

  return (
    <div className="w-full h-full p-6 bg-gray-50">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-2">Rohstoffpreis-Index (Basis 2000 = 100)</h2>
        <p className="text-gray-600 mb-4">Wie sich die Kaufkraft der Rohstoffe seit 2000 verändert hat</p>
        
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
              label={{ value: 'Index (2000 = 100)', angle: -90, position: 'insideLeft' }}
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
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
              data={data.map(d => ({ ...d, baseline: 100 }))}
              name="Basis (2000)"
            />
            {selectedCommodities.map(name => (
              <Line
                key={name}
                type="monotone"
                dataKey={name}
                stroke={colors[name]}
                strokeWidth={2}
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
                  {years.map(year => (
                    <th key={year} className="border border-gray-300 px-2 py-2 text-right font-semibold">{year}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.keys(commodities).map((name, idx) => (
                  <tr key={name} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="border border-gray-300 px-3 py-2 font-medium">{name}</td>
                    {commodities[name].map((value, i) => (
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