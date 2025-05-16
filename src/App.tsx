
import './App.css';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import MentorExpenses from './components/MentorExpenses';
import RazorpayCut from './components/RazorpayCut';
import FinalSummary from './components/FinalSummary';


function App() {
  return (
    <div> 
      <Navbar/>
      <Dashboard/>
      <MentorExpenses/>
      <RazorpayCut/>
      <FinalSummary/>
    </div>
  );
}

export default App;



