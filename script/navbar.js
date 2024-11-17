// navbar2.js
import { auth } from "./firebase.js"; // Import shared auth instance
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getDoc, doc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { db } from "./firebase.js"; // Import shared Firestore instance

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

function generateNavbar(profileImageUrl) {
    const navbarHTML = `
        <nav class="navbar">
            <div class="logo" id="logo-link"><a href="javascript:void(0)">LinguaLab</a></div>
            <ul class="nav-links">
                <li><a href="home.html">Home</a></li>
                <li><a href="tes2.html">Quiz</a></li>
            </ul>
            <div class="profile-div">
                <a href="profile.html" class="profile-btn">
                    <img class="profile-img" src="${profileImageUrl}" alt="Profile Image">
                </a>    
            </div>
            <div class="hamburger" onclick="toggleSidebar()">&#9776;</div>
            <div class="hover-circle"></div>
        </nav>
        <div id="sidebar" class="sidebar">
            <a href="javascript:void(0)" class="close-btn" onclick="toggleSidebar()">&times;</a>
            <a href="home.html">Home</a>
            <a href="course.html">Quiz</a>
            <a href="profile.html" class="profile-btn-mobile">
                <img class="profile-img" src="${profileImageUrl}" alt="Profile Image">
            </a>  
        </div>
        <div id="logout-modal" class="modal">
            <div class="modal-content">
                <p>Are you sure you want to log out?</p>
                <div class="modal-buttons">
                    <button id="confirm-logout" class="confirm-button">Yes</button>
                    <button id="cancel-logout" class="cancel-button">No</button>
                </div>
            </div>
        </div>
    `;

    // Inject navbar into the DOM
    const header = document.querySelector("header");
    if (header) {
        header.innerHTML = navbarHTML;

        // Add logout modal functionality
        const logoLink = document.getElementById("logo-link");
        const modal = document.getElementById("logout-modal");
        const confirmLogout = document.getElementById("confirm-logout");
        const cancelLogout = document.getElementById("cancel-logout");

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
    }
}

onAuthStateChanged(auth, async (user) => {
    if (user) {
        const profileImageUrl = await fetchUserProfileImage(user.uid);
        generateNavbar(profileImageUrl);
    } else {
        generateNavbar("../assets/default-profile.jpg");
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
