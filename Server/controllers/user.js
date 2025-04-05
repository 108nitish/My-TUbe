import { createError } from "../error.js"
import User from "../models/user.js"
import Video from "../models/video.js"


export const update = async (req, res, next) => {
    if (req.params.id === req.user.id) { 
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            },
                {
                    new: true
                }
            );
            res.status(200).json(updatedUser); 
        } catch (err) {
            next(err);
        }
    } else {
        return next(createError(403, "You can update only your account."));
    }
};


export const deleteUser = async (req, res, next) => {
    if (req.params.id === req.user.id) { 
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("User has been deleted :(");
        } catch (err) {
            next(err);
        }
    } else {
        return next(createError(403, "You can delete only your account."));
    }

};

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }

};


export const subscribe = async (req, res, next) => {
    try {
        const currentUser = await User.findById(req.params.id);

        if (currentUser.subscribedUsers.includes(req.user.id)) { 
            await User.findByIdAndUpdate(req.params.id, {
                $pull: { subscribedUsers: req.user.id },
            });
            await User.findByIdAndUpdate(req.params.id, {
                $inc: { subscribers: -1 },
            });

            return res.status(200).json("Unsubscribed from the channel.");
        } else {  
            await User.findByIdAndUpdate(req.params.id, {
                $push: { subscribedUsers: req.user.id },
            });
            await User.findByIdAndUpdate(req.params.id, {
                $inc: { subscribers: 1 },
            });

            return res.status(200).json("Subscribed to the channel.");
        }
    } catch (err) {
        next(err);
    }
};


export const unsubscribe = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.params.id,{
            $pull : { subscribedUsers : req.user.id},
        });
        await User.findByIdAndUpdate(req.params.id,{
            $inc : { subscribers : -1},
        });
        res.status(200).json("Channel UnSubsribed Successfully!!");

    } catch (err) {
        next(err);
    }

};

export const like = async (req, res, next) => {
    const id = req.user.id;
    const videoId = req.params.videoId;
    try {
      await Video.findByIdAndUpdate(videoId,{
        $addToSet:{likes:id},
        $pull:{dislikes:id}
      })
      res.status(200).json("The video has been liked.")
    } catch (err) {
      next(err);
    }
  };


  export const dislike = async (req, res, next) => {
    const id = req.user.id;
    const videoId = req.params.videoId;
    try {
      await Video.findByIdAndUpdate(videoId,{
        $addToSet:{dislikes:id},
        $pull:{likes:id}
      })
      res.status(200).json("The video has been disliked.")
  } catch (err) {
    next(err);
  }
};

export const updname = async(req, res, next) =>{
    const id = req.user.id;
    const {name} = req.body;

    try{ 
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $set: { name } },
            { new: true }  
        );
        // console.log(updatedUser);
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({user: updatedUser });
    }catch (err) {
        console.error(err);
        next(err);
    }
};

export const updpass = async(req, res, next) =>{
    const id = req.user.id;
    const {password} = req.body;

    try{ 
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $set: { password } },
            { new: true }  
        );
        // console.log(updatedUser);
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({user: updatedUser });
    }catch (err) {
        console.error(err);
        next(err);
    }
};

export const updimg = async(req, res, next) =>{
    const id = req.user.id;
    const {img} = req.body;

    try{ 
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $set: { img } },
            { new: true }  
        );
        // console.log(updatedUser);
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({user: updatedUser });
    }catch (err) {
        console.error(err);
        next(err);
    }
};

