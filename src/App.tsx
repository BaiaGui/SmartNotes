import { ChangeEvent, useState } from 'react'
import logo from './assets/LogoNLW.svg'
import { NewNoteCard } from './components/NewNoteCard'
import { NoteCard } from './components/NoteCard'


export function App() {

  interface Note{
      id: string,
      date: Date,
      content: string
  }

  const [shouldShowAddNoteCard, setShouldShowAddNoteCard] = useState(true)
  const [search, setSearch] = useState('')
  const [notes, setNotes] = useState<Note[]>(()=>{


  const storagedNotes = localStorage.getItem('notes');

    if(storagedNotes)
      return JSON.parse(storagedNotes)
    else
      return []
  })

  function onNoteCreated(noteContent: string){
    const newNote = {
      id: Math.random().toString(),
      date: new Date(),
      content: noteContent
    }

    const notesArray = [newNote, ...notes]
    setNotes(notesArray)
    localStorage.setItem('notes', JSON.stringify(notesArray) )
  }

  function handleSearch(event: ChangeEvent<HTMLInputElement>){
    const searchValue = event.target.value
    setSearch(searchValue);
    if(searchValue !== '')
      setShouldShowAddNoteCard(false)
    else
      setShouldShowAddNoteCard(true)
  }
  
  


  
  const filteredNotes = search !== ''?notes.filter(note => note.content.toLocaleLowerCase().includes(search.toLocaleLowerCase())):notes

  return (
    <div className='mx-auto max-w-6xl my-12 space-y-6'>
      <img src={logo} alt="NLW Expert" />
      <form className='w-full'>
        <input type="text" onChange={handleSearch} value={search} placeholder='Busque em suas notas...' 
          className='w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-slate-500' />
      </form>
      <div className='h-px bg-slate-700'/>

      <div className='grid grid-cols-3 gap-6 auto-rows-[250px]'>
        {shouldShowAddNoteCard&&<NewNoteCard onNoteCreated={onNoteCreated}/>}
        {filteredNotes.length !== 0 ?filteredNotes.map(note => {return <NoteCard note={note} key={note.id} /> }):<p className='text-slate-400'>Nota não encontrada...</p>}


      </div>    
    </div>

    
  )
}