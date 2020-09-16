<template>
  <div class="post-list">
    <ad-breadcrumb></ad-breadcrumb>
    <!-- 搜索区 -->
    <div class="search-from">
      <el-form ref="searchFrom" :inline="true" :model="searchParams" class="demo-form-inline">
        <el-form-item label="关键词">
          <el-input v-model="searchParams.keyword" placeholder="关键词"></el-input>
        </el-form-item>
        <el-form-item label="分类">
          <el-select v-model="searchParams.category_id" placeholder="分类">
            <el-option label="所有分类" :value="0"></el-option>
            <el-option v-for="item in categorys" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button type="warning" @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 表格区 -->
    <div class="table">
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        header-row-class-name="hi-table-th"
        height="520px"
      >
        <el-table-column type="expand" width="50px">
          <template slot-scope="props">
            <el-input
              type="textarea"
              autosize
              readonly
              placeholder="请输入内容"
              v-html="props.row.content"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column type="index" label="序号" width="50px"></el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="category" label="分类" width="200px"></el-table-column>
        <el-table-column prop="cover" label="封面">
          <template slot-scope="props">
            <div class="cover">
              <img class="cover-img" :src="props.row.cover | addBaseURL" />
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="250px" class-name="editColumn">
          <template slot-scope="scope">
            <hi-button size="mini" type="primary" :data="scope" :handClick="handleEdit">编辑</hi-button>
            <hi-button size="mini" type="info" :data="scope" :handClick="handleDelete">删除</hi-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        class="pagination"
        layout="prev, pager, next"
        :total="total"
        @current-change="currentChange"
      ></el-pagination>
    </div>
    <!-- 编辑模态框 -->
    <div class="edit-post-from">
      <el-dialog title="编辑文章" :visible.sync="dialogFormVisible">
        <el-form :model="editForm">
          <el-form-item label="标题" label-width="80px">
            <el-input v-model="editForm.title" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="分类" label-width="80px">
            <el-select v-model="editForm.category_id" placeholder="请选择分类">
              <el-option
                v-for="item in categorys"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="封面图片" label-width="80px">
            <el-upload
              ref="upload"
              class="upload-demo"
              action="http://localhost:8090"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="fileList"
              :http-request="upload"
              :limit="1"
              list-type="picture"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传一张图片</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="文章内容" label-width="80px">
            <vue-editor v-model="editForm.content" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="editPost">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  getPostList,
  getCategory,
  deletePost,
  uploadPostCover,
  updatePost,
} from "api/api.js";

import { VueEditor } from "vue2-editor";

export default {
  data() {
    return {
      tableData: [],
      categorys: [],
      limit: 4,
      offset: 0,
      index: 1,
      total: 0,
      searchParams: {
        keyword: "",
        category_id: 0,
      },
      // 模态框配置
      dialogFormVisible: false,
      editForm: {},
      fileList: [],
    };
  },
  methods: {
    // 获取分类数据
    async getCategory() {
      const { status, data } = await getCategory();
      if (status === 200) {
        this.categorys = data;
      }
    },
    // 获取文章列表
    async getPostData() {
      const { keyword, category_id } = this.searchParams;
      const { status, data, total } = await getPostList({
        limit: this.limit,
        offset: this.offset,
        keyword,
        category_id,
      });
      if (status === 200) {
        // 给每个数据按照分类id添加分类名称
        data.forEach((item) => {
          let categoryItem = this.categorys.find(
            (category) => category.id === item.category_id
          );
          if (categoryItem) {
            item.category = categoryItem.name;
          } else {
            item.category = "暂无分类";
          }
        });

        this.total = total;
        this.tableData = data;
      }
    },
    // 分页切换按钮
    currentChange(currentPage) {
      // 根据当前页数计算偏移
      this.offset = (currentPage - 1) * this.limit;
      // 重新获得数据
      this.getPostData();
    },
    // 搜索文章按钮
    search() {
      this.getPostData();
    },
    // 重置搜索内容
    resetSearch() {
      this.searchParams = {
        keyword: "",
        category_id: 0,
      };
      this.getPostData();
    },
    // 编辑按钮回调
    handleEdit(data) {
      this.dialogFormVisible = true;
      this.editForm = { ...data.row };
      this.fileList = [
        {
          name: "封面",
          url: this.$options.filters["addBaseURL"](this.editForm.cover),
        },
      ];
    },
    // 删除按钮回调
    handleDelete(data) {
      this.$alert("确定要删除这篇文章吗？", "删除提示", {
        confirmButtonText: "确定删除",
        callback: async (action) => {
          if (action === "confirm") {
            const { status, message } = await deletePost(data.row.id);

            if (status === 200) {
              this.$message.success(message);
              this.getPostData();
            }
          }
        },
      });
    },
    // 模态框移除图片
    handleRemove() {},
    // 模态框图片已上传
    handlePreview() {},
    // 模态框图片自定义上传
    async upload(params) {
      const formData = new FormData();
      const file = params.file;
      const headerConfig = {
        headers: { "Content-Type": "multipart/form-data" },
      };
      if (!file) {
        alert("请选择文件");
        return;
      }
      formData.append("file", file);
      const res = await uploadPostCover(formData);
      const { status, filePath } = res;
      if (status === 200) {
        this.fileList[0].url = this.$options.filters["addBaseURL"](filePath);
        this.editForm.cover = filePath;
      }
    },
    // 编辑完成 确定上传
    async editPost() {
      const res = await updatePost(this.editForm);
      const { status, message } = res;
      if (status === 200) {
        this.$message.success(message);
        this.getPostData();
      }
      this.dialogFormVisible = false;
    },
  },
  async created() {
    await this.getCategory();
    this.getPostData();
  },
  components: {
    VueEditor,
  },
};
</script>

<style lang="scss" scoped>
.post-list {
  .search-from {
    text-align: right;
    color: #fff;
  }

  .table {
    padding-bottom: 5px;
    background-color: #fff;
    text-align: center;

    .cover {
      text-align: center;
      height: 85px;
    }

    .cover-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .pagination {
      margin: 10px 0;
    }
  }
}
</style>

<style lang="scss">
.post-list {
  .hi-table-th,
  .hi-table-th th {
    background-color: #f3843d;
    color: #fff;
  }

  .editColumn {
    text-align: center;
  }
  .search-from .el-form-item__label {
    color: #fff;
  }
}
</style>
