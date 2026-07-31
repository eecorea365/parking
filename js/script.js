const phoneNumber = "01012345678";

const smsMessage =
`안녕하세요.
차량 이동 부탁드립니다.`;

const status = "charging";
// available
// charging
// shopping
// driving
// meal

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

const statusMap = {

available:{

emoji:"🟢",

title:"현재 차량 확인 가능",

desc:"평균 응답시간 : 약 5분"

},

charging:{

emoji:"🔋",

title:"충전 중",

desc:"충전이 끝나는 즉시 이동하겠습니다."

},

shopping:{

emoji:"🛒",

title:"쇼핑 중",

desc:"확인 후 빠르게 이동하겠습니다."

},

meal:{

emoji:"🍽️",

title:"식사 중",

desc:"잠시만 기다려 주세요."

},

driving:{

emoji:"🚗",

title:"운전 중",

desc:"안전한 곳에서 확인하겠습니다."

}

};

const current =
statusMap[status];

statusCard.innerHTML=`
<h3>${current.emoji} ${current.title}</h3>
<br>
${current.desc}
`;