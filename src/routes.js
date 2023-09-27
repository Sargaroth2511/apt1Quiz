import React, { useEffect } from 'react'
import { useRoutes, useNavigate, useSearchParams } from "react-router-dom";


import Quiz from "./components/Quiz/Quiz.jsx";
import TestGPT from './components/TestGPT/TestGPT.jsx';
import Home from "./components/pages/Home.jsx";


const Router = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        for (const entry of searchParams.entries()) {
            const [param] = entry;
            switch (param) {
                case '/Quiz':
                    navigate('/Quiz', {replace: true})
                    break;
            case '/Quiz':
                    navigate('/TestGPT', {replace: true})
                    break;    
                default:
                    navigate('/')
                    break;
            }
          }
    }, [searchParams, navigate])


    let element = useRoutes([
        {path:'/', element: <Home />},
        {path:'/Quiz', element: <Quiz  />},
        {path:'/TestGPT', element: <TestGPT  />},
        ])  
  return element;
   
}

export default Router;