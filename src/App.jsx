import Lists from './components/Lists'
import Archived from './components/Archived'
import Input from './components/Input'

import Sidebar, { SideBarItem } from './components/Sidebar'
import { Archive, TextCursorInput, List} from "lucide-react"
import {Routes, Route} from "react-router-dom"
import { ApplicationProvider } from './context/ApplicationContext'

import './App.css'

function App() {

  return (
    
    <ApplicationProvider>
      <div className='flex h-screen'>
        <Sidebar> {/*this is whre you sidebar wraps the sidebarItem */}
          {/* and this is the Children being passed in sidebar */}
          <SideBarItem to="/input" text="Input" icon={<TextCursorInput size={20}/>}/>
          <SideBarItem to="/lists" text="List" icon={<List size={20}/>}/>
          <SideBarItem to="/archived" text="Archived" icon={<Archive size={20}/>}/>
        </Sidebar>

        <main className="flex-1 p-4">
          <Routes>
            <Route path="/input" element={<Input />} />
            <Route path="/lists" element={<Lists/>} />
            <Route path="/archived" element={<Archived />} />
          </Routes>
        </main>
      </div>
    </ApplicationProvider>
    
  )
}

export default App
