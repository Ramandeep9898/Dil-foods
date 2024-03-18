import './App.css'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { Route, Routes } from "react-router-dom";
import { Home } from './components/Home';
import { Header, Sidebar } from './components';



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
      <Header />
      <div className="flex flex-row w-full">

        <Sidebar />
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/charts" element={<Home />} />

        </Routes>
      </div>
    </QueryClientProvider>

  )
}

export default App