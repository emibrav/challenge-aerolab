<template>
  <div>
    <SupraMenu />
    <FrontImage />
    <NavMenu />
    <Card />
  </div>
</template>

<script>
// @ is an alias to /src
import SupraMenu from "@/components/SupraMenu.vue";
import FrontImage from "@/components/FrontImage.vue";
import NavMenu from "@/components/NavMenu.vue";
import Card from "@/components/Card.vue";

export default {
  name: "Home",
  components: {
    SupraMenu,
    FrontImage,
    NavMenu,
    Card,
  },
};
</script>
