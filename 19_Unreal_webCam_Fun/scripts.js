const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
	navigator.mediaDevices.getUserMedia({ video: true, audio: false})
		.then(localMediaStream => {
			window.stream = localMediaStream;
			video.srcObject = localMediaStream;

			video.play()
		})
		.catch(err => console.error(err));
}

function paintToCanvas() {
	const width = video.videoWidth;
	const height = video.videoHeight;


	canvas.width = width;
	canvas.height = height;

	return setInterval(() => {
		ctx.drawImage(video, 0, 0, width, height);

		let pixels = ctx.getImageData(0, 0, width, height);

		// ctx.globalAlpha = 0.1;

		// pixels = rgbSplit(pixels);

		pixels = greenScreen(pixels);
		// console.log(pixels)
		ctx.putImageData(pixels, 0, 0);

	}, 10);
}

function takePhoto() {
	snap.currentTime = 0;
	snap.play();

	// Take data out of canvas

	const data = canvas.toDataURL('image/png');
	const link = document.createElement('a');
	link.href = data;
	link.setAttribute('download', 'sexy');
	link.innerHTML = `<img src="${data}" alt="Yo!!">`;
	strip.insertBefore(link, strip.firstChild);
}


function redEffect(pixles) {
	for(let i = 0; i < pixles.data.length; i+=4){
		pixles.data[i + 0] = pixles.data[i+ 0] + 100;
		pixles.data[i + 1] = pixles.data[i+ 1] - 200;
		pixles.data[i + 2] = pixles.data[i+ 2] * 0.3;
	}

	return pixles;
}

function rgbSplit(pixles) {
	for(let i = 0; i < pixles.data.length; i+=4){
		pixles.data[i - 150] = pixles.data[i+ 0];
		pixles.data[i + 300] = pixles.data[i+ 1];
		pixles.data[i - 250] = pixles.data[i+ 2];
	}

	return pixles;
}

function greenScreen(pixles) {
	const levels = {};

	document.querySelectorAll('.rgb input').forEach(input => {
		levels[input.name] = input.value;
	});

	console.log(levels);

	for(i = 0; i< pixles.data.length; i+=4){
		red = pixles.data[i+0];
		green = pixles.data[i+1];
		blue = pixles.data[i+2];
		alpha = pixles.data[i+3];

		if(red >= levels.rmin
			&& green >= levels.gmin
			&& blue >= levels.bmin
			&& red <= levels.rmax
			&& green <= levels.gmax
			&& blue <= levels.bmax){

			pixles.data[i+3] = 0;
			}
	}

	console.log(pixles.data)
	return pixles;
}
getVideo();


video.addEventListener('canplay',paintToCanvas)