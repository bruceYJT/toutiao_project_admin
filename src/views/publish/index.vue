<template>
  <div class="publish-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑路径导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{ articleId?'修改文章':'发布文章' }}</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- /面包屑路径导航 -->
      </div>
      <el-form ref='article' :model="article" label-width="40px">
        <el-form-item label="标题">
          <el-input v-model="article.title"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input type="textarea" v-model="article.content"></el-input>
        </el-form-item>
        <el-form-item label="封面">
          <el-radio-group v-model="article.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="article.channel_id" placeholder="请选择频道">
            <el-option v-for='value in channels' :label="value.name" :value="value.id" :key="value.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onPublish(true)">发表</el-button>
          <el-button @click="onPublish(false)" v-show="!$route.query.id">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getArticleChannels, addArticle, getArticle, updateArticle } from '@/api/article'
export default {
  name: 'PublishIndex',
  components: {},
  props: {},
  data () {
    return {
      article: {
        title: '', // 文章标题
        content: '', // 文章内容
        cover: { // 文章封面
          type: 0, // 封面类型 -1:自动，0-无图，1-1张，3-3张
          images: [] // 封面图片的地址
        },
        channel_id: null
      },
      channels: [],
      articleId: this.$route.query.id
    }
  },
  computed: {},
  watch: {},
  created () {
    this.onGetChannels()
    if (this.articleId) {
      this.loadArticle()
      this.$message({
        type: 'info',
        message: '开始请求文章信息'
      })
    }
  },
  mounted () {},
  methods: {
    onGetChannels () {
      getArticleChannels().then(res => {
        this.channels = res.data.data.channels
      })
    },
    onPublish (draft) {
      if (draft) {
        this.$confirm('确定发布文章吗？', '文章发布提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.onaddarticle(true)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消发布'
          })
        })
      } else {
        this.onaddarticle(false)
      }
    },
    onaddarticle (draft) {
      if (this.articleId) {
        updateArticle(this.articleId, this.article, draft).then(() => {
          this.$message({
            type: 'success',
            message: '修改成功'
          })
        }).catch(() => {
          this.$message({
            type: 'error',
            message: '修改失败'
          })
        })
      } else {
        addArticle(this.article, draft).then(() => {
          this.$message({
            type: 'success',
            message: '发布成功'
          })
        }).catch(() => {
          this.$message({
            type: 'error',
            message: '发布失败'
          })
        })
      }
    },
    loadArticle () {
      getArticle(this.articleId).then(res => {
        if (res.data.data) {
          this.article = res.data.data
        }
      }).catch(() => {
        this.$message({
          type: 'error',
          message: '文章读取失败'
        })
      })
    }

  }
}
</script>

<style scoped lang="less"></style>
