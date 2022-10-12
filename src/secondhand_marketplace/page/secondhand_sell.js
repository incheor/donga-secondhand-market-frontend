import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // 화면 전환용 훅
import axios from "axios"; // 서버 요청, 응답을 위한 axios 훅
import Col from 'react-bootstrap/Col'; // UI용 부트스트랩
import Form from 'react-bootstrap/Form'; // UI용 부트스트랩
import FloatingLabel from "react-bootstrap/FloatingLabel"; // UI용 부트스트랩
import Row from 'react-bootstrap/Row'; // UI용 부트스트랩
import Button from 'react-bootstrap/Button'; // UI용 부트스트랩
import Image from 'react-bootstrap/Image' // UI용 부트스트랩

const Secondhand_sell = () => {
  const navigate = useNavigate(); // useNavigate 객체 생성
  const [sellinput, setSellinput] = useState({}); // 상품명, 상품설명용 상태값
  const [goodsImages, setGoodsImages] = useState([]); // 이미지 파일 업로드용 상태값
  const [previewImages, setPreviewImages] = useState([]); // 미리보기용 상태값

  const previewImagesRender = () => { // 이미지 미리보기 렌더링용 함수
    const result = [];
    for(let i = 0; i < previewImages.length; i++)  {
      result.push(
        <Image
          key={ i }
          src={ previewImages[i] }
          alt="이미지 미리보기"
          style={{ width: "100px"}}
        />
      )
    }
    return result;
  };

  const handleFormGoods = (e) => { // 폼 입력값 설정
    const { name, value } = e.target; // name, value 가져오기
  
    setSellinput((prev) => ({ // 상태값 설정
      ...prev,
      [name]: value
    }));
  };

  const handleImageFileUpload = (e) => { // 상품 이미지 업로드시 상태값 설정 함수
    const imageFiles = e.target.files; // type이 file일 경우 files라는 객체가 하위에 생성되서 그걸 받음
    const goodsImagesList = [...goodsImages]; // 전개연산자로 현재 이미지들을 가져와서 리스트에 추가
    const previewImagesList = [...previewImages]; // 전개연산자로 현재 미리보기 이미지들을 가져와서 리스트에 추가

    for(let i = 0; i < imageFiles.length; i++) { // 입력받은 이미지 파일들을 돌면서
      // 업로드용 이미지를 리스트에 추가하는 작업
      goodsImagesList.push(imageFiles[i])
      // 미리보기 이미지를 url로 처리하고 리스트에 추가하는 작업
      const imageURL = URL.createObjectURL(imageFiles[i]); // blob 객체를 url로 변경함
      previewImagesList.push(imageURL); // 미리보기 리스트에 추가함
    };
    setGoodsImages(goodsImagesList); // 이미지 파일 상태값 갱신
    setPreviewImages(previewImagesList); // 미리보기 상태값 갱신
  };

  const onSubmit = (e) => { // 판매하기 버튼 클릭시
    e.preventDefault(); // 화전 전환 막기

    const formData = new FormData(); // formData 객체를 생성함
    // 일반 데이터를 formData에 추가(JSON 형태로 파싱해서 추가)
    formData.append("data", JSON.stringify(sellinput));
    // 이미지 데이터를 formData에 추가
    for(let i = 0; i < goodsImages.length; i++) { // 이미지 상태값을 돌면서
      formData.append("images", goodsImages[i]) // 이미지를 formData에 추가함(key, value 형태)
    };

    axios({ // 서버에 요청
      method: 'post', // 메서드는 POST
      url: '', // 서버 HOST 주소
      data: formData, // 서버에 전송할 데이터
      Headers: { // 이미지 파일 업로드를 위한 헤더 설정
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => { // 응답 성공시
      navigate(-1); // 이전 페이지로 이동
    })
    .catch((error) => { // 에러 발생시
        console.log("에러:", error) // 콘솔창에 띄움
    });
  }


  return (
    <div className="secondhand_register">
      <h1>sell a goods</h1>
        <Form onSubmit={ onSubmit }>
          <Row>
            <Col xs={2}>
              <Form.Label>상품명</Form.Label>
            </Col>
            <Col xs={8}>
              <FloatingLabel
                controlId="floatingInput"
                label="팔 상품의 이름을 입력해주세요"
                className="m-3"
              >
                <Form.Control
                  type="text"
                  name="title"
                  placeholder="팔 상품의 이름을 입력해주세요"
                  onChange={ handleFormGoods }
                />
              </FloatingLabel>
            </Col>
          </Row>
          <Row>
            <Col xs={2}>
              <Form.Label>상품 설명</Form.Label>
            </Col>
            <Col xs={8}>
              <FloatingLabel
                controlId="floatingInput"
                label="팔 상품에 대해서 설명해주세요"
                className="m-3"
              >
                <Form.Control
                  as="textarea"
                  name="desc"
                  placeholder="팔 상품에 대해서 설명해주세요"
                  onChange={ handleFormGoods }
                />
              </FloatingLabel>
            </Col>
          </Row>
          <Row>
            <Form.Label>상품 이미지 업로드</Form.Label>
              <Form.Control
                type="file"
                name="file"
                accept='image/*'
                onChange={ handleImageFileUpload }
                multiple={ true }
              />
              <br/>
              <small><em>미리보기</em></small>
              { Object.keys(previewImages).length !== 0 && // 이미지 파일이 있다면 미리보기
                previewImagesRender()
              }
          </Row>
          <br/>
          <Button type="submit">판매하기</Button>

        </Form>
    </div>
  );
}

export default Secondhand_sell;