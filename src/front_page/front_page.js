import React from "react";
import { Link } from "react-router-dom"; // Link 태그
import useLocalStorage from "../useLocalStorage"; // 로컬 스토리지 상태값용 커스텀 훅
// import "./front_page.css"
import Stack from 'react-bootstrap/Stack'; // UI용 부트스트랩
import Card from 'react-bootstrap/Card'; // UI용 부트스트랩
import Carousel from 'react-bootstrap/Carousel'; // UI용 부트스트랩
import Row from "react-bootstrap/Row"; // UI용 부트스트랩
import Col from "react-bootstrap/Col"; // UI용 부트스트랩

const Front_page = () => {
    // 로컬 스토리지 상태값 객체 생성, 키는 nickName, 기본값은 빈 문자열
    // 배열의 첫번째 값은 상태값이고 두번쩨 값은 상태값 설정해줌
    const [nickName, setNickName] = useLocalStorage("nickName", "");

    return (
        <div className="front_page">
            <Row className="row1">
                <Carousel fade className="carousel">
                    <Carousel.Item>
                        <img src={ "/images/샘플 이미지1.jpg" } alt="샘플 이미지"  className="images"/>
                        <Carousel.Caption>샘플 이미지입니다</Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={ "/images/샘플 이미지2.jpg" } alt="샘플 이미지" className="images"/>
                        <Carousel.Caption>샘플 이미지입니다</Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={ "/images/샘플 이미지3.jpg" } alt="샘플 이미지" className="images"/>
                        <Carousel.Caption>샘플 이미지입니다</Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </Row>
            <Row className="row2">
                <Col className="welcome">동아대 중고거래 플랫폼<br/><strong>Deal-A</strong>에 오신 것을 환영합니다!</Col>
                <Col className="col_card">
                    { nickName === "" && // 로그인 상태가 아닌 경우
                        <Stack gap={3} className="col_stack">
                            <Card className="card">
                                <div>
                                    <p style={{ color:"gray" }}>아직 회원이 아니신가요?</p>
                                    <Link to="/accounts/signup" style={{ textDecoration: "none" }}>
                                        회원가입
                                    </Link>
                                </div>
                                <br/>
                                <hr/>
                                <br/>
                                <div>
                                    <p style={{ color:"gray" }}>회원이시라면 로그인하세요</p>
                                    <Link to="/accounts/login" style={{ textDecoration: "none" }}>
                                        로그인
                                    </Link>
                                </div>
                            </Card>
                        </Stack>
                    }
                    { nickName !== "" && // 로그인 상태인 경우
                        <h3>{ nickName }님, 반갑습니다</h3>
                    }
                </Col>
            </Row>
        </div>
    );    
}

export default Front_page;