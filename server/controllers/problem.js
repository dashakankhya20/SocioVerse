import Problem from "../models/Problem.js";

export const submitProblemReport = async (req, res) => {
  try {
    const { userId } = req.params;
    const { description, featureName } = req.body;
    console.log(req.body);
    if (!description) {
      res.status(400).json({ message: "Problem description is required" });
    }
    if (!featureName) {
      res.status(400).json({ message: "Feature name is required" });
    }

    // Create a new instance of Problem model
    const newProblem = new Problem({
      userId: userId,
      description: description,
      feature: featureName,
    });

    // Save the instance to the database
    const savedProblem = await newProblem.save();
    console.log(savedProblem);
    // Respond with success message and saved data
    res
      .status(201)
      .json({
        message: "Your response has been submitted!",
        problem: savedProblem,
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
