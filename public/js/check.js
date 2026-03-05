
document.addEventListener('DOMContentLoaded', RoleCheck)

async function RoleCheck() {
    const authCont = document.getElementById('authCont');

    try {
  const userKey = localStorage.getItem('userKey')
     
    if(!userKey) {
        return;

    }

    
    const response = await fetch(`/auth/user-details`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userKey}`
        }
    })

 
    const data = await response.json();

        if(!data || data.msg) {
        return authCont.innerHTML = `
               `
    }


    const user = data?.user

    
     

    if(user.role === "azilangizi") {
        return authCont.innerHTML = `
        <a class="ps-navbar__link" href="/addreport" onclick="setActive(this); showSection('account')">
                            <i class="fas fa-plus"></i>ADD REPORT
                        </a>

        
        
        `
    }  else if(user.role === "user") {

        return authCont.innerHTML = `
        <a class="ps-navbar__link" href="/profile" onclick="setActive(this); showSection('account')">
                            <i class="fas fa-user"></i>Profile
                        </a>

        
        `;
    }



        
    } catch (error) {
         console.log(error.message)
       return
        
    }

}