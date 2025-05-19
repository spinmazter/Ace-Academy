class BookingManager {
    constructor() {
        this.selectedDate = null;
        this.selectedTime = null;
        this.selectedCoach = null;
        this.init();
    }

    init() {
        this.initializeCalendar();
        this.initializeForm();
        this.setupEventListeners();
    }

    initializeCalendar() {
        // Initialize Flatpickr calendar
        this.calendar = flatpickr("#booking-calendar", {
            inline: true,
            minDate: "today",
            maxDate: new Date().fp_incr(30), // Allow booking up to 30 days in advance
            disable: [
                function(date) {
                    // Disable Sundays
                    return date.getDay() === 0;
                }
            ],
            onChange: (selectedDates) => {
                this.selectedDate = selectedDates[0];
                this.updateTimeSlots();
            }
        });
    }

    updateTimeSlots() {
        const timeSlots = this.generateTimeSlots();
        const container = document.getElementById('time-slots-container');
        container.innerHTML = '';

        timeSlots.forEach(slot => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'time-slot';
            button.textContent = slot;
            button.onclick = () => this.selectTimeSlot(slot);
            container.appendChild(button);
        });
    }

    generateTimeSlots() {
        // Generate time slots from 06:00 to 20:00
        const slots = [];
        const start = 6; // 6 AM
        const end = 20; // 8 PM

        for (let hour = start; hour < end; hour++) {
            slots.push(`${hour.toString().padStart(2, '0')}:00`);
            slots.push(`${hour.toString().padStart(2, '0')}:30`);
        }

        return slots;
    }

    selectTimeSlot(time) {
        this.selectedTime = time;
        // Remove active class from all slots
        document.querySelectorAll('.time-slot').forEach(slot => {
            slot.classList.remove('active');
        });
        // Add active class to selected slot
        event.target.classList.add('active');
        this.updateSelectedSlotDisplay();
    }

    updateSelectedSlotDisplay() {
        const display = document.getElementById('selected-date-time');
        if (this.selectedDate && this.selectedTime) {
            const formattedDate = this.selectedDate.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            display.textContent = `${formattedDate} at ${this.selectedTime}`;
        }
    }

    initializeForm() {
        this.form = document.getElementById('booking-form');
        this.coachSelect = document.getElementById('coach');
    }

    setupEventListeners() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleBookingSubmission();
        });

        this.coachSelect.addEventListener('change', (e) => {
            this.selectedCoach = e.target.value;
        });
    }

    async handleBookingSubmission() {
        if (!this.validateForm()) {
            alert('Please fill in all required fields and select a time slot.');
            return;
        }

        const formData = this.getFormData();
        await this.sendWhatsAppMessage(formData);
    }

    validateForm() {
        return this.form.checkValidity() && this.selectedDate && this.selectedTime;
    }

    getFormData() {
        const formData = new FormData(this.form);
        return {
            name: formData.get('name'),
            whatsapp: formData.get('whatsapp'),
            email: formData.get('email'),
            coach: formData.get('coach'),
            sessionType: formData.get('session-type'),
            skillLevel: formData.get('skill-level'),
            notes: formData.get('notes'),
            date: this.selectedDate,
            time: this.selectedTime
        };
    }

    async sendWhatsAppMessage(formData) {
        // Format the message for WhatsApp
        const message = this.formatWhatsAppMessage(formData);
        
        // Create WhatsApp link with pre-filled message
        const whatsappNumber = '+27697480306'; // Your business WhatsApp number
        const encodedMessage = encodeURIComponent(message);
        const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

        // Open WhatsApp in a new window
        window.open(whatsappLink, '_blank');

        // Send booking data to server for processing
        await this.sendBookingToServer(formData);
    }

    formatWhatsAppMessage(formData) {
        const formattedDate = formData.date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        return `🏓 *New Booking Request - Ace Table Tennis Academy*

*Name:* ${formData.name}
*Session Date:* ${formattedDate}
*Time:* ${formData.time}
*Coach:* ${this.getCoachName(formData.coach)}
*Session Type:* ${formData.sessionType}
*Skill Level:* ${formData.skillLevel}

${formData.notes ? `*Additional Notes:* ${formData.notes}` : ''}

Please confirm my booking request. Thank you!`;
    }

    getCoachName(coachId) {
        const coaches = {
            'coach1': 'Coach Kuda',
            'coach2': 'Coach Michael',
            'coach3': 'Coach Sarah'
        };
        return coaches[coachId] || coachId;
    }

    async sendBookingToServer(formData) {
        try {
            const response = await fetch('/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Booking submission failed');
            }

            // Handle successful booking
            this.showSuccessMessage();
        } catch (error) {
            console.error('Error submitting booking:', error);
            // Handle error appropriately
        }
    }

    showSuccessMessage() {
        alert('Your booking request has been sent! Please check WhatsApp for confirmation.');
    }
}

// Initialize BookingManager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const bookingManager = new BookingManager();
}); 