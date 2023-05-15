const userDetails = document.querySelector(".userDetails")

function createUserCollection(user) {
    firebase.firestore().collection("users").doc(user.uid).set({
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        phone: "",
        speciality: "",
        portfolioUrl: ""
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
                        `
                }
            }
        })
    }
    else {
        userDetails.innerHTML = `<h3>Please login</h3>`
    }
}

