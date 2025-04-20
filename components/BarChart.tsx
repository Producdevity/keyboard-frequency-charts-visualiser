import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { ChartData } from 'chart.js'
import { allKeys } from '../data/keys'
import { DataElement, FrequencyCountMap } from '../types'
import createFrequencyCountMap from '../utils/createFrequencyCountMap'
import mapToColor from '../utils/mapToColor'
import splitKeystrokes from '../utils/splitKeystrokes'

interface Props {
  keystrokes: string
}

function BarChart(props: Props) {
  const [chartData, setChartData] = useState<ChartData<'bar'> | null>(null)

  useEffect(() => {
    if (!props.keystrokes) return

    // splitKeystrokes and save to array
    const keystrokesArray: string[] = splitKeystrokes(props.keystrokes)

    const keystrokesFrequency: FrequencyCountMap =
      createFrequencyCountMap(keystrokesArray)

    const barChartData: DataElement[] = Object.entries(keystrokesFrequency).map(
      ([key, count]) => ({
        label: key,
        value: count,
      }),
    )

    const _chartData: ChartData<'bar'> = {
      labels: allKeys,
      datasets: [
        {
          label: 'Keystrokes',
          data: barChartData.map((item) => item.value),
          backgroundColor: allKeys.map(mapToColor),
        },
      ],
    }
    setChartData(_chartData)
  }, [props.keystrokes])

  return chartData ? <Bar data={chartData} /> : null
}

export default BarChart
