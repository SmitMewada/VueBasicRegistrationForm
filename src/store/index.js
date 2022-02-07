import { createStore } from "vuex";
import Button from "./modules/Button";
import Students from "./modules/Students";

export default createStore({
  state: {
    isAddStudent: false,
    errors: {
      nameErrors: [],
      emailErrors: [],
      courseErrors: [],
      collegeErrors: [],
      phoneErrors: [],
      dateErrors: [],
      countryErrors: [],
    },
    student: {
      name: "",
      email: "",
      phone: "",
      course: "",
      college: "",
      joiningDate: "",
      isPublished: "",
      country: "",
    },
  },
  mutations: {},
  actions: {},
  modules: {
    Button,
    Students,
  },
});
