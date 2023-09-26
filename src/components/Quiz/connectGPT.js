import OpenAI from 'openai'

const apiKey= process.env.REACT_APP_API_KEY;

const openai = new OpenAI({apiKey: apiKey, dangerouslyAllowBrowser: true})




const evaluateAnswer = async (question, userAnswer) => {
    console.log(apiKey)
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": "Who won the world series in 2020?"},
                {"role": "assistant", "content": "The Los Angeles Dodgers won the World Series in 2020."},
                {"role": "user", "content": "Where was it played?"}],
          });
        
        return console.log(response)
    } catch (error) {
        return console.log('error', error)
    }
}

export default evaluateAnswer