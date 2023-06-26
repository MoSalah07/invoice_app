import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Dashboard from "./Pages/Dashboard";
import ProtectedRoute from './Context/ProtectedRoute';
import DetailsInvoice from './Pages/DetailsInvoice.jsx'
import ContextProviderAuth from "./Context/ContextProviderAuth";

function App() {
  return (
    <ContextProviderAuth>
      <main className="app">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard/:id" element={<Dashboard />} />
          <Route path="/dashboard/:id/:serial" element={<DetailsInvoice />}/>
        </Routes>
      </main>
    </ContextProviderAuth>
  );
}

export default App;
