// selectors
const dateInput = document.querySelector('#dateInput');
const timeInput = document.querySelector('#timeInput')
const confirmButton = document.querySelector('#confirmButton')
const youWereBornP = document.querySelector('#youWereBornP')

// event listeners
confirmButton.addEventListener('click', mainRoute);


// dataBase
let dataBase = {
    'birth': {'mins': 0, 'hours': 0, 'day': 0, 'month': 0, 'year': 0, 'string': 0, 'valuable': 0},
    'current': {'mins': 0, 'hours': 0, 'day': 0, 'month': 0, 'year': 0, 'string': 0},
    'lifeSpan': {'mins': 0, 'hours': 0, 'day': 0, 'month': 0, 'year': 0},
    'monthMap': {'1': 'January', '2': 'February', '3': 'March', '4': 'April', '5': 'May', '6': 'June', '7': 'July', '8': 'August', '9': 'September', '10': 'October', '11': 'November', '12': 'December'},

}

const BIRTH = dataBase['birth'];
const CURRENT = dataBase['current'];
const LIVED = dataBase['lifeSpan'];

// functions

function getDate () {
    CURRENT['string'] = new Date;
    document.querySelector('#currentDate').innerHTML = CURRENT['string'].toLocaleString();
} getDate();

function mainRoute () {
    if (dateInput.value !== "") {
        dateInput.style.borderColor = '#5c7aff';
        dateInput.style.color = 'black';
        youWereBornP.style.color = 'black';

        //converting birthday data
        convertCakeData();
        //checking numbers for real
        checkNums();
        if(BIRTH['valuable']) {
            //showing the birth date
            showBirthDate();
            //converting current data
            convertCurrentData();
            //calculating lifeSpan info
            calculatingLifeSpan();
            //showing result
            displayResult();
            //clearing input
            clearInput();
        }
    } else if (dateInput.value === '') {
        dateInput.style.borderColor = 'red';
        dateInput.style.color = 'red';
    }
}

function convertCakeData () {
    // getting standard date, time of birth
    const cakeDate = new Date (dateInput.value);
    BIRTH['string'] = cakeDate.toString;
    console.log (cakeDate);
    //example "Sun Feb 24 2002 09:00:00 GMT+0900"
    

    // getting CakeMins
    birthTime = timeInput.value;
    BIRTH['mins'] = parseInt(birthTime.slice(3,5)); 

    // getting cakeHours
    BIRTH['hours'] = parseInt(birthTime.slice(0,2));
    
    // getting cakeDay
    BIRTH['day'] = cakeDate.getDate();

    // getting cakeMonth
    BIRTH['month'] = (cakeDate.getMonth()) + 1;

    // getting cakeYear
    BIRTH['year'] = cakeDate.getFullYear();

    // console out
    console.log (`cakeMins - ${BIRTH['mins']}, cakeHours- ${BIRTH['hours']}, cakeDay - ${BIRTH['day']}, cakeMonth - ${BIRTH['month']}, cakeYear - ${BIRTH['year']}`);

}

function checkNums () {
    if (BIRTH['year'] > CURRENT['string'].getFullYear() || BIRTH['year'] < 1903) {
        youWereBornP.innerHTML = 'You Should Enter the Valuable Year';
        youWereBornP.style.color = 'red';
        dateInput.style.borderColor = 'red';
        dateInput.style.color = 'red';
        BIRTH['valuable'] = false;
    } else {
        BIRTH['valuable'] = true;
    }
}

function showBirthDate () {
    birthdayString = BIRTH['string'];
    monthMapped = dataBase['monthMap'][BIRTH['month']];
    dayWithEnd = BIRTH['day'];
        if (dayWithEnd === 1) {
            dayWithEnd = dayWithEnd + 'st'
        } else if (dayWithEnd === 2) {
            dayWithEnd = dayWithEnd + 'nd' 
        } else if (dayWithEnd === 3) {
            dayWithEnd = dayWithEnd + 'rd'
        } else {
            dayWithEnd = dayWithEnd + 'th'
        }

        if (BIRTH['mins'] < 10) { 
            minsWithEnd = '0'+ BIRTH['mins'];
        } else {
            minsWithEnd = BIRTH['mins'];
        }

        if (BIRTH['hours'] < 12) {
            timeWithEnd = BIRTH['hours'] + ':' + minsWithEnd + 'am';
        } else if (BIRTH['hours'] === 12) {
            timeWithEnd = BIRTH['hours'] + ':' + minsWithEnd + 'pm';
        } else {
            timeWithEnd = BIRTH['hours'] - 12;
            timeWithEnd = timeWithEnd + ':' + minsWithEnd + 'pm';
        }

        if (timeInput.value !== '') {
            finalMessage = `You were born on ${monthMapped} ${dayWithEnd} ${BIRTH['year']} at ${timeWithEnd}`;
        } else {
            finalMessage = `You were born on ${monthMapped} ${dayWithEnd} ${BIRTH['year']}`;
        }

    
    youWereBornP.innerHTML= finalMessage;
}

function convertCurrentData () {
    // getting mins
    CURRENT['mins'] = CURRENT['string'].getMinutes();
    
    // getting hours
    CURRENT['hours'] = CURRENT['string'].getHours();

    // getting day
    CURRENT['day'] = CURRENT['string'].getDate();

    // getting month
    CURRENT['month'] = CURRENT['string'].getMonth() + 1;

    // getting year
    CURRENT['year'] = CURRENT['string'].getFullYear();

    // console out
    console.log (`Current: mins - ${CURRENT['mins']}, hours - ${CURRENT['hours']}, day - ${CURRENT['day']}, month - ${CURRENT['month']}, year - ${CURRENT['year']}`);
}

function calculatingLifeSpan () {
    //calculating full years lasted
    if (CURRENT['month'] < BIRTH['month']) {
        LIVED['year'] = CURRENT['year'] - BIRTH['year'] - 1;
    } else {
        LIVED['year'] = (CURRENT['year'] - BIRTH['year']);
    }

    //calculating full month lived
    if (CURRENT['month'] < BIRTH['month']) {
        LIVED['month'] = (LIVED['year'] * 12) + CURRENT['month'] + (12 - BIRTH['month']);
    } else {
        LIVED['month'] = (LIVED['year'] * 12) + (CURRENT['month'] - BIRTH['month']);
    }

    //calculating full days
    LIVED['day'] = (LIVED['month'] * 30) + CURRENT['day'];
    LIVED['day'] = LIVED['day'] + Math.floor(LIVED['year']/4);

    //calculating full hours
    LIVED['hours'] = (LIVED['day'] * 24) + CURRENT['hours'];

    //calculating full mins
    LIVED['mins'] = (LIVED['hours'] * 60) + CURRENT['mins'];

    console.log (`Fully Lived: years - ${LIVED['year']}, months - ${LIVED['month']}, days - ${LIVED['day']}, hours - ${LIVED['hours']}, mins - ${LIVED['mins']}`)
}

function displayResult () {
    //selectors
    const youHaveLived = document.querySelector('#youHaveLivedP');
    const yearsLi = document.querySelector('#yearsLi');
    const monthsLi = document.querySelector('#monthsLi');
    const daysLi = document.querySelector('#daysLi');
    const hoursLi = document.querySelector('#hoursLi');
    const minutesLi = document.querySelector('#minutesLi');

    //changing the title
    youHaveLived.innerHTML = 'You Have Lived in Total:';
    //display year
    yearsLi.innerHTML = LIVED['year'] + ' years';
    //display months
    monthsLi.innerHTML = LIVED['month'] + ' months';
    //display days
    daysLi.innerHTML = LIVED['day'] + ' days';

    if (timeInput.value !== ''){
        //display hours
        hoursLi.innerHTML = LIVED['hours'] + ' hours';
        //display minutes
        minutesLi.innerHTML = LIVED['mins'] + ' minutes';
    } else {
            hoursLi.innerHTML = 'Enter Hours Above ';
            minutesLi.innerHTML = 'Enter Minutes Above';
    }


}

function clearInput() {
    dateInput.value = '';
    timeInput.value = '';
}