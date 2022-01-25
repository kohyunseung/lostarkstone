import React, { Component } from 'react'
import {useState, useEffect} from "react";
import Stone from "./Stone"
import Modal from './Modal';


function StoneContainer (){
    // 시도 횟수 유물 - 10, 전설 - 9
    const [stone, setStone] = useState(10);
    // 성공 확률 max 75 min 25
    const [successRate, setSuccessRate] = useState(75);
    const [completeCount, setCompleteCount] = useState(0);
    const [resultArray, setResultArray] = useState(Array(3));
    const [stoneHistory, setStoneHistory] = useState([]);

    const [isModal, setIsModal] = useState(false);

    useEffect(() => {
        if(completeCount === 3){
            setIsModal(true);
        }
    }, [completeCount])
    
    // 성공, 실패에 따라 확률 변동
    const callbackResult = (result, index) => {
        if(result){
            if(successRate > 25) setSuccessRate(successRate - 10);
        }
        else{
            if(successRate < 75) setSuccessRate(successRate + 10);
        }
        setStoneHistory([...stoneHistory, [index, result]]);
    }

    // 돌깎은 결과
    const callbackComplete = (index, value) => {
        resultArray[index] = value;
        setResultArray(resultArray);
        setCompleteCount(completeCount + 1);
    }

    // 돌 선택
    function changeStone(e){
        setStone(e.target.value);
        setSuccessRate(75);
        setCompleteCount(0);
        setResultArray(Array(3));
        setStoneHistory([]);
    }

    const closeModal = () => {
        setIsModal(false);
    }

    const saveStone = () => {
        if(localStorage.getItem("stoneHistory")){
            localStorage.setItem("stoneHistory", JSON.stringify([...JSON.parse(localStorage.getItem("stoneHistory")), stoneHistory]));
        }
        else{
            localStorage.setItem("stoneHistory", JSON.stringify([stoneHistory]));
        }
        closeModal();
    }
    return(
        <>
            <select onChange={changeStone}>
                <option value="10">유물</option>
                <option value="9">전설</option>
            </select>
            <div>
                <h4>성공확률: {successRate}%</h4>
            </div>
            {
                [0,1,2].map((v) => (
                    <Stone key={v} stone={stone} successRate={successRate} callbackResult={callbackResult} callbackComplete={callbackComplete} index={v} />
                ))
            }
            {
                isModal && (
                <div>
                    <Modal open={isModal} close={closeModal} header={"돌깎기 완료!!!"} save={saveStone} result={resultArray}/>
                </div>
                )
            }
            </>
    );
}

export default StoneContainer

