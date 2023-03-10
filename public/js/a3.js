'use strict';
const ascene = document.querySelector('a-scene');
const coopObj = document.querySelector('#coop');
const compObj = document.querySelector('#comp');
const coopBtn = document.querySelector('#buttonCoop');
const compBtn = document.querySelector('#buttonComp');
const startBtn = document.querySelector('#buttonStart');
const coopSound = document.querySelector('#buttonCoopSound');
const compSound = document.querySelector('#buttonCompSound');
const startSound = document.querySelector('#buttonStartSound');
const player1Score = document.querySelector('#player1Score');
const player2Score = document.querySelector('#player2Score');
const totalScore = document.querySelector('#totalScore');
const timerTxt = document.querySelector('#timer');

const target1 = document.querySelector('#target1');
const target2 = document.querySelector('#target2');

//click animation
AFRAME.registerComponent('click-button', {
    schema: {
        targetId: { type: 'string', default: '' }
    },
    init: function () {

        // let Context_AF = this;
        // let soundLoc = document.querySelector(Context_AF.data);
        // //listen on click
        // Context_AF.el.addEventListener('click', function () {

        //     soundLoc.components.sound.playSound();
        //     Context_AF.el.setAttribute('animation-mixer', 'clip: *; loop: once; clampWhenFinished: true;');
        //     Context_AF.el.addEventListener('animation-finished', function () {
        //         Context_AF.el.removeAttribute('animation-mixer');
        //     }, { once: true });
        // });
    },
});

AFRAME.registerComponent('experience-manager', {
    init: function () {
        const socket = io();

        socket.on('connect', (userData) => {
            console.log('I exist!');

            //put code here so that we know that socket.io has initailized ...
            coopBtn.addEventListener('click', function () {
                socket.emit('coop');
            });

            compBtn.addEventListener('click', function () {
                socket.emit('comp');
            });

            startBtn.addEventListener('click', function () {
                socket.emit('start');
            });

            target1.addEventListener('click', function () {
                socket.emit('target1-selected');
            });

            target2.addEventListener('click', function () {
                console.log("t2");
                socket.emit('target2-selected');
            });
        });

        // //listen to event from server
        // socket.on('coop', (data) => {
        //     let colorStr = data;
        //     console.log('ButtonPress:' + colorStr);
        //     //document.body.style.backgroundColor = colorStr;
        //     ascene.setAttribute('background', { color: colorStr });
        // });

        socket.on('start-receive', (data) => {

            startBtn.setAttribute('animation-mixer', 'clip: *; loop: once; clampWhenFinished: true;');
            startBtn.addEventListener('animation-finished', function () {
                startBtn.removeAttribute('animation-mixer');
            }, { once: true });

            startSound.components.sound.playSound();

        });

        socket.on('coop-selected', (data) => {
            console.log("local coop");
            coopObj.setAttribute("visible", "true");
            compObj.setAttribute("visible", "false");

            coopBtn.setAttribute('animation-mixer', 'clip: *; loop: once; clampWhenFinished: true;');
            coopBtn.addEventListener('animation-finished', function () {
                coopBtn.removeAttribute('animation-mixer');
            }, { once: true });

            coopSound.components.sound.playSound();
        });

        socket.on('comp-selected', (data) => {
            console.log("local coop");
            compObj.setAttribute("visible", "true");
            coopObj.setAttribute("visible", "false");

            compBtn.setAttribute('animation-mixer', 'clip: *; loop: once; clampWhenFinished: true;');
            compBtn.addEventListener('animation-finished', function () {
                compBtn.removeAttribute('animation-mixer');
            }, { once: true });

            compSound.components.sound.playSound();
        });

        // socket.on('button-selected', (data) => {
        //     console.log(`${data.active}`);
        //     let activeButton = document.querySelector(`${data.active}`);
        //     let notActiveButton = document.querySelector(`${data.notActive}`);
        //     let activeSound = document.querySelector(`${data.notActive}Sound`);

        //     activeButton.setAttribute("visible", "false");
        //     notActiveButton.setAttribute("visible", "true");

        //     activeButton.setAttribute('animation-mixer', 'clip: *; loop: once; clampWhenFinished: true;');
        //     activeButton.addEventListener('animation-finished', function () {
        //         activeSound.removeAttribute('animation-mixer');
        //     }, { once: true });

        //     compSound.components.sound.playSound();
        // });


        socket.on('move-target1', (data) => {
            console.log(data);
            target1.setAttribute("position", `${data.x} ${data.y} ${data.z}`);
            player1Score.setAttribute("text", `value: ${data.score}`)
        });

        socket.on('move-target2', (data) => {
            target2.setAttribute("position", `${data.x} ${data.y} ${data.z}`);
            player2Score.setAttribute("text", `value: ${data.score}`)
        });

        socket.on('setup', (data) => {
            player1Score.setAttribute("text", `value: ${data.p1}`)
            player2Score.setAttribute("text", `value: ${data.p2}`)
        });

        socket.on('timer', (data) => {
            console.log(data);
            timerTxt.setAttribute("text", `value: ${data.x}`)
        });
    }
})