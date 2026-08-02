// 관리자 여부 확인 (전역 변수)
const params = new URLSearchParams(window.location.search);
const isAdmin = params.get("admin") === "1";

const phoneNumber = config.owner.phone;


const smsMessage = config.message.sms;

const callButton =
document.getElementById("callButton");


const smsButton =
document.getElementById("smsButton");


const statusCard =
document.getElementById("statusCard");



callButton.href =
`tel:${phoneNumber}`;



smsButton.href =
`sms:${phoneNumber}?body=${encodeURIComponent(smsMessage)}`;



// 상태 업데이트 및 렌더링 통합
function updateStatus() {
    const current = config.statusMap[config.vehicle.status];
    statusCard.innerHTML = `
        <h3>${current.emoji} ${current.title}</h3>
        <br>
        ${current.desc}
    `;
    renderLastUpdated();
    renderAdminUpdated();
}

// 초기화 시 localStorage에서 상태 로드
const savedStatus = localStorage.getItem("vehicleStatus");
if (savedStatus) {
    config.vehicle.status = savedStatus;
}
updateStatus();

if ("serviceWorker" in navigator) {
// ... existing code ...


    window.addEventListener(
        "load",
        () => {

            navigator.serviceWorker
            .register("./service-worker.js")
            .then(
                registration => {
                    console.log(
                      "Service Worker 등록 완료",
                      registration
                    );
                }
            )
            .catch(
                error => {
                    console.log(
                      "Service Worker 실패",
                      error
                    );
                }
            );

        }
    );
}
// PWA 설치 이벤트 처리

let deferredPrompt;

const installButton = document.getElementById("install-button");

window.addEventListener(
    "beforeinstallprompt",
    event => {

        // 기본 설치 팝업 막기
        event.preventDefault();

        // 나중에 버튼 클릭 시 사용
        deferredPrompt = event;

        // 관리자 모드일 때만 설치 버튼 표시
        if (installButton && isAdmin) {
            installButton.hidden = false;
        }

    }
);



if (installButton) {

    installButton.addEventListener(
        "click",
        async () => {

            if (!deferredPrompt) {
                return;
            }

            // 설치 팝업 표시
            deferredPrompt.prompt();

            // 사용자 선택 결과
            const result = await deferredPrompt.userChoice;

            console.log(
                "설치 결과:",
                result.outcome
            );

            // 다시 사용하지 않도록 초기화
            deferredPrompt = null;

            // 버튼 숨김
            installButton.hidden = true;

        }
    );

}

document.addEventListener("DOMContentLoaded", () => {
    const version = document.getElementById("app-version");

    if (version) {
        if (isAdmin) {
            version.textContent = `${APP_CONFIG.APP_NAME} ${APP_CONFIG.VERSION}`;
            version.style.display = "block";
        } else {
            version.style.display = "none";
        }
    }

    // 마지막 업데이트 시간 표시 제어 (관리자 전용)
    const lastUpdateEl = document.getElementById("lastUpdate");
    if (lastUpdateEl) {
        lastUpdateEl.style.display = isAdmin ? "block" : "none";
    }
});


// QR Code 생성
const qrElement = document.getElementById("qrcode");

if (qrElement) {
    // 관리자 파라미터(?admin=1)를 제외한 순수 URL 생성
    const pureUrl = window.location.origin + window.location.pathname;

    new QRCode(
        qrElement,
        {
            text: pureUrl,
            width: 180,
            height: 180
        }
    );
}


// 관리자 모드 패널 제어
const adminPanel = document.getElementById("admin-panel");
if (adminPanel) {
    adminPanel.style.display = isAdmin ? "block" : "none";
}


function updateLastUpdated() {
    const now = Date.now();
    localStorage.setItem("lastUpdated", now);
    renderLastUpdated();
    renderAdminUpdated();
}

function getTimeText(diff) {
    if (diff < 60) return "🕒 방금 전";
    if (diff < 3600) return `🕒 ${Math.floor(diff / 60)}분 전`;
    if (diff < 86400) return `🕒 ${Math.floor(diff / 3600)}시간 전`;
    return `🕒 ${Math.floor(diff / 86400)}일 전`;
}

function renderLastUpdated() {
    const saved = localStorage.getItem("lastUpdated");
    if (!saved) return;

    const diff = Math.floor((Date.now() - Number(saved)) / 1000);
    const lastUpdateEl = document.getElementById("lastUpdate");
    if (lastUpdateEl) {
        lastUpdateEl.textContent = getTimeText(diff);
    }
}

function renderAdminUpdated() {
    const adminUpdate = document.getElementById("adminUpdate");
    if (!adminUpdate) return;

    const saved = localStorage.getItem("lastUpdated");
    if (!saved) return;

    const diff = Math.floor((Date.now() - Number(saved)) / 1000);
    adminUpdate.textContent = "마지막 변경 : " + getTimeText(diff);
}

function changeStatus(newStatus) {
    config.vehicle.status = newStatus;
    localStorage.setItem("vehicleStatus", newStatus);
    updateLastUpdated();
    updateStatus();
}

// 초기 실행 및 타이머
if (!localStorage.getItem("lastUpdated")) {
    updateLastUpdated();
}

if (isAdmin) {
    renderLastUpdated();
    renderAdminUpdated();

    setInterval(() => {
        renderLastUpdated();
        renderAdminUpdated();
    }, 60000);
}