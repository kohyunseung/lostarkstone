import {useState} from "react";

export default function Stone({ stone, attemptArray }){
    // 성공 실패
    const [resultArray, setResultArray] = useState([false, false, false, false, false, false, false, false, false, false]);
    // 시도 횟수
    const [count, setCount] = useState(0);
    // 돌 클릭 시
    function clickStone(e){
        resultArray[count] = getResult();
        setResultArray(resultArray);
        setCount(count + 1);
    }

    function getResult(){
        return true;
    }
    return(
        <>
            <div>
                {resultArray.map(result => (
                    <span>{result === false ? "◇" : "◆"}</span>    
                ))}
                <button onClick={clickStone}>시도</button>
            </div>
        </>
    )
}