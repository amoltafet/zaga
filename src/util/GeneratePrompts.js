const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});

export default async function GeneratePrompts (prompt) {

    const openai = new OpenAIApi(configuration);
       const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 0.7,
        max_tokens: 100,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    });  
    // check the return value
     if (response.data.choices[0].text === "") {
       return "There was an error.";
      } 

      // console.log(response.data.choices[0].text);
       return (
        response.data.choices[0].text);
};
