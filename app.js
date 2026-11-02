const csvFile = "Plantify_IoT_Data_ML.csv";

const downloadBtn = document.getElementById("downloadBtn");
const loading = document.getElementById("loading");
const dataTable = document.getElementById("dataTable");
const tableHead = document.getElementById("tableHead");
const tableBody = document.getElementById("tableBody");

// Konfigurasi tautan tombol download
downloadBtn.href = csvFile;
downloadBtn.setAttribute("download", csvFile);

// Eksekusi pengambilan dan pembacaan CSV
Papa.parse(csvFile, {
  download: true,
  header: true,
  skipEmptyLines: true,
  complete: function (results) {
    const data = results.data;
    if (data.length > 0) {
      const headers = Object.keys(data[0]);

      // Membuat Header Tabel
      let trHead = document.createElement("tr");
      headers.forEach((header) => {
        let th = document.createElement("th");
        th.innerText = header;
        trHead.appendChild(th);
      });
      tableHead.appendChild(trHead);

      // Membuat Isi Baris Tabel
      data.forEach((row) => {
        let trBody = document.createElement("tr");
        headers.forEach((header) => {
          let td = document.createElement("td");
          td.innerText = row[header] || "-";
          trBody.appendChild(td);
        });
        tableBody.appendChild(trBody);
      });

      // Tampilkan tabel, sembunyikan teks loading
      loading.classList.add("hidden");
      dataTable.classList.remove("hidden");
    } else {
      loading.innerHTML = "Data CSV kosong.";
    }
  },
  error: function () {
    loading.innerHTML =
      "Gagal memuat file CSV. Pastikan file Plantify_IoT_Data_ML.csv tersedia.";
  },
});
