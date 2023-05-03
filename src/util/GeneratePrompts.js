import pageInfo from "../context";

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});

let recentPrompts = [];
let recentPrompt = "";

export default async function GeneratePrompts (prompt, type) {
  // grab the most recent prompt
  if (recentPrompts.length > 0) {
    recentPrompt = recentPrompts[recentPrompts.length - 1];
  }

  if (type === "anything") {
    recentPrompts.push(prompt);
    prompt = 'I am a bot. I will respond to your message. \n\n' + prompt;
  }  else if (prompt === "BoxOne") {
      prompt =  pageInfo.find(page => page.title === type).boxOnePrompt + recentPrompt;
  } else if (prompt === "BoxTwo") {
      prompt =  pageInfo.find(page => page.title === type).boxTwoPrompt + recentPrompt;
  } else {
    // nothing
  }

   const openai = new OpenAIApi(configuration);
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 0.9,
        max_tokens: 150,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0.6,
    });  
    // check the return value
     if (response.status !== 200) {
       return "There was an error.";
      } 
      // console.log(response.data.choices[0].text);
       return response.data.choices[0].text;
};


