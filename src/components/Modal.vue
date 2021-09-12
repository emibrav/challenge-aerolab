<template>
  <div class="fixed z-10 top-0 left-0 darky table h-full w-full">
    <div class="table-cell align-middle">
      <div
        class="
          w-3/4
          sm:w-2/4
          2xl:w-1/4
          items-center
          mx-auto
          px-2
          py-4
          md:px-8 md:py-10
          bg-white
          rounded-md
          flex flex-col
          align-center
        "
      >
        <div
          class="
            text-aerolab
            font-semibold
            text-2xl
            sm:text-3xl
            mb-2
            sm:mb-3
            lg:mb-4
            xl:mb-5
          "
        >
          You have {{ userPoints }} points!
          <br />
          Confirm your buy:
        </div>
        <img :src="product.img.url" alt="" class="mb-2 h-28" />
        <div class="mt-0 font-bold text-lg">{{ product.name }}</div>
        <div class="flex justify-center my-2 items-center">
          <div class="font-semibold text-xl">
            {{ product.cost }}
          </div>
          <img src="../assets/icons/coin.svg" alt="" class="h-8 pt-1 ml-1" />
        </div>
        <div class="flex flex-col w-11/12 justify-center min-h-full mt-6">
          <button
            @click="$emit('confirmRedeem', product)"
            class="
              px-3
              py-1
              w-11/12
              mx-auto
              font-bold
              text-lg
              bg-aerolab
              text-white
              rounded-xl
              mb-2
            "
          >
            Redeem
          </button>
          <button
            @click="$emit('toggleModal')"
            class="
              px-3
              py-1              
              w-11/12
              mx-auto
              font-bold
              text-md
              border
              rounded-xl
              text-gray-500
              hover:bg-gray-100
            "
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    isOpenModal: {
      type: Boolean,
      required: true,
      default: false,
    },
    product: {
      type: Object,
      required: true,
    },
    userPoints: {
      type: Number,
      required: true,
    },
  },
  emits: ["toggleModal", "confirmRedeem"],
  setup(emit) {
    const toggleModal = (toggle) => {
      emit("toggleModal", toggle);
    };

    const confirmRedeem = (product) => {
      emit("confirmRedeem", product);
    };

    return { toggleModal, confirmRedeem };
  },
};
</script>
<style>
.darky {
  background-color: rgba(0, 0, 0, 0.5);
}
.modal-enter {
  opacity: 0;
}
.modal-leave-active {
  opacity: 0;
}
.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
