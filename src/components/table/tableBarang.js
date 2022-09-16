import "./table.css";

export default function TableBarang({
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
            <td>{record.kode}</td>

            <td>
              {handleEdit.editMode.status &&
              handleEdit.editMode.rowKey === record.kode ? (
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
              handleEdit.editMode.rowKey === record.kode ? (
                <>
                  <input
                    name="kategori"
                    list="kategori"
                    onChange={handleEdit.handleChange}
                    defaultValue={handleEdit.editValue.kategori}
                  />
                  <datalist id="kategori">
                    <option value="ATK" />
                    <option value="RT" />
                    <option value="MASAK" />
                    <option value="ELEKTRONIK" />
                  </datalist>
                </>
              ) : (
                <div>{record.kategori}</div>
              )}
            </td>

            <td>
              {handleEdit.editMode.status &&
              handleEdit.editMode.rowKey === record.kode ? (
                <input
                  name="harga"
                  type={"number"}
                  min={"0"}
                  onChange={handleEdit.handleChange}
                  defaultValue={handleEdit.editValue.harga}
                />
              ) : (
                <div>{record.harga}</div>
              )}
            </td>

            <td>
              {handleEdit.editMode.status &&
              handleEdit.editMode.rowKey === record.kode ? (
                <button
                  className="button-green"
                  onClick={() => handleEdit.handleSave(record)}
                >
                  SIMPAN
                </button>
              ) : (
                <button
                  className="button-green"
                  onClick={() => handleEdit.handleEdit(record)}
                >
                  UBAH
                </button>
              )}

              {handleEdit.editMode.status &&
              handleEdit.editMode.rowKey === record.kode ? (
                <button
                  className="button-red"
                  onClick={() => handleEdit.handleCancel(record)}
                >
                  BATAL
                </button>
              ) : (
                <button
                  className="button-red"
                  onClick={() => handleDelete(record)}
                >
                  HAPUS
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
