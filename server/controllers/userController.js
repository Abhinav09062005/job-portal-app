import User from "../models/User.js";
import Job from "../models/job.js";
import JobApplication from "../models/jobApplication.js";
import { v2 as cloudinary } from "cloudinary";
export const getUserData = async (req, res) => {
  console.log("REQ.AUTH:", req.auth);
console.log("REQ.AUTH TYPE:", typeof req.auth);
console.log("REQ.AUTH KEYS:", req.auth && Object.keys(req.auth));
console.log("RAW AUTH HEADER:", req.headers.authorization);

const { userId } = req.auth();
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    res.json({ success: true, data: user });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// apply fo jb
export const applyForJob = async (req, res) => {
  const { jobId } = req.body;
const { userId } = req.auth();
  try {
    const isAlreadyApplied = await JobApplication.find({ userId, jobId });
    if (isAlreadyApplied.length > 0) {
      return res.json({
        success: false,
        message: "User has already applied for this job",
      });
    }
    const jobData = await Job.findById(jobId);
    if (!jobData) {
      return res.json({ success: false, message: "Job not found" });
    }
    await JobApplication.create({
      companyId: jobData.companyId,
      userId,
      jobId,
      data: Date.now(),
    });
    res.json({ success: true, message: "Job application successful" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// get user applied applications
export const getUserJobApplications = async (req, res) => {
  try {
const { userId } = req.auth();
    const applications = await JobApplication.find({ userId })
      .populate("companyId", "name email image")
      .populate("jobId", "title description location category level salary")
      .exec();
    if (!applications) {
      return res.json({ success: false, message: "No applications found" });
    }
    return res.json({ success: true, applications });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// update user profile
export const updateUserResume = async (req, res) => {
  try {
const { userId } = req.auth();
    const resumeFile = req.resumeFile;
    const userData = await User.findById(userId);
    if (resumeFile) {
      const resumeUpload = await cloudinary.uploader.upload(resumeFile.path);
      userData.resume = resumeUpload.secure_url;
    }
    await userData.save();
    res.json({ success: true, message: "Resume updated successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
