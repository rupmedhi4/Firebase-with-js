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
                    <ul class="collection">
                             <li class="collection-item">  <h3> ${userInfo.name}</h3></li>
                             <li class="collection-item">Email -${userInfo.email}</li>
                             <li class="collection-item">Mobile No - ${userInfo.phone}</li>
                             <li class="collection-item">Spaciality - ${userInfo.speciality}</li>
                             <li class="collection-item">Portfolio url - ${userInfo.portfolioUrl}</li>
                             <li class="collection-item">experience - ${userInfo.experience}</li>
                     </ul>
                       <button class="btn waves-effect modal-trigger" href="#modal3">edit</button>
                        `;
                      editProfile["name"].value = userInfo.name
                    editProfile["profileEmail"].value= userInfo.email
                    editProfile["phoneno"].value= userInfo.phone
                    editProfile["specility"].value= userInfo.speciality
                    editProfile["portfolioUrl"].value= userInfo.portfolioUrl
                    editProfile["experience"].value= userInfo.experience


                    if(firebase.auth().currentUser.photoURL){
                        document.querySelector("#proImg").src = firebase.auth().currentUser.photoURL
                    }
                   
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


function uploadImage(e){
    console.log(e.target.files)
    const uid = firebase.auth().currentUser.uid

   const fileRef =  firebase.storage().ref().child(`/users/${uid}/profile`)
  const uploadTask =  fileRef.put(e.target.files[0])

  uploadTask.on('state_changed', 
  (snapshot) => {
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    if(progress==`100`) {
        alert("upload")
    }
    console.log('Upload is ' + progress + '% done');
    
  }, 
  (error) => {
    console.log(error)
  }, 
  () => {
    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
      console.log('File available at', downloadURL);
      firebase.auth().currentUser.updateProfile({
        photoURL : downloadURL
      })
    });
  }
);

}
