<template>
  <div class="blog-release">
    <hi-breadcrumb></hi-breadcrumb>
    <div class="blog-form">
      <el-form :model="blog">
        <el-form-item label="标题" label-width="80px">
          <el-input v-model="blog.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="简介" label-width="80px">
          <el-input type="textarea" v-model="blog.desc"></el-input>
        </el-form-item>
        <el-form-item label="分类" label-width="80px">
          <el-select v-model="blog.categoryId" placeholder="请选择分类">
            <el-option
              v-for="item in categorys"
              :key="item.id"
              :label="item.category + ' ' + item.code"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="封面图片" label-width="80px">
          <el-upload
            ref="upload"
            class="avatar-uploader"
            action="http://localhost:8090"
            :http-request="upload"
            :limit="1"
            :show-file-list="false"
          >
            <img
              :src="blog.cover"
              class="avatar"
              v-if="blog.cover"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="文章内容" label-width="80px">
            <div class="editor-box">
              <mavon-editor v-model="blog.content" :subfield="false" />
            </div>
        </el-form-item>
        <el-form-item label-width="80px">
          <el-button type="primary" @click="submit">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getCategory, releaseBlog } from 'api/blog'
import { uploadFile } from 'api/file'

import { VueEditor } from 'vue2-editor'

export default {
  name: 'BlogPost',
  data() {
    return {
      blog: {
        title: '',
        categoryId: null,
        content: '',
        desc: '',
        cover: ''
      },
      categorys: []
    }
  },
  methods: {
    // 获取分类数据
    async getCategory() {
      const { status, data } = await getCategory()
      if (status === 200) {
        this.categorys = data
      }
    }, // 模态框图片自定义上传
    async upload(params) {
      const formData = new FormData()
      const file = params.file
      if (!file) {
        alert('请选择文件')
        return
      }
      formData.append('file', file)
      const res = await uploadFile(formData)
      const { status, url } = res
      if (status === 200) {
        this.blog.cover = url
      }
    },
    submit() {
      this.$alert('确认发布文章吗？', '提示', {
        confirmButtonText: '发布',
        callback: async (action) => {
          if (action === 'confirm') {
            const { status, message } = await releaseBlog(this.blog)

            console.log(1)
            if (status === 200) {
              this.$message.success(message)
              this.blog = {
                title: '',
                categoryId: null,
                content: '',
                desc: '',
                cover: ''
              }
            } else {
              this.$message.warning(message)
            }
          }
        }
      })
    }
  },
  created() {
    this.getCategory()
  },
  components: {
    VueEditor
  }
}
</script>

<style lang="scss" scoped>
.blog-release {
  .blog-form {
    margin-top: 40px;
    padding: 20px 20px 8px 20px;
    background-color: #fff;
    border-radius: 5px;

    .title {
      font-weight: normal;
      font-size: 24px;
      color: #333;
      margin: 20px 0;
    }

    .el-input {
      width: 400px;
    }
  }
}
</style>

<style lang="scss">
.blog-release {
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
  
  .editor-box {
    height: 300px;
    overflow-y: auto;
  }
}
</style>
