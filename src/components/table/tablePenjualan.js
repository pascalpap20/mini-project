import ModalComponent from "../modal/modal";
import "./table.css";

export default function TablePenjualan({
  headerData,
  recordData,
  handleDelete,
  handleEdit,
  handleView,
  dataPelanggan,
  modalData,
  dataBarang,
}) {
  return (
    <>
      <table id="tabel">
        <tbody>
          <tr>
            {headerData.map((header, idx) => (
              <th key={idx}>{header}</th>
            ))}
          </tr>
          {recordData.map((record, idx) => (
            <tr key={idx}>
              <td>{record.id_nota}</td>

              <td>{record.tgl}</td>

              <td>
                {handleEdit.editMode.status &&
                handleEdit.editMode.rowKey === record.id_nota ? (
                  <>
                    <select
                      name="kode_pelanggan"
                      onChange={handleEdit.handleChange}
                      defaultValue={handleEdit.editValue.kode_pelanggan}
                    >
                      {dataPelanggan.map((pelanggan, idx) => (
                        <option key={idx} value={pelanggan.id_pelanggan}>
                          {pelanggan.id_pelanggan}
                        </option>
                      ))}
                    </select>
                  </>
                ) : (
                  <div>{record.kode_pelanggan}</div>
                )}
              </td>

              <td>
                {handleEdit.editMode.status &&
                handleEdit.editMode.rowKey === record.id_nota ? (
                  <input
                    name="subtotal"
                    type={"number"}
                    min={"0"}
                    onChange={handleEdit.handleChange}
                    defaultValue={handleEdit.editValue.subtotal}
                  />
                ) : (
                  <div>{record.subtotal}</div>
                )}
              </td>

              <td>
                {handleEdit.editMode.status &&
                handleEdit.editMode.rowKey === record.id_nota ? (
                  ""
                ) : (
                  <button
                    className="button-gray"
                    onClick={() => handleView.openModal(record)}
                  >
                    LIHAT ITEM
                  </button>
                )}
                {handleEdit.editMode.status &&
                handleEdit.editMode.rowKey === record.id_nota ? (
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
                handleEdit.editMode.rowKey === record.id_nota ? (
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
      <ModalComponent
        modalData={modalData}
        handleView={handleView}
        dataBarang={dataBarang}
      />
    </>
  );
}
