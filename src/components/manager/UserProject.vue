<template>
    <div>
        <div>
            <Row type="flex" justify="center">

                <Col span="11">

                    <Timeline align="left" class="timeline"  pending="true">
                        <Timeline-item  v-for="(news, index) of latestnews">
                            <!-- <Table :data="tabledata"></Table> -->
                            
                            <!-- <p class="time">{{news.name}}</p> -->
                            <Row type="flex" style="margin-bottom:10px;">
                                <Col span="18">
                                    <!-- <div class="border"> -->
                                    <p > {{news.name}}
                                    </p> 
                                <!-- </div> -->
                                </Col>
                                <Col span="3">
                                    <Button @click="editit(index, news)" size="small" type="success">编辑</Button>
                                </Col>
                                <Col span="3">
                                    <Poptip
                                        confirm
                                        title="确定要删除吗？"
                                        @on-ok="deleteit(index, news)"
                                        @on-cancel="cancel">
                                        <Button size="small" type="error">删除</Button>
                                    </Poptip>
                                </Col>
                            </Row>
                            <!-- <hr /> -->
                        </Timeline-item>
                    </Timeline>
                        <Row type="flex" justify="center" style="margin-bottom:10px;">
                                <Col span="8">
                                    <Button @click="newModal = true" type="info" style="width:150px">新建项目</Button>
                                </Col>
                        </Row>
                    <Modal
                        v-model="noticeModal"
                        title="更改名称"
                        width="350"
                        @on-cancel="cancel"
                        @on-ok="updatepro(notice.id)">
                        <Input v-model="notice.name" style="width: 300px" placeholder="请输入"></Input>
                    </Modal>
                    <Modal
                        v-model="newModal"
                        title="新建"
                        width="350"
                        @on-cancel="cancel"
                        @on-ok="newone()">
                        <Input v-model="newoned.name" style="width: 300px" placeholder="课题名称"></Input>
                        <!-- <Input v-model="newone.name" style="width: 300px" placeholder="课题简介"></Input> -->
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
                pagetotal:0,
                newModal: false,
                updated: {
                    id: null,
                    update_info: {
                        name:""
                    }
                },
                newoned: {
                    name: "",
                    info: ""
                },
                notice: {
                    title: null,
                    content:  "<h5>加载中...</h5>",
                },  
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
            this.$request({
                method: 'get',
                url: '/api/project',
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
            newone() {
                this.$request({
                method: 'post',
                url: '/api/project',
                data: this.newoned,
              }).then((response) => {
                    if(response.data.state == 1) {
                        this.$Message.success('操作成功!');
                    }
                    else { 
                        this.$Message.error('操作失败!'); 
                    }
                    this.$request({
                    method: 'get',
                    url: '/api/project',
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
              })
            },
            editit(index, news) {
                this.noticeModal = true;
                this.notice = news;
            },
            updatepro(id) {
                this.updated.id = id;
                this.updated.update_info.name = this.notice.name;
                this.$request({
                method: 'put',
                url: '/api/project',
                data: this.updated
              }).then((response) => {
                this.$request({
                method: 'get',
                url: '/api/project',
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
              })
            },
            deleteit(index, news) {
                // this.latestnews.
                // console.log(index);
                this.latestnews.splice(index,1);
                this.$request({
                    method: 'delete',
                    url: '/api/project?id='+news.id,
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
        margin-top: 80px;
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