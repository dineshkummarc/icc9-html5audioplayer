var PLAYER = (function () {

	var player = {};
	var tracks = [];
	var currentTrack = null;
	var endedHandler;

	var track = {
		id : '',
		sound : null
	};

	var findTrack = function (id) {
		for (var i = 0; i < tracks.length; i++) {
			if (tracks[i].id === id) {
				return tracks[i];
			}
		}
		return null;
	};

	var handleTrackEnded = function (track) {
		if (endedHandler != null) {
			endedHandler(track.id);
		}
	};

	player.isOGGSupported = function () {
		return buzz.isOGGSupported();
	};

	player.isMP3Supported = function () {
		return buzz.isMP3Supported();
	};

	player.isSupported = function () {
		return buzz.isSupported();
	};

	player.addTrack = function (song) {
		var newTrack = Object.create(track);
		newTrack.id = song.id;
		newTrack.sound = new buzz.sound(
			song.basePath,
			{ formats: song.formats, preload: false });
		tracks.push(newTrack);

		newTrack.sound.bind('ended', function () {
			handleTrackEnded(newTrack);
		});
	};	

	player.togglePlay = function (id) {	
		var track = findTrack(id);

		if (currentTrack === null) {
			currentTrack = track;
		}

		if (track === currentTrack) {
			track.sound.togglePlay();
			return;
		}

		currentTrack.sound.pause();
		currentTrack.sound.setTime(0);
		currentTrack = track;
		currentTrack.sound.togglePlay();
	};

	player.trackEnded = function (handler) {
		endedHandler = handler;
	};		

	return player;

})();
