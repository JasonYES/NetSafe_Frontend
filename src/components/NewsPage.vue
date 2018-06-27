<template>
  <div>
    <Row type="flex" justify="center" class="nselect">
      <Row>
        <img src="../assets/B1.jpg" width="100%">
      </Row>
      <Col span="18" style="">
      <Row type="flex" justify="start" style="background-color:#fff" align="bottom">
        <Col span="1">
        <icon name="news1" style="padding-top:20px;margin-right:5px;" scale="6"></icon>
        </Col>
        <Col span="23">
        <p class="tabTitle">项目资讯</p>
        </Col>
      </Row>
      <hr width=100% size=3 color=#eeeeee style="FILTER: alpha(opacity=100,finishopacity=0,style=3); margin-bottom:20px;margin-top:20px;">
      </Col>
    </Row>
    <Row type="flex" justify="center" class="nselect" style="">
      <i-col span="4">
        <Affix>
          <Menu @on-select="catalog" accordion theme="light" active-name="all">
            <!--                <Poptip  trigger="hover" content="根据名称模糊搜索" placement="top-start">
                    <Input  style="width:200px; margin:20px;"  @on-enter="searchNews"  v-model="search" icon="ios-search" placeholder="搜索" ></Input>
                </Poptip> -->
            <Menu-group title="资讯分类">
            </Menu-group>
            <Menu-item name="all">
              <Icon type="ionic"></Icon>全部</Menu-item>
            </Menu-group>
            <Menu-item :name="project.id" :key="project.id" v-for="project in project">
              <Icon type="ionic"></Icon>{{project.name}}</Menu-item>
          </Menu>
        </Affix>
      </i-col>
      <i-col span="14">
        <div class="content">
          <div style="margin:20px 0px 50px 40px;">
            <Row type="flex" justify="center">
              <div v-for="news in latestnews" :key="news.id" style="margin-top:20px;">
                <Card style="width:760px;" :padding="0">
                  <div>
                    <Row type="flex" justify="start" align="middle" style="">
                      <Col span="6">
                      <!--                    <Row type="flex" justify="center" align="middle" class="code-row-bg"> -->
                      <Col span="24">
                      <div>
                        <h2 style="text-align:center;">{{news.date.substr(0, 4)}}</h2>
                        <h1 style="font-size:40px; text-align:center;">{{news.date.substr(5, 10)}}</h1>
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
                      <Row type="flex" justify="start" style="">
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
  data() {
    return {
      logoTitle: "HITVEP",
      showBriefIntro: false,
      resultTitle: "",
      search: "",
      userinfo: {
        id: 0,
        name: "null",
        user_level: 0,

      },
      item: 1,
      latestnews: [],
      newsArray: null,
      project: [],
      pagetotal: 0,
    }
  },
  components: {
    Avatar,
    InfiniteLoading,
  },
  beforeCreate() {
    this.$request({
      method: 'get',
      url: '/api/news?role=2&project=[0]&isnews=1',
      data: {}
    }).then((response) => {
      // let resp = JSON.parse(response.data);
      // console.log(response.data.info);
      // if(response.data)
      this.latestnews = response.data.info[0];
      this.newsArray = response.data.info;
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
      this.project = response.data.info[0];
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
    catalog() {
      // this.$Message.info('hahah');
      var argu = arguments[0];
      var role = 1;
      if (argu == 'all') { role = 2 }
      this.$request({
        method: 'get',
        url: '/api/news?role=' + role + '&project=[' + argu + ']&isnews=1',
        data: {}
      }).then((response) => {
        // let resp = JSON.parse(response.data);
        console.log(response.data);
        if (response.data.state == 0) {
          this.latestnews = null;
          this.newsArray = null;
          // this.onInfinite();
        } else {
          this.latestnews = response.data.info[0]
          this.newsArray = response.data.info;
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
      for (var item2 in this.latestnews) {
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
      this.$router.push('/newsdetail?i=' + argu + '&pro=' + project);
    },
    pagechange() {
      this.latestnews = this.newsArray[arguments[0] - 1];
    },
    searchNews() {

    },
    getNews() {

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
hr {
  margin-top: 10px;
}

.tabTitle {
  font-size: 30px;
  color: #666;
  font-family: '华文宋体';
}

.vertical {
  display: flex;
  justify-content: center;
  align-items: center;
  display: -webkit-flex;
}


.content {
  font-size: 13px;
}


/*   .content:hover {
        color: #2d8cf0
    }*/

.img_scale {

  transition: all 1s ease-in-out;
  filter: brightness(1);
}

.img_scale:hover {
  -webkit-transform: scale(1.1, 1.1);
  -moz-transform: scale(1.1, 1.1);
  -transform: scale(1.1, 1.1);
  transition: all 1s ease-in-out;
  filter: brightness(0.8);
}

.img_wrapper {
  overflow: hidden;
}

a {
  color: #0F0F0F;
}

.newsTitle {
  margin: 10px;
  font-size: 18px;
  font-weight: bolder;
  font-family: '华文宋体';
  transition: all .2s ease-in-out;
}

.newsTitle:hover a {
  color: #2d8cf0;
  transition: all .3s ease-in-out;
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

.newsTitle {
  margin: 10px;
  font-size: 25px;
  font-weight: bolder;
  font-family: '宋体';
  transition: all .2s ease-in-out;
}

</style>
