import { useEffect } from 'react';
import './index.css';
// import Victor from 'victor';
import { useSpring, animated } from 'react-spring';

function getRandomInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max));
}

const duration:number = 500;

const Boid = function() {
  const [props, set] = useSpring(() => ({
    top: getRandomInt(window.screen.height),
    left: getRandomInt(window.screen.width),
    config: { duration: duration * 2 },
  }
  ));

  const tick = () => {
    let instant = false;
    const top = () => {
      if ((Number(props.top.getValue()) || 1) > window.screen.height) {
        instant = true;
        return 0;
      }
      return (Number(props.top.getValue()) || 1);
    };
    const left = () => {
      if ((Number(props.left.getValue()) || 1) > window.screen.width) {
        instant = true;
        return 0;
      }
      return (Number(props.left.getValue()) || 1);
    };
    set({
      top: top() + 10,
      left: left() + 10,
      config: {
        duration: instant ? 0 : duration * 2,
      },
    });
  };

  useEffect(() => {
    const timer = setInterval(() => tick(), duration);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return <animated.div className="boid" style={props} />;
};

const Html = function() {
  return (
    <div className="wall">
      {Array.from(Array(200), (_v, k) => <Boid key={k} />)}
    </div>
  );
};

export default Html;
