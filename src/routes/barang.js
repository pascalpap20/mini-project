import { useEffect, useState } from "react";
import "../App.css";
import { headerBarang } from "../utils/tables/tableData";
import TableBarang from "../components/table/tableBarang";

const url = process.env.REACT_APP_URL_ENDPOINT || "http://127.0.0.1:8000/api";
function Barang() {
  const [inputs, setInputs] = useState({});
  const [data, setData] = useState([]);
  const [editMode, setEditMode] = useState({
    status: false,
    rowNumber: null,
  });
  const [editValue, setEditValue] = useState({});

  const fetchBarang = () => {
    fetch(`${url}/barang`)
      .then((res) => res.json())
      .then((res) => setData(res.data));
  };

  useEffect(() => {
    fetchBarang();
  }, []);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value.toUpperCase() }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputs);

    fetch(`${url}/barang`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputs),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`This is an HTTP error: The status is ${res.status}`);
        }
        return res.json();
      })
      .then((res) => {
        console.log(res);
        inputs.kode = res.data.kode;
        setData((prevState) => [...prevState, inputs]);
      })
      .catch((err) => console.log(err));
  };

  const edit = {
    editMode,
    editValue,
    // handle edit button
    handleEdit(record) {
      // alert(record.id_pelanggan);
      setEditMode({
        status: true,
        rowKey: record.kode,
      });
      setEditValue(record);
    },
    // handle hasil edit kemudian save ke db
    handleSave() {
      // console.log(editValue);
      fetch(`${url}/barang/${editValue.kode}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editValue),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(
              `This is an HTTP error: The status is ${res.status}`
            );
          }
          return res.json();
        })
        .then((res) => {
          // console.log(res);
          fetchBarang();
          setEditMode({
            status: false,
            rowKey: null,
          });
          setEditValue({});
        })
        .catch((err) => console.log(err));
    },
    // handle value yg diedit
    handleChange(event) {
      const name = event.target.name;
      const value = event.target.value;
      setEditValue((values) => ({ ...values, [name]: value.toUpperCase() }));
    },
    // handle cancel edit
    handleCancel() {
      setEditMode({
        status: false,
        rowKey: null,
      });
      setEditValue({});
    },
  };

  const handleDelete = (record) => {
    fetch(`${url}/barang/${record.kode}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`This is an HTTP error: The status is ${res.status}`);
        }
        return res.json();
      })
      .then((res) => {
        fetchBarang();
      });
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
      <TableBarang
        headerData={headerBarang}
        recordData={data}
        handleDelete={handleDelete}
        handleEdit={edit}
      />
    </div>
  );
}
export default Barang;
