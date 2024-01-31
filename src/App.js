import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Calendar from './components/Calendar/Calendar';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/dwayneprince/ps-calendar.git/:year/:month" Component={Calendar} />
        <Route path="/*" element={<Navigate to="/dwayneprince/ps-calendar.git/2023/6" />} />

      </Routes>
    </Router>
  );
};

export default App;
