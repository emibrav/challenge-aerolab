<template>
  <div class="block sm:flex justify-center my-4 max-w-full sm:border-b sm:py-3">
    <div class="sm:flex items-center mx-2 my-2">
      <!-- {{ remaining.length }} of {{ remaining.length }} products -->
    </div>
    <div class="divisor"></div>
    <div class="flex mx-2 items-center justify-center">
      <p class="hidden sm:flex items-center mx-2">Sort by:</p>
      <div class="flex h-10 align-center">
        <button
          class="
            bg-gray-100
            mx-2
            rounded-3xl
            px-3
            text-sm
            lg:text-base
            focus:bg-aerolab focus:ring-3
            active:bg-aerolab
          "
          :class="[myFilter === '' ? 'bg-aerolab' : '']"
          @click="changeFilter('')"
        >
          Most recent
        </button>
        <button
          class="
            bg-gray-100
            mx-2
            rounded-3xl
            px-3
            text-sm
            lg:text-base
            active:bg-aerolab
            focus:bg-aerolab focus:ring-3
          "
          :class="[myFilter === 'lowestPrice' ? 'bg-aerolab' : '']"
          @click="changeFilter('lowestPrice')"
        >
          <!-- {{ totalProducts.length > 0 ? "Holis" : "Chausis" }} -->
          Lowest Price
        </button>
        <button
          class="
            bg-gray-100
            mx-2
            rounded-3xl
            px-3
            text-sm
            lg:text-base
            active:bg-aerolab
            focus:bg-aerolab focus:ring-3
          "
          :class="[myFilter === 'highestPrice' ? 'bg-aerolab' : '']"
          @click="changeFilter('highestPrice')"
        >
          Highest price
        </button>
      </div>
    </div>
    <div class="sm:flex my-3">
      <button class="mr-3">
        <img src="../assets/icons/arrow-left.svg" alt="" />
      </button>
      <button class="">
        <img src="../assets/icons/arrow-right.svg" alt="" />
      </button>
    </div>
  </div>
</template>
<script>
import { ref, inject } from "vue";

export default {
  name: "NavMenu",
  setup() {
    const emitter = inject("emitter");

    const myFilter = ref("");
    const changeFilter = (filterState) => {
      myFilter.value = filterState;
      emitter.emit("myFilter", myFilter.value);
    };

    return {
      myFilter,
      changeFilter,
    };
  },
};
</script>
<style scoped>
.divisor {
  border-left: 1px solid rgb(228, 222, 222);
}
</style>
