<template>
  <view class="uni-container">
    <uni-forms ref="form" :model="formData" validate-trigger="submit" err-show-type="toast">
      <uni-forms-item name="user_id" label="">
        <uni-easyinput placeholder="用户id" v-model="formData.user_id"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="s_name" label="">
        <uni-easyinput placeholder="店铺名字" v-model="formData.s_name"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="nickname" label="昵称">
        <uni-easyinput placeholder="用户昵称，登录获取的" v-model="formData.nickname"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="avatarUrl" label="头像">
        <uni-easyinput placeholder="用户头像图片的 URL，登录获取的" v-model="formData.avatarUrl"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="all_score" label="">
        <uni-easyinput placeholder="总体得分情况" type="number" v-model="formData.all_score"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="content" label="评论内容">
        <uni-easyinput placeholder="评论内容" v-model="formData.content" trim="both"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="u_level" label="用户等级">
        <uni-easyinput placeholder="用户等级" v-model="formData.u_level"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="imageValue" label="图片列表">
        <uni-file-picker file-mediatype="image" file-extname="jpg,png" :limit="9" return-type="array" v-model="formData.imageValue"></uni-file-picker>
      </uni-forms-item>
      <view class="uni-button-group">
        <button type="primary" class="uni-button" @click="submit">提交</button>
      </view>
    </uni-forms>
  </view>
</template>

<script>
  import { validator } from '../../../js_sdk/validator/food-evaluate.js';

  const db = uniCloud.database();
  const dbCollectionName = 'food-evaluate';

  function getValidator(fields) {
    let result = {}
    for (let key in validator) {
      if (fields.indexOf(key) > -1) {
        result[key] = validator[key]
      }
    }
    return result
  }

  

  export default {
    data() {
      let formData = {
        "user_id": "",
        "s_name": "",
        "nickname": "",
        "avatarUrl": "",
        "all_score": null,
        "content": "",
        "u_level": "",
        "imageValue": []
      }
      return {
        formData,
        formOptions: {},
        rules: {
          ...getValidator(Object.keys(formData))
        }
      }
    },
    onLoad(e) {
      if (e.id) {
        const id = e.id
        this.formDataId = id
        this.getDetail(id)
      }
    },
    onReady() {
      this.$refs.form.setRules(this.rules)
    },
    methods: {
      
      /**
       * 验证表单并提交
       */
      submit() {
        uni.showLoading({
          mask: true
        })
        this.$refs.form.validate().then((res) => {
          return this.submitForm(res)
        }).catch(() => {
        }).finally(() => {
          uni.hideLoading()
        })
      },

      /**
       * 提交表单
       */
      submitForm(value) {
        // 使用 clientDB 提交数据
        return db.collection(dbCollectionName).doc(this.formDataId).update(value).then((res) => {
          uni.showToast({
            icon: 'none',
            title: '修改成功'
          })
          this.getOpenerEventChannel().emit('refreshData')
          setTimeout(() => uni.navigateBack(), 500)
        }).catch((err) => {
          uni.showModal({
            content: err.message || '请求服务失败',
            showCancel: false
          })
        })
      },

      /**
       * 获取表单数据
       * @param {Object} id
       */
      getDetail(id) {
        uni.showLoading({
          mask: true
        })
        db.collection(dbCollectionName).doc(id).field("user_id,s_name,nickname,avatarUrl,all_score,content,u_level,imageValue").get().then((res) => {
          const data = res.result.data[0]
          if (data) {
            this.formData = data
            
          }
        }).catch((err) => {
          uni.showModal({
            content: err.message || '请求服务失败',
            showCancel: false
          })
        }).finally(() => {
          uni.hideLoading()
        })
      }
    }
  }
</script>

<style>
  .uni-container {
    padding: 15px;
  }

  .uni-input-border,
  .uni-textarea-border {
    width: 100%;
    font-size: 14px;
    color: #666;
    border: 1px #e5e5e5 solid;
    border-radius: 5px;
    box-sizing: border-box;
  }

  .uni-input-border {
    padding: 0 10px;
    height: 35px;

  }

  .uni-textarea-border {
    padding: 10px;
    height: 80px;
  }

  .uni-button-group {
    margin-top: 50px;
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    justify-content: center;
  }

  .uni-button {
    width: 184px;
  }
</style>
