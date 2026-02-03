
const toast = document.getElementById('toast');
function showToast(message) { toast.textContent = message; toast.style.display = 'block'; setTimeout(() => toast.style.display='none',3000); }


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyABQqlqvqqsrb2B7K8URa3Mj2BToXsabPQ",
  authDomain: "black-dox.firebaseapp.com",
  databaseURL: "https://black-dox.firebaseio.com",
  projectId: "black-dox",
  storageBucket: "black-dox.appspot.com",
  messagingSenderId: "45035762443",
  appId: "1:45035762443:web:4101a6774e6f4f1d15e80e",
  measurementId: "G-B7HB0T95TP"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.database();

function showMessage(message, success = false) {
  const box = document.getElementById("messageBox");
  box.style.background = success ? "#4CAF50" : "#f44336"; // green for success, red for error
  box.textContent = message;
  box.style.display = "block";
  setTimeout(() => {
    box.style.display = "none";
  }, 4000); // hide after 3 seconds
}
function showToast(message, success=false) {
  const box = document.getElementById("messageBox");
  box.style.background = success ? "#4CAF50" : "#f44336";
  box.textContent = message;
  box.style.display = "block";
  box.style.opacity = "1";
  setTimeout(() => { 
    box.style.opacity = "0"; 
    setTimeout(() => { box.style.display = "none"; }, 300); // match CSS transition
  }, 4000);
}
function showCustomConfirm(message) {
  return new Promise((resolve) => {
    const modal = document.getElementById("customConfirm");
    const msg = document.getElementById("confirmMessage");
    const yesBtn = document.getElementById("confirmYes");
    const noBtn = document.getElementById("confirmNo");

    msg.textContent = message;
    modal.style.display = "flex";

    yesBtn.onclick = () => {
      modal.style.display = "none";
      resolve(true);
    };

    noBtn.onclick = () => {
      modal.style.display = "none";
      resolve(false);
    };
  });
}


