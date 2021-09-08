import './App.css';
import Stone from "./component/Stone"
import {useState} from "react";

function App() {
    const [stone, setStone] = useState("유물");
    // 시도 횟수 유물 - 10, 전설 - 9
    const attemptCount = 10;
    // 성공 실패 array
    const attemptArray = [];
    for(let i = 1; i <= attemptCount; i++){
        const attemptObject = {};
        attemptObject.id = i;               // 시도 차수
        attemptObject.result = false;       // 시도 결과
        attemptArray.push(attemptObject);   // 배열 삽입
    }
    // 돌 선택
    function changeStone(e){
        setStone(e.target.value);
    }

    return (
        <div className="App">
            <select onChange={changeStone}>
                <option value="유물">유물</option>
                <option value="전설">전설</option>
            </select>
            
            <Stone stone={stone} attemptArray={attemptArray}/>
            <Stone stone={stone} attemptArray={attemptArray}/>
            <Stone stone={stone} attemptArray={attemptArray}/>
        </div>
    );
}

export default App;
