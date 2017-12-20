<template>
	<Form ref="form" :model="form" :label-width="100" :rules="loginRule"  style="height:300px;margin:20px; padding-right:100px;">
		<Form-item  prop="username" label="用户名">
			<Input @on-change="getNewAccountInfo" v-model="form.username" placeholder="请输入用户名"></Input>
		</Form-item>
		<Form-item  prop="password"  label="密码">
			<Input @on-change="getNewAccountInfo" type="password" v-model="form.password"  placeholder="请输入密码"></Input>
		</Form-item>
		<Form-item label="确认密码" prop="passwdCheck">
            <Input type="password" v-model="form.passwdCheck" placeholder="请再次输入密码" ></Input>
        </Form-item>
          <Form-item  prop="email" label="邮箱">
      <Input @on-change="getNewAccountInfo" type="text" :rows="4" v-model="form.email" placeholder="请请输入邮箱"></Input>
    </Form-item>
	</Form>

</template>

<script>
  export default {
    name: 'hello',
    data () {
      const validateUsername = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        }
        callback();

      };
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.form.passwdCheck !== '') {
            this.$refs.form.validateField('passwdCheck');
          }
          callback();
        }
      };
      const validatePassCheck = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.form.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        self: this,
        createAccountForm: false,
        form: {
          username:'',
          password:'',
          passwdCheck:'',
          email:''
        },
        loginRule: {
          username: [
              { validator: validateUsername, trigger: 'blur' },
              { required:true, trigger: 'blur'}
          ],
          password: [
              { validator: validatePass, trigger: 'blur' }
          ],
          passwdCheck: [
              { validator: validatePassCheck, trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      getNewAccountInfo() {
        this.$emit('transferNewAccountInfo', this.form);
      }
    }
  };
</script>

<style scoped>
  .ivu-select-dropdown {
    position: absolute !important;
  }
</style>