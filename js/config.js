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
            name: "배우자",
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


    // 차량 상태 목록
    statusMap: {

        available: {

            emoji: "🟢",
            title: "현재 차량 확인 가능",
            desc: "평균 응답시간 : 약 5분"

        },


        charging: {

            emoji: "🔋",
            title: "충전 중",
            desc: "충전이 끝나는 즉시 이동하겠습니다."

        },


        shopping: {

            emoji: "🛒",
            title: "쇼핑 중",
            desc: "확인 후 빠르게 이동하겠습니다."

        },


        meal: {

            emoji: "🍽️",
            title: "식사 중",
            desc: "잠시만 기다려 주세요."

        },


        driving: {

            emoji: "🚗",
            title: "운전 중",
            desc: "안전한 곳에서 확인하겠습니다."

        }

    }

};
