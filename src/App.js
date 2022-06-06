import React, { useState, useEffect, useReducer } from "react";
import cs from "classnames";
import Profile from "./components/profile";
import Timer from "./components/timer";
import Arrows from "./components/arrows";
import Table from "./components/table";
import Contact from "./components/contact";
import Instruction from "./components/instruction";
import Projects from "./components/projects";

import "./css/App.css";
import "./css/arrows.css";
import "./css/mobile.css";
import "./css/table.css";

const TICK_RATE = 100;
const GRID_SIZE = 35;
const GRID = [];

for (let i = 0; i <= GRID_SIZE; i++) {
  GRID.push(i);
}

const DIRECTIONS = {
  UP: "UP",
  BOTTOM: "BOTTOM",
  RIGHT: "RIGHT",
  LEFT: "LEFT",
};

const DIRECTION_TICKS = {
  UP: (x, y) => ({ x, y: y - 1 }),
  BOTTOM: (x, y) => ({ x, y: y + 1 }),
  RIGHT: (x, y) => ({ x: x + 1, y }),
  LEFT: (x, y) => ({ x: x - 1, y }),
};

const KEY_CODES_MAPPER = {
  38: "UP",
  39: "RIGHT",
  37: "LEFT",
  40: "BOTTOM",
};

const getRandomNumberFromRange = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const getRandomCoordinate = () => ({
  x: getRandomNumberFromRange(1, GRID_SIZE - 1),
  y: getRandomNumberFromRange(1, GRID_SIZE - 1),
});

const getMiddleCooridinate = () => ({
  x: Math.floor((GRID_SIZE + 1) / 2),
  y: Math.floor((GRID_SIZE + 1) / 2),
});

const isBorder = (x, y) =>
  x === 0 || y === 0 || x === GRID_SIZE || y === GRID_SIZE;

const isPosition = (x, y, diffX, diffY) => x === diffX && y === diffY;

const isSnake = (x, y, snakeCoordinates) =>
  snakeCoordinates.filter((coordinate) =>
    isPosition(coordinate.x, coordinate.y, x, y)
  ).length;

const getSnakeHead = (snake) => snake.coordinates[0];

const getSnakeWithoutStub = (snake) =>
  snake.coordinates.slice(0, snake.coordinates.length - 1);

const getSnakeTail = (snake) => snake.coordinates.slice(1);

const getIsSnakeOutside = (snake) =>
  getSnakeHead(snake).x >= GRID_SIZE ||
  getSnakeHead(snake).y >= GRID_SIZE ||
  getSnakeHead(snake).x <= 0 ||
  getSnakeHead(snake).y <= 0;

const getIsSnakeClumy = (snake) =>
  isSnake(getSnakeHead(snake).x, getSnakeHead(snake).y, getSnakeTail(snake));

const getIsSnakeEating = ({ snake, snack }) =>
  isPosition(
    getSnakeHead(snake).x,
    getSnakeHead(snake).y,
    snack.coordinate.x,
    snack.coordinate.y
  );
const getIsSnakeGettingResume = ({ snake, resume }) =>
  isPosition(
    getSnakeHead(snake).x,
    getSnakeHead(snake).y,
    resume.coordinate.x,
    resume.coordinate.y
  );
const getIsSnakeGettingProjects = ({ snake, projects }) =>
  isPosition(
    getSnakeHead(snake).x,
    getSnakeHead(snake).y,
    projects.coordinate.x,
    projects.coordinate.y
  );

const getCellCs = (isGameOver, snake, snack, resume, projects, x, y) =>
  cs("grid-cell", {
    "grid-cell-border": isBorder(x, y),
    "grid-cell-snake": isSnake(x, y, snake.coordinates),
    "grid-cell-snack": isPosition(x, y, snack.coordinate.x, snack.coordinate.y),
    "grid-cell-resume": isPosition(
      x,
      y,
      resume.coordinate.x,
      resume.coordinate.y
    ),
    "grid-cell-projects": isPosition(
      x,
      y,
      projects.coordinate.x,
      projects.coordinate.y
    ),
    "grid-cell-hit":
      isGameOver &&
      isPosition(x, y, getSnakeHead(snake).x, getSnakeHead(snake).y),
  });

const reducer = (state, action) => {
  switch (action.type) {
    case "SNAKE_CHANGE_DIRECTION":
      return {
        ...state,
        playground: {
          ...state.playground,
          direction: action.direction,
        },
      };
    case "SNAKE_MOVE":
      console.log("moving");
      const isSnakeEating = getIsSnakeEating(state);
      const isSnakeResume = getIsSnakeGettingResume(state);
      const isSnakeProjects = getIsSnakeGettingProjects(state);

      const snakeHead = DIRECTION_TICKS[state.playground.direction](
        getSnakeHead(state.snake).x,
        getSnakeHead(state.snake).y
      );
      // making the tail longer
      const snakeTail =
        isSnakeEating || isSnakeResume || isSnakeProjects
          ? state.snake.coordinates
          : getSnakeWithoutStub(state.snake);
      const snackCoordinate = isSnakeEating
        ? getRandomCoordinate()
        : state.snack.coordinate;
      const resumeCoordinate = isSnakeResume
        ? getRandomCoordinate()
        : state.resume.coordinate;
      const projectsCoordinate = isSnakeProjects
        ? getRandomCoordinate()
        : state.projects.coordinate;

      return {
        ...state,
        snake: {
          coordinates: [snakeHead, ...snakeTail],
        },
        snack: {
          coordinate: snackCoordinate,
        },
        resume: {
          coordinate: resumeCoordinate,
        },
        projects: {
          coordinate: projectsCoordinate,
        },
      };

    case "GAME_OVER":
      return {
        ...state,
        playground: {
          ...state.playground,
          isGameOver: true,
        },
      };
    default:
      throw new Error();
  }
};

const initialState = {
  playground: {
    direction: DIRECTIONS.RIGHT,
    isGameOver: false,
  },
  snake: {
    coordinates: [getMiddleCooridinate()],
  },
  snack: {
    coordinate: getRandomCoordinate(),
  },
  resume: {
    coordinate: getRandomCoordinate(),
  },
  profile: {
    coordinate: getRandomCoordinate(),
  },
  projects: {
    coordinate: getRandomCoordinate(),
  },
};
const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [showProfile, setShowProfile] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [started, setStarted] = useState(false);
  const [resumeCount, setResumeCount] = useState(0);
  const [projectCount, setProjectCount] = useState(0);
  const [width, setWidth] = useState(window.innerWidth);
  const [showReadyText, setShowReadyText] = useState(false);
  const [timer, setTimer] = useState(0);
  useEffect(() => {
    if (timer > 0) {
      setTimeout(() => {
        console.log("startTime, ", timer);
        setTimer(timer - 1);
      }, 1000);
    }
    if (timer === 0 && showReadyText) {
      console.log("done");
      setShowReadyText(false);
      continueGame();
    }
  }, [timer, showReadyText]);
  const onChangeDirection = (event) => {
    if (KEY_CODES_MAPPER[event.keyCode]) {
      dispatch({
        type: "SNAKE_CHANGE_DIRECTION",
        direction: KEY_CODES_MAPPER[event.keyCode],
      });
    }
  };
  useEffect(() => {
    console.log("started" + started);
  }, [started]);
  useEffect(() => {
    console.log("width" + width);
    console.log("started" + started);

    // if (width > 420) {
    //   setStarted(true);
    // }
  }, [width, started]);
  useEffect(() => {
    setResumeCount(resumeCount + 1);
    if (resumeCount >= 1) {
      setShowProfile(true);
    }
  }, [state.resume.coordinate]);

  useEffect(() => {
    setProjectCount(projectCount + 1);
    if (projectCount >= 1) {
      setShowProjects(true);
    }
  }, [state.projects.coordinate]);

  useEffect(() => {
    if (width > 420) {
      setStarted(true);
    }
    window.addEventListener("keyup", onChangeDirection, false);

    return () => window.removeEventListener("keyup", onChangeDirection, false);
  }, []);

  useEffect(() => {
    if (started && showProfile === false && showProjects === false) {
      const onTick = () => {
        getIsSnakeOutside(state.snake) || getIsSnakeClumy(state.snake)
          ? dispatch({ type: "GAME_OVER" })
          : dispatch({ type: "SNAKE_MOVE" });
      };
      const interval = setInterval(onTick, TICK_RATE);
      return () => clearInterval(interval);
    }
  }, [state, started]);
  //show resume

  function endGame() {
    dispatch({ type: "GAME_OVER" });
  }
  function switchDirection(direction) {
    dispatch({
      type: "SNAKE_CHANGE_DIRECTION",
      direction: direction,
    });
  }
  const continueGame = () => {
    dispatch({ type: "SNAKE_MOVE" });
  };
  return (
    <div className="app">
      <h1 className="title">Kenny Ng, Software Engineer</h1>
      <Grid
        snake={state.snake}
        snack={state.snack}
        resume={state.resume}
        isGameOver={state.playground.isGameOver}
        projects={state.projects}
      />
      <Profile
        showProfile={showProfile}
        setShowProfile={setShowProfile}
        endGame={endGame}
        continueGame={continueGame}
        showReadyText={showReadyText}
        setShowReadyText={setShowReadyText}
        timer={timer}
        setTimer={setTimer}
      />
      <Projects
        showProjects={showProjects}
        setShowProjects={setShowProjects}
        endGame={endGame}
        continueGame={continueGame}
        showReadyText={showReadyText}
        setShowReadyText={setShowReadyText}
        timer={timer}
        setTimer={setTimer}
      />
      <Timer />
      <Arrows switchDirection={switchDirection} />
      <Table />
      <Contact />
      <Instruction />
      <div
        className={width < 420 ? "profile" : "profile-hidden"}
        id="welcoming-msg"
      >
        <h1>Hi!</h1>
        <p>
          {" "}
          I am Kenny and welcome to my site! Use our provided virtual keyboard
          &#8595; to play the snake game and learn about me!{" "}
        </p>
        <div id="start-div">
          <h1
            onClick={() => {
              setStarted(true);
              setWidth(9999);
            }}
            id="btn"
          >
            Start!
          </h1>
        </div>
      </div>
    </div>
  );
};

const Grid = ({ isGameOver, snake, snack, resume, projects }) => (
  <div>
    {GRID.map((y) => (
      <Row
        y={y}
        key={y}
        snake={snake}
        snack={snack}
        resume={resume}
        projects={projects}
        isGameOver={isGameOver}
      />
    ))}
  </div>
);

const Row = ({ isGameOver, snake, snack, resume, projects, y }) => (
  <div className="grid-row">
    {GRID.map((x) => (
      <Cell
        x={x}
        y={y}
        key={x}
        snake={snake}
        snack={snack}
        projects={projects}
        resume={resume}
        isGameOver={isGameOver}
      />
    ))}
  </div>
);

const Cell = ({ isGameOver, snake, snack, resume, projects, x, y }) => (
  <div
    className={getCellCs(isGameOver, snake, snack, projects, resume, x, y)}
  />
);

export default App;
