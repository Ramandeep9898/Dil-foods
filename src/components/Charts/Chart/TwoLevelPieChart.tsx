import { PieChart, Pie, Tooltip } from 'recharts';

export const TwoLevelPieChart = ({ data }: any) => {
    return (
        <PieChart width={400} height={400}>
            <Pie
                dataKey={data.yAxis}
                isAnimationActive={true}
                data={data.dataSet}
                cx={200}
                cy={200}
                outerRadius={80}
                fill="#8884d8"
                label
            />
            <Tooltip />
        </PieChart>



    )
}

