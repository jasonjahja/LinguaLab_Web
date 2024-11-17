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
                const userData = docSnap.data();
                if (userData.fullname) {
                    document.getElementById("name-profile").value = userData.fullname;
                } else {
                    console.warn("The 'fullname' field is missing in Firestore. Please check the document structure.");
                }
            } else {
                console.error("No such document in Firestore! Please ensure the user's document exists.");
            }            
        } catch (error) {
            console.error("Error fetching user data from Firestore:", error);
        }
    } else {
        // Redirect to login if no user is signed in
        window.location.href = "/pages/login.html";
    }
});

window.updateProfile = updateProfile;
window.logout = logout;

let tempProfilePicture = null; // Temporary variable to store the selected profile picture

// Listen for file selection and update the preview
document.getElementById('photo-input').addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            tempProfilePicture = e.target.result; // Store the Base64 image temporarily
            profilePic.src = tempProfilePicture; // Display the new profile image preview
            deletePhotoButton.disabled = false;
            deletePhotoButton.classList.remove('disabled');
        };

        reader.readAsDataURL(file); // Read the file as a Base64 string
    }
});

// Function to save changes when "Save Changes" button is clicked
async function updateProfile() {
    const user = auth.currentUser;

    if (user) {
        try {
            const fullName = document.getElementById("name-profile").value;
            const userRef = doc(db, "users", user.uid);

            // Prepare the update payload
            const updateData = { fullname: fullName };

            // Check if the profile picture is set to default
            if (profilePic.src === defaultImagePath) {
                updateData.profilePicture = null; // Save null for the default image
            } else if (tempProfilePicture) {
                updateData.profilePicture = tempProfilePicture; // Save the updated image
            }

            // Update Firestore
            await updateDoc(userRef, updateData);
            document.getElementById('edit-modal').style.display = 'flex';
            tempProfilePicture = null; // Clear the temporary variable after saving
        } catch (error) {
            console.error("Error updating profile:", error);
            document.getElementById('error-edit-modal').style.display = 'flex';
        }
    } else {
        alert("User is not authenticated.");
    }
}



// Function to handle logout with confirmation
async function logout() {
    try {
        document.getElementById('logout-modal').style.display = 'flex';
    } catch (error) {
        console.error("Error during logout:", error);
        alert("Gagal keluar.");
    }
}

// Add event listeners after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("save-button").addEventListener("click", async () => {
        await updateProfile();
    });
    document.getElementById("logout-button").addEventListener("click", logout);


    document.getElementById('toggle-password-profile').addEventListener('click', function () {
        const passwordField = document.getElementById('psw-profile');
        const icon = document.getElementById('toggle-icon1');
    
        if (passwordField.type === 'password') {
            passwordField.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            passwordField.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    });
    
    document.getElementById('toggle-new-password-profile').addEventListener('click', function () {
        const passwordField = document.getElementById('new-psw-profile');
        const icon = document.getElementById('toggle-icon2');
    
        if (passwordField.type === 'password') {
            passwordField.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            passwordField.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    });
    
});

// Define the path to the default image
const defaultImagePath = new URL('../assets/default-profile.jpg', window.location.href).href;

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
    if (profilePic.src !== defaultImagePath) {
        document.getElementById('delete-modal').style.display = 'flex';
    }
});

document.getElementById('close-modal').addEventListener('click', () => {
    document.getElementById('delete-modal').style.display = 'none';
});

document.getElementById('close-modal-logout').addEventListener('click', () => {
    document.getElementById('logout-modal').style.display = 'none';
});

document.getElementById('close-modal-edit').addEventListener('click', () => {
    document.getElementById('edit-modal').style.display = 'none';
});

document.getElementById('close-modal-edit-error').addEventListener('click', () => {
    document.getElementById('error-edit-modal').style.display = 'none';
});

document.getElementById('confirm-edit-error-button').addEventListener('click', () => {
    document.getElementById('error-edit-modal').style.display = 'none';
});

document.getElementById('confirm-edit-button').addEventListener('click', () => {
    document.getElementById('edit-modal').style.display = 'none';
});

document.getElementById('cancel-delete-button').addEventListener('click', () => {
    document.getElementById('delete-modal').style.display = 'none';
});

// Function to reset the profile picture to the default when deleting
document.getElementById('confirm-delete-button').addEventListener('click', () => {
    profilePic.src = defaultImagePath; // Reset the preview
    tempProfilePicture = null; // Clear the temporary variable
    deletePhotoButton.disabled = true;
    deletePhotoButton.classList.add('disabled');
    document.getElementById('delete-modal').style.display = 'none';
});

document.getElementById('cancel-logout-button').addEventListener('click', () => {
    document.getElementById('logout-modal').style.display = 'none';
});

document.getElementById('confirm-logout-button').addEventListener('click', () => {
    document.getElementById('edit-modal').style.display = 'none';
});


// Function to reset the profile picture to the default when deleting
document.getElementById('confirm-logout-button').addEventListener('click', async () => {
    try {
        await signOut(auth); // Sign out the user
        window.location.href = "/index.html"; // Redirect to the homepage
    } catch (error) {
        console.error("Error during logout:", error);
    } finally {
        document.getElementById('logout-modal').style.display = 'none'; // Hide the modal
    }
});

// Function to load profile picture safely when a user is logged in
async function loadProfilePicture() {
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            const userRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(userRef);

            if (docSnap.exists()) {
                const userData = docSnap.data();
                if (userData.profilePicture) {
                    profilePic.src = userData.profilePicture;
                    deletePhotoButton.disabled = false;
                    deletePhotoButton.classList.remove('disabled');
                } else {
                    profilePic.src = defaultImagePath;
                    deletePhotoButton.disabled = true;
                    deletePhotoButton.classList.add('disabled');
                }
            } else {
                console.error("No user document found in Firestore.");
            }
        } else {
            alert("User not logged in. Please log in to access your profile.");
            window.location.href = "/pages/login.html";
        }
    });
}

// Call loadProfilePicture when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    loadProfilePicture();
});

window.goBack = function () {
    window.location.href = 'home.html';
};