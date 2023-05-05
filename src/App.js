
import { useGlobalContext } from "./context/appContext";
import Register from "./components/Register";

function App() {
  const value = useGlobalContext()
  console.log(value)
  return (
    
    <Register/>
  );
}

export default App;
