import { Layout, Divider, Modal } from "antd";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MenuItem as MenuBarItem, MenuBar, MenuList, StyledButton } from "../style";
import { ArrowLeftOutlined, PlayCircleOutlined, ShareAltOutlined } from "@ant-design/icons";
import Creator from "../../Creator";
import { useEffect, useContext } from "react";
import PresentationContext from "../../../utils/PresentationContext";
import { GetOnePresentation, savePresentationAPI } from "../api/Presentation.Api";
import { toggleStatusPresentation } from "../API";
import { toast } from "react-toastify";
import Styled from "./style";
const { Header, Footer, Sider, Content } = Layout;

export const EditPresentation = () => {
  const { presentationId } = useParams();
  const [modal, contextHolder] = Modal.useModal();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [presentationContext, setPresentationContext] = useContext(PresentationContext);
  const navigate = useNavigate();
  useEffect(() => {
    document.title = presentationContext.name;
    toggleStatusPresentation(presentationId, 1)
      .then((values) => {
        // Gỉa sử delete thành công

        toast.success(values.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          theme: "light"
        });
      })
      .catch((err) => {
        const values = err.response.data;
        toast.error(values, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          theme: "light"
        });
      });
    const getDataForPresentation = async () => {
      const value = await GetOnePresentation(presentationId);
      console.log("getDataForPresentation value ", value);
      const arrPresentation = value.data.data;
      let newPresentation = {
        slideList: [],
        id: "",
        name: ""
      };
      newPresentation.id = arrPresentation._id;
      newPresentation.name = arrPresentation.name;

      for (let i = 0; i < arrPresentation.slides.length; i++) {
        const listOptions = arrPresentation.slides[i].options;
        let newListOptions = listOptions.map((item, index) => {
          return item.content;
        });
        newPresentation["slideList"].push({
          id: arrPresentation.slides[i].index,
          type: arrPresentation.slides[i].slide_type,
          question: arrPresentation.slides[i].question,
          options: newListOptions,
          heading: arrPresentation.slides[i].heading,
          subHeading: arrPresentation.slides[i].sub_heading,
          paragraph: arrPresentation.slides[i].paragraph
        });
      }
      console.log("newPresentation ", newPresentation);
      setPresentationContext(newPresentation);
    };
    getDataForPresentation();
    return () => {
      console.log("destroy editPresentation");
      toggleStatusPresentation(presentationId, 0)
        .then((values) => {
          // Gỉa sử delete thành công

          toast.success(values.message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            theme: "light"
          });
        })
        .catch((err) => {
          const values = err.response.data;
          toast.error(values, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            theme: "light"
          });
        });
    };
  }, []);
  const savePresentation = async () => {
    const request = {
      presentationId: presentationId,
      slides: presentationContext.slideList
    };
    console.log("request savePresentation ", request);
    const savePresentationResponse = await savePresentationAPI(request);
    if (savePresentationResponse && savePresentationResponse.status == 200) {
      // Gỉa sử delete thành công
      modal.info({
        title: "Notifications",
        content: (
          <>
            <p>{`Save presentations successfully.`}</p>
          </>
        )
      });
    } else {
      modal.error({
        title: "Notifications",
        content: (
          <>
            <p>{`Save presentations failed.`}</p>
          </>
        )
      });
    }
  };
  const presentPresentation = () => {
    console.log("presentationId ", presentationId);
    const request = {
      presentationId: presentationId,
      slides: presentationContext.slideList
    };
    toggleStatusPresentation(presentationId, 0)
      .then((values) => {
        // Gỉa sử delete thành công

        toast.success(values.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          theme: "light"
        });
        navigate(`/presentations/${presentationId}/show`);
      })
      .catch((err) => {
        const values = err.response.data;
        toast.error(values, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          theme: "light"
        });
        navigate(`/presentations`);
      });
  };

  return (
    <>
      <Layout>
        <Header style={{ backgroundColor: "white", padding: "0" }}>
          <EditHeader
            presentation={presentationContext}
            savePresentation={savePresentation}
            presentPresentation={presentPresentation}
          />
        </Header>
        <Divider type="horizontal" className="m-0" />
        <Layout>
          <Creator
            currentSlide={currentSlide}
            setCurrentSlide={setCurrentSlide}
            savePresentation={savePresentation}
          />
          {contextHolder}
        </Layout>
      </Layout>
    </>
  );
};

const EditHeader = (props) => {
  const { savePresentation, presentation, presentPresentation } = props;
  const { id, name, createdBy } = presentation;
  let { presentationId } = useParams();
  const navigate = useNavigate();
  const goBackToList = () => {
    navigate("/presentations");
  };
  return (
    <Styled>
      <MenuBar id="menubar-horizontal" bg="light" className="d-flex justify-content-between">
        <div className="me-auto header-left">
          <div onClick={() => goBackToList()}>
            <ArrowLeftOutlined style={{ fontSize: "2.4rem" }} />
          </div>
          <div>
            <span style={{ fontSize: "1.4rem", fontWeight: "bold" }}>{name}</span>
          </div>
        </div>
        <MenuList className="d-flex align-items-center justify-content-evenly">
          {/* <MenuBarItem to="/share">
            <StyledButton variant="secondary">
              <ShareAltOutlined style={{ fontSize: "2rem" }} />
              <span style={{ marginLeft: "1rem" }}>Share</span>
            </StyledButton>
          </MenuBarItem> */}
          <div onClick={() => presentPresentation()}>
            <StyledButton>
              <PlayCircleOutlined style={{ fontSize: "2rem" }} />
              <span style={{ marginLeft: "1rem" }}>Present</span>
            </StyledButton>
          </div>
        </MenuList>
      </MenuBar>
    </Styled>
  );
};
