<template>
  <div class="add-user-component">
    <c-header title="新增用户" :back-btn="true"></c-header>
    <br>
    <user-info use-type="add" ref="userInfo">
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
      'AddUser'
    ]),
    handleSubmit () {
      console.log(this.$refs.userInfo.formData)
      this.$refs['userInfo'].$refs['form'].validate((valid) => {
        if (valid) {
          let data = this.$refs['userInfo'].formData
          data = JSON.parse(JSON.stringify(data))
          this.loading = true
          this.AddUser(data)
            .then(res => {
              let { code, msg } = res
              if (code === null) {
                this.$message({
                  type: 'success',
                  message: '新增用户成功！'
                })
              } else {
                this.$message({
                  type: 'warning',
                  message: msg
                })
              }
            })
            .catch(err => {
              console.error('新增用户失败：', err)
              this.$message({
                type: 'error',
                message: '新增用户失败！'
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
