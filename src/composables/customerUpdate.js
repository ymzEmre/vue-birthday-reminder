import { inject, reactive, ref, computed } from "@vue/runtime-core";
import { useToast } from "primevue/usetoast";
import moment from "moment";
import { required, minLength } from "@vuelidate/validators";

export default function () {
  const appAxios = inject("appAxios");
  const fetchCustomers = inject("fetchCustomers");
  const useVuelidate = inject("useVuelidate");

  const toast = useToast();

  const displayModal = ref(false);

  const selectedCity = ref();

  const updatedata = ref({
    name: null,
    group: null,
    birthday: null,
    _id: null,
  });

  const cities = reactive([{ name: "Family" }, { name: "Friends" }, { name: "Work" }, { name: "Other" }]);

  const submitted = ref(false);
  const showMessage = ref(false);

  const rules = computed(() => ({
    name: { required, minLengthValue: minLength(3) },
    birthday: { required },
    group: { required },
  }));

  const v$ = useVuelidate(rules, updatedata, { $stopPropagation: true });

  const handleSubmit = (isFormValid) => {
    submitted.value = true;

    if (!isFormValid) return;

    updateUser();
    fetchCustomers();
  };

  const updateUser = () => {
    showMessage.value = !showMessage.value;

    const payload = {
      name: updatedata.value.name,
      group: selectedCity.value.name,
      birthday: updatedata.value.birthday,
    };

    appAxios
      .patch(`/customers/${updatedata.value._id}`, payload)
      .then(() => {
        displayModal.value = false;
        toast.add({ severity: "success", summary: "Update", detail: "successful", life: 3000 });
      })
      .catch(() => {
        toast.add({ severity: "error", summary: "Delete", detail: "failed", life: 3000 });
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

  const closeModal = () => {
    displayModal.value = false;
  };

  return {
    displayModal,
    selectedCity,
    cities,
    updatedata,
    openModal,
    closeModal,
    updateUser,
    fetchCustomers,
    submitted,
    v$,
    handleSubmit,
  };
}
