
import Job from "../models/job.js";


//get all jobs
export const getJobs=async(req,res)=>{
     try{
        const jobs=await Job.find({visible:true}).populate({path:'companyId',select:'-password'})

        if(!jobs){
            return res.json({success:false, message:"No jobs found"})
        }
        res.json({success:true, jobs})
     } catch(error){
         res.json({success:false, message:error.message})
     }
}


//get single job by ID
export const getJobById=async(req,res)=>{
try{
    const {id}=req.params
    const job=await Job.findById(id).populate({path:'companyId',select:'-password'})
}
catch(error){
    res.json({success:false, message:error.message})
}


}