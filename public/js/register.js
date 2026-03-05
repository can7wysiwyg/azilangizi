const registerContainer = document.querySelector('#register-container')

async function RegC() {
try {
  
    registerContainer.innerHTML = `
    <div class="login-card">
    <div class="card-body">

      <h3>Sign Up For Azilangizi</h3>
      <p class="text-center" id="msgbody"> </p>
            
      <form id="regiForm">
      <div class="mb-3">
          <label class="form-label">Full name</label>
          <input type="text" class="form-control" id="name" placeholder="your name" required autofocus>
        </div>

        <div class="mb-3">
          <label class="form-label">Email</label>
          <input type="email" class="form-control" id="email" placeholder="your@email.com" required autofocus>
        </div>

        <div class="mb-4">
          <label class="form-label">Password</label>
          <input type="password" class="form-control" id="password" placeholder="••••••••" required>
        </div>

        
        <button type="submit" id="subBtn" class="btn btn-signin w-100 mb-3">
          Register
        </button>

        <div class="text-center small">
          Have an account? 
          <a href="/login" class="link">Sign in</a>
        </div>
      </form>
   
    
    `


    document.getElementById('regiForm').addEventListener('submit', async(e) => {
           e.preventDefault()
        try {
            const name = document.getElementById('name').value
            const email = document.getElementById('email').value
            const password = document.getElementById('password').value
            const subBtn = document.getElementById('subBtn')

            subBtn.disabled = true;

            if(!name || !email || !password) {
                subBtn.disabled = false;
                alert("Input field cannot be empty")

            }


            const request = await fetch('/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name, email, password})
            })

            const response = await request.json()

            if(response.msg) {
                subBtn.disabled = false;
                 return document.getElementById('msgbody').innerHTML = `
            <span>${response.msg} </span>
            
            `
            } else if(response.message) {
                subBtn.disabled = false;
                   return document.getElementById('msgbody').innerHTML = `
            <span>${response.message} </span>
            
            `
            }



            
        } catch (error) {
            return document.getElementById('msgbody').innerHTML = `
            <span>${error.message} </span>
            
            `
            
        }
    })
    
} catch (error) {
    return registerContainer.innerHTML = `
    <p class="text-center">${error.message} </p>
    
    `
}    
}

document.addEventListener('DOMContentLoaded', RegC)