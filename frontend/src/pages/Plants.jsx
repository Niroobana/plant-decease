import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";


function Plants() {
  const [plants, setPlants] = useState([]);
  const [users, setUsers] = useState([]);

  const [plantName, setPlantName] = useState("");
  const [plantType, setPlantType] = useState("");
  const [location, setLocation] = useState("");
  const [userId, setUserId] = useState("");

  const [message, setMessage] = useState("");


  const loadPlants = async () => {
    try {
      const response = await api.get("/plants");
      setPlants(response.data);
    } catch (error) {
      console.error(error);
      setMessage("Failed to load plants");
    }
  };


  const loadUsers = async () => {
    try {
      const response = await api.get("/users");
      setUsers(response.data);
    } catch (error) {
      console.error(error);
      setMessage("Failed to load users");
    }
  };


  useEffect(() => {
    loadPlants();
    loadUsers();
  }, []);


  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await api.post("/plants", {
        plant_name: plantName,
        plant_type: plantType,
        location: location,
        user_id: Number(userId),
      });

      setPlantName("");
      setPlantType("");
      setLocation("");
      setUserId("");

      setMessage("Plant added successfully");

      loadPlants();

    } catch (error) {
      console.error(error);

      if (error.response?.data?.detail) {
        setMessage(error.response.data.detail);
      } else {
        setMessage("Failed to add plant");
      }
    }
  };


  return (
    <div>
      <h1>Plants</h1>

      <form onSubmit={handleSubmit}>

        <div>
          <label>Plant Name</label>
          <br />

          <input
            type="text"
            value={plantName}
            onChange={(event) => setPlantName(event.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label>Plant Type</label>
          <br />

          <input
            type="text"
            value={plantType}
            onChange={(event) => setPlantType(event.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label>Location</label>
          <br />

          <input
            type="text"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
          />
        </div>

        <br />

        <div>
          <label>Owner</label>
          <br />

          <select
            value={userId}
            onChange={(event) => setUserId(event.target.value)}
            required
          >
            <option value="">Select Owner</option>

            {users.map((user) => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}

          </select>
        </div>

        <br />

        <button type="submit">
          Add Plant
        </button>

      </form>


      {message && (
        <p>{message}</p>
      )}


      <hr />


      <h2>Plant List</h2>


      {plants.length === 0 ? (

        <p>No plants found.</p>

      ) : (

        <ul>

          {plants.map((plant) => (

            <li key={plant.id}>

              <strong>{plant.plant_name}</strong>

              {" - "}

              {plant.plant_type}

              {" - "}

              {plant.location || "No location"}

              {" "}

              <Link to={`/plants/${plant.id}`}>
                View Details
              </Link>

            </li>

          ))}

        </ul>

      )}

    </div>
  );
}

export default Plants;