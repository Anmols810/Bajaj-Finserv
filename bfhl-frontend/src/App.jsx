import { useState, useEffect } from "react";

export default function App() {
  const [jsonInput, setJsonInput] = useState("");
  const [response, setResponse] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "22BCS16073";
  }, []);

  const handleSubmit = async () => {
    try {
      const parsedInput = JSON.parse(jsonInput);
      setError("");
      const res = await fetch("http://localhost:3000/bfhl", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsedInput),
      });
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      setError("Invalid JSON format");
    }
  };

  const filteredResponse = response
    ? Object.fromEntries(
        Object.entries(response).filter(([key]) =>
          selectedFilters.includes(key)
        )
      )
    : {};

  return (
    <div style={{ padding: "20px" }}>
      <h1>Bajaj Finserv</h1>
      <textarea
        style={{ width: "100%", height: "100px" }}
        placeholder='{"data": ["A", "C", "z", "1", "3"]}'
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
      />
      <button onClick={handleSubmit} style={{ marginTop: "10px" }}>
        Submit
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {response && (
        <>
          <div style={{ marginTop: "10px" }}>
            <label>Filter Response:</label>
            <select
              multiple
              value={selectedFilters}
              onChange={(e) =>
                setSelectedFilters(Array.from(e.target.selectedOptions, (option) => option.value))
              }
            >
              <option value="alphabets">Alphabets</option>
              <option value="numbers">Numbers</option>
              <option value="highest_alphabet">Highest Alphabet</option>
            </select>
          </div>

          <div style={{ marginTop: "10px", border: "1px solid black", padding: "10px" }}>
            <h3>Filtered Response</h3>
            <pre>{JSON.stringify(filteredResponse, null, 2)}</pre>
          </div>
        </>
      )}
    </div>
  );
}
