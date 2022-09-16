import React from "react";
// import ReactDOM from "react-dom";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "500px",
  },
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
        <button onClick={handleView.closeModal}>close</button>
        <label style={{ display: "block" }}>Kode Barang</label>
        <select name="kode_barang" onChange={handleView.handleModalChange}>
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
        />
        <button
          type="button"
          onClick={() => handleView.handleModalAdd(modalData)}
        >
          TAMBAH
        </button>
        {modalData?.map((barang, idx) => (
          <ul key={idx}>
            {handleView.modalEditMode.status &&
            handleView.modalEditMode.rowKey === barang.kode_barang ? (
              <button
                type="button"
                onClick={() => handleView.handleModalEditSave(barang)}
              >
                SIMPAN
              </button>
            ) : (
              <button
                type="button"
                onClick={() => handleView.handleModalEdit(barang)}
              >
                UBAH
              </button>
            )}
            {handleView.modalEditMode.status &&
            handleView.modalEditMode.rowKey === barang.kode_barang ? (
              <button
                type="button"
                onClick={() => handleView.handleModalEditCancel(barang)}
              >
                BATAL
              </button>
            ) : (
              <button
                type="button"
                onClick={() => handleView.handleModalDelete(barang)}
              >
                HAPUS
              </button>
            )}
            {handleView.modalEditMode.status &&
            handleView.modalEditMode.rowKey === barang.kode_barang ? (
              <li>
                <select
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
        <form></form>
      </Modal>
    </>
  );
}
