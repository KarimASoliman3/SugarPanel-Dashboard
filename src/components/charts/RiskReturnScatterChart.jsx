import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const scatterData = [
  { x: 10, y: 30 },
  { x: 20, y: 50 },
  { x: 30, y: 40 },
  { x: 40, y: 80 },
  { x: 50, y: 60 },
  { x: 60, y: 90 },
  { x: 70, y: 10 },
  { x: 80, y: 120 },
];

export function RiskReturnScatterChart() {
  return (
    <ResponsiveContainer width="100%" height={210}>
      <ScatterChart>
        <CartesianGrid />
        <XAxis dataKey="x" name="Risk" />
        <YAxis dataKey="y" name="Return" />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        <Scatter name="Portfolio" data={scatterData} fill="#4285F4" />
      </ScatterChart>
    </ResponsiveContainer>
  );
}