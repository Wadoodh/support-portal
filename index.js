function getUser() {
  wf_utils.isLoggedIn((loggedIn) => {
    if (loggedIn) {
      wf_utils.getUser((user) => {
        let email = user.email;
        let name = user.name;

        console.log(user);
      });
    }
  });
}
