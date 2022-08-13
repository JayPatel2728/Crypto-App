import { useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios";
import moment from 'moment';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
  } from 'chart.js';

import { Line } from 'react-chartjs-2';
  
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);

function Chart() {
    const [chartData, setChartData] = useState ([])
    const { coinId } = useParams();

    const url =`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=7`
    
    useEffect(()=>{
        axios.get(url)
        .then(res => {
            setChartData(res.data.prices)
            console.log(res.data.prices)
        })
    }, [url])

    const coinChartData = chartData?.map(value => ({
            x: value[0],
            y: value[1].toFixed(2)
    }))


    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false
            }
        }
    }

    const data = {
        labels: coinChartData.map(value => moment(value.x).format('MMMDD')),
        datasets: [
            {
                fill: true,
                data: coinChartData.map(value => value.y),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            }
        ]
    }

  return (
    <div className='chart-container'>
        <Line options={options} data={data} className='chart'/>
    </div>
  )
}

export default Chart