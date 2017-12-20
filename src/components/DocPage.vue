<template>
  <div>
    <div>
      <Row type="flex" justify="center" class="nselect">
        <Row>
          <img src="../assets/B6.jpg" width="100%">
        </Row>
        <Col span="18" style="">
        <Row type="flex" justify="start" style="background-color:#fff" align="bottom">
          <Col span="1">
          <icon name="news1" style="padding-top:20px;margin-right:5px;" scale="6"></icon>
          </Col>
          <Col span="23">
          <p class="tabTitle">文档资料</p>
          </Col>
        </Row>
        <hr width=100% size=3 color=#eeeeee style="FILTER: alpha(opacity=100,finishopacity=0,style=3); margin-bottom:20px;margin-top:20px;">
        </Col>
      </Row>
      <Row type="flex" justify="center" class="nselect">
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
          <Row type="flex" justify="center">
            <i-col span="14">
              <Timeline align="left" class="timeline">
                <Timeline-item v-for="news of latestnews">
                  <!-- <Table :data="tabledata"></Table> -->
                  <p style="font-size:14px;">{{news.date}}</p>
                  <div class="border">
                    <a style="font-size:25px;" class="content" href="#" onclick="return false" @click="onNotice(news)">{{news.title}}</a>
                  </div>
                  <!-- <hr /> -->
                </Timeline-item>
              </Timeline>
              <Modal v-model="noticeModal" title="" width="800" @on-cancel="cancel" @on-ok="cancel">
                <div align="center">
                  <h1 align="center" style="margin:20px 0px 10px 0px;">{{notice.title}}</h1>
                  <p align="center" style="margin-bottom:40px; font-size:18px;"> {{notice.date}} &nbsp;&nbsp; {{notice.author}} </p>
                </div>
                <Row type="flex" justify="center">
                  <Col span="16">
                  <Card style="margin:5px 0px;overflow:hidden;" v-for="item2 in JSON.parse(notice.content)">
                    <div class="news">
                      <a :href="SRCparse(item2)" download>{{item2}}</a>
                    </div>
                  </Card>
                  </Col>
                </Row>
              </Modal>
              <Row type="flex" justify="center">
                <!-- <Col span="16"> -->
                <Page v-if='latestnews != "D"' style="margin-top:40px; color:black" :total="pagetotal" @on-change="pagechange" show-elevator></Page>
                <!-- </Col> -->
              </Row>
            </i-col>
          </Row>
        </i-col>
      </Row>
    </div>
  </div>
</template>
<script>
import Avatar from 'vue-avatar/dist/Avatar'
export default {
  data() {
    return {
      logoTitle: "HITVEP",
      userinfo: {
        id: 0,
        name: "null",
        user_level: 0,
      },
      folder: global.folder,
      latestnews: [],
      newsArray: null,
      newsArray2: null,
      pagetotal: 0,
      notice: {
        title: "",
        date: "",
        author: "",
        content: "[]",
      },
      noticeModal: false,
      data3: [{
        title: "新闻纪要"
      }, ],
      news: [],
      project: [],
      columns2: [{
          title: '文件',
          key: 'file',
          // width: 120,
        },
        {
          title: '操作',
          key: 'action',
          // fixed: 'right',
          width: 120,
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'info',
                  size: 'small'
                }
              }, '下载'),
            ]);
          }
        }
      ],
      subjects: [{
        file: "云计算与未来教育变革.pdf"
      }, ],
    }
  },
  components: {

  },
  beforeCreate() {
    this.$request({
      method: 'get',
      url: '/api/doc?role=2&project=[0]&isdoc=1',
      data: {}
    }).then((response) => {
      // let resp = JSON.parse(response.data.info[0][0]['content']);
      // let resp = JSON.parse(response.data.info[0][0]);
      // console.log(resp[0]);
      // if(response.data)
      this.latestnews = response.data.info[0];
      this.newsArray = response.data.info;
      this.newsArray2 = response.data.info;
      this.pagetotal = 10 * this.newsArray.length
      // this.onInfinite();
    })
    this.$request({
      method: 'get',
      url: '/api/type',
      data: {}
    }).then((response) => {
      // let resp = JSON.parse(response.data);
      // console.log(response.data.info[0]);
      this.project = response.data.info[0];
      console.log(this.project);

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
        url: '/api/doc?role=' + role + '&project=[' + argu + ']&isdoc=1',
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
    SRCparse(filename) {

      var filenamex = this.$CryptoJS.MD5(filename + "").toString();

      var postarray = (filename + "").split(".");
      var postfix = postarray[postarray.length - 1];

      var route = this.folder + filenamex + "." + postfix;
      console.log(route);
      //SRCparse(JSON.parse(image.content)[0])
      return route;
    },
    cancel() {
      // this.notice.title = null,
      // this.notice.content = "<h5>加载中...</h5>"
    },
    onNotice(notice) {
      this.noticeModal = true;
      this.notice = notice;
      // this.$Message.info(id+'');
    },
    getInto_course: function() {
      this.flag = false;
      this.$router.push('/home/' + this.userinfo.name + "/" + "maincourse");
    },
    mouseOver: function(ID) {
      var oDiv = document.getElementById(ID);
      oDiv.style.height = oDiv.offsetHeight - 10 + 'px';
      alert(oDiv.style.height);
    },

    mouseOut: function(ID) {

    },
    pagechange() {
      this.latestnews = this.newsArray[arguments[0] - 1];
    },
  }

}

</script>
<style scoped>
.time {
  font-size: 14px;
  font-weight: bold;
  /*margin-bottom:  10px;*/
}

.content {
  /*margin-bottom:  10px;*/
  /*padding-bottom:  10px;*/
  font-size: 17px;
  padding-left: 20px;
}

.timeline {
  margin-top: 50px;
  /*margin-left: 75px;*/
  margin-bottom: 10px;
}

a {
  color: #0F0F0F;
}

p {
  font-size: 16px;
}

hr {
  margin-top: 10px;
}

.border {
  border-right-style: inset
}

.tabTitle {
  font-size: 30px;
  color: #666;
  font-family: '华文宋体';
}

.course_panel {
  /*background:yellow;*/
  width: 100%;
  height: 400px;
}

.course_area {
  cursor: pointer;
  float: left;
  margin: 54px;
  background: blue;
}

.course_word {
  font-family: "Microsoft Yahei";
  text-align: left;
  margin-left: 10px;
}

.course_img {
  position: relative;
  margin: auto;
  overflow: hidden;
  float: left;
}

.course_word {
  font-size: 16px;
}

.nselect {
  -moz-user-select: none;
  -khtml-user-select: none;
  user-select: none;
}

</style>
