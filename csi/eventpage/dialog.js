document.addEventListener('DOMContentLoaded', function() {
    // Add event listeners to "Learn More" buttons
    let learnMoreButtons = document.querySelectorAll('.btn-primary');
    
    learnMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            let eventTitle = this.closest('.event-box').querySelector('h2').textContent;
            openModal(eventTitle);
        });
    });
    
    function openModal(eventTitle) {
        // Check the title and open corresponding modal
        switch (eventTitle) {
            case 'Garba Workshop':
                new bootstrap.Modal(document.getElementById('modalGarba')).show();
                break;
            case 'Tech Hunt':
                new bootstrap.Modal(document.getElementById('modalTech')).show();
                break;
            case 'Bulls Eye':
                new bootstrap.Modal(document.getElementById('modalBullsEye')).show();
                break;
            case 'COD Mobile':
                new bootstrap.Modal(document.getElementById('modalCODMobile')).show();
                break;
            case 'Cricket Auction':
                new bootstrap.Modal(document.getElementById('modalCricketAuction')).show();
                break;
            case 'Rink Football':
                new bootstrap.Modal(document.getElementById('modalRinkFootball')).show();
                break;
            case 'Neon Cricket':
                new bootstrap.Modal(document.getElementById('modalNeonCricket')).show();
                break;
            default:
                console.log('No modal available for this event.');
        }
    }
});
