import { useQuery } from '@tanstack/react-query';

const useGetData = () => {
    async function getData() {
        const response = await fetch('https://storage.googleapis.com/bh_dev_bucket/localtest/sales.json');
        const responseData = await response.json()
        return responseData;
    }

    return useQuery({
        queryKey: ['getData1'],
        queryFn: getData,
        staleTime: Infinity,
    });
};

export default useGetData;