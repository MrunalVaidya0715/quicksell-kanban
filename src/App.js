import './App.css';
import Navbar from './components/Navbar/Navbar';
import Kanban from './containers/Content/Kanban';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Kanban/>
    </div>
  );
}

export default App;
