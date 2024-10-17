import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FirstPage from './pages/FirstPage';
import SecondPage from './pages/SecondPage';
import ResultPage from './pages/ResultPage';

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<FirstPage />} />
                    <Route path="/assessment" element={<SecondPage />} />
                    <Route path="/results" element={<ResultPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;