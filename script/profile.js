// Import Firebase SDK functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { reauthenticateWithCredential, EmailAuthProvider, getAuth, onAuthStateChanged, signOut, updatePassword  } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCNak1aWVJ_HCXmavCuo95FwnrQWgEIQRk",
    authDomain: "lingualab-9832e.firebaseapp.com",
    projectId: "lingualab-9832e",
    storageBucket: "lingualab-9832e.appspot.com",
    messagingSenderId: "97458692092",
    appId: "1:97458692092:web:91f1caec18e753ddd09c79",
    measurementId: "G-9J4EKPQPRD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Function to handle authentication state and load profile data
onAuthStateChanged(auth, async (user) => {
    if (user) {
        // Set email from Firebase Auth
        document.getElementById("email-profile").value = user.email;

        try {
            // Fetch full name from Firestore
            const userRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(userRef);
            if (docSnap.exists()) {
                document.getElementById("name-profile").value = docSnap.data().fullname || "";
            } else {
                console.error("No such document in Firestore!");
            }
        } catch (error) {
            console.error("Error fetching user data from Firestore:", error);
        }
    } else {
        // Redirect to login if no user is signed in
        window.location.href = "/login.html";
    }
});

window.updateProfile = updateProfile;
window.logout = logout;

// Function to handle saving profile changes
async function updateProfile() {
    const user = auth.currentUser;
    const fullName = document.getElementById("name-profile").value;
    const currentPassword = document.getElementById("psw-profile").value; // Input for current password
    const newPassword = document.getElementById("new-psw-profile").value; // Input for new password

    if (user) {
        const credential = EmailAuthProvider.credential(user.email, currentPassword);

        try {
            // Step 1: Reauthenticate user with the current password
            await reauthenticateWithCredential(user, credential);
            console.log("Reauthentication successful");

            // Step 2: Update password if a new password is provided
            if (newPassword) {
                await updatePassword(user, newPassword);
                console.log("Password updated successfully");
            }

            // Step 3: Update profile in Firestore after successful reauthentication
            const userRef = doc(db, "users", user.uid);
            await updateDoc(userRef, { fullname: fullName });
            alert("Profile updated successfully!");

        } catch (error) {
            console.error("Error reauthenticating user:", error);
            if (error.code === "auth/wrong-password") {
                alert("The password you entered is incorrect. Please try again.");
            } else if (error.code === "auth/weak-password") {
                alert("The new password is too weak. Please choose a stronger password.");
            } else {
                alert("Failed to update profile. Please try again later.");
            }
        }
    } else {
        alert("User is not authenticated.");
    }
}


// Function to handle logout with confirmation
async function logout() {
    const confirmLogout = confirm("Apakah Anda yakin ingin keluar?");
    
    if (confirmLogout) {
        try {
            await signOut(auth);
            alert("Berhasil keluar.");
            window.location.href = "/index.html"; // Redirect to index.html after logout
        } catch (error) {
            console.error("Error during logout:", error);
            alert("Gagal keluar.");
        }
    } else {
        console.log("User canceled logout.");
    }
}

// Add event listeners after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("save-button").addEventListener("click", async () => {
        await updateProfile();
    });
    document.getElementById("logout-button").addEventListener("click", logout);

    // Toggle password visibility for confirm password
    const togglePasswordProfile = document.getElementById("toggle-password-profile");
    const passwordProfile = document.getElementById("psw-profile");
    if (togglePasswordProfile && passwordProfile) {
        togglePasswordProfile.addEventListener("click", () => {
            passwordProfile.type = passwordProfile.type === "password" ? "text" : "password";
        });
    }

    // Toggle password visibility for confirm password
    const togglePasswordProfileConfirm = document.getElementById("toggle-new-password-profile");
    const passwordProfileConfirm = document.getElementById("new-psw-profile");
    if (togglePasswordProfileConfirm && passwordProfileConfirm) {
        togglePasswordProfileConfirm.addEventListener("click", () => {
            passwordProfileConfirm.type = passwordProfileConfirm.type === "password" ? "text" : "password";
        });
    }
});




// Define the path to the default image
const defaultImagePath = 'images/default-profile.png';

// Get elements
const deletePhotoButton = document.getElementById('delete-photo-button');
const profilePic = document.getElementById('profile-pic');

// Function to check if the profile picture is the default image
function checkProfilePhoto() {
    if (profilePic.src.includes(defaultImagePath)) {
        deletePhotoButton.disabled = true;
        deletePhotoButton.classList.add('disabled');
    } else {
        deletePhotoButton.disabled = false;
        deletePhotoButton.classList.remove('disabled');
    }
}

// Run check on page load
window.onload = checkProfilePhoto;

// Listen for "Edit Photo" button to upload new photo
document.getElementById('edit-photo-button').addEventListener('click', () => {
    // Trigger file input for uploading a new photo
    document.getElementById('photo-input').click();
});

// Listen for file selection and update the profile picture
document.getElementById('photo-input').addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        profilePic.src = URL.createObjectURL(file); // Display the new profile image
        deletePhotoButton.disabled = false;         // Enable the delete button
        deletePhotoButton.classList.remove('disabled');
    }
});

// Delete photo functionality with modal confirmation
deletePhotoButton.addEventListener('click', () => {
    // Only show the modal if the profile image is not the default one
    if (!profilePic.src.includes(defaultImagePath)) {
        document.getElementById('delete-modal').style.display = 'flex';
    }
});

document.getElementById('close-modal').addEventListener('click', () => {
    document.getElementById('delete-modal').style.display = 'none';
});

document.getElementById('cancel-delete-button').addEventListener('click', () => {
    document.getElementById('delete-modal').style.display = 'none';
});

document.getElementById('confirm-delete-button').addEventListener('click', () => {
    profilePic.src = defaultImagePath; // Set the profile image to default
    document.getElementById('delete-modal').style.display = 'none';
    checkProfilePhoto(); // Recheck to disable delete button
});
