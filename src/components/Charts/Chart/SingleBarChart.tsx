import { BarChart, Bar, Rectangle, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

export const SingleBarChart = ({ data }: any) => {

    return (
        <BarChart
            width={500}
            height={300}
            data={data.dataSet}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={data.xAxis} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey={data.yAxis} fill="#ed4031" activeBar={<Rectangle fill="pink" stroke="blue" />} />
        </BarChart>


    )
}