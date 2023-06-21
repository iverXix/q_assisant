<template>
  <view class="container">
    <unicloud-db ref="udb" v-slot:default="{data, loading, error, options}" :options="options" :collection="collectionList" field="s_name,s_telephone,s_address,s_level,s_hours,s_category,s_img" :where="queryWhere" :getone="true" :manual="true">
      <view v-if="error">{{error.message}}</view>
      <view v-else-if="loading">
        <uni-load-more :contentText="loadMore" status="loading"></uni-load-more>
      </view>
      <view v-else-if="data">
        <view>
          <text>店名：</text>
          <text>{{data.s_name}}</text>
        </view>
        <view>
          <text>商家电话：</text>
          <text>{{data.s_telephone}}</text>
        </view>
        <view>
          <text>地址：</text>
          <text>{{data.s_address}}</text>
        </view>
        <view>
          <text>档口星级评分：</text>
          <text>{{data.s_level}}</text>
        </view>
        <view>
          <text>营业时间：</text>
          <p>{{data.s_hours}}</p>
        </view>
        <view>
          <text>种类：</text>
          <text>{{data.s_category}}</text>
        </view>
        <view>
          <text>照片：</text>
          <uni-file-picker v-if="data.s_img && data.s_img.fileType == 'image'" :value="data.s_img" :file-mediatype="data.s_img && data.s_img.fileType" return-type="object" readonly></uni-file-picker>
          <uni-link v-else-if="data.s_img" :href="data.s_img.url" :text="data.s_img.url"></uni-link>
          <text v-else></text>
        </view>
      </view>
    </unicloud-db>
    <view class="btns">
      <button type="primary" @click="handleUpdate">修改</button>
      <button type="warn" class="btn-delete" @click="handleDelete">删除</button>
    </view>
  </view>
</template>

<script>
  // 由schema2code生成，包含校验规则和enum静态数据
  import { enumConverter } from '../../../js_sdk/validator/shops.js'
  const db = uniCloud.database()

  export default {
    data() {
      return {
        queryWhere: '',
        collectionList: "shops",
        loadMore: {
          contentdown: '',
          contentrefresh: '',
          contentnomore: ''
        },
        options: {
          // 将scheme enum 属性静态数据中的value转成text
          ...enumConverter
        }
      }
    },
    onLoad(e) {
      this._id = e.id
    },
    onReady() {
      if (this._id) {
        this.queryWhere = '_id=="' + this._id + '"'
      }
    },
    methods: {
      handleUpdate() {
        // 打开修改页面
        uni.navigateTo({
          url: './edit?id=' + this._id,
          events: {
            // 监听修改页面成功修改数据后, 刷新当前页面数据
            refreshData: () => {
              this.$refs.udb.loadData({
                clear: true
              })
            }
          }
        })
      },
      handleDelete() {
        this.$refs.udb.remove(this._id, {
          success: (res) => {
            // 删除数据成功后跳转到list页面
            uni.navigateTo({
              url: './list'
            })
          }
        })
      }
    }
  }
</script>

<style>
  .container {
    padding: 10px;
  }

  .btns {
    margin-top: 10px;
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    flex-direction: row;
  }

  .btns button {
    flex: 1;
  }

  .btn-delete {
    margin-left: 10px;
  }
</style>
