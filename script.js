// Handle form submission and go to time slots
function goToSlots(event) {
    event.preventDefault(); // Prevent form submission
    const name = document.getElementById('name').value;
    const numberPlate = document.getElementById('numberplate').value;

    // Store data in session storage for now (would use a database for production)
    sessionStorage.setItem('customerName', name);
    sessionStorage.setItem('numberPlate', numberPlate);

    // Redirect to the time slot selection page
    window.location.href = 'timeslots.html';
}
