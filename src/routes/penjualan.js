import { useState } from "react";
import "../App.css";
import Table from "../components/table/table";
import { headerPelanggan, recordDataExample } from "../utils/tables/tableData";

function Penjualan() {
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.table(inputs);
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
            <option value={"PRIA"}>Pria</option>
            <option value={"WANITA"}>WANITA</option>
          </select>
          <input type={"submit"} value="Simpan" style={{ display: "block" }} />
        </form>
      </main>
      <Table headerData={headerPelanggan} recordData={recordDataExample} />
    </div>
  );
}
export default Penjualan;
