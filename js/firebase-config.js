// Firebase 콘솔에서 발급받은 웹 앱 설정값으로 교체한다.
export const FIREBASE_CONFIG = {
    apiKey: "AIzaSyBo7gqmyNtAMnQY6sIEfyXPd0LwQCm8tpc",
    authDomain: "tesla-qr-parking.firebaseapp.com",
    projectId: "tesla-qr-parking",
    storageBucket: "tesla-qr-parking.firebasestorage.app",
    messagingSenderId: "114230896223",
    appId: "1:114230896223:web:ccb0e2d9e8fad5d7fe5dea",
    measurementId: "G-R3J9RF4L1P"
};

export function isFirebaseConfigured() {
    return Object.values(FIREBASE_CONFIG).every(Boolean);
}
