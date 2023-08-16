import Motivation from "../models/motivationModel.js"

export const getRandomMotivation = async (req, res) => {
  try {
    const motivationSentences = await Motivation.find();
    const randomIndex = Math.floor(Math.random() * motivationSentences.length);
    const randomMotivation = motivationSentences[randomIndex].motivationText; // Use correct field name

    res.status(200).json({ motivation: randomMotivation });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};
