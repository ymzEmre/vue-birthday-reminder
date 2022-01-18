// import { defineEmits } from "vue";
import { useToast } from "primevue/usetoast";
import moment from "moment";
import { reactive } from "@vue/reactivity";
import { inject } from "@vue/runtime-core";
import { ref } from "@vue/reactivity";

export default function () {
  const displayModal = ref(false);
  const selectedCity = ref();
  const cities = reactive([{ name: "Family" }, { name: "Friends" }, { name: "Work" }, { name: "Other" }]);
  // const emit = defineEmits(["customer-update"]);

  const toast = useToast();

  const appAxios = inject("appAxios");

  const updatedata = ref({
    name: null,
    group: null,
    birthday: null,
    _id: null,
  });

  const closeModal = () => {
    displayModal.value = false;
  };

  const updateUser = () => {
    const payload = {
      name: updatedata.value.name,
      group: selectedCity.value.name,
      birthday: updatedata.value.birthday,
    };

    appAxios
      .patch(`/customers/${updatedata.value._id}`, payload)
      .then(() => {
        displayModal.value = false;
        // emit("customer-update");
        toast.add({ severity: "success", summary: "Confirmed", detail: "Record deleted", life: 3000 });
      })
      .catch((error) => {
        console.log(error);
        toast.add({ severity: "error", summary: "Confirmed", detail: "Record deleted", life: 3000 });
      });
  };

  const openModal = (userId, userName, userBirhday, userGroup) => {
    displayModal.value = true;
    updatedata.value = {
      name: userName,
      group: userGroup,
      birthday: moment(userBirhday).format("YYYY-MM-DD"),
      _id: userId,
    };
    selectedCity.value = { name: userGroup };
  };

  return {
    // emit,
    displayModal,
    selectedCity,
    cities,
    updatedata,
    openModal,
    closeModal,
    updateUser,
  };
}
