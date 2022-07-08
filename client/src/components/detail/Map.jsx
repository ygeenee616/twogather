import React, { useEffect } from "react";
import styled from 'styled-components';

Map.defaultProps = {
  place: "스튜디오 709",
  address: "서울 서초구 강남대로65길 12",
}

export default function Map({place, address}) {

  useEffect(() => {
    console.log(place, address)

    const container = document.getElementById('map');
    const options = {
      center: new window.kakao.maps.LatLng(35.12, 129.1),
      level: 3
    };
    // 지도를 생성합니다.
    const map = new window.kakao.maps.Map(container, options);
    // 주소-좌표 변환 객체를 생성합니다.
    const geocoder = new window.kakao.maps.services.Geocoder();
    // 주소로 좌표를 검색합니다..
    geocoder.addressSearch(address, function (result, status) {

      // 정상적으로 검색이 완료됐으면 
      if (status === window.kakao.maps.services.Status.OK) {
  
        var coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
  
        // 결과값으로 받은 위치를 마커로 표시합니다
        var marker = new window.kakao.maps.Marker({
          map: map,
          position: coords
        });
  
        // 인포윈도우로 장소에 대한 설명을 표시합니다
        var infowindow = new window.kakao.maps.InfoWindow({
          content: `<div style="width:150px; text-align:center; padding:0;">${place}</div>`
        });
        infowindow.open(map, marker);
  
        // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
        map.setCenter(coords);
      }
    })
  }, []);

  return (
    <CustomMap id="map"/>
  );
}

const CustomMap = styled.div`
  width: 100%;
  height: 300px;
  border-radius: 10px;
`
