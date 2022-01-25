import {useState, useEffect} from "react";

function Stone({ stone, successRate, callbackResult, callbackComplete, index }){
    // 성공 실패
    const [resultArray, setResultArray] = useState([]);
    // 시도 횟수
    const [count, setCount] = useState(0);
    // 비활성화 여부
    const [isDisabled, setIsDisabled] = useState(false);
    // 돌 변경 시 횟수 초기화
    useEffect(() => {
        setResultArray(Array.from({length: stone}, () => 0));
        setCount(0);
        setIsDisabled(false);
    }, [stone]);

    useEffect(() => {
        if(count == stone){
            setIsDisabled(true);
            callbackComplete(index, resultArray.filter((item) => item).length);
        }
    }, [count]);
        
    // 돌 클릭 시
    function clickStone(e){
        const result = getResult();
        resultArray[count] = result;
        setResultArray(resultArray);
        setCount(count + 1);
        callbackResult(result, index);
        console.log(index);
    }
    // 성공 여부
    function getResult(){
        const array = new Uint8Array(1);
        window.crypto.getRandomValues(array);
        const range = 100;
        const max_range = 256;
        // 값이 넘어갔으면 다시 뽑기
        if (array[0] >= Math.floor(max_range / range) * range){
            return getResult();
        }

        const value = array[0] % 100;
        // 값이 성공확률보다 크면 실패
        if(value > successRate){
            return false;
        }
        else{
            return true;
        }
    }
    return(
        <>
            <div>
                {resultArray.map((result, index) => (
                    <span key={index} style={{ color: (result || result === 0 ? 'black' : 'red')}}>{result === 0 ? "◇" : "◆"}</span>    
                ))}
                <button onClick={clickStone} disabled={isDisabled}>시도</button>
                <span>남은횟수: {stone - count}</span>
            </div>
        </>
    )
}

export default Stone;