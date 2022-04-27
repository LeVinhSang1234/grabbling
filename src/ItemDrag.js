import {
  Component,
  // memo, useCallback
} from "react";

// function ItemDrag({ color, sortIndex, sortColor }) {
//   const handleDrag = useCallback(
//     (e) => {
//       e.dataTransfer.setData(
//         "text/plain",
//         JSON.stringify({ color, index: sortIndex })
//       );
//     },
//     [color, sortIndex]
//   );

//   const handleDragEnd = useCallback((e) => {
//     e.dataTransfer.setData("text/plain", "");
//   }, []);

//   const handleDrop = useCallback(
//     (e) => {
//       e.preventDefault();
//       const dataString = e.dataTransfer.getData("text");
//       if (!dataString) {
//         return;
//       }
//       const dataDrag = JSON.parse(dataString);
//       if (sortIndex === dataDrag.index) {
//         return;
//       }
//       sortColor(dataDrag, { index: sortIndex, color });
//     },
//     [color, sortColor, sortIndex]
//   );

//   const handleDragOver = useCallback((e) => {
//     e.preventDefault();
//   }, []);

//   return (
//     <div
//       draggable
//       onDrop={handleDrop}
//       onDragEnd={handleDragEnd}
//       onDragStart={handleDrag}
//       onDragOver={handleDragOver}
//       className="caro-children"
//       style={{ backgroundColor: color }}
//     />
//   );
// }

// export default memo(
//   ItemDrag,
//   (p, n) =>
//     p.color === n.color &&
//     p.sortIndex === n.sortIndex &&
//     n.sortColor === p.sortColor
// );

class ItemDrag extends Component {
  shouldComponentUpdate(nProps) {
    const { color, sortIndex } = this.props;
    return color !== nProps.color || sortIndex !== nProps.sortIndex;
  }

  handleDrag = (e) => {
    const { color, sortIndex } = this.props;
    e.dataTransfer.setData(
      "text/plain",
      JSON.stringify({ color, index: sortIndex })
    );
  };

  handleDragEnd = (e) => {
    e.dataTransfer.setData("text/plain", "");
  };

  handleDrop = (e) => {
    const { sortIndex, sortColor, color } = this.props;
    e.preventDefault();
    const dataString = e.dataTransfer.getData("text");
    if (!dataString) {
      return;
    }
    const dataDrag = JSON.parse(dataString);
    if (sortIndex === dataDrag.index) {
      return;
    }
    sortColor(dataDrag, { index: sortIndex, color });
  };

  handleDragOver = (e) => {
    e.preventDefault();
  };

  render() {
    const { color, sortIndex } = this.props;
    return (
      <div
        data-testid={`itemDrag${sortIndex}`}
        data-testtitle={color}
        draggable
        onDrop={this.handleDrop}
        onDragEnd={this.handleDragEnd}
        onDragStart={this.handleDrag}
        onDragOver={this.handleDragOver}
        className="caro-children"
        style={{ backgroundColor: color }}
      />
    );
  }
}

export default ItemDrag;
