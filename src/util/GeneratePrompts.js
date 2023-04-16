const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: "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",
});

export default async function GeneratePrompts ({ prompt}) {

    const openai = new OpenAIApi(configuration);

    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 0.7,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    });

        return response.data.choices[0].text;

};
