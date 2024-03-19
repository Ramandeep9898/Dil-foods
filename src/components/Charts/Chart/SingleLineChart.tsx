import { LineChart, CartesianGrid, XAxis, YAxis, Legend, Line, Tooltip } from "recharts"


export const SingleLineChart = ({ data }: any) => {

    return (
        <>
            <LineChart width={500} height={250} data={data?.dataSet}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={data?.xAxis} />
                <YAxis />
                <Tooltip />
                <Legend />
                {/* <Line type="monotone" dataKey="pv" stroke="#8884d8" /> */}
                <Line type="monotone" dataKey={data?.yAxis} stroke="#82ca9d" />
            </LineChart>
        </>

    )
}