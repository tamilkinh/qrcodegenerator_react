import { useState } from 'react'
import './App.css'

function App() {
  const [img, setImg] = useState('')
  const [loading, setLoading] = useState(false)
  const [qrData, setQrData] = useState("")
  const [qrSize, setSizeData] = useState("")


  const handleGenerator = () => {
    const fetchItem = async () => {
      setLoading(true)

      try {
        const URL = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}pxx${qrSize}px&data=${qrData}`
        setImg(URL)

        setQrData('')
        setSizeData('')

      } catch (error) {
        console.log(error.message)
      } finally {
        setLoading(false)

      }
    }


    setTimeout(() => {
      (async () => fetchItem())()
    }, 2000)



  }

  const handleDownload = () => {

    fetch(img)
      .then((response) => response.blob())
      .then((blob) => { 
      const link = document.createElement("a")
    link.href=URL.createObjectURL(blob)
    link.download=`QR.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

  }
    )
}


return (
  <div className="container">
    <h2>QR CODE GENERATOR</h2>
    {loading && <p>Please Wait!...</p>}

    {img && <img src={img} alt="" />}
    <label htmlFor="input">Data For QR Code</label>
    <input type="text" placeholder='Enter your text or link' id='input' value={qrData}
      onChange={(e) => setQrData(e.target.value)} />
    <label htmlFor="input-size">Data QR Size e.g 150...</label>
    <input type="text" placeholder='Enter your Size' id='input-size' value={qrSize}
      onChange={(e) => setSizeData(e.target.value)} />
    <div className="buttons">
      <button className='Generate-btn' onClick={handleGenerator}>Generate QR Code</button>
      <button className='Download-btn' onClick={handleDownload}>Download QR Code</button>
    </div>
    <p>Designed by @Tamil</p>

  </div>
)
}

export default App
