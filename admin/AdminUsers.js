import express from "express"
const AdminUsers = express.Router()
import User from "../models/UserModel.js"
import Report from "../models/ReportModel.js"
import verify from "../middleware/verify.js"
import adminWare from "../middleware/adminWare.js"
import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
        user: "paulkssa@gmail.com", 
        pass: "sjjq lkde qfdz cwwb"  
    }
});


AdminUsers.get('/admin-user-reports/:id', verify, adminWare, async(req, res) => {
    try {
       
         const {id} = req.params 

         if(!id) {
            return res.json({msg: "Access not available"})
         }

         const reports = await Report.find({owner: id})

         if(!reports || reports.length === 0) {
            return res.json({msg: "There are no reports"})
         }

        return res.json({reports})
        
    } catch (error) {
        console.log(`failure to get users, ${error.message}`)
        return res.json({msg: `failure to get users, ${error.message}`})
    }
})



AdminUsers.get('/admin-users', verify, adminWare, async(req, res) => {
    try {
        const { district, hasReports } = req.query;

        
        let query = { role: "azilangizi" };

    
        if (district && district !== 'all') {
            query.location = district;
        }

        let users = await User.find(query).sort({_id: -1});

        if (!users || users.length === 0) {
            return res.json({ msg: "You have no users" });
        }


        if (hasReports && hasReports !== 'all') {
            
            
            const usersWithReports = await Report.distinct('owner');

            if (hasReports === 'yes') {
                
                users = users.filter(user => 
                    usersWithReports.some(ownerId => 
                        ownerId.toString() === user._id.toString()
                    )
                );
            } else if (hasReports === 'no') {
                
                users = users.filter(user => 
                    !usersWithReports.some(ownerId => 
                        ownerId.toString() === user._id.toString()
                    )
                );
            }
        }

        if (users.length === 0) {
            return res.json({ msg: "No users match the selected filters" });
        }

        return res.json({ users });

    } catch (error) {
        console.log(`failure to get users, ${error.message}`);
        return res.json({ msg: `failure to get users, ${error.message}` });
    }
});


AdminUsers.delete('/admin/delete-user/:id', verify, adminWare, async(req, res) => {

    try {
        const {id} = req.params;

        if(!id) {
            return res.json({msg: "Access not available"})
        }


        await User.findByIdAndDelete(id)
        await Report.deleteMany({owner: id})

        return res.json({message: "Successfully deleted user and their reports!"})
        
    } catch (error) {
        console.log(`failure to delete user, ${error.message}`);
        return res.json({ msg: `failure to delete user, ${error.message}` });

    }


})



AdminUsers.get('/admin/all-reports', verify, adminWare, async(req, res) => {
    try {
        const { district, month, sort } = req.query;

        let query = {};

        if (district && district !== 'all') {
            query.location = district;
        }

    
        if (month && month !== 'all') {
            const monthIndex = parseInt(month); 
            const year = new Date().getFullYear();

            const start = new Date(year, monthIndex, 1);         
            const end = new Date(year, monthIndex + 1, 0, 23, 59, 59); 

            query.createdAt = { $gte: start, $lte: end };
        }

        let sortOption = sort === 'oldest' ? { createdAt: 1 } : { createdAt: -1 };

        const reports = await Report.find(query)
            .populate('owner', 'name email location')
            .sort(sortOption);

        if (!reports || reports.length === 0) {
            return res.json({ msg: "No reports found" });
        }

        return res.json({ reports });

    } catch (error) {
        console.log(`failed to get reports, ${error.message}`);
        return res.json({ msg: `failed to get reports, ${error.message}` });
    }
});



AdminUsers.get('/admin-users-pure', verify, adminWare, async(req, res) => {
    try {
        
        
        let query = { role: "azilangizi" };

    
        
        let users = await User.find(query).sort({_id: -1});

        if (!users || users.length === 0) {
            return res.json({ msg: "You have no users" });
        }


        

        return res.json({ users });

    } catch (error) {
        console.log(`failure to get users, ${error.message}`);
        return res.json({ msg: `failure to get users, ${error.message}` });
    }
});




AdminUsers.post('/send-emails/:id', verify, adminWare, async(req, res) => {
  try {
    const { emails } = req.body;
    const {id} = req.params;

    const report = await Report.findById(id) 


    if (!emails || emails.length === 0) {
      return res.status(400).json({ msg: "No emails provided" });
    }

    const results = await Promise.allSettled(
      emails.map(email =>
        transporter.sendMail({
          from: "paulkssa@gmail.com",
          to: email,
          subject: "Message from Admin",
          html: `<div style="text-align: center">
          <p>You have been sent a document!</p>

          <p>access it at , <a href="${report.rFile}"
             style="display:inline-block; padding:10px 20px; background:#000; color:#fff; text-decoration:none; border-radius:6px;"
          download>this link</a> </p>
          
          
          
          </div>
          
          
          
          `,
        })
      )
    );

    const failed = results
      .filter(r => r.status === "rejected")
      .map(r => r.reason?.message);

    return res.json({
      message: `Sent ${results.length - failed.length}/${emails.length} emails successfully`,
      msg: failed.length > 0 ? failed : undefined,
    });

  } catch (error) {
    console.log(`failure to send emails, ${error.message}`);
    return res.json({ msg: `failure to send emails, ${error.message}` });
  }
})


export default AdminUsers