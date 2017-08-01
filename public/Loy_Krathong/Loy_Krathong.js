$(document).ready(()=>{ // jQuery main
    
	let stage = new createjs.Stage(canvas);
	let repo = new createjs.LoadQueue();
	let scoreField = new createjs.Text("0", "bold 30px Arial", "#000000");
		   
	function setup() {
		
		// automatically update
		createjs.Ticker.on("tick", e => stage.update());
		createjs.Ticker.setFPS(60);	
		
		//loading img
		repo.loadManifest([ {id:'wave',src:"img/waveA-02.png"},
							{id:'hand',src:"img/lighter-01.png"},
							{id:'light',src:"img/lantern.png"},
							{id:'lantern',src:"img/boat1D-01.png"},
							{id:'lanternLight',src:"img/boat1L-01.png"},
							{id:'lantern2',src:"img/boat2D-01.png"},
							{id:'lanternLight2',src:"img/boat2L-01.png"},
							{id:'background',src:"img/background-05.png"},
							{id:'elephantN',src:"img/elephantN-01.png"},
							{id:'elephantS',src:"img/elephantS-01.png"},
							{id:'elephantW',src:"img/elephantW-01.png"}
			]);


		repo.on('complete', draw);
		
	}
	
function draw(){
		//背景
		let background = new createjs.Bitmap(repo.getResult('background'));
		stage.addChild(background);
		background.scaleX =background.scaleY = background.scale = 0.25;
	
		//分數
		stage.addChild(scoreField);
		scoreField.textAlign = "right";
		scoreField.x = canvas.width - 50;
		scoreField.y = 20;
		
		//手
		let hand = new createjs.Bitmap(repo.getResult('hand'));
		stage.addChild(hand);
		hand.scaleX =hand.scaleY = hand.scale = 0.3;
		hand.on('tick',e=>{
			hand.x=stage.mouseX-30;
			hand.y=stage.mouseY-45;
		});
		
		//大象 --設置成function 當點亮水燈後隨機出現
		function randomEnemy(){
		let elephantN = new createjs.Bitmap(repo.getResult('elephantN'));
		stage.addChild(elephantN);
		elephantN.scaleX = elephantN.scaleY = elephantN.scale = 0.25;
	    elephantN.x= Math.floor((Math.random() * 900) + 100);
	    elephantN.y= Math.floor((Math.random() * 450) + 100);
	    let randomTime = Math.floor((Math.random() * 5000) + 3000);
	    
	    let wave= new createjs.Bitmap(repo.getResult('wave'));
		let elephantW= new createjs.Bitmap(repo.getResult('elephantW'));
		
	    createjs.Tween.get(elephantN,{loop:false})    			  
	    			  .to({y:elephantN.y-100})
	    			  .call(()=>{
	    	//遮擋的海浪
	    	stage.addChild(wave);
	    	wave.scaleX = 0.3
	    	wave.scaleY = wave.scale = 0.1;
			wave.x = elephantN.x-300;
			wave.y = elephantN.y;
			
			//噴水大象
			stage.addChild(elephantW);
			elephantW.scaleX = elephantW.scaleY = elephantW.scale = 0.25;
			elephantW.x=elephantN.x;
			elephantW.y=elephantN.y;
			stage.removeChild(elephantN);
			
			//扣分：每秒扣10分
			scoreField.text = (Number(scoreField.text) - 10*Math.floor(randomTime/1000)).toString();	
			
	      }).wait(randomTime)
	        .call(()=>{stage.removeChild(wave);
	               stage.removeChild(elephantW);});
		}
		
		//產生水燈1
		for (let i = 0; i < 30; i++) {
			let v=randomFloor(7000,9000);
			let lantern = new createjs.Bitmap(repo.getResult('lantern'));
			stage.addChild(lantern);
			lantern.x = canvas.width * Math.random();
			lantern.y = randomFloor(600,2000);
			lantern.scaleX = lantern.scaleY = lantern.scale = 0.1;
			
			//暗的燈往上升
			createjs.Tween.get(lantern,{loop:true}).to({y:10},v).call(()=>{
				
				//偵測有沒有被click，click到：
				lantern.on('click', e=>{
					console.log('yeahhhhhhh');
					
					//有click，加分數
					scoreField.text = (Number(scoreField.text) + 10).toString();
					
					//從暗變亮：lantern要換成lanternLight
					let lanternLight = new createjs.Bitmap(repo.getResult('lanternLight'));
					lanternLight.x=lantern.x;
					lanternLight.y=lantern.y;
					lanternLight.scaleX = lanternLight.scaleY = lanternLight.scale = 0.1;
					stage.addChild(lanternLight);
					stage.removeChild(lantern);
					
					//亮的水燈往上升，到頂部變成天燈：
					createjs.Tween.get(lanternLight,{loop:true})
					              .to({y:100},v)
					              .call(()=>{					
						let light = new createjs.Bitmap(repo.getResult('light'));
						light.scaleX = light.scaleY = light.scale = 0.3;
						light.x=lanternLight.x;
						light.y=100-Math.floor((Math.random() * 100) + 1);
						stage.addChild(light);
						stage.removeChild(lanternLight);	
				 }).wait(1000) //可用.wait（1000）秒測試有無大象出現
			        .call(randomEnemy());	
				});			
			});		
					
		}
		stage.update();
		
	}
	
	//random
	function randomFloor(min,max) {
		return Math.floor(Math.random()*(max-min+1)+min);
		}
	
	
	setup();
	draw();
	
	
});