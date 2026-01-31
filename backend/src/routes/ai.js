const express = require("express");
const { userAuth } = require("../middlewares/auth");
const {GoogleGenAI} = require("@google/genai")
const aiRouter = express.Router();
const ai = new GoogleGenAI({
    apiKey : process.env.GOOGLE_API_KEY
})
aiRouter.post("/profile/ai-suggestion", userAuth, async (req, res) => {
  try {
    const { about, skills } = req.user;

    if (!about) {
      return res.status(400).send("About text is required");
    }

    const prompt = `
Rewrite the following developer "About" section into a SINGLE professional paragraph which total characters should not exceeded 150.
Take about and skills as reference.
Do NOT give multiple options.
Do NOT add headings or bullet points.
Return ONLY the rewritten text.

Text:
"${about} and ${skills}"
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          text : prompt
        }
      ]
    });
    console.log(response.text)

    const suggestion = response.text;

    res.json({ suggestion });

  } catch (err) {
    console.error(err);
    res.status(500).send(err?.message || "API generation failed");
  }
});
module.exports = {aiRouter}
