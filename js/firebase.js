(function initFirebase() {
  if (!window.firebase) {
    window.wishingWellDb = null;
    return;
  }

  const firebaseConfig = window.__WISHING_WELL_FIREBASE_CONFIG__ || {
    apiKey: 'REPLACE_ME',
    authDomain: 'REPLACE_ME.firebaseapp.com',
    projectId: 'REPLACE_ME',
    storageBucket: 'REPLACE_ME.appspot.com',
    messagingSenderId: 'REPLACE_ME',
    appId: 'REPLACE_ME',
  };

  const hasRealConfig = firebaseConfig.apiKey && firebaseConfig.apiKey !== 'REPLACE_ME';
  if (!hasRealConfig) {
    window.wishingWellDb = null;
    return;
  }

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  window.wishingWellDb = firebase.firestore();
}());

window.wishingWellApi = {
  async submitWish({ text, color }) {
    if (!window.wishingWellDb) {
      return { ok: false, reason: 'missing-config' };
    }

    await window.wishingWellDb.collection('wishes').add({
      text,
      color,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });

    return { ok: true };
  },

  async fetchRandomWish() {
    if (!window.wishingWellDb) {
      return null;
    }

    const snap = await window.wishingWellDb
      .collection('wishes')
      .orderBy('createdAt', 'desc')
      .limit(30)
      .get();

    const docs = snap.docs;
    if (!docs.length) return null;
    const randomDoc = docs[Math.floor(Math.random() * docs.length)];
    return { id: randomDoc.id, ...randomDoc.data() };
  },
};
