
document.addEventListener("DOMContentLoaded", Authenticate);

async function Authenticate() {
  const authLnk = document.getElementById("authLnk");

  try {
      const userKey = localStorage.getItem('userKey')

    
    const logout = async () => {
      try {
        const logoutRequest = await fetch(`/auth/logout-user`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${userKey} `,
          },
        });

        if (!logoutRequest) {
          throw new Error("Server Error");
        }

        localStorage.removeItem("userKey");

        window.location.href = "/";
      } catch (error) {
        console.log("signing out problem", error.message);
      }
    };

    if (!userKey) {
      const divAuth = document.createElement("div");

      divAuth.innerHTML = `
            
                          <a class="ps-navbar__link" href="/login" onclick="setActive(this)">
            <i class="fas fa-circle-user"></i> Login
          </a>
                        
            
            `;

      authLnk.append(divAuth);
    } else {
      const divAuth = document.createElement("div");
      
     
      divAuth.innerHTML = `
      
              
            <a href="#" class="ps-navbar__link" " id="logoutbtn" style="cursor: pointer" >
                            <i class="fas fa-user-circle me-1"></i>Sign Out
                        </a>
                        
            
            `;

         
      authLnk.append(divAuth);
      document.getElementById("logoutbtn").addEventListener("click", logout);
    }
  } catch (error) {
    console.log(error.message);
  }
}