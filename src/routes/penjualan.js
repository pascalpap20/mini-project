import { useEffect, useState } from "react";
import "../App.css";
// import Table from "../components/table/table";
import { headerPenjualan } from "../utils/tables/tableData";
import TablePenjualan from "../components/table/tablePenjualan";

const url = process.env.REACT_APP_URL_ENDPOINT || "http://127.0.0.1:8000/api";
function Penjualan() {
  const [itemList, setItemList] = useState([]);
  const [inputs, setInputs] = useState({});
  const [dataBarang, setDataBarang] = useState([]);
  const [dataPenjualan, setDataPenjualan] = useState([]);
  const [dataPelanggan, setDataPelanggan] = useState([]);

  const [editMode, setEditMode] = useState({
    status: false,
    rowNumber: null,
  });
  const [editValue, setEditValue] = useState({});

  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [inputModal, setInputModal] = useState({});

  const fetchBarang = () => {
    fetch(`${url}/barang`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`This is an HTTP error: The status is ${res.status}`);
        }
        return res.json();
      })
      .then((res) => {
        // console.log(res.data);
        setDataBarang(res.data);
      });
  };

  const fetchPenjualan = () => {
    fetch(`${url}/penjualan`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`This is an HTTP error: The status is ${res.status}`);
        }
        return res.json();
      })
      .then((res) => {
        // console.log(res.data);
        setDataPenjualan(res.data);
      });
  };

  const fetchPelanggan = () => {
    fetch(`${url}/pelanggan`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`This is an HTTP error: The status is ${res.status}`);
        }
        return res.json();
      })
      .then((res) => {
        // console.log(res.data);
        setDataPelanggan(res.data);
      });
  };

  const fetchItemPenjualan = (id) => {
    fetch(`${url}/item-penjualan?nota_id=${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`This is an HTTP error: The status is ${res.status}`);
        }
        return res.json();
      })
      .then((res) => {
        // console.log(res.data);
        setModalData(res.data);
      });
  };

  useEffect(() => {
    fetchBarang();
    fetchPenjualan();
    fetchPelanggan();
  }, []);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // ini merge key kode_barang yg sama, jadi qtynya ditambah nanti
    var map = itemList.reduce(function (map, e) {
      map[e.kode_barang] = +e.qty + (map[e.kode_barang] || 0);
      return map;
    }, {});

    var result = Object.keys(map).map(function (k) {
      return { kode_barang: k, qty: map[k] };
    });

    if (inputs.kode_pelanggan && result.length !== 0) {
      const newData = {
        kode_pelanggan: inputs.kode_pelanggan,
        item_penjualan: result,
      };
      console.log(newData);
      fetch(`${url}/penjualan`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
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
          // inputs.kode = res.data.kode;
          // setDataPenjualan((prevState) => [...prevState, newData]);
          fetchPenjualan();
          setItemList([]);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleAdd = () => {
    if (inputs.kode_barang && inputs.qty) {
      const newItem = {
        kode_barang: inputs.kode_barang,
        qty: inputs.qty,
      };

      setItemList([...itemList, newItem]);
      // setInputs((values) => ({ ...values, kode_barang: "", qty: 0 }));
      // console.log(inputs);
    }
  };

  const edit = {
    editMode,
    editValue,
    // handle edit button
    handleEdit(record) {
      setEditMode({
        status: true,
        rowKey: record.id_nota,
      });
      setEditValue(record);
    },
    // handle hasil edit kemudian save ke db
    handleSave() {
      console.log(editValue);
      fetch(`${url}/penjualan/${editValue.id_nota}`, {
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
          fetchPenjualan();
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
    fetch(`${url}/penjualan/${record.id_nota}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`This is an HTTP error: The status is ${res.status}`);
        }
        return res.json();
      })
      .then((res) => {
        fetchPenjualan();
      });
  };

  const [modalEditMode, setModalEditMode] = useState({
    status: false,
    rowNumber: null,
  });
  const [modalEditValue, setModalEditValue] = useState({});
  const [currPenjualan, setCurrPenjualan] = useState([]);
  const view = {
    modalIsOpen,
    modalEditMode,
    modalEditValue,
    inputModal,
    openModal(record) {
      setIsOpen(true);
      // setModalData(record);
      setCurrPenjualan(record);
      fetchItemPenjualan(record.id_nota);
    },
    afterOpenModal() {
      // references are now sync'd and can be accessed.
      // subtitle.style.color = "#f00";
    },
    closeModal() {
      setIsOpen(false);
      setInputModal({});
      setModalEditMode({
        status: false,
        rowKey: null,
      });
      setModalEditMode({});
    },
    handleModalChange(event) {
      const name = event.target.name;
      const value = event.target.value;
      setInputModal((values) => ({ ...values, [name]: value }));
    },
    handleModalAdd(record) {
      if (inputModal.kode_barang && inputModal.qty) {
        let item_penjualan = [];
        const newItem = {
          kode_barang: inputModal.kode_barang,
          qty: parseInt(inputModal.qty),
        };
        item_penjualan.push(newItem);

        const item = {
          item_penjualan: item_penjualan,
        };
        console.log(JSON.stringify(item));
        fetch(`${url}/penjualan/${currPenjualan.id_nota}/item-penjualan`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(item),
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
            fetchPenjualan();
            fetchItemPenjualan(record.id_nota);
            setIsOpen(false);
            setInputModal({});
          })
          .catch((err) => console.log(err));
      }
    },
    handleModalEdit(record) {
      console.log(record);
      setModalEditMode({
        status: true,
        rowKey: record.kode_barang,
      });
      setModalEditValue(record);
    },
    handleModalEditChange(event) {
      const name = event.target.name;
      const value = event.target.value;
      setModalEditValue((values) => ({ ...values, [name]: value }));
    },
    handleModalEditSave(record) {
      console.log(record);
      console.log(modalEditValue);
      fetch(
        `${url}/penjualan/${record.nota}/item-penjualan/${record.kode_barang}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(modalEditValue),
        }
      )
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
          fetchPenjualan();
          setModalEditMode({
            status: false,
            rowKey: null,
          });
          setModalEditMode({});
          setIsOpen(false);
        })
        .catch((err) => console.log(err));
    },
    handleModalEditCancel() {
      setModalEditMode({
        status: false,
        rowKey: null,
      });
      setModalEditMode({});
    },
    handleModalDelete(record) {
      fetch(
        `${url}/penjualan/${record.nota}/item-penjualan/${record.kode_barang}`,
        {
          method: "DELETE",
        }
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error(
              `This is an HTTP error: The status is ${res.status}`
            );
          }
          return res.json();
        })
        .then((res) => {
          fetchPenjualan();
          setIsOpen(false);
        });
    },
  };

  return (
    <div>
      <h1>PENJUALAN</h1>
      <main>
        <form onSubmit={handleSubmit}>
          <label style={{ display: "block" }}>Kode Pelanggan</label>
          <select name="kode_pelanggan" onChange={handleChange} required>
            <option value={""}>--</option>
            {dataPelanggan.map((pelanggan, idx) => (
              <option key={idx} value={pelanggan.id_pelanggan}>
                {pelanggan.id_pelanggan} | {pelanggan.nama}
              </option>
            ))}
          </select>
          <label style={{ display: "block" }}>Kode Barang</label>
          <select name="kode_barang" onChange={handleChange} required>
            <option value={""}>--</option>
            {dataBarang.map((barang, idx) => (
              <option key={idx} value={barang.kode}>
                {barang.kode} | {barang.nama}{" "}
                {barang.warna !== null ? ` | ${barang.warna}` : ""}
              </option>
            ))}
          </select>

          <label style={{ display: "block" }}>Qty</label>
          <input
            name="qty"
            type={"number"}
            min={"0"}
            onChange={handleChange}
            required
          />
          <button
            className="button-green"
            style={{ display: "block" }}
            onClick={handleAdd}
            type="button"
          >
            Tambah barang
          </button>

          <input type={"submit"} value="Simpan" style={{ display: "block" }} />
        </form>
      </main>
      {itemList.map((item, idx) => (
        <ul style={{ borderStyle: "inset", marginBottom: "5px" }} key={idx}>
          <li>
            Kode Barang : {item.kode_barang} | Qty : {item.qty}
          </li>
        </ul>
      ))}
      <TablePenjualan
        headerData={headerPenjualan}
        recordData={dataPenjualan}
        handleEdit={edit}
        handleDelete={handleDelete}
        dataPelanggan={dataPelanggan}
        dataBarang={dataBarang}
        handleView={view}
        modalData={modalData}
      />
    </div>
  );
}
export default Penjualan;
