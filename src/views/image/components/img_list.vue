<template>
  <div class="image-container">
      <div style="padding-bottom: 20px;">
        <el-radio-group v-model="collect" size="mini" @change="onloadImage()" :disabled="loading">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <slot name='header'></slot>
        <!-- <el-button class='alone' round size='mini' type='warning' @click='dialogUploadVisible = true' :disabled="loading">上传素材</el-button> -->
      </div>
      <!-- 素材列表 -->
      <el-row :gutter="10">
        <el-col :xs="12" :sm="6" :md="6" :lg="4" v-for='(img,index) in images' :key='index' style="position:relative">
          <el-image
            style="height: 100px"
            :src="img.url"
            fit="cover"
          >
          </el-image>
          <div :class="{'img-item':(active_code != index), 'img_active_bg':(active_code == index)}" @mouseenter="active_code = index" @mouseleave="active_code = null" v-if="collect_and_delete">
              <i
              :class="{'el-icon-star-off':!img.is_collected, 'img-item-icon':true, 'deflault-icon':!img.is_collected, 'active-icon':img.is_collected, 'el-icon-star-on':img.is_collected}"
              @click="oncollectit(img)"
              :diabled = 'loading'
              ></i>
              <i class="el-icon-delete img-item-icon deflault-icon" :diabled = 'loading' @click="onDelete(img)"></i>
          </div>
          <i :class="{'el-icon-check':true, 'check-icon':true, 'check-active':image_active_code == index}" @click="onClick(index,img.url)" v-if="check_select"></i>
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
  </div>
</template>

<script>
import { getImages, collectImage, deleteImage } from '@/api/article.js'
// const user = JSON.parse(window.localStorage.getItem('user'))
export default {
  name: 'imgList',
  components: {},
  props: ['collect_and_delete', 'check_select'],
  data () {
    return {
      radio1: '全部',
      images: [],
      collect: false,
      //   dialogUploadVisible: false,
      //   uploadHeaders: {
      //     Authorization: `Bearer ${user.token}`
      //   },
      totalCount: null,
      pageSize: 20,
      page: 1,
      loading: true,
      active_code: null,
      image_active_code: null,
      image_active_url: null
    }
  },
  computed: {},
  watch: {},
  created () {
    this.onloadImage()
  },
  mounted () {
    this.monitoring_img()
  },
  methods: {
    monitoring_img () {
      this.$on('uploadImg', function () {
        this.onloadImage()
      })
    },
    onloadImage (page = 1) {
      this.loading = true
      getImages({
        page,
        collect: this.collect,
        per_page: this.pageSize
      }).then(res => {
        const { results, total_count: totalCount } = res.data.data
        this.images = results
        this.totalCount = totalCount
        this.loading = false
        this.$emit('getimages', this.images)
      })
    },
    onUploadSuccess () {
      this.$message({
        type: 'info',
        message: '上传图片成功'
      })
      this.onloadImage(this.page)
    },
    onCurrentChange () {
      this.onloadImage(this.page)
    },
    oncollectit (img) {
      this.loading = true
      collectImage(img.id, !img.is_collected).then(res => {
        this.onloadImage(this.page)
      }).catch(() => {
        this.$message({
          type: 'warning',
          message: '收藏失败'
        })
        this.loading = false
      })
    },
    onDelete (img) {
      this.loading = true
      this.$confirm('确定删除吗？', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteImage(img.id).then(res => {
          this.onloadImage(this.page)
          this.loading = false
        }).catch(() => {
          this.$message({
            type: 'warning',
            message: '删除失败'
          })
          this.loading = false
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    onClick (index, url) {
      this.image_active_code = index
      this.image_active_url = url
      this.$emit('showImage', this.image_active_url)
    }
  }
}
</script>

<style scoped lang="less">
.img-item {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100px;
    z-index: 999;
    transition: all 0.3s;
    .img-item-icon {
        color: rgba(255, 255, 255,0);
    }
}
.check-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    font-size: 60px;
    padding: 25px 40px;
    color: rgba(255, 255, 255, 0);
}
.check-active {
    color: rgb(240, 157, 63);
}
.img_active_bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100px;
    z-index: 999;
    transition: all 0.3s;
    background-color: rgba(200, 200, 200, 0.4);
    display: flex;
    align-items: stretch;
    justify-content: center;
    .img-item-icon {
        float: left;
        width: 30px;
        height: 30px;
        font-size: 30px;
        line-height: 100px;
        margin: 0 20px;
        transition: all 0.3s;
    }
    .deflault-icon {
        color:#fff;
    }
    .active-icon {
        color: yellow;
    }
}
</style>
