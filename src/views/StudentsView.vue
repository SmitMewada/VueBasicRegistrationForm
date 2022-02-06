<template>
  <div class="container">
    <div class="header">
      <h1>Students</h1>
      <input
        placeholder="Search"
        class="input"
        v-model="searchValue"
        @keyup="searchStudent"
      />
    </div>

    <table>
      <thead>
        <th>id</th>
        <th>Name</th>
        <th>E-mail</th>
        <th>Phone</th>
        <th>Course</th>
        <th>College</th>
        <th>Country</th>
        <th>Is Published?</th>
        <th>Joining date</th>
        <th>Actions</th>
      </thead>
      <tbody>
        <tr v-for="(student, index) in dummyStudents" :key="index">
          <td>{{ student.id }}</td>
          <td>{{ student.name }}</td>
          <td>{{ student.email }}</td>
          <td>{{ student.phone }}</td>
          <td>{{ student.course }}</td>
          <td>{{ student.college }}</td>
          <td>{{ student.country }}</td>
          <td>{{ student.isPublished ? "Yes" : "No" }}</td>
          <td>{{ student.date }}</td>
          <td>
            <div class="actions">
              <router-link :to='"/"+student.id'>
                <i class="fas fa-edit"></i>
              </router-link>

              <i class="fas fa-trash"></i>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "ViewStudents",
  data() {
    return {
      students: [],
      searchValue: "",
      dummyStudents: [],
    };
  },
  created() {
    this.students = JSON.parse(localStorage.getItem("students"));
    this.dummyStudents = this.students;
  },
  methods: {
    searchStudent() {
      this.dummyStudents = this.students.filter((student) =>
        student.name.startsWith(this.searchValue)
      );
    },
  },
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-content: center;
  flex-direction: row;
  margin: 1rem 0;
}
input {
  padding: 0.7rem 1rem;
  border-radius: 00.5rem;
  border: 1px solid black;
  width: 20rem;
}

.container {
  padding: 0 7rem;
  height: 80vh;
}

table {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

table td,
table th {
  border: 1px solid #ddd;
  padding: 8px;
}

table tr:nth-child(even) {
  background-color: #f2f2f2;
}

table tr:hover {
  background-color: #ddd;
}

table th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: rgb(3, 156, 207);
  color: white;
}

.actions {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
i {
  cursor: pointer;
}

.fa-trash {
  color: red;
}

.fa-edit {
  color: rgb(3, 156, 207);
}
</style>