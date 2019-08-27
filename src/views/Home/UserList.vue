<template>
  <div class="user-list-main-component">
    <h2 class="user-info-title">用户列表</h2>
    <div class="user-info-content">
      <ul>
        <li v-for="user in userList" :key="user._id">
          <p>{{user.name}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {}
  },
  computed: {
    ...mapState({
      userList: state => state.home.userList
    })
  },
  mounted () {
    this.GetUserList()
  },
  methods: {
    ...mapActions([
      'GetUserList'
    ])
  }
}
</script>

<style lang="scss">
  .user-list-main-component {}
</style>
