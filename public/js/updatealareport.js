const updCon = document.getElementById('updCon')
const rId = window.location.pathname.split("/").pop();
const userkey = localStorage.getItem('userKey')

async function LoadUpForm() {
try {

    updCon.innerHTML = `
         
                  <div class="loading-spinner text-center" style="margin-top: 26px">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <p class="text-muted mt-2">Loading update form...</p>
            </div>
        
        `;

       

    const rqR = await fetch(`/public/show-report/${rId}`) 
    const rsR = await rqR.json() 
     
     if(rsR.msg) {
return updCon.innerHTML = `
        <p class="text-center">${rsR.msg} </p>
        
        `

     } 

      const reque = await fetch(`/public/show-report-enum`)
       const resp = await reque.json()

    

updCon.innerHTML = `

<div style="max-width:1200px; margin-top: 2.3rem; margin:0 auto; background:#fff; border-radius:16px; box-shadow:0 12px 40px rgba(0,0,0,0.12); overflow:hidden;">
                    <div style="background:#007bff; color:#fff; padding:32px; text-align:center;">
        <h1 style="margin:0; font-size:2.3rem; font-weight:700;">
                  <i class="fas fa-book"></i> Update report, ${rsR.report.title}

        </h1>
        <p id="statusMessage" style="margin:12px 0 0; font-size:1rem; opacity:0.9; min-height:28px;"></p>
      </div>


              <div style="padding:32px;">
          <form id="upForm" enctype="multipart/form-data">
          

            <div style="margin-bottom:24px;">
              <label style="display:block; margin-bottom:8px; font-weight:600;">Report Name <span style="color:red;">*</span></label>
              <input type="text" id="title" value="${rsR.report.title}" required placeholder="Report Name" style="width:100%; padding:14px; border:1px solid #ddd; border-radius:8px;">
            </div>

            <div style="margin-bottom:24px;">
              <label style="display:block; margin-bottom:8px; font-weight:600;">Report Description <span style="color:red;">*</span></label>
              <textarea id="description"   required placeholder="Position" style="width:100%; padding:14px; border:1px solid #ddd; border-radius:8px;"> 
               ${rsR.report.description}
              </textarea>
            </div>


            
            <div style="margin-bottom:24px;">
              <label style="display:block; margin-bottom:8px; font-weight:600;">Report Type <span style="color:red;">*</span></label>
              <select id="rType" required style="width:100%; padding:14px; border:1px solid #ddd; border-radius:8px;">
                <option value="">Choose Report Type</option>
             ${resp.repoType.map((d) => `<option value="${d}" ${d === rsR.report.rType ? 'selected' : ''}>${d}</option>`).join("")}

              </select>
            </div>

            <div style="margin-bottom:24px;">
              <label style="display:block; margin-bottom:8px; font-weight:600;">
            
              Replace File 
 <span style="color:red;">(leave empty to keep current)*</span></label>
              <input type="file" id="repor"  accept=".pdf, .docx, .epub, .xlsx, .xls">
              
            </div>

            <div style="display:flex; gap:16px; justify-content:flex-end;">
              
              <button type="submit" id="submitBtn" style="padding:14px 36px; background:#007bff; color:white; border:none; border-radius:8px; cursor:pointer; font-weight:600;">
                <span id="btnText">Update</span>
                
              </button>
            </div>
          </form>
        </div>

         </div>       
       


`


document.getElementById('upForm').addEventListener('submit', async(e) => {
    e.preventDefault();
             const statusMessage = document.getElementById('statusMessage')
    try {
        const title = document.getElementById('title').value 
                const description = document.getElementById('description').value 
                const rType = document.getElementById('rType').value
                const file = document.getElementById("repor")
                 const hasFile = file.files && file.files.length > 0;

                const submitBtn = document.getElementById('submitBtn') 

                submitBtn.disabled = true

                

                let res;
                 if (hasFile) {
           
            const formData = new FormData();
            formData.append('title', title)
                formData.append('description', description)
                formData.append('rType', rType) 
            formData.append('rFile', file.files[0]);

            res = await fetch(`/update-report/${rsR.report._id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${userkey}`
                
                },
                body: formData
            });
        } else {
        
            res = await fetch(`/update-report/${rsR.report._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userkey}`
                },
                body: JSON.stringify({
                    title,
                    description,
                    rType
                })
            });
        }
     
       const req = await res.json() 

       if(req.msg) {
        submitBtn.disabled = false

        return statusMessage.innerHTML = `
                 <span>${req.msg} </span>
                `
        


       } else if(req.message) { 

        submitBtn.disabled = false

 alert(req.message) 

 window.location.reload()

       }

      

        
    } catch (error) {
        return statusMessage.innerHTML = `
                 <span>${error.message} </span>
                `
        
    }


})

    
} catch (error) {
    return updCon.innerHTML = `
    
    <p class="text-center">${error.message} </p>
    
    `
}


}

document.addEventListener('DOMContentLoaded', LoadUpForm)