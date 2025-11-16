import express from 'express';
import { requireAuth } from '@clerk/express';   // ✅ Correct import
import upload from '../config/multer.js';

import {
  getUserData,
  applyForJob,
  getUserJobApplications,
  updateUserResume
} from '../controllers/userController.js';

const router = express.Router();

// Protect all user routes
router.get('/user', requireAuth(), getUserData);
router.post('/apply', requireAuth(), applyForJob);
router.get('/applications', requireAuth(), getUserJobApplications);
router.post('/update-resume', requireAuth(), upload.single('resume'), updateUserResume);

export default router;
