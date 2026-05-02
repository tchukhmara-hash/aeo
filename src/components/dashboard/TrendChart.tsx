"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts"

const mockData = [
  { name: "Day 1", brand: 20, comp1: 40, comp2: 30 },
  { name: "Day 5", brand: 25, comp1: 35, comp2: 32 },
  { name: "Day 10", brand: 35, comp1: 30, comp2: 25 },
  { name: "Day 15", brand: 40, comp1: 28, comp2: 22 },
  { name: "Day 20", brand: 55, comp1: 25, comp2: 20 },
  { name: "Day 25", brand: 65, comp1: 20, comp2: 15 },
  { name: "Day 30", brand: 80, comp1: 15, comp2: 10 },
]

export default function TrendChart() {
  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={mockData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
          <XAxis dataKey="name" stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}%`} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', color: '#f4f4f5', borderRadius: '8px' }}
            itemStyle={{ color: '#f4f4f5' }}
          />
          <Legend wrapperStyle={{ paddingTop: '20px' }} />
          <Line 
            type="monotone" 
            dataKey="brand" 
            name="Your Brand" 
            stroke="#6366f1" 
            strokeWidth={3} 
            dot={{ r: 4, fill: '#6366f1', strokeWidth: 0 }} 
            activeDot={{ r: 6, strokeWidth: 0 }} 
          />
          <Line 
            type="monotone" 
            dataKey="comp1" 
            name="Competitor 1" 
            stroke="#ef4444" 
            strokeWidth={2} 
            dot={false} 
          />
          <Line 
            type="monotone" 
            dataKey="comp2" 
            name="Competitor 2" 
            stroke="#eab308" 
            strokeWidth={2} 
            dot={false} 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
