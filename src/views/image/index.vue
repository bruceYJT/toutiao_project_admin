<template>
  <div class="image-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑路径导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
          <el-breadcrumb-item>素材管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <imgList ref="imgList" v-on:getimages='getimages($event)' v-bind:collect_and_delete='true' v-bind:check_select='false'>
        <template v-slot:header>
            <el-button class='alone' round size='mini' type='warning' @click='dialogUploadVisible = true' :disabled="loading">上传素材</el-button>
        </template>
      </imgList>
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
import imgList from './components/img_list'
const user = JSON.parse(window.localStorage.getItem('user'))

export default {
  name: 'ImageIndex',
  components: {
    imgList
  },
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
      loading: false
    //   active_code: null
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {
    this.$refs.imgList.$emit('uploadImg')
  },
  methods: {
    getimages (imagesData) {
      this.images = imagesData
    },
    onUploadSuccess () {
      this.$message({
        type: 'info',
        message: '上传图片成功'
      })
      this.$refs.imgList.$emit('uploadImg')
    }
  }
}
</script>

<style scoped lang="less">
.alone {
    margin-left: 20px;
}
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
