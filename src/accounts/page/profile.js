import React from "react";
import { useParams } from "react-router-dom"; // url에서 파라미터 가져오는 훅
import useLocalStorage from "../../useLocalStorage"; // 로컬 스토리지 상태값용 커스텀 훅
import Image from "react-bootstrap/Image";

const Profile = () => {
  const { user_nickname } = useParams(); // useParams 객체 생성하고 파라미터 가져옴
  // 로컬 스토리지 상태값 객체 생성, 키는 nickName, 기본값은 빈 문자열
  // 배열의 첫번째 값은 상태값이고 두번쩨 값은 상태값 설정해줌
  const [nickName, setNickName] = useLocalStorage("nickName", "");

  return (
    <div className="profile">
      <h1>{ user_nickname }'s profile</h1>
      <br/>
      <Image src="" alt="프로필 이미지" style={{ width: "300px" }}/>
    </div>
  );
}

export default Profile;