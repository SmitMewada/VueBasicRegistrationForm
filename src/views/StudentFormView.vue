<template>
  <div class="container">
    <form @submit="onSubmit($event)" autocomplete="off">
      <Input
        type="text"
        label="Name:"
        placeholder="Name"
        v-model="name"
        name="name"
        @keyup="validateControl($event, name, errors.nameErrors)"
        :errors="errors.nameErrors"
        :value="name"
      />
      <Input
        type="email"
        label="E-mail:"
        placeholder="Email"
        v-model="email"
        name="email"
        :errors="errors.emailErrors"
        @keyup="validateControl($event, email, errors.emailErrors)"
        :value="email"
      />
      <Input
        type="text"
        label="Phone:"
        placeholder="Phone"
        v-model="phone"
        name="phone"
        :errors="errors.phoneErrors"
        @keyup="validateControl($event, phone, errors.phoneErrors)"
        :value="phone"
      />
      <Input
        type="text"
        label="Course:"
        placeholder="Course"
        v-model="course"
        name="course"
        :errors="errors.courseErrors"
        @keyup="validateControl($event, course, errors.courseErrors)"
        :value="course"
      />
      <Input
        type="text"
        label="College:"
        placeholder="College"
        v-model="college"
        name="college"
        :errors="errors.collegeErrors"
        @keyup="validateControl($event, college, errors.collegeErrors)"
        :value="college"
      />

      <Dropdown
        label="Country"
        :options="countries"
        v-model="country"
        :value="country"
      />

      <BinaryRadios
        label="Is published?"
        v-model="isPublished"
        :data="radioData"
        :value="radioValue"
      />
      <Input
        type="date"
        label="Joining Date:"
        v-model="joiningDate"
        name="joiningDate"
        @change="validateDate(errors.dateErrors)"
        :errors="errors.dateErrors"
        @keyup="validateControl($event, college, errors.dateErrors)"
        :value="joiningDate"
      />
      <Button
        type="submit"
        :text="id ? 'Update' : 'Add'"
        btnClass="btn-show"
        :disabled="isValid ? false : true"
        :style="isValid ? { opacity: 1 } : { opacity: 0.5 }"
      />
    </form>
  </div>
</template>

<script>
import Input from "../components/Input.vue";
import Dropdown from "../components//Dropdown.vue";
import BinaryRadios from "../components//BinaryRadios.vue";
import Button from "../components//Button.vue";

export default {
  name: "Form",
  components: {
    Input,
    Dropdown,
    BinaryRadios,
    Button,
  },
  data() {
    return {
      countries: ["USA", "Canada", "India", "UK"],
      radioValue: undefined,
      name: "",
      email: "",
      phone: "",
      course: "",
      college: "",
      joiningDate: "",
      isPublished: "",
      country: "",
      errors: this.$store.state.errors,
      isValid: true,
      id: "",
      radioData: [
        {
          label: "Yes",
          value: true,
        },
        {
            label: "No",
            value: false
        }
      ],
    };
  },
  created() {
    this.id = parseInt(this.$route.params.id);

    if (this.id) {
      const students = this.fetchStudents();

      const student = students.find((student) => student.id === this.id);

      if (student) {
        this.name = student.name;
        this.email = student.email;
        this.phone = student.phone;
        this.course = student.course;
        this.college = student.college;
        this.joiningDate = student.date;
        this.country = student.country;
        this.radioValue = student.isPublished;
        this.isPublished = student.isPublished;
        
      } else {
        alert("Student not found!");
        this.id = "";
        this.$router.push({ name: "StudenFormView" });
      }
    }
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
    },
    validateControl(event, value, error) {
      const errorName = "It is required!";
      const phoneLenError = "Phone must be 10 digits!";

      value.length === 0
        ? !error.includes(errorName) && error.push(errorName)
        : error.pop(errorName);

      if (event.target.name == "phone") {
        value.length !== 10
          ? !error.includes(phoneLenError) && error.push(phoneLenError)
          : error.pop(phoneLenError);
      }

      this.isValid = this.isValidSubmitBtn();
    },
    validateDate(error) {
      const futureDateError = "It can't be a future date!";
      const date = new Date(this.joiningDate);
      const isValidDate =
        new Date(date.toDateString()) < new Date(new Date().toDateString());

      !isValidDate
        ? !error.includes(futureDateError) && error.push(futureDateError)
        : error.pop(futureDateError);

      this.isValid = this.isValidSubmitBtn();
    },
    isValidSubmitBtn() {
      return (
        this.errors.nameErrors.length === 0 &&
        this.errors.emailErrors.length === 0 &&
        this.errors.phoneErrors.length === 0 &&
        this.errors.courseErrors.length === 0 &&
        this.errors.collegeErrors.length === 0 &&
        this.errors.dateErrors.length === 0
      );
    },
    fetchStudents() {
      return JSON.parse(localStorage.getItem("students"));
    },
  },
};
</script>

<style scoped>
form {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  flex-direction: column;
  margin: 0 auto;
  margin-bottom: 5rem;
}

.date {
  padding: 0.7rem 1rem;
  border-radius: 00.5rem;
  border: 1px solid black;
}
p {
  color: red;
}
</style>