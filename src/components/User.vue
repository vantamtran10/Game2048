<template>
  <div class="container">
    <div class="row justify-content-md-center">
        <div class="col-9">
              <div class="row input-group">
                <div class="col-2">
                  <label for="username" class="col-form-label ">Name:</label>
                </div>
                <div class="col-8">
                  <input id="username" v-model="username" required class="form-control form-control-lg" type="text" placeholder="Input your name here...">
                </div>
                <div class="col-2">
                  </div>
              </div>
          <div class="row pt-5">
            <button style="width: 70px;" class="btn btn-primary" v-show="isShow" @click="callPlaygame" v-bind:class="{ disabled: disabled === true }">Play</button>

          </div>
        </div>
      <div class="col-3">
        <div type="button" class="btn btn-lg btn-success">Score: <span id="score" >{{ score }}</span></div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "User",
  data: function () {
    return {
      username: '',
      disabled: false,
      isShow: true
    }
  },
  props: {
    score: Number
  },methods: {
    callPlaygame() {
      this.isShow = false;
      this.$emit('playGame');
      this.disabled = true;
    }
  }
}
</script>

<style scoped>
.input{

}
</style>