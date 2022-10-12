import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./layout/layout"
// 대문 페이지
import Front_page from "./front_page/front_page";
// 회원 페이지
import Login from "./accounts/page/login";
import Profile from "./accounts/page/profile";
import Signup from "./accounts/page/signup";
// 게시판 페이지
import Post_create from "./post/page/post_create";
import Post_list from "./post/page/post_list";
import Post_detail from "./post/page/post_detail";
// 중고장터 페이지
import Secondhand_chatandbuy from "./secondhand_marketplace/page/secondhand_chatandbuy";
import Secondhand_detail from "./secondhand_marketplace/page/secondhand_detail";
import Secondhand_list from "./secondhand_marketplace/page/secondhand_list";
import Secondhand_Sell from "./secondhand_marketplace/page/secondhand_sell";
// 잘못된 url 입력시의 page
import NotFound from "./notfound";

const Root = () => { // 해당하는 url path의 페이지를 Layout 컴포넌트에 props로 전달
  return (
    <div className="Root">
      <Layout>
        <Routes>
          {/* 대문 페이지 */}
        <Route 
              path="/" // 대문 페이지
              element={ <Front_page />}
          />
          {/* 회원 페이지 */}
          <Route 
              path="/accounts/login" // 로그인 페이지
              element={ <Login />}
          />
          <Route 
              path="/accounts/profile/:user_nickname" // 프로필 페이지
              element={ <Profile />}
          />
          <Route 
              path="/accounts/signup" // 회원가입 페이지
              element={ <Signup />}
          />
          {/* 게세물 페이지 */}
          <Route 
              path="/post_create" // 게시물 작성 페이지
              element= { <Post_create />}
          />
          <Route 
              path="/post_detail/:pk" // 게시물 보기 페이지
              element= { <Post_detail />}
          />
          <Route 
              path="/post_list" // 게시물 리스트 페이지
              element= { <Post_list />}
          />
          {/* 중고장터 page */}
          <Route 
            path="/secondhand_chatandbuy" // 채팅, 구매 페이지
            element={ <Secondhand_chatandbuy /> }
          />
          <Route 
              path="/secondhand_detail/:pk" // 물품 보기 페이지
              element={ <Secondhand_detail /> }
          />
          <Route 
            path="/secondhand_list" // 물품 리스트 페이지
            element={ <Secondhand_list /> }
          />
          <Route 
            path="/secondhand_sell" // 물품 등록 페이지
            element={ <Secondhand_Sell /> }
          />
          <Route 
              path="/*" // 매칭되는 url이 없을 경우
              element={ <NotFound /> }
          />
        </Routes>
      </Layout>
    </div>
  );
}

export default Root;