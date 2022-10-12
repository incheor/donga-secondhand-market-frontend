import React from "react";
import { Link } from "react-router-dom"; // Link 태그
import useLocalStorage from "../useLocalStorage"; // 로컬 스토리지 상태값용 커스텀 훅
import Stack from "react-bootstrap/Stack"; // UI용 부트스트랩

const Header = () => {
    // 로컬 스토리지 상태값 객체 생성, 키는 nickName, 기본값은 빈 문자열
    // 배열의 첫번째 값은 상태값이고 두번쩨 값은 상태값 설정해줌
    const [nickName, setNickName] = useLocalStorage("nickName", "");

    return (
        <div className="header">
            <Stack gap={3} direction="horizontal">
                <Link to="/" style={{ textDecoration: "none" }}>
                    <img src="" alt="사이트 로고" style={{width:"150px", height:"70px"}} />
                </Link>
                <Link to="/secondhand_list" style={{ textDecoration: "none" }}>
                    장터로 이동
                </Link>
                <Link to="/post_list" style={{ textDecoration: "none" }}>
                    게시판으로 이동
                </Link>
                { nickName === "" && // 로그인 상태가 아닌 경우
                    <Stack gap={3} direction="horizontal">
                        <Link to="/accounts/signup" style={{ textDecoration: "none" }}>
                            회원가입
                        </Link>
                        <Link to="/accounts/login" style={{ textDecoration: "none" }}>
                            로그인
                        </Link>
                    </Stack>
                }
                { nickName !== "" && // 로그인 상태인 경우(아직 로그아웃은 구현 안 함)
                    <Stack gap={3} direction="horizontal">
                        <Link to="/accounts/profile" style={{ textDecoration: "none" }}>
                            프로필
                        </Link>
                        <Link to="/accounts/logout" style={{ textDecoration: "none" }}>
                            로그아웃
                        </Link>
                    </Stack>
                }
            </Stack>
        </div>
  );
}

export default Header;