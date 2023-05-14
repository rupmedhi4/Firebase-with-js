const myModel = document.querySelectorAll('.modal')

async function signup(e) {
    e.preventDefault();
    const email = document.querySelector("#signupEmail").value;
    const password = document.querySelector("#signupPassword").value;
    try {
        const result = await firebase.auth().createUserWithEmailAndPassword(email, password);
        console.log(result);
        M.toast({ html: `welcome ${result.user.email}`, classes: "red" })
    } catch (error) {

        M.toast({ html: error.message, classes: "red" })
    }
    email.value = "";
    password.value = "";
    M.Modal.getInstance(myModel[0]).close()
}


