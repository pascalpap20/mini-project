import React from "react";
// import ReactDOM from "react-dom";
import Modal from "react-modal";
import "../../App.css";
import "../table/table.css";
import "./modal.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    maxHeight: "100vh",
    height: "70%",
  },
  overlay: { zIndex: 1500 },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");

export default function ModalComponent({ modalData, handleView, dataBarang }) {
  // useEffect(() => {
  //   // console.log(Object.keys(modalData));
  //   console.log(handleView.modalEditValue.qty);
  // }, [modalData]);
  return (
    <>
      <Modal
        isOpen={handleView.modalIsOpen}
        onAfterOpen={handleView.afterOpenModal}
        onRequestClose={handleView.closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button
          style={{ float: "right" }}
          className="button-red"
          onClick={handleView.closeModal}
        >
          TUTUP
        </button>
        <label style={{ display: "block" }}>Kode Barang</label>
        <select
          name="kode_barang"
          onChange={handleView.handleModalChange}
          required
        >
          <option value={""}>--</option>
          {dataBarang.map((barang, idx) => (
            <option key={idx} value={barang.kode}>
              {barang.kode}
            </option>
          ))}
        </select>
        <label style={{ display: "block" }}>Qty</label>
        <input
          name="qty"
          type={"number"}
          min={"0"}
          onChange={handleView.handleModalChange}
          required
        />
        <button
          className="button-green"
          type="button"
          onClick={() => handleView.handleModalAdd(modalData)}
          style={{ display: "block" }}
        >
          TAMBAH
        </button>
        {modalData?.map((barang, idx) => (
          <ul className="item" key={idx}>
            <li>
              {handleView.modalEditMode.status &&
              handleView.modalEditMode.rowKey === barang.kode_barang ? (
                <button
                  type="button"
                  onClick={() => handleView.handleModalEditSave(barang)}
                  className="button-green"
                >
                  SIMPAN
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => handleView.handleModalEdit(barang)}
                  className="button-green"
                >
                  UBAH
                </button>
              )}
            </li>
            <li>
              {handleView.modalEditMode.status &&
              handleView.modalEditMode.rowKey === barang.kode_barang ? (
                <button
                  type="button"
                  onClick={() => handleView.handleModalEditCancel(barang)}
                  className="button-red"
                >
                  BATAL
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => handleView.handleModalDelete(barang)}
                  className="button-red"
                >
                  HAPUS
                </button>
              )}
            </li>

            {handleView.modalEditMode.status &&
            handleView.modalEditMode.rowKey === barang.kode_barang ? (
              <li>
                <select
                  required
                  name="kode_barang"
                  onChange={handleView.handleModalEditChange}
                  style={{ display: "block" }}
                  defaultValue={handleView.modalEditValue.kode_barang}
                >
                  {dataBarang.map((barang, idx) => (
                    <option key={idx} value={barang.kode}>
                      {barang.kode}
                    </option>
                  ))}
                </select>
              </li>
            ) : (
              <li>KODE BARANG : {barang.kode_barang}</li>
            )}

            <li>ID NOTA : {barang.nota}</li>
            {handleView.modalEditMode.status &&
            handleView.modalEditMode.rowKey === barang.kode_barang ? (
              <input
                required
                name="qty"
                type={"number"}
                min={"0"}
                onChange={handleView.handleModalEditChange}
                defaultValue={handleView.modalEditValue.qty}
              />
            ) : (
              <li>QTY : {barang.qty}</li>
            )}
            <li>NAMA BARANG : {barang.barang_single.nama}</li>
            <li>KATEGORI BARANG : {barang.barang_single.kategori}</li>
            <li>HARGA BARANG : {barang.barang_single.harga}</li>
          </ul>
        ))}
      </Modal>
    </>
  );
}
