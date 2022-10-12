import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // 화면 전환용 훅
import axios from "axios"; // 서버 요청, 응답을 위한 axios 훅
import useLocalStorage from "../../useLocalStorage"; // 로컬 스토리지 상태값용 커스텀 훅
import FloatingLabel from 'react-bootstrap/FloatingLabel'; // UI용 부트스트랩
import Form from 'react-bootstrap/Form';// UI용 부트스트랩
import Row from 'react-bootstrap/Row';// UI용 부트스트랩
import Col from 'react-bootstrap/Col';// UI용 부트스트랩
import Button from "react-bootstrap/Button";// UI용 부트스트랩

const Login = () => {
  const navigate = useNavigate(); // useNavigate 객체 생성
  const [logininput, setLonininput] = useState({}); // 로그인 폼 입력값 상태값
  // 로컬 스토리지 상태값 객체 생성, 키는 nickName, 기본값은 빈 문자열
  // 배열의 첫번째 값은 상태값이고 두번쩨 값은 상태값 설정해줌
  const [nickName, setNickName] = useLocalStorage("nickName", "");

  const onChange = (e) => { // 로그인 폼 입력값 설정
    e.preventDefault(); // 화면 전환 막기
    const { name, value } = e.target; // name, value 가져오기
  
    setLonininput((prev) => ({ // 상태값 설정
      ...prev,
      [name]: value
    }));
  }

  const onSubmit = (e) => { // 로그인 버튼 클릭시
    e.preventDefault(); // 화전 전환 막기

    // 로컬 스토리지에 정보가 저장되는지 로그인 테스트용으로 나중에 제거해야 함
    setNickName("테스트용 유저");

    axios({ // 서버에 요청
      method: 'post', // 메소드는 POST
      url: '', // 서버 HOST 주소
      data: { logininput } // 서버에 전송할 데이터
    })
    .then((response) => { // 응답 성공시
      const { data: { nickname } } = response; // 응답받은 값 중 nickname만 꺼내서
      setNickName(nickname); // 로컬 스토리지에 저장(캐시 삭제하면 같이 삭제됨)
      navigate('/'); // front_page 화면으로 전환
    })
    .catch((error) => { // 에러 발생시
        console.log("에러:", error) // 콘솔창에 에러 내용 출력
    });
};

return (
  <div className="Login">
    <h1>login</h1>
    <br/>
    <Form onSubmit={ onSubmit }>
      <Row>
        <Col xs={2}>
          <Form.Label>
            동아대학교 이메일
          </Form.Label>
        </Col>
        <Col xs={8}>
          <FloatingLabel
            controlId="floatingInput"
            label="아이디"
            className="m-3"
          >
            <Form.Control type="email" onChange={ onChange } name="email" placeholder="example@dona.ac.kr" />
          </FloatingLabel>
        </Col>
      </Row>

      <Row>
        <Col xs={2}>
          <Form.Label>비밀번호</Form.Label>
        </Col>
        <Col xs={8}>
        <FloatingLabel
          controlId="floatingPassword"
          label="비밀번호를 입력해주세요"
          className="m-3"
        >
          <Form.Control type="password" onChange={ onChange } name="password" placeholder="Password" />
        </FloatingLabel>
        </Col>
      </Row>

      <Row>
        <Col>
          <Button type="submit">로그인</Button>
        </Col>
        <Col><small>비밀번호를 잊으셨나요?</small></Col>
      </Row>
    </Form>
  </div>
  );
}

export default Login;