import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { BASE_URL, SELF_URL } from '../Urls'
const Urls = () => {

  const { url } = useParams()
  const [Loading, setLoading] = useState(false)
  const GetUrl = () => {
    fetch(`${BASE_URL}?short=${url}`).then(r => r.json()).then(data => {
      console.log(data)
      if (data.message == 'Not Found') {
        return window.location.href = SELF_URL

      }
      window.location.href = data.link
    }).catch(err => {
      console.log(err)
      window.location.href = SELF_URL
    })
  }

  useEffect(() => {
    GetUrl()
  }, [])

  return (
    <div>
      {
        !Loading && <div className='w-screen h-screen bg-[#212529] flex items-center justify-center'>
          <h1 className='text-white text-2xl'>Waiting ...</h1>
        </div>
      }</div>
  )
}

export default Urls