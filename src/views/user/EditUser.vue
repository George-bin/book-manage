<template>
  <div class="edit-user-component">
    <c-header title="更新用户" :back-btn="true"></c-header>
    <br>
    <user-info use-type="edit" ref="userInfo">
      <template v-slot:btnGroup>
        <el-button :loading="loading" type="primary" size="small" @click="handleSubmit">提交</el-button>
      </template>
    </user-info>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: '',
  props: {},
  components: {
    CHeader: () => import('@/components/common/CHeader'),
    UserInfo: () => import('@/components/user/UserInfo')
  },
  data () {
    return {
      loading: false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    ...mapActions([
      'GetUserById',
      'UpdateUser'
    ]),
    handleSubmit () {
      console.log(this.$refs.userInfo.formData)
      this.$refs['userInfo'].$refs['form'].validate((valid) => {
        if (valid) {
          let data = this.$refs['userInfo'].formData
          data = JSON.parse(JSON.stringify(data))
          this.loading = true
          this.UpdateUser(data)
            .then(res => {
              let { code, msg } = res
              if (code === null) {
                this.$message({
                  type: 'success',
                  message: '更新用户成功！'
                })
                this.$router.back()
              } else {
                this.$message({
                  type: 'warning',
                  message: msg
                })
              }
            })
            .catch(err => {
              console.error('更新用户失败：', err)
              this.$message({
                type: 'error',
                message: '更新用户失败！'
              })
            })
            .finally(() => {
              this.loading = false
            })
        } else {
          this.$message({
            type: 'warning',
            message: '请完善必要信息！'
          })
        }
      })
    }
  }
}
</script>

<style lang="scss">
</style>
