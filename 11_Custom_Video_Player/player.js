// Collecting Elements

const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progressFilled");
const toggle = player.querySelector('.togller');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.playerSlider');
const fullscreenButton = player.querySelector('.fullScreenButton');

// Functions to calles

// Function to play or pause the video
function togglePlay() {
	// Selecting the right method
	const method = video.paused ? 'play' : 'pause';
	// Calling the finction
	video[method]();
}

function updateButton() {
	const symbol = video.paused ? '►' : '▍▍';
	toggle.textContent = symbol;
}

function skip() {
	video.currentTime += parseFloat(this.dataset.skip);
}

function skipwithButton(key) {
	const skip_button = key === 37 ? skipButtons[0] : skipButtons[1];
	console.log(skip_button);
	video.currentTime += parseFloat(skip_button.dataset.skip);
}

function handleSliderUpdate() {
	video[this.name] = this.value;
}

function handelProgress() {
	const present = (video.currentTime / video.duration) * 100;
	console.log(present);
	 progressBar.style.flexBasis = `${present}%`
}

function scrub(e) {
	const time = (e.offsetX / progress.offsetWidth) * video.duration;
	video.currentTime = time;
}

let isFullScreen = false
function toggleFullScreen() {

	const fullScreen = video.fullscreenElemen || video.webkitRequestFullscreen || video.mozRequestFullScreen || video.msRequestFullscreen;

	console.log(fullScreen)
	if(!isFullScreen) {
		fullScreen.call(video);
		isFullScreen = true;
	}
	else {

		if (document.exitFullscreen) {
			document.exitFullscreen();
		}
		else if (document.webkitExitFullscreen) {
			document.webkitExitFullscreen();
		}
		else if (document.mozCancelFullScreen) {
			document.mozCancelFullScreen();
		}
		else if (document.msExitFullscreen) {
			document.msExitFullscreen();
		}

		isFullScreen = false;
	}
}


// Events Listener

window.addEventListener('keydown', (e) => {
	if(e.keyCode === 32){
		togglePlay();
	}
	else if (e.keyCode === 70) {
		toggleFullScreen();
	}
	else if (e.keyCode === 39 || e.keyCode === 37) {
		skipwithButton(e.keyCode);
	}
});

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handelProgress);

toggle.addEventListener('click', togglePlay);

skipButtons.forEach(skipButton => skipButton.addEventListener('click', skip));

let clickDown_ranges = false;
ranges.forEach(range => range.addEventListener('change', handleSliderUpdate));
ranges.forEach(range => range.addEventListener('mousedown', () => clickDown_ranges = true));
ranges.forEach(range => range.addEventListener('mouseup', () => clickDown_ranges = false));
ranges.forEach(range => range.addEventListener('mousemove',() => clickDown_ranges && handleSliderUpdate));

let clickDown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => clickDown && scrub(e));
progress.addEventListener('mousedown', () => clickDown = true);
progress.addEventListener('mouseup', () => clickDown = false);

fullscreenButton.addEventListener('click', toggleFullScreen);

// video.on('ended', () => this.webkitExitFullscreen());