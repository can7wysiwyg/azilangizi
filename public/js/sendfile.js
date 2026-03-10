const sFCon = document.getElementById('sFCon')
const userkey = localStorage.getItem('userKey')
const rId = window.location.pathname.split("/").pop();



async function SendFile() {
    try {

        sFCon.innerHTML = `
         
                  <div class="loading-spinner text-center" style="margin-top: 26px">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <p class="text-muted mt-2">Loading Users To Email...</p>
            </div>
        
        `;


        const req = await fetch(`/admin-users-pure`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userkey}`
            }
        })

        const res = await req.json()


    if(res.msg) {
        return sFCon.innerHTML = `
        <p class="text-center">${res.msg} </p>
        
        `

    }

    const users = res.users

   sFCon.innerHTML = `
<div style="padding: 16px;">
  <h2 style="text-align:center;">Select Users</h2>
  <p style="text-align:center; color:#888; font-size:13px;">
    ✓ Check a name to add their email · Uncheck to remove it
  </p>

  ${users?.map(item => `
    <div class="username" data-mail="${item.email}"
      style="display:flex; align-items:center; gap:10px; padding:10px; cursor:pointer; border-bottom:1px solid #eee;">
      <span class="check-box" style="font-size:16px;">☐</span>
      <span>${item.name}</span>
    </div>
  `).join('')}

  <button id="sendEmailsBtn" style="margin-top:16px; width:100%; padding:10px;">
    Send Email(s)
  </button>
</div>
`

let mails = new Set()

document.querySelectorAll('.username').forEach(ele => {
  ele.addEventListener('click', () => {
    const email = ele.dataset.mail
    const box = ele.querySelector('.check-box')

    if (mails.has(email)) {
      mails.delete(email)
      box.textContent = '☐'
      ele.style.color = 'black'
    } else {
      mails.add(email)
      box.textContent = '☑'
      ele.style.color = 'green'
    }
  })
})

document.getElementById('sendEmailsBtn').addEventListener('click', async () => {
  if (mails.size === 0) return alert("No users selected")
 
    const sendEmailsBtn = document.getElementById('sendEmailsBtn')

    sendEmailsBtn.disabled = true;

  const res = await fetch(`/send-emails/${rId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${userkey}` },
    body: JSON.stringify({ emails: [...mails] })
  })

  const data = await res.json()
    
  if(data.msg) {
    sendEmailsBtn.disabled = false;
    
   alert(data.msg)

  } else if(data.message) {
    sendEmailsBtn.disabled = false;
    
    alert(data.message)
  }
})



        
    } catch (error) {
        return sFCon.innerHTML = `
        <p class="text-center">${error.message} </p>
        
        `

    }
}

document.addEventListener('DOMContentLoaded', SendFile)