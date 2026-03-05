const loginContainer = document.querySelector('#login-container')

async function LoginC() {
try {
  
    loginContainer.innerHTML = `
    <div class="login-card">
    <div class="card-body">

      <h3>Sign in to Azilangizi</h3>
      <p class="text-center" id="msgbody"> </p>
      

      <form id="logForm">
        <div class="mb-3">
          <label class="form-label">Email</label>
          <input type="email" class="form-control" id="email" placeholder="your@email.com" required autofocus>
        </div>

        <div class="mb-4">
          <label class="form-label">Password</label>
          <input type="password" class="form-control" id="password" placeholder="••••••••" required>
        </div>

        <div class="d-flex justify-content-between align-items-center mb-4 small">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="remember" checked>
            <label class="form-check-label" for="remember">
              Remember me
            </label>
          </div>
          <a href="#" class="link">Forgot password?</a>
        </div>

        <button type="submit" id="subBtn" class="btn btn-signin w-100 mb-3">
          Sign In
        </button>

        <div class="text-center small">
          Don't have an account? 
          <a href="/register" class="link">Sign up</a>
        </div>
      </form>
   
    
    `


    document.getElementById('logForm').addEventListener('submit', async(e) => {
     e.preventDefault()
     const msgbody = document.getElementById('msgbody')
     try {
      const email = document.getElementById('email').value 
      const password = document.getElementById('password').value 
      const subBtn = document.getElementById('subBtn') 

      subBtn.disabled = true;
      
        if(!email || !password) {
          subBtn.disabled = false;
          return msgbody.innerHTML = `
      <span class="text-danger">Email or Password cannot be empty </span>
      
      `
        }

        const request = await fetch('/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({email, password})

        })


        const response = await request.json()

        if(response.msg) {
               subBtn.disabled = false;
          return msgbody.innerHTML = `
      <span class="text-danger">${response.msg} </span>
      
      `

 
        } else if(response.userKey) {
                subBtn.disabled = false;

                localStorage.setItem('userKey', response.userKey)
                window.location.href = "/"


        }
                 

     } catch (error) {
      return msgbody.innerHTML = `
      <span>${error.message} </span>
      
      `
      
     }



    })

    
} catch (error) {
    return loginContainer.innerHTML = `
    <p class="text-center">${error.message} </p>
    
    `
}    
}

document.addEventListener('DOMContentLoaded', LoginC)