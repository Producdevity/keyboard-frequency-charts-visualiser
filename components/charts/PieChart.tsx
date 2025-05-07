import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

interface PieChartProps {
  data: Record<string, number>
}

const COLORS = [
  '#6366f1',
  '#818cf8',
  '#a5b4fc',
  '#c7d2fe',
  '#e0e7ff',
  '#f5f3ff',
]

export function PieChart(props: PieChartProps) {
  const chartData = Object.entries(props.data)
    .map(([key, value]) => ({
      key,
      value,
    }))
    .sort((a, b) => b.value - a.value)

  return (
    <ResponsiveContainer width="100%" height={400}>
      <RechartsPieChart>
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="key"
          cx="50%"
          cy="50%"
          outerRadius={150}
          label
        >
          {chartData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
        <Tooltip />
      </RechartsPieChart>
    </ResponsiveContainer>
  )
} 