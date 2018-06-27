<template>

<div >
    


     <Row type="flex" justify="center" class="nselect">
        <!-- 最新资讯 -->
        <Row>
            <img src="../assets/B3.jpg" width="100%">
        </Row>
        <Col span="12" style="">

        <Row type="flex" justify="center" class="nselect" style="margin-top:50px;">
        <Col span="24" style="">
                <Row type="flex"   justify="start"  style="background-color:#fff"  >
                 <Col   span="2" >
                        <icon name="new" style="padding-top:10px;margin-right:5px;" scale="6"></icon>
                        
                    </Col>
                    <Col   span="20" >
                        <p class="tabTitle" >最新资讯</p>
                    </Col>

                </Row>
                    <hr width=100% size=3 color=#e9eaec style="FILTER: alpha(opacity=100,finishopacity=0,style=3); margin-bottom:20px;margin-top:0px;"> 
            </Col>
        </Row>



        <Row type="flex" justify="center">
            <div v-for="news in latestnews" :key="news.id" style="margin-top:20px;">
                <Card style="width:760px;" :padding="0">
                    <div style="">
                    <Row type="flex"  justify="start" align="middle" style=""  >
                    <Col span="6">
     <!--                    <Row type="flex" justify="center" align="middle" class="code-row-bg"> -->
                            <Col span="24">
                            <div > 
                            <h2 v-if="news.date != null" style="text-align:center;">{{news.date.substr(0, 4)}}</h2>
                            <h1 v-if="news.date != null" style="font-size:40px; text-align:center;">{{news.date.substr(5, 10)}}</h1>
                            </div>
                            </Col>

                        <!-- </Row> -->
                        
                        <!-- <div class="img_wrapper" style="width:100%;height:100%;max-height:111.6px;border-radius:4px 0px 0px 4px;">                     
                            <div v-if="news.pic">
                                <img :src="news.pic"  class="img_scale" style="width:100%;height:100%;min-height:112px;">
                            </div>
                            <div v-else >
                                <avatar :username="news.title"
                                :height="180"
                                :initials="news.date.substr(5, 10)"
                                :width="180"
                                :rounded="false"
                                class="img_scale nopic"
                                color="#fff"></avatar>
                            </div>
                        </div> -->
                        
                    </Col>
                    <Col span="18">
                        <div class="newsTitle">
                            
                            <a @click="enterDetails(news.id)">{{news.title}}</a>
                        </div>
                        
                        <p style="margin:10px 20px 10px 10px;font-size:15px;color:#888">{{news.intro}}</p>

                        <Row type="flex"  justify="start"  style=""  >
                            <Col span="10" align="left">
                                
                            </Col>
                            <Col span="12" align="right">
                                <p style="margin:10px 0px 10px 10px;font-size:12px;color:#999">{{news.author}}</p>
                             <!--    <p style="margin:10px 20px 10px 10px;font-size:12px;color:#999"><Icon type="pricetags"></Icon> {{news.project}}</p> -->
                            </Col>
<!--                             <Col span="4" align="right">
                                
                                <p style="margin:10px 20px 10px 10px;font-size:12px;color:#999"><Icon type="eye"></Icon> {{news.view}}</p>
                            </Col> -->
                        </Row>
                    </Col>          
                    </Row>
                  </div>
                </Card>

            </div>
            

            </Row>
<!--             <infinite-loading :on-infinite="onInfinite" ref="infiniteLoading"></infinite-loading> -->
        </Col>

        <!-- 通知公告 -->
        <Col span="6" class="nselect"  style="margin-left:20px;margin-top:72px;">
            <Affix  :offset-top="20">
            <Card >
            <Row type="flex" justify="start"  align="bottom">
                <Col span="22">  <p style="font-size:20px;font-family:'华文宋体';"> 通知公告</p>
                     
                </Col>

                <Col span="2">

                </Col>

            </Row>
            <hr width=100% size=3 color=#eeeeee style="FILTER: alpha(opacity=100,finishopacity=0,style=3); margin-bottom:20px;"> 
                <div style="margin-top:8px; margin-left:10px;" v-for="notice of notices" :key="notice.id" >
                    <Row >
                        <Col span="20"  align="left">
                            <div  style="width:280px;overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">
                                <a class="content"  @click="onNotice(notice.id)"> <Icon type="arrow-right-b"></Icon>   &nbsp;&nbsp;{{notice.title}}</a> 
                            </div>

                        </Col>

                        <Col span="4">
                            
                                 <div>
                              <a v-if="notice.date != null" style="font-size:13px;"   >{{notice.date.substr(5, 10)}}</a>
                              <!--  用 if 判断  -->
                            </div>
                        </Col>
                    </Row>
                    
                   
                </div>

            </Card>
            <Modal
                v-model="noticeModal"
                title=""
                width="800"
                @on-cancel="cancel"
                @on-ok="cancel"
                >
                <div>
                <h1 align="center" style="margin:20px 0px 10px 0px;">{{notice.title}}</h1>
                <p align="center" style="margin-bottom:40px; font-size:18px;"> {{notice.date}} &nbsp;&nbsp; {{notice.author}} </p>
                <div v-html="notice.content"></div>
                </div>
            </Modal>
            </Affix>
        </Col>
    </Row>

</div>


</template>

<script>
    import Avatar from 'vue-avatar'
    import InfiniteLoading from 'vue-infinite-loading';
    export default {
        data () {
            return {
                logoTitle: "NETSAFE", 
                userinfo: {
                    id:0,
                    name:"null",
                    user_level:0,
                },
                noticeModal: false,
                item:1,
                newsArray: null,
                latestnews:[],
                notices:[],
                notice: {
                    title: "",
                    date: "",
                    author: "",
                    content:  "<h1 align='center'>加载中...</h1><Br /><Br /><Br /><Br /><Br />",
                },       
            }
        },
        components: {
            Avatar,
            InfiniteLoading
        },
        beforeCreate() {
            this.$request({
                method: 'get',
                url:  '/api/news?role=2&project=[0]&isnews=1',
                // url: '/api/news?role=2&project=[0]&isnews=1',
                data: {}
              }).then((response) => {
                // let resp = JSON.parse(response.data);
                // console.log(response.data.info[0]);
                this.latestnews=response.data.info[0];
                this.newsArray=response.data.info;
              })
            this.$request({
                method: 'get',
                url: '/api/news?role=2&project=[0]&isnews=0',
                data: {}
              }).then((response) => {
                // let resp = JSON.parse(response.data);
                // console.log(response.data.info[0]);
                this.notices=response.data.info[0].slice(0,6);
              })
        },
        mounted() {
            // this.userinfo = this.$ls.get('userinfo');
            // console.log(this.userinfo);
            // this.$store.dispatch({
            //       type: 'SET_USER_INFO',
            //       username: this.userinfo.name,
            //       token: this.userinfo.passwd
            // });
            // this.$store.dispatch({
            //     type: 'SET_USER_ID',
            //     user_id: this.userinfo.id
            // });
            
        },
        methods: {
            cancel() {
                this.notice.title = "",
                this.notice.author = "",
                this.notice.date = "",
                this.notice.content = "<h1 align='center'>加载中...</h1><Br /><Br /><Br /><Br /><Br />"
            },
            onNotice(id) {
                this.noticeModal = true;
                this.$request({
                method: 'patch',
                url: '/api/news?id='+id,
                data: {}
              }).then((response) => {
                // let resp = JSON.parse(response.data);
                // console.log(response.data.info[0]);
                this.notice = response.data.info[0][0];
              })
                // this.$Message.info(id+'');
            },
            mouseOver:function(ID){
                var oDiv = document.getElementById(ID);
                oDiv.style.height = oDiv.offsetHeight-10+'px';
                alert(oDiv.style.height);
            },
            
            mouseOut:function(ID){
                
            },
            enterDetails() {
                var argu = arguments[0];
                var flag = 0;
                // for(var item in this.newsArray){
                //     console.log(item);
                    for(var item2 in this.latestnews){
                        // console.log(item2);
                        if (this.latestnews[item2].id == argu) {
                            var project = this.latestnews[item2].project;
                            // console.log(pro);
                            flag = 1;
                            break;
                        }
                    // }
                    // if(flag == 1) break;
                }
                this.$router.push('/newsdetail?i='+argu+'&pro='+project);
            },
            onInfinite() {
                setTimeout(() => {
                    // const temp = [];
                    if (this.newsArray[this.item] != null) {
                        // temp.push(this.newsArray[this.item]);
                        this.latestnews = this.latestnews.concat(this.newsArray[this.item]);
                        this.item += 1;
                        this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
                    }
                }, 1000);
            },
        }

    }
</script>

<style scoped>

    .layout{
        background: #ffffff;
    }

    .timeline{
        margin-top: 20px;
        /*margin-left: 75px;*/
        margin-bottom: 10px;
    }

    a{
        color: #0F0F0F;
    }

    hr{
        margin-top: 10px;
    }
    .tabTitle {
        font-size: 30px;
        margin: 10px;
        color: #666;
        margin-bottom:15px;
        font-family:'华文宋体';
    }

    .layout-content{
        min-height: 700px;
        height: auto;
        margin-bottom: 30px;
        margin-top:10px;
        background: white;
    }
    .layout-content-main{
        padding: 10px;
    }
    .layout-copy{
        position: relative;
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
    }
    .home_display {
        margin-left:75px;
        margin-right: 75px; 
    }


    .vertical{
        display: flex;
        justify-content: center;
        align-items:center;
        display:-webkit-flex;
    }
    .content {
        font-size: 13px;
    }
    .content:hover {
        color: #2d8cf0
    }

    .img_scale {

        transition:all 1s ease-in-out;
        filter: brightness(1);
    } 
    .img_scale:hover {
        -webkit-transform:scale(1.1,1.1);
        -moz-transform:scale(1.1,1.1);
        -transform:scale(1.1,1.1);
        transition:all 1s ease-in-out;
        filter: brightness(0.8);

    }
    .img_wrapper {
         overflow: hidden; 
    }


    .newsTitle {
        margin:10px;
        font-size:25px;
        font-weight:bolder;
        font-family:'宋体';
        transition:all .2s ease-in-out;
    }

    .newsTitle:hover a {
        color: #2d8cf0;
        transition:all .3s ease-in-out;

    }
      .nselect {
        -moz-user-select: none;
        -khtml-user-select: none;
        user-select: none;
      }

    .nopic {
        filter: blur(1px) brightness(0.6);

    }
    .nopic:hover {
        filter: blur(1px) brightness(0.6);

    }

</style>