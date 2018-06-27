<template>
    <div>
        <div style="margin-top:12px;">
            <Row type="flex">
<!--                 <Col span="8">
                </Col>
                <Col span="8"> -->
                <Col span="24">
                <Table border :columns="columns" :data="subjects"></Table>
<!--                     <Timeline align="left" class="timeline"  pending="true">
                        <Timeline-item v-for="news of news">
                            <p class="time">{{news.date}}</p>
                            <div class="border">
                            <a class="content" href="#" onclick="return false" @click="noticeModal = true">{{news.title}}</a> 
                            </div>
                        </Timeline-item>
                    </Timeline> -->
                </Col>
                    <Modal
                        v-model="noticeModal"
                        title="自定义宽度"
                        width="800">
                        <h1 align="center">亚马逊像苹果一样秘密组建医疗保健团队TechWeb</h1>
                        <p>自定义宽度，单位 px，默认 520px。</p>
                        <p>自定义宽度，单位 px，默认 520px。</p>
                        <p>自定义宽度，单位 px，默认 520px。</p>
                        <p>对话框的宽度是响应式的，当屏幕尺寸小于 768px 时，宽度会变为自动<code>auto</code>。</p>
                    </Modal>
            </Row>
    <!-- <Page :total="40" size="small"></Page> -->
 <!--                    <Tabs value="selected">
                        <Tab-pane label="已选" name="selected" class="course_panel">
                            <div v-for="course of optional_courses" class="course_area" v-on:click.once="getInto_course">
                                <Card padding="0">
                                    <img width="260" height="160" v-bind:src="course.picurl">
                                    <div class="course_word">
                                        <div style="#330000">
                                            {{course.name}}
                                        </div>
                                        <div>
                                            主讲教师：袁明嵩
                                        </div>
                                        <div style="color:gray;font-size:12px;margin-top:5px">
                                            <Icon type="clock"></Icon>
                                            截至日期：{{course.end_time}}
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </Tab-pane>
                    </Tabs> -->
<!--                 </Col>
                <Col span="8">
                </Col> -->
            <div align="center" style="margin-top:25px">
            <Row>
                <Page :current="2" :total="50" simple></Page>
            </Row>
            </div>
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
                noticeModal: false,
                columns: [
                    {
                        title: '邮箱',
                        key: 'email',
                    },
                    {
                        title: '姓名',
                        key: 'name',
                    },
                    {
                        title: '权限',
                        key: 'level',
                    },
                    {
                        title: '操作',
                        key: 'action',
                        // fixed: 'right',
                        // width: 120,
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'info',
                                        size: 'small'
                                    }
                                }, '同意'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                subjects:[
                    {
                        email: "netsafe@163.com",
                        name: "刘思",
                        phone: "17995263450",
                    },                    
                    {
                        email: "netsafe@163.com",
                        name: "刘思",
                        phone: "17995263450",
                    },                    
                    {
                        email: "netsafe@163.com",
                        name: "刘思",
                        phone: "17995263450",
                    },
                    {
                        email: "netsafe@163.com",
                        name: "刘思",
                        phone: "17995263450",
                    },
                    {
                        email: "netsafe@163.com",
                        name: "刘思",
                        phone: "17995263450",
                    },
                    {
                        email: "netsafe@163.com",
                        name: "刘思",
                        phone: "17995263450",
                    },
                    {
                        email: "netsafe@163.com",
                        name: "刘思",
                        phone: "17995263450",
                    },
                    {
                        email: "netsafe@163.com",
                        name: "刘思",
                        phone: "17995263450",
                    },

                ],
            }
        },
        components: {
            
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
                
            }
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