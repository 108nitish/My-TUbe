import { createError } from "../error.js";
import User from "../models/user.js";
import Video from "../models/video.js";


export const addVideo = async (req, res, next) => {
    const newVideo = new Video({ userId: req.user.id, ...req.body });
    try {
        const savedVideo = await newVideo.save();
        res.status(200).json(savedVideo);
    } catch (err) {
        next(err);
    }
};


export const updateVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id);
        if (!video) return next(createError(404, "Video Not Found!!"));
        if (req.user.id === video.userId) {
            const updatedVideo = await Video.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                { new: true }
            );
            res.status(200).json(updatedVideo);
        }
        else {
            return next(createError(403, "You can update only your video!!"));
        }
    } catch (err) {
        next(err);
    }

};



export const deleteVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id);
        if (!video) return next(createError(404, "Video Not Found!!"));
        if (req.user.id === video.userId) {
            await Video.findByIdAndDelete(req.params.id);
            res.status(200).json("This video has been deleted!!");
        }
        else {
            return next(createError(403, "You can delete only your video!!"));
        }
    } catch (err) {
        next(err);
    }

};


export const getVideo = async (req, res, next) => {
    try {
        // console.log("video sent");
        const video = await Video.findById(req.params.id)
        res.status(200).json(video);
    } catch (err) {
        next(err);
    }

};


export const addView = async (req, res, next) => {
    try {
        await Video.findByIdAndUpdate(req.params.id, {
            $inc: { views: 1 },
        });
        res.status(200).json("The view has been increased.");
    } catch (err) {
        next(err);
    }
};



export const random = async (req, res, next) => {
    try {
        const videos = await Video.aggregate([{ $sample: { size: 40 } }]); 
        res.status(200).json(videos);
    } catch (err) {
        next(err);
    }
};


export const trend = async (req, res, next) => {
    try {
        const videos = await Video.find().sort({ views: -1 }); // sort in descending order on the beahlf of views

        res.status(200).json(videos);
    } catch (err) {
        next(err);
    }
};


export const sub = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        const subscribedChannels = user.subscribedUsers || [];

        if (subscribedChannels.length === 0) return res.status(200).json([]);  

        const videos = await Video.aggregate([
            {
                $match: {
                    userId: { $in: subscribedChannels },
                },
            },
            {
                $sort: { createdAt: -1 },  
            },
        ]);

        res.status(200).json(videos);
    } catch (err) {
        console.error("Error in sub aggregate:", err);
        next(err);
    }
};




export const getByTag = async (req, res, next) => {
    const tags = req.query.tags.split(","); 
    try {
        const videos = await Video.find({ tags: { $in: tags }, }).limit(20);  // to search videos with atleast one tag in above taglist and only return 20 videos
 
        res.status(200).json(videos);
    } catch (err) {
        next(err);
    }
};

export const search = async (req, res, next) => {
    const query = req.query.q;
    try {
        const videos = await Video.find({
            title: { $regex: query, $options: "i" }, // regex for ->> regular expression   and i for case insansative
        }).limit(40);
        res.status(200).json(videos);
    } catch (err) {
        next(err);
    }
};


export const like = async (req, res, next) => {
    const userId = req.user.id.toString();
    const videoId = req.params.id;

    try {
        const video = await Video.findById(videoId);

        if (video.likes.includes(userId)) { 
            video.likes.pull(userId);
        } else { 
            video.likes.push(userId);
            video.dislikes.pull(userId);
        }

        await video.save();
        res.status(200).json(video);
    } catch (err) {
        next(err);
    }
};


// Dislike a video
export const dislike = async (req, res) => {
    const userId = req.user.id.toString();
    const videoId = req.params.id;

    try {
        const video = await Video.findById(videoId);

        if (!video.dislikes.includes(userId)) {
            video.dislikes.push(userId); 
            video.likes = video.likes.filter((id) => id !== userId);
        }

        await video.save();
        res.status(200).json({ message: "Video disliked successfully", dislikes: video.dislikes });
    } catch (err) {
        next(err);
    }
};