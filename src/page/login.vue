<template>
  <div class="login">
    <div class="form">
      <h3>海兔管理系统</h3>
      <el-form ref="form" :model="formData" :rules="rules" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="formData.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="formData.password" show-password></el-input>
        </el-form-item>
        <el-form-item class="button-group">
          <el-button class="bd-button" type="primary" @click="onSubmit">登录</el-button>
          <el-button @click="onReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from "api/user";

export default {
  data() {
    return {
      // 表单数据
      formData: {
        username: "",
        password: "",
      },
      // 表单验证规则
      rules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: ["blur", "change"],
          },
          {
            min: 3,
            max: 6,
            message: "长度再 3 到 6 个字符",
            trigger: ["blur", "change"],
          },
          {
            pattern: /^[a-z]+$/i,
            message: "只能使用英文字母",
            trigger: ["blur", "change"],
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: ["blur", "change"],
          },
          {
            min: 3,
            max: 6,
            message: "长度再 3 到 6 个字符",
            trigger: ["blur", "change"],
          },
          {
            pattern: /^\d+$/,
            message: "只能使用数字",
            trigger: ["blur", "change"],
          },
        ],
      },
    };
  },
  methods: {
    // 登录
    async onSubmit() {
      // 校验用户名和密码格式
      try {
        await this.$refs.form.validate();

        // 校验成功发送登录请求
        const { status, message, data } = await login(this.formData);
        if (status === 200) {
          // 将 token 存入vuex
          this.$store.commit("addToken", data.token);
          localStorage.setItem("token", data.token);

          this.$message({
            message,
            type: "success",
          });
          // 跳转到主页面
          this.$router.push("/");
        } else if (status === 401) {
          this.$message({
            message,
            type: "warning",
          });
        }
      } catch (error) {
        // 错误提示
        this.$message({
          message: "用户名和密码格式不正确",
          type: "warning",
        });
      }
    },
    // 表单重置
    onReset() {
      this.$refs.form.resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  height: 100vh;
  // background-image: linear-gradient(25deg, #487d4a, #549c76, #5bbca3, #5fded3);
  background-image: linear-gradient(25deg, #3b3f53, #66636e, #93898a, #c2b1a7);
  overflow: hidden;

  .form {
    width: 500px;
    margin: 200px auto;
    padding: 20px 30px 20px 10px;
    background-color: #fff;
    border-radius: 15px;
    text-align: center;

    h3 {
      font-size: 24px;
    }

    .bd-button {
      margin-right: 100px;
    }

    .button-group {
      margin-left: -80px;
    }
  }
}
</style>