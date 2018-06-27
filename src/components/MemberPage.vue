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