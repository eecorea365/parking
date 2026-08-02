import {
    isFirebaseConfigured,
    saveVehicleContact,
    saveVehicleStatus,
    subscribeToVehicleStatus
} from "./firebase.js";
import {
    isAdmin as hasAdminAccess,
    login,
    logout,
    onAuthStateChanged
} from "./auth.js";

// 관리자 여부 확인 (전역 변수)
const params = new URLSearchParams(window.location.search);
const isAdminPage = window.location.pathname.endsWith("/admin.html");

// 기존 관리자 주소와 설치된 PWA를 새 관리자 페이지로 이동한다.
if (!isAdminPage && params.get("admin") === "1") {
    window.location.replace(new URL("./admin.html", window.location.href));
}
const firebaseEnabled = isFirebaseConfigured();
const buildCommit = window.BUILD_INFO && window.BUILD_INFO.commit;
const buildLabel = /^[0-9a-f]{7,40}$/i.test(buildCommit)
    ? ` · ${buildCommit.slice(0, 7)}`
    : "";
let authenticatedAdmin = false;
let updateTimer;

const smsMessage = config.message.sms;

const callButton =
document.getElementById("callButton");


const smsButton =
document.getElementById("smsButton");


const statusCard =
document.getElementById("statusCard");



function renderContact() {
    const contact = config.contacts[config.vehicle.contactId] || config.contacts.owner;
    if (!contact) return;

    callButton.href = `tel:${contact.phone}`;
    smsButton.href = `sms:${contact.phone}?body=${encodeURIComponent(smsMessage)}`;

    const contactUpdate = document.getElementById("contactUpdate");
    if (contactUpdate) {
        contactUpdate.textContent = `현재 연락처 : ${contact.name} (${contact.phone})`;
    }
}

// 상태 업데이트 및 렌더링 통합
function updateStatus() {
    const current = config.statusMap[config.vehicle.status];
    statusCard.className = `status ${config.vehicle.status}`;
    statusCard.innerHTML = `
        <h3><i data-icon="${current.icon}" aria-hidden="true"></i><span>${current.title}</span></h3>
        <br>
        ${current.desc}
    `;
    window.renderIcons?.(statusCard);
    renderContact();
    renderLastUpdated();
    renderAdminUpdated();
}

// 초기화 시 localStorage에서 상태 로드
const savedStatus = !firebaseEnabled && localStorage.getItem("vehicleStatus");
if (savedStatus && config.statusMap[savedStatus]) {
    config.vehicle.status = savedStatus;
}
const savedContact = !firebaseEnabled && localStorage.getItem("vehicleContactId");
if (savedContact && config.contacts[savedContact]) {
    config.vehicle.contactId = savedContact;
}
updateStatus();

if ("serviceWorker" in navigator) {
// ... existing code ...


    window.addEventListener(
        "load",
        () => {

            navigator.serviceWorker
            .register("./service-worker.js", { updateViaCache: "none" })
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
        if (installButton && authenticatedAdmin) {
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

// QR Code 생성
const qrElement = document.getElementById("qrcode");

if (qrElement) {
    // 관리자 페이지에서도 QR은 일반 사용자 페이지를 가리킨다.
    const publicUrl = new URL(window.location.href);
    publicUrl.search = "";
    publicUrl.hash = "";
    if (isAdminPage) {
        publicUrl.pathname = publicUrl.pathname.replace(/admin\.html$/, "index.html");
    }

    new QRCode(
        qrElement,
        {
            text: publicUrl.toString(),
            width: 180,
            height: 180
        }
    );
}


// 관리자 인증 UI 제어
const adminPanel = document.getElementById("admin-panel");
const adminAuth = document.getElementById("admin-auth");
const authMessage = document.getElementById("authMessage");
const loginButton = document.getElementById("loginButton");
const logoutButton = document.getElementById("logoutButton");
const version = document.getElementById("app-version");
const lastUpdateEl = document.getElementById("lastUpdate");

function renderAdminUi(user) {
    // 인증은 권한을 확인하고, 관리자 URL은 관리 화면 진입을 결정한다.
    authenticatedAdmin = isAdminPage && hasAdminAccess();

    if (adminPanel) {
        adminPanel.hidden = !authenticatedAdmin;
    }

    if (adminAuth) {
        adminAuth.hidden = !isAdminPage;
    }

    if (authMessage && isAdminPage) {
        authMessage.textContent = user
            ? (authenticatedAdmin ? `${user.email} 관리자 로그인됨` : "관리자 권한이 없는 계정입니다.")
            : "Google 계정으로 로그인해 주세요.";
    }

    if (loginButton) loginButton.hidden = !isAdminPage || Boolean(user);
    if (logoutButton) logoutButton.hidden = !isAdminPage || !user;

    if (version) {
        version.textContent = authenticatedAdmin
            ? `${APP_CONFIG.APP_NAME} ${APP_CONFIG.VERSION}${buildLabel}`
            : "";
        version.style.display = authenticatedAdmin ? "block" : "none";
    }

    if (lastUpdateEl) {
        lastUpdateEl.style.display = authenticatedAdmin ? "block" : "none";
    }

    if (authenticatedAdmin && !updateTimer) {
        renderLastUpdated();
        renderAdminUpdated();
        updateTimer = setInterval(() => {
            renderLastUpdated();
            renderAdminUpdated();
        }, 60000);
    } else if (!authenticatedAdmin && updateTimer) {
        clearInterval(updateTimer);
        updateTimer = undefined;
    }

    if (installButton && deferredPrompt) {
        installButton.hidden = !authenticatedAdmin;
    }
}

if (loginButton) {
    loginButton.addEventListener("click", async () => {
        try {
            await login();
        } catch (error) {
            console.error("Google 로그인 실패", error);
            alert("로그인하지 못했습니다. Firebase Authentication 설정을 확인해 주세요.");
        }
    });
}

if (logoutButton) {
    logoutButton.addEventListener("click", async () => {
        try {
            await logout();
        } catch (error) {
            console.error("로그아웃 실패", error);
        }
    });
}

renderAdminUi(null);
onAuthStateChanged(renderAdminUi);


function updateLastUpdated() {
    const now = Date.now();
    localStorage.setItem("lastUpdated", now);
    renderLastUpdated();
    renderAdminUpdated();
}

function applyFirebaseStatus(data) {
    if (!data) return;

    if (config.statusMap[data.status]) {
        config.vehicle.status = data.status;
    }

    if (config.contacts[data.contactId]) {
        config.vehicle.contactId = data.contactId;
    }

    if (data.updatedAt && typeof data.updatedAt.toMillis === "function") {
        localStorage.setItem("lastUpdated", data.updatedAt.toMillis());
    }

    updateStatus();
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

async function changeStatus(newStatus) {
    if (!authenticatedAdmin || !config.statusMap[newStatus]) return;

    if (firebaseEnabled) {
        try {
            await saveVehicleStatus(newStatus);
        } catch (error) {
            console.error("Firebase 상태 저장 실패", error);
            alert("상태를 저장하지 못했습니다. Firebase 설정과 연결을 확인해 주세요.");
        }
        return;
    }

    config.vehicle.status = newStatus;
    localStorage.setItem("vehicleStatus", newStatus);
    updateLastUpdated();
    updateStatus();
}

async function changeContact(contactId) {
    if (!authenticatedAdmin || !config.contacts[contactId]) return;

    if (firebaseEnabled) {
        try {
            await saveVehicleContact(contactId);
        } catch (error) {
            console.error("Firebase 연락처 저장 실패", error);
            alert("연락처를 저장하지 못했습니다. Firebase 설정과 연결을 확인해 주세요.");
        }
        return;
    }

    config.vehicle.contactId = contactId;
    localStorage.setItem("vehicleContactId", contactId);
    updateLastUpdated();
    updateStatus();
}

// 인라인 관리자 버튼에서 호출할 수 있도록 공개한다.
window.changeStatus = changeStatus;
window.changeContact = changeContact;

// 초기 실행 및 타이머
if (!firebaseEnabled && !localStorage.getItem("lastUpdated")) {
    updateLastUpdated();
}

if (firebaseEnabled) {
    subscribeToVehicleStatus(
        applyFirebaseStatus,
        error => console.error("Firebase 상태 구독 실패", error)
    );
}
