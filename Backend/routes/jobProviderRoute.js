const { rateResumes } = require("../AI/rateResume");
const fs = require("fs");
const path = require("path");
const express = require("express");

const jobProvider = require("../models/jobProvider");
const Company = require("../models/company");
const User = require("../models/user");

const router = express.Router();

const multer = require("multer");
const PdfParse = require("pdf-parse");
const Tesseract = require("tesseract.js");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        const suffix = Date.now();
        cb(null, suffix + "-" + file.originalname);
    }
});

const upload = multer({ storage });

router.post("/setjob", async (req, res) => {
    try {

        const data = req.body;
        const id = req.user.id;

        const newCompany = await Company.findOne({ user: id });

        if (!newCompany) {
            return res.status(404).json("user not found!!!");
        }

        if (newCompany.enabled === false) {
            return res.status(403).json("permission denied!!!");
        }

        const newjobProvider = new jobProvider({
            ...data,
            company: newCompany.id
        });

        const response = await newjobProvider.save();

        return res.status(200).json(response);

    } catch (err) {
        console.log(err);
        res.status(500).json("internal server error");
    }
});

router.get("/joblist", async (req, res) => {
    try {

        const list = await jobProvider.find();

        return res.status(200).json(list);

    } catch (err) {
        console.log(err);
        res.status(500).json("internal server error");
    }
});

router.put("/resume/:jobproviderId", upload.single("photo"), async (req, res) => {
    try {

        if (!req.file) {
            return res.status(400).json("file not uploaded");
        }

        const filepath = req.file.path;
        const userId = req.user.id;
        const jobProviderId = req.params.jobproviderId;

        if (!fs.existsSync(filepath)) {
            return res.status(400).json("file not found");
        }

        const resumeText = await extractText(filepath);

        const user = await User.findById(userId);

        const newjobProvider = await jobProvider.findById(jobProviderId);

        newjobProvider.resumeArray.push({
            resume: filepath,
            userEmail: user.email,
            text: resumeText
        });

        await newjobProvider.save();

        return res.status(200).json("resume added successfully");

    } catch (err) {
        console.log(err);
        res.status(500).json("internal server error");
    }
});

router.get("/resume/selected", async (req, res) => {
    try {

        const jobProviderid = req.user.id;

        const company = await Company.findOne({ user: jobProviderid });

        const newjobProvider = await jobProvider.findOne({
            company: company.id
        });

        const data = {
            jobDescription: newjobProvider.jobDescription,
            skills: newjobProvider.skills,
            minExperience: newjobProvider.minExperience,
            educationRequirement: newjobProvider.educationRequirement
        };

        const selectedResumes = await rateResumes(
            data,
            newjobProvider.resumeArray
        );

        newjobProvider.selectedResume = selectedResumes;
        await newjobProvider.save();

        return res.status(200).json("resume filtered successfully");

    } catch (err) {
        console.log(err);
        res.status(500).json("internal server error");
    }
});

async function extractText(filepath) {

    const ext = path.extname(filepath).toLowerCase();

    if (ext === ".pdf") {
        const buffer = fs.readFileSync(filepath);
        const data = await PdfParse(buffer);
        return data.text;
    }

    if (ext === ".png" || ext === ".jpg" || ext === ".jpeg") {
        const result = await Tesseract.recognize(filepath, "eng");
        return result.data.text;
    }

    throw new Error("Unsupported file type");
}

module.exports = router;