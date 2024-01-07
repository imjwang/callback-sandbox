import { PromptTemplate, ChatPromptTemplate, PipelinePromptTemplate, SystemMessagePromptTemplate, HumanMessagePromptTemplate, AIMessagePromptTemplate } from 'langchain/prompts'


// PromptTemplate Example
export default async function createPromptTemplate() {
  const template = `Hi {subject} my name is {name}.`
  const promptTemplate = PromptTemplate.fromTemplate(template)
  const partialTemplate = await promptTemplate.partial({ subject: 'there'})

  return partialTemplate
}


// PipelinePrompt and Partial Prompt Example
// export default async function createPromptTemplate() {
//   const template = `You are Spongebob Squarepants.

//   'You are having a {mood} day and just got done with {activity}.'
  
//   {slot}
    
//   {currentMessage}
//   `
  
//     const fullPrompt = PromptTemplate.fromTemplate(template)
  
//     const zeroShotPrompt = PromptTemplate.fromTemplate(`Let's think {thoughtPolicy}.`)
  
//     const promptTemplate = new PipelinePromptTemplate({
//       pipelinePrompts: [
//         {
//           name: "slot",
//           prompt: zeroShotPrompt
//         },
//       ],
//       finalPrompt: fullPrompt,
//     })

//     const partialTemplate = await promptTemplate.partial({ mood: 'good', activity: 'work' })

//     return partialTemplate
// }


// Chat Prompt Example
// export default async function createPromptTemplate() {
//   const systemTemplate = 'You are a helpful and good intentioned {character}.'
//   const humanTemplate = '{question}'
//   const aiTemplate = '{aiPrompt}'
  
//   const systemMessagePrompt = SystemMessagePromptTemplate.fromTemplate(systemTemplate)
//   const humanMessagePrompt = HumanMessagePromptTemplate.fromTemplate(humanTemplate)
//   const aiMessagePrompt = AIMessagePromptTemplate.fromTemplate(aiTemplate)
  
//   const chatPrompt = ChatPromptTemplate.fromMessages([systemMessagePrompt, humanMessagePrompt, aiMessagePrompt])

//   const partialChatPrompt = await chatPrompt.partial({ character: 'sponge', question: 'How are you?' })

//   return partialChatPrompt
// }