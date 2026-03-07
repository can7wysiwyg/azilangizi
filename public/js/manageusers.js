const mnUsrs = document.getElementById('mnUsrs')
const userkey = localStorage.getItem('userKey')
let params = new URLSearchParams();

async function LoadUsrs() {

    try {
         mnUsrs.innerHTML = `
         
                  <div class="loading-spinner text-center" style="margin-top: 26px">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <p class="text-muted mt-2">Loading Users...</p>
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
        const user = response?.user 


        if(user?.role === "admin") { 

           params.set('district', "")
           params.set('hasReports', "")
           

            const ftUsrs = await fetch(`/admin-users?${params.toString()}`, {
                method: 'GET',
                headers : {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userkey}`
            }
            })

            const resUsrs = await ftUsrs.json();
            
            const users = resUsrs.users 

             if(resUsrs.msg) {
                return mnUsrs.innerHTML = `
                <p class="text-center">${resUsrs.msg} </p>
                `
             }  
             
             
             mnUsrs.innerHTML = `
             <div class="container">
             <div class="filt-box mt-4">
  
  <div class="row g-3">

    <!-- District Filter -->
    <div class="col-md-6">
      <div>
        <select id="districtFilter" required
          style="width:100%; padding:14px; border:1px solid #ddd; border-radius:8px;">
          
          <option value="">Users By Districts</option>
          <option value="all">All</option>

          ${data.map((d) => `
            <option value="${d._id}">${d.districtName}</option>
          `).join("")}

        </select>
      </div>
    </div>


    <!-- Report Filter -->
    <div class="col-md-6">
      <div>
        <select id="reportFilter" required
          style="width:100%; padding:14px; border:1px solid #ddd; border-radius:8px;">
          
          <option value="">Filter Users With Reports</option>
          <option value="all">All</option>
          <option value="no">No Reports</option>
          <option value="yes">Have Reports</option>

        </select>
      </div>
    </div>

  </div>

 
</div>




 <div id="showusers" class="text-center" style="margin-top: 3.5rem;">
  ${ShowUsers(users)}

  </div>

             </div>
             
             
             `

function ShowUsers(dataObj) {
        return `
<div class="row g-4 ">

<ul style="list-style:none; padding:0; margin:0; width:100%;">

${
dataObj.map(item => `
  
<li class="col-md-6" style="margin-bottom:16px;">

  <div class="card" style="
      border-radius:10px;
      border:1px solid #e6e6e6;
      box-shadow:0 4px 10px rgba(0,0,0,0.05);
      padding:18px;
  ">

    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">

      <div>

        <h6 style="margin:0; font-weight:600;">
          <i class="fas fa-user" style="color:#0d6efd; margin-right:6px;"></i>
          ${item.name}
        </h6>

        <div style="font-size:14px; color:#6c757d;">
          <i class="fas fa-map-marker-alt" style="margin-right:6px;"></i>
          ${ data.find(it => it._id === item.location).districtName }
        </div>

      </div>

      <div style="display:flex; gap:10px; flex-wrap:wrap;">

        <a href="${item.name}" 
           class="btn btn-sm btn-primary"
           style="display:flex; align-items:center; gap:5px;">
           <i class="fas fa-file-alt"></i>
           Reports
        </a>

        <button class="btn btn-sm btn-danger"
           style="display:flex; align-items:center; gap:5px;">
           <i class="fas fa-trash"></i>
           Delete
        </button>

      </div>

    </div>

  </div>

</li>

`).join('')
}

</ul>

</div>
`

    }    
       

    const showusers = document.getElementById('showusers')

document.addEventListener('change', async(e) => {

if(e.target.id === "districtFilter") {
  const val = e.target.value 

 showusers.innerHTML = `
         
                  <div class="loading-spinner text-center" style="margin-top: 26px">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <p class="text-muted mt-2">Loading Users...</p>
            </div>
        
        `;

               params.set('district', val)
           params.set('hasReports', "")
           

            const ftUsrs = await fetch(`/admin-users?${params.toString()}`, {
                method: 'GET',
                headers : {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userkey}`
            }
            })

            const resUsrs = await ftUsrs.json();
            
            const users = resUsrs.users 

             if(resUsrs.msg) {
                return showusers.innerHTML = `
                <p class="text-center">${resUsrs.msg} </p>
                `
             }  


             showusers.innerHTML = `
             <div id="showusers" class="text-center" style="margin-top: 3.5rem;">
  ${ShowUsers(users)}

  </div>

             
             
             `
           


    
} else if(e.target.id === "reportFilter" ) {

  const value  = e.target.value 

 showusers.innerHTML = `
         
                  <div class="loading-spinner text-center" style="margin-top: 26px">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <p class="text-muted mt-2">Loading Users...</p>
            </div>
        
        `;

               params.set('district', document.getElementById('districtFilter').value)
           params.set('hasReports', value)
           

            const ftUsrs = await fetch(`/admin-users?${params.toString()}`, {
                method: 'GET',
                headers : {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userkey}`
            }
            })

            const resUsrs = await ftUsrs.json();
            
            const users = resUsrs.users 

             if(resUsrs.msg) {
                return showusers.innerHTML = `
                <p class="text-center">${resUsrs.msg} </p>
                `
             }  


             showusers.innerHTML = `
             <div id="showusers" class="text-center" style="margin-top: 3.5rem;">
  ${ShowUsers(users)}

  </div>

             
             
             `
  



}

})




        }


    
        
    } catch (error) {
        return mnUsrs.innerHTML = `
        <p class="text-center">${error.message} </p>
        
        `
    }

} 


document.addEventListener('DOMContentLoaded', LoadUsrs)