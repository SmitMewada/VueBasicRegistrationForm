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
          value: false,
        },
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

      let errors = this.$store.state.errors;
      const requiredError = "Field is required!";
      const lenError = "Phone must be 10 digits";

      this.name.length === 0
        ? errors.nameErrors.push(requiredError)
        : errors.nameErrors.splice(0);
      errors.nameErrors = [...new Set(errors.nameErrors)];

      this.email.length === 0
        ? errors.emailErrors.push(requiredError)
        : errors.emailErrors.splice(0);
      errors.emailErrors = [...new Set(errors.emailErrors)];

      this.phone.length === 0
        ? errors.phoneErrors.push(requiredError)
        : errors.phoneErrors.splice(0);

      this.phone.length !== 10
        ? errors.phoneErrors.push(lenError)
        : errors.phoneErrors.splice(1);
      errors.phoneErrors = [...new Set(errors.phoneErrors)];

      this.college.length === 0
        ? errors.collegeErrors.push(requiredError)
        : errors.collegeErrors.splice(0);
      errors.collegeErrors = [...new Set(errors.collegeErrors)];

      this.course.length === 0
        ? errors.courseErrors.push(requiredError)
        : errors.courseErrors.splice(0);
      errors.courseErrors = [...new Set(errors.courseErrors)];

      this.joiningDate.length === 0
        ? errors.dateErrors.push(requiredError)
        : errors.dateErrors.splice(0);
      errors.dateErrors = [...new Set(errors.dateErrors)];

      this.validateDate(errors.dateErrors);

      this.isValid = this.isValidSubmitBtn();

      if (this.isValid) {
        if (this.id) {
          let students = this.fetchStudents();
          let student = students.find((student) => student.id === this.id);

          if (student) {
            student.name = this.name;
            student.email = this.email;
            student.phone = this.phone;
            student.course = this.course;
            student.college = this.college;
            student.date = this.joiningDate;
            student.isPublished = this.isPublished === "true";
            student.country = this.country;

            students = students.filter((student) => student.id !== this.id);
            students.push(student);

            this.saveStudents(students);

            alert("Form updated successfully!");
            this.$router.push("/students-view");
          }
        } else {
          const student = {
            id: Math.floor(Math.random() * 1000),
            name: this.name,
            email: this.email,
            phone: this.phone,
            course: this.course,
            college: this.college,
            date: this.joiningDate,
            isPublished: this.isPublished === "true",
            country: this.country,
          };

          let students = this.fetchStudents();
          students.push(student);
          this.saveStudents(students);

          alert("Student added Sucessfully!");

          this.$router.push({ name: "students-view" });
        }
      }
    },
    validateControl(event, value, error) {
      const errorName = "Field is required!";
      const phoneLenError = "Phone must be 10 digits";

      if (value.length === 0) {
        if (!error.includes(errorName)) error.push(errorName);
      } else error.splice(0);

      if (event.target.name == "phone") {
        if (value.length !== 10) {
          if (!error.includes(phoneLenError)) error.push(phoneLenError);
        } else error.splice(1);
      }

      this.isValid = this.isValidSubmitBtn();
    },
    validateDate(error) {
      const futureDateError = "It can't be a future date!";
      const reqError = "Field is required!";
      const date = new Date(this.joiningDate);
      const isValidDate =
        new Date(date.toDateString()) < new Date(new Date().toDateString());

      if (this.joiningDate.length === 0) {
        if (!error.includes(reqError)) error.push(reqError);
      } else error.splice(0);

      if (!isValidDate) {
        if (!error.includes(futureDateError)) error.push(futureDateError);
      } else error.splice(1);

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
    saveStudents(students) {
      localStorage.setItem("students", JSON.stringify(students));
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