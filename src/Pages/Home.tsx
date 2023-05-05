import { useState, useEffect } from 'react'
import { Button } from "../Components/Buttons"
import { Input } from "../Components/Inputs"
import { ParagraphLink } from "../Components/Texts"
import { BASE_URL, SELF_URL } from '../Urls'


interface Where {
  short: string
  url: string
}

const Home = () => {

  const [Where, setWhere] = useState<Where|null>(null)
  const [ProvideLink, setProvideLink] = useState<string|null>(null)

  useEffect(() => {
      console.log('rendered')
  }, [])
  

  const Shorting = () => {

     fetch(`${BASE_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        url: ProvideLink
      })
    }).then(r => r.json()).then(data => {
      
    const input = document.querySelector<HTMLInputElement>('input')
    if(input){
      input.value = ''
    }

      setWhere(data)
    })

  }

  return (
    <div className='w-screen h-screen bg-[#f7f7f7]'>
      <div className='w-full h-full flex flex-col items-center justify-center gap-5'>
        
        <h1 className='text-4xl font-bold text-[#ff3636]'>SHORT URL</h1>
        <h2 className='text-xl'>Paste the URL to be shortened</h2>
        <div className='flex flex-row gap-5'>
          <Input
            placeholder="Type something"
            Change={(e) => {
              setProvideLink(e.target.value)
            }}
          />
          <Button
            text="Short"
            Click={() => {
              if(ProvideLink === null){
                alert('Provide a link')
                return
              }
              Shorting()
            }}
          />
        </div>

            {
              Where !== null && <ParagraphLink
              text={SELF_URL + '/' + Where.short}
              where={Where.url}
            />
            }
        
      </div>
    </div>
  )
}

export default Home