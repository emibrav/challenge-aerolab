<template>
  <div
    class="
      grid grid-cols-2
      gap-4
      sm:grid-cols-3 sm:w-3/4 sm:m-auto
      lg:grid-cols-4
      mx-4
    "
  >
  <!-- <button @click="alerta">TRY!</button> -->
    <div
      v-for="product in filteredProducts"
      :key="product.id"
      class="
        shadow-xl
        xl:max-w-max
        border
        py-3
        px-3
        mt-3
        mb-4
        cursor-pointer
        group
        relative
        mx-auto
      "
      :class="[
        userPoints >= product.cost
          ? 'transition duration-500 ease-in-out hover:bg-aerolab hover transform hover:-translate-y-2 hover:bg-opacity-80'
          : 'transition duration-400 ease-in-out transform hover:-translate-y-0.5',
      ]"
    >
      <div class="flex justify-center relative">
        <button v-if="userPoints >= product.cost" class="absolute right-0 z-10">
          <img
            src="../assets/icons/buy-blue.svg"
            alt=""
            class="block group-hover:hidden"
          />
          <img
            src="../assets/icons/buy-white.svg"
            alt=""
            class="hidden group-hover:block"
          />
        </button>
        <div
          v-else
          class="
            flex
            absolute
            right-0
            text-sm
            sm:m-2 sm:px-3
            py-2
            rounded-3xl
            bg-opacity-80 bg-gray-500
            items-center
            sm:flex-nowrap
            z-10
          "
        >
          <p class="sm:mr-1 text-white">
            You need +{{ product.cost - userPoints }}
          </p>
          <img src="../assets/icons/coin.svg" alt="" class="h-7" />
        </div>
        <img :src="product.img.url" alt="" class="group-hover:opacity-20" />
      </div>
      <div
        v-if="userPoints >= product.cost"
        class="
          absolute
          top-16
          left-5
          sm:top-12 sm:left-3
          md:left-4 md:top-14
          xl:top-20 xl:left-5
          w-11/12
          hidden
          duration-300
          group-hover:block
        "
      >
        <div class="flex items-center justify-center">
          <p class="text-2xl md:text-3xl font-extrabold mr-2">
            {{ product.cost }}
          </p>
          <img src="../assets/icons/coin.svg" alt="" class="h-6 sm:h-7" />
        </div>
        <div
          @click="redeem(product)"
          class="
            flex
            align-center
            justify-center
            rounded-3xl
            bg-gray-300
            hover:bg-gray-200
            duration-500
            font-semibold
            w-10/12
            h-7
            sm:h-8 sm:text-sm sm:py-2 sm:w-11/12
            md:h-10 md:text-lg md:mt-2
            lg:text-xl
            tracking-wider
          "
        >
          Redeem
        </div>
      </div>
      <div class="divisor"></div>
      <div class="text-left mt-2 group-hover:opacity-30">
        <p class="text-gray-400 text-sm">{{ product.category }}</p>
        <p class="text-gray-500 font-medium">
          {{ product.name }} ${{ product.cost }}
        </p>
      </div>
    </div>
  </div>
  <modal
    v-if="isOpenModal"
    @toggleModal="isOpenModal = false"
    @confirmRedeem="canjear"
    :product="redeemedProduct"
    :isOpenModal="isOpenModal"
    :userPoints="userPoints"
  />
</template>
<script>
import { ref, onMounted, inject, reactive, toRefs, computed } from "vue";
import Modal from "@/components/Modal.vue";

export default {
  name: "Card",
  components: { Modal },
  setup() {
    const emitter = inject("emitter");

    const userPoints = ref(null);
    emitter.on("userPointsLeft", (points) => {
      userPoints.value = points;
    });

    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGYxODczMzY3Mjk2ZTAwMTk5NjQxM2MiLCJpYXQiOjE2MjY0NDE1MjN9.ngEhV91j4aNGzC0bda1dMPN3urkJX8omRziI2Mzs7PQ";
    const headers = {
      "Content-Type": "application/json",
      accept: "application/json",
      authorization: `Bearer ${token}`,
    };
    const loading = ref(null);
    const error = ref(null);
    const data = reactive({
      products: [],
    });

    const fetchData = async () => {
      const response = await fetch(
        "https://coding-challenge-api.aerolab.co/products",
        { headers }
      );
      const fetchedData = await response.json();

      data.products = fetchedData;
      // emitter.emit("totalProducts", data.products);
    };
    onMounted(() => {
      fetchData();
    });

    const redeemedProduct = ref(null);
    const isOpenModal = ref(false);
    const redeem = (product) => {
      redeemedProduct.value = product;
      isOpenModal.value = true;
    };
    const filter = ref("");
    emitter.on("myFilter", (asd) => {
      filter.value = asd;
    });
    const filteredProducts = computed(() => {
      if (filter.value == "") {
        return data.products;
      } else if (filter.value == "highestPrice") {
        return data.products.slice(0, data.products.length/2).sort((a, b) => b.cost - a.cost);
      } else if (filter.value == "lowestPrice") {
        return data.products.slice(0, data.products.length/2).sort((a, b) => a.cost - b.cost);
      }
      return data.products;
    });

    const canjear = (product) => {
      if (userPoints.value >= product.cost) {
        emitter.emit("userPointsLeft", userPoints.value - product.cost);
      }
      isOpenModal.value = false;
    };

    return {
      ...toRefs(data),
      loading,
      error,
      userPoints,
      redeem,
      canjear,
      isOpenModal,
      redeemedProduct,
      filteredProducts,
    };
  },
};
</script>
<style scoped>
.divisor {
  border-bottom: 1px solid rgb(228, 222, 222);
}
.borde {
  border: 1px solid red;
}
</style>
