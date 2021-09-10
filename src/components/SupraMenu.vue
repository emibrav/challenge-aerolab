<template>
  <div class="">
    <div
      class="fixed z-10 w-full bg-white flex justify-between py-2 px-2 border-b"
    >
      <img src="../assets/aerolab-logo.svg" alt="" />
      <div class="flex items-center">
        <p class="mr-3">{{ user.name }}</p>
        <div
          class="
            flex
            items-center
            justify-center
            rounded-full
            bg-gray-200
            py-3
            px-6
            h-10
            w-24
          "
        >
          <p class="mr-1">{{ userPoints }}</p>
          <img src="../assets/icons/coin.svg" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { onMounted, reactive, toRefs, inject, ref } from "vue";

export default {
  name: "SupraMenu",
  setup() {
    const emitter = inject("emitter");

    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGYxODczMzY3Mjk2ZTAwMTk5NjQxM2MiLCJpYXQiOjE2MjY0NDE1MjN9.ngEhV91j4aNGzC0bda1dMPN3urkJX8omRziI2Mzs7PQ";
    const headers = {
      "Content-Type": "application/json",
      // eslint-disable-next-line prettier/prettier
      "accept": "application/json",
      // eslint-disable-next-line prettier/prettier
      "authorization": `Bearer ${token}`,
    };
    const data = reactive({
      user: {},
    });

    const fetchData = async () => {
      const response = await fetch(
        "https://coding-challenge-api.aerolab.co/user/me",
        { headers }
      );
      const fetchedData = await response.json();

      data.user = fetchedData;
      emitter.emit("userPointsLeft", data.user.points);
    };
    const userPoints = ref(null);
    emitter.on("userPointsLeft", (points) => {
      userPoints.value = points;
    });

    onMounted(() => {
      fetchData();
    });
    return { ...toRefs(data), userPoints };
  },
};
</script>
