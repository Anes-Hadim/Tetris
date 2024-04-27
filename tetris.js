const colomns=10;
const lines=15;

let p=document.getElementById('grid');
for(let i=0;i<colomns*lines;i++) {
  p.innerHTML+=`<div class="box" id="box${i}" ></div>`;
  document.getElementById(`box${i}`).style.backgroundColor=`black`;
}

let shape;
let place;
let choose;
let shape_color;
let lawn;
let follow=[];

shape_choose();
generate();

function shape_choose() {
  choose=Math.floor(Math.random()*4+1);
  place=Math.floor(Math.random()*(colomns-1));
  shape_color=Math.floor(Math.random()*5+1);
}

function generate() {
  switch (choose) {
     case 1:
       shape=[place];
     break;

     case 2:
       shape=[place+1,place];
     break;

     case 3:
      shape=[place+colomns+1,place,place+colomns];
     break;

     case 4:
      shape=[place+colomns+1,place,place+1,place+colomns];
     break;
  }
  switch (shape_color) {
    case 1:
      lawn='#e74c3c';
    break;

    case 2:
      lawn='#3498db'
    break;

    case 3:
     lawn='#f39c12'
    break;

    case 4:
     lawn='#2ecc71'
    break;

    case 5:
     lawn='#9b59b6'
    break;
 }
  rem();
  follow=[...shape];
  put();
  color();
  lost();
}

function color() {
   for (let i=0;i<shape.length;i++) {
    document.getElementById(`box${shape[i]}`).style.backgroundColor=`${lawn}`;
   }
}

function remove() {
  for (let i=0;i<shape.length;i++) {
  document.getElementById(`box${shape[i]}`).style.backgroundColor=`black`;
  }
}

function move() {
  if (check_colision_down(shape[0],shape[shape.length-1])) {
    remove();
    for (let i=0;i<shape.length;i++) {
      shape[i]+=colomns;
    }
    rem();
    follow=[...shape];
    put();
    color();
  } else {
     check_line();
     shape_choose();
     generate();
   }
}
const keep=setInterval(move,500);

const left=[];
for (let i=0;i<lines;i++) {
  left[i]=i*colomns;
}
let t=-1;
const right=[];
for (let i=0;i<lines;i++) {
  right[i]=t+colomns;
  t+=colomns;
}

addEventListener('keydown', handlekeydown);

function handlekeydown(event) {
  let ind1=false;
  let ind2=false;
  for (let i=0;i<lines;i++) {
    if (shape[0]===right[i]) {
      ind1=true;
    }
    if (shape[shape.length-1]===left[i]) {
      ind2=true;
    }
  }
  switch (event.key) {
    case 'ArrowRight':
      if (!ind1&&check_colision_down(shape[0],shape[shape.length-1])&&check_colision_sides('right')) {
        remove();
        for (let i = 0; i < shape.length; i++) {
          shape[i] += 1;
        }
        rem();
        follow=[...shape];
        put();
        color();
      }
    break;

    case 'ArrowLeft':
      if (!ind2&&check_colision_down(shape[0],shape[shape.length-1])&&check_colision_sides('left')) {
        remove();
        for (let i = 0; i < shape.length; i++) {
          shape[i] -= 1;
        }
        rem();
        follow=[...shape];
        put();
        color();
      }
    break;

    case 'ArrowDown':
      if(check_colision_down(shape[0],shape[shape.length-1])) {
        remove();
        for (let i=0;i<shape.length;i++) {
          shape[i]+=colomns;
        }
        rem();
        follow=[...shape];
        put();
        color();
      }
    break;

    case 'ArrowUp':
      flip();
    break;

    case ' ':
      remove();
      shape=[...follow];
      color();
    break;
  }
}

function check_colision_down(a,z) {
  if (a<colomns*(lines-1)) {
    const ind1=document.getElementById(`box${a+colomns}`).style.backgroundColor;
    const ind2=document.getElementById(`box${z+colomns}`).style.backgroundColor;
    return ind1==='black'&&ind2==='black';
  } else {
    return false;
  }
}

function check_colision_sides(side) {
  if (side==='right') {
    for (let i=0;i<shape.length;i++) {
      if (shape.every(element => element!==shape[i]+1)) {
         if(document.getElementById(`box${shape[i]+1}`).style.backgroundColor!=='black') {
           return false;
         }
      }
    }
    return true;
  } else {
    for (let i=0;i<shape.length;i++) {
      if (shape.every(element => element!==shape[i]-1)) {
         if(document.getElementById(`box${shape[i]-1}`).style.backgroundColor!=='black') {
           return false;
         }
      }
    }
    return true;
  } 
}

function flip() {

}

function put() {
  while (check_colision_down(follow[0],follow[follow.length-1])) {
    for (let i=0;i<follow.length;i++) {
      follow[i]+=colomns;
    }
  }
  for (let i=0;i<follow.length;i++) {
    document.getElementById(`box${follow[i]}`).style.borderColor=`${lawn}`;
   }
}
function rem() {
  for (let i=0;i<follow.length;i++) {
    document.getElementById(`box${follow[i]}`).style.borderColor=`rgba(255, 255, 255, 0.384)`;
    }
}


function check_line() {
  for (let i=0;i<colomns*(lines-1)+1;i+=colomns) {
    let line=true;
    for(let j=0;j<colomns;j++) {
      if(document.getElementById(`box${j+i}`).style.backgroundColor==='black') {
         line=false;
      }
    }
    if (line) {
       deletline(i);
       movedown(i);
    }
  } 
}

function delay(time) {
  return new Promise(resolve => setTimeout(resolve,time));
}

async function deletline(n) {
  for (let i=n;i<n+colomns;i++) {
    document.getElementById(`box${i}`).style.backgroundColor='black';
  }
  await delay(750);
}

function movedown(n) {
  for (let i=n-1;i>-1;i--) {
    if(document.getElementById(`box${i}`).style.backgroundColor!=='black') {
      document.getElementById(`box${i}`).style.backgroundColor='black';
      document.getElementById(`box${i+colomns}`).style.backgroundColor='#FFD700'
    }
  }
}

function lost() {
  
}

function score() {
   
}

//shapes add