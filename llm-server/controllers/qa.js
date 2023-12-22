const QA = require('../models/QA');


// Register a new user
const qasave = async (req, res, next) => {

  // const { userId, question, answer, totalTokens, responseTime, inputTokens, outputTokens } = req.body;
  const { userId, question, answer, model, favourite, totalTokens, responseTime, inputTokens, outputTokens } = req.body;
  console.log("req", req, "req body", req.body)


  try {
    // let qaData = JSON.stringify(qadata);
    // const qa = new QA({ userId, qadata:qaData, totalTokens, responseTime, inputTokens, outputTokens });
    const qa = new QA({ userId, question, answer, model, favourite, totalTokens, responseTime, inputTokens, outputTokens });
    console.log("qa created", qa)
    await qa.save();
    res.json({ message: 'Data saved' });
  } catch (error) {
    console.log("error", error)
    next(error);
  }
};

// Login with an existing user
const qalist = async (req, res, next) => {
  const { userId } = req.body;

  try {
    const data = await QA.find({ userId });


    res.json({ data });
  } catch (error) {
    next(error);
  }
};

module.exports = { qasave, qalist };