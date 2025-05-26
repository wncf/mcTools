<template>
  <div id="map">12</div>
</template>
<script>
export default {
  name: "TorrentPlayer",
  data() {
    return {};
  },
  mounted() {
    this.test();
  },
  methods: {
    test() {
      console.log(aimap, "aimap");
      aimap.accessToken = "r2r13QrWQlqhLOSKQrUCPTUjYP9VTybz";
      new aimap.Map({
        container: "map",
        center: [121.612846, 31.205494],
        style: "aimap://styles/aimap/normal-v4",
        localIdeographFontFamily: "'Microsoft YaHei'",
      });
    },
  },
};
</script>

<style scoped>
#map {
  height: 430px;
  width: 100%;
}
</style>
