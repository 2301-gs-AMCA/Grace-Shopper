import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [healthMsg, setHealthMsg] = useState(null);
  const [err, setErr] = useState(null);

  useEffect(() => {
    async function checkHealth() {
      try {
        const response = await fetch("/api/health");
        if (!response.ok) {
          throw {
            message: "Api is Down 😭",
          };
        }
        const { message } = await response.json();
        setHealthMsg(message);
      } catch (error) {
        setErr(error.message);
      }
    }
    checkHealth();
  }, []);

  return (
    <div>
      <h1>Welcome to Grace Shopper</h1>
      {healthMsg && <p>{healthMsg}</p>}
      {err && <p>{err}</p>}
    </div>
  );
}

export default App;
