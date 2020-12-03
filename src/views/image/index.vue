<template>
  <div class="image-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑路径导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
          <el-breadcrumb-item>素材管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- /面包屑路径导航 -->
        <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
      </div>
      <div style="padding-bottom: 20px;">
        <el-radio-group v-model="collect" size="mini" @change="onloadImage">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button class='alone' round size='mini' type='warning' @click='dialogUploadVisible = true'>上传素材</el-button>
      </div>
      <!-- 素材列表 -->
      <el-row :gutter="10">
        <el-col :xs="12" :sm="6" :md="6" :lg="4" v-for='(img,index) in images' :key='index'>
          <el-image
            style="height: 100px"
            :src="img.url"
            fit="cover"
          ></el-image>
          <div class="img-item">

          </div>
        </el-col>
      </el-row>
      <el-pagination
        layout="prev, pager, next"
        background
        :total="totalCount"
        :page-size='pageSize'
        :current-page.sync='page'
        @current-change='onCurrentChange'
        :disabled='loading'>
      </el-pagination>
    </el-card>
    <el-dialog title="上传素材" :visible.sync='dialogUploadVisible' :append-to-body="true">
        <el-upload
        class="upload-demo"
        drag
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        name='image'
        :headers='uploadHeaders'
        :show-file-list='false'
        :on-success='onUploadSuccess'
        multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
    </el-dialog>

  </div>
</template>

<script>
import { getImages } from '@/api/article.js'
const user = JSON.parse(window.localStorage.getItem('user'))
export default {
  name: 'ImageIndex',
  components: {},
  props: {},
  data () {
    return {
      radio1: '全部',
      images: [],
      collect: false,
      dialogUploadVisible: false,
      uploadHeaders: {
        Authorization: `Bearer ${user.token}`
      },
      totalCount: null,
      pageSize: 20,
      page: 1,
      loading: false
    }
  },
  computed: {},
  watch: {},
  created () {
    this.onloadImage()
  },
  mounted () {},
  methods: {
    onloadImage (page = 1) {
      getImages({
        page,
        collect: this.collect,
        per_page: this.pageSize
      }).then(res => {
        const { results, total_count: totalCount } = res.data.data
        this.images = results
        this.totalCount = totalCount
      })
    },
    onUploadSuccess () {
      this.$message({
        type: 'info',
        message: '上传图片成功'
      })
    },
    onCurrentChange () {
      this.onloadImage(this.page)
    }
  }
}
</script>

<style scoped lang="less">
.alone {
    margin-left: 20px;
}
</style>
