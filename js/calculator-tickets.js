const ticketType = document.querySelectorAll('input[name="ticket-type"'),
	ticketsPrice = document.getElementById('tickets-price'),
	basicNumber = document.getElementById('basicNumber'),
	seniorNumber = document.getElementById('seniorNumber'),
	numberDown = document.querySelectorAll('.number-choice__btn-down'),
	numberUp = document.querySelectorAll('.number-choice__btn-up');

function getTicketTypeInputChecked() {
	let inputChecked;

	ticketType.forEach((input) => {
		if (input.checked) inputChecked = input;
	});

	return inputChecked;
}

function calcPrice() {
	let currPrice = prices[getTicketTypeInputChecked().value];
	let result;

	result = basicNumber.value * currPrice + seniorNumber.value * (currPrice / 2);

	ticketsPrice.innerText = result;
}

ticketType.forEach((input) => {
	input.addEventListener('change', calcPrice);
});

numberDown.forEach((item) => {
	item.addEventListener('click', function () {
		this.nextElementSibling.stepDown();
		calcPrice();
	});
});

numberUp.forEach((item) => {
	item.addEventListener('click', function () {
		this.previousElementSibling.stepUp();
		calcPrice();
	});
});

function fillTicketsSection() {
	let ticketTypeStorage = localStorage.getItem('ticketTypeStorage');

	if (ticketTypeStorage) {
		document.getElementById(ticketTypeStorage).checked = true;
		basicNumber.value = localStorage.getItem('basicNumberStorage');
		seniorNumber.value = localStorage.getItem('seniorNumberStorage');
		ticketsPrice.innerText = localStorage.getItem('totalPriceStorage');
	}
}

fillTicketsSection();

window.onunload = function () {
	localStorage.setItem('ticketTypeStorage', getTicketTypeInputChecked().value);
	localStorage.setItem('basicNumberStorage', basicNumber.value);
	localStorage.setItem('seniorNumberStorage', seniorNumber.value);
	localStorage.setItem('totalPriceStorage', ticketsPrice.innerText);
};
