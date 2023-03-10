const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server); //our websockets library

const LISTEN_PORT = 8080;

const xMin1 = -43.5;
const xMax1 = -21.5;
const yMin1 = 1;
const yMax1 = 5;
const zMin1 = 0.4;
const zMax1 = 6.2;

const zMin2 = zMin1 * -1;
const zMax2 = zMax1 * -1;


let timer;

let mode = 0;
let player1Score = 0;
let player2Score = 0;
let totalScore = 0;


//our routes
app.get('/', function (req, res) {
    res.sendFile('index.html', { root: __dirname + '/public/' });
});

//socket.io events
io.on('connection', (socket) => {
    console.log(socket.id + " is connected! HELLO!");

    io.emit('setup', { p1: player1Score, p2: player2Score });

    socket.on('disconnect', () => {
        console.log(socket.id + " is disconnected. BYE!");
    });

    socket.on('coop', (data) => {
        console.log('coop event triggered');
        mode = 0;
        io.emit('coop-selected', { mode });
    });

    socket.on('comp', (data) => {
        console.log('competitive event triggered');
        mode = 1;
        io.emit('comp-selected', { mode });
    });

    socket.on('start', (data) => {
        console.log('start event triggered');
        // startTimer(10);
        timer = 10, minutes, seconds;
        
        let x;
        let intervalID = setInterval(function () {

            minutes = parseInt(timer / 60, 10)
            seconds = parseInt(timer % 60, 10);
            
            inutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            timer--;
            console.log(x);
            
            x = `${minutes}:${seconds}`;
            io.emit('timer', { x });
            if (timer < 0) {
                clearInterval(intervalID);
            }
        }, 1000);

        io.emit('start-receive', { mode });

    });

    socket.on('target1-selected', (data) => {
        console.log('target1 event triggered');


        let xPos = Math.random() * (xMax1 - xMin1) + xMin1;
        let yPos = Math.random() * (yMax1 - yMin1) + yMin1;
        let zPos = Math.random() * (zMax1 - zMin1) + zMin1;

        player1Score += 1;

        io.emit('move-target1', { x: xPos, y: yPos, z: zPos, score: player1Score });

    });

    socket.on('target2-selected', (data) => {
        console.log('target2 event triggered');


        let xPos = Math.random() * (xMax1 - xMin1) + xMin1;
        let yPos = Math.random() * (yMax1 - yMin1) + yMin1;
        let zPos = Math.random() * (zMax2 - zMin2) + zMin2;

        player2Score += 1;

        io.emit('move-target2', { x: xPos, y: yPos, z: zPos, score: player2Score });

    });

    // io.emit('move-target2', {r:0, g:0, b:255});
    // button_press
});

app.use(express.static(__dirname + '/public'));
server.listen(LISTEN_PORT);
console.log('Listening to port: ' + LISTEN_PORT);

// function startTimer(duration) {
//     let timer = duration, minutes, seconds;
//     setInterval(function () {
//         minutes = parseInt(timer / 60, 10)
//         seconds = parseInt(timer % 60, 10);

//         minutes = minutes < 10 ? "0" + minutes : minutes;
//         seconds = seconds < 10 ? "0" + seconds : seconds;


//         if (--timer < 1) {
//             window.clearInterval(startTimer);
//             console.log(over);
//         }

//         let time =`${minutes}:${seconds}`;
//         console.log(time);
//         io.emit('time', { time });
//     }, 1000);
// }

