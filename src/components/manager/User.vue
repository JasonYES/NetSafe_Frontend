<template>
    <div>
        <div>
            <Row type="flex" justify="center">

                <Col span="11">

                    <Timeline align="left" class="timeline">
                        <Timeline-item  v-for="(news, index) of latestnews">
                            <!-- <Table :data="tabledata"></Table> -->
                            
                            <!-- <p class="time">{{news.name}}</p> -->
                            <Row type="flex" style="margin-bottom:10px;">
                                <Col span="15">
                                    <!-- <div class="border"> -->
                                    <p > {{news.email+"----"+news.name}}
                                    </p> 
                                <!-- </div> -->
                                </Col>
                                <Col span="3">
                                    <Button @click="editit(index, news)" size="small" type="success">编辑</Button>
                                </Col>
                                <Col span="3">
                                    <Button @click="codeit(index, news)" size="small" type="error">密码</Button>
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
                                    <Button @click="newModal = true" type="info" style="width:150px">新建用户</Button>
                                </Col>
                        </Row>
                    <Modal
                        v-model="noticeModal"
                        title="更改信息"
                        width="350"
                        @on-cancel="cancel"
                        @on-ok="updatepro(notice.id)">
                        
                        <Form>                        
                        
                        <FormItem label="用户邮箱" style="margin:10px 0px">
                        <Input v-model="notice.email" style="width: 220px" ></Input>
                        </FormItem >
                        <FormItem label="用户名">
                        <Input v-model="notice.name" style="width: 230px" ></Input>
                        </FormItem>
                        </Form>
<!--                         <div style="margin:10px 0px">
                        <Input v-model="passwordchange" style="width: 300px" placeholder="请输入新密码，如不修改密码则无需填写"></Input>
                        </div> -->
                    </Modal>
                    <Modal
                        v-model="codeModal"
                        title="更改密码"
                        width="350"
                        @on-cancel="cancel"
                        @on-ok="updatecode(notice.id)">
                        
                        <Form>                        
                        
                        <FormItem  label="新密码" style="margin:10px 0px">
                        <Input type="password" v-model="code.code1" style="width: 220px" ></Input>
                        </FormItem >
                        <FormItem  label="再次输入">
                        <Input type="password" v-model="code.code2" style="width: 230px" ></Input>
                        </FormItem>
                        </Form>
<!--                         <div style="margin:10px 0px">
                        <Input v-model="passwordchange" style="width: 300px" placeholder="请输入新密码，如不修改密码则无需填写"></Input>
                        </div> -->
                    </Modal>
                    <Modal
                        v-model="newModal"
                        title="新建"
                        width="350"
                        @on-cancel="cancel"
                        @on-ok="newone()">
                        <Input v-model="newoned.email" style="width: 300px" placeholder="邮箱"></Input>
                        <br />
                        <br />
                        <Input v-model="newoned.name" style="width: 300px" placeholder="用户名"></Input>
                        <br />
                        <br />
                        <Input v-model="newoned.password" style="width: 300px" placeholder="密码"></Input>
                        <!-- <Input v-model="newone.name" style="width: 300px" placeholder="课题简介"></Input> -->
                    </Modal>
                <!-- </Col>
                    <Button type="error">删除</Button>
                <Col span="2"> -->

                </Col>

            </Row>

            <Row type="flex" justify="center">
                <!-- <Col span="16"> -->
                    <Page style="margin-top:40px; color:black" :total="pagetotal" @on-change="pagechange" show-elevator></Page>
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
                passwordchange: "",
                latestnews:[],
                newsArray:null,
                pagetotal:0,
                newModal: false,
                codeModal: false,
                updated: {
                    user_id: null,
                    update_info: {
                        name:"",
                        email:""
                    }
                },
                updated2: {
                    user_id: null,
                    update_info: {
                        password:""
                    }
                },
                code: {
                    code1: '',
                    code2: '',
                },
                newoned: {
                    email: "",
                    name: "",
                    password: "",
                    userLevel: 2,
                    phone: "0000000000",
                    role: 1,
                    manage: "[]"
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
                url: '/api/user',
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
                url: '/api/user',
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
                    url: '/api/user',
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
            codeit(index, news) {
                this.codeModal = true;
                this.notice = news;
            },
            updatepro(id) {
                var updatedata = null;
                if(this.passwordchange==""){
                    this.updated.user_id = id;
                    this.updated.update_info.name = this.notice.name;
                    this.updated.update_info.email = this.notice.email;
                    updatedata = this.updated;
                }else {
                    this.updated2.user_id = id;
                    this.updated2.update_info.name = this.notice.name;
                    this.updated2.update_info.email = this.notice.email;
                    this.updated2.update_info.password = this.passwordchange;
                    updatedata = this.updated2;
                }
                this.$request({
                method: 'put',
                url: '/api/user',
                data: updatedata
              }).then((response) => {
                if(response.data.state == 1) {
                        this.$Message.success('操作成功!');
                    }
                    else { 
                        this.$Message.error('操作失败!'); 
                    }
                this.$request({
                method: 'get',
                url: '/api/user',
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
            updatecode(id) {
                var updatedata = null;
                if ( this.code.code1 =='' ){
                    this.$Message.error('失败：密码不能为空！');
                    return null;
                }
                if ( this.code.code1 != this.code.code2 ){
                    this.$Message.error('失败：两次输入不一致！');
                    return null;
                }
                this.updated2.user_id = id;
                this.updated2.update_info.password = this.$CryptoJS.MD5(this.code.code1).toString();
                updatedata = this.updated2;
                this.$request({
                method: 'put',
                url: '/api/user',
                data: updatedata
              }).then((response) => {
                if(response.data.state == 1) {
                        this.$Message.success('修改成功!');
                    }
                    else { 
                        this.$Message.error('修改失败!'); 
                    }
                this.$request({
                method: 'get',
                url: '/api/user',
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
                    url: '/api/user?user_id='+news.id,
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