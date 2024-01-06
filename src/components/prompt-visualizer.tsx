import { useState } from 'react'
import type { PromptTemplate, ChatPromptTemplate, PipelinePromptTemplate } from 'langchain/prompts'

type PromptVisualizerProps = {
  promptTemplate: PromptTemplate | ChatPromptTemplate | PipelinePromptTemplate
}

export function PromptVisualizer({promptTemplate}: PromptVisualizerProps) {
  const [prompt, setPrompt] = useState<string | undefined>(undefined)
  const [inputVariables, setInputVariables] = useState<Record<string, string>>({})

  let template
  if (promptTemplate.template) { 
    template = promptTemplate.template
  }
  else if (promptTemplate.promptMessages) {
    template = promptTemplate.promptMessages.map((m) => m.prompt.template).join('\n')
  }
  else if (promptTemplate.pipelinePrompts) {
    const finalPrompt = promptTemplate.finalPrompt.template
    const subPrompts = promptTemplate.pipelinePrompts.map((m) => `${m.name}: ${m.prompt.template}`).join('\n')
    template = `------FINAL TEMPLATE------\n${finalPrompt}\n------PIPELINE TEMPLATES------\n${subPrompts}`
  }


  let promptVariables

  if (promptTemplate.inputVariables.length) {
    promptVariables = promptTemplate.inputVariables
  }
  else {
    const pipelinePromptNames = promptTemplate.pipelinePrompts.map(p => p.name)
    promptVariables = promptTemplate.finalPrompt.inputVariables.filter(v => !pipelinePromptNames.includes(v) && !Object.keys(promptTemplate.partialVariables).includes(v))
  }



  const handleClick = async () => {
    if (Object.values(inputVariables).length !== promptVariables.length) {
      alert('Please fill out all input variables')
      return
    }
    const formattedPrompt = await promptTemplate.format(inputVariables)
    setPrompt(formattedPrompt)
  }

  return (
    <div className="p-10 h-max bg-blue-200 justify-center items-center">
    <div className="py-2">
    <h2 className="tracking-tighter text-lg font-semibold">Template</h2>
    <p className="bg-pink-300 p-1 rounded-md whitespace-pre">
      {template}
    </p>
    </div>
      <div className="flex flex-row">
    <div className="p-2 flex flex-col gap-2 flex-grow">
    <h2 className="tracking-tighter text-lg font-semibold">Input Variables</h2>
    {
      promptVariables.map((v,idx) => {
        return (
          <input
            className="p-1 rounded-sm"
            key={idx}
            placeholder={v}
            onChange={(e) => setInputVariables({...inputVariables, [v]: e.target.value})}
            value={inputVariables[v]}
          />
        )
      })
    }
      </div>
      {promptTemplate.partialVariables && (
      <div className="p-2 flex flex-col gap-2 flex-grow">
      <h2 className="tracking-tighter text-lg font-semibold">Partial Variables</h2>
      {
        Object.entries(promptTemplate.partialVariables).map(([k, v]) => {
          return (
            <p key={k}>
              {k}: {v}
            </p>
          )
        })
      }
    </div>
      )
      }

      </div>
    <button className="w-16 h-8 font-semibold text-sm bg-lime-500 rounded-md hover:bg-yellow-300 p-1 border-gray-100 border-2" onClick={handleClick}>
      Format
    </button>
    {prompt && (
    <div className="py-2">
    <h2 className="tracking-tighter text-lg font-semibold">Prompt</h2>
    <p className="bg-lime-300 p-1 rounded-md whitespace-pre">
      {prompt}
    </p>
    </div>
    )
    }
  </div>
  )
}