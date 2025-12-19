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
    } else if (noClickCount === 3) {
      return "Ayushi, I've been thinking about how much you mean to me. I can't imagine not having you in my life. Please forgive me!";
    } else if (noClickCount === 4) {
      return "I promise I'll make it up to you! I'll be the best friend you could ever ask for. Just give me one more chance!";
    } else {
      return "Come on Ayushi, you know you want to click Yes! I'll keep trying until you forgive me! 🥺";
    }
  };

  const getEmoji = () => {
    if (noClickCount === 0) return null;
    if (noClickCount === 1) return "😢";
    if (noClickCount === 2) return "💔";
    if (noClickCount === 3) return "🥺";
    if (noClickCount === 4) return "😭";
    return "🙏";
  };

  const getQuestion = () => {
    if (noClickCount === 0) return "Will you forgive me?";
    if (noClickCount === 1) return "Can we try again?";
    if (noClickCount === 2) return "One more chance?";
    if (noClickCount === 3) return "Please forgive me?";
    if (noClickCount === 4) return "I'm begging you!";
    return "Pretty please with a cherry on top?";
  };

  const getButtonText = () => {
    return {
      yes: noClickCount === 0 ? "Yes" :
           noClickCount === 1 ? "Yes, I forgive you" :
           noClickCount === 2 ? "Okay, fine" :
           noClickCount === 3 ? "Alright then" :
           "Yes, yes!",
      no: noClickCount === 0 ? "No" :
          noClickCount === 1 ? "Still no" :
          noClickCount === 2 ? "Nope" :
          noClickCount === 3 ? "Not yet" :
          "Never"
    };
  };

  // Different success pages based on noClickCount
  const getSuccessPage = () => {
    if (noClickCount === 0) {
      // First time - she said yes immediately
      return {
        icon: "🎉",
        title: "Wow! Thank You!",
        message: "You forgave me right away! You're the most amazing person ever. I don't deserve you, but I promise to do better! ❤️",
        emojis: ["😊", "💖", "🌟"],
        note: "You have the kindest heart, Ayushi"
      };
    } else if (noClickCount === 1) {
      // Said no once
      return {
        icon: "🥹",
        title: "Thank You So Much!",
        message: "I knew you had a big heart! Thank you for giving me another chance. I promise I won't let you down again!",
        emojis: ["🙏", "💝", "✨"],
        note: "Your forgiveness means the world to me"
      };
    } else if (noClickCount === 2) {
      // Said no twice
      return {
        icon: "😭",
        title: "Finally! Thank You!",
        message: "I was getting worried there! But I'm so happy you forgave me. I'll spend every day proving I deserve your friendship!",
        emojis: ["🎊", "💕", "🌈"],
        note: "I'll make it up to you, I promise!"
      };
    } else if (noClickCount === 3) {
      // Said no three times
      return {
        icon: "🎊",
        title: "YES! Thank You!",
        message: "You made me work for it, but it was worth it! Thank you so much for forgiving me. You're truly special, Ayushi!",
        emojis: ["🙌", "💗", "⭐"],
        note: "Your friendship is worth fighting for"
      };
    } else if (noClickCount >= 4) {
      // Said no 4+ times
      return {
        icon: "🎆",
        title: "FINALLY! You Did It!",
        message: "I almost gave up hope! But here we are! Thank you for testing my patience and eventually forgiving me. You're one in a million, Ayushi! 💫",
        emojis: ["🎉", "💖", "🏆"],
        note: "Persistence paid off! Thank you for forgiving me!"
      };
    }
  };

  if (forgiven) {
    const successContent = getSuccessPage();

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
          <div className="success-icon">{successContent.icon}</div>
          <h1 className="success-title">{successContent.title}</h1>
          <div className="name">Ayushi</div>
          <div className="message success-text">
            {successContent.message}
          </div>
          <div className="success-emojis">
            <span className="emoji-float">{successContent.emojis[0]}</span>
            <span className="emoji-float">{successContent.emojis[1]}</span>
            <span className="emoji-float">{successContent.emojis[2]}</span>
          </div>
          <div className="thank-you-note">
            {successContent.note}
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
          {noClickCount === 0 ? "I'm Sorry" :
           noClickCount === 1 ? "Oh no..." :
           noClickCount === 2 ? "I understand..." :
           noClickCount === 3 ? "Please wait..." :
           "Don't give up on me..."}
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
