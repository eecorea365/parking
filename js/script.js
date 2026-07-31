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