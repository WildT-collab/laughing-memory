// Smooth scroll to main content on "Book Appointment" button click
document.querySelector('.book-btn').addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector('main').scrollIntoView({ behavior: 'smooth' });
});

// Handle form submission and go to time slots
function goToSlots(event) {
    event.preventDefault(); // Prevent form submission
    const name = document.getElementById('name').value;
    const numberPlate = document.getElementById('numberplate').value;

    // Store data in session storage for now (would use a database for production)
    sessionStorage.setItem('customerName', name);
    sessionStorage.setItem('numberPlate', numberPlate);

    // Display confirmation alert and redirect to the time slot selection page
    alert("Details Submitted! Redirecting to available slots...");
    window.location.href = 'timeslots.html';
}
