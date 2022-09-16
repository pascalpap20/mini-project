import { useEffect, useState } from "react";
import "./App.css";
import Table from "./components/table/table";
import { headerPelanggan } from "./utils/tables/tableData";

const url = process.env.REACT_APP_URL_ENDPOINT || "http://127.0.0.1:8000/api";
function App() {
  const [inputs, setInputs] = useState({});
  const [data, setData] = useState([]);

  const [editMode, setEditMode] = useState({
    status: false,
    rowNumber: null,
  });
  const [editValue, setEditValue] = useState({});
  // const [error, setError] = useState([]);

  const fetchPelanggan = () => {
    fetch(`${url}/pelanggan`)
      .then((res) => res.json())
      .then((res) => setData(res.data));
  };

  useEffect(() => {
    fetchPelanggan();
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
      .then((res) => {
        if (!res.ok) {
          throw new Error(`This is an HTTP error: The status is ${res.status}`);
        }
        return res.json();
      })
      .then((res) => {
        console.log(res);
        inputs.id_pelanggan = res.data.id_pelanggan;
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
        rowKey: record.id_pelanggan,
      });
      setEditValue(record);
    },
    // handle hasil edit kemudian save ke db
    handleSave() {
      // console.log(editValue);
      fetch(`${url}/pelanggan/${editValue.id_pelanggan}`, {
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
          fetchPelanggan();
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
    fetch(`${url}/pelanggan/${record.id_pelanggan}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`This is an HTTP error: The status is ${res.status}`);
        }
        return res.json();
      })
      .then((res) => {
        fetchPelanggan();
      });
  };

  return (
    <div>
      <h1>PELANGGAN</h1>
      <main>
        <form onSubmit={handleSubmit}>
          <label style={{ display: "block" }} htmlFor={"nama"}>
            Nama
          </label>
          <input
            name="nama"
            type={"text"}
            onChange={handleChange}
            id={"nama"}
            required
          />
          <label style={{ display: "block" }} htmlFor={"domisili"}>
            Domisili
          </label>
          <input
            name="domisili"
            type={"text"}
            onChange={handleChange}
            id={"domisili"}
            required
          />
          <label style={{ display: "block" }} htmlFor={"jenis_kelamin"}>
            Jenis Kelamin
          </label>
          <select
            name="jenis_kelamin"
            type={"radio"}
            placeholder="form"
            onChange={handleChange}
            id={"jenis_kelamin"}
            required
          >
            <option value={""}>--</option>
            <option value={"PRIA"}>PRIA</option>
            <option value={"WANITA"}>WANITA</option>
          </select>
          <input type={"submit"} value="Simpan" style={{ display: "block" }} />
        </form>
      </main>
      <Table
        headerData={headerPelanggan}
        recordData={data}
        handleDelete={handleDelete}
        handleEdit={edit}
      />
    </div>
  );
}

export default App;
