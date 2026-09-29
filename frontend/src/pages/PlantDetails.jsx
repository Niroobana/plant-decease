import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";


function PlantDetails() {
  const { id } = useParams();

  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [analyzingId, setAnalyzingId] = useState(null);
  const [message, setMessage] = useState("");


  const loadPlantDetails = async () => {
    try {
      setLoading(true);

      const response = await api.get(`/plants/${id}/details`);

      setPlant(response.data);
      setMessage("");

    } catch (error) {
      console.error(error);

      if (error.response?.data?.detail) {
        setMessage(error.response.data.detail);
      } else {
        setMessage("Failed to load plant details");
      }

    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    loadPlantDetails();
  }, [id]);


  const handleAnalyze = async (checkId) => {
    try {
      setAnalyzingId(checkId);
      setMessage("");

      await api.post(`/plant-checks/${checkId}/analyze`);

      await loadPlantDetails();

    } catch (error) {
      console.error(error);

      if (error.response?.data?.detail) {
        setMessage(error.response.data.detail);
      } else {
        setMessage("AI analysis failed");
      }

    } finally {
      setAnalyzingId(null);
    }
  };


  if (loading) {
    return <p>Loading plant details...</p>;
  }


  if (!plant) {
    return <p>Plant not found.</p>;
  }


  return (
    <div>

      <h1>{plant.plant_name}</h1>

      <p>
        <strong>Type:</strong> {plant.plant_type}
      </p>

      <p>
        <strong>Location:</strong>{" "}
        {plant.location || "Not provided"}
      </p>


      <hr />


      <h2>Owner</h2>

      <p>
        <strong>Name:</strong> {plant.owner.name}
      </p>

      <p>
        <strong>Email:</strong> {plant.owner.email}
      </p>


      <hr />


      <h2>Plant Check History</h2>


      {message && (
        <p>{message}</p>
      )}


      {plant.checks.length === 0 ? (

        <p>No plant checks found.</p>

      ) : (

        plant.checks.map((check) => (

          <div
            key={check.id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginBottom: "15px",
            }}
          >

            <p>
              <strong>Date:</strong> {check.checked_date}
            </p>

            <p>
              <strong>Symptoms:</strong> {check.symptom}
            </p>


            {check.ai_result ? (

              <div>
                <h3>AI Analysis</h3>

                <p style={{ whiteSpace: "pre-line" }}>
                  {check.ai_result}
                </p>
              </div>

            ) : (

              <button
                onClick={() => handleAnalyze(check.id)}
                disabled={analyzingId === check.id}
              >
                {analyzingId === check.id
                  ? "Analyzing..."
                  : "Analyze with AI"}
              </button>

            )}

          </div>

        ))

      )}

    </div>
  );
}

export default PlantDetails;