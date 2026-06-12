// --- STATE MANAGEMENT ---
let currentStep = 1;
const totalSteps = 6;

// Menggabungkan variasi judul langkah dari kedua versi kode
const stepTitles = [
    "Langkah 1: Persiapan Alat",
    "Langkah 2: Persiapan Software",
    "Langkah 3: Pemasangan Kabel (Wiring)",
    "Langkah 4: Uji Coba Perangkat",
    "Langkah 5: Pendaftaran Akun SmartCitizen",
    "Langkah 6: Tahap Akhir: Deploy Sensor!"
];

// Menggabungkan variasi tips menarik dari Kiki si Kucing Coder agar tetap interaktif
const stepTips = [
    "Selalu simpan kabel cadangan di dekatmu, siapa tahu yang satu macet!",
    "Kalau download lambat, coba ganti koneksi WiFi ke hotspot HP atau tunggu beberapa detik untuk compile pertama kali ya.",
    "Warna kabel tidak wajib sama, yang penting tujuannya benar! Jangan sampai pin SCL dan SDA tertukar.",
    "Jangan panik kalau sensor tidak terbaca atau Serial Monitor kosong, coba ganti kabel data USB-C atau tekan tombol RESET di XIAO.",
    "Token itu rahasia, jangan dibagikan ke sembarang orang di grup chat atau repositori publik GitHub Anda!",
    "Kamu sudah di garis finish! Tinggal pasang di balkon atau luar jendela untuk berkontribusi langsung pada udara Tangerang."
];

// --- CORE WIZARD FUNCTIONS ---
function changeStep(direction) {
    const newStep = currentStep + direction;
    if (newStep < 1 || newStep > totalSteps) return;

    // Kompatibilitas untuk HTML yang menggunakan class 'active' atau sistem utilitas 'hidden/block'
    const currentElement = document.getElementById(`step-${currentStep}`);
    if (currentElement) {
        currentElement.classList.remove('active');
        currentElement.classList.replace('block', 'hidden');
    }

    currentStep = newStep;

    const nextElement = document.getElementById(`step-${currentStep}`);
    if (nextElement) {
        nextElement.classList.add('active');
        nextElement.classList.replace('hidden', 'block');
    }

    // Memanggil kedua fungsi pembaruan UI agar sinkron dengan semua elemen HTML Anda
    updateUI();
    updateWizardUI();

    // Efek scroll otomatis yang smooth ke area wizard
    const wizardSection = document.getElementById('wizard-section');
    if (wizardSection) {
        window.scrollTo({
            top: wizardSection.offsetTop - 100,
            behavior: 'smooth'
        });
    }
}

// Fungsi Pembaruan UI - Versi Standar
function updateUI() {
    const progressBar = document.getElementById('progress-bar');
    if (progressBar) {
        const progress = (currentStep / totalSteps) * 100;
        progressBar.style.width = `${progress}%`;
    }

    const stepTitle = document.getElementById('step-title');
    if (stepTitle) stepTitle.innerText = stepTitles[currentStep - 1];

    const stepCounter = document.getElementById('step-counter');
    if (stepCounter) stepCounter.innerText = `${currentStep} dari ${totalSteps}`;

    const dynamicTip = document.getElementById('dynamic-tip');
    if (dynamicTip) dynamicTip.innerText = stepTips[currentStep - 1];

    const prevBtn = document.getElementById('prev-btn');
    if (prevBtn) {
        prevBtn.disabled = (currentStep === 1);
        prevBtn.style.opacity = (currentStep === 1) ? "0.3" : "1";
        prevBtn.style.cursor = (currentStep === 1) ? "not-allowed" : "pointer";
    }

    const nextBtn = document.getElementById('next-btn');
    const finishBtn = document.getElementById('finish-btn');

    if (nextBtn && finishBtn) {
        if (currentStep === totalSteps) {
            nextBtn.classList.add('hidden');
            finishBtn.classList.remove('hidden');
        } else {
            nextBtn.classList.remove('hidden');
            finishBtn.classList.add('hidden');
        }
    }
}


// Fungsi Pembaruan UI - Versi Fleksibel Tailwind (Menjaga kompatibilitas class)
function updateWizardUI() {
    const prevBtn = document.getElementById('prev-btn');
    if (prevBtn) {
        if (currentStep === 1) {
            prevBtn.setAttribute('disabled', 'true');
            prevBtn.classList.add('opacity-50', 'cursor-not-allowed');
        } else {
            prevBtn.removeAttribute('disabled');
            prevBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        }
    }
}

// --- TOGGLE PACKAGE FUNCTION ---
// Menggunakan logika komparasi penuh yang mencakup manipulasi baris tabel, teks paket dinamis, dan penggantian diagram.
function togglePackage(pkg) {
    const plusItem = document.getElementById('plus-item');
    const btnBasic = document.getElementById('btn-basic');
    const btnPlus = document.getElementById('btn-plus');

    // Elemen manipulasi dinamis Langkah 3 (Wiring)
    const plusRows = document.querySelectorAll('.plus-wiring-row');
    const txtPackage = document.getElementById('active-package-text');
    const diagBasic = document.getElementById('diagram-basic');
    const diagPlus = document.getElementById('diagram-plus');

    if (!plusItem || !btnBasic || !btnPlus) return;

    if (pkg === 'plus' || pkg === 'plus') {
        // Efek visual di Langkah 1
        plusItem.classList.remove('opacity-40', 'grayscale');
        plusItem.className = plusItem.className.replace('opacity-40 grayscale', '').trim(); // memastikan sinkronisasi class dasar

        btnPlus.className = "px-4 sm:px-6 py-2 rounded-md font-label-caps text-xs sm:text-sm bg-primary text-on-primary transition-all";
        btnBasic.className = "px-4 sm:px-6 py-2 rounded-md font-label-caps text-xs sm:text-sm text-on-surface-variant hover:bg-surface-variant transition-all";

        btnPlus.classList.add('bg-primary', 'text-on-primary');
        btnBasic.classList.remove('bg-primary', 'text-on-primary');
        btnBasic.classList.add('text-on-surface-variant');

        // Perubahan data panduan kabel di Langkah 3 ke Versi Plus
        if (txtPackage) txtPackage.innerText = "Paket Plus (+ Layar OLED)";
        if (diagBasic) diagBasic.classList.replace('block', 'hidden');
        if (diagPlus) diagPlus.classList.replace('hidden', 'block');
        plusRows.forEach(row => row.classList.remove('hidden'));

    } else {
        // Efek visual di Langkah 1
        plusItem.classList.add('opacity-40', 'grayscale');

        btnBasic.className = "px-4 sm:px-6 py-2 rounded-md font-label-caps text-xs sm:text-sm bg-primary text-on-primary transition-all";
        btnPlus.className = "px-4 sm:px-6 py-2 rounded-md font-label-caps text-xs sm:text-sm text-on-surface-variant hover:bg-surface-variant transition-all";

        btnBasic.classList.add('bg-primary', 'text-on-primary');
        btnPlus.classList.remove('bg-primary', 'text-on-primary');
        btnPlus.classList.add('text-on-surface-variant');

        // Perubahan data panduan kabel di Langkah 3 ke Versi Basic
        if (txtPackage) txtPackage.innerText = "Paket Basic";
        if (diagBasic) diagBasic.classList.replace('hidden', 'block');
        if (diagPlus) diagPlus.classList.replace('block', 'hidden');
        plusRows.forEach(row => row.classList.add('hidden'));
    }
}

function scrollToWizard() {
    const wizardSection = document.getElementById('wizard-section');
    if (wizardSection) wizardSection.scrollIntoView({ behavior: 'smooth' });
}

// --- UTILITY CODE FUNCTIONS (Menggunakan penanganan modern async/then) ---
async function copyText(text, btn) {
    if (!btn) return;
    await navigator.clipboard.writeText(text);
    const originalContent = btn.innerHTML;
    btn.innerHTML = `<span class="material-symbols-outlined text-sm">check</span>`;
    setTimeout(() => { btn.innerHTML = originalContent; }, 2000);
}

async function copyCode(id, btn) {
    const element = document.getElementById(id);
    if (!element || !btn) return;
    const code = element.innerText;
    await navigator.clipboard.writeText(code);
    const originalText = btn.innerHTML;
    btn.innerHTML = `<span class="material-symbols-outlined text-sm">check</span> Berhasil!`;
    setTimeout(() => { btn.innerHTML = originalText; }, 2000);
}

// --- FINISH PRODUCING AND CELEBRATING ---
function finishWizard() {
    const successMessage = document.getElementById('success-message');
    if (successMessage) successMessage.classList.remove('hidden');

    const celebrationHeader = document.getElementById('celebration-header');
    if (celebrationHeader) {
        celebrationHeader.classList.add('hidden');
        celebrationHeader.scrollIntoView({ behavior: 'smooth' });
    }

    const finishBtn = document.getElementById('finish-btn');
    if (finishBtn) {
        finishBtn.innerText = "Sudah Terpasang! ✨";
        finishBtn.disabled = true;
    }

    // Menampilkan pesan sukses kepada user
    alert("Hore! Selamat sudah berkontribusi untuk Tangerang yang lebih bersih!");
}

// --- NAVIGATION & RESPONSIVE DASHBOARD INTERACTION ---
const menuBtn = document.getElementById('menu-btn');
const menuIcon = document.getElementById('menu-icon');
const mobileMenu = document.getElementById('mobile-menu');

const desktopDataBtn = document.getElementById('desktop-data-btn');
const desktopDropdown = document.getElementById('desktop-dropdown');
const dataArrow = document.getElementById('data-arrow');

const mobileDataBtn = document.getElementById('mobile-data-btn');
const mobileDataSub = document.getElementById('mobile-data-sub');
const mobileDataArrow = document.getElementById('mobile-data-arrow');

function toggleMobileMenu() {
    if (!mobileMenu || !menuIcon) return;
    mobileMenu.classList.toggle('hidden');
    mobileMenu.classList.toggle('flex');
    menuIcon.innerText = mobileMenu.classList.contains('hidden') ? 'menu' : 'close';
}

// Mobile Hamburger Toggle
if (menuBtn) menuBtn.addEventListener('click', toggleMobileMenu);

// Desktop Dropdown Data Toggle on Click
if (desktopDataBtn && desktopDropdown && dataArrow) {
    desktopDataBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        desktopDropdown.classList.toggle('hidden');
        dataArrow.classList.toggle('rotate-180');
    });
}

// Mobile Dropdown Sub-menu Toggle
if (mobileDataBtn && mobileDataSub && mobileDataArrow) {
    mobileDataBtn.addEventListener('click', () => {
        mobileDataSub.classList.toggle('hidden');
        mobileDataArrow.classList.toggle('rotate-180');
    });
}

// Menutup dropdown otomatis jika user mengklik area di luar menu
document.addEventListener('click', () => {
    if (desktopDropdown && dataArrow) {
        desktopDropdown.classList.add('hidden');
        dataArrow.classList.remove('rotate-180');
    }
});

// Router Function untuk Mengatur Tampilan Konten vs Dashboard Utama
function toggleDashboard(showDashboard) {
    const mainContent = document.getElementById('main-content-wrapper');
    const dashboardContent = document.getElementById('dashboard-section');

    if (!mainContent || !dashboardContent) return;

    if (showDashboard) {
        mainContent.classList.add('hidden');
        dashboardContent.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        mainContent.classList.remove('hidden');
        dashboardContent.classList.add('hidden');
    }
}