<template>

<div class="layout">
    


     <Row type="flex" justify="center" class="nselect" style="margin-top:50px;">
        <!-- 最新资讯 -->
        <Col span="12" style="">

            
                <Row type="flex"   justify="start"  style="margin-top:20pxl"  >
                    <Col span="12"> 
                        <Breadcrumb>
                            <Breadcrumb-item href="/newspage">上级菜单</Breadcrumb-item>
                            <Breadcrumb-item>正文</Breadcrumb-item>
                        </Breadcrumb>
                    </Col>

                </Row>
                <hr width=100% size=3 color=#eeeeee style="FILTER: alpha(opacity=100,finishopacity=0,style=3); margin-bottom:20px;margin-top:10px;"> 

                <div style="">
                
                <h1 style="font-size:35px"><strong>{{news.title}}</strong></h1>
                <p style="font-size:20px;margin-top:10px;">{{news.author}} ·  {{news.date}}</p>
                <br />
                <br />
                <div v-html="news.content"></div>

                </div>
                <br />
                <br />
                <div v-for="item in JSON.parse(news.pic)">
                    
                        <div  style="height:100%; margin:40px 0px 40px 0px" align="center">
                            <img :src="SRCparse(item)"  class="projectPic" style="width:70%;height:70%;">
                        </div>

                </div>
                


        </Col>

        <!-- 通知公告 -->
        <Col span="6" class="nselect"  style="margin-left:20px;margin-top:72px;">
            <Card >
            <Row type="flex" justify="center"  align="bottom">
                <Col span="6" >  <p style="font-size:20px;font-family:'华文宋体';"> 相关新闻</p>
                     
                </Col>


            </Row>
            <hr width=100% size=3 color=#eeeeee style="FILTER: alpha(opacity=100,finishopacity=0,style=3); margin-bottom:20px;"> 
                <div style="margin-top:8px; margin-left:10px;" v-for="notice of notices">
                    <Row >
                       
                        <Col span="20"  align="left">
                            <div  style="width:280px;overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">
                                <a class="content"  href="#" onclick="return false" @click="enterDetails(notice.id)" > <Icon type="arrow-right-b"></Icon>   &nbsp;&nbsp;{{notice.title}}</a> 
                            </div>

                        </Col>

                        <Col span="4">
                            
                                 <div>
                              <a style="font-size:13px;"   >{{notice.date.substr(5, 10)}}</a>
                            </div>
                        </Col>
                    </Row>
                    
                   
                </div>
            </Card>
        </Col>
    </Row>

</div>


</template>

<script>
    import Avatar from 'vue-avatar/dist/Avatar'
    import VueMarkdown from 'vue-markdown'
    export default {
        data () {
            return {
                userinfo: {
                    id:0,
                    name:"null",
                    user_level:0,
                },
                id:0,
                noticeModal:false,
                project:0,
                news:{},
                notices:[],
                folder: global.folder,
                }
        },
        components: {
            Avatar,
            'vue-markdown': VueMarkdown
        },
        created() {
            console.log(this.$route.query['i']);
            this.id = this.$route.query['i'];
            this.project = this.$route.query['pro'];
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
            this.$request({
                method: 'get',
                url: '/api/news?role=1&project=['+this.project+']&isnews=1',
                data: {}
              }).then((response) => {
                // let resp = JSON.parse(response.data);
                // console.log(response.data.info[0]);
                this.notices=response.data.info[0].slice(0,6);
              });
            this.$request({
                method: 'patch',
                url: '/api/news?id='+this.id,
                data: {}
              }).then((response) => {
                // let resp = JSON.parse(response.data);
                // console.log(response.data.info[0]);
                this.news=response.data.info[0][0];
                // console.log(response);
              })
        },
        methods: {
            SRCparse(filename) {

                // var nameutf = this.$CryptoJS.enc.Utf8.parse(filename + "");
                var filenamex = this.$CryptoJS.MD5(filename + "").toString();

                var postarray = (filename + "").split(".");
                var postfix = postarray[postarray.length - 1];

                var route = this.folder + filenamex + "." + postfix;
                // console.log(route);
                //SRCparse(JSON.parse(image.content)[0])
                return route;
            },
            cancel() {
                this.notice.title = null,
                this.notice.content = "<h5>加载中...</h5>"
            },
            enterDetails(id) {
                console.log("news get.")
                this.$request({
                    method: 'patch',
                    url: '/api/news?id='+id,
                    data: {}
                  }).then((response) => {
                    // let resp = JSON.parse(response.data);
                    // console.log(response.data.info[0][0]);
                    this.news=response.data.info[0][0];
                    // console.log(response);
                    // this.$Message.info("hah");
                  })
                },
        }

    }
</script>

<style scoped>

    .layout{
        background: #ffffff;
    }


    .nselect {
        -moz-user-select: none;
        -khtml-user-select: none;
        user-select: none;
      }

    .content {
        color:#0f0f0f;
        font-size: 13px;
    }
    .content:hover {
        color: #2d8cf0
    }

    blockquote {
        background-color: #ccc;
    }
    .demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
    @keyframes ani-demo-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
    }
    .demo-spin-col{
        height: 100px;
        position: relative;
        border: 1px solid #eee;
    }

</style>