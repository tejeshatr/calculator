//unicode symbols: ÷, ⥢

var olist = ['+', '-', '*', '%', '÷'];
var slist = ['AC', 'CE', '⥢']

var values = document.querySelectorAll('.num');
var operators = document.querySelectorAll('.opr');
var back = document.querySelector('.back');
var clear = document.querySelector('.clear');
var ans = document.querySelector('.ans');
var eq = document.querySelector('.eq');

var resbox = document.querySelector('.res')

var expression = '';
var oflag = 1;
var res = 0;


function stringit(e){
	let t = e.target.textContent;
	if(e.target.classList.contains('opr')){
		if(oflag==1){
			if(expression.length == 0){
				resbox.textContent = 'Not Allowed';
				oflag = 0;
				return;
			}
			else
				expression=expression.slice(0, expression.length-1)+t;
		}
		else{
			oflag = 1;
			expression += t;
		}
	}
	else{
		oflag = 0;
		expression += t;
	}
	resbox.textContent = expression;
}

function giveAns(){
	reset();
	oflag = 1;
	expression = ''+res;
	resbox.textContent = expression;
}

function reset(){
	resbox.textContent = '';
	expression = '';
	oflag = 0;

}

function rmLast(){
	oflag = 0;
	expression = expression.slice(0, length-1);
	resbox.textContent = expression;
}

function dvyd(x,y){
	if(y !== 0)
		return x/y;
	return 'Error! Division by Zero'
}

function expeval(v1, op, v2){
	let r = 0;
	let x = Number(v1);
	let y = Number(v2);
	switch(op){
		case '+': r = x+y; break;
		case '-': r = x-y; break;
		case '*': r = x*y; break;
		case '÷': r = dvyd(x, y); break;
		case '%': r = x%y; break; 
	}
	if(r%1 !== 1)
		r = Number(r.toFixed(5));
	return r;
}

function evaluate(){
	let op = '';
	let v1 = '';
	let v2 = '';

	if(oflag == 1)
		res = 'Error';
	else{
		for(let k = 0; k < expression.length; k++){
			if(olist.includes(expression[k])){
				op = expression[k];
				for(let j = k+1;; j++){
					if(j == expression.length || olist.includes(expression[j]))
						break;
					v2 += expression[j];
				}
				res = expeval(v1, op, v2);
				if(!(Number(res) == res))
					break;
				console.log(v1, v2, op, res);
				op = v1 = v2 = '';
			}
			else
				v1 += expression[k];
		}
	}

	reset();
	oflag = 1;
	expression = ''+res;
	resbox.textContent = expression;
		
}

for(let k = 0; k < values.length; k++)
	values[k].addEventListener('click', stringit);

for(let k = 0; k < operators.length; k++)
	operators[k].addEventListener('click', stringit);


ans.addEventListener('click', giveAns);
clear.addEventListener('click', reset);
back.addEventListener('click', rmLast);
eq.addEventListener('click', evaluate);