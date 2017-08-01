$(document).ready(()=>{ // jQuery main
    
	let stage = new createjs.Stage(canvas);
	let repo = new createjs.LoadQueue();
	let scoreField = new createjs.Text("0", "bold 30px Arial", "#000000");
	
	function setup() {
		
		// automatically update
		createjs.Ticker.on("tick", e => stage.update());
		createjs.Ticker.setFPS(60);	
		
		//loading img
		repo.loadManifest([ {id:'onewave',src:"img/onewaveD-02.png"},
							{id:'onewave1',src:"img/onewaveC-02.png"},
							{id:'onewave2',src:"img/onewaveB-02.png"},
							{id:'onewave3',src:"img/onewaveA-02.png"},
							{id:'hand',src:"img/lighter-01.png"},
							{id:'light',src:"img/lantern.png"},
							{id:'lantern',src:"img/boat1D-01.png"},
							{id:'lanternLight',src:"img/boat1L-01.png"},
							{id:'lantern2',src:"img/boat7D-01.png"},
							{id:'lanternLight2',src:"img/boat7L-01.png"},
							{id:'background',src:"img/background-05.png"},
							{id:'elephantN',src:"img/newElephantW-01.png"},
							{id:'elephantS',src:"img/elephantS-01.png"},
							{id:'elephantW',src:"img/newElephantW4-01.png"}
			]);


		repo.on('complete', draw);
		
		
		
	}
	
function draw(){
	
	//------------------生成：我是大象1分割線－－－start－－－－－－－－－－－－－－－－－－－－－－－－－－//
		//象1-固定y位置 便於底層海浪遮罩； 可以再做其他位置的象及遮罩
		let elephantN = new createjs.Bitmap(repo.getResult('elephantN'));
		elephantN.regX = elephantN.image.width/2;
		elephantN.regY = elephantN.image.height/2;
		elephantN.scaleX = elephantN.scaleY = elephantN.scale = 0.2;
	    elephantN.x= randomFloor(-600,-300);
	    //elephantN.y= randomFloor(150,400);
	    elephantN.y= 450;
	    console.log(elephantN.y);
	    //象移動
	    createjs.Tween.get(elephantN,{loop:true}).to({x:1500},randomFloor(30000,40000));
		//象旋轉
	    createjs.Tween.get(elephantN,{loop:true}).to({rotation:20},7000)
		.to({rotation:0},7000)
		.to({rotation:25},7000)
		.to({rotation:0},7000)
		.to({rotation:25},7000)
		.to({rotation:0},7000);
	    
	  //海浪1（底部大象1遮罩）
	    let onewave = new createjs.Bitmap(repo.getResult('onewave'));	
		onewave.scaleX =onewave.scaleY = onewave.scale = 0.24;
		//-----------------生成：我是大象1分割線－－－－－－－－end－－－－－－－－－－－－－－－－－－－－－//
		
		//------------------生成：我是大象2分割線－－－start－－－－－－－－－－－－－－－－－－－－－－－－－－//
		//象2-
		let elephantW = new createjs.Bitmap(repo.getResult('elephantW'));
		elephantW.regX = elephantW.image.width/2;
		elephantW.regY = elephantW.image.height/2;
		elephantW.scaleX = elephantW.scaleY = elephantW.scale = 0.2;
		elephantW.x= randomFloor(1400,1500);
		console.log('startX'+elephantW.x);
	    //elephantN.y= randomFloor(150,400);
		elephantW.y= 280;
	    console.log(elephantW.y);
	    //象移動
	    createjs.Tween.get(elephantW,{loop:true})
	    .call(()=>{ console.log('movingX'+elephantW.x);})
	    			 // .wait(5000)
	    			  .to({x:-100},randomFloor(30000,40000));   
	   
		//象旋轉
	    createjs.Tween.get(elephantW,{loop:true}).to({rotation:20},7000)
		.to({rotation:0},5000)
		.to({rotation:30},5000)
		.to({rotation:0},5000)
		.to({rotation:30},5000)
		.to({rotation:0},5000);
	    
	  //海浪2（中部大象2遮罩）
	    let onewave1 = new createjs.Bitmap(repo.getResult('onewave1'));	
		onewave1.scaleX =onewave1.scaleY = onewave1.scale = 0.24;
		let onewave2 = new createjs.Bitmap(repo.getResult('onewave2'));	
		onewave2.scaleX =onewave2.scaleY = onewave2.scale = 0.24;
		
		//-----------------生成：我是大象2分割線－－－－－－－－end－－－－－－－－－－－－－－－－－－－－－//
		
		//背景
		let background = new createjs.Bitmap(repo.getResult('background'));
		stage.addChild(background);
		background.scaleX =background.scaleY = background.scale = 0.24;
		
		//大象2
		stage.addChild(elephantW);
		stage.addChild(onewave2);
		stage.addChild(onewave1);
		
		//大象1
		stage.addChild(elephantN);
		stage.addChild(onewave);
		
				
		//分數
		stage.addChild(scoreField);
		scoreField.textAlign = "right";
		scoreField.x = canvas.width - 50;
		scoreField.y = 20;
		
		//產生水燈1
		for (let i = 0; i < 25; i++) {
			let v=randomFloor(20000,30000);//30000 40000
			let lantern = new createjs.Bitmap(repo.getResult('lantern2'));
			let lanternLight = new createjs.Bitmap(repo.getResult('lanternLight2'));
			stage.addChild(lanternLight);
			stage.addChild(lantern);
			lanternLight.visible=false;
			lanternLight.x=lantern.x = canvas.width * Math.random();
			lanternLight.y=lantern.y = randomFloor(600,2000);
			lantern.scaleX = lantern.scaleY = lantern.scale = 0.15;
			lanternLight.scaleX = lanternLight.scaleY = lanternLight.scale = 0.15;
			
			//當亮的水燈到頂端時
			createjs.Tween.get(lanternLight,{loop:true}).to({y:90},v).call(()=>{
				lanternLight.x=lantern.x=canvas.width * Math.random();
				lanternLight.y=lantern.y=randomFloor(600,2000);
				lanternLight.visible=false;
				
			});
			
			//當暗的水燈到頂端時
			createjs.Tween.get(lantern,{loop:true}).to({y:90},v).call(()=>{
				lantern.x = canvas.width * Math.random();
				lantern.y = randomFloor(600,3000);
				lantern.visible=true;
				scoreField.text = (Number(scoreField.text) - 10).toString();
			});
			
			//點擊水燈
			lantern.on('click', e=>{
				//console.log("111");
				lantern.visible=false;
				lanternLight.visible=true;
				//加分數
				scoreField.text = (Number(scoreField.text) + 10).toString();
				});
	//------------------滅燈：我是大象1分割線－－－start－－－－－－－－－－－－－－－－－－－－－－－－－－//
			//大象1熄滅燈
			lanternLight.on('tick',e=>{
			if(lanternLight.visible==true){
				if ( lanternLight.x >= elephantN.x-100 && lanternLight.x<=elephantN.x+100 && 
					lanternLight.y >= elephantN.y-100 && lanternLight.y<=elephantN.y+100 ){
				//console.log(elephantN.image.width,elephantN.image.height);
				lanternLight.visible=false;
				lantern.visible=false;

				//扣分
				//scoreField.text = (Number(scoreField.text) - 10).toString();
				}
			}
			});
			
			//大象1使暗的燈消失
			lantern.on('tick',e=>{
			if(lantern.visible==true){
				if ( lantern.x >= elephantN.x-100 && lantern.x<=elephantN.x+100 && 
					lantern.y >= elephantN.y-10 && lantern.y<=elephantN.y+10 ){
				//console.log(elephantN.image.width,elephantN.image.height);
				lantern.visible=false;

				//扣分
				//scoreField.text = (Number(scoreField.text) - 10).toString();
				}
			}
			});
	//------------------滅燈：我是大象1分割線－－－end－－－－－－－－－－－－－－－－－－－－－－－－－－//
			
	//------------------滅燈：我是大象2分割線－－－start－－－－－－－－－－－－－－－－－－－－－－－－－－//
			//大象2熄滅燈
			lanternLight.on('tick',e=>{
			if(lanternLight.visible==true){
				if ( lanternLight.x >= elephantW.x-100 && lanternLight.x<=elephantW.x+100 && 
					lanternLight.y >= elephantW.y-100 && lanternLight.y<=elephantW.y+100 ){
				//console.log(elephantW.image.width,elephantW.image.height);
					
				lanternLight.visible=false;
				lantern.visible=false;

				//扣分
				scoreField.text = (Number(scoreField.text) - 10).toString();
				console.log('elephant2 turnoff:'+scoreField.text);
				}
			}
			});
			
			//大象2使暗的燈消失
			lantern.on('tick',e=>{
			if(lantern.visible==true){
				if ( lantern.x >= elephantW.x-100 && lantern.x<=elephantW.x+100 && 
					lantern.y >= elephantW.y-10 && lantern.y<=elephantW.y+10 ){
				//console.log(elephantN.image.width,elephantN.image.height);
				lantern.visible=false;

				//扣分
				scoreField.text = (Number(scoreField.text) - 10).toString();
				}
			}
			});
	//------------------滅燈：我是大象2分割線－－－end－－－－－－－－－－－－－－－－－－－－－－－－－－//
		
		}
		
		
		//手
		let hand = new createjs.Bitmap(repo.getResult('hand'));
		stage.addChild(hand);
		hand.scaleX =hand.scaleY = hand.scale = 0.3;
		hand.on('tick',e=>{
			hand.x=stage.mouseX-30;
			hand.y=stage.mouseY-50;
		});
		stage.canvas.style.cursor = "none";
		
		
		
		stage.update();
		
	}
	
	//random
	function randomFloor(min,max) {
		return Math.floor(Math.random()*(max-min+1)+min);
		}
	
	
	setup();

	
	
});