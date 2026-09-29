import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Users from "./pages/Users";
import Plants from "./pages/Plants";
import NewPlantCheck from "./pages/NewPlantCheck";
import PlantDetails from "./pages/PlantDetails";


function App() {
  return (
    <BrowserRouter>

      <nav>
        <Link to="/">Users</Link>
        {" | "}
        <Link to="/plants">Plants</Link>
        {" | "}
        <Link to="/plant-checks/new">New Plant Check</Link>
      </nav>

      <Routes>

        <Route
          path="/"
          element={<Users />}
        />

        <Route
          path="/plants"
          element={<Plants />}
        />

        <Route
          path="/plant-checks/new"
          element={<NewPlantCheck />}
        />

        <Route
          path="/plants/:id"
          element={<PlantDetails />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;