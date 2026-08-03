const APP_CONFIG = {
    VERSION: "12.1",
    APP_NAME: "Tesla QR Parking"
};

const config = {
    // 관리자 인증 설정
    auth: {
        adminEmails: [
            "eecorea@gmail.com"
        ]
    },

    // 연락 가능한 운전자 정보
    contacts: {
        owner: {
            name: "김범석",
            phone: "01072607368"
        },
        wife: {
            name: "최현진",
            phone: "01074869907"
        }
    },

    // 차량 정보
    vehicle: {
        model: "Tesla Model Y",
        status: "charging", // 기본값, script.js에서 localStorage 확인
        contactId: "owner"
    },



    // 기본 문자 메시지
    message: {
        sms:
`안녕하세요.
차량 이동 부탁드립니다.`
    },


    statusMap: {

        parked: {

            icon: "house",
            title: "주차 중",
            desc: "차량 확인이 필요한 경우 연락 부탁드립니다."

        },

        work: {

            icon: "briefcase",
            title: "업무 중",
            desc: "업무 중입니다. 확인 후 연락드리겠습니다."

        },

        away: {

            icon: "clock",
            title: "잠시 자리비움",
            desc: "잠시 자리를 비웠습니다. 확인 후 연락드리겠습니다."

        },

        meal: {

            icon: "utensils",
            title: "식사 중",
            desc: "식사 중입니다. 확인 후 연락드리겠습니다."

        },

        charging: {

            icon: "battery-charging",
            title: "충전 중",
            desc: "충전 중입니다. 확인 후 연락드리겠습니다."

        },

        shopping: {

            icon: "shopping-bag",
            title: "쇼핑 중",
            desc: "쇼핑 중입니다. 확인 후 연락드리겠습니다."

        }

    }

};
