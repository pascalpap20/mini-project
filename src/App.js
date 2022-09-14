import { useEffect, useState } from "react";
import "./App.css";
import Table from "./components/table/table";
import { headerPelanggan, recordDataExample } from "./utils/tables/tableData";

const url = process.env.REACT_APP_URL_ENDPOINT || "http://127.0.0.1:8000/api";
function App() {
  const [inputs, setInputs] = useState({});

  const [data, setData] = useState([]);
  // const [error, setError] = useState([]);

  useEffect(() => {
    fetch(`${url}/pelanggan`)
      .then((res) => res.json())
      .then((res) => setData(res.data));
  }, []);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value.toUpperCase() }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputs);

    fetch(`${url}/pelanggan`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputs),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        inputs.id_pelanggan = res.data.id_pelanggan;
        setData((prevState) => [...prevState, inputs]);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <main>
        <form onSubmit={handleSubmit}>
          <label style={{ display: "block" }}>Nama</label>
          <input
            name="nama"
            type={"text"}
            placeholder="form"
            onChange={handleChange}
          />
          <label style={{ display: "block" }}>Domisili</label>
          <input
            name="domisili"
            type={"text"}
            placeholder="form"
            onChange={handleChange}
          />
          <label style={{ display: "block" }}>Jenis Kelamin</label>
          <select
            name="jenis_kelamin"
            type={"radio"}
            placeholder="form"
            onChange={handleChange}
          >
            <option value={""}>--</option>
            <option value={"PRIA"}>PRIA</option>
            <option value={"WANITA"}>WANITA</option>
          </select>
          <input type={"submit"} value="Simpan" style={{ display: "block" }} />
        </form>
      </main>
      <Table headerData={headerPelanggan} recordData={data} />
    </div>
  );
}

export default App;
