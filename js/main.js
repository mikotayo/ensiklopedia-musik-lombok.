
document.addEventListener("DOMContentLoaded", function () {

    // =====================================
    // 1. MENAMPILKAN KARTU DI HALAMAN BERANDA
    // =====================================

    const instrumentList = document.getElementById("instrument-list");

    if (instrumentList) {

        instrumentList.innerHTML = "";

        // Beranda hanya menampilkan 4 alat musik unggulan
        instruments.slice(0, 4).forEach(function (instrument) {

            const card = `
                <div class="col-md-6 col-lg-4">

                    <div class="instrument-card">

                        <img
                            src="${instrument.image}"
                            alt="${instrument.name}"
                            class="instrument-image"
                        >

                        <div class="instrument-content">

                            <span class="instrument-category">
                                ${instrument.category}
                            </span>

                            <h3>${instrument.name}</h3>

                            <p>
                                ${instrument.description}
                            </p>

                            <a
                                href="detail.html?id=${instrument.id}"
                                class="detail-button"
                            >
                                Lihat Detail →
                            </a>

                        </div>

                    </div>

                </div>
            `;

            instrumentList.innerHTML += card;

        });

    }


    // =====================================
    // 2. PENCARIAN DAN FILTER KATALOG
    // =====================================

    const catalogList = document.getElementById("catalog-list");
    const searchInput = document.getElementById("searchInput");
    const filterJenis = document.getElementById("filterJenis");

    if (catalogList) {

        function renderCatalog() {

            const keyword = searchInput.value.toLowerCase().trim();
            const selectedJenis = filterJenis.value;

            // Menyaring data alat musik
            const filteredInstruments = instruments.filter(function (instrument) {

                const cocokNama =
                    instrument.name.toLowerCase().includes(keyword);

                const cocokDeskripsi =
                    instrument.description.toLowerCase().includes(keyword);

                const cocokJenis =
                    selectedJenis === "semua" ||
                    instrument.jenis === selectedJenis;

                return (cocokNama || cocokDeskripsi) && cocokJenis;

            });

            // Mengosongkan daftar kartu
            catalogList.innerHTML = "";

            // Menampilkan pesan jika data tidak ditemukan
            if (filteredInstruments.length === 0) {

                catalogList.innerHTML = `
                    <p class="catalog-empty">
                        Alat musik yang Anda cari tidak ditemukan.
                    </p>
                `;

                return;
            }

            // Menampilkan kartu hasil pencarian
            filteredInstruments.forEach(function (instrument) {

                const card = `
                    <div class="catalog-card">

                        <img
                            src="${instrument.image}"
                            alt="${instrument.name}"
                        >

                        <div class="catalog-info">

                            <h3>${instrument.name}</h3>

                            <p>${instrument.description}</p>

                            <a
                                href="detail.html?id=${instrument.id}"
                                class="catalog-detail-button"
                            >
                                Lihat Detail
                            </a>

                        </div>

                    </div>
                `;

                catalogList.innerHTML += card;

            });

        }

        // Menjalankan pencarian saat pengguna mengetik
        if (searchInput) {
            searchInput.addEventListener("input", renderCatalog);
        }

        // Menjalankan filter saat jenis dipilih
        if (filterJenis) {
            filterJenis.addEventListener("change", renderCatalog);
        }

        // Menampilkan seluruh data saat halaman pertama dibuka
        renderCatalog();

    }



    // =====================================
    // 3. MEMERIKSA HALAMAN DETAIL
    // =====================================

    const detailContent = document.getElementById("detailContent");

    // Jika bukan halaman detail, hentikan proses detail
    // Fungsi Beranda dan Katalog sudah dijalankan sebelumnya
    if (!detailContent) {
        return;
    }


    // =====================================
    // 4. MENGAMBIL ID DARI URL
    // =====================================

    const params = new URLSearchParams(window.location.search);

    const instrumentId = Number(params.get("id"));

    const instrument = instruments.find(function (item) {
        return item.id === instrumentId;
    });


    // =====================================
    // 5. MEMERIKSA DATA ALAT MUSIK
    // =====================================

    if (!instrument) {

        detailContent.style.display = "none";

        document.getElementById("detailNotFound").style.display = "block";

        return;
    }


    // =====================================
    // 6. MENAMPILKAN INFORMASI ALAT MUSIK
    // =====================================

    document.title = `Detail ${instrument.name} - Lombok Musik`;

    document.getElementById("detailName").textContent =
        instrument.name;

    document.getElementById("detailImage").src =
        instrument.image;

    document.getElementById("detailImage").alt =
        instrument.name;

    document.getElementById("detailCategory").textContent =
        instrument.category + " Lombok";

    document.getElementById("detailDescription").textContent =
        instrument.description;

    document.getElementById("detailHistory").textContent =
        instrument.history;

    document.getElementById("detailFunction").textContent =
        instrument.function;

    document.getElementById("detailHowToPlay").textContent =
        instrument.howToPlay;

    document.getElementById("detailUniqueness").textContent =
        instrument.uniqueness || "Informasi keunikan belum tersedia.";


    // =====================================
    // 7. MENGATUR AUDIO
    // =====================================

    const audio = document.getElementById("detailAudio");

    const audioUnavailable =
        document.getElementById("audioUnavailable");

    document.getElementById("audioTitle").textContent =
        `🎵 Dengarkan Suara ${instrument.name}`;

    document.getElementById("audioDescription").textContent =
        `Dengarkan suara khas alat musik tradisional ${instrument.name}.`;

    if (instrument.audio) {

        audio.innerHTML = `
            <source src="${instrument.audio}" type="audio/mpeg">
        `;

        audio.style.display = "block";

        audioUnavailable.style.display = "none";

        audio.load();

    } else {

        audio.pause();

        audio.removeAttribute("src");

        audio.innerHTML = "";

        audio.style.display = "none";

        audioUnavailable.style.display = "block";

    }


    // =====================================
    // 8. MENGATUR VIDEO
    // =====================================

    const video = document.getElementById("detailVideo");

    const videoUnavailable =
        document.getElementById("videoUnavailable");

    document.getElementById("videoTitle").textContent =
        `🎬 Video Pertunjukan ${instrument.name}`;

    document.getElementById("videoDescription").textContent =
        `Saksikan dokumentasi pertunjukan alat musik tradisional ${instrument.name}.`;

    if (instrument.video) {

        video.innerHTML = `
            <source src="${instrument.video}" type="video/mp4">
        `;

        video.style.display = "block";

        videoUnavailable.style.display = "none";

        video.load();

    } else {

        video.pause();

        video.removeAttribute("src");

        video.innerHTML = "";

        video.style.display = "none";

        videoUnavailable.style.display = "block";

    }

});
