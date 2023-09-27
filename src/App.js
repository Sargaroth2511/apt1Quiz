
import { BrowserRouter } from "react-router-dom";

// import Home from "./components/pages/Home.jsx";
import Router from './routes.js'

function App() {
  return (
    <div className="App">
      <BrowserRouter >
        <Router />
      </BrowserRouter>
    </div>
  );
}

export default App;
