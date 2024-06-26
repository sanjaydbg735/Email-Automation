const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

exports.analyzeEmailContent = async (content) => {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Categorize the following email content:\n\n${content}\n\nCategories: Interested, Not Interested, More Information`,
    max_tokens: 60,
  });
  const category = response.data.choices[0].text.trim();
  return category;
};

exports.generateReply = async (content, category) => {
  let prompt;
  if (category === "Interested") {
    prompt = `Generate a reply for an email that expresses interest in a product, asking if they are willing to schedule a demo call.`;
  } else if (category === "Not Interested") {
    prompt = `Generate a polite reply for an email that expresses disinterest in a product.`;
  } else if (category === "More Information") {
    prompt = `Generate a reply for an email that requests more information about a product.`;
  }

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    max_tokens: 100,
  });
  return response.data.choices[0].text.trim();
};
