var dir=0;
var incr=10;
var tailsx=[Math.floor(Math.random()*window.innerWidth/incr)*incr];
var tailsy=[Math.floor(Math.random()*window.innerHeight/incr)*incr];
var pointx=Math.floor(Math.random()*window.innerWidth/incr)*incr;
var pointy=Math.floor(Math.random()*window.innerHeight/incr)*incr;
var numtails=1;
var pendir=0;
var imm=false;
var inf=false;
var ran=false;

function appendTails(num=1){
	for(var l=0;l<num;l++){
		var d=document.createElement("div");
		d.className="tail";
		document.body.appendChild(d);
		tailsx.push(l*-1-10);
		tailsy.push(l*-1-10);
		numtails++;
	}
	num>1? console.log("Tails appended successfully") : console.log("Tail appended successfully")
}

function move(){
	if(inf){
		appendTails(1);
	}
	// process input
	dir=pendir;
	switch(dir){
		case 0:
			tailsx[0]-=incr;
			break;
		case 1:
			tailsy[0]-=incr;
			break;
		case 2:
			tailsx[0]+=incr;
			break;
		case 3:
			tailsy[0]+=incr;
			break;
	}
	// trim
	if(tailsx[0]>Math.floor(Math.random()*window.innerWidth/incr)*incr-incr){
		tailsx[0]=0;
	}
	if(tailsx[0]<0){
		tailsx[0]=Math.floor(Math.random()*window.innerWidth/incr)*incr-incr;
	}
	if(tailsy[0]>Math.floor(Math.random()*window.innerHeight/incr)*incr-incr){
		tailsy[0]=0;
	}
	if(tailsy[0]<0){
		tailsy[0]=Math.floor(Math.random()*window.innerHeight/incr)*incr-incr;
	}
	// logic
	if(tailsx[0]===pointx&&tailsy[0]===pointy){
		appendTails();
		console.log("Yummy!");
		randpos();
	}
	for(var j=numtails;j>0;j--){
		tailsx[j]=tailsx[j-1];
		tailsy[j]=tailsy[j-1];
	}
	// lose
	if(!imm){
		for(var m=2;m<numtails;m++){
			if(tailsx[m]===tailsx[1] && tailsy[m]===tailsy[1]){
				clearInterval(start);
				document.removeEventListener("keydown",getKey);
				console.log("You Lose!");
				console.log("Score: "+(document.getElementsByClassName("tail").length-1));
				setTimeout(function(){location.reload(false);},1000);
			}
		}
	}
	// display
	for(var i=0; i<numtails; i++){
		document.getElementsByClassName("tail")[i].style.left=tailsx[i+1]+"px";
		document.getElementsByClassName("tail")[i].style.top=tailsy[i+1]+"px";
	}
	document.getElementById("point").style.top=pointy+"px";
	document.getElementById("point").style.left=pointx+"px";
}

function tp(x=tailsx[0],y=tailsy[0]){
	tailsx[0]=x;
	tailsy[0]=y;
}

function randpos(){
	var ok;
	while(ok!==0){
		ok=0;
		pointx=Math.floor(Math.random()*(window.innerWidth-incr)/incr)*incr;
		pointy=Math.floor(Math.random()*(window.innerHeight-incr)/incr)*incr;
		for(var m=0;m<numtails;m++){
			if(tailsx[m]===pointx && tailsy[m]===pointy){
				ok++;
			}
		}
		for(var n=0;n<numwalls;n++){
			if(pointx===wallsx[n] && pointy===wallsy[n]){
				ok++;
			}
		}
	}
}

function getKey(event){
	switch (event.keyCode){
		case 37:
			if(dir!==2&&dir!==0){
				pendir=0;
				console.log("Left");
			}
			break;
		case 38:
			if(dir!==3&&dir!==1){
				pendir=1;
				console.log("Up");
			}
			break;
		case 39:
			if(dir!==0&&dir!==2){
				pendir=2;
				console.log("Right");
			}
			break;
		case 40:
			if(dir!==1&&dir!==3){
				pendir=3;
				console.log("Down");
			}
			break;
		case 65:
			if(!imm){
				console.log("Immortal");
				imm=true;
			}else{
				console.log("Mortal");
				imm=false;
			}
			break;
		case 73:
			if(!inf){
				console.log("Tron mode!");
				inf=true;
			}else{
				console.log("Snake mode!");
				inf=false;
			}
			break;
		case 82:
			if(!ran){
				console.log("AI random");
				ran=true;
			}else{
				console.log("Manual");
				ran=false;
			}
			break;
	}
}

document.addEventListener("keydown", getKey);

// loadWalls(lvl1);
appendTails(10);

var start=setInterval(move,incr*7);
