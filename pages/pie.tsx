import type { NextPage } from 'next'
import PieChart from '@/components/PieChart'
import ChartPageLayout from '@/components/ChartPageLayout'
import { useKeystrokeData } from '@/hooks/useKeystrokeData'

const PiePage: NextPage = () => {
  const { keystrokeData, isLoading, error } = useKeystrokeData()

  return (
    <ChartPageLayout
      title="Key Usage Distribution (Pie Chart)"
      description="Visualize keyboard usage with a pie chart"
      keystrokeData={keystrokeData}
      isLoading={isLoading}
      error={error}
    >
      <PieChart data={keystrokeData} />
    </ChartPageLayout>
  )
}

export default PiePage
