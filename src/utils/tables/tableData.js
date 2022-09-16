const headerPelanggan = [
  "ID PELANGGAN",
  "NAMA",
  "DOMISILI",
  "JENIS KELAMIN",
  "UBAH | HAPUS",
];

const recordDataExample = [
  {
    id: 1,
    id_pelanggan: "PELANGGAN_1",
    nama: "ANDI",
    domisili: "JAK-UT",
    jenis_kelamin: "PRIA",
  },
  {
    id: 2,
    id_pelanggan: "PELANGGAN_2",
    nama: "BUDI",
    domisili: "JAK-BAR",
    jenis_kelamin: "PRIA",
  },
  {
    id: 3,
    id_pelanggan: "PELANGGAN_3",
    nama: "SHINTA",
    domisili: "JAK-SEL",
    jenis_kelamin: "WANITA",
  },
];

const headerBarang = ["KODE", "NAMA", "KATEGORI", "HARGA", "UBAH | HAPUS"];
const headerPenjualan = [
  "ID NOTA",
  "TGL",
  "KODE PELANGGAN",
  "SUBTOTAL",
  "ITEM | UBAH | HAPUS",
];

export { headerPelanggan, recordDataExample, headerBarang, headerPenjualan };
