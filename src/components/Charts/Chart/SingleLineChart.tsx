import { LineChart, CartesianGrid, XAxis, YAxis, Legend, Line, Tooltip } from "recharts"


export const SingleLineChart = ({ data }: any) => {

    return (
        <>
            <LineChart width={500} height={300} data={data?.dataSet}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={data?.xAxis} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey={data?.yAxis} stroke="#ed4031" />
            </LineChart>
        </>

    )
}