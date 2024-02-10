import express from "express";
import multer from "multer";
import Profile from "../models/profileModel.js";
import Expertise from "../models/profileModel.js";
import LoginData from "../models/login.js";
import cors from "cors";
// import { useNavigate } from "react-router-dom";
import Project from "../models/Project.js";
import CommunityPosts from "../models/communityPost.js";
import mongoose from "mongoose";
import coursePosts from "../models/coursePosts.js";
import notification from "../models/notificationModel.js";

// import upload from "../utils/upload.js";

const router = express.Router();

//API FOR LOGIN
router.post("/api/login", async (req, res) => {
  try {
    console.log(req.body);
    const loginResponse = req.body;
    const loginData = new LoginData({ loginResponse });
    await loginData.save();

    res.status(201).send("Login data stored successfully");
  } catch (error) {
    console.error("Error storing login data:", error);
    res.status(500).send("Internal server error");
  }
});

router.get("/api/getlogin", async (req, res) => {
  try {
    // Assuming you want to retrieve all login data
    const loginData = await LoginData.find();

    res.status(200).json(loginData);
  } catch (error) {
    console.error("Error retrieving login data:", error);
    res.status(500).send("Internal server error");
  }
});
router.post("/api/profileModel", async (req, res) => {
  try {
    const profileData = req.body;

    const newProfile = new Profile(profileData);

    await newProfile.save();
    // console.log('Received profile data:', profileData);
    res.status(200).json(newProfile);
  } catch (error) {
    console.error("Error saving profile data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.get("/getprofile", async (req, res) => {
  const userId = req.query.email;
  console.log(userId);
  const profile = await Profile.find({ email: userId });
  res.json(profile);
  // console.log(profile);
});
//Project upload api
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  // filename: (req, file, cb) => {
  //   cb(null, Date.now() + '-' + file.originalname);
  // }
});
const upload = multer({ storage: storage });

const uploadImage = async (request, response) => {
  const fileObj = {
    path: request.file.path,
    name: request.file.originalname,
  };

  try {
    // const file = await File.create(fileObj);
    console.log(fileObj);
    response
      .status(200)
      .json({ path: `http://localhost:8080/${fileObj.path}` });
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ error: error.message });
  }
};

const getImage = async (request, response) => {
  try {
    const file = await File.findById(request.params.fileId);

    file.downloadCount++;

    await file.save();

    response.download(file.path, file.name);
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ msg: error.message });
  }
};

router.post("/upload", upload.single("file"), uploadImage);
router.get("/file/:fileId", getImage);

// router.post('/api/login', async (req, res) => {
//   try {

//     const loginResponse = req.body;
//     const loginData = new LoginData({ loginResponse });
//     await loginData.save();

//     res.status(201).send('Login data stored successfully');
//   } catch (error) {
//     console.error('Error storing login data:', error);
//     res.status(500).send('Internal server error');
//   }
// });

//API FOR UPLOADING PROJECT
router.post("/api/saveProject", upload.single("image"), async (req, res) => {
  try {
    // const imageName = req.file.filename;
    console.log(req.body);
    const inputFields = req.body;

    // await Project.create({ image: imageName });

    const newProject = new Project({
      ...inputFields,
      //  image: imageName,
    });

    await newProject.save();

    console.log("Received inputFields:", inputFields);
    res.status(200).json({ message: "Project data saved successfully" });
  } catch (error) {
    console.error("Error saving project data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
// END API FOR UPLOAD PROJECT

// API FOR GETTING PROJECT DETAILS IN FRONTEN
router.get("/api/fetchProject", async (req, res) => {
  try {
    Project.find({}, "projectId inputFields image").then((data) => {
      res.send({ status: "ok", data: data });
    });
  } catch (error) {
    res.json({ status: error });
  }
});
router.get("/api/addProject", async (req, res) => {
  const projectid = req.query.projectId;
  const project = await Project.find({ projectId: projectid });
  res.json(project);
});

router.post("/api/profileModel", async (req, res) => {
  try {
    const profileData = req.body;

    const newProfile = new Profile(profileData);

    await newProfile.save();
    // console.log('Received profile data:', profileData);
    res.status(200).json(newProfile);
  } catch (error) {
    console.error("Error saving profile data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.get("/getprofile", async (req, res) => {
  const userId = req.query.userid;
  console.log(userId);
  const profile = await Profile.find({ userid: userId });
  res.json(profile);
  console.log(profile);
});

//API FOR UPLOADING PROJECT

// END API FOR UPLOAD PROJECT

// API FOR GETTING PROJECT DETAILS IN FRONTEN
router.get("/api/addProject", async (req, res) => {
  try {
    Project.find({}, "projectId inputFields image").then((data) => {
      res.send({ status: "ok", data: data });
    });
  } catch (error) {
    res.json({ status: error });
  }
});

router.post("/api/myQueryPosts", async (req, res) => {
  const username = req.body.userEmail;
  console.log(username);
  const sort = { _id: -1 };
  const sorted = await mongoose
    .model("CommunityPosts")
    .find({ authorEmail: username, postType: "QUERY" })
    .sort(sort);
  res.json(sorted);
});

router.get("/api/sortQueryPostsByLatest", async (req, res) => {
  //console.log(req);
  const sort = { _id: -1 };
  const sorted = await CommunityPosts.find({ postType: "QUERY" }).sort(sort);
  // console.log(sorted);
  res.json(sorted);
  //res.sendStatus(200);
});

router.get("/api/sortCoursePostsByLatest", async (req, res) => {
  //console.log(req);
  const sort = { _id: -1 };
  const sorted = await mongoose.model("coursePosts").find().sort(sort);
  console.log(sorted);
  res.json(sorted);
  //res.sendStatus(200);
});

router.post("/api/addPost", async (req, res) => {
  // const obj = {
  //   authorEmail : req.body.authorEmail,
  //   authorName : req.body.authorName,
  //   question : req.body.question,
  //   description : req.body.description,
  //   comments : []
  // }

  // const obj = {
  //   authorEmail : "g.kancharla@iitg.ac.in",
  //   authorName : "KANCHARLA ABHIJITH GOUD",
  //   question : "HELLO WORLD",
  //   description : "HELLO WORLD",
  //   postType : "QUERY",
  //   comments : []
  // }
  //console.log(req.body);
  // const obj = {
  //   authorEmail : "pratyush.r@iitg.ac.in",
  //   authorName : "PRATYUSH R",
  //   question : "HELLO WORLD",
  //   description : "HELLO WORLD",
  //   postType : "COURSE",
  //   comments : []
  // }
  const obj = {
    authorEmail: req.body.authorEmail,
    authorName: req.body.authorName,
    question: req.body.question,
    description: req.body.description,
    postType: req.body.postType,
    comments: [],
  };
  const resu = await mongoose.model("CommunityPosts").insertMany(obj);
  console.log(resu);
  res.sendStatus(200);
});

router.get("/api/getdetailquerybyid", async (req, res) => {
  const qid = req.query.id;
  console.log(qid);
  const resu = await mongoose.model("CommunityPosts").findOne({ _id: qid });
  console.log(resu);
  res.json(resu);
});

router.post("/api/updatePost", async (req, res) => {
  const pid = req.body.pid;
  const comment = req.body.comment;
  const commenterEmail = req.body.commenterEmail;
  const commenterName = req.body.commenterName;
  const post = await mongoose.model("CommunityPosts").findById(pid);

  post.comments.push({
    commenterEmail,
    commenterName,
    comment,
  });
  console.log(post);
  await post.save();
  res.sendStatus(200);
});

router.post("/api/myCoursePosts", async (req, res) => {
  const username = req.body.userEmail;
  console.log(username);
  const sort = { _id: -1 };
  const sorted = await mongoose
    .model("coursePosts")
    .find({ authorEmail: username })
    .sort(sort);
  res.json(sorted);
});

router.post("/api/addCourse", async (req, res) => {
  const resu = await mongoose.model("coursePosts").insertMany({
    ...req.body,
    comments: [],
  });
  console.log(resu);
  res.sendStatus(200);
});

//for fetching course
router.get("/api/getdetailcoursebyid", async (req, res) => {
  const qid = req.query.id;
  console.log(qid);
  const resu = await mongoose.model("coursePosts").findOne({ _id: qid });
  console.log(resu);
  res.json(resu);
});

//for posting comment in course page
router.post("/api/updateCoursePost", async (req, res) => {
  const pid = req.body.pid;
  const comment = req.body.comment;
  const commenterEmail = req.body.commenterEmail;
  const commenterName = req.body.commenterName;
  const post = await mongoose.model("coursePosts").findById(pid);

  post.comments.push({
    commenterEmail,
    commenterName,
    comment,
  });
  console.log(post);
  await post.save();
  res.sendStatus(200);
});

router.get("/api/search", async (req, res) => {
  try {
    // console.log("yaha to aa rhe hai");
    const searchTerm = req.query.target;
    const regex = new RegExp(searchTerm, "i");
    const results = await Profile.find({
      $or: [
        { email: regex },
        { name: regex },
        // Add more fields to search if needed
      ],
    }).limit(5);

    if (results.length > 0) {
      res
        .status(200)
        .send({ success: true, message: "Details", data: results });
    } else {
      res.status(200).send({ success: true, message: "Not found" });
    }
  } catch (err) {
    console.error("Error searching profiles:", err);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.post('/searchProjects', async(req, res) => {
  try {
      const searchTerm = req.body.search;

      const regex = new RegExp(searchTerm, 'i');

      const results = await Project.find({
          'projectconData.projectName': { $regex: regex }
      }).limit(5);

      if (results.length > 0) {
          res.status(200).send({ success: true, message: "Projects Found", data: results });
      } else {
          res.status(200).send({ success: true, message: "No projects found" });
      }
  } catch (err) {
      console.error('Error searching projects:', err);
      res.status(500).send({ message: 'Internal Server Error' });
  }
});

router.post("/api/sendNotification", async (req, res) => {
  try {
    const { senderName, senderEmail, receiverEmail, projectId } = req.body;

    const project = await Project.findOne({ projectId });

    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }

    const message = `${senderName} wants to collaborate with you on your project ${projectId}`;

    const newNotification = new Notification({
      senderName,
      senderEmail,
      receiverEmail,
      project,
      message,
    });

    await newNotification.save();

    res
      .status(201)
      .json({
        success: true,
        message: "Notification sent successfully",
        data: newNotification,
      });
  } catch (error) {
    console.error("Error sending notification:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.get('/api/showProject', async (req, res) => {
  try {
    const projects = await Project.find({}, 'projectId inputFields image')
      .sort({ createdAt: -1 }) // Sort by createdAt field in descending order (newest first)
      .limit(10); // Limit to the last 10 projects

    res.json({ status: 'ok', data: projects });
  } catch (error) {
    console.error('Error getting project details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post("/api/saveProject", upload.single("image"), async (req, res) => {
  try {
    const inputFields = req.body;

    const newProject = new Project({
      ...inputFields,
    });

    await newProject.save();

    console.log("Received inputFields:", inputFields);

    res
      .status(200)
      .json({ message: "Project and form data saved successfully" });
  } catch (error) {
    console.error("Error saving project data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;