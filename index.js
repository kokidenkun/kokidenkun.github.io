// import spells from "./spells.json" assert {type: "json"};

spells = {
	"spells": [
		{ "id": 1,  "name": "ギラ", "rate": 250, "practicate": true},
		{ "id": 2,  "name": "ベギラマ", "rate": 270, "practicate": true},
		{ "id": 3,  "name": "イオ", "rate": 252, "practicate": true},
		{ "id": 4,  "name": "イオナズン", "rate": 269, "practicate": true},
		{ "id": 5,  "name": "ラリホー", "rate": 232, "practicate": true},
		{ "id": 6,  "name": "かえん斬り", "rate": 247, "practicate": true},
		{ "id": 7,  "name": "マヒャド斬り", "rate": 265, "practicate": true},
		{ "id": 8,  "name": "メタル斬り", "rate": 113, "practicate": true},
		{ "id": 9,  "name": "まじん斬り", "rate": 251, "practicate": true},
		{ "id": 10, "name": "ザキ", "rate": 140, "practicate": true},
		{ "id": 11, "name": "ザラキ", "rate": 170, "practicate": true},
		{ "id": 12, "name": "マダンテ", "rate": 84, "practicate": true},
		{ "id": 13, "name": "メガンテ", "rate": 85, "practicate": true},
		{ "id": 14, "name": "ためる", "rate": 234, "practicate": true},
		{ "id": 15, "name": "バイキルト", "rate": 231, "practicate": true},
		{ "id": 16, "name": "ピオリム", "rate": 219, "practicate": true},
		{ "id": 17, "name": "アストロン", "rate": 83, "practicate": true},
		{ "id": 18, "name": "マホカンタ", "rate": 240, "practicate": true},
		{ "id": 19, "name": "ホイミ", "rate": 94, "practicate": true},
		{ "id": 20, "name": "ルーラ", "rate": 206, "practicate": true},
		{ "id": 21, "name": "パルプンテ", "rate": 55, "practicate": true}
	]
}
//console.log(spells.spells.length);

class Spell {
	constructor(id, name, rate, practicate) {
		this.id = id;
		this.name = name;
		this.rate = rate;
		this.practicate = practicate;
	}
}

var SpellList = [];
var CommandList = [];
var AnswerList = [];

function lottery(){
	console.log("lottery start");
	SpellList = [];
	CommandList = [];
	AnswerList = [];

	for (let i = 0; i < spells.spells.length; i++) {
		var spell = new Spell(spells.spells[i].id, spells.spells[i].name, spells.spells[i].rate, spells.spells[i].practicate);
		SpellList.push(spell);
	}

	let command_counter = 0;
	
	while (command_counter < 4) {
		var max_rate = 0;
		for (let i = 0; i < SpellList.length; i++) {
			if (SpellList[i].practicate) {
				max_rate += SpellList[i].rate;
			}
		}
		//console.log(max_rate);
		
		// 乱数を出す
		let rand_num = getRandomInt(max_rate);
		//console.log(rand_num);
		let rate_range = 1;

		// 乱数で当選する呪文を確認
		for (let i = 0; i< SpellList.length; i++) {
			if (SpellList[i].practicate) {
				var rate_range_before = rate_range;
				rate_range += SpellList[i].rate;
				//console.log(rate_range_before, " <= ", rand_num, "< ", rate_range)
				// 乱数を元に呪文を確定する
				if(rate_range_before <= rand_num && rand_num < rate_range) {
					console.log(SpellList[i].name);
					CommandList.push(SpellList[i]);

					switch(SpellList[i]) {
						case SpellList[0]:
						case SpellList[1]:
							console.log("group sizz is unavailable.");
							SpellList[0].practicate = false;
							SpellList[1].practicate = false;
							break;
							//console.log(SpellList[0].name, SpellList[1].name);
						case SpellList[2]:
						case SpellList[3]:
							console.log("group bang is unavailable.");
							SpellList[2].practicate = false;
							SpellList[3].practicate = false;
							break;
							//console.log(SpellList[2].name, SpellList[3].name);
						case SpellList[9]:
						case SpellList[10]:
							console.log("group whack is unavailable.");
							SpellList[9].practicate = false;
							SpellList[10].practicate = false;
							break;
							//console.log(SpellList[11].name, SpellList[12].name);
						// 当選した呪文を選択不可にする
						default:
							SpellList[i].practicate = false;
					}
				}
			}
		}
		command_counter += 1;
	}
	//console.log(CommandList);
	return CommandList;
}

window.onload = function(){
	var StartLotButton = document.getElementById("start-lot-button");
	var CommandInterval = document.getElementById("interval");

	//var ShowOnlyInitial = document.getElementById("show-only-initial");

	var spell1 = document.getElementById("spell1");
	var spell2 = document.getElementById("spell2");
	var spell3 = document.getElementById("spell3");
	var spell4 = document.getElementById("spell4");	
	
	StartLotButton.addEventListener('click', function(){
		var result_command_list = lottery();
		AnswerList = result_command_list;
		updateCommandList(result_command_list);
		setTimeout(() => {hideCommandList()}, parseFloat(CommandInterval.value) * 1000);
		
	});

	var ShowResultButton = document.getElementById("show-result-button");

	ShowResultButton.addEventListener("click", function() {
		updateAnswerList(AnswerList);
	})
}

function updateCommandList(cl) {
	// var spell1 = document.getElementById("spell1");
	// var spell2 = document.getElementById("spell2");
	// var spell3 = document.getElementById("spell3");
	// var spell4 = document.getElementById("spell4");	
	var ShowOnlyInitial = document.getElementById("show-only-initial");
	console.log(Boolean(ShowOnlyInitial.checked));

	if (ShowOnlyInitial.checked) {
		spell1.textContent = cl[0].name.charAt(0) + "-----";
		spell2.textContent = cl[1].name.charAt(0) + "-----";
		spell3.textContent = cl[2].name.charAt(0) + "-----";
		spell4.textContent = cl[3].name.charAt(0) + "-----";
	} else {
		spell1.textContent = cl[0].name;
		spell2.textContent = cl[1].name;
		spell3.textContent = cl[2].name;
		spell4.textContent = cl[3].name;
	}
}

function hideCommandList() {
	console.log("hide");
	//setTimeout(() => {console.log("Interval Start")}, parseFloat(CommandInterval.value) * 1000);
	spell1.textContent = "-----";
	spell2.textContent = "-----";
	spell3.textContent = "-----";
	spell4.textContent = "-----";
}

function updateAnswerList(al) {
	var answer1 = document.getElementById("result1");
	var answer2 = document.getElementById("result2");
	var answer3 = document.getElementById("result3");
	var answer4 = document.getElementById("result4");

	answer1.textContent = al[0].name;
	answer2.textContent = al[1].name;
	answer3.textContent = al[2].name;
	answer4.textContent = al[3].name;
}

function getRandomInt(max) {
	return Math.floor(Math.random() * max) + 1;
}
