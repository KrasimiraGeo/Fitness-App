import train from '../assets/train.jpg'

export const LandingPage = () => {

    return(
        <div className="landing">
            <div className='head'>
            <h1>STAY FIT</h1>
              <h4>Get your progress stats</h4>
              
              <button> Sign up</button>
            </div>
            <span className='holder'>
            <img src={train} alt='train-insane'></img>
            </span>
        </div>
    )
}