import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", value: 400 },
  { month: "Feb", value: 300 },
  { month: "Mar", value: 500 },
  { month: "Apr", value: 700 },
  { month: "May", value: 600 },
];

export function CustomAreaChart() {
  const handleClick = (data) => {
    if (data && data.activePayload) {
      console.log("Clicked value:", data.activePayload[0].payload);
    }
  };

  const handleMouseMove = (data) => {
    if (data && data.activePayload) {
      console.log("Hover value:", data.activePayload[0].payload);
    }
  };

  return (
    <ResponsiveContainer width="100%" height={210}>
      <AreaChart
        data={data}
        onClick={handleClick}
        onMouseMove={handleMouseMove}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />

        <Area
          type="monotone"
          dataKey="value"
          stroke="#4285F4"
          fill="#4285F433"
          strokeWidth={2}
          activeDot={{ r: 6 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}