let nav = 0;
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];

const calendar = document.getElementById('calendar');

const weekdays = ['Sunday', ' Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function load() {

    const date = new Date();

    if (nav !== 0) {
        date.setMonth(new Date().getMonth() + nav);
    }

    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    console.log(year, month, day);

    //Date.prototype.getDay();

    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const dateString = firstDayOfMonth.toLocaleDateString(undefined, {
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    });

    // const firstDayOfMonth = new Date(year, month, 1).getDay();
    // const paddingDays = (firstDayOfMonth>0 ? firstDayOfMonth -1 : 6);
    const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);

    let monthString = date.toLocaleDateString(undefined, { month: 'long' });
    monthString = monthString.charAt(0).toUpperCase() + monthString.slice(1);


    document.getElementById('monthDisplay').innerText =
        `${monthString} ${year}`;

    calendar.innerHTML = '';

    for (let i = 1; i <= paddingDays + daysInMonth; i++) {
        const daySquare = document.createElement('div');
        daySquare.classList.add('day');

        if (i > paddingDays) {
            daySquare.innerText = i - paddingDays;
            daySquare.addEventListener('click', () => console.log('click'));
        } else {
            daySquare.classList.add('padding');
        }

        calendar.appendChild(daySquare);
    }
}

function initButtons() {
    document.getElementById('nextButton').addEventListener('click', () => {
        nav++;
        load();
    });
    document.getElementById('backButton').addEventListener('click', () => {
        nav--;
        load();
    });
}

initButtons();

load();