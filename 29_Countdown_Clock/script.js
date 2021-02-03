let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');

const bottons = document.querySelectorAll('[data-time]');

const audio = document.querySelector('#sound');

console.log(audio);


function timer(seconds) {

	clearInterval(countdown);

	const now = Date.now();
	const then = now + seconds * 1000;

	displayTimeLeft(seconds);
	displayEndTime(then);

	countdown = setInterval(() => {

		const time_left = Math.round((then - Date.now()) / 1000);

		// Stopping Condition
		if (time_left <= 0) {
			audio.play();
			clearInterval(countdown)
		}

		displayTimeLeft(time_left)
	}, 1000);

}

function displayTimeLeft(seconds) {

	const hours = Math.floor(seconds / 3600);
	let reminder_seconds = seconds % 3600;

	const minutes = Math.floor(reminder_seconds / 60);
	reminder_seconds = reminder_seconds % 60;

	const dHours = hours < 10 ?  ('0' +  hours) : hours;
	const dMinutes = minutes < 10 ?  ('0' +  minutes) : minutes;
	const dSeconds = reminder_seconds < 10 ?  ('0' +  reminder_seconds) : reminder_seconds;

	const timerDisplayText = `${parseInt(dHours) > 0 ? (dHours + ':') : ''}${dMinutes}:${dSeconds}`;

	timerDisplay.textContent = timerDisplayText;

	document.title = timerDisplayText;

}


function displayEndTime(timestamp) {
	const end = new Date(timestamp);
	const hour = end.getHours();
	const minutes = end.getMinutes();

	endTime.textContent = `Be back At ${hour > 12 ? hour - 12 : hour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function startTimer() {
	let seconds = parseInt(this.dataset.time);
	console.log(seconds);

	timer(seconds);
}
bottons.forEach(button => button.addEventListener('click', startTimer));

document.customForm.addEventListener('submit', function (e) {
	e.preventDefault();
	const mins = this.minutes.value;
	console.log(mins);

	timer(mins * 60);

	this.reset();

})