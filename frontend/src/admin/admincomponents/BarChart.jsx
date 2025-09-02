import React from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

// ✅ Register Bar chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

const BarChart = ({ prices }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false, // ✅ Important for responsiveness
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Sales Overview',
      },
    },
  }

  // ✅ Function to generate random colors
  const getRandomColors = (num) => {
    return Array.from({ length: num }, () =>
      `rgba(${Math.floor(Math.random() * 255)}, 
             ${Math.floor(Math.random() * 255)}, 
             ${Math.floor(Math.random() * 255)}, 0.7)`
    )
  }

  const data = {
    labels: prices.map((_, i) => `Oder ${i + 1}`),
    datasets: [
      {
        label: 'oders Prices',
        data: prices,
        backgroundColor: getRandomColors(prices.length),
      },
    ],
  }

  return (
    <div className="relative w-full h-[350px]">
      <Bar options={options} data={data} />
    </div>
  )
}

export default BarChart
