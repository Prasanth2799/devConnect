import {BrowserRouter, Routes, Route} from "react-router-dom";
import Body from "./components/Body/Body";
import Login from "./components/Login/Login";
function App() {
  return (
    <>
    <BrowserRouter basename="/">
     <Routes>
       <Route path="/" element={<Body />}>
        <Route path="/login" element={<Login />}/>
       </Route>
     </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
