<template>
  <md-card class="md-layout-item md-size-50 md-small-size-100 base-card">
    <md-card-header>
      <div class="md-title">
        <slot name="header"></slot>
          <div class="md-subhead">
            <slot name="subhead"></slot>
          </div>
      </div>
    </md-card-header>
    <md-card-content>
      <slot name="content"></slot>
    </md-card-content>
    <md-card-actions>
      <slot name="actions"></slot>
    </md-card-actions>
  </md-card>
</template>
<script>
export default {
  name: "message-card",
};
</script>
<style scoped>
.base-card {
  color: black;
  margin: 0 auto;
  margin-top: 25px;
}
</style>