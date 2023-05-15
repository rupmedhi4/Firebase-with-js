const userDetails = document.querySelector(".userDetails")
const editProfile = document.querySelector("#editProfile")

function createUserCollection(user) {
    firebase.firestore().collection("users").doc(user.uid).set({
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        phone: "",
        speciality: "",
        portfolioUrl: "",
        experience : ""
    })
}

async function getuserInfo(userId) {
    if (userId) {
        const userInfoSnap = await firebase.firestore().collection("users").doc(userId).get()
        const userInfo = userInfoSnap.data()

        if (userInfo) {
            userDetails.innerHTML = `
            <h3> ${userInfo.name}</h3>
            <h3> ${userInfo.email}</h3>
            <h3> ${userInfo.phone}</h3>
             `
        }
    }
    else {
        userDetails.innerHTML = `<h3>Please login</h3>`
    }

}



async function getuserInfoRealtime(userId) {
    if (userId) {
        const userdocRef = await firebase.firestore().collection("users").doc(userId)
        userdocRef.onSnapshot((doc) => {
            if (doc.exists) {
                const userInfo = doc.data()
                if (userInfo) {
                    userDetails.innerHTML = `
                       <h3> ${userInfo.name}</h3>
                       <h3> ${userInfo.email}</h3>
                       <h3> ${userInfo.phone}</h3>
                       <h3> ${userInfo.speciality}</h3>
                       <h3> ${userInfo.portfolioUrl}</h3>
                       <h3> ${userInfo.experience}</h3>
                       <button class="btn waves-effect modal-trigger" href="#modal3">edit</button>
                        `;
                      editProfile["name"].value = userInfo.name
                    editProfile["profileEmail"].value= userInfo.email
                    editProfile["phoneno"].value= userInfo.phone
                    editProfile["specility"].value= userInfo.speciality
                    editProfile["portfolioUrl"].value= userInfo.portfolioUrl
                    editProfile["experience"].value= userInfo.experience
                }
            }
        })
    }
    else {
        userDetails.innerHTML = `<h3>Please login</h3>`
    }
}

function updateUserProfile(e){
    e.preventDefault();
  const userDocRef = firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid)

  userDocRef.update({
        name: editProfile["name"].value,
        email:editProfile["profileEmail"].value,
        phone:editProfile["phoneno"].value,
        speciality: editProfile["specility"].value,
        portfolioUrl:editProfile["portfolioUrl"].value,
        experience : editProfile["experience"].value
        
  })
  M.Modal.getInstance(myModel[2]).close();
}
