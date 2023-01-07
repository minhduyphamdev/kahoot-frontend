import React, { useState, useEffect, useContext } from "react";
import { Header } from "../../components/Header";
import Styled from "./style";
import { Button, Tabs, Input } from "antd";
import { QuestionCircleOutlined, CloseOutlined } from "@ant-design/icons";
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from "recharts";
import { useMemo } from "react";
import PresentationContext from "../../utils/PresentationContext";
const Creator = (props) => {
  const { slide, currentSlide, presentation, setCurrentSlide, setPresentation, savePresentation } =
    props;
  const [slides, setSlides] = useState([1]);
  const [presentationContext, setPresentationContext] = useContext(PresentationContext);
  const [dataChart, setDataChart] = useState([
    {
      answer: "A",
      total: 100
    },
    {
      answer: "B",
      total: 50
    },
    {
      answer: "C",
      total: 20
    },
    {
      answer: "D",
      total: 30
    }
  ]);
  const [optionItems, setOptionsItem] = useState([]);
  useEffect(() => {
    // CHART
    const currentSlideArr = slide[currentSlide];

    const data = currentSlideArr.options.map((item, index) => {
      return {
        answer: item,
        // total: Math.floor(Math.random() * (100 - 20)) + 20,
        total: 0
      };
    });
    setDataChart(data);

    //options answers
    const optionsItem = currentSlideArr.options.map((item, index) => {
      return {
        id: index,
        name: item
      };
    });

    setOptionsItem(optionsItem);
    // const testArr = ;
    setSlides(new Array(presentation.slideList.length).fill(1));
    //intialize arr
    // setSlides(new Array(presentation.slideList.length));
  }, [presentation, currentSlide]);

  const createNewOption = () => {
    let currentSlideList = presentation.slideList;
    let currentOptions = presentation.slideList[currentSlide].options;
    currentSlideList[currentSlide].options.push(currentOptions[currentOptions.length - 1]);
    setPresentation({ ...presentation, slideList: currentSlideList });
  };
  const removeOption = (index) => {
    let currentSlideList = presentation.slideList;
    currentSlideList[currentSlide].options.splice(index, 1);
    setPresentation({ ...presentation, slideList: currentSlideList });
  };
  const ChangeOptionValue = (index, value) => {
    let currentSlideList = presentation.slideList;
    console.log("currentSLide List", currentSlideList, currentSlide);
    currentSlideList[currentSlide].options[index] = value;
    console.log("currentSlide List after change ", currentSlideList);
    setPresentation({ ...presentation, slideList: currentSlideList });
  };
  const changeQuestionOfSlide = (value) => {
    console.log("change question of slide");
    let currentSlideList = presentation.slideList;
    currentSlideList[currentSlide].question = value;
    setPresentation({ ...presentation, slideList: currentSlideList });
  };
  const createNewSlide = () => {
    console.log("new slide");
    let currentSlideList = presentation.slideList;
    let lastElement = currentSlideList[currentSlideList.length - 1];
    lastElement = JSON.parse(JSON.stringify(lastElement));
    lastElement.id = lastElement.id += 1;
    console.log("last element ", lastElement);
    currentSlideList.push(lastElement);
    setPresentation({ ...presentation, slideList: currentSlideList });
  };
  const deleteSlide = () => {
    let currentSlideList = presentation.slideList;
    currentSlideList.splice(currentSlide, 1);
    console.log("new slide list", currentSlideList, currentSlide);
    setPresentation({ ...presentation, slideList: currentSlideList });

    if (currentSlide == currentSlideList.length) {
      console.log("change current slide", currentSlide);
      setCurrentSlide(currentSlide - 1);
    }
  };
  const itemsInTab = useMemo(
    () => [
      {
        label: "Content",
        key: "1",
        children: (
          <>
            <form method="post" action="/slide">
              <div className="item-container">
                <div className="item-question">
                  <label htmlFor="question-name" className="question-text">
                    Your question
                  </label>
                  <span className="question-icon">
                    <QuestionCircleOutlined />
                  </span>
                </div>
                <div className="item-answer">
                  <input
                    id="question-name"
                    type="text"
                    className="question-input"
                    maxLength={150}
                    placeholder="Multiple Choice"
                    value={slide[currentSlide].question}
                    // key={`question-input`}
                    onChange={(e) => changeQuestionOfSlide(e.target.value)}
                  />
                </div>
              </div>
              <div className="item-container">
                <div className="item-question">
                  <label htmlFor="answers" className="question-text">
                    Options
                  </label>
                  <span className="question-icon">
                    <QuestionCircleOutlined />
                  </span>
                </div>
                {optionItems.map((item, index) => {
                  return (
                    <div className="item-answer" key={`item-answer-${index}`}>
                      <input
                        id="answers"
                        name="answers[]"
                        type="text"
                        className="question-input option-input"
                        placeholder="Option"
                        value={item.name}
                        // key={`changeitemname-${item.name}`}
                        onChange={(e) => ChangeOptionValue(index, e.target.value)}
                      />
                      <div className="item-close" onClick={(e) => removeOption(index)}>
                        <CloseOutlined />
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="button-creator-container">
                <Button type="text" onClick={() => createNewOption()}>
                  + Add option
                </Button>
                <Button type="primary" onClick={() => savePresentation()}>
                  Save presentation
                </Button>
              </div>
            </form>
          </>
        )
      },
      {
        label: "Customize",
        key: "2",
        children: "content of Tab Pane 2"
      }
    ],
    [optionItems]
  );

  return (
    <Styled>
      <Header />
      <div className="creator-container">
        <div className="creator-header">
          <div className="header-button">
            <Button type="primary" className="new-slide-button" onClick={() => createNewSlide()}>
              + New slide
            </Button>
            <Button type="primary" danger onClick={() => deleteSlide()}>
              Delete slide
            </Button>
          </div>
        </div>
        <div className="creator-body">
          <div className="body-left-container">
            <div className="body-left-list">
              {slides.map((item, index) => {
                return (
                  <div
                    key={`slide-thumbail-${index}`}
                    className={`${
                      currentSlide === index ? "slide-current slide-thumbnail" : "slide-thumbnail"
                    }`}
                    onClick={() => setCurrentSlide(index)}
                    data-testid="slide-thumbnail-0">
                    <div className="slide-count">
                      <span>{index + 1}</span>
                    </div>
                    <div className="slide-image-container">
                      <img
                        className="slide-image"
                        src="https://images.twinkl.co.uk/tw1n/image/private/t_630/u/ux/barchart_ver_1.jpg"
                        alt="chart"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="body-center">
            <div className="center-draw">
              <BarChart width={430} height={500} data={dataChart}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="answer" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="total" fill="#8884d8" />
              </BarChart>
            </div>
          </div>
          <div className="body-right">
            <Tabs defaultActiveKey="1" items={itemsInTab} />
          </div>
        </div>
      </div>
    </Styled>
  );
};

export default Creator;
