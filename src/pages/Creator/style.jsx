import styled from "styled-components";
const Styled = styled.div`
  .creator-container {
    width: 100vw;
    height: calc(100vh - 6.4rem);
  }
  .creator-header {
    width: 100%;
    padding: 8px 16px;
    border-color: rgb(231, 232, 235);
    border-bottom-width: 1px;
    border-top-width: 1px;
    border-style: solid;
    border-left: none;
    border-right: none;
  }
  .new-slide-button {
    min-height: 40px;
  }
  .header-button {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 20px;
    flex: 1 1 auto;
  }
  .creator-body {
    display: flex;
    flex-direciton: row;
    flex: 1 1 auto;
    height: 100%;
    width: 100%;
    min-height: 700px;
    height: fit-content;
  }
  .body-left-container {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    max-wdith: 150px;
    overflow-y: auto;
    overflow: visible;
  }
  .body-left-list {
    display: flex;
    flex-flow: column nowrap;
    align-content: flex-start;
    list-style: none;
    width: 100%;
    min-height: 100%;
    overflow: hidden;
    padding-bottom: 0px;
  }
  [data-rbd-drag-handle-context-id="3"] {
    cursor: grab;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
  .slide-thumbnail {
    display: flex;
    flex-direciton: row;
    max-height: 100px;
    padding: 8px;
    gap: 10px;
    cursor: pointer;
  }
  .slide-current {
    background-color: bisque;
  }
  .slide-image {
    background-size: contain;
    width: 100%;
    height: 100%;
  }
  .slide-image-container {
    height: 100%;
    max-width: 174px;
  }
  .body-center {
    padding: 32px;
    min-width: 500px;
    padding-top: 56.25%;
    height: 100%;
    overflow: hidden;
    /* height: 0; */
    position: relative;
    background-color: #e7e8eb;
    flex: 1 1 0;
  
  }
  .center-draw {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0px;
    bottom: 0;
    left: 0;
    background-color: #fff;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-right: 1px solid #ccc;
  }
  .drawText-container {
    margin: 0 auto;
    background-color: #fff;
    min-height: 50%;
    min-width: 50%;
    text-align: center;
  }
  .drawText-header{
    font-weight: 700;
    font-size: 30px;
    padding-top: 100px;
    margin-bottom: 20px;
    max-width: 80%;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
  
  }
  .drawText-body {
    max-width: 90%;
    margin-left: auto;
    margin-right: auto;
  }
  .body-right {
    width: 100%;
    overflow: auto;
    background-color: #fff;
    padding: 20px 30px;
    max-width: 400px;
  }
  .item-question {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
  }
  .item-close {
    cursor: pointer;
  }
  .question-text {
    color: rgb(16, 24, 52);
    font-size: 16px;
    font-weight: 600;
    font-family: MentiText, Arial, sans-serif;
  }
  .question-icon {
    margin-bottom: 5px;
  }
  .question-input {
    transition: all 0.3s ease 0s;
    padding: 8px;
    outline: none;
    cursor: auto;
    border: 1px solid rgb(183, 186, 194);
    display: block;
    border-radius: 3px;
    width: 100%;
  }

  .question-input {
    transition: all 0.3s ease 0s;
    padding: 8px;
    outline: none;
    cursor: auto;
    border: 1px solid rgb(183, 186, 194);
    display: block;
    border-radius: 3px;
    width: 100%;
  }
  .question-input: focus {
    border-color: rgb(25, 108, 255);
  }
  .option-input {
    width: 50%;
    display: inline-block;
  }
  .item-answer {
    display: flex;
    flex-direction: row;
    gap: 20px;
    align-items: center;
    margin: 20px 0px;
  }
  .button-creator-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
  .add-option button {
    width: 100%;
    background-color: rgb(219, 220, 225);
  }
  .add-option button:hover {
    background-color: rgb(175, 176, 180);
  }
  .presentation-button button {
    width: 100%;
  }
  .presentation-button .play-icon {
    transform: translate(-9px, -3px);
  }
  .form-create-slide {
    margin-bottom: 20px;
  }
  .ant-tabs-content-holder {
    min-height: 492px;
  }
 
`;

export default Styled;
