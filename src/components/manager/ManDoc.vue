<template>
    <div>
        <div>
            <Row type="flex" justify="center">

                <Col span="11">

                    <Timeline align="left" class="timeline"  pending="true">
                        <Timeline-item v-for="(news, index) of latestnews">
                            <!-- <Table :data="tabledata"></Table> -->
                            
                            <p class="time">{{news.date}}</p>
                            <Row type="flex">
                                <Col span="19">
                                    <!-- <div class="border"> -->
                                    <a class="content" href="#" onclick="return false" @click="onNotice(news)">{{news.title}}
                                    </a> 
                                <!-- </div> -->
                                </Col>
                                <Col span="1">

                                </Col>
                                <Col span="4">
                                    <Poptip
                                        confirm
                                        title="确定要删除吗？"
                                        @on-ok="deleteit(index, news.id)"
                                        @on-cancel="cancel">
                                        <Button size="small" type="error">删除</Button>
                                    </Poptip>
                                </Col>
                            </Row>
                            <!-- <hr /> -->
                        </Timeline-item>
                    </Timeline>
                    <Modal
                        v-model="noticeModal"
                        title=""
                        width="800"
                        @on-cancel="cancel"
                        @on-ok="cancel">
<!--                         <div align="center">
                        <h1 align="center" style="margin-bottom:30px">{{notice.title}}</h1>
                        <Table width="550" border :columns="columns2" :data="data3"></Table>
                        </div> -->
                        <div style="">
                            <h1 align="center" style="margin:20px 0px 10px 0px;">{{notice.title}}</h1>
                            <p align="center" style="margin-bottom:40px; font-size:18px;"> {{notice.date}} &nbsp;&nbsp; {{notice.author}} </p>

                            <Row type="flex" justify="center">
                                <Col span="16" >
                                    <Card style="margin:5px 0px;overflow:hidden;" v-for="item2 in JSON.parse(notice.content)">
                                    <div  class="news" > 
                                        <a :href="SRCparse(item2)" download>{{item2}}</a>
                                    </div>
                                    </Card>
                                </Col>
                            </Row>


                            


                        
                </div>
                    </Modal>
                <!-- </Col>
                    <Button type="error">删除</Button>
                <Col span="2"> -->

                </Col>

            </Row>
            <Row type="flex" justify="center">
                            <!-- <Col span="16"> -->
                                <Page v-if='latestnews != "D"' style="margin-top:40px; color:black" :total="pagetotal" @on-change="pagechange" show-elevator></Page>
                            <!-- </Col> -->
            </Row>
        </div>
    </div>
</template>

<script>
    import Avatar from 'vue-avatar'
    export default {
        data () {
            return {
                logoTitle: "HITVEP", 
                userinfo: {
                    id:0,
                    name:"null",
                    user_level:0,
                },
                latestnews:[],
                newsArray:null,
                folder: global.folder,
                pagetotal:0,
                notice: {
                    title: null,
                    content: "[]",
                },  
                folder: global.folder,
                noticeModal: false,
                news:[
                ],
                subjects:[
                    {
                        file: "云计算与未来教育变革.pdf"
                    },                    
                ],
            }
        },
        components: {
            
        },
        beforeCreate() {
            if(this.$ls.get('NetSafeinfo') != null) {
                this.userinfo = this.$ls.get('NetSafeinfo');
                if(this.userinfo.user_id != 0) {


                    this.$request({
                        method: 'get',
                        url: '/api/doc?role=2&project=[0]&isdoc=1',
                        data: {}
                      }).then((response) => {
                        // let resp = JSON.parse(response.data.info[0][0]['content']);
                        // let resp = JSON.parse(response.data.info[0][0]);
                        // console.log(resp[0]);
                        // if(response.data)
                        this.latestnews=response.data.info[0];
                        this.newsArray=response.data.info;
                        this.pagetotal = 10 * this.newsArray.length
                        // this.onInfinite();
                      })
                      
                }
            }
            else{
                this.$router.push("/");
            }

            
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
            SRCparse(filename) {

                var filenamex = this.$CryptoJS.MD5(filename + "").toString();

                var postarray = (filename + "").split(".");
                var postfix = postarray[postarray.length - 1];

                var route = this.folder + filenamex + "." + postfix;
                console.log(route);
                //SRCparse(JSON.parse(image.content)[0])
                return route;
            },
            deleteit(index, id) {
                // this.latestnews.
                console.log(index);
                this.latestnews.splice(index,1);
                this.$request({
                    method: 'delete',
                    url: '/api/doc?id='+id,
                    data: {}
                  }).then((response) => {

                  })
            },
            cancel() {
                // this.notice.title = null,
                // this.notice.content = "<h5>加载中...</h5>"
            },
            onNotice(news) {
                this.noticeModal = true;
                this.notice = news;
                // this.$Message.info(id+'');
            },
            getInto_course:function(){
                this.flag = false;
                this.$router.push('/home/'+this.userinfo.name+"/"+"maincourse");
            },
            mouseOver:function(ID){
                var oDiv = document.getElementById(ID);
                oDiv.style.height = oDiv.offsetHeight-10+'px';
                alert(oDiv.style.height);
            },
            
            mouseOut:function(ID){
                
            },
            pagechange(){
                this.latestnews = this.newsArray[arguments[0]-1];
            },
        }

    }
</script>

<style scoped>
    .time{
        font-size: 14px;
        font-weight: bold;
        /*margin-bottom:  10px;*/
    }
    .content{
        /*margin-bottom:  10px;*/
        /*padding-bottom:  10px;*/
        font-size: 17px;
        padding-left: 20px;
    }

    .timeline{
        margin-top: 50px;
        /*margin-left: 75px;*/
        margin-bottom: 10px;
    }

    a{
        color: #0F0F0F;
    }
    p{
        font-size: 16px;
    }
    hr{
        margin-top: 10px;
    }

    .border {
        border-right-style: inset   
    }
    .tabTitle {
        font-size: 30px;
        margin: 10px;
        color: #00B050;
        margin-bottom:15px;     
    }
    .course_panel {
        /*background:yellow;*/
        width:100%;
        height:400px;
    }
    .course_area{    
        cursor:pointer;
        float:left;
        margin:54px;
        background:blue;
    }
    .course_word{
        font-family:"Microsoft Yahei";
        text-align:left;
        margin-left:10px;
    }
    .course_img {
        position: relative;
        margin: auto;
        overflow: hidden;
        float: left;
    }
    .course_word{
        font-size: 16px;
    }
</style>