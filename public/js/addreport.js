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
        
    } catch (error) {
        return addContainer.innerHTML = `
        <p class="text-center">${error.message} </p>
        `
    }
    
}


document.addEventListener('DOMContentLoaded', AddReport)