<template>
    <div>
     
        <Row type="flex" justify="center" class="nselect" >
        <Row>
            <img src="../assets/B7.jpg" width="100%">
        </Row>
        <Col span="18" style="">


                <Row type="flex"   justify="start"  style="background-color:#fff" align="bottom" >
                 <Col   span="1" >
                        <icon name="news1" style="padding-top:20px;margin-right:5px;" scale="6"></icon>
                        
                    </Col>
                    <Col   span="23" >
                        <p class="tabTitle" >项目图片</p>
                    </Col>

                </Row>
                    <hr width=100% size=3 color=#eeeeee style="FILTER: alpha(opacity=100,finishopacity=0,style=3); margin-bottom:20px;margin-top:20px;"> 
            </Col>

        </Row>



         <Row type="flex" justify="center" class="nselect" style="">
    
        <i-col span="4" >
             <Affix>
            <Menu @on-select="catalog"  accordion theme="light" active-name="popular">

                <!-- <Poptip  trigger="hover" content="根据名称模糊搜索" placement="top-start">
                    <Input  style="width:200px; margin:20px;"  @on-enter="searchNews"  v-model="search" icon="ios-search" placeholder="搜索" ></Input>
                </Poptip> -->
                <Menu-group title="资讯分类">
                </Menu-group>
                <Menu-item name="all" ><Icon type="ionic"></Icon>全部</Menu-item>
                </Menu-group>
                <Menu-item :name="project.id" :key="project.id" v-for="project in project"><Icon type="ionic"></Icon>{{project.name}}</Menu-item>
            </Menu>
            </Affix>

        </i-col> 


        <i-col span="14">
            <div class="content"  >
            <!-- <div> -->

<!--              <Row type="flex"   >
             <Col class="vertical"   span="10">
                 <p>{{resultTitle}}</p>

             </Col> -->
             <!-- <Col class="vertical" span="8" >
             <div>
                        <Spin v-if="bookLoading"   size="large" >
                    
                </Spin>
             </div>
                  
             </Col> -->
<!--                 <Col class="vertical" span="2" style="margin-top:200x" offset="4">
                     <Poptip trigger="hover" title="" content="显示简要介绍">
            
                        <i-switch v-model="showBriefIntro" @on-change="showBrief" size="large">
                               <span style="font-size:10px" slot="open">ON</span>
                               <span style="font-size:10px" slot="close">OFF</span>

                        </i-switch>
                    </Poptip>
               
                </Col> -->
        

                
                
            <!--     <hr width=100% size=3 color=#eeeeee style="FILTER: alpha(opacity=100,finishopacity=0,style=3)">  -->
<!-- 
            </div> -->
               
                <div style="margin:20px 0px 50px 40px;" >
                <Row type="flex" justify="center">
                <div v-for="(image, index) in latestnews" :key="image.id" >

                        <!-- 
                            <Poptip trigger="hover" title="提示标题" content="提示内容">
                                <img :src="image.img"  class="projectPic" style="">
                            </Poptip> -->


                            <Card style="width:900px;margin:20px; box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, .04), 0px 0px 8px 0px rgba(0, 0, 0, .04);" :padding="0">
                                <div style="">
                                    <Row type="flex"  justify="start"  style=""  >
                                        <Col span="14" style="">
                                                <div  style="height:100%">
                                                    <!-- <img :src="this.folder +JSON.parse(image.content)[0]"  class="projectPic" style="width:100%;height:100%; min-height:150px " > -->
                                                    <!-- <img :src=" this.folder + JSON.parse(image.content)[0]"  class="projectPic" style="width:100%;height:100%; min-height:150px " > -->
                                                    <img :src="SRCparse(JSON.parse(image.content)[0])"  class="projectPic" style="width:100%;height:100%; min-height:150px " >

                                                    

                                                    <!-- <img :src="require('' + this.folder + JSON.parse(image.content)[0])" class="projectPic" style="width:100%;height:100%; min-height:150px " > -->
                                                </div>
                                        </Col>
                                        <Col span="10">
                                            <Row>
                                            <div class="imageTitle">

                                                <a  @click="enterDetails(image.id)"  style="">{{image.title}}</a>
                                            </div>
                                            </Row>
                                            <!-- <Row> -->
                                            <Row>
                                            <p style="margin:10px 20px 0px 10px;font-size:16px;color:#888;bottom:10px">{{image.author}} &nbsp;&nbsp;{{image.date}}</p>
                                            </Row>
                                            <Row>
                                            <p style="margin:10px 20px 10px 10px;font-size:18px;color:#888">{{image.intro}}</p>
                                            </Row>
                                 <!--            <p style="margin:20px 20px 0px 10px;font-size:14px;color:#888;position:absolute;bottom:50px">{{image.author}}</p> -->
      <!--                                       <p style="margin:10px 20px 0px 10px;font-size:12px;color:#888;position:absolute;bottom:30px"><Icon type="pricetags"></Icon> {{image.project}}</p> -->
                                            <!-- </Row>
                                            <Row> -->
                                            
                                            <!-- </Row> -->
                                        </Col>

                                    </Row>



                                </div>
                            </Card>

                        </div>                       </Row>

                    <Row type="flex" justify="center">
                            <!-- <Col span="16"> -->
                                <Page style="margin-top:40px; color:black" :total="pagetotal" @on-change="pagechange" show-elevator></Page>
                            <!-- </Col> -->
                    </Row>
                    

<!--                    
                    <infinite-loading :on-infinite="onInfinite" ref="infiniteLoading"></infinite-loading> -->
        

         
              </div>

          </div>


      </i-col>
  </Row>
         <Back-top></Back-top>
    </div>
</template>

<script>
    import Avatar from 'vue-avatar'
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
                folder: global.folder,
                item:1,
                latestnews:[],
                newsArray:null,
                project:[],
                pagetotal:0,
                images:[
                {
                        id:1,
                        date:"2017-12-29",
                        img:"https://pic.36krcnd.com/avatar/201708/02072307/1bqmdp63f33tlb4l.jpg!heading",
                        title:"马斯克的超级高铁梦，可能只是公关妙计",
                        author:"小兵手",
                        brief:"你怎么看？",
                        width:200,
                        height:116,
                        project:"A课题",
                        view:"789",
                    },
                ],
            }
        },
        components: {
            Avatar,
            InfiniteLoading,
        },
        beforeCreate() {
            this.$request({
                method: 'get',
                url: '/api/doc?role=2&project=[0]&isdoc=0',
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
            this.$request({
                method: 'get',
                url: '/api/project',
                data: {}
              }).then((response) => {
                // let resp = JSON.parse(response.data);
                // console.log(response.data.info[0]);
                this.project=response.data.info[0];
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
            SRCparse(filename) {

                // var nameutf = this.$CryptoJS.enc.Utf8.parse(filename + "");
                var filenamex = this.$CryptoJS.MD5(filename + "").toString();

                var postarray = (filename + "").split(".");
                var postfix = postarray[postarray.length - 1];

                var route = this.folder + filenamex + "." + postfix;
                console.log(route);
                //SRCparse(JSON.parse(image.content)[0])
                return route;
            },
            catalog() {
                // this.$Message.info('hahah');
                var argu = arguments[0];
                var role = 1;
                if (argu =='all') {role=2}
                this.$request({
                method: 'get',
                url: '/api/doc?role='+role+'&project=['+argu+']&isdoc=0',
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
                this.$router.push('/picdetail?i='+argu+'&pro='+project);
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
    .imageTitle {
        margin:10px;
        font-size:24px;
        font-weight:bolder;
        font-family:'华文宋体';
        transition:all .2s ease-in-out;
    }

    .imageTitle:hover a {
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

    .projectPic {
        border-radius: 4px;
        box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, .5), 0px 0px 8px 0px rgba(0, 0, 0, .04);
        filter: blur(1px) brightness(0.8);
        transition:all .3s ease-in-out;
        max-width: 500px;
    }

    .projectPic:hover {
        filter: blur(0px) brightness(1);
        transition:all .3s ease-in-out;
    }
</style>