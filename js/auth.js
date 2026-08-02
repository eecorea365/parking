import {
    FIREBASE_CONFIG,
    isFirebaseConfigured
} from "./firebase-config.js";

let auth;
let authApi;

async function getAuthApi() {
    if (!isFirebaseConfigured()) {
        throw new Error("Firebase 설정값이 없습니다.");
    }

    if (!authApi) {
        const [{ getApp, getApps, initializeApp }, firebaseAuth] = await Promise.all([
            import("https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js"),
            import("https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js")
        ]);
        authApi = { getApp, getApps, initializeApp, ...firebaseAuth };
    }

    if (!auth) {
        const app = authApi.getApps().length
            ? authApi.getApp()
            : authApi.initializeApp(FIREBASE_CONFIG);
        auth = authApi.getAuth(app);
    }

    return authApi;
}

export async function login() {
    const api = await getAuthApi();
    const provider = new api.GoogleAuthProvider();
    return api.signInWithPopup(auth, provider);
}

export async function logout() {
    const api = await getAuthApi();
    return api.signOut(auth);
}

export function getCurrentUser() {
    return auth ? auth.currentUser : null;
}

export function isAdmin() {
    const user = getCurrentUser();
    if (!user || !user.email) return false;

    const adminEmails = config.auth.adminEmails.map(email => email.toLowerCase());
    return adminEmails.includes(user.email.toLowerCase());
}

export function onAuthStateChanged(callback) {
    let unsubscribe = () => {};

    getAuthApi()
        .then(api => {
            unsubscribe = api.onAuthStateChanged(auth, callback);
        })
        .catch(error => {
            console.error("Firebase 인증 초기화 실패", error);
            callback(null);
        });

    return () => unsubscribe();
}
