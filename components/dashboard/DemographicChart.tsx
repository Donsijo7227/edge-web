import { PieChart, Pie, Cell, Legend } from "recharts";

const data = [
    { name: "Female", value: 87 },
    { name: "Male", value: 23 },
];

const COLORS = ["#8979FE", "#FE918F"];

export default function DemographicChart() {
    return (
        <div className='bg-edge-green-secondary px-4 py-2 rounded-xl border-2 border-border'>
            <h3 className='text-edge-text text-xl mb-4'>Website Traffic</h3>
            <div className="flex items-center justify-center relative">
                <PieChart width={200} height={200}>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index]} />
                        ))}
                    </Pie>
                    <Legend verticalAlign="bottom" height={15} wrapperStyle={{ fontSize: "12px" }} />
                </PieChart>
                {/* Centered Text */}
                <div className="absolute text-lg font-bold text-gray-800">106.6</div>
            </div>
        </div>
    );
}
