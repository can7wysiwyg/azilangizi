const addContainer = document.getElementById('addContainer')

async function AddReport() { 


    try {

        addContainer.innerHTML = `
         
                  <div class="loading-spinner text-center" style="margin-top: 26px">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <p class="text-muted mt-2">Loading Report Upload Form...</p>
            </div>
        
        `;

        const userKey = localStorage.getItem('userKey')

        if(!userKey) {
            window.location.href = "/"
            return;
        }

       const request = await fetch(`/public/show-report-enum`)
       const response = await request.json()

       const rqD = await fetch(`https://malawi-api.onrender.com/api/districts_all`)
           const rsD = await rqD.json()
         const districts = rsD.districts

         const data = districts[0].districts

        
       addContainer.innerHTML = `
       
       <div style="max-width:1200px; margin-top: 2.3rem; margin:0 auto; background:#fff; border-radius:16px; box-shadow:0 12px 40px rgba(0,0,0,0.12); overflow:hidden;">
                    <div style="background:#007bff; color:#fff; padding:32px; text-align:center;">
        <h1 style="margin:0; font-size:2.3rem; font-weight:700;">
          <i class="fas fa-book"></i> Upload New Report
        </h1>
        <p id="statusMessage" style="margin:12px 0 0; font-size:1rem; opacity:0.9; min-height:28px;"></p>
      </div>


              <div style="padding:32px;">
          <form id="rForm" enctype="multipart/form-data">
          

            <div style="margin-bottom:24px;">
              <label style="display:block; margin-bottom:8px; font-weight:600;">Report Name <span style="color:red;">*</span></label>
              <input type="text" id="title" required placeholder="Report Name" style="width:100%; padding:14px; border:1px solid #ddd; border-radius:8px;">
            </div>

            <div style="margin-bottom:24px;">
              <label style="display:block; margin-bottom:8px; font-weight:600;">Report Description <span style="color:red;">*</span></label>
              <textarea id="description" required placeholder="Position" style="width:100%; padding:14px; border:1px solid #ddd; border-radius:8px;"> 

              </textarea>
            </div>


            
            <div style="margin-bottom:24px;">
              <label style="display:block; margin-bottom:8px; font-weight:600;">Report Type <span style="color:red;">*</span></label>
              <select id="rType" required style="width:100%; padding:14px; border:1px solid #ddd; border-radius:8px;">
                <option value="">Choose Report Type</option>
                ${response.repoType.map((d) => `<option value="${d}">${d}</option>`).join("")}
              </select>
            </div>

            <div style="margin-bottom:24px;">
              <label style="display:block; margin-bottom:8px; font-weight:600;">Choose District <span style="color:red;">*</span></label>
              <select id="location" required style="width:100%; padding:14px; border:1px solid #ddd; border-radius:8px;">
                <option value="">Select Your District</option>
                ${data.map((d) => `<option value="${d._id}">${d.districtName}</option>`).join("")}
              </select>
            </div>


            <div style="margin-bottom:24px;">
              <label style="display:block; margin-bottom:8px; font-weight:600;">Add Report <span style="color:red;">*</span></label>
              <input type="file" id="repor"  accept=".pdf, .docx, .epub, .xlsx, .xls">
              
            </div>

            <div style="display:flex; gap:16px; justify-content:flex-end;">
              
              <button type="submit" id="submitBtn" style="padding:14px 36px; background:#007bff; color:white; border:none; border-radius:8px; cursor:pointer; font-weight:600;">
                <span id="btnText">Add</span>
                
              </button>
            </div>
          </form>
        </div>

         </div>       
       
       
       `

       document.getElementById('rForm').addEventListener('submit', async(e) => {
             e.preventDefault();
             const statusMessage = document.getElementById('statusMessage')

             try {
                const title = document.getElementById('title').value 
                const description = document.getElementById('description').value 
                const rType = document.getElementById('rType').value
                const location = document.getElementById('location').value

                const file = document.getElementById("repor").files[0];
                const submitBtn = document.getElementById('submitBtn') 

                

                
        submitBtn.disabled = true
        submitBtn.innerHTML = `
            <span class="spinner-border spinner-border-sm" role="status"></span> Uploading...
        `


                let formData = new FormData() 


                formData.append('title', title)
                formData.append('description', description)
                formData.append('location', location)

                formData.append('rType', rType) 
                formData.append('rFile', file)

                const mkUp = await fetch('/post-report', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${userKey}`
                    },
                    body: formData
                }) 

                const result = await mkUp.json()

                if(result.msg) {
                     submitBtn.disabled = false
                      submitBtn.innerHTML = `
                      <span>Try Again </span>

        
        `


                    return statusMessage.innerHTML = `
                    <span>${result.msg} </span>
                    `
                } else if(result.message) { 

                    submitBtn.disabled = false
                       submitBtn.innerHTML = `
                  <span>Add Another </span>
        `

                    return statusMessage.innerHTML = `
                    <span>${result.message} </span>
                    `  

                }
 
                
             } catch (error) {
                return statusMessage.innerHTML = `
                 <span>${error.message} </span>
                `
                
             }

       })
            
        
    } catch (error) {
        return addContainer.innerHTML = `
        <p class="text-center">${error.message} </p>
        `
    }
    
}


document.addEventListener('DOMContentLoaded', AddReport)