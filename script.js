var v=[''];
var op=[''];
var flag = 1;
var opactive = 0;
var vindex = 0;
var oindex = 0;
var numbers = document.querySelectorAll('.num');
var operators = document.querySelectorAll('.opr');
var eq = document.querySelector('.eq');
var clear = document.querySelector('.clear');
var resbox = document.querySelector('.res');

function storeVal(e){
	if(flag == 1){
		resbox.textContent = '';
		flag = 0;
	}
	if(opactive === 1){
		v[vindex] = e.target.textContent;
		resbox.textContent = v[vindex];
		vindex++;
	}
	else{
		v[vindex] += e.target.textContent;
		resbox.textContent += v[vindex];
	}
}

function addop(e){
	if(flag == 1){
		resbox.textContent = '';
		flag = 0;
	}
	if(opactive === 0){
		op[oindex] = e.target.textContent;
		resbox.textContent += op[oindex];
		oindex++;
		opactive = 1;
	}
	else{
		op[oindex] = e.target.textContent;
		resbox.textContent = resbox.textContent.slice(0, -1) + op[oindex];

	}
}

function factorial(n){
	res = 1;
	while(n != 1){
		res *= n;
		n--;
	}

	return res;
}

function evaluate(e){
	let res = 0, f = 1;
	for(let i = 0; i < vindex/2; i++){
	if(f == 1)
			break;
	if(v2 === ''){
		if(op === '+')
			res = v1;
		else if(op === '-')
			res = '-'+v1;
		else if(op === '!')
			res = factorial(Number(v1));
		else{
			res = "Error";
			f = 1;
		}
	}
	else{
		switch(op){
			case '+': res = Number(v1)+Number(v2);break;
			case '-': res = Number(v1)-Number(v2);break;
			case '*': res = Number(v1)*Number(v2);break;
			case '/': 
				if(v2 !== '0')
					res = Number(v1)/Number(v2);
				else{
					res = 'Error';
					f = 1;
				}
				break;
			case '!':
				res = 'Error';
				flag = 1;
		}
	}
	}
	res = res+'';
	resbox.textContent = res;
	flag = 1;
}

function clearVals(){
	v1 = [''];
	op = [''];
	vindex = 0;
	oindex = 0;
}

function clearAll(e){
	resbox.textContent = '';
	clearVals();
}

numbers.forEach((number) => number.addEventListener(
	'click', storeVal));
operators.forEach((operator) => operator.addEventListener(
	'click', addop));
eq.addEventListener('click', evaluate);
clear.addEventListener('click', clearAll);