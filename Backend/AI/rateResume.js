const { GoogleGenAI } = require("@google/genai");
const cosineSimilarity = require("compute-cosine-similarity");

function extractName(text) {
    const lines = text.split("\n");
    return lines[0]?.trim() || "Unknown";
}

function extractExperience(text) {
    const match = text.match(/(\d+)\+?\s*(years|yrs)/i);
    return match ? parseInt(match[1]) : 0;
}

function getMatchedSkills(jobSkills, resumeText) {
    const lowerResume = resumeText.toLowerCase();

    const matched = jobSkills.filter(skill =>
        lowerResume.includes(skill.toLowerCase())
    );

    const missing = jobSkills.filter(skill =>
        !lowerResume.includes(skill.toLowerCase())
    );

    const matchPercent = Math.round((matched.length / jobSkills.length) * 100);

    return { matched, missing, matchPercent };
}

async function rateResumes(jobData, resumes) {

    const ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY
    });

    const { jobDescription, skills, minExperience, educationRequirement } = jobData;

    const jobSkills = skills.split(",").map(s => s.trim());

    const jobContext = `
    Job Description: ${jobDescription}
    Skills: ${skills}
    Minimum Experience: ${minExperience} years
    Education: ${educationRequirement}
    `;

    const texts = [jobContext, ...resumes.map(r => r.text)];

    const response = await ai.models.embedContent({
        model: "gemini-embedding-001",
        contents: texts,
        taskType: "SEMANTIC_SIMILARITY"
    });

    const embeddings = response.embeddings.map(e => e.values);

    const jobVector = embeddings[0];

    const results = [];

    for (let i = 0; i < resumes.length; i++) {

        const resumeText = resumes[i].text;

        const similarity = cosineSimilarity(jobVector, embeddings[i + 1]);
        const aiScore = Math.round(similarity * 100);

        const candidateName = extractName(resumeText);

        const experience = extractExperience(resumeText);

        const { matched, missing, matchPercent } =
            getMatchedSkills(jobSkills, resumeText);

        results.push({
            candidateName: candidateName,
            userEmail: resumes[i].userEmail,
            resume: resumes[i].resume,

            aiScore: aiScore,

            skillMatchPercent: matchPercent,
            matchedSkills: matched,
            missingSkills: missing,

            candidateExperience: experience,
            requiredExperience: minExperience,

            educationRequirement: educationRequirement
        });
    }

    return results;
}

module.exports = { rateResumes };