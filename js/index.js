const progresses = document.querySelectorAll('.video-player__range'),
	videoPlayer = document.querySelector('.video-player'),
	activeVideo = videoPlayer.querySelector('.slick-active video'),
	btnPlayOrPause = videoPlayer.querySelector('.video-player__play'),
	imgBtnPlayOrPause = videoPlayer.querySelector('.video-player__play img'),
	bigPlayBtn = videoPlayer.querySelector('.video-player__big-play'),
	volumeBtn = videoPlayer.querySelector('.video-player__volume'),
	messagePlaybackRate = videoPlayer.querySelector('.video-player__playbackRate'),
	btnFullScreen = videoPlayer.querySelector('.video-player__full-screen');
let progressBar = progresses[0];
let volumeBar = progresses[1];
let playbackRate = 1;

volumeBar.addEventListener('input', function () {
	const value = this.value;
	this.style.background = 'linear-gradient(to right, #710707 0%, #710707 ' + value * 100 + '%, #c4c4c4 ' + value * 100 + '%, #c4c4c4 100%)';
});

progressBar.addEventListener('input', function () {
	const value = this.value;
	this.style.background = 'linear-gradient(to right, #710707 0%, #710707 ' + value + '%, #c4c4c4 ' + value + '%, #c4c4c4 100%)';
});

volumeBar.addEventListener('change', handleVolumeUpdate);

function scrub() {
	activeVideo.currentTime = (progressBar.value * activeVideo.duration) / 100;

	if (progressBar.value == 100) {
		activeVideo.pause();
		imgBtnPlayOrPause.src = 'assets/svg/video-controls/play.svg';
		bigPlayBtn.style.display = 'block';
	}
}

let mousedown = false;
progressBar.addEventListener('mousemove', (e) => {
	if (mousedown) {
		scrub(e);
	}
});
progressBar.addEventListener('mousedown', function () {
	mousedown = true;
});
progressBar.addEventListener('mouseup', function () {
	mousedown = false;
});

function handleVolumeUpdate() {
	let img = videoPlayer.querySelector('.video-player__volume img');

	activeVideo[this.name] = this.value;

	if (this.value == 0) {
		img.src = 'assets/svg/video-controls/mute.svg';
	} else if (img.src.indexOf('assets/svg/video-controls/mute.svg') != -1) {
		img.src = 'assets/svg/video-controls/volume.svg';
	}
}

function volumeUpdate() {
	activeVideo[volumeBar.name] = volumeBar.value;
}

function volumeBarUpdate() {
	const value = volumeBar.value;
	volumeBar.style.background = 'linear-gradient(to right, #710707 0%, #710707 ' + value * 100 + '%, #c4c4c4 ' + value * 100 + '%, #c4c4c4 100%)';
}

function progressBarUpdate() {
	const value = progressBar.value;
	progressBar.style.background = 'linear-gradient(to right, #710707 0%, #710707 ' + value + '%, #c4c4c4 ' + value + '%, #c4c4c4 100%)';
}

function togglePlay() {
	if (activeVideo.paused) {
		activeVideo.play();
		imgBtnPlayOrPause.src = 'assets/svg/video-controls/pause.svg';
		bigPlayBtn.style.display = 'none';
	} else {
		activeVideo.pause();
		imgBtnPlayOrPause.src = 'assets/svg/video-controls/play.svg';
		bigPlayBtn.style.display = 'block';
	}
}

function toggleVolume() {
	let img = videoPlayer.querySelector('.video-player__volume img');

	if (volumeBar.value == 0) {
		volumeBar.value = 0.45;
		img.src = 'assets/svg/video-controls/volume.svg';
	} else {
		volumeBar.value = 0;
		img.src = 'assets/svg/video-controls/mute.svg';
	}
	volumeUpdate();
	volumeBarUpdate();
}

function handleProgress() {
	let percent = (activeVideo.currentTime / activeVideo.duration) * 100;
	progressBar.value = percent;
	progressBarUpdate();

	if (percent == 100) {
		activeVideo.pause();
		imgBtnPlayOrPause.src = 'assets/svg/video-controls/play.svg';
		bigPlayBtn.style.display = 'block';
	}
}

activeVideo.addEventListener('click', togglePlay);
activeVideo.addEventListener('timeupdate', handleProgress);
btnPlayOrPause.addEventListener('click', togglePlay);
bigPlayBtn.addEventListener('click', togglePlay);
volumeBtn.addEventListener('click', toggleVolume);

$('.video-player__container').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
	if (!activeVideo.paused) {
		togglePlay();
	}

	progressBar.value = 0;
	activeVideo.currentTime = 0;
	progressBarUpdate();

	activeVideo.removeEventListener('click', togglePlay);
	activeVideo.removeEventListener('timeupdate', handleProgress);
});

$('.video-player__container').on('afterChange', function (event, slick, currentSlide) {
	activeVideo = videoPlayer.querySelector('.slick-active video');
	activeVideo.addEventListener('click', togglePlay);
	activeVideo.addEventListener('timeupdate', handleProgress);
	playbackRate = 1;
});

document.addEventListener('keydown', function (e) {
	let keyName = e.key;

	if (keyName === ' ') {
		// e.preventDefault();
		togglePlay();
	} else if (keyName === 'm') {
		// e.preventDefault();
		toggleVolume();
	} else if (e.shiftKey && e.key === '>') {
		if (playbackRate > 0.25) {
			playbackRate -= 0.25;
		}
		activeVideo.playbackRate = playbackRate;
		messagePlaybackRate.innerText = playbackRate + 'x';
		messagePlaybackRate.style.opacity = 1;

		setTimeout(function () {
			messagePlaybackRate.style.opacity = 0;
		}, 1000);
	} else if (e.shiftKey && e.key === '<') {
		if (playbackRate < 2) {
			playbackRate += 0.25;
		}
		activeVideo.playbackRate = playbackRate;
		messagePlaybackRate.innerText = playbackRate + 'x';
		messagePlaybackRate.style.opacity = 1;
		setTimeout(function () {
			messagePlaybackRate.style.opacity = 0;
		}, 1000);
	} else if (keyName === 'f') {
		//turn on full screen or turn off
		toggleFullScreen();
	}
});

function toggleFullScreen() {
	let img = videoPlayer.querySelector('.video-player__full-screen img');

	if (img.src.indexOf('exit') != -1) {
		img.src = 'assets/svg/video-controls/fullscreen.svg';
	} else {
		img.src = 'assets/svg/video-controls/fullscreen_exit.svg';
	}
	videoPlayer.classList.toggle('video-player_full-screen');
}

btnFullScreen.addEventListener('click', toggleFullScreen);
