// Import Firebase SDK functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore, doc, setDoc, updateDoc, getDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

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

            // Check if name, email or password is empty
            // if (!fullname || !email || !password || !confirmPassword) {
            //     if (!fullname) {
            //         displayError("fullname-error", "Name field cannot be empty.");
            //     }
            //     if (!email) {
            //         displayError("email-error", "Email field cannot be empty.");
            //     }
            //     if (!password) {
            //         displayError("password-signup-error", "Password field cannot be empty.");
            //     }
            //     if (!confirmPassword) {
            //         displayError("confirm-password-error", "Password confirmation field cannot be empty.");
            //     }
            //     return;
            // }

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
                    alert("Signup successful!");
                    localStorage.setItem('userId', user.uid);
                    window.location.href = "home.html";
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
                        alert("Login successful!");
                        window.location.href = "home.html";
                        // After successful login or signup, store the user ID
                        localStorage.setItem('userId', user.uid);
                        // firebase.auth().signInWithEmailAndPassword(email, password)
                        //     .then((userCredential) => {
                        //         const user = userCredential.user;
                        //         localStorage.setItem('userId', user.uid); // Store userId for later access
                        //         console.log("User ID stored:", user.uid);
                        //         // Redirect or load quiz after login
                        //         window.location.href = 'quiz.html';
                        //     })
                        //     .catch((error) => {
                        //         console.error("Error during login:", error.message);
                        //         alert("Login failed. Please check your credentials and try again.");
                        //     });

                    }).catch((error) => {
                        alert("Login failed: " + error.message);
                    });
                })
                .catch((error) => {
                    alert("Login error: " + error.message);
                });
        });
    }

    // Toggle password visibility for login
    const togglePasswordLogin = document.getElementById("toggle-password-login");
    const passwordLoginField = document.getElementById("psw_login");
    if (togglePasswordLogin && passwordLoginField) {
        togglePasswordLogin.addEventListener("click", () => {
            passwordLoginField.type = passwordLoginField.type === "password" ? "text" : "password";
        });
    }

    // Toggle password visibility for signup
    const togglePasswordSignup = document.getElementById("toggle-password-signup");
    const passwordSignupField = document.getElementById("psw_signup");
    if (togglePasswordSignup && passwordSignupField) {
        togglePasswordSignup.addEventListener("click", () => {
            passwordSignupField.type = passwordSignupField.type === "password" ? "text" : "password";
        });
    }

    // Toggle password visibility for confirm password
    const toggleConfirmPassword = document.getElementById("toggle-confirm-password");
    const confirmPasswordField = document.getElementById("confirm-password");
    if (toggleConfirmPassword && confirmPasswordField) {
        toggleConfirmPassword.addEventListener("click", () => {
            confirmPasswordField.type = confirmPasswordField.type === "password" ? "text" : "password";
        });
    }
});