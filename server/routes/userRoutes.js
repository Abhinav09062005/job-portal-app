import express from 'express';

const router=express.Router();
import { getUserData, applyForJob, getUserJobApplications, updateUserResume } from '../controllers/userController.js';
import upload from '../config/multer.js';
router.get('/user',getUserData)

router.post('/apply',applyForJob)
router.get('/applications',getUserJobApplications)
router.post('/update-resume',upload.single('resume'),updateUserResume)

export default router;