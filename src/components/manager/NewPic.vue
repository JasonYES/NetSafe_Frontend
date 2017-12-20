<template>
    <div class="layout-content">
        <Collapse v-model="panelcontrol" class="panel" accordion>
            <Panel name="1">
                信息简介
            <Form class="formsize" :model="formItem" :label-width="80" slot="content">
                
                <Form-item label="标题">
                    <Input v-model="formItem.title" style="width: 300px" placeholder="请输入"></Input>
                </Form-item>

                <Form-item label="日期" >
                    <Date-picker :value="defaultTime" :options="options1" style="width: 300px" type="date" placeholder="选择日期" @on-change="formItem.date=arguments[0]"></Date-picker>
                </Form-item>

<!--                 <Form-item label="作者">
                    <Input v-model="formItem.author" style="width: 300px" placeholder="请输入"></Input>
                </Form-item> -->

                <Form-item label="所属课题" >
                    <Select v-model="formItem.project" style="width:300px">
                        <Option v-for="item in project" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </Form-item>

                <Form-item label="内容简介">
                    <Input v-model="formItem.intro" placeholder="请输入" type="textarea" style="width:500px" ></Input>
                </Form-item>
            </Form>

            </Panel>

            <Panel name="2">
                图片选择
                <p class="news" slot="content"></p>
                <br slot="content"/>
                <Upload
                    ref="upload"
                    slot="content"
                    multiple
                    type="drag"
                    :on-success="handleFile"
                    :on-remove="handleFile"
                    action="/api/app">
                    <div style="padding: 20px 0">
                        <Icon type="ios-cloud-upload" size="70" style="color: #3399ff"></Icon>
                        <p>点击或将文件拖拽到这里上传,可多选</p>
                    </div>
                </Upload>
            </Panel>
        </Collapse>

            <Modal
                        v-model="Modal"
                        width="800" 
                        :styles="{top: '100px'}">
                        <p slot="header" style="font-size:18px">
                            <Icon type="information-circled"></Icon>
                            <span>效果预览</span>
                        </p>

                        <div align="center" class="newstitle">{{formItem.title}}</div>
                        <div align="center" class="news" v-for="item2 in formItem.content"> 
                            <img style="margin:30px 0px;" :src="SRCparse(item2)" width="500px" :alt="SRCparse(item2)">
                        </div>
                        <div slot="footer" align="center">
                            <Button type="primary" size="large" :loading="modal_loading" @click="confirm">确认发布</Button>
                        </div>
                        <!-- {{this.updateData}} -->
                        <!-- <h1 align="center">亚马逊像苹果一样秘密组建医疗保健团队TechWeb</h1>
                        <p>自定义宽度，单位 px，默认 520px。</p>
                        <p>自定义宽度，单位 px，默认 520px。</p>
                        <p>自定义宽度，单位 px，默认 520px。</p>
                        <p>对话框的宽度是响应式的，当屏幕尺寸小于 768px 时，宽度会变为自动<code>auto</code>。</p> -->
            </Modal>

            <div align="center"> 
            <Button class="preview" type="ghost" align="center" @click="preview" size="large">效果预览</Button>
            </div>

        </div>

        

</template>

<script>
    import Avatar from 'vue-avatar/dist/Avatar'
    export default {
        data () {
            return {
                logoTitle: "HITVEP", 
                content: "",
                updateData: "",
                Modal: false,
                panelcontrol: 1,
                modal_loading: false,
                folder: global.folder,
                project: [
                ],
                formItem: {
                    title: "",
                    project: "",
                    date: "",
                    author: this.$store.getters.getUsername,
                    intro: "",
                    content: "",
                    isdoc: 0,
                },
                defaultTime: new Date(),
                options1: {
                    shortcuts: [
                        {
                            text: '今天',
                            value () {
                                return new Date();
                            },
                            onClick: (picker) => {
                                this.$Message.info('点击了今天');
                            }
                        },
                        {
                            text: '昨天',
                            value () {
                                const date = new Date();
                                date.setTime(date.getTime() - 3600 * 1000 * 24);
                                return date;
                            },
                            onClick: (picker) => {
                                this.$Message.info('点击了昨天');
                            }
                        },
                        {
                            text: '一周前',
                            value () {
                                const date = new Date();
                                date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                                return date;
                            },
                            onClick: (picker) => {
                                this.$Message.info('点击了一周前');
                            }
                        }
                    ]
                },
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
                // let resp = JSON.parse(response.data);
                // console.log(response.data.info[0]);
                this.project=response.data.info[0];
              })
        },
        mounted() {
            let date = new Date();
            var y = date.getFullYear();  
                var m = date.getMonth() + 1;  
                m = m < 10 ? '0' + m : m;  
                var d = date.getDate();  
                d = d < 10 ? ('0' + d) : d;  
            let result = y + '-' + m + '-' + d;  
            this.formItem.date = result;
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
            handleFile() {
                // console.log(this.$refs.upload.fileList);
                this.formItem.content = [];
                for(var item in this.$refs.upload.fileList){
                    // console.log(this.$refs.upload.fileList[item].name);
                    this.formItem.content.push(this.$refs.upload.fileList[item].name);
                }
                // this.formItem.content = this.$refs.upload.fileList;
            },
            update () {
                // updateData = arguments[0];
                this.updateData = arguments[0];
                this.formItem.content = this.updateData;
                // this.$Message.success(arguments[0]);
            },
            preview () {
                this.Modal = true;
                this.panelcontrol = 1;
                // this.$Message.success("good");
            },
            confirm () {
                this.modal_loading = true;
                this.$request({
                        method: 'post',
                        url: '/api/doc',
                        data: this.formItem, 
                        
                      }).then((response) => {
                        // let resp = JSON.parse(response.data);
                        // console.log(response.data.info[0]);
                        if(response.data.state == 1) {this.$Message.success('发布成功!');}
                        else { this.$Message.error('发布失败!'); }
                        // this.project=response.data.info[0];
                      })
                setTimeout(() => {
                    this.Modal = false;
                    this.modal_loading = false;
                }, 1000);
            }
        }

    }
</script>


<style scoped>
    .menu {
        margin-left: 25px;
        margin-top: 25px;
    }
    .preview {
        font-size: 17px;
        margin-top: 25px;
    }
    .formsize {
        min-height: 350px;
    }
    .panel {
        font-size: 17px;
    }
    .news {
        font-size: 18px;
    }
    .newstitle {
        font-size: 30px;
        font-weight: bold;
        margin-top: 40px;
        margin-bottom: 40px; 
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
    .layout-nav{
        width: 420px;
        margin: 0 auto;
    }
    .layout-assistant{
        width: 300px;
        margin: 0 auto;
        height: inherit;
    }
    .layout-breadcrumb{
        padding: 10px 15px 0;
    }
    .layout-content{
        min-height: 400px;
        margin: 15px;
        overflow: hidden;
        background: #fff;
        border-radius: 4px;
    }
    .layout-content-main{
        /*padding: 10px;*/
        margin-top: 25px;
        min-height: 600px;
        border-style: outset;
    }
    .layout-edge{
    padding: 10px;
    }
    .layout-copy{
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
    }

</style>

<style lang="less">
    .vertical-center-modal{
        display: flex;
        align-items: center;
        justify-content: center;

        .ivu-modal{
            top: 0;
        }
    }
</style>