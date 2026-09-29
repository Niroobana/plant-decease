import { useEffect, useState } from "react";
import api from "../services/api";


function NewPlantCheck() {
  const [plants, setPlants] = useState([]);

  const [plantId, setPlantId] = useState("");
  const [symptom, setSymptom] = useState("");
  const [checkedDate, setCheckedDate] = useState("");

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


  useEffect(() => {
    loadPlants();
  }, []);


  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await api.post("/plant-checks", {
        plant_id: Number(plantId),
        symptom: symptom,
        checked_date: checkedDate,
      });

      setPlantId("");
      setSymptom("");
      setCheckedDate("");

      setMessage("Plant check saved successfully");

    } catch (error) {
      console.error(error);

      if (error.response?.data?.detail) {
        setMessage(error.response.data.detail);
      } else {
        setMessage("Failed to save plant check");
      }
    }
  };


  return (
    <div>
      <h1>New Plant Check</h1>

      <form onSubmit={handleSubmit}>

        <div>
          <label>Plant</label>
          <br />

          <select
            value={plantId}
            onChange={(event) => setPlantId(event.target.value)}
            required
          >
            <option value="">Select Plant</option>

            {plants.map((plant) => (
              <option
                key={plant.id}
                value={plant.id}
              >
                {plant.plant_name} - {plant.plant_type}
              </option>
            ))}

          </select>
        </div>

        <br />

        <div>
          <label>Symptoms</label>
          <br />

          <textarea
            value={symptom}
            onChange={(event) => setSymptom(event.target.value)}
            rows="5"
            required
          />
        </div>

        <br />

        <div>
          <label>Check Date</label>
          <br />

          <input
            type="date"
            value={checkedDate}
            onChange={(event) => setCheckedDate(event.target.value)}
            required
          />
        </div>

        <br />

        <button type="submit">
          Save Plant Check
        </button>

      </form>

      {message && (
        <p>{message}</p>
      )}
    </div>
  );
}

export default NewPlantCheck;