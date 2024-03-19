import { PieChart, Pie, Tooltip } from 'recharts';

export const TwoLevelPieChart = ({ data }: any) => {
    return (
        <PieChart width={500} height={300}>
            <Pie
                dataKey={data.yAxis}
                isAnimationActive={true}
                data={data.dataSet}
                cx={250}
                cy={150}
                outerRadius={80}
                fill="#ed4031"
                label
            />
            <Tooltip />
        </PieChart>



    )
}

