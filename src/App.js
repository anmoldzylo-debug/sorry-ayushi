import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import Particles from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import './App.css';

function App() {
  const [noClickCount, setNoClickCount] = useState(0);
  const [forgiven, setForgiven] = useState(false);
  const [noButtonStyle, setNoButtonStyle] = useState({});
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
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

  const getSuccessPage = () => {
    if (noClickCount === 0) {
      return {
        icon: "🎉",
        title: "Wow! Thank You!",
        message: "You forgave me right away! You're the most amazing person ever. I don't deserve you, but I promise to do better! ❤️",
        emojis: ["😊", "💖", "🌟"],
        note: "You have the kindest heart, Ayushi"
      };
    } else if (noClickCount === 1) {
      return {
        icon: "🥹",
        title: "Thank You So Much!",
        message: "I knew you had a big heart! Thank you for giving me another chance. I promise I won't let you down again!",
        emojis: ["🙏", "💝", "✨"],
        note: "Your forgiveness means the world to me"
      };
    } else if (noClickCount === 2) {
      return {
        icon: "😭",
        title: "Finally! Thank You!",
        message: "I was getting worried there! But I'm so happy you forgave me. I'll spend every day proving I deserve your friendship!",
        emojis: ["🎊", "💕", "🌈"],
        note: "I'll make it up to you, I promise!"
      };
    } else if (noClickCount === 3) {
      return {
        icon: "🎊",
        title: "YES! Thank You!",
        message: "You made me work for it, but it was worth it! Thank you so much for forgiving me. You're truly special, Ayushi!",
        emojis: ["🙌", "💗", "⭐"],
        note: "Your friendship is worth fighting for"
      };
    } else if (noClickCount >= 4) {
      return {
        icon: "🎆",
        title: "FINALLY! You Did It!",
        message: "I almost gave up hope! But here we are! Thank you for testing my patience and eventually forgiving me. You're one in a million, Ayushi! 💫",
        emojis: ["🎉", "💖", "🏆"],
        note: "Persistence paid off! Thank you for forgiving me!"
      };
    }
  };

  const particlesOptions = {
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: ["#667eea", "#764ba2", "#f093fb", "#f5576c"]
      },
      shape: {
        type: ["circle", "triangle", "polygon"],
        polygon: {
          nb_sides: 5
        }
      },
      opacity: {
        value: 0.3,
        random: true,
        anim: {
          enable: true,
          speed: 1,
          opacity_min: 0.1,
          sync: false
        }
      },
      size: {
        value: 3,
        random: true,
        anim: {
          enable: true,
          speed: 2,
          size_min: 0.1,
          sync: false
        }
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#ffffff",
        opacity: 0.2,
        width: 1
      },
      move: {
        enable: true,
        speed: 1,
        direction: "none",
        random: false,
        straight: false,
        out_mode: "out",
        bounce: false,
      }
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: true,
          mode: "grab"
        },
        onclick: {
          enable: true,
          mode: "push"
        },
        resize: true
      },
      modes: {
        grab: {
          distance: 140,
          line_linked: {
            opacity: 0.5
          }
        },
        push: {
          particles_nb: 4
        }
      }
    },
    retina_detect: true
  };

  if (forgiven) {
    const successContent = getSuccessPage();

    return (
      <div className="App">
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={500}
          gravity={0.3}
        />
        <div className="gradient-bg"></div>
        <div className="hearts" id="hearts"></div>
        <div className="sparkles" id="sparkles"></div>
        <div className="floating-shapes">
          <motion.div
            className="shape shape-1"
            animate={{
              x: [0, 50, 0],
              y: [0, -50, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="shape shape-2"
            animate={{
              x: [0, -30, 0],
              y: [0, 40, 0],
              rotate: [0, -180, -360],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="shape shape-3"
            animate={{
              x: [0, 40, 0],
              y: [0, -30, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="shape shape-4"
            animate={{
              x: [0, -40, 0],
              y: [0, 30, 0],
              scale: [1, 0.8, 1],
            }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
        <AnimatePresence>
          <motion.div
            className="container success-message"
            initial={{ scale: 0, rotate: -180, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              duration: 0.8
            }}
          >
            <motion.div
              className="success-icon"
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {successContent.icon}
            </motion.div>
            <motion.h1
              className="success-title"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {successContent.title}
            </motion.h1>
            <motion.div
              className="name"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
            >
              Ayushi
            </motion.div>
            <motion.div
              className="message success-text"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {successContent.message}
            </motion.div>
            <div className="success-emojis">
              {successContent.emojis.map((emoji, index) => (
                <motion.span
                  key={index}
                  className="emoji-float"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{
                    scale: 1,
                    rotate: 0,
                    y: [0, -10, 0]
                  }}
                  transition={{
                    scale: { delay: 0.5 + index * 0.1, type: "spring" },
                    y: {
                      delay: 1,
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }}
                >
                  {emoji}
                </motion.span>
              ))}
            </div>
            <motion.div
              className="thank-you-note"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {successContent.note}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="App">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={particlesOptions}
      />
      <div className="gradient-bg"></div>
      <div className="hearts" id="hearts"></div>
      <div className="sparkles" id="sparkles"></div>
      <motion.div
        className="mouse-light"
        animate={{
          left: mousePosition.x,
          top: mousePosition.y,
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 200
        }}
      />
      <div className="floating-shapes">
        <motion.div
          className="shape shape-1"
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0],
            rotate: [0, 90, 180, 270, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="shape shape-2"
          animate={{
            x: [0, -20, 0],
            y: [0, 20, 0],
            rotate: [0, -90, -180, -270, -360],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="shape shape-3"
          animate={{
            x: [0, 40, 0],
            y: [0, -20, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="shape shape-4"
          animate={{
            x: [0, -30, 0],
            y: [0, 10, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>
      <motion.div
        className="container"
        initial={{ y: -100, scale: 0.8, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 15
        }}
      >
        <AnimatePresence mode="wait">
          {getEmoji() && (
            <motion.div
              className="sad-emoji"
              key={noClickCount}
              initial={{ scale: 0, rotate: -180 }}
              animate={{
                scale: 1,
                rotate: 0,
                y: [0, -10, 0]
              }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{
                scale: { type: "spring", stiffness: 200 },
                y: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            >
              {getEmoji()}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.h1
          className="main-title"
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {noClickCount === 0 ? "I'm Sorry" :
           noClickCount === 1 ? "Oh no..." :
           noClickCount === 2 ? "I understand..." :
           noClickCount === 3 ? "Please wait..." :
           "Don't give up on me..."}
        </motion.h1>

        <div className="name-container">
          <motion.div
            className="name"
            animate={{
              textShadow: [
                "0 0 20px rgba(240, 147, 251, 0.5)",
                "0 0 40px rgba(245, 87, 108, 0.8)",
                "0 0 20px rgba(240, 147, 251, 0.5)",
              ]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Ayushi
          </motion.div>
          <motion.div
            className="name-underline"
            animate={{
              scaleX: [0.8, 1, 0.8]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={noClickCount}
            className="message"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {getMessage()}
          </motion.div>
        </AnimatePresence>

        <motion.div
          className="question"
          animate={{
            y: [0, -10, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {getQuestion()}
        </motion.div>

        <div className="buttons">
          <motion.button
            className="btn btn-yes"
            onClick={handleYesClick}
            whileHover={{
              scale: 1.1,
              boxShadow: "0 15px 40px rgba(17, 153, 142, 0.5), 0 0 30px rgba(56, 239, 125, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
            animate={{
              scale: getYesButtonScale()
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20
            }}
          >
            <span className="btn-text">{getButtonText().yes}</span>
            <span className="btn-shimmer"></span>
          </motion.button>

          <motion.button
            className="btn btn-no"
            onClick={handleNoClick}
            style={noButtonStyle}
            whileHover={{
              scale: noClickCount < 2 ? 1.05 : 1,
              boxShadow: "0 15px 40px rgba(235, 51, 73, 0.5), 0 0 30px rgba(244, 92, 67, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="btn-text">{getButtonText().no}</span>
            <span className="btn-shimmer"></span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

export default App;
