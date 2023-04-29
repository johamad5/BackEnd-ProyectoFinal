const socket = io();

socket.on('chat', (msgs) => {
	const chatView = document.getElementById('chat');
	chatView.innerHTML = ``;

	if (msgs.length >= 1) {
		msgs.map((msg) => {
			let text = msg.text;
			let alias = msg.alias;
			let url = msg.avatar;
			chatView.innerHTML += `
			<div class='msg'>
			<img src='${url}' class='imgChat'/>
			<p><strong>${alias} </strong >-  ${text}<br></p>
			</div>
			`;
		});
	} else {
		chatView.innerHTML += `<p class='blackBox'> El chat no ha iniciado</p>`;
	}
});

function sendMsg() {
	const msg = {
		author: {
			id: document.getElementById('email').value,
			name: document.getElementById('name').value,
			surname: document.getElementById('surname').value,
			age: document.getElementById('age').value,
			alias: document.getElementById('alias').value,
			avatar: document.getElementById('avatar').value,
		},
		text: document.getElementById('msg').value,
		datatime: new Date(),
	};

	socket.emit('usserMsg', msg);
	return false;
}
