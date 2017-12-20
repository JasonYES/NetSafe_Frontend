<template>
    <div>
        <div>
        <Modal
                v-model="noticeModal"
                title=""
                width="800"
                @on-cancel="cancel"
                @on-ok="cancel">
                <div>
                <h1 align="center" style="margin:20px 0px 10px 0px;">{{notice.title}}</h1>
                <p align="center" style="margin-bottom:40px; font-size:18px;"> {{notice.date}} &nbsp;&nbsp; {{notice.author}} </p>
                <div v-html="notice.content"></div>
                </div>
        </Modal>
        </div>


        <Row type="flex" justify="center" class="nselect">
        <Row>
            <img src="../assets/B4.jpg" width="100%">
        </Row>
        <Col span="18" style="">


                <Row type="flex"   justify="start"  style="background-color:#fff" align="bottom" >
                    <Col span="1" >
                        <icon name="news1" style="padding-top:20px;margin-right:5px;" scale="6"></icon>
                        
                    </Col>
                    <Col span="23" >
                        <p class="tabTitle" >通知公告</p>
                    </Col>

                </Row>
                    <hr width=100% size=3 color=#eeeeee style="FILTER: alpha(opacity=100,finishopacity=0,style=3); margin-bottom:20px;margin-top:20px;"> 
            </Col>

        </Row>








        <Row type="flex" justify="center" class="nselect" style="">

        <i-col span="14">
            <div  >
             
                <div style="margin:20px 0px 50px 40px;" >
                

               
                <Row type="flex"  justify="center" style="min-height:65px;margin-bottom:15px"  v-for="notice in latestnews">
                
                    <Card style="width:600px">

                    <Col span="4">
                    <p style="margin-top:4px; font-size:18px; font-weight:bold"> {{notice.date}} </p>
                    </Col>
                    <Col span="1">
                    <p>&nbsp;</p>
                    </Col>

                    <Col span="19">
                    <div style="width:450px; overflow:hidden; text-overflow:ellipsis;">
                    <a @click="onNotice(notice.id)" style="font-size:21px;   white-space:nowrap;"> {{notice.title}} </a>
                    </div>
                    </Col>
                
                    </Card>

                </Row>

                






                    <Row type="flex" justify="center">
                            <!-- <Col span="16"> -->
                                <Page style="margin-top:40px; color:black" :total="pagetotal" @on-change="pagechange" show-elevator></Page>
                            <!-- </Col> -->
                    </Row>

              </div>

          </div>


        </i-col>
        </Row>

    </div>
</template>



<script>
    import Avatar from 'vue-avatar/dist/Avatar'
    import InfiniteLoading from 'vue-infinite-loading'
    export default {
        data () {
            return {
                logoTitle: "HITVEP", 
                showBriefIntro:false,
                resultTitle:"",
                search:"",
                userinfo: {
                    id:0,
                    name:"null",
                    user_level:0,

                },
                item:1,
                noticeModal: false,
                latestnews:[],
                newsArray:null,
                project:[],
                pagetotal:0,
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
            InfiniteLoading,
        },
        beforeCreate() {
            this.$request({
                method: 'get',
                url: '/api/news?role=2&project=[0]&isnews=0',
                data: {}
              }).then((response) => {
                // let resp = JSON.parse(response.data);
                // console.log(response.data.info);
                // if(response.data)
                this.latestnews=response.data.info[0];
                this.newsArray=response.data.info;
                this.pagetotal = 10 * this.newsArray.length
                // this.onInfinite();
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
            catalog() {
                // this.$Message.info('hahah');
                var argu = arguments[0];
                var role = 1;
                if (argu =='all') {role=2}
                this.$request({
                method: 'get',
                url: '/api/news?role='+role+'&project=['+argu+']&isnews=1',
                data: {}
                  }).then((response) => {
                    // let resp = JSON.parse(response.data);
                    console.log(response.data);
                    if(response.data.state == 0){
                        this.latestnews=null;
                        this.newsArray=null;
                        // this.onInfinite();
                    }else{
                        this.latestnews=response.data.info[0]
                        this.newsArray=response.data.info;
                        // this.onInfinite();
                    };
                    // this.newsArray=response.data.info[0];
                  })
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
            pagechange(){
                this.latestnews = this.newsArray[arguments[0]-1];
            },
            searchNews() {

            },
            getNews(){

            },
            showBrief() {
                
            },
            onInfinite() {
                setTimeout(() => {
                    // const temp = [];
                    if (this.newsArray[this.item] != null) {
                        // temp.push(this.newsArray[this.item]);
                        this.latestnews = this.latestnews.concat(this.newsArray[this.item]);
                        this.item += 1;
                    }
                    this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
                }, 1000);
            },
        }

    }
</script>

<style scoped>
    hr{
        margin-top: 10px;
    }
    .tabTitle {
        font-size: 30px;
        color: #666;
        font-family:'华文宋体';
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

    a{
        color: #0F0F0F;
    }
    .newsTitle {
        margin:10px;
        font-size:18px;
        font-weight:bolder;
        font-family:'华文宋体';
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