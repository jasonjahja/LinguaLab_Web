function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar.style.width === "250px") {
        sidebar.style.width = "0";
    } else {
        sidebar.style.width = "250px";
    }
}

// Get all navigation links
const navLinks = document.querySelectorAll('.nav-links li');
const hoverCircle = document.createElement('div');
hoverCircle.classList.add('hover-circle');
document.querySelector('.nav-links').appendChild(hoverCircle);

let activeLink = navLinks[0]; // Default to "Home"

function positionCircle(target) {
  const rect = target.getBoundingClientRect();
  const navRect = target.parentElement.getBoundingClientRect();

  hoverCircle.style.width = `${rect.width + 20}px`;
  hoverCircle.style.height = `${rect.height + 10}px`;
  hoverCircle.style.left = `${rect.left - navRect.left - 10}px`;
  hoverCircle.style.top = `${rect.top - navRect.top - 5}px`;
}

// Set circle on the active link on page load
window.addEventListener('DOMContentLoaded', () => {
  positionCircle(activeLink);
});

// Hover effect
navLinks.forEach(link => {
  link.addEventListener('mouseover', () => {
    positionCircle(link);
  });

  link.addEventListener('mouseout', () => {
    positionCircle(activeLink); // Return to active link
  });

  link.addEventListener('click', () => {
    activeLink = link; // Set clicked link as active
    positionCircle(activeLink);
  });
});
