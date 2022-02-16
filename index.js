function getUser() {
  wf_utils.isLoggedIn((user) => {
    console.log(user);
  });
}
