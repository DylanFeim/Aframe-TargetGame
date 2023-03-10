//using var is function scoped
var e = 0;
if (true) {
    var e = 1;
}
console.log(e);

//using let is block scoped
let f = 0;
if (true) {
    let f = 1;
}
console.log(f);

//also const for variables you don't want changed
const c = 0;
//c = 1; //error

//functions looks a bit different. "Mostly" equivalent. However, arrow notation do not refer to "this" as themselves but rather the scope they were created in.
//You also cannot use the 'new' keyword to create "objects" as you can with functions.
let obj = {
    count : 10,
    countStuff : function (){
        setTimeout(function(){ // the function executes on the window scope
            this.count++;
            console.log(this.count);
        }, 300);
    }
}

let objArrow = {
    count : 10,
    countStuff : function (){
        setTimeout(() => { // the function executes on the obj scope, as setTimeout doesn't create its own.
            this.count++;
            console.log(this.count);
        }, 300);
    }
}
obj.countStuff(); // console prints "NaN", because the property "count" is not in the window scope.
objArrow.countStuff();

//promises: a way to make sure something before something else ...
const myPromise = new Promise(function(resolveFunc, rejectFunc) {
    setTimeout(function(){ resolveFunc("I love you!"); }, 3000);
    //setTimeout(function(){ rejectFunc("I need some time ..."); }, 3000);
});
  
myPromise.then(function(value) {
    console.warn(value);
}).catch(function(value) {
    console.error(value);
});

//to expand
//when writing functions:
//async makes a function return a Promise
//await makes a function wait for a Promise. The await keyword can only be used inside an async function.
//Note that javascript is often single-threaded so making async allows many things to happen at a time, but we need await to order/sync things when necessary.
async function myAsyncFunction() {
    return "Calling async function";
}
myAsyncFunction().then(
    function(value) { console.log(value); } 
);

async function awaitTestFunc() {
    const someStr = await myPromise;
    console.log(someStr);
}
awaitTestFunc();

//then just a reimder about old-school events (as they are heavily used in javascript applications)
window.addEventListener('load', function() { console.log('page loaded') })
document.addEventListener('five_seconds_elapsed', function() { console.warn('I miss you.') });

const event = new Event('five_seconds_elapsed');
setTimeout( function(){document.dispatchEvent(event)}, 5000);