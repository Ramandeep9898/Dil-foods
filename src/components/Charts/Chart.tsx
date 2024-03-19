import { useEffect, useState } from "react";
import { About } from "../About/About"
import { CHART_CONFIG } from "../../config/chartAbout.config"
import useGetData from "../../hooks/mutation/useGetData"
import { LineChart, CartesianGrid, XAxis, YAxis, Legend, Line, Tooltip } from "recharts"
import { FaChartPie, } from "react-icons/fa";
import { GrLineChart, GrLocationPin } from "react-icons/gr";
import { MdBarChart } from "react-icons/md";
import { BsDownload } from "react-icons/bs";



export const Chart = () => {
    const { data: initialData, isLoading } = useGetData()



    const xAxis = ["branch", "city", "customerId",
        "customerType",
        "gender",
        "payment",
        "productLine"

    ]
    const yAxis = ["cogs", "grossMarginPercentage",
        "quantity",
        "rating",
        "revenue",
        "sales",
        "tax",
        "unitPrice"
    ]

    const availableCharts = ["pieChart", "LineChart", "barChart"]
    const [createChartData, setCreateChartData] = useState({
        xAxis: xAxis[0],
        yAxis: yAxis[0],
        selectedChart: "lineChart"
    })

    const updateState = (key: any, value: any) => {
        setCreateChartData({
            ...createChartData,
            [key]: value
        })
    }
    const [chartDisplayData, setChartDisplayData] = useState({})

    var dataSet = []
    var ret

    const createChart = () => {
        if (!isLoading) {
            for (var item of initialData) {

                dataSet.push({
                    [createChartData['xAxis']]: item[createChartData.xAxis],
                    [createChartData['yAxis']]: item[createChartData.yAxis],
                })
            }
            ret = { dataSet, ...createChartData }
            setChartDisplayData(ret)
        }
    }

    useEffect(() => {
        if (!isLoading) {
            for (var item of initialData) {

                dataSet.push({
                    [createChartData['xAxis']]: item[createChartData.xAxis],
                    [createChartData['yAxis']]: item[createChartData.yAxis],
                })
            }
            ret = { dataSet, ...createChartData }
            setChartDisplayData(ret)
        }
    }, [isLoading])


    return (
        <div className="w-full  pl-16">
            <About {...CHART_CONFIG} />
            <div className="  mr-4  flex flex-col gap-2 items-center jsustify-center sm:flex-row sm:mx-36 sm:border sm:items-start sm:gap-6 sm:p-7 sm:rounded-lg sm:justify-between">
                <div className="border w-full px-3 py-4 rounded-lg mb-4   max-w-[500px]">
                    <div className="px-3 flex flex-col gap-3">
                        <div className="">
                            <Dropdown dropdownOptions={xAxis} updateState={updateState} label={"xAxis"} />
                            <Dropdown dropdownOptions={yAxis} updateState={updateState} label={"yAxis"} />
                        </div>


                        <div className="my-4 flex justify-center gap-2">
                            <button className={createChartData.selectedChart === "pieChart" ? "text-white bg-primary border-none p-3 rounded-lg" : "text-primary border p-3 rounded-lg"} onClick={() => updateState("selectedChart", "pieChart")}>
                                <FaChartPie size={"24px"} />
                            </button>
                            <button className={createChartData.selectedChart === "lineChart" ? "text-white bg-primary border-none p-3 rounded-lg" : "text-primary border p-3 rounded-lg"} onClick={() => updateState("selectedChart", "lineChart")}>
                                <GrLineChart size={"24px"} />
                            </button>
                            <button className={createChartData.selectedChart === "barChart" ? "text-white bg-primary border-none p-3 rounded-lg" : "text-primary border p-3 rounded-lg"} onClick={() => updateState("selectedChart", "barChart")}>
                                <MdBarChart size={"24px"} />
                            </button>
                        </div>

                        <button className="bg-primary rounded-lg py-2 px-4 text-white w-full " onClick={() => createChart()}>Create Chart</button>


                    </div>
                </div>

                <div className="border w-full  rounded-lg">
                    <div className="border-b px-3 py-5 flex justify-end gap-3">
                        <button>
                            <GrLocationPin size={"24px"} />
                        </button>
                        <button>
                            <BsDownload size={"24px"} />
                        </button>

                    </div>
                    <div className=" overflow-x-scroll">
                        {!isLoading && <CreatedChart createChartData={createChartData} chartDisplayData={chartDisplayData} />}
                    </div>
                </div>

            </div>
            <div className="ml-36">
                <p className="">My Workspace</p>
            </div>
        </div>
    )
}

const CreatedChart = ({ createChartData, chartDisplayData }) => {


    const { selectedChart } = createChartData
    console.log(selectedChart);


    const returnComponentMap = {
        "lineChart": <LineCharts data={chartDisplayData} />,
        "barChart": <BarCharts data={chartDisplayData} />,
        "pieChart": <TwoLevelPieChart data={chartDisplayData} />,
    }
    return returnComponentMap[selectedChart]
}

const LineCharts = ({ data }) => {
    console.log('RET', data)

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

import { BarChart, Bar, Rectangle, ResponsiveContainer } from 'recharts';

const BarCharts = ({ data }) => {
    console.log('RET', data)

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
            <Bar dataKey={data.yAxis} fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
        </BarChart>


    )
}

import { PieChart, Pie, Sector, Cell } from 'recharts';

const TwoLevelPieChart = ({ data }) => {
    const data01 = [
        { name: "Group A", value: 400 },
        { name: "Group B", value: 300 },
        { name: "Group C", value: 300 },
        { name: "Group D", value: 200 },
        { name: "Group E", value: 278 },
        { name: "Group F", value: 189 }
    ];

    const data02 = [
        { name: "Group A", value: 2400 },
        { name: "Group B", value: 4567 },
        { name: "Group C", value: 1398 },
        { name: "Group D", value: 9800 },
        { name: "Group E", value: 3908 },
        { name: "Group F", value: 4800 }
    ];

    return (
        <PieChart width={600} height={400}>
            <Pie
                dataKey="value"
                isAnimationActive={false}
                data={data01}
                cx={200}
                cy={200}
                outerRadius={80}
                fill="#8884d8"
                label
            />
            <Pie
                dataKey="value"
                data={data02}
                cx={500}
                cy={200}
                innerRadius={40}
                outerRadius={80}
                fill="#82ca9d"
            />
            <Tooltip />
        </PieChart>



    )
}

const Dropdown = ({ dropdownOptions, updateState, label }: any) => {
    const [isDropDownOpen, setIsDropDownOpen] = useState(false)
    const [dropDownValue, setDropdownValue] = useState<any>(dropdownOptions[0][0].toUpperCase() + dropdownOptions[0].substring(1))


    const dropDownClickHandler = (ele: { ele: string }) => {
        setDropdownValue(ele[0].toUpperCase() + ele.substring(1))
        updateState(label, ele)
        setIsDropDownOpen(false)
    }


    return (
        <div className="relative w-full mb-3">
            <p className="font-medium mb-1">{label}</p>
            <button onClick={() => setIsDropDownOpen(!isDropDownOpen)} id="dropdown-button" className="outline-none inline-flex justify-between w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500">
                <span className="mr-2 text-base">{dropDownValue}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-2 -mr-1" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </button>
            {isDropDownOpen && <div id="dropdown-menu" className="w-full z-10 absolute right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-1 space-y-1">
                {/* <!-- Dropdown content --> */}
                {dropdownOptions.map((ele) => (
                    <div onClick={() => dropDownClickHandler(ele)} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md">{ele[0].toUpperCase() + ele.substring(1)}</div>
                ))}
            </div>}
        </div>
    )
}