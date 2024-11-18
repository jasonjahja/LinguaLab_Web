import { auth, db } from "./firebase.js"; // Import shared auth instance
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getDoc, doc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

async function fetchUserProfileImage(uid) {
    const userRef = doc(db, "users", uid);
    try {
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
            const userData = docSnap.data();
            return userData.profilePicture || "../assets/default-profile.jpg"; // Default image if none exists
        } else {
            console.error("User document does not exist.");
            return "../assets/default-profile.jpg"; // Default image if document is missing
        }
    } catch (error) {
        console.error("Error fetching profile image:", error);
        return "../assets/default-profile.jpg"; // Default image if error occurs
    }
}

function setupNavbar(profileImageUrl) {
    // Update the profile image in the navbar
    const profileImgElements = document.querySelectorAll(".profile-img");
    profileImgElements.forEach((img) => {
        img.src = profileImageUrl;
    });

    // Add logout modal functionality
    const logoLink = document.getElementById("logo-link");
    const modal = document.getElementById("logout-modal");
    const confirmLogout = document.getElementById("confirm-logout");
    const cancelLogout = document.getElementById("cancel-logout");
    const closeModal = document.getElementById("close-modal-navbar");

    if (logoLink && modal) {
        logoLink.addEventListener("click", () => {
            modal.style.display = "flex";
        });

        confirmLogout.addEventListener("click", () => {
            signOut(auth)
                .then(() => {
                    window.location.href = "../index.html";
                })
                .catch((error) => {
                    console.error("Error logging out:", error);
                });
        });

        cancelLogout.addEventListener("click", () => {
            modal.style.display = "none";
        });

        // Close the modal when clicking the close button
        closeModal.addEventListener("click", () => {
            modal.style.display = "none";
        });
    }
}

// Observe authentication state
onAuthStateChanged(auth, async (user) => {
    if (user) {
        const profileImageUrl = await fetchUserProfileImage(user.uid);
        setupNavbar(profileImageUrl);
    } else {
        setupNavbar("../assets/default-profile.jpg");
    }
});

// Sidebar toggle function
function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    const currentWidth = sidebar.style.width;

    if (currentWidth === "250px") {
        sidebar.style.width = "0";
    } else {
        sidebar.style.width = "250px";
    }
}

// Attach to global scope
window.toggleSidebar = toggleSidebar;
