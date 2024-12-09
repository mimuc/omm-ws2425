import React from 'react';
import './App.css';
import OmmMememuc from './components/mememuc'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./Layout";
import NoPage from "./NoPage";
import MemeHistory from "./components/memehistory";




const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={ <OmmMememuc />} />
                    <Route path="history" element={<MemeHistory />} />
                    <Route path="*" element={<NoPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
export default App;
