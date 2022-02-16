import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "@/Page/Home";
import Calendar from "@/Page/Calendar";

const MyRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route exact path="/calendar" element={<Calendar />} />
                <Route path="*" element={<Home />} />
            </Routes>
        </Router>
    );
};

function App() {
    return (
        <div className="App">
            <nav className="menu">
                <div className="menu-item">
                    <a href="/">打卡</a>
                </div>
                <div className="menu-item">
                    <a href="/calendar">打卡日历</a>
                </div>
            </nav>
            <main>
                <MyRouter />
            </main>
        </div>
    );
}

export default App;
