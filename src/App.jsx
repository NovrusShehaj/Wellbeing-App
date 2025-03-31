import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './pages/Navbar.jsx';
import Home from './pages/Home.jsx';
import Dashboard from './pages/Dashboard.jsx';
import MapPage from './pages/MapContainer.jsx';  // Ensure correct import
//import Education from './pages/Education.jsx';
import Calendar from './pages/Calendar';
import Resources from './pages/Resources.jsx';
import Housing from './pages/Housing.jsx';
import TrendAnalysis from './pages/TrendAnalysis.jsx';
import AccessToServices from './pages/AccessToServices.jsx';
import About from './pages/About.jsx';
import WellbeingScore from './pages/AggregatedWellbeingScore.jsx';
import DisparityHighlighting from './pages/DisparityHighlighting.jsx';
import GetInvolved from './pages/GetInvolved';
import ApplicationAssistance from './pages/ApplicationAssistance';
import HistoricalDataPage from './pages/HistoricalDataPage';
import MethodologyPage from './pages/MethodologyPage';
import InteractiveMapPage from './pages/DHMapPage.jsx';
import DHTrend from './pages/DHTrend.jsx';
import DisparityReports from "./pages/DisparityReports.jsx";
import NeighborhoodProfiles from "./pages/NeighborhoodProfiles.jsx";



const App = () => {
    return (
        <Router>
            <Navbar />
            <main className="max-w-7xl mx-auto relative">
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/map-container" element={<MapPage />} />
                    <Route path="/resources" element={<Resources />} />
                    <Route path="/housing" element={<Housing />} />
                    <Route path="/trend-analysis" element={<TrendAnalysis />} />
                    <Route path="/access-to-services" element={<AccessToServices />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/wellbeing-score" element={<WellbeingScore />} />
                    <Route path="/disparity-highlighting" element={<DisparityHighlighting />} />
                    <Route path="/calendar" element={<Calendar />} />
                    <Route path="/get-involved" element={<GetInvolved />} />
                    <Route path="/application-assistance" element={<ApplicationAssistance />} />
                    <Route path="/historical-data" element={<HistoricalDataPage />} />
                    <Route path="/methodology" element={<MethodologyPage />} />
                    <Route path="/dhmap-page" element={<InteractiveMapPage />} />
                    <Route path="/dhtrend" element={<DHTrend />} />
                    <Route path="/disparity-reports" element={<DisparityReports />} />
                    <Route path="/neighborhood-profiles" element={<NeighborhoodProfiles />} />
                </Routes>
            </main>
        </Router>
    );
};

export default App;
