const addAla = document.getElementById('addAla')
const userkey = localStorage.getItem('userKey')

async function LoadAdd() {

    try {

        addAla.innerHTML = `
         
                  <div class="loading-spinner text-center" style="margin-top: 26px">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <p class="text-muted mt-2">Loading Dashboard...</p>
            </div>
        
        `;

       
        if(!userkey) {
            window.location.href = "/"
            return;
        }

         

        const request = await fetch('/auth/user-details',  {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userkey}`
            }
        })

        const rqD = await fetch(`https://malawi-api.onrender.com/api/districts_all`)
           const rsD = await rqD.json()
         const districts = rsD.districts

         const data = districts[0].districts


        const response = await request.json() 
        const user = response.user 

        if(user.role === "admin") {
           


           addAla.innerHTML = `
          
           <div style="max-width:1200px; margin-top: 2.3rem; margin:0 auto; background:#fff; border-radius:16px; box-shadow:0 12px 40px rgba(0,0,0,0.12); overflow:hidden;">
                    <div style="background:#007bff; color:#fff; padding:32px; text-align:center;">
        <h1 style="margin:0; font-size:2.3rem; font-weight:700;">
          <i class="fas fa-user"></i> Add Mlangizi
        </h1>
        <p id="statusMessage" style="margin:12px 0 0; font-size:1rem; opacity:0.9; min-height:28px;"></p>
      </div>


              <div style="padding:32px;">
          <form id="cForm" >
          

            <div style="margin-bottom:24px;">
              <label style="display:block; margin-bottom:8px; font-weight:600;"> Name <span style="color:red;">*</span></label>
              <input type="text" id="name" required placeholder="Fullname" style="width:100%; padding:14px; border:1px solid #ddd; border-radius:8px;">
            </div>
               
            <div style="margin-bottom:24px;">
              <label style="display:block; margin-bottom:8px; font-weight:600;"> Email <span style="color:red;">*</span></label>
              <input type="email" id="email" required placeholder="Password" style="width:100%; padding:14px; border:1px solid #ddd; border-radius:8px;">
            </div>

              <div style="margin-bottom:24px;">
              <label style="display:block; margin-bottom:8px; font-weight:600;"> Password <span style="color:red;">*</span></label>
              <input type="password" id="password" required placeholder="Password" style="width:100%; padding:14px; border:1px solid #ddd; border-radius:8px;">
            </div>


            
            <div style="margin-bottom:24px;">
              <label style="display:block; margin-bottom:8px; font-weight:600;">Find District <span style="color:red;">*</span></label>
              <select id="aDst" required style="width:100%; padding:14px; border:1px solid #ddd; border-radius:8px;">
                <option value="">Select District</option>
                ${data.map((d) => `<option value="${d._id}">${d.districtName}</option>`).join("")}
              </select>
            </div>

            
            <div style="display:flex; gap:16px; justify-content:flex-end;">
              
              <button type="submit" id="submitBtn" style="padding:14px 36px; background:#007bff; color:white; border:none; border-radius:8px; cursor:pointer; font-weight:600;">
                <span id="btnText">Add User</span>
                
              </button>
            </div>
          </form>
        </div>

         </div>       
       


           `

       
       document.getElementById('cForm').addEventListener('submit', async(e) => {
        e.preventDefault() 
                     const statusMessage = document.getElementById('statusMessage')
       
        try {
            const name = document.getElementById('name').value 
            const email = document.getElementById('email').value 
            const password = document.getElementById('password').value 
            const location = document.getElementById('aDst').value
            const submitBtn = document.getElementById('submitBtn')

          submitBtn.disabled = true  

        const Cacc = await fetch('/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userkey}`
            },
            body: JSON.stringify({name, email, password, location})
        })
            

        resAcc = await Cacc.json() 

        if(resAcc.msg) {
                      submitBtn.disabled = false

            return statusMessage.innerHTML = `
                    <span>${resAcc.msg} </span>
                    
                    `

        } else if(resAcc.message) {
                      submitBtn.disabled = false 

            return statusMessage.innerHTML = `
                    <span>${resAcc.message} </span>
                    
                    `


        }
            
                    
                 } catch (error) {
                    return statusMessage.innerHTML = `
                    <span>${error.message} </span>
                    
                    `
                    
                 }


       })
       
       
       
       
       
        }
  
        
    } catch (error) {
        return addAla.innerHTML = `
        <p class="text-center">${error.message} </p>
        
        `
    }


} 


document.addEventListener('DOMContentLoaded', LoadAdd)