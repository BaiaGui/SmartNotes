import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'

export function NewNoteCard(){
    return(
      <Dialog.Root>
        <Dialog.Trigger className='flex flex-col gap-3 text-left rounded-md bg-slate-700 p-5 hover:ring-2 outline-none hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400'>
          <span className='text-small font-medium text-slate-200'>Adicionar Nota</span>
          <p className='text-sm text-slate-400 leading-6'>Grave uma nota em áudio que será convertida para texto automaticamente.</p>
        </Dialog.Trigger>
        <Dialog.Portal>
      <Dialog.Overlay className='inset-0 fixed bg-black/60' />
        <Dialog.Content className='z-10 fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden bg-slate-700 max-w-[640px] w-full h-[60vh] rounded-md flex flex-col'>
          <Dialog.Close className='absolute top-0 right-0 p-1.5 text-slate-400 bg-slate-800 hover:text-slate-100'>
            <X className='size-5'/>
          </Dialog.Close>
          <div className='flex flex-1 flex-col gap-3 p-5'>
            <span className='text-small font-medium text-slate-300'>
              Adicionar Nota
            </span>
            <p className='text-sm text-slate-400 leading-6'>
            Comece <button className='text-lime-400 font-medium hover:underline'>gravando uma nota</button> em áudio ou se preferir <button className='text-lime-400 font-medium hover:underline'>utilize apenas texto</button>.
            </p>
          </div>
          <button className='flex w-full bg-lime-400 text-lime-950 py-4 px-16 justify-center text-sm outline-none hover:bg-lime-500'>
          Salvar nota
          </button>
        </Dialog.Content>
      </Dialog.Portal>
        </Dialog.Root>
    )
}