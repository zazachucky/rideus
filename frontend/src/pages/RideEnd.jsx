import { Box } from "grommet";
import React, { useState } from "react";
import { StyledText } from "../components/Common";
import TotalBike from "../assets/images/totalRideBike.png";
import { Map, Polyline } from "react-kakao-maps-sdk";
import Button from "../components/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { distanceHandle, timeHandle } from "../utils/util";
import { motion } from "framer-motion";
import { container } from "./Main";
export const RideEnd = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // courseData: {
  //   latlng: mapData.latlng,
  //   topSpeed: data.topSpeed,
  //   avgSpeed: data.avgSpeed,
  //   nowTime: data.nowTime,
  //   totalDistance: data.totalDistance,
  // },

  // state: {
  //   courseName: courseName,
  //   courseType: courseType,
  //   courseData: {
  //   courseName: courseName,
  //     latlng: mapData.latlng,
  //     topSpeed: data.topSpeed,
  //     avgSpeed: data.avgSpeed,
  //     nowTime: nowTime,
  //     totalDistance: data.totalDistance,
  //   },
  // },
  const { courseType, courseData } = location.state;
  const [data, setData] = useState(courseData);
  const [mapData, setMapData] = useState({
    latlng: [],
    center: { lng: 127.002158, lat: 37.512847 },
  });
  return (
    <motion.div
      style={{
        width: "100vw",
        justify: "around",
        align: "center",
        textAlign: "center",
        background: "#64CCBE",
      }}
      initial="hidden"
      animate="visible"
      variants={container}
    >
      <Box
        style={{
          paddingTop: "20px",
          marginBottom: "20px",
          fontSize: "20px",
          color: "white",
          fontFamily: "gwtt",
        }}
      >
        {courseData.courseName}
      </Box>
      <Box
        align="center"
        justify="between"
        width="100%"
        height="90vh"
        round={{ size: "large", corner: "top" }}
        background="#ffffff"
        border={{ color: "#ffffff", size: "small", side: "top" }}
      >
        {/* ???????????? */}
        <Box
          width="80vw"
          height="40vh"
          margin={{ top: "20px", bottom: "20px" }}
        >
          <Map
            center={courseData.latlng[parseInt(courseData.latlng.length / 2)]}
            isPanto={true}
            style={{ borderRadius: "25px", width: "100%", height: "100%" }}
          >
            {courseData.latlng && (
              <Polyline
                path={[courseData.latlng]}
                strokeWeight={5} // ?????? ?????? ?????????
                strokeColor={"#030ff1"} // ?????? ???????????????
                strokeOpacity={0.7} // ?????? ???????????? ????????? 1?????? 0 ????????? ????????? 0??? ??????????????? ???????????????
                strokeStyle={"solid"} // ?????? ??????????????????
              />
            )}
          </Map>
        </Box>
        {/* ?????? ????????? ?????? */}

        {/* ?????? ?????? ????????? */}
        <Box direction="row" justify="between" width="85%">
          {/* ??? ???????????? ?????? */}
          <Box direction="row" align="center">
            {/* ????????? ????????? */}
            {/* ??? ???????????? ????????? */}
            <Box
              align="center"
              style={{ marginLeft: "10px", marginRight: "5px" }}
            >
              <StyledText
                text={distanceHandle(data.totalDistance)}
                size="40px"
                weight="bold"
                color="black"
              />
              <StyledText text="??? ????????????" size="10px" color="black" />
            </Box>
            <StyledText
              text={data.totalDistance > 1000 ? "km" : "m"}
              color="black"
            />
          </Box>
          {/* ??? ???????????? ??? */}
          {/* ?????? ????????? ?????? */}
          <Box direction="row" align="center" gap="medium">
            {/* ???????????? */}
            <Box align="center">
              <StyledText
                text={timeHandle(data.nowTime)}
                weight="bold"
                size="18px"
                color="black"
              />
              <StyledText text="?????? ??????" size="10px" color="black" />
            </Box>
            {/* ?????? ?????? */}
            <Box align="center">
              <StyledText
                text={data.avgSpeed}
                weight="bold"
                size="18px"
                color="black"
              />
              <StyledText text="?????? ??????" size="10px" color="black" />
            </Box>
            {/* ?????? ?????? */}
            <Box align="center">
              <StyledText
                text={data.topSpeed}
                weight="bold"
                size="18px"
                color="black"
              />
              <StyledText text="?????? ??????" size="10px" color="black" />
            </Box>
          </Box>
          {/* ??????????????? ??? */}
        </Box>
        {/* ?????? ????????? ?????? ??? */}
        <Box
          width="100%"
          background="white"
          align="center"
          margin={{ top: "15px" }}
          pad={{ top: "30px" }}
        >
          <Box width="80%" justify="around">
            <Box align="start">
              <StyledText text="????????? ?????? ????????????????" size="20px" />
            </Box>
            <Button
              biggreen="true"
              children={
                courseType === "my" ? "????????? ??? ????????????" : "?????? ??????"
              }
              onClick={() => {
                courseType === "my"
                  ? navigate("/registerCourse", {
                      state: { courseData: courseData },
                    })
                  : navigate("/registerReview", {
                      state: { courseData: courseData },
                    });
              }}
            />
            <Button
              whileTap={{ scale: 1.2 }}
              bigwhite="true"
              children="????????? ????????? / ????????????"
              onClick={() => {
                navigate("/");
              }}
            />
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
};
