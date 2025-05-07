import type { NextPage } from 'next'
import BarChart from '@/components/BarChart'
import ChartPageLayout from '@/components/ChartPageLayout'
import { useKeystrokeData } from '@/hooks/useKeystrokeData'

const BarPage: NextPage = () => {
  const { keystrokeData, isLoading, error } = useKeystrokeData()

  return (
    <ChartPageLayout
      title="Key Usage Frequency (Bar Chart)"
      keystrokeData={keystrokeData}
      isLoading={isLoading}
      error={error}
    >
      <BarChart data={keystrokeData} />
    </ChartPageLayout>
  )
}

export default BarPage
