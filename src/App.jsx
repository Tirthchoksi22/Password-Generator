import { useState, useCallback, useEffect, useRef } from "react"

function App() {
  const [length, setLength]= useState(8)
  const [number , setNumber]= useState(false)
  const [character, setCharacter]= useState(false)  
  const [password, setPassword] = useState("")
  //Useref hooks
  const passwordRef= useRef(null)

  const passwordGenerator =useCallback(()=>{
    let pass=""
    let str ="ABCDEFGHIJKLMNOPQRSDTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (number) str+= "0123456789"
    if (character) str+= "@#$%&(){}"
    for (let i =1; i<=length; i++){
      let char = Math.floor(Math.random()*str.length + 1)
      pass+=str.charAt(char)
    }
    setPassword(pass)
  }, [length, number, character, setPassword])
  useEffect(()=>{
    passwordGenerator()
  },[passwordGenerator, length, character, number])

  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
    alert("Password Copied")
  },[password])
  return (
    <>

      <div className="w-full max-w-md mx-auto rounded-lg shadow-md px-4 py-3 my-8 text-orange-500
      bg-gray-700">
        <h1 className="text-white text-center my-3  text-2xl font-bold ">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input type="'text'" value={password} className="outline-none w-full py-1 px-3 rounded-md"
          placeholder="password"
          readOnly
          ref={passwordRef} />
          <button className="mx-2 px-3 py-0.5 rounded-md text-white bg-blue-700 shadow-lg"
          onClick={copyPasswordToClipboard}>Copy</button>

        </div>
        <div className="flex gap-x-6 text-sm">
          <div className="flex items-center gap-x-1">
            <input 
            type="range"
            min={8}
            max={20}
            value={length}
            className="cursor-pointer"
            onChange={(e)=>{setLength(e.target.value)}} />
            <label>Length:{length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input 
            type="checkbox"
            defaultChecked={number}
            id="numberInput"
            onChange={()=>{
              setNumber((prev)=> !prev)
            }}/>
            <label>Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input 
            type="checkbox"
            defaultChecked={character}
            id="CharacterInput"
            onChange={()=>{
              setCharacter((prev)=> !prev)
            }}/>
            <label>Character</label>
          </div>

        </div>
      </div>
    </>
  )
}

export default App
