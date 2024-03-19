//@ts-nocheck
import { useEffect, useState, useRef } from "react";
import { toPng } from 'html-to-image';
import { About } from "../About/About"
import { CHART_CONFIG } from "../../config/chartAbout.config"
import useGetData from "../../hooks/mutation/useGetData"
import { FaChartPie, } from "react-icons/fa";
import { GrLineChart } from "react-icons/gr";
import { MdBarChart } from "react-icons/md";
import { BsDownload } from "react-icons/bs";
import { SingleBarChart } from "./Chart/SingleBarChart";
import { SingleLineChart } from "./Chart/SingleLineChart";
import { TwoLevelPieChart } from "./Chart/TwoLevelPieChart";
import { Dropdown } from "../Dropdown/Dropdown";

const xAxis = ["branch", "city", "customerId",
    "customerType",
    "gender",
    "payment",
    "productLine"

]
const yAxis = ["cogs", "grosmdarginPercentage",
    "quantity",
    "rating",
    "revenue",
    "sales",
    "tax",
    "unitPrice"
]

export const Chart = () => {
    const { data: initialData, isLoading } = useGetData()
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

    let dataSet = []
    let ret

    const createChart = () => {
        if (!isLoading) {
            var avgMap = {}
            for (var item of initialData) {
                if (!avgMap[item[createChartData.xAxis]]) {
                    avgMap[item[createChartData.xAxis]] = { count: 0, sum: 0 }
                }
                avgMap[item[createChartData.xAxis]]['count']++;
                avgMap[item[createChartData.xAxis]]['sum'] = avgMap[item[createChartData.xAxis]]['sum'] + item[createChartData.yAxis];
            }

            for (var key of Object.keys(avgMap)) {
                dataSet.push({
                    [createChartData['xAxis']]: key,
                    [createChartData['yAxis']]: avgMap[key]['sum'] / avgMap[key]['count'],
                })
            }
            ret = { dataSet, ...createChartData }
            setChartDisplayData(ret)
        }
    }

    useEffect(() => {
        if (!isLoading) {
            var avgMap = {}
            for (var item of initialData) {
                if (!avgMap[item[createChartData.xAxis]]) {
                    avgMap[item[createChartData.xAxis]] = { count: 0, sum: 0 }
                }
                avgMap[item[createChartData.xAxis]]['count']++;
                avgMap[item[createChartData.xAxis]]['sum'] = avgMap[item[createChartData.xAxis]]['sum'] + item[createChartData.yAxis];
            }

            for (var key of Object.keys(avgMap)) {
                dataSet.push({
                    [createChartData['xAxis']]: key,
                    [createChartData['yAxis']]: avgMap[key]['sum'] / avgMap[key]['count'],
                })
            }
            ret = { dataSet, ...createChartData }
            setChartDisplayData(ret)
        }
    }, [isLoading])

    const elementRef = useRef(null);
    const htmlToImageConvert = () => {
        toPng(elementRef?.current, { cacheBust: false })
            .then((dataUrl) => {
                const link = document.createElement("a");
                link.download = "my-image-name.png";
                link.href = dataUrl;
                link.click();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="w-full  ml-16 mt-24 overflow-x-scroll mr-5 md:mt-36 md:mx-36 ">
            <About {...CHART_CONFIG} />
            <div className="  mr-4  flex flex-col gap-2 items-center justify-center   lg:flex-row md:border md:items-start md:gap-6 md:p-7 md:rounded-lg md:justify-between">
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

                        <button onClick={htmlToImageConvert}>
                            <BsDownload size={"24px"} />
                        </button>

                    </div>
                    <div className=" overflow-x-scroll md:flex md:justify-center md:items-center  p-3 md:p-6" ref={elementRef}>
                        {!isLoading && <CreatedChart createChartData={createChartData} chartDisplayData={chartDisplayData} />}
                    </div>
                </div>

            </div>

        </div>
    )
}

const CreatedChart = ({ createChartData, chartDisplayData }) => {
    const { selectedChart } = createChartData
    const returnComponentMap = {
        "lineChart": <SingleLineChart data={chartDisplayData} />,
        "barChart": <SingleBarChart data={chartDisplayData} />,
        "pieChart": <TwoLevelPieChart data={chartDisplayData} />,
    }
    return returnComponentMap[selectedChart]
}




