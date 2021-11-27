<template>
  <div class="loginPhone">
    <el-form label-width="60px" :model="loginPhones" :rules="rules" ref="formRef">
      <el-form-item label="手机" prop="phone">
        <el-input v-model="loginPhones.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="loginPhones.password" show-password></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useStore } from 'vuex'
import { ElForm } from 'element-plus'
import 'element-plus/theme-chalk/el-form.css'

// vuex对象
const store = useStore()

// 登录手机 登录密码
const loginPhones = reactive({
  phone: '',
  password: ''
})
// 验证规则
const rules = {
  phone: [
    {required: true, message: '手机号是必填的~', trigger: 'blur'},
    {pattern: /^1[34578][0-9]{9}$/, message: '手机号码格式不正确~', trigger: 'blur'}
  ],
  password: [
    {required: true, message: '密码是必填的~', trigger: 'blur'}
  ]
}
// 验证通过的ref
const formRef = ref<InstanceType<typeof ElForm>>()

// 手机登录
const phoneLoginAction = async () => {
  formRef.value?.validate((valid) => {
    if(valid) {
      store.dispatch('loginModule/phoneLoginActions', {...loginPhones})
    }
    
  })
  
}
// 方法暴漏给父组件
defineExpose({
  phoneLoginAction
})
</script>

<style scoped>

</style>