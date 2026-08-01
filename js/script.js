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



function updateStatus(){

    const current =
    config.statusMap[
        config.vehicle.status
    ];

    statusCard.innerHTML = `
        <h3>${current.emoji} ${current.title}</h3>
        <br>
        ${current.desc}
    `;

    renderLastUpdated();

}

const savedStatus =
    localStorage.getItem("vehicleStatus");

if (savedStatus) {

    config.vehicle.status = savedStatus;

}

updateStatus();
renderAdminUpdated();

if ("serviceWorker" in navigator) {

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

        // 설치 버튼 표시
        if (installButton) {
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
        version.textContent =
    `${APP_CONFIG.APP_NAME} ${APP_CONFIG.VERSION}`;
    }
});

// QR Code 생성

const qrElement = document.getElementById("qrcode");

if (qrElement) {

    new QRCode(
        qrElement,
        {
            text: window.location.href,
            width: 180,
            height: 180
        }
    );

}

// 관리자 모드 확인
const adminPanel = document.getElementById("admin-panel");

if (adminPanel) {

    const params = new URLSearchParams(window.location.search);

    const isAdmin = params.get("admin") === "1";

    adminPanel.style.display = isAdmin ? "block" : "none";

}

function updateLastUpdated() {

    const now = Date.now();

    localStorage.setItem(
        "lastUpdated",
        now
    );

    renderLastUpdated();

}
function renderLastUpdated() {

    const saved =
        localStorage.getItem("lastUpdated");

    if (!saved) return;

    const diff =
        Math.floor(
            (Date.now() - Number(saved))
            /1000
        );

    let text;

    if (diff < 60) {

        text = "🕒 방금 전";

    } else if (diff < 3600) {

        text =
            `🕒 ${Math.floor(diff/60)}분 전`;

    } else if (diff < 86400) {

        text =
            `🕒 ${Math.floor(diff/3600)}시간 전`;

    } else {

        text =
            `🕒 ${Math.floor(diff/86400)}일 전`;

    }

    document
        .getElementById("lastUpdate")
        .textContent = text;

}
renderLastUpdated();

setInterval(
    renderLastUpdated,
    60000
);
function changeStatus(newStatus) {

    config.vehicle.status = newStatus;

    localStorage.setItem(
        "vehicleStatus",
        newStatus
    );

    updateLastUpdated();

    updateStatus();

}

const savedTime = localStorage.getItem("lastUpdated");

if (savedTime) {

    document.getElementById("lastUpdate").textContent =
        "🕒 마지막 업데이트 : " + savedTime;

}

if (!localStorage.getItem("lastUpdated")) {

    updateLastUpdated();

}

renderLastUpdated();

setInterval(
    renderLastUpdated,
    60000
);

function renderAdminUpdated(){

    const adminUpdate =
        document.getElementById("adminUpdate");

    if(!adminUpdate) return;

    const saved =
        localStorage.getItem("lastUpdated");

    if(!saved) return;

    const diff =
        Math.floor(
            (Date.now() - Number(saved)) / 1000
        );

    let text;

    if(diff < 60){
        text = "🕒 방금 전";
    }
    else if(diff < 3600){
        text = `🕒 ${Math.floor(diff/60)}분 전`;
    }
    else{
        text = `🕒 ${Math.floor(diff/3600)}시간 전`;
    }

    adminUpdate.textContent =
        "마지막 변경 : " + text;

}