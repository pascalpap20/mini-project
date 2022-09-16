import "./table.css";

export default function Table({
  headerData,
  recordData,
  handleDelete,
  handleEdit,
}) {
  return (
    <table id="tabel">
      <tbody>
        <tr>
          {headerData.map((header, idx) => (
            <th key={idx}>{header}</th>
          ))}
        </tr>
        {recordData.map((record, idx) => (
          <tr key={idx}>
            <td>{record.id_pelanggan}</td>

            <td>
              {handleEdit.editMode.status &&
              handleEdit.editMode.rowKey === record.id_pelanggan ? (
                <input
                  name="nama"
                  type={"text"}
                  placeholder="form"
                  onChange={handleEdit.handleChange}
                  defaultValue={handleEdit.editValue.nama}
                />
              ) : (
                <div>{record.nama}</div>
              )}
            </td>

            <td>
              {handleEdit.editMode.status &&
              handleEdit.editMode.rowKey === record.id_pelanggan ? (
                <input
                  name="domisili"
                  type={"text"}
                  onChange={handleEdit.handleChange}
                  defaultValue={handleEdit.editValue.domisili}
                />
              ) : (
                <div>{record.domisili}</div>
              )}
            </td>

            <td>
              {handleEdit.editMode.status &&
              handleEdit.editMode.rowKey === record.id_pelanggan ? (
                <select
                  name="jenis_kelamin"
                  type={"radio"}
                  placeholder="form"
                  onChange={handleEdit.handleChange}
                  defaultValue={handleEdit.editValue.jenis_kelamin}
                >
                  {/* <option value={""}>--</option> */}
                  <option value={"PRIA"}>PRIA</option>
                  <option value={"WANITA"}>WANITA</option>
                </select>
              ) : (
                <div>{record.jenis_kelamin}</div>
              )}
            </td>

            <td>
              {handleEdit.editMode.status &&
              handleEdit.editMode.rowKey === record.id_pelanggan ? (
                <button onClick={() => handleEdit.handleSave(record)}>
                  SIMPAN
                </button>
              ) : (
                <button onClick={() => handleEdit.handleEdit(record)}>
                  UBAH
                </button>
              )}

              {handleEdit.editMode.status &&
              handleEdit.editMode.rowKey === record.id_pelanggan ? (
                <button onClick={() => handleEdit.handleCancel(record)}>
                  BATAL
                </button>
              ) : (
                <button onClick={() => handleDelete(record)}>HAPUS</button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
