import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // 화면 전환용 훅
import axios from "axios";  // 서버 요청, 응답을 위한 axios 훅
import FloatingLabel from 'react-bootstrap/FloatingLabel'; // UI용 부트스트랩
import Form from 'react-bootstrap/Form'; // UI용 부트스트랩
import Row from 'react-bootstrap/Row'; // UI용 부트스트랩
import Col from 'react-bootstrap/Col'; // UI용 부트스트랩
import Button from "react-bootstrap/Button"; // UI용 부트스트랩
import Alert from 'react-bootstrap/Alert'; // UI용 부트스트랩

const Signup = () => {
  const navigate = useNavigate(); // useNavigate 객체 생성
  const [signupinput, setSignupinput] = useState({}); // 회원가입 입력값 상태값
  const [formdisabled, setFormdisabled] = useState(false); // 폼 비활성화 상태값
  const [welcomeAlert, setWelcomeAlert] = useState(false); // 환영 메시지 상태값

  const showWelcomeAlert = ({ signupinput }) => { // 환영 메시지
    const welcomeNickname = signupinput.nickname; // 회원가입 입력값에서 닉네임만 가져옴
    return ( // 환영 메시지를 띄움
      <Alert variant="success">
        <Alert.Heading>{welcomeNickname}님, 환영합니다!</Alert.Heading>
        <Button onClick={() => navigate('/accounts/login')} variant="outline-success">로그인 페이지로 가기</Button>
      </Alert>
    );
  };

  const onChange = (e) => { // 회원가입 폼 입력값 설정
    const { name, value } = e.target; // name, value 가져오기
  
    setSignupinput((prev) => ({ // 상태값 설정
      ...prev,
      [name]: value
    }));
  }

  const onSubmit = (e) => { // 회원가입 버튼 클릭시
    e.preventDefault(); // 화전 전환 막기
    
    axios({ // 서버에 요청
      method: 'post', // 메서드는 POST
      url: '', // 서버 HOST 주소
      data: { signupinput } // 서버에 전송할 데이터
    })
    .then((response) => { // 응답 성공시
      setFormdisabled(true); // 폼 비활성화해서 입력을 막음
      setWelcomeAlert(true); // 환영 메시지를 띄움
    })
    .catch((error) => { // 에서 발생시
        console.log("에러:", error) // 콘솔창에 에러 내용 출력
    });
};

  return (
    <div className="signup">
      <h1>signup</h1>
      <br/>
      { welcomeAlert && // 환영 메시지(기본값은 비활성화)
        showWelcomeAlert({ signupinput })
      }
      <Form onSubmit={ onSubmit }>
        <Row>
          <Col xs={2}>
            <Form.Label>
              동아대학교 이메일<br/><small>(로그인시 아이디로 이용됩니다)</small>
            </Form.Label>
          </Col>
          <Col xs={8}>
            <FloatingLabel
              controlId="floatingInput"
              label="동아대학교 이메일을 입력해주세요(예시: example@donga.ac.kr)"
              className="m-3"
            >
              <Form.Control
                type="email"
                onChange={ onChange }
                name="email"
                placeholder="example@donga.ac.kr"
                disabled={formdisabled}
              />
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
            <Form.Control
              type="password"
              onChange={ onChange }
              name="password"
              placeholder="Password"
              disabled={formdisabled}
            />
          </FloatingLabel>
          </Col>
        </Row>

        <Row>
          <Col xs={2}>
            <Form.Label>비밀번호 확인</Form.Label>
          </Col>
          <Col xs={8}>
          <FloatingLabel
            controlId="floatingPassword"
            label="비밀번호를 한 번 더 입력해주세요"
            className="m-3"
          >
            <Form.Control
              type="password"
              onChange={ onChange }
              name="password2"
              placeholder="Password"
              disabled={formdisabled}
            />
          </FloatingLabel>
          </Col>
        </Row>

        <Row>
          <Col xs={2}>
            <Form.Label>닉네임</Form.Label>
          </Col>
          <Col xs={8}>
            <FloatingLabel
              controlId="floatingInput"
              label="다른 유저들에게 보여질 닉네임을 입력해주세요"
              className="m-3"
            >
              <Form.Control
                type="text"
                onChange={ onChange }
                name="nickname"
                placeholder="example@dona.ac.kr"
                disabled={formdisabled}
              />
            </FloatingLabel>
          </Col>
        </Row>

        <Button type="submit">회원가입</Button>

      </Form>
    </div>
  );
}

export default Signup;