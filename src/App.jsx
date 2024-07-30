import { useState, useCallback, useEffect, useRef} from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [lowerCaseChoice, setLowerCaseChoice] = useState(true);
  const [upperCaseChoice, setUpperCaseChoice] = useState(false);
  const [numberChoice, setNumberChoice] = useState(false);
  const [symbolChoice, setSymbolChoice] = useState(false);
  const [password, setPassword] = useState("");
  const copyPassword=useRef(null)

  // const stateChanger = (setterFunction, value) => {
  //   setterFunction(!value);
  //   console.log(!value);
  // };

  
  const passwordGenerator = useCallback(  
    () =>{
      let chars=""
      let pass=""
      if(lowerCaseChoice){
        chars+="abcdefghijklmnopqrstuvwxyz";
      }
      if(upperCaseChoice){
        chars+="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      }
      if(numberChoice){
        chars+="0123456789";
      }
      if(symbolChoice){
        chars+="~!@#$%^&*()_+=-{}[]:;<>,.?/"
      }
      
      for(let i=0; i<length; i++){
        let x= Math.floor(Math.random()*chars.length);
        pass+=chars.charAt(x);
      }
      setPassword(pass);
    }, [length, lowerCaseChoice, upperCaseChoice, numberChoice, symbolChoice, setPassword])
  
  useEffect(() => {
    passwordGenerator();
  }, [length, lowerCaseChoice, upperCaseChoice, numberChoice, symbolChoice] )

  const copytoClipboard = useCallback(
    (e) => {
      e.preventDefault();
      copyPassword.current?.select();
      window.navigator.clipboard.writeText(password);

      setTimeout(() => {
        copyPassword.current.setSelectionRange(0, 0);
      }, 250);
    }, [password])

  // password = (() => {
  //   return passwordGenerator();
  // })();
  
  const stateChanger = (setterFunction, value) => {
    // Count the number of true values
    const trueCount = [lowerCaseChoice, upperCaseChoice, numberChoice, symbolChoice].filter(Boolean).length;
    
    if (value && trueCount === 1) {
      // If only one true value, do not allow it to be set to false
      alert("Choose at least 1 option");
      // setterFunction(true);
      return;
    }
    
    // Toggle the boolean value
    setterFunction(!value);
    
    // console.log(!value);
  };

  
  return (
    <>
      <div className="fixed w-full h-screen bg-black">
        <div className='fixed flex flex-col items-center justify-center m-0 inset-x-0'>
          <h2 className='bg-white text-5xl px-3 py-3 m-0 text-black w-full text-center'><strong>Password Generator</strong></h2>
          <div className='my-5 text-xl text-black p-2 bg-white flex-col items-center justify-center'>
            <h3 className='flex flex-col items-center justify-center'><strong className=''>Your Password is:</strong></h3>
            <form className='flex flex-row items-center justify-center'>
              <input type="text" value={password} ref={copyPassword} readOnly className='border-2 border-black m-2 w-80 h-10 mx-0'/>
              <button onClick={copytoClipboard} className="w-16 h-10 mx-0 bg-black text-white"><h6>Copy</h6></button>
              {/* <button className="m-1 w-24 h-10 flex  bg-white text-black" onClick={()=>colorChanger('white')}><h6>Submit</h6></button> */}
            </form>
            <div className='flex flex-col items-center justify-center'>
              <button className="px-2 h-10 mx-0 bg-black text-white" onClick={passwordGenerator}><h6>Generate new Password</h6></button>
            </div>
          </div>
          <div className='my-2 text-xl text-black p-2 bg-white flex-col items-center justify-center'>
            <h4 className='flex flex-col items-center justify-center p-3 text-white bg-black text-3xl' ><strong className=''>Customize Your Password</strong></h4>
            <div className='my-3 flex flex-col items-center justify-center bg-black text-white' >
              <form className='flex flex-col items-center justify-center bg-black text-white'>
                <label className="m-1 px-2 flex items-center justify-center bg-white text-black"><strong>Customize Length</strong></label>
                <input type="range" min={8} max={20} value={length} onChange={(e)=>setLength(e.target.value)} className=' bg-white text-black border-2 border-black my-2 w-64 h-5'/>
                {/* <button className="m-1 w-24 h-10 flex  bg-white text-black" onClick={()=>colorChanger('white')}><h6>Submit</h6></button> */}
                <label className="m-0 w-full py-2 flex items-center justify-center bg-black text-white"><h6>Password Length : </h6> <h6 className='text-red-500 mx-2'> {length}</h6></label>
              </form>
            </div>
            <div className='my-3 flex flex-col items-center justify-center bg-black text-white' >
              <form className='flex flex-col items-center justify-center bg-black text-white'>
                <label className="m-1 px-2 flex items-center justify-center bg-white text-black"><strong>Customize Characters</strong></label>
                <div className='flex flex-row items-center justify-center bg-black text-white'>
                  <div className='flex flex-col items-center justify-center bg-black text-white'>
                    <div className='flex flex-row mx-2 my-0 items-center justify-center bg-black text-white'>
                      <label className="flex flex-row w-30 px-2 items-center justify-center bg-white text-black">LowerCase</label>
                      <input type="checkbox" checked={lowerCaseChoice} onChange={()=>stateChanger(setLowerCaseChoice, lowerCaseChoice)} className=' bg-white text-black border-2 border-black mx-2 my-3'/>
                    </div>
                    <div className='flex flex-row mx-2 my-0 items-center justify-center bg-black text-white'>
                      <label className="flex flex-row w-30 px-2 items-center justify-center bg-white text-black">UpperCase</label>
                      <input type="checkbox" checked={upperCaseChoice} onChange={()=>stateChanger(setUpperCaseChoice, upperCaseChoice)} className=' bg-white text-black border-2 border-black mx-2 my-3'/>
                    </div>
                  </div>
                  <div className='flex flex-col items-center justify-center bg-black text-white'>
                    <div className='flex flex-row mx-2 my-0 items-center justify-center bg-black text-white'>
                      <label className="flex flex-row w-30 px-2 items-center justify-center bg-white text-black">Numbers</label>
                      <input type="checkbox" checked={numberChoice} onChange={()=>stateChanger(setNumberChoice, numberChoice)} className=' bg-white text-black border-2 border-black mx-2 my-3'/>
                    </div>
                    <div className='flex flex-row mx-2 my-0 items-center justify-center bg-black text-white'>
                      <label className="flex flex-row w-30 px-2 items-center justify-center bg-white text-black">Symbols</label>
                      <input type="checkbox" checked={symbolChoice} onChange={()=>stateChanger(setSymbolChoice, symbolChoice)} className=' bg-white text-black border-2 border-black mx-2 my-3'/>
                    </div>                  
                  </div>
                </div>
                {/* <button className="m-1 w-24 h-10 flex  bg-white text-black" onClick={()=>colorChanger('white')}><h6>Submit</h6></button> */}
                {/* <label className="m-0 w-full h-10 flex items-center justify-center bg-black text-white"><h6>Password Length : </h6> <h6 className='text-red-500 mx-2'> {length}</h6></label> */}
              </form>
            </div>
            
          </div>
        </div>
      </div>
    </>
  )
}

export default App
