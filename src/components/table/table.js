import "./table.css";

export default function Table({ headerData, recordData }) {
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
            <td>{record.nama}</td>
            <td>{record.domisili}</td>
            <td>{record.jenis_kelamin}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
