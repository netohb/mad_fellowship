import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import FounderForm from './pages/FounderForm'
import MentorRegister from './pages/MentorRegister'

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/founder" element={<FounderForm />} />
                <Route path="/mentor" element={<MentorRegister />} />
            </Routes>
        </BrowserRouter>
    )
}