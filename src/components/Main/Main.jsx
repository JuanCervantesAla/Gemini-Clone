import React, { useContext } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/context'

const Main = () => {

    const {onSent, recentPrompt, showResult,loading,resultData,setInput,input,} = useContext(Context)

  return (
    <div className='main'>
      <div className='nav'>
        <p>Emini</p>
        <img src={assets.user_icon}/>
      </div>
      <div className='main-container'>
      {!showResult
      ?<>
        <div className='greet'>
                <p><span>Hello, User.</span></p>
                <p>How can i help you today?</p>
            </div>
            <div className='cards'>
                <div className='card'>
                    <p>Suggest best names for my capybara pet</p>
                    <img src={assets.compass_icon} />
                </div>
                <div className='card'>
                    <p>Tell me ways to cheat on Programacion para internet class</p>
                    <img src={assets.bulb_icon} />
                </div>
                <div className='card'>
                    <p>Teacher michel's complete activities</p>
                    <img src={assets.message_icon} />
                </div>
                <div className='card'>
                    <p>Teacher i need a 100 to pass your class</p>
                    <img src={assets.code_icon} />
                </div>
            </div>
        </>
        :
        <div className='result'>
            <div className='result-title'>
                <img src={assets.user_icon} alt=''/>
                <p>{recentPrompt}</p>
            </div>
            <div className='result-data'>
                <img src={assets.gemini_icon} alt=''/>
                {loading
                    ? 
                    <div className='loader'>
                        <hr/>
                        <hr/>
                        <hr/>
                    </div>
                    :
                    <p dangerouslySetInnerHTML={{__html:resultData}}></p>
                }
            </div>
        </div>
      }
        <div className='main-bottom'>
            <div className='search-box'>
                <input onChange={(e) => setInput(e.target.value)} value={input} type='text' placeholder='Enter a prompt here'></input>
                <div>
                    <img src={assets.gallery_icon}/>
                    <img src={assets.mic_icon}/>
                    {input?<img onClick={onSent} src={assets.send_icon}/>:null}
                </div>
            </div>
            <p className='bottom-info'>
                Gemini may display inaccurate info, including about people, so double check its responses. Your privacy and Gemini Apps
            </p>
        </div>
      </div>
    </div>
  )
}

export default Main
