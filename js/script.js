const phoneNumber = "01072607368";

const smsMessage =
`안녕하세요.
차량 이동 부탁드립니다.`;

const callButton =
document.getElementById("callButton");

const smsButton =
document.getElementById("smsButton");

callButton.href =
`tel:${phoneNumber}`;

smsButton.href =
`sms:${phoneNumber}?body=${encodeURIComponent(smsMessage)}`;