import { LoginForm } from './components/auth/LoginForm'
import { RegisterForm } from './components/auth/RegisterForm'
import { NoteCard } from './components/notes/NoteCard'
import { NoteForm } from './components/notes/NoteForm'
import { NoteList } from './components/notes/NoteList'
function App() {

  const dummyNote = {
    id: "1",
    title: "Sample Note Title",
    content: "This is a sample note content. You can add more details here. lorem ipsum dolor sit amet lorem3",
    createdAt: new Date().toISOString(),
};

  return (
    <div>
      <NoteCard note={dummyNote}
      onEdit={()=>console.log("edit used")} onDelete={()=>console.log("ddleeete")} />
    </div>
  )
}

export default App
