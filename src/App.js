import {
  Component,
  //  useCallback, useState
} from "react";
import "./App.css";
import ItemDrag from "./ItemDrag";

const arrayColor = [];
const letters = "0123456789ABCDEF";

function randomColor() {
  let color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

for (let i = 0; i < 64; i++) {
  arrayColor.push(randomColor());
}

// function App() {
//   const [state, setState] = useState(arrayColor);

//   const sortColor = useCallback(
//     (moveFrom, moveTo) => {
//       const { color, index } = moveFrom;
//       const newState = [...state];
//       newState[moveTo.index] = color;
//       newState[index] = moveTo.color;
//       setState(newState);
//     },
//     [state]
//   );

//   return (
//     <div className="graplingo">
//       <div className="caro">
//         {state.map((color, index) => (
//           <ItemDrag
//             key={index}
//             sortIndex={index}
//             sortColor={sortColor}
//             color={color}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default App;

// sử dụng class để hạn chế render lại hơn so với hooks.
// sử dụng React Developer Tool để cảm nhận.

class AppClass extends Component {
  state = { colors: arrayColor };

  sortColor = (moveFrom, moveTo) => {
    const { colors } = this.state;
    const { color, index } = moveFrom;
    const newState = [...colors];
    newState[moveTo.index] = color;
    newState[index] = moveTo.color;
    this.setState({ colors: newState });
  };

  render() {
    const { colors } = this.state;
    return (
      <div className="graplingo">
        <div className="caro">
          {colors.map((color, index) => (
            <ItemDrag
              key={index}
              sortIndex={index}
              sortColor={this.sortColor}
              color={color}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default AppClass;
