import {
    FIREBASE_CONFIG,
    isFirebaseConfigured as hasFirebaseConfig
} from "./firebase-config.js";

const STATUS_COLLECTION = "parking";
const STATUS_DOCUMENT = "tesla-model-y";

let firestoreApi;
let db;

async function getFirestoreApi() {
    if (!hasFirebaseConfig()) {
        throw new Error("Firebase 설정값이 없습니다.");
    }

    if (!firestoreApi) {
        const [{ getApp, getApps, initializeApp }, firestore] = await Promise.all([
            import("https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js"),
            import("https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js")
        ]);
        firestoreApi = { getApp, getApps, initializeApp, ...firestore };
    }

    return firestoreApi;
}

async function getStatusDocument() {
    const api = await getFirestoreApi();

    if (!db) {
        const app = api.getApps().length
            ? api.getApp()
            : api.initializeApp(FIREBASE_CONFIG);
        db = api.getFirestore(app);
    }

    return api.doc(db, STATUS_COLLECTION, STATUS_DOCUMENT);
}

export function isFirebaseConfigured() {
    return hasFirebaseConfig();
}

export async function subscribeToVehicleStatus(onChange, onError) {
    try {
        const [api, statusDocument] = await Promise.all([
            getFirestoreApi(),
            getStatusDocument()
        ]);
        return api.onSnapshot(
            statusDocument,
            snapshot => onChange(snapshot.exists() ? snapshot.data() : null),
            onError
        );
    } catch (error) {
        onError(error);
        return () => {};
    }
}

export async function saveVehicleStatus(status) {
    const [api, statusDocument] = await Promise.all([
        getFirestoreApi(),
        getStatusDocument()
    ]);
    await api.setDoc(
        statusDocument,
        {
            status,
            updatedAt: api.serverTimestamp()
        },
        { merge: true }
    );
}
