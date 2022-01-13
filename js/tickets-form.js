const buttons = document.querySelectorAll('.ripple');

buttons.forEach((button) => {
	button.addEventListener('click', function (e) {
		const x = e.clientX;
		const y = e.clientY;
		const buttonRipple = e.target.getBoundingClientRect(),
			buttonTop = buttonRipple.top,
			buttonLeft = buttonRipple.left,
			xInside = x - buttonLeft,
			yInside = y - buttonTop;

		const circle = document.createElement('span');
		circle.classList.add('circle');
		circle.style.top = yInside + 'px';
		circle.style.left = xInside + 'px';

		this.appendChild(circle);

		setTimeout(() => circle.remove(), 500);
	});
});

//======================================
const buyNowBtn = document.getElementById('buy-now-btn'),
	formWrapper = document.getElementById('tickets-form-wrapper'),
	closeTicketsFormBtn = document.getElementById('close-tickets-form'),
	select = document.querySelector('.tickets-form__select-ticket-type'),
	dropdownList = document.querySelector('.tickets-form__dropdown-list'),
	dropdownListItems = document.querySelectorAll('.tickets-form__dropdown-item'),
	dropdownListTime = document.querySelector('.tickets-form__dropdown-list-time'),
	dropdownListTimeItems = document.querySelectorAll('.tickets-form__dropdown-list-time-item');

const dropdownListItemsText = {
	permanent: 'Permanent exhibition',
	temporary: 'Temporary exhibition',
	combined: 'Combined Admission',
};

const form = document.forms[0],
	basicNumberFormInput = form.elements.basicNumberForm,
	seniorNumberFormInput = form.elements.seniorNumberForm,
	prices = { permanent: 20, temporary: 25, combined: 40 },
	ticketsBasicPriceText = document.querySelectorAll('.tickets-form__tickets-basic-price'),
	ticketsSeniorPriceText = document.querySelectorAll('.tickets-form__tickets-senior-price'),
	tableNumberTicketsBasic = document.querySelector('.overview-table__number-basic'),
	tableNumberTicketsSenior = document.querySelector('.overview-table__number-senior'),
	ticketsBasicTotalPrice = document.querySelector('.tickets-form__tickets-basic-total-price'),
	ticketsSeniorTotalPrice = document.querySelector('.tickets-form__tickets-senior-total-price'),
	ticketsTotalPrice = document.querySelector('.tickets-form__tickets-total-price'),
	overviewTicketType = document.querySelector('.tickets-form__overview-ticket-type'),
	overviewDateText = document.querySelector('.tickets-form__overview-date'),
	overviewTimeText = document.querySelector('.tickets-form__overview-time');
let dateInput = form.elements.date;
let timeInput = form.elements.time;

buyNowBtn.addEventListener('click', function () {
	formWrapper.classList.add('form-is-shown');

	select.value = dropdownListItemsText[getTicketTypeInputChecked().value];
	basicNumberFormInput.value = basicNumber.value;
	seniorNumberFormInput.value = seniorNumber.value;

	let basicPrice = getTicketsBasicPrice(select.value);
	changeTicketType(select.value, basicPrice);
	changeNumberTickets(basicNumberFormInput.value, seniorNumberFormInput.value);
	calcTicketsPrices(basicPrice);

	let currDate = new Date();
	dateInput.setAttribute('min', currDate.getFullYear() + '-' + (currDate.getMonth() + 1) + '-' + currDate.getDate());
});

closeTicketsFormBtn.addEventListener('click', function () {
	if (formWrapper.classList.contains('form-is-shown')) {
		formWrapper.classList.remove('form-is-shown');
	} else return;
});

formWrapper.addEventListener('click', function (e) {
	if (e.target.id == 'tickets-form-wrapper') {
		if (formWrapper.classList.contains('form-is-shown')) {
			formWrapper.classList.remove('form-is-shown');
		}
	} else {
		if (
			select.classList.contains('tickets-form__select-ticket-type_is-open') &&
			dropdownList.classList.contains('tickets-form__dropdown-list_visible')
		) {
			select.classList.toggle('tickets-form__select-ticket-type_is-open');
			dropdownList.classList.toggle('tickets-form__dropdown-list_visible');
		}

		if (
			timeInput.classList.contains('tickets-form__time_is-open') &&
			dropdownListTime.classList.contains('tickets-form__dropdown-list-time_visible')
		) {
			timeInput.classList.toggle('tickets-form__time_is-open');
			dropdownListTime.classList.toggle('tickets-form__dropdown-list-time_visible');
		}
	}
});

//======================================

select.addEventListener('click', function (e) {
	e.stopPropagation();
	dropdownList.classList.toggle('tickets-form__dropdown-list_visible');
	this.classList.toggle('tickets-form__select-ticket-type_is-open');
});

dropdownListItems.forEach(function (listItem) {
	listItem.addEventListener('click', function (e) {
		e.stopPropagation();
		select.value = this.innerText;
		select.focus();
		select.classList.toggle('tickets-form__select-ticket-type_is-open');
		dropdownList.classList.toggle('tickets-form__dropdown-list_visible');

		let basicPrice = getTicketsBasicPrice(select.value);
		changeTicketType(select.value, basicPrice);
		calcTicketsPrices(basicPrice);
	});
});

dateInput.addEventListener('change', function () {
	let chosenDate = new Date(this.value);
	const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

	overviewDateText.innerText = days[chosenDate.getDay()] + ', ' + months[chosenDate.getMonth()] + ' ' + chosenDate.getDate();
});

timeInput.addEventListener('click', function (e) {
	e.stopPropagation();
	dropdownListTime.classList.toggle('tickets-form__dropdown-list-time_visible');
	this.classList.toggle('tickets-form__time_is-open');
});

dropdownListTimeItems.forEach(function (listItem) {
	listItem.addEventListener('click', function (e) {
		e.stopPropagation();
		timeInput.value = this.innerText;
		overviewTimeText.innerText = this.innerText;
		timeInput.focus();
		timeInput.classList.toggle('tickets-form__time_is-open');
		dropdownListTime.classList.toggle('tickets-form__dropdown-list-time_visible');
	});
});

function getTicketsBasicPrice(selectValue) {
	return prices[selectValue.split(' ')[0].toLowerCase()];
}

function changeTicketType(selectValue, basicPrice) {
	overviewTicketType.innerText = selectValue;
	ticketsBasicPriceText.forEach((item) => {
		item.innerText = basicPrice;
	});
	ticketsSeniorPriceText.forEach((item) => {
		item.innerText = basicPrice / 2;
	});
}

function changeNumberTickets(basicNumTickets, seniorNumTickets) {
	tableNumberTicketsBasic.innerText = basicNumTickets;
	tableNumberTicketsSenior.innerText = seniorNumTickets;
}

function calcTicketsPrices(basicPrice) {
	let basicPriceAllBasicTickets = basicNumberFormInput.value * basicPrice;
	let seniorPriceAllSeniorTickets = seniorNumberFormInput.value * (basicPrice / 2);
	let totalPrice = basicPriceAllBasicTickets + seniorPriceAllSeniorTickets;
	ticketsBasicTotalPrice.innerText = basicPriceAllBasicTickets;
	ticketsSeniorTotalPrice.innerText = seniorPriceAllSeniorTickets;
	ticketsTotalPrice.innerText = totalPrice;
}

let btnsMinus = document.querySelectorAll('.number-choice__btn-minus');
let btnsPlus = document.querySelectorAll('.number-choice__btn-plus');

btnsMinus.forEach((btnMinus) => {
	btnMinus.addEventListener('click', function () {
		this.nextElementSibling.stepDown();

		let basicPrice = getTicketsBasicPrice(select.value);
		changeNumberTickets(basicNumberFormInput.value, seniorNumberFormInput.value);
		calcTicketsPrices(basicPrice);
	});
});

btnsPlus.forEach((btnPlus) => {
	btnPlus.addEventListener('click', function () {
		this.previousElementSibling.stepUp();

		let basicPrice = getTicketsBasicPrice(select.value);
		changeNumberTickets(basicNumberFormInput.value, seniorNumberFormInput.value);
		calcTicketsPrices(basicPrice);
	});
});
