const phoneNumber = config.owner.phone;

const smsMessage = config.message.sms;

const status = config.vehicle.status;


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



const current =
config.statusMap[status];



statusCard.innerHTML = `

<h3>
${current.emoji} ${current.title}
</h3>

<br>

${current.desc}

`;