export function NoteCard(){
    return(
        <button className='outline-none rounded-md bg-slate-800 p-5 space-y-3 overflow-hidden relative hover:ring-2 hover:ring-slate-600 text-left focus-visible:ring-2 focus-visible:ring-lime-400'>
          <span className='text-small font-medium text-slate-300'>Adicionar Nota</span>
          <p className='text-sm text-slate-400 leading-6'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione aliquid dignissimos impedit porro molestias itaque laudantium nulla a. Atque repudiandae in repellendus ab vitae nulla ratione rerum quibusdam cupiditate minima.</p>
          <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none'/>
        </button>
    )
}