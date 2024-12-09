import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import MyFirstPage from "./pages/MyFirstPage";
import MySecondPage from "./pages/MySecondPage";
import SomeThirdPage from "./pages/SomeThirdPage";
import NoPage from "./pages/NoPage";
import './App.css';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<MyFirstPage />} />
            <Route path="secondpage" element={<MySecondPage />} />
            <Route path="thirdpage" element={<SomeThirdPage />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
