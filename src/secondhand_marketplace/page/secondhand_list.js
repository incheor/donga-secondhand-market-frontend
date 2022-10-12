import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Link 태그
import axios from "axios"; // 서버 요청, 응답을 위한 axios 훅
import Card from "react-bootstrap/Card"; // UI용 부트스트랩
import Row from "react-bootstrap/Row"; // UI용 부트스트랩
import Col from "react-bootstrap/Col"; // UI용 부트스트랩
import Form from 'react-bootstrap/Form'; // UI용 부트스트랩
import Button from "react-bootstrap/Button"; // UI용 부트스트랩
import FloatingLabel from 'react-bootstrap/FloatingLabel'; // UI용 부트스트랩
import Accordion from "react-bootstrap/Accordion"; // UI용 부트스트랩
import Stack from "react-bootstrap/Stack"; // UI용 부트스트랩

const Secondhand_list = () => {
  const [goodsList, setGoodsList] = useState({}); // 상품 리스트용 상태값
  const [option, setOption] = useState({}); // 검색 옵션용 상태값
  const [cardColor, setCardColor] = useState("Light"); // 상품 판매 여부에 따른 카드 색 상태값

  const course_rendering = () => { // 상품 리스트 렌더링 함수 구현
    const result = []; // 
    for(let i = 0; i < goodsList.length; i++)  {
      const {
          goods_pk, // 상품 pk
          goods_owner, // 상품 등록 유저
          goods_name, // 상품 이름
          goods_registration_date, // 상품 등록 날짜
          goods_image, // 상품 이미지
          goods_price, // 상품 가격
          goods_on_sale // 판매 여부
        } = goodsList[i];
        if(goods_on_sale === "Y") setCardColor("Secondary") // 판매 완료시 카드 색을 회색으로 변경
        result.push(
            <Card key={ goods_pk } bg={ cardColor } >
                <Row>
                    <Col md={5}>
                        <Card.Img variant="top" src={ goods_image } alt="이미지가 없어요" />
                    </Col>
                    <Col className="mt-2 mb-2" md={5}>
                      <Card.Text>{ goods_owner }</Card.Text>
                    </Col>
                    <Col className="mt-2 mb-2" md={5}>
                      <Card.Text>{ goods_name }</Card.Text>
                    </Col>
                    <Col className="mt-2 mb-2" md={5}>
                      <Card.Text>{ goods_registration_date }</Card.Text>
                    </Col>
                    <Col className="mt-2 mb-2" md={5}>
                      <Card.Text>{ goods_price }원</Card.Text>
                    </Col>
                </Row>
            </Card>
        )
    }
    return result;
  };

  const onChange = (e) => { // 검색 욥션 갱신하는 함수
    e.preventDefault();
    const { name, value } = e.target;

    setOption((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  useEffect(() => { // 마운트시에만(처음) 데이터 불러오기
    axios({ // 서버에 요청
      method: 'get', // 메서드는 GET
      url: '', // 서버 HOST 주소
    })
    .then((response) => { // 응답 성공시
        const { data } = response; // 응답에서 data 추출
        setGoodsList(data); // 상품 리스트 데이터 설정
    })
    .catch((error) => { // 에러 발생시
        console.log("에러:", error) // 콘솔에 출력
    })
  }, []);

  const onSubmit = (e) => { // 검색 옵션을 추가하고 검색 버튼 클릭시
    e.preventDefault(); // 화전 전환 막기

    axios({ // 서버에 요청
      method: "get", // 메서드는 GET
      url: "", // 서버 HOST 주소
      params: { option } // 서버에 전송할 데이터
    })
    .then((response) => { // 응답 성공시
      const { data } = response; // 응답에서 data 추출
      setGoodsList(data); // 상품 리스트 데이터 설정
    })
    .catch((error) => { // 에러 발생시
      console.log(error); // 콘솔에 출력
    })
  }

  return (
    <Stack className="secondhand_list" gap={3}>
      <Row>
        <Col>
          <h1>list of goods</h1>
        </Col>
        <Col>
          <Link to="/secondhand_sell" style={{ textDecoration: "none" }}>
            <Button variant="outline-primary">
              상품 팔아보기
            </Button>
          </Link>
        </Col>
      </Row>

      <Accordion defaultActiveKey="0" style={{ textAlign: "center" }}>
        <Accordion.Item eventKey="1">
          <Accordion.Header>검색 조건을 추가해보세요!</Accordion.Header>
          <Accordion.Body>
            <Form onSubmit={ onSubmit }>
              <Row>
                <Col>
                  <Form.Label>
                    상품명 검색
                  </Form.Label>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="상품명을 입력해주세요"
                    className="m-3"
                  >
                    <Form.Control type="text" onChange={ onChange } name="goods_name" placeholder="상품명을 입력해주세요" />
                  </FloatingLabel>
                </Col>
                <Col>
                  <Form.Label>
                    닉네임 검색
                  </Form.Label>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="상품을 등록한 유저의 닉네임을 입력해주세요"
                    className="m-3"
                  >
                    <Form.Control type="text" onChange={ onChange } name="goods_owner" placeholder="상품을 등록한 유저의 닉네임을 입력해주세요" />
                  </FloatingLabel>
                </Col>
                <Col>
                  <Form.Label>
                    가격 검색
                  </Form.Label>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="상품의 가격을 입력해주세요"
                    className="m-3"
                  >
                    <Form.Control type="text" onChange={ onChange } name="goods_price" placeholder="상품의 가격을 입력해주세요" />
                  </FloatingLabel>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Button type="submit">
                    검색
                  </Button>
                </Col>
              </Row>
            </Form>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <br/>
      { Object.keys(goodsList).length !== 0 && // 상품이 있을 경우 경우
        course_rendering() // 상품 리스트 렌더링
      }
      { Object.keys(goodsList).length === 0 && // 상품이 없을 경우
        <Card style={{ justifyContent: "center", alignItems: "center", textAlign: "center" }}>
          검색된 상품이 없어요<br/>조건을 변경해서 검색해보세요
        </Card>
      }
    </Stack>
  );
}

export default Secondhand_list;