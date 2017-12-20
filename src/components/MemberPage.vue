<template>
	<div >


		<Row type="flex" justify="center" class="nselect" >
		<Row>
            <img src="../assets/B8.jpg" width="100%">
        </Row>
			<Col span="18" style="">


				<Row type="flex"   justify="start"  style="background-color:#fff"  >
					<Col   span="1" >
						<icon name="member" style="padding-top:10px;margin-right:5px;" scale="6"></icon>

					</Col>
					<Col   span="23" >
						<p class="tabTitle" >参与单位</p>
					</Col>

				</Row>
				<hr width=100% size=3 color=#e9eaec style="FILTER: alpha(opacity=100,finishopacity=0,style=3); margin-bottom:10px;margin-top:0px;"> 
			</Col>

		</Row>









		<Row type="flex" class="vertical" justify="center" style="margin-top:20px">
			<Col span="4" class="vertical" >
				<img src="../assets/safe.jpg" width='180'>
			</Col>
			<Col span="4" class="vertical">
				<img src="../assets/gkd.jpg" >
			</Col>
			<Col span="4" class="vertical">
				<img src="../assets/LOGO.jpg" style="margin-top:30px" width="170">
			</Col>
			<Col span="4" class="vertical">
				<img src="../assets/中国移动1.jpg">
			</Col>
		</Row>

		<Row type="flex" justify="center" style="margin-top:50px">
			<Col span="4"  class="vertical">
				<img src="../assets/hit.png" >
			</Col>
			<Col span="4" class="vertical">
				<img src="../assets/清华大学.png" style="margin-top:20px">
			</Col>
			<Col span="4" class="vertical">
				<img src="../assets/by.jpg" width="120">
			</Col>
			<Col span="4" class="vertical">
				<img src="../assets/腾讯计算机.png" style="margin-top:30px" width="200">
			</Col>
		</Row>

		<Row type="flex" justify="center" style="margin-top:50px">
		<Col span="4"  class="vertical">
			<img src="../assets/知道创宇.png" style="margin-top:30px">
		</Col>
		<Col span="4" class="vertical">
			<img src="../assets/安天科技.png" style="margin-top:60px" width="170">
		</Col>
		<Col span="4" class="vertical">
			<img src="../assets/hitbj.png" width="170">
		</Col>
		<Col span="4" class="vertical">
			<img src="../assets/公安部一所.jpg" style="margin-top:30px">
		</Col>
	</Row>

	</div>
</template>

<style scoped>
	p {
		font-size: 15px;
		font-weight: bold;
		z-index:-9999;
	}
	     .nselect {
        -moz-user-select: none;
        -khtml-user-select: none;
        user-select: none;
      }
    .tabTitle {
        font-size: 30px;
        margin: 10px;
        color: #666;
        margin-bottom:15px;
        font-family:'华文宋体';
    }
        hr{
        margin-top: 10px;
    }

    .vertical{
        display: flex;
        justify-content: center;
        align-items:center;
        display:-webkit-flex;
    }
</style>