document.addEventListener("DOMContentLoaded", () => {
    const userId = localStorage.getItem('userId'); // Assume user ID is stored in localStorage
    if (!userId) {
        alert("Please log in to view your insights.");
        window.location.href = "login.html";
        return;
    }

    const insightsGrid = document.getElementById("insights-grid");

    // Mock data for insights (replace this with Firestore data fetch)
    const courseData = [
        { title: "Beginner English", description: "Start your journey with basics.", progress: 75 },
        { title: "Intermediate English", description: "Improve your grammar and vocabulary.", progress: 50 },
        { title: "Advanced English", description: "Master fluency and advanced skills.", progress: 20 },
        { title: "Business English", description: "Learn English for professional communication.", progress: 90 },
    ];

    courseData.forEach(course => {
        const card = document.createElement("div");
        card.className = "insight-card";

        card.innerHTML = `
            <h3>${course.title}</h3>
            <p>${course.description}</p>
            <div class="progress-bar">
                <div class="progress" style="width: ${course.progress}%;"></div>
            </div>
            <p>Progress: ${course.progress}%</p>
        `;

        insightsGrid.appendChild(card);
    });
});
