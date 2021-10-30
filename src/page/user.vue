<template>
  <div class="user">
    <hi-breadcrumb></hi-breadcrumb>
    <div class="form-box">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="form.nickname"></el-input>
        </el-form-item>
        <el-form-item label="头像">
          <el-upload
            class="avatar-uploader"
            :action="'/updateFile' | addBaseURL"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :on-change="handleOnChange"
            :auto-upload="false"
          >
            <img v-if="form.profile_pic" :src="form.profile_pic | addBaseURL" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="onSubmit" type="primary">修改</el-button>
        </el-form-item>
      </el-form>
      <!-- 裁剪模态框 -->
      <el-dialog title="头像裁剪" :visible.sync="dialogTableVisible">
        <div class="crop">
          <div class="left">
            <div>裁剪框</div>
            <div class="cropper-box">
              <vueCropper
                ref="cropper"
                :img="option.imgFile"
                :autoCrop="option.autoCrop"
                :autoCropWidth="option.autoCropWidth"
                :autoCropHeight="option.autoCropHeight"
                :fixed="option.fixed"
                :fixedNumber="option.fixedNumber"
              ></vueCropper>
            </div>
          </div>
          <div class="right">
            <div>预览</div>
            <div class="show">
              <el-avatar :size="100" :src="img"></el-avatar>
              <el-avatar :size="100" :src="img" shape="square"></el-avatar>
            </div>
            <div class="button-group">
              <el-button type="primary" @click="cropImg">确定</el-button>
              <el-button type="info" @click="dialogTableVisible = false">取消</el-button>
            </div>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
// 引入接口函数
import { getUserData, updateFile, updateUser } from "api/user";

// 引入vue-cropper
import { VueCropper } from "vue-cropper";

export default {
  data() {
    return {
      form: {},
      dialogTableVisible: false,
      option: {
        imgFile: "",
        autoCrop: true,
        autoCropWidth: "50%",
        autoCropHeight: "50%",
        fixed: true,
        fixedNumber: [1, 1],
      },
      img: "",
      timerID: 0,
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
        nickname: [
          {
            required: true,
            message: "请输入昵称",
            trigger: ["blur", "change"],
          },
          {
            min: 3,
            max: 10,
            message: "长度再 3 到 6 个字符",
            trigger: ["blur", "change"],
          },
        ],
      },
    };
  },
  methods: {
    // 修改按钮
    async onSubmit() {
      try {
        await this.$refs.form.validate();

        const { status, message } = await updateUser(this.form);
        if (status === 302) {
          this.$alert(message, "修改成功", {
            confirmButtonText: "确定",
            callback: (action) => {
              localStorage.removeItem("token");
              this.$router.push("/login");
            },
          });
        } else {
          this.$message.info(message);
        }
      } catch (error) {
        this.$message.warning("请检查输入是否正确");
      }
    },
    // 头像上传成功的回调
    handleAvatarSuccess() {},
    // 选择头像之后的回调
    handleOnChange(file) {
      this.option.imgFile = URL.createObjectURL(file.raw);
      this.dialogTableVisible = true;
    },
    // 获取用户信息
    async getUserData() {
      const { status, data } = await getUserData();

      if (status === 200) {
        this.form = data;
      }
    },
    // 确认裁剪图片
    cropImg() {
      this.dialogTableVisible = false;

      // 获取裁剪的blob数据
      this.$refs.cropper.getCropBlob(async (data) => {
        const formData = new FormData();
        formData.append("fileName", data);
        // 发送请求
        const res = await updateFile(formData);
        if (res.status === 200) {
          this.form.profile_pic = res.filePath;
          this.$message.success(res.message);
        } else {
          this.$message.info(res.message);
        }
      });
    },
  },
  watch: {
    dialogTableVisible() {
      if (this.dialogTableVisible) {
        this.timerID = setInterval(() => {
          this.$refs.cropper.getCropData((data) => {
            // do something
            this.img = data;
          });
        }, 16.7);
      } else {
        clearInterval(this.timerID);
      }
    },
  },
  created() {
    this.getUserData();
  },
  components: {
    VueCropper,
  },
};
</script>

<style lang="scss" scoped>
.user {
  .form-box {
    width: 600px;
    margin-top: 50px;
  }

  .crop {
    display: flex;
    justify-content: space-around;

    .cropper-box {
      width: 200px;
      height: 200px;
    }

    .show {
      width: 300px;
      height: 150px;
      margin: 10px 0;
      background-color: #ddd;
      border-radius: 5px;

      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .el-avatar {
      margin: 20px;
    }

    .button-group {
      text-align: right;
    }
  }
}
</style>

<style lang="scss">
.user .el-form-item__label,
.user .el-radio__label {
  color: #fff;
}
.user {
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

  .el-button.el-button--primary {
    background-color: #ff5a0a;
    border: 1px solid #ff5a0a;
    color: #fff;

    &:active {
      background-color: #fe9901;
      border: 1px solid #fe9901;
    }
  }

  .el-button.el-button--info {
    &:active {
      background-color: #a6a9ad;
    }
  }
}
</style>
