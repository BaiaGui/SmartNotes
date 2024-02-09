import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { ChangeEvent, FormEvent, useState } from 'react'
import { toast } from 'sonner'

interface NewNoteCardProps{
  onNoteCreated: (noteContent:string) => void
}

let speechRecognition: SpeechRecognition | null = null

export function NewNoteCard({onNoteCreated}:NewNoteCardProps ) {

  const [isRecording, setIsRecording] = useState(false)
  const [shouldShowOnboarding, setShouldShowOnboarding] = useState(true);
  const [textAreaValue, setTextAreaValue] = useState('');

  function handleStartEditor() {
    setShouldShowOnboarding(false);
  }

  function handleContentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setTextAreaValue(event.target.value)
    if (event.target.value === "") {
      setShouldShowOnboarding(true);
    }
  }

  function handleSaveNote(event:FormEvent){

    event.preventDefault();
    if(textAreaValue === ''){
      return
    }

    onNoteCreated(textAreaValue);
    setTextAreaValue('');
    setShouldShowOnboarding(true);
    toast.success('Nota criada com sucesso!')
  }

  function handleStartRecording(){
    setIsRecording(true)
    setShouldShowOnboarding(false)
    const isSpeechRecognitionAPIAvailable = 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window

    if(!isSpeechRecognitionAPIAvailable){
      alert('Infelizmente seu navegador não suporta essa funcionalidade')
      return
    }
    
    const speechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition
    speechRecognition = new speechRecognitionAPI()

    speechRecognition.lang = 'pt-BR'
    speechRecognition.continuous = true
    speechRecognition.maxAlternatives = 1
    speechRecognition.interimResults = true
    speechRecognition.onresult = (event) =>{
    const transcription = Array.from(event.results).reduce((text, result)=>{
        return text.concat(result[0].transcript)
      }, '')

    setTextAreaValue(transcription)      
    }
    speechRecognition.onerror = (event) =>{
      console.error(event)
    }
    speechRecognition.start()

  }

  function handleStopRecording(){
    setIsRecording(false)
    if(speechRecognition)
      speechRecognition.stop()
  }


  return (
    <Dialog.Root>
      <Dialog.Trigger className='flex flex-col gap-3 text-left rounded-md bg-slate-700 p-5 hover:ring-2 outline-none hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400'>
        <span className='text-small font-medium text-slate-200'>Adicionar Nota</span>
        <p className='text-sm text-slate-400 leading-6'>Grave uma nota em áudio que será convertida para texto automaticamente.</p>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className='inset-0 fixed bg-black/60' />
        <Dialog.Content className='outline-none z-10 fixed inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 overflow-hidden bg-slate-700 md:max-w-[640px] w-full md:h-[60vh] md:rounded-md flex flex-col'>
          <Dialog.Close className='absolute top-0 right-0 p-1.5 text-slate-400 bg-slate-800 hover:text-slate-100'>
            <X className='size-5' />
          </Dialog.Close>
          <form className='flex flex-col flex-1'>
            <div className='flex flex-1 flex-col gap-3 p-5'>
              <span className='text-small font-medium text-slate-300'>
                Adicionar Nota
              </span>
              {shouldShowOnboarding ?
                (
                  <p className='text-sm text-slate-400 leading-6'>Comece&nbsp;
                    <button type='button' onClick={handleStartRecording} className='text-lime-400 font-medium hover:underline'>gravando uma nota</button>&nbsp;em áudio ou se preferir&nbsp;
                    <button type='button' onClick={handleStartEditor} className='text-lime-400 font-medium hover:underline'> utilize apenas texto</button>.
                  </p>
                ):
                (
                  <textarea onChange={handleContentChange} value={textAreaValue} placeholder='Comece a digitar...' autoFocus className='text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none placeholder:text-slate-500'></textarea>
                )}
            </div>

            {isRecording?
            (
              <button type='button' onClick={handleStopRecording} className='flex items-center gap-2 w-full bg-slate-900 text-slate-300 py-4 px-16 justify-center text-sm outline-none hover:bg-slate-800'>
                <div className='size-3 rounded-full bg-red-500 animate-pulse'/>
                Gravando! (Clique p/ interromper)
            </button>
            ):
            (
              <button type='button' onClick={handleSaveNote}  className='flex w-full bg-lime-400 text-lime-950 py-4 px-16 justify-center text-sm outline-none hover:bg-lime-500'>
              Salvar nota
            </button>
            )
            }
           
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}