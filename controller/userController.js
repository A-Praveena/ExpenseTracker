const User = require('../model/userSchema')
const bcrypt = require('bcrypt')

const userRegister = async (request, response) => {
    try {
        // console.log("inside the signUp page")
        // console.log(request.body);
        const exist = await User.findOne({ username: request.body.username });
        // console.log(exist)
        if (exist) {
            //console.log("inside exist")
            return response.status(401).json({ message: 'User already exists' });
        }
        else {
            request.body.password = await bcrypt.hash(request.body.password, 10);

            const user = request.body;
            const newUser = new User(user);
            await newUser.save();

            response.status(200).json({
                message: 'User registered successfully',status:true,
                date: {
                    data: user
                }
            });
        }
    } catch (error) {
        console.log(error)
        response.status(500).json({ message: error });
    }
}



const userLogin = async (request, response) => {
    try {
        // console.log("inside the login page");
        // console.log(request.body);
        const user = await User.findOne({ username: request.body.username });
        // console.log(user)

        if (!user) {
            return response.status(401).json({ message: 'User not found' });
        }

        const passwordMatch = await bcrypt.compare(request.body.password, user.password);

        if (!passwordMatch) {
            return response.status(401).json({ message: 'Incorrect password' });
        }

        // If username and password match, you can consider the user as logged in.
        response.status(200).json({
            message: 'User logged in successfully',status:true,
            user: {
                id: user._id,
                username: user.username
                // You can include any other user-related information you want to send
            },
        });
    } catch (error) {
        // console.log(error);
        response.status(500).json({ message: error });
    }
}


const userDelete = async (req, res) => {
    // console.log("inside delete user")
    
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateUserProfile = async (request, response) => {
    // console.log("inside update user")
    try {
      const userId = request.params.id; 
      const fieldsToUpdate = {};

      
      if (request.body.firstname) {
        fieldsToUpdate.firstname = request.body.firstname;
    }
    if (request.body.lastname) {
        fieldsToUpdate.lastname = request.body.lastname;
    }
    if (request.body.email) {
        fieldsToUpdate.email = request.body.email;
    }
    if (request.body.phone) {
        fieldsToUpdate.phone = request.body.phone;
    }
    if (request.body.username){
      fieldsToUpdate.username = request.body.username;
    }
    
    const updatedUser = await User.findByIdAndUpdate(userId, { $set: fieldsToUpdate }, { new: true });

    if (!updatedUser) {
        return response.status(404).json({ message: 'User not found' });
    }

    response.status(200).json({
        message: 'User profile updated successfully',
        status: true,
        user: updatedUser,
    });
    } catch (error) {
      console.error(error);
      response.status(500).json({ message: 'Internal Server Error' });
    }
  }



  const changePassword = async (request, response) => {
    try {
        //  console.log("Change Password",request.body)
        //  console.log("User_id:",request.params.id);
        const user = await User.findOne({ _id:request.params.id});
        // console.log(user)
        if (!user) {
            return response.status(404).json({ message: 'User not found' });
        }

        const inputPassword = request.body.currentpassword.trim();
        const passwordFromDB = user.password
        const isPasswordValid =  bcrypt.compare(inputPassword, passwordFromDB);
        // console.log("ghjgh,jgj",isPasswordValid)

        if (!isPasswordValid) {
            return response.status(401).json({ message: 'Current password is incorrect' });
        }

    
        const newPasswordHash = await bcrypt.hash(request.body.newPassword, 10);
        // console.log("newPasswordHash",newPasswordHash);
        user.password = newPasswordHash;
        await user.save();

        return response.status(200).json({ message: 'Password changed successfully' });
    }
    catch (error) {
        console.error(error);
        return response.status(500).json({ message: 'Error while changing password' });
    }
};

  const displayUser = async (request, response) => {

    try {
        const userId = request.params.id;
        // console.log(userId);
        const Userdata = await User.find({ _id: userId});
        // console.log("USER DATA IS",Userdata)
        response.status(200).json({
            data: {
                data: Userdata 
            }
        });
    } catch (error) {
        console.log(error);
        response.status(500).json({ message: 'Error fetching User data' });
    }

}

const restPassword = async(request,response)=>{
    try{
        console.log("request.body",request.body);
       const  {email} = request.body

     const user = await User.findOne({email})
     if (!user) {
        return response.status(404).json({ message: 'User not found' });
    }
console.log("user",user);
    // Hash the new password and update the user's password
    request.body.newPassword = await bcrypt.hash(request.body.newPassword, 10);
    user.password = request.body.newPassword;

    await user.save();

    return response.status(200).json({ message: 'Password reset successfully' });
    }
    catch (error) {
  
        console.log(error);
        return response.status(500).json({ message: 'Error while resetting password' });
    } 
    
    }

    const forgotPassword =async(req,res)=>{

        try {
          console.log(req.body)
          const { email, newPassword } = req.body;
          
      
          // Find the user by email
          const user = await User.findOne({ email });
      
          if (!user) {
              return res.status(404).json({ message: 'User not found' });
          }
      
          // Hash the new password and update the user's password
          req.body.newPassword = await bcrypt.hash(newPassword, 10);
          user.password = req.body.newPassword;
      
          await user.save();
      
          return res.status(200).json({ message: 'Password reset successfully' });
      }
      catch (error) {
        
          console.log(error);
          return res.status(500).json({ message: 'Error while resetting password' });
      } 
      
      }
    
    
  
  
module.exports.displayUser= displayUser;
module.exports.userDelete = userDelete;
module.exports.changePassword = changePassword;
module.exports.userRegister = userRegister;
module.exports.userLogin =userLogin;
module.exports.updateUserProfile = updateUserProfile;
module.exports.restPassword = restPassword ;
module.exports.forgotPassword = forgotPassword;