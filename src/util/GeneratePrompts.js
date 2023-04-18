const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});

export default async function GeneratePrompts (prompt) {

    const openai = new OpenAIApi(configuration);
       const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: 'I am a bot. I will respond to your message. \n\n' + prompt,
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
      } 

      // console.log(response.data.choices[0].text);
       return response.data.choices[0].text;
};
