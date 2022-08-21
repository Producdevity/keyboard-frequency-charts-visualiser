import { ChartData } from 'chart.js'
import React, { useEffect, useState } from 'react'
import { Pie } from 'react-chartjs-2'
import { allKeys } from '../data/keys'
import { FrequencyCountMap } from '../types'
import createFrequencyCountMap from '../utils/createFrequencyCountMap'
import mapToColor from '../utils/mapToColor'
import splitKeystrokes from '../utils/splitKeystrokes'

function PieChart(props: Props) {
  const [chartData, setChartData] = useState<ChartData<'pie'> | null>(null)

  useEffect(() => {
    if (!props.keystrokes) return

    // splitKeystrokes and save to array
    const keystrokesArray: string[] = splitKeystrokes(props.keystrokes)

    const keystrokesFrequency: FrequencyCountMap =
      createFrequencyCountMap(keystrokesArray)

    const _chartData: ChartData<'pie'> = {
      labels: allKeys,
      datasets: [
        {
          label: 'Keystrokes',
          data: allKeys.map((key) => keystrokesFrequency?.[key] || 0),
          backgroundColor: allKeys.map(mapToColor),
        },
      ],
    }
    setChartData(_chartData)
  }, [props.keystrokes])

  return chartData ? <Pie data={chartData} /> : null
}

interface Props {
  keystrokes: string
}

export default PieChart
