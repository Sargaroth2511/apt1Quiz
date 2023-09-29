
import { BrowserRouter } from "react-router-dom";

// import Home from "./components/pages/Home.jsx";
import Router from './routes.js'
import Footer from './components/ui_components/Footer.jsx'

function App() {
  console.log('App Created')
  return (
    
    <div className="App">
      <BrowserRouter basename="/apt1Quiz" >
        <Router />
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
