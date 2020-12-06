<template>
  <div class="preview" @click="showCoverSelect">
    <div class="cover-wrap">
      <img
        class="cover-image"
        ref="cover-image"
        :src="value"
      >
      <i class="el-icon-plus avatar-uploader-icon" v-if="add_icon"></i>
    </div>

    <el-dialog
      title="选择封面"
      :visible.sync="dialogVisible"
      append-to-body
    >
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="first">
          <imgList v-on:showImage='showImage($event)' v-bind:collect_and_delete='false' v-bind:check_select='true'></imgList>
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="second">
          <input
            type="file"
            ref="file"
            @change="onFileChange"
          >
          <img
            width="100"
            ref="preview-image"
          >
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="onCoverConfirm"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { uploadImage } from '@/api/article'
import imgList from '@/views/image/components/img_list'
// import ImageList from '@/views/image/components/image-list'
export default {
  name: 'uploadImg',
  components: {
    imgList
  },
  props: ['value'],
  data () {
    return {
      dialogVisible: false,
      activeName: 'second',
      img_url: null,
      add_icon: true
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    showImage (url) {
      this.img_url = url
    },
    showCoverSelect () {
      // 展示选择封面的弹窗
      this.dialogVisible = true
    },
    onFileChange () {
      // 获取文件对象
      const file = this.$refs.file.files[0]
      // 图片预览
      const blob = window.URL.createObjectURL(file)
      this.$refs['preview-image'].src = blob
      // 防止用户选择同一个文件不触发 change 事件
      // this.$refs.file.value = ''
    },
    onCoverConfirm () {
      // 如果 tab 是上传图片，并且 input-file 有选择的文件，才执行上传图片的操作
      if (this.activeName === 'second') {
        const file = this.$refs.file.files[0]
        if (!file) {
          this.$message('请选择文件')
          return
        }
        // 取消掉加号图标
        this.add_icon = false
        // 执行上传文件的操作
        const fd = new FormData()
        fd.append('image', file)
        uploadImage(fd).then(res => {
          console.log(res)
          // 关闭弹出层
          this.dialogVisible = false
          // 展示上传的图片
          // this.$refs['cover-image'].src = res.data.data.url
          this.$emit('input', res.data.data.url)
        })
      } else if (this.activeName === 'first') {
        if (this.img_url == null) {
          this.$message('请选择封面图片')
          return null
        }
        // 还有一种组件通信方式：父组件可以直接访问子组件中的数据
        // const imageList = this.$refs['image-list']
        // const selected = imageList.selected
        // if (selected === null) {
        //   this.$message('请选择封面图片')
        //   return
        // }
        // 取消掉加号图标
        this.add_icon = false
        // 关闭对话框
        this.dialogVisible = false
        // 修改父组件绑定数据
        this.$emit('input', this.img_url)
      }
    }
  }
}
</script>

<style scoped lang="less">
.cover-wrap {
  position: relative;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  z-index: 10;
  height: 200px;
  width: 200px;
  .cover-image {
    height: 100%;
    z-index: 20;
  }
  i {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    font-size: 40px;
    color: #888;
  }
}
</style>
