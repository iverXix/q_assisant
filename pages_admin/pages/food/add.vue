<template>
  <view class="uni-container">
    <uni-forms ref="form" :model="formData" validate-trigger="submit" err-show-type="toast">
      <uni-forms-item name="f_name" label="食物名称">
        <uni-easyinput placeholder="食物名称" v-model="formData.f_name"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="s_name" label="档口名称">
        <uni-easyinput placeholder="档口名称" v-model="formData.s_name"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="f_img" label="食物图片">
        <uni-file-picker file-mediatype="image" file-extname="jpg,png" return-type="object" v-model="formData.f_img"></uni-file-picker>
      </uni-forms-item>
      <uni-forms-item name="f_price" label="食物价格">
        <uni-easyinput placeholder="食物价格" v-model="formData.f_price"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="f_recom" label="推荐人次">
        <uni-easyinput placeholder="推荐人次" type="number" v-model="formData.f_recom"></uni-easyinput>
      </uni-forms-item>
      <view class="uni-button-group">
        <button type="primary" class="uni-button" @click="submit">提交</button>
      </view>
    </uni-forms>
  </view>
</template>

<script>
  import { validator } from '../../../js_sdk/validator/food.js';

  const db = uniCloud.database();
  const dbCollectionName = 'food';

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
        "f_name": "",
        "s_name": "",
        "f_img": null,
        "f_price": "",
        "f_recom": null
      }
      return {
        formData,
        formOptions: {},
        rules: {
          ...getValidator(Object.keys(formData))
        }
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
        return db.collection(dbCollectionName).add(value).then((res) => {
          uni.showToast({
            icon: 'none',
            title: '新增成功'
          })
          this.getOpenerEventChannel().emit('refreshData')
          setTimeout(() => uni.navigateBack(), 500)
        }).catch((err) => {
          uni.showModal({
            content: err.message || '请求服务失败',
            showCancel: false
          })
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
