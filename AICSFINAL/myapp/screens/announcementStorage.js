import firebase from "../firebase";

const db = firebase.ref("/announcementFirebase");

class TutorialDataService {
  getAll() {
    return db;
  }

  create(announcement) {
    return db.push(announcement);
  }

  update(key, value) {
    return db.child(key).update(value);
  }

  delete(key) {
    return db.child(key).remove();
  }

  deleteAll() {
    return db.remove();
  }
}

export default new TutorialDataService();