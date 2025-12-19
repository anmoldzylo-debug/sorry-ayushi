import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [noClickCount, setNoClickCount] = useState(0);
  const [forgiven, setForgiven] = useState(false);
  const [noButtonStyle, setNoButtonStyle] = useState({});
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      createHeart();
    }, 300);

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      clearInterval(interval);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const createHeart = () => {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDelay = Math.random() * 2 + 's';
    heart.style.fontSize = (Math.random() * 20 + 15) + 'px';

    const heartsContainer = document.getElementById('hearts');
    if (heartsContainer) {
      heartsContainer.appendChild(heart);
      setTimeout(() => heart.remove(), 6000);
    }
  };

  const createSparkles = () => {
    const sparklesContainer = document.getElementById('sparkles');
    if (sparklesContainer) {
      for (let i = 0; i < 20; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.animationDelay = Math.random() * 0.5 + 's';
        sparklesContainer.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 2000);
      }
    }
  };

  const handleYesClick = () => {
    setForgiven(true);
    createConfetti();
    createSparkles();
  };

  const handleNoClick = () => {
    setNoClickCount(prev => prev + 1);

    if (noClickCount >= 2) {
      const randomX = Math.random() * 400 - 200;
      const randomY = Math.random() * 200 - 100;

      setNoButtonStyle({
        transform: `translate(${randomX}px, ${randomY}px) rotate(${Math.random() * 360}deg)`,
        transition: 'transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
      });
    }
  };

  const createConfetti = () => {
    const celebration = document.createElement('div');
    celebration.className = 'celebration';
    document.body.appendChild(celebration);

    const colors = ['#ff0a54', '#ff477e', '#ff7096', '#ff85a1', '#fbb1bd', '#f9bec7'];
    const shapes = ['circle', 'square', 'triangle'];

    for (let i = 0; i < 150; i++) {
      setTimeout(() => {
        const confetti = document.createElement('div');
        confetti.className = `confetti ${shapes[Math.floor(Math.random() * shapes.length)]}`;
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() + 's';
        confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
        celebration.appendChild(confetti);

        setTimeout(() => confetti.remove(), 5000);
      }, i * 20);
    }

    setTimeout(() => celebration.remove(), 6000);
  };

  const getYesButtonScale = () => {
    return 1 + (noClickCount > 2 ? (noClickCount - 2) * 0.15 : 0);
  };

  const getMessage = () => {
    if (noClickCount === 0) {
      return "I know I messed up, and I truly regret it. Your friendship means the world to me, and I hope you can find it in your heart to forgive me.";
    } else if (noClickCount === 1) {
      return "Please Ayushi, I really am sorry. I know I hurt you, but I want to make things right. You mean so much to me.";
    } else if (noClickCount === 2) {
      return "I know sorry isn't enough. I promise to do better and show you through my actions. Your friendship is precious to me.";
    } else {
      return "Come on Ayushi, you know you want to click Yes! I'll keep trying until you forgive me! 🥺";
    }
  };

  const getEmoji = () => {
    if (noClickCount === 0) return null;
    if (noClickCount === 1) return "😢";
    if (noClickCount === 2) return "💔";
    return "🥺";
  };

  const getQuestion = () => {
    if (noClickCount === 0) return "Will you forgive me?";
    if (noClickCount === 1) return "Can we try again?";
    if (noClickCount === 2) return "One more chance?";
    return "Please? Pretty please with a cherry on top?";
  };

  const getButtonText = () => {
    return {
      yes: noClickCount === 0 ? "Yes" : noClickCount === 1 ? "Yes, I forgive you" : "Okay, fine",
      no: noClickCount === 0 ? "No" : noClickCount === 1 ? "Still no" : "Nope"
    };
  };

  if (forgiven) {
    return (
      <div className="App">
        <div className="gradient-bg"></div>
        <div className="hearts" id="hearts"></div>
        <div className="sparkles" id="sparkles"></div>
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
        </div>
        <div className="container success-message">
          <div className="success-icon">🎉</div>
          <h1 className="success-title">Thank You!</h1>
          <div className="name">Ayushi</div>
          <div className="message success-text">
            You have no idea how happy this makes me! I promise to be better.
            Thank you for giving me another chance!
          </div>
          <div className="success-emojis">
            <span className="emoji-float">😊</span>
            <span className="emoji-float">💖</span>
            <span className="emoji-float">🌟</span>
          </div>
          <div className="thank-you-note">
            Your forgiveness means everything to me
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <div className="gradient-bg"></div>
      <div className="hearts" id="hearts"></div>
      <div className="sparkles" id="sparkles"></div>
      <div
        className="mouse-light"
        style={{
          left: mousePosition.x + 'px',
          top: mousePosition.y + 'px'
        }}
      ></div>
      <div className="floating-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
      </div>
      <div className="container">
        {getEmoji() && <div className="sad-emoji">{getEmoji()}</div>}
        <h1 className="main-title">
          {noClickCount === 0 ? "I'm Sorry" : noClickCount === 1 ? "Oh no..." : "I understand..."}
        </h1>
        <div className="name-container">
          <div className="name">Ayushi</div>
          <div className="name-underline"></div>
        </div>
        <div className="message">{getMessage()}</div>
        <div className="question">{getQuestion()}</div>
        <div className="buttons">
          <button
            id="yesBtn"
            className="btn btn-yes"
            onClick={handleYesClick}
            style={{ transform: `scale(${getYesButtonScale()})` }}
          >
            <span className="btn-text">{getButtonText().yes}</span>
            <span className="btn-shimmer"></span>
          </button>
          <button
            id="noBtn"
            className="btn btn-no"
            onClick={handleNoClick}
            style={noButtonStyle}
          >
            <span className="btn-text">{getButtonText().no}</span>
            <span className="btn-shimmer"></span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
