 
let gameseq=[];
let userseq=[];

let start=false;
let level=0;

let btns=["blue","chartreuse","red","teal"];

h2=document.querySelector("h2");

document.addEventListener("click",function(){
    if (start==false) {
        console.log("Game Started");
        start=true;

        levelUp();
    }
});



function btnFlase(btn){
    btn.classList.add("flase");
    setTimeout(() => {
        btn.classList.remove("flase");
    }, 100);
    
}

function userFlase(btn){
    btn.classList.add("userflase");
    setTimeout(() => {
        btn.classList.remove("userflase");
    }, 100);
    
}

function levelUp() {
    userseq=[];
    level=level+1;
    h2.innerText=`Level ${level}`;

    let randind=Math.floor(Math.random()*3);
    let randcolor=btns[randind];
    let randbtn=document.querySelector(`.${randcolor}`);
    console.log(randind);
    console.log(randcolor);
    console.log(randbtn);
    gameseq.push(randcolor);
     
    btnFlase(randbtn);
}

function anscheak(index) {   
    if (userseq[index]===gameseq[index]) {
        if (userseq.length==gameseq.length) {
            setTimeout(levelUp,800);
        }
    }
    else{
        h2.innerHTML= `Game Over Your score is <b>${level*10}</b> <br> Click Anywere To Start`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";
        },500);
        setTimeout(reset,2000);
        // reset();
    }
}

function btnpress() {
    let btn=this;
    // btnFlase(btn);
    userColor=btn.getAttribute("id");
    console.log(userColor);
    userseq.push(userColor);
    userFlase(btn);

    anscheak(userseq.length-1);
}

let allbtn=document.querySelectorAll(".btn");
for(let btn of allbtn){
    btn.addEventListener("click",btnpress)
}

function reset() {
    start=false;
    userseq=[];
    gameseq=[];
    level=0;

}