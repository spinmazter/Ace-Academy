function sendEmail(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Create the mailto URL
    const mailtoUrl = `mailto:kudakwashe914@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    )}`;

    // Open the default email client
    window.location.href = mailtoUrl;

    // Reset the form
    document.getElementById('contactForm').reset();

    // Show success message
    showNotification('Message sent successfully! Opening your email client...');

    return false;
}

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;

    // Add notification styles
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.right = '20px';
    notification.style.backgroundColor = '#64b5f6';
    notification.style.color = 'white';
    notification.style.padding = '15px 25px';
    notification.style.borderRadius = '8px';
    notification.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    notification.style.zIndex = '1000';
    notification.style.animation = 'slideIn 0.3s ease-out';

    // Add animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);

    // Add to document
    document.body.appendChild(notification);

    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in forwards';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
} 