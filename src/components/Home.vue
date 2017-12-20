<template>
    <div>
        <div>
            <Modal
            v-model="loginModal"
            width="285">
            <Tabs value="name1" style="margin-top: 15px" >
                <Tab-pane style="margin-top: 10px" label="登陆" name="name1">

                    <img src="../assets/netlogo.jpg" height="177" width="250" style="margin-bottom: 20px"/>

                    <Form v-if="this.userinfo.email == ''" ref="loginForm" :model="loginForm" :rules="loginRule" >
                        <Form-item prop="username" >
                            <Input style="width: 250px" type="text" v-model="loginForm.username" placeholder="邮箱">
                                <Icon type="email" slot="prepend"></Icon>
                            </Input>
                        </Form-item>
                        <Form-item prop="password">
                            <Input type="password" style="width: 250px" v-model="loginForm.password" placeholder="密码">
                                <Icon type="locked" slot="prepend"></Icon>
                            </Input>
                        </Form-item>
                        <Form-item>
                            <div align="center">
                                <Button  type="ghost" shape="circle"  @click="userLogin">登录</Button>
                            </div>
                        </Form-item>
                    </Form>
                    <Button v-else style="margin:20px 0px ; width: 250px" @click="quit">
                    退出账号
                    </Button>
                </Tab-pane>


                <!-- <Tab-pane style="margin-top: 20px" label="注册" name="name2">
                    <div >
                        <Form ref="signupForm" :model="signupForm" :rules="signupRule" >
                            <Form-item prop="username" >
                                <Input style="width: 250px" type="text" v-model="signupForm.username" placeholder="用户名">
                                    <Icon type="person" slot="prepend"></Icon>
                                </Input>
                            </Form-item>
                            <Form-item prop="email">
                                <Input type="text" v-model="signupForm.email" placeholder="邮箱">
                                    <Icon type="email" slot="prepend"></Icon>
                                </Input>
                            </Form-item>
                            <Form-item prop="phone">
                                <Input type="text" v-model="signupForm.phone" placeholder="手机号">
                                    <Icon type="ios-telephone" slot="prepend"></Icon>
                                </Input>
                            </Form-item>
                            <Form-item prop="password">
                                <Input type="password" style="width: 250px" v-model="signupForm.password" placeholder="密码">
                                    <Icon type="locked" slot="prepend"></Icon>
                                </Input>
                            </Form-item>
                            <Form-item prop="passwordCheck">
                                <Input type="password" v-model="signupForm.passwordCheck" placeholder="确认密码">
                                    <Icon type="locked" slot="prepend"></Icon>
                                </Input>
                            </Form-item>

                            <Form-item>
                                <div align="center">
                                    <Button  type="ghost" shape="circle"  @click="userSignup('signupForm')">注册</Button>
                                </div>
                            </Form-item>
                        </Form>
                    </div>


                </Tab-pane> -->
            </Tabs>
            <div slot="footer">

            </div>
        </Modal>
            
        </div>


        <section>
          <div >
            <vue-particles class="background"  shapeType="circle" :particleOpacity="0.4" :particlesNumber="40" linesColor="#0c4060" color="#0c4060"></vue-particles>
          </div>
        </section>



    <div style="min-width:1500px;">
    

        <Menu  class="menu" mode="horizontal" @on-select="changeRouter"  style="">

            <div class="layout-nav" >
                <Row type="flex" class="nselect" >

                    <Col span='2' align="right"  offset="1">
                        <img src="../assets/nssflogo.jpg" @click="changeRouterFirst" width="60px" style="" /> 


                    </Col> 
                    <Col span='4' >
                        <a class="layout-logo" @click="changeRouterFirst">{{logoTitle}}</a>         
                    </Col>
                    <Col span="10"  offset="7">
                    
                        <Menu-item  name=""  >                     
                            首页
                        </Menu-item>
                    
                        <Menu-item  name="newspage" style="">                     
                            项目资讯
                        </Menu-item>
                    
                        <Menu-item name="noticepage" style="">                          
                            通知公告
                        </Menu-item>
                 
<!--                         <Menu-item name="picpage" style="">                          
                            项目图片
                        </Menu-item> -->
                   
                        <Menu-item name="docpage" style="">                          
                            文档资料
                        </Menu-item>
                   
                        <Menu-item name="memberpage" style="">                          
                            参与单位
                        </Menu-item>
                   
                        <Menu-item name="managepage" style="" v-if="this.userinfo.email != ''">     
                            管理员页
                            <!-- {{this.userinfo.name}} -->
                        </Menu-item>
                    </Col>
                </Row>
            </div>
        </Menu>

       

        <div class="layout-content">
            <transition name="fadeDown" mode="out-in" appear>
                <router-view>
                </router-view>
            </transition>
            
        </div>

        <Row type="flex">
            <Col span="11">
            </Col> 
            <Col span="2">
                <div class="layout-copy">
                    Copyright &copy; 2017 
                    <a @click="loginModal=true" style="color: #9ea7b4;"> HITNSLAB  </a>       
                </div>
            </Col>
            <Col span="9">
            </Col>
            
            <Col span="1">
               
            </Col>
        </Row>
        <Back-top></Back-top>
    </div>
    </div>
</template>

<script>
    import Avatar from 'vue-avatar/dist/Avatar'
    export default {
        data () {
            const validatePassCheck = (rule, value, callback) => {
                  if (value === '') {
                      callback(new Error('请再次输入密码'));
                  } else if (value !== this.loginForm.password) {
                      callback(new Error('两次输入密码不一致!'));
                  } else {
                      callback();
                  }
              };
            return {
                loginModal: false,
              
                logoTitle: "网络安全态势感知",  
                userinfo: {
                    user_id: 0,
                    name: "",
                    role: 0,
                    email: ""
                },
                loginForm: {
                  username: '',
                  password: ''
                },
                loginRule: {
                  username: [
                      { required: true, message: '请输入邮箱', trigger: 'blur' }
                  ],
                  password: [
                      { required: true, message: '请输入密码', trigger: 'blur' },
                  ]
                },
                signupForm: {
                      username: '',
                      password: '',
                      passwordCheck: ''
                    },
                    signupRule: {
                      username: [
                      { required: true, message: '请填写用户名', trigger: 'blur' } 
                      ],
                      password: [
                      { required: true, message: '请填写密码', trigger: 'blur' },
                      { type: 'string', min: 4, message: '密码长度不能小于4位', trigger: 'blur' }
                      ],
                      passwordCheck: [
                      { validator: validatePassCheck, trigger: 'blur' }
                      ]
                    }
                        }
        },
        components: {
            Avatar
        },
        mounted() {
            if(this.$ls.get('NetSafeinfo') != null) {
                this.userinfo = this.$ls.get('NetSafeinfo');
                // console.log(this.userinfo);
            
                this.$store.dispatch({
                      type: 'SET_USER_INFO',
                      userinfo: this.userinfo
                });
            }
        },
        methods: {

            changeRouterFirst () {
                    this.$router.push("/");
            },
            changeRouter () {
                if (arguments[0] == "managepage") {
                    // this.$ls.set('userinfo', {});
                    this.$router.push('/'+this.userinfo.user_id+'/managepage/newnotice');
                }
                else {
                    this.$router.push("/"+arguments[0]);
                }
            },
            quit() {
                this.userinfo = {
                    user_id: 0,
                    name: "",
                    role: 0,
                    email: ""
                };
                this.$ls.set('NetSafeinfo', null);
                this.loginModal = false;
                this.$router.push("/");
            },
            userLogin() {
                var password = this.$CryptoJS.MD5(this.loginForm.password).toString();
                var username = this.loginForm.username;
                this.$request({
                method: 'patch',
                url: '/api/user?username='+username+'&token='+password,
                data: {}
              }).then((response) => {
                this.loginModal = false
                if (response.data.state == 1) {
                    this.userinfo = response.data.info;
                    this.$router.push('/'+this.userinfo.user_id+'/managepage/newnotice');
                    this.$Message.success("登陆成功！");
                    // console.log(response);
                    this.$ls.set('NetSafeinfo', response.data.info);
                    this.$store.dispatch({
                      type: 'SET_USER_INFO',
                      userinfo: this.userinfo
                });
               }
               else {
                    this.$Message.error("登陆失败！");
                    // console.log(response);
               }
              })
                // console.log(password);
            }
        }
    }
</script>


<style scoped>
    .menu {
        /*box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, .05), 0px 0px 8px 0px rgba(0, 0, 0, .04);*/
        box-shadow: 0 1px 2px rgba(0,0,0,.1);
        z-index: 999;
    }
    .ivu-menu-light.ivu-menu-horizontal  .ivu-menu-light.ivu-menu-horizontal .ivu-menu-submenu-active, .ivu-menu-light.ivu-menu-horizontal .ivu-menu-item:hover, .ivu-menu-light.ivu-menu-horizontal .ivu-menu-submenu:hover {
        border-bottom: 2px solid #bbb;
    }
    .layout{
        /*border: 1px solid #d7dde4;*/
        background: #ffffff;
    }
    .layout-logo{
        font-family: "华文宋体";
        font-size: 30px;
        font-weight: bold;
        color: #999999;
        margin-right:  0px;
    }
    .login {
        color: #9ea7b4;
    }
    .ivu-menu-horizontal.ivu-menu-light:after {
        height: 0px !important;
    }

    .layout-content{
        min-height: 900px;
        height: auto;
        margin-bottom: 30px;
        /*margin-top:;*/
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
        margin-left:100px;
        margin-right:100px; 
        margin-top:20px; 
    }
    .ivu-select-dropdown {
        position: relative !important;
    }
    .background {
        position: fixed;
        right:0;
        bottom: 0;
        min-width: 100%;
        min-height: 100%;
        height: auto;
        overflow:hidden;
        filter:blur(4px);
        width: auto;
      } 

      .nselect {
        -moz-user-select: none;
        -khtml-user-select: none;
        user-select: none;
      }

</style>