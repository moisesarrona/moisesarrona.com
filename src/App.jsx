import { Route, Routes } from "react-router-dom"

import Header from "./app/components/template/Header"
import Lateral from "./app/components/template/Lateral"

import Note from "./app/components/note/Note"
import Terminal from "./app/components/terminal/Terminal"

import Home from "./app/landing/Home"
import About from "./app/landing/About"
import Contact from "./app/landing/Contact"
import Error from "./app/landing/Error"

import "./assets/css/style.css"

function App() {

  return (
    <>
        <Header />

        <Lateral />

        <Note />

        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/about" element={<About />}/>
            <Route path="/contact" element={<Contact />}/>
            <Route path="/*" element={<Error />}/>
        </Routes>

        <Terminal />

    </>
  )
}

export default App
