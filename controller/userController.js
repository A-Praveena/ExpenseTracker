const User = require('../model/userSchema')
const bcrypt = require('bcrypt')

const userRegister = async (request, response) => {
    try {
        console.log("inside the signUp page")
        console.log(request.body);
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
        console.log("inside the login page");
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
        console.log(error);
        response.status(500).json({ message: error });
    }
}


const userDelete =('/:id', async (req, res) => {
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
});

module.exports.userDelete = userDelete;
module.exports.userRegister = userRegister;
module.exports.userLogin =userLogin;