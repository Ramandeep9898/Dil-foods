import { createContext, useContext, useEffect, useState } from 'react';
import useGetData from '../mutation/useGetData';
import { ReactNode } from 'react';

const FilterContext = createContext<any>({});

export const FilterProvider = ({ children }: { children: ReactNode }) => {
    const { data, isLoading } = useGetData();
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        if (!isLoading) {
            setFilteredData(data);
        }
    }, [isLoading]);

    console.log("data", data);


    const clearAll = () => {
        setFilteredData(data)
    }

    const sortData = (key: string, value: string, _: any) => {
        const newData = [...data];
        const sortedData = newData.sort((a, b) => {
            let nameA = a[key]
            let nameB = b[key]
            if (!["episodeNumberOverall", "season", "episodeNumberInSeason", "rating", "votes"].includes(key)) {
                nameA = a[key].toUpperCase();
                nameB = b[key].toUpperCase();
            }
            if (nameA < nameB) {
                return value === "ascending" ? -1 : 1;
            }
            if (nameA > nameB) {
                return value === "ascending" ? 1 : -1;
            }
            return 0;
        });
        return sortedData;
    }

    const filterData = (key: string, value: string, _: any) => {
        if (!value) {
            return data
        }
        return data.filter((item: { [x: string]: string | number; }) => ["episodeNumberOverall", "season", "episodeNumberInSeason", "rating", "votes"].includes(key) ? item[key] === parseInt(value) : (item[key] as string).toLowerCase().includes(value.toLowerCase()));
    }


    const handleFilter = (key: string, value: string, type: string) => {
        const typeFuncMap: { [key: string]: any } = {
            "sort": sortData,
            "filter": filterData
        }
        const dataToReturn = typeFuncMap[type](key, value, type) as never
        setFilteredData(dataToReturn)
    }

    return (
        <FilterContext.Provider value={{ filteredData, handleFilter, clearAll }}>
            {children}
        </FilterContext.Provider>
    );
};

export const useFilterContext = () => {
    return useContext(FilterContext);
};