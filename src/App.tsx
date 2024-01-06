import { PromptVisualizer } from "./components/prompt-visualizer"
import { useState, useEffect } from "react"
import createPromptTemplate from "./prompts"
import { PromptTemplate, ChatPromptTemplate, PipelinePromptTemplate } from "langchain/prompts"

function App() {
  const [promptTemplate, setPromptTemplate] = useState<PromptTemplate | ChatPromptTemplate | PipelinePromptTemplate | undefined>(undefined)
  
  useEffect(() => {
    const getPrompt = async () => {
      setPromptTemplate( await createPromptTemplate() )
    }
    getPrompt()
  },[])

  if (!promptTemplate) {
    return (
      <p>loading...</p>
    )
  }

  return (
    <>
      <PromptVisualizer promptTemplate={promptTemplate} />
    </>
  )
}

export default App
