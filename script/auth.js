// Import Firebase SDK functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore, doc, setDoc, updateDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCNak1aWVJ_HCXmavCuo95FwnrQWgEIQRk",
    authDomain: "lingualab-9832e.firebaseapp.com",
    projectId: "lingualab-9832e",
    storageBucket: "lingualab-9832e.firebasestorage.app",
    messagingSenderId: "97458692092",
    appId: "1:97458692092:web:91f1caec18e753ddd09c79",
    measurementId: "G-9J4EKPQPRD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Function to display error messages
function displayError(elementId, message) {
    document.getElementById(elementId).textContent = message;
}

document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.getElementById("signup-form");
    if (signupForm) {
        signupForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const fullname = document.getElementById("fullname").value;
            const email = document.getElementById("email_signup").value;
            const password = document.getElementById("psw_signup").value;
            const confirmPassword = document.getElementById("confirm-password").value;

            // Clear previous error messages
            displayError("fullname-error", "");
            displayError("email-error", "");
            displayError("password-error", "");
            displayError("confirm-password-error", "");

            // Validate passwords
            if (password !== confirmPassword) {
                displayError("password-error", "Passwords do not match. Please try again.");
                displayError("confirm-password-error", "Passwords do not match. Please try again.");
                return;
            }

            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                const suDate = new Date();

                setDoc(doc(db, "users", user.uid), {
                    fullname: fullname,
                    email: email,
                    last_signup: suDate,
                }).then(() => {
                    showSuccessModal();
                    localStorage.setItem('userId', user.uid);
                }).catch((error) => {
                    alert("Error creating user document: " + error.message);
                });
            })
            .catch((error) => {
                if (error.code === "auth/email-already-in-use") {
                    displayError("email-error", "This email is already in use. Please try another one.");
                } else if (error.code === "auth/invalid-email") {
                    displayError("email-error", "Please enter a valid email address.");
                } else if (error.code === "auth/weak-password") {
                    displayError("password-error", "Your password is too weak. Please choose a stronger password.");
                } else {
                    displayError("email-error", "Signup error: " + error.message);
                }
            });
        });
    }

    // Event listener for login button
    const loginButton = document.getElementById("login-button");
    if (loginButton) {
        loginButton.addEventListener("click", (e) => {
            e.preventDefault();
            const emailLogin = document.getElementById("email_login").value;
            const passwordLogin = document.getElementById("psw_login").value;

            // Clear previous error messages
            displayError("email-login-error", "");
            displayError("psw-login-error", "");

            // Check if email or password is empty
            if (!emailLogin || !passwordLogin) {
                if (!emailLogin) {
                    displayError("email-login-error", "Email field cannot be empty.");
                }
                if (!passwordLogin) {
                    displayError("psw-login-error", "Password field cannot be empty.");
                }
                return;
            }

            signInWithEmailAndPassword(auth, emailLogin, passwordLogin)
                .then((userCredential) => {
                    const user = userCredential.user;
                    const lgDate = new Date();

                    updateDoc(doc(db, "users", user.uid), {
                        last_login: lgDate
                    }).then(() => {
                        showSuccessModal();
                        localStorage.setItem('userId', user.uid);
                    }).catch((error) => {
                        alert("Login failed: " + error.message);
                    });
                })
                .catch((error) => {
                    alert("Login error: " + error.message);
                });
        });
    }

    // Toggle Password Visibility for Login
    const togglePasswordLogin = document.getElementById('toggle-password-login');
    if (togglePasswordLogin) {
        togglePasswordLogin.addEventListener('click', function () {
            const passwordField = document.getElementById('psw_login');
            const icon = document.getElementById('toggle-icon-login');

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
    }

    // Toggle Password Visibility for Signup
    const togglePasswordSignup = document.getElementById('toggle-password-signup');
    const toggleConfirmPassword = document.getElementById('toggle-confirm-password');
    
    if (togglePasswordSignup || toggleConfirmPassword) {
        togglePasswordSignup.addEventListener('click', function () {
            const passwordField1 = document.getElementById('psw_signup');
            const icon1 = document.getElementById('toggle-icon1-signup');

            if (passwordField1.type === 'password') {
                passwordField1.type = 'text';
                icon1.classList.remove('fa-eye');
                icon1.classList.add('fa-eye-slash');
            } else {
                passwordField1.type = 'password';
                icon1.classList.remove('fa-eye-slash');
                icon1.classList.add('fa-eye');
            }
        });

        toggleConfirmPassword.addEventListener('click', function () {
            const passwordField2 = document.getElementById('confirm_password');
            const icon2 = document.getElementById('toggle-icon2-signup');

            if (passwordField2.type === 'password') {
                passwordField2.type = 'text';
                icon2.classList.remove('fa-eye');
                icon2.classList.add('fa-eye-slash');
            } else {
                passwordField2.type = 'password';
                icon2.classList.remove('fa-eye-slash');
                icon2.classList.add('fa-eye');
            }
        });
    }
});

// Get modal elements
const modal = document.getElementById('success-modal');
const closeModal = document.getElementById('close-modal');
const continueBtn = document.getElementById('continue-btn');

// Show the modal (call this function when signup is successful)
function showSuccessModal() {
    modal.style.display = 'flex';
}

// Close the modal when clicking the close button
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Close the modal and redirect when clicking the Continue button
continueBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    window.location.href = 'home.html'; // Redirect to the home page
});

// Optional: Close the modal if the background is clicked
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        setTimeout(() => {
            window.location.href = 'home.html'; // Redirect to the home page
        }, 3000);
    }
});
