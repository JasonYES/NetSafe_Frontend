<template>
    <div >

        
        <Row type="flex" justify="center" class="nselect" style="margin-top:50px;">

        <Col span="18" style="">


                <Row type="flex"   justify="start"  style="background-color:#fff"  >
                 <Col   span="1" >
                        <icon name="admin" style="padding-top:10px;margin-right:5px;" scale="6"></icon>
                        
                    </Col>
                    <Col   span="23" >
                        <p class="tabTitle" >管理员面板</p>
                    </Col>

                </Row>
                    <hr width=100% size=3 color=#e9eaec style="FILTER: alpha(opacity=100,finishopacity=0,style=3); margin-bottom:10px;margin-top:0px;"> 
            </Col>

        </Row>






            <Row type="flex" justify="center">

                <Col span="4">
            <Menu theme="light" @on-select="changeRouter" active-name="newnotice" :open-names="['1']" class="menu" accordion>
                <Submenu name="1" align="center">
                    <template slot="title">
                        <Icon type="ios-paper"></Icon>
                        内容发布
                    </template>
                    <Menu-item name="newnotice">通知发布</Menu-item>
                    <Menu-item name="newnews">资讯发布</Menu-item>
                    <!-- <Menu-item name="newpic">图片发布</Menu-item> -->
                    <Menu-item name="newdoc">文档发布</Menu-item>
                </Submenu>
                <Submenu name="2" align="center">
                    <template slot="title">
                        <Icon type="ios-people"></Icon>
                        内容管理
                    </template>
                    <Menu-item name="mannotice">通知管理</Menu-item>
                    <Menu-item name="mannews">资讯管理</Menu-item>
                    <!-- <Menu-item name="manpic">图片管理</Menu-item> -->
                    <Menu-item name="mandoc">文档管理</Menu-item>
                </Submenu>
                <Submenu name="3" align="center">
                    <template slot="title">
                        <Icon type="stats-bars"></Icon>
                        基本管理
                    </template>
                        <Menu-item name="user">用户管理</Menu-item>
                        <!-- <Menu-item name="userreg">注册管理</Menu-item> -->
                        <Menu-item name="userlevel">文档类别</Menu-item>
                        <Menu-item name="userproject">课题管理</Menu-item>   
                </Submenu>
            </Menu>

        </Col>
                <Col span="16">
                <div class="layout-content">
                    <transition name="zoom" mode="out-in" appear>
                        <router-view></router-view>
                    </transition>
                </div>
                </Col>
            </Row>
        </div>
</template>

<script>
    import Avatar from 'vue-avatar/dist/Avatar'
    export default {
        data () {
            return {
                // logoTitle: "HITVEP", 

                // logoTitle: "NetSafe",  
                // userinfo: this.$store.getters.username,
                userinfo: {
                    user_id: null,
                    name: null,
                    role: null,
                    email: null
                },
            }
        },
        components: {
            
        },
        beforeCreate() {
            if(this.$ls.get('NetSafeinfo') != null) {
                this.userinfo = this.$ls.get('NetSafeinfo');
                if(this.userinfo.user_id != 0) {
                    //Do Something
                    //Or just do nothing
                      
                }
            }
            else{
                this.$router.push("/");
            }
        },
        mounted() {
            this.userinfo = this.$ls.get('NetSafeinfo');
            console.log(this.userinfo);
            this.$store.dispatch({
                  type: 'SET_USER_INFO',
                  username: this.userinfo.name,
                  token: this.userinfo.passwd
            });
            this.$store.dispatch({
                type: 'SET_USER_ID',
                user_id: this.userinfo.id
            });
        },
        methods: {
             changeRouter () {
                // this.$Message.success(arguments[0]);
                this.$router.push('/'+this.userinfo.name+"/managepage/"+arguments[0]);
                // this.$router.push('/'+arguments[0]);
                // this.$Message.success('!');
                // this.$Message.success("登录成功");
            }
        }

    }
</script>


<style scoped>
    .menu {
        margin-left: 25px;
        margin-top: 25px;
    }
    .tabTitle {
        font-size: 30px;
        margin: 25px;
        color: #00B050;
        margin-bottom:20px;       
    }
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
    }
    .layout-logo{
        width: 100px;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        float: left;
        position: relative;
        top: 15px;
        left: 20px;
    }
    .layout-content{
        margin: 30px 0px 0px 30px;
    }
    .layout-copy{
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
    }
    .tabTitle {
        font-size: 30px;
        margin: 10px;
        color: #666;
        margin-bottom:15px;
        font-family:'华文宋体';
    }      
    .nselect {
        -moz-user-select: none;
        -khtml-user-select: none;
        user-select: none;
      }
        .vertical{
        display: flex;
        justify-content: center;
        align-items:center;
        display:-webkit-flex;
    }
</style>