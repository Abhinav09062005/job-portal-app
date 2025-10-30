import express from 'express'
import { changeJobApplicationsStatus, changeVisiblity, getCompanyData, getCompanyJobApplicants, getCompanyPostedJobs, loginCompany, postJob, registerCompany } from '../controllers/companyController.js'

const router=express.Router()

//register a company
router.post('/register',registerCompany)

//company login
router.post('/login',loginCompany)

//get company data
router.get('/company',getCompanyData)

//post a job
router.post('/post-job',postJob)

//get applicants data
router.post('/applicants',getCompanyJobApplicants)

// get company job list
router.post('/list-jobs',getCompanyPostedJobs)

// change applicants status
router.post('/change-status',changeJobApplicationsStatus)

//change applicants visiblity
router.post('/change-visiblity',changeVisiblity)

export default router