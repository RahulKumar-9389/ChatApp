const socket = io()

var audio = new Audio('/alert.mp3');
let name;
let messageArea = document.querySelector('.message__area')
let chatImg = document.querySelector('.send-img');

const joinForm = document.querySelector(".form");
joinForm.addEventListener("submit", (e) => {
    e.preventDefault();
    name = document.getElementById("name").value;
    if (!name) {
        return
    }
    socket.emit("new-user-joined", name);
    document.querySelector(".form_section").style.display = "none";
    document.querySelector(".chat__section").style.display = "block";
})


chatImg.addEventListener("click", () => {
    const message = document.getElementById("message_box").value;
    socket.emit("send", message);
    appendMessage(`You : ${message}`, 'right');
    document.getElementById("message_box").value = "";

});

message_box.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        const message = document.getElementById("message_box").value;
        socket.emit("send", message);
        appendMessage(`You : ${message}`, 'right');
        document.getElementById("message_box").value = "";
    }
})



const appendMessage = (message, position) => {
    const mainDiv = document.createElement('div');
    let className = position
    mainDiv.classList.add(className, 'message')
    mainDiv.innerText = message;
    messageArea.append(mainDiv);
};




// Recive message
socket.on('recive', data => {
    appendMessage(`${data.name} : ${data.message} `, 'left');
    audio.play();
});



// Joined a new user
socket.on("user-joined", name => {
    document.querySelector(".user-joined").innerHTML = `${name} joined the chat`;
});

























// function sendMessage(message) {
//     let msg = {
//         user: name,
//         message: message.trim()
//     }
//     // Append 
//     appendMessage(msg, 'outgoing')
//     message_box.value = ''
//     scrollToBottom()

//     // Send to server 
//     socket.emit('message', msg)

// }

// function appendMessage(msg, type) {
//     let mainDiv = document.createElement('div')
//     let className = type
//     mainDiv.classList.add(className, 'message')

//     let markup = `
//         <h4>${msg.user}</h4>
//         <p>${msg.message}</p>
//     `
//     mainDiv.innerHTML = markup
//     messageArea.appendChild(mainDiv)
// }

// // Recieve messages 
// socket.on('message', (msg) => {
//     appendMessage(msg, 'incoming')
//     scrollToBottom()
// })

// function scrollToBottom() {
//     messageArea.scrollTop = messageArea.scrollHeight
// }



