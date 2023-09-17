// @ts-nocheck
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import "@rainbow-me/rainbowkit/styles.css";
import "./assets/styles.css";
import { useState, useRef, useEffect } from "react";
import { useContractReads } from "wagmi";
import boardABI from "./ColourBoard.json";

export function App() {
  const { isConnected } = useAccount();
  const xInputField = useRef(null);
  const yInputField = useRef(null);
  const [coord, setCoord] = useState({ x: 1, y: 1 });

  const args = {
    address: "0x74E861FD80C748eA8A7EEf48c301B50b75397266",
    abi: boardABI.abi,
  };

  const { data, isError, isLoading } = useContractReads({
    contracts: [
      {
        address: "0x74E861FD80C748eA8A7EEf48c301B50b75397266",
        abi: boardABI.abi,
        functionName: "initializeColours",
        args: []
      },
      {
        address: "0x74E861FD80C748eA8A7EEf48c301B50b75397266",
        abi: boardABI.abi,
        functionName: "getColour",
        args: [coord.x, coord.y]
      }
    ]}
    );

  let cellColor = "white";
  let cellTextColor = "black";
  console.log(data);
  let boardResult = data != undefined ? data[1]?.result : 2;
  console.log(boardResult);
  useEffect(() => {
    if (Number(boardResult) === 3) {
      cellColor = "black";
      cellTextColor = "white";
    } else if (Number(boardResult) === 1) {
      cellColor = "red";
      cellTextColor = "white";
    } else if (Number(boardResult) === 2) {
      cellColor = "white";
      cellTextColor = "black";
    }
    // if (boardResult === "black") {
    //   cellTextColor = "white";
    // } else if (boardResult === "red") {
    //   cellTextColor = "white";
    // }

    if (document.getElementById(coord.x + "" + coord.y) != undefined) {
      document.getElementById(coord.x + "" + coord.y).style.backgroundColor =
        cellColor;
      document.getElementById(coord.x + "" + coord.y).style.color =
        cellTextColor;
      document.getElementById(coord.x + "" + coord.y).style.fontWeight = "bold";
    }
  }, [coord.x, coord.y]);

  const inputCellValue = (rowValue, colValue) => {
    event.target.style.backgroundColor = cellColor;
    xInputField.current.value = rowValue;
    yInputField.current.value = colValue;
    setCoord({ x: xInputField.current.value, y: yInputField.current.value });
  };

  const Board = ({ disable }) => {
    return (
      <div className={"board"}>
        {[1, 2, 3, 4, 5, 6, 7].map((colElem) => {
          return (
            <div className="row">
              {[5, 4, 3, 2, 1].map((rowElem) => {
                return (
                  <button
                    type="button"
                    id={rowElem + "" + colElem}
                    className={"cell"}
                    onClick={(e) => {
                      event.target.style.backgroundColor = "white";
                      inputCellValue(rowElem, colElem);
                    }}
                    disabled={disable}
                  >
                    {rowElem}, {colElem}
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <section className={"container"}>
      <nav>
        RainbowKit
        <div className={"nav-connect-button"}>
          <ConnectButton />
        </div>
      </nav>
      <section className={"main-container"}>
        <div className={"board-container"}>
          <Board />
        </div>

        <section className={"input-container"}>
          <div>
            {isConnected && <label htmlFor="x-axis">X axis value:</label>}
            <input
              id="x-axis"
              type="number"
              defaultValue={1}
              min={1}
              max={5}
              step={1}
              pattern="[1-5]"
              ref={xInputField}
              disabled={!isConnected}
            />
          </div>

          <div>
            {isConnected && <label htmlFor="y-axis">Y axis value:</label>}
            <input
              id="y-axis"
              type="number"
              defaultValue={1}
              min={1}
              max={7}
              step={1}
              pattern="[1-7]"
              ref={yInputField}
              disabled={!isConnected}
            />
          </div>
          <button
            type="button"
            onClick={() =>
              inputCellValue(
                xInputField.current.value,
                yInputField.current.value
              )
            }
            disabled={!isConnected || isLoading}
          >
            Proceed
          </button>
        </section>
      </section>
    </section>
  );
}
