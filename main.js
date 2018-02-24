const socket = io('https://mychat14022018.herokuapp.com/');

$('#div_chat').hide();

let ice;

$.ajax ({
	url: "https://global.xirsys.net/_turn/nangthu3.github.io/",
	type: "PUT",
	async: false,
	headers: {
	  "Authorization": "Basic " + btoa("nangthu3:d956e1d8-1971-11e8-a283-4cf4a4f147a9")
	},
	success: function (res){
		ice = res.v.iceServers;
	  	console.log("ICE List: "+res.v.iceServers);
	}
});

function openStream(){
	const config = {audio: true, video: true};
	return navigator.mediaDevices.getUserMedia(config);
}

function playVideo(stream, videoTag){
	const video = document.getElementById(videoTag);
	video.srcObject = stream;
	video.play();
}

// openStream()
// .then(stream => playVideo(stream, "localStream"));

const peer = new Peer({
	key: 'peerjs', 
	host: 'mypeerserver24022018.herokuapp.com', 
	secure: true, 
	port: 443,
	config: ice
});
peer.on('open', id => {
	$('#your_id').append(id);
	$('#btnSignUp').click(()=>{
		const username = $('#txtUsername').val();
		socket.emit('NGUOI_DUNG_DANG_KY', {ten: username, peerId: id});
	});
});

$('#btnCall').click(() =>{
	const id = $('#remote_id').val();
	openStream().then(stream =>{
		playVideo(stream, 'localStream');
		const call = peer.call(id, stream);
		call.on('stream', remoteStream =>{
			playVideo(remoteStream, 'remoteStream');
		});
	});
})

peer.on('call', call=>{
	openStream().then(openStream=>{
		call.answer(openStream);
		playVideo(openStream, 'localStream');
		call.on('stream', remoteStream =>{
			playVideo(remoteStream, 'remoteStream');
		});
	});
});

socket.on('DANH_SACH_USER_ONLINE', arrUserInfo=>{
	$('#div_chat').show();
	$('#div_dangky').hide();
	arrUserInfo.forEach(user => {
		console.log(arrUserInfo);
		const {ten, peerId} = user;
		$('#ulUser').append(`<li id=${peerId}>${ten}</li>`);
	});
	
	socket.on('NGUOI_DUNG_MOI', user=>{
		console.log(user);
		const {ten, peerId} = user;
		$('#ulUser').append(`<li id=${peerId}>${ten}</li>`);
	});

	socket.on('AI_DO_NGAT_KET_NOI', peerId=>{
		$(`#${peerId}`).remove();
	});
});

socket.on('DANG_KY_THAT_BAI', ()=> alert('Chon ten khac'));

$('#ulUser').on('click','li', function(){
	const id = $(this).attr('id');
	openStream().then(stream =>{
		playVideo(stream, 'localStream');
		const call = peer.call(id, stream);
		call.on('stream', remoteStream =>{
			playVideo(remoteStream, 'remoteStream');
		});
	});
});
