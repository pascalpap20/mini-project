import { useState } from "react";
import "../App.css";
import Table from "../components/table/table";
import { headerPelanggan, recordDataExample } from "../utils/tables/tableData";

function Barang() {
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
          <label style={{ display: "block" }}>Nama Barang</label>
          <input
            name="nama"
            type={"text"}
            placeholder="form"
            onChange={handleChange}
          />
          <label style={{ display: "block" }}>Kategori</label>
          <input name="kategori" list="kategori" onChange={handleChange} />
          <datalist id="kategori">
            <option value="ATK" />
            <option value="RT" />
            <option value="MASAK" />
            <option value="ELEKTRONIK" />
          </datalist>

          <label style={{ display: "block" }}>Harga (Rp.)</label>
          <input
            name="harga"
            type={"number"}
            min={"0"}
            onChange={handleChange}
          />
          <input type={"submit"} value="Simpan" style={{ display: "block" }} />
        </form>
      </main>
      <Table headerData={headerPelanggan} recordData={recordDataExample} />
    </div>
  );
}
export default Barang;
