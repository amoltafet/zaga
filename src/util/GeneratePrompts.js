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

  if (type === "code") {
    prompt = 'Create a list of variables for the following: \n\n' + recentPrompt;
  } else if (type === "chat") {
    prompt = 'I am a bot. I will respond to your message. \n\n' + prompt;
    recentPrompts.push(prompt);
  } else if (type === "citations") {
    prompt = 'Create a list of citations used in the following: \n\n' + recentPrompt;
  } else if (type === "description") {
    prompt = 'Create a list of descriptions used in the following: \n\n' + recentPrompt;
  } else if (type === "questions") {
    prompt = 'Create a list of questions used in the following: \n\n' + recentPrompt;
  } else {
    return "There was an error.";
    }; 


    const openai = new OpenAIApi(configuration);
     /*  const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 0.9,
        max_tokens: 150,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0.6,
    });  
    console.log(response);
    // check the return value
     if (response.status !== 200) {
       return "There was an error.";
      } */

      // console.log(response.data.choices[0].text);
<<<<<<< HEAD
       return (
        response.data.choices[0].text);
=======
       return "response.data.choices[0].text";
>>>>>>> 25121e1755828e23923ea06a04a8d2900c5f17df
};

