import { AreaChart, XAxis, YAxis, Area, Tooltip, CartesianGrid, Legend } from 'recharts'
import React from 'react'

type Props = {}

function TrafficChart({ }: Props) {
    const data = [
        { month: "Jan", y2023: 20, y2024: 45, y2025: 35 },
        { month: "Feb", y2023: 50, y2024: 30, y2025: 55 },
        { month: "Mar", y2023: 65, y2024: 70, y2025: 45 },
        { month: "Apr", y2023: 40, y2024: 50, y2025: 20 },
        { month: "May", y2023: 75, y2024: 85, y2025: 0 },
        { month: "Jun", y2023: 60, y2024: 40, y2025: 0 },
        { month: "Jul", y2023: 55, y2024: 65, y2025: 0 },
        { month: "Aug", y2023: 80, y2024: 90, y2025: 0 },
        { month: "Sep", y2023: 45, y2024: 55, y2025: 0 },
        { month: "Oct", y2023: 70, y2024: 95, y2025: 0 },
        { month: "Nov", y2023: 90, y2024: 85, y2025: 0 },
        { month: "Dec", y2023: 100, y2024: 75, y2025: 0 },
    ]


    return (
        <div className='bg-edge-green-secondary px-4 py-2 rounded-xl border-2 border-border'>
            <h3 className='text-edge-text text-xl mb-4'>Website Traffic</h3>
            <AreaChart className='bg-white p-1 rounded-xl'
                width={window.outerWidth > 800 ? 660 : window.outerWidth > 500 ? 410 : 330}
                height={300}
                data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                    <linearGradient id="color2023" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6A0DAD33" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#6A0DAD33" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="color2024" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#D5000033" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#D5000033 " stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="color2025" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3357FF33" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#3357FF33" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <XAxis dataKey="month" />
                <YAxis domain={[0, 100]} ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]} />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="y2023" stroke="#6A0DAD80" fillOpacity={1} fill="url(#color2023)" name="2023" dot={{ r: 1 }} />
                <Area type="monotone" dataKey="y2024" stroke="#D5000080" fillOpacity={1} fill="url(#color2024)" name="2024" dot={{ r: 1 }} />
                <Area type="monotone" dataKey="y2025" stroke="#3357FF80" fillOpacity={1} fill="url(#color2025)" name="2025" dot={{ r: 1 }} />
            </AreaChart>
        </div>
    )
}

export default TrafficChart
