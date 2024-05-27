// import Report from "../models/reportProblem.js";

// export const submitProblemReport = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     console.log("User ID: ", userId);
//     const { problemDescription } = req.body;
//     console.log("Problem Description: ", problemDescription);
//     //console.log("Screenshot: ", screenshot);
//     console.log(req.body);
//     if (!problemDescription) {
//       return res
//         .status(400)
//         .json({ message: "Problem description is required!" });
//     }

//     // Create a new problem report
//     const newReport = new Report({
//       userId,
//       problemDescription,
//       screenshot: "",
//     });

//     // Save the screenshot
//     //await newReport.save();
//     res.status(201).json({ message: "Report submitted successfully!" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
