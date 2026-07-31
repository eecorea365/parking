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



function updateStatus() {

    const current =
    config.statusMap[
        config.vehicle.status
    ];

    statusCard.innerHTML = `
        <h3>${current.emoji} ${current.title}</h3>
        <br>
        ${current.desc}
    `;

}

updateStatus();

function changeStatus(newStatus) {

    config.vehicle.status = newStatus;

    localStorage.setItem(
        "vehicleStatus",
        newStatus
    );

    updateStatus();

}

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