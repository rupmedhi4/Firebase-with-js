const myModel = document.querySelectorAll('.modal')

async function signup(e) {
    e.preventDefault();
    const email = document.querySelector("#signupEmail").value;
    const password = document.querySelector("#signupPassword").value;
    try {
        const result = await firebase.auth().createUserWithEmailAndPassword(email, password);

       await result.user.updateProfile({
            displayName: "User"
          })
       createUserCollection(result.user) 
      // await firebase.auth().currentUser.sendEmailVerification()
         

        console.log(result);
        M.toast({ html: `welcome ${result.user.email}`, classes: "red" })
    } catch (error) {

        M.toast({ html: error.message, classes: "red" })
    }
    email.value = "";
    password.value = "";
    M.Modal.getInstance(myModel[0]).close()
}


async function login(e) {
    e.preventDefault();
    const email = document.querySelector("#loginEmail").value;
    const password = document.querySelector("#loginPassword").value;
    try {
        const result = await firebase.auth().signInWithEmailAndPassword(email, password)
        console.log(result);
        M.toast({ html: `welcome ${result.user.email}`, classes: "red" })
    } catch (error) {

        M.toast({ html: error.message, classes: "red" })
    }
    email.value = "";
    password.value = "";
    M.Modal.getInstance(myModel[1]).close()
}

function logout() {
    firebase.auth().signOut()
}

const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log(user)
        getuserInfo(user.uid)
    } else {
        getuserInfo(null)
        console.log("signout")
        M.toast({ html: "signout success", classes: "red" })
    }
    
});


async function loginWithGoogle(){

    try{
      var provider = new firebase.auth.GoogleAuthProvider();
      const result = await firebase.auth().signInWithPopup(provider);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }