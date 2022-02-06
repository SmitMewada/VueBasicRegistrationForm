<template>
  <div class="container">
    <form action="" @submit="onSubmit($event)">
      <Input
        type="text"
        label="Name:"
        placeholder="Name"
        v-model="name"
        name="name"
        @keyup="validateControl($event, name, errors.nameErrors)"
        :errors="errors.nameErrors"
      />
      <Input
        type="email"
        label="E-mail:"
        placeholder="Email"
        v-model="email"
        name="email"
        :errors="errors.emailErrors"
        @keyup="validateControl($event, email, errors.emailErrors)"
      />
      <Input
        type="text"
        label="Phone:"
        placeholder="Phone"
        v-model="phone"
        name="phone"
        :errors="errors.phoneErrors"
        @keyup="validateControl($event, phone, errors.phoneErrors)"
      />
      <Input
        type="text"
        label="Course:"
        placeholder="Course"
        v-model="course"
        name="course"
        :errors="errors.courseErrors"
        @keyup="validateControl($event, course, errors.courseErrors)"
      />
      <Input
        type="text"
        label="College:"
        placeholder="College"
        v-model="college"
        name="college"
        :errors="errors.collegeErrors"
        @keyup="validateControl($event, college, errors.collegeErrors)"
      />

      <Dropdown label="Country" :options="countries" v-model="country" />

      <BinaryRadios
        label="Is published?"
        label1="Yes"
        label2="No"
        v-model="isPublished"
      />
      <Input
        type="date"
        label="Joining Date:"
        v-model="joiningDate"
        name="joiningDate"
        @change="validateDate(errors.dateErrors)"
        :errors="errors.dateErrors"
        @keyup="validateControl($event, college, errors.dateErrors)"
      />
      <Button
        type="submit"
        text="Submit"
        btnClass="btn-show"
        :disabled="isValid ? false : true"
        :style="isValid ? { opacity: 1 } : { opacity: 0.5 }"
      />
    </form>
  </div>
</template>

<script>
import Input from "./Input.vue";
import Dropdown from "./Dropdown.vue";
import BinaryRadios from "./BinaryRadios.vue";
import Button from "./Button.vue";

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
    };
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();


      console.log(JSON.parse(localStorage.getItem("students")) )
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