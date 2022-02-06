const mutations = {
  toggleAddStudent: (state => state.isAddStudent = !state.isAddStudent),
};

const getters = {
    getIsAddStudent: state => state.isAddStudent
};

export default {
  mutations,
  getters,
};
