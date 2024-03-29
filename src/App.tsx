import './App.css'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { Route, Routes } from "react-router-dom";
import { Home } from './components/Home';
import { Header, Sidebar, Table, Chart } from './components';

import { FilterProvider } from './hooks/context/useFilterContext';


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});



function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <FilterProvider>


        <Header />
        <div className="flex flex-row w-full">

          <Sidebar />
          <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Table />} />
            <Route path="/charts" element={<Chart />} />

          </Routes>
        </div>
      </FilterProvider>
    </QueryClientProvider>

  )
}

export default App