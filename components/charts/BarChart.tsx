import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

interface BarChartProps {
  data: Record<string, number>
}

export function BarChart(props: BarChartProps) {
  const chartData = Object.entries(props.data)
    .map(([key, value]) => ({
      key,
      value,
    }))
    .sort((a, b) => b.value - a.value)

  return (
    <ResponsiveContainer width="100%" height={400}>
      <RechartsBarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="key" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="#6366f1" />
      </RechartsBarChart>
    </ResponsiveContainer>
  )
} 