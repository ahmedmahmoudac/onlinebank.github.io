const BASE_URL = "http://localhost:3000"
const buyVccBtn = document.querySelector("#buy-vcc")
let recentVccCount = localStorage.getItem("recent_vcc_count")


if (recentVccCount) {
    recentVccCount = parseInt(recentVccCount)
    let vccEls = document.querySelectorAll(".vcc-container .vcc")
    for (let i = 0; i < recentVccCount; i++) {
        if (vccEls[i]) {
            vccEls[i].classList.add("active")
        }
    }
}


buyVccBtn.addEventListener("click", () => {
    document.querySelector(".vcc-prompt").style.display = "block"
})


function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
}


let copyAll = document.querySelector(".copy-all")
if (copyAll) {
    copyAll.addEventListener("click", e => {
        let copyText = document.querySelector("textarea")
        let value = copyText.value
        copyText.select()
        copyText.setSelectionRange(0, value.length)
        navigator.clipboard.writeText(value).then(() => {
            alert("Copied!")
        }).catch(e => {
            alert(e)
        })
    })
}


let downloadAsText = document.querySelector(".download-as-text")
if (downloadAsText) {
    downloadAsText.addEventListener("click", e => {
        download("vcc.txt", document.querySelector("textarea").value)
    })
}



document.querySelector(".vcc-prompt .ok").addEventListener("click", () => {
    try {
        document.querySelector(".vcc-prompt").style.display = "none"
        let count = document.querySelector(".vcc-count").value
        let userId = document.querySelector(".user-id").textContent.trim()
        fetch(`/api/vcc/buy/${count}/${userId}`).then(res => res.json()).then(data => {
            if (data.status === "fail") {
                document.querySelector(".error-dialog .message").innerHTML = data.message
                document.querySelector(".error-dialog").style.display = "flex"
            } else {
                localStorage.setItem("recent_vcc_count", count)
                alert("Your purchase was successful")
                location.reload()
            }
        }).catch(err => {
            alert("Network Error")
        })
    } catch(e) {
        alert("Please login/signup to purchase VCC")
    }
})


document.querySelector(".vcc-prompt .cancel").addEventListener("click", () => {
    document.querySelector(".vcc-prompt").style.display = "none"
})


document.querySelector(".talk-with-admin").addEventListener("click", () => {
    document.querySelector(".error-dialog .message").innerHTML = ""
    document.querySelector(".error-dialog").style.display = "block"
})

document.querySelector(".error-dialog .cancel").addEventListener("click", (e) => {
    document.querySelector(".error-dialog").style.display = "none"
})

document.querySelector(".creds-dialog .cancel").addEventListener("click", (e) => {
    document.querySelector(".creds-dialog").style.display = "none"
})

document.querySelector(".error-dialog .whatsapp-btn").addEventListener("click", (e) => {
    document.querySelector(".error-dialog").style.display = "none"
    window.open(e.target.getAttribute("data-url"), '_blank').focus()
})

document.querySelector(".error-dialog .telegram-btn").addEventListener("click", (e) => {
    document.querySelector(".error-dialog").style.display = "none"
    window.open(e.target.getAttribute("data-url"), '_blank').focus()
})


let buyPointsBtn = document.querySelector("#buy-points")
if (buyPointsBtn) {
    buyPointsBtn.addEventListener("click", e => {
        document.querySelector(".error-dialog .message").innerHTML = ""
        document.querySelector(".error-dialog").style.display = "block"
    })
}

let revealCreds = document.querySelector("#reveal-creds")
if (revealCreds) {
    revealCreds.addEventListener("click", e => {
        document.querySelector(".creds-dialog .message").innerHTML = `
            <div><strong>User ID:</strong> ${revealCreds.getAttribute("data-user_id")}</div>
            <div><strong>Password:</strong> ${revealCreds.getAttribute("data-password")}</div>
            <br>
        `
        document.querySelector(".creds-dialog").style.display = "block"
    })
}


document.querySelector("#clear-all").addEventListener("click", e => {
    let isClear = confirm("Do you really want to clear all VCC?")
    if (isClear) {
        let userId = document.querySelector(".user-id").textContent.trim()
        fetch("/api/vcc/clear/" + userId).then(res => res.text()).then(text => {
            alert(text)
            location.reload()
        }).catch(err => {
            alert("Error: " + err)
        })
    }
})



let useIdEl = document.querySelector(".user-id")
let classList = ["white", "red", "yellow", "blue", "green", "orange", "brown"]
setInterval(() => {
    for (let c of classList) {
        useIdEl.classList.remove(c)
    }
    useIdEl.classList.add(classList[Math.floor(Math.random()*classList.length)])
}, 100)