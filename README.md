# 🟢 Morak (모드락) 

![모드락썸네일](public/imgs/%EB%AA%A8%EB%93%9C%EB%9D%BD%EC%8D%B8%EB%84%A4%EC%9D%BC.png)

# 📑 프로젝트 개요

제주도 여행 관련 정보를 공유하는 SNS 와 맛집 및 숙소 정보를 조회하고 리뷰를 남길 수 있는<br />
제주 여행 종합 플랫폼

도메인: https://modrak.vercel.app (배포: Vercel)

# 🛠 기술 스택

- Next.js, TypeScript
- 상태 관리: redux-toolkit, react-redux
- 서버 및 DB: Firebase(v9)
- UI 및 스타일: Material UI, emotion

# 🔵 주요 기능

### 1. 회원가입 및 로그인

![모드락-회원가입](public/imgs/gifs/%EB%AA%A8%EB%93%9C%EB%9D%BD-%ED%9A%8C%EC%9B%90%EA%B0%80%EC%9E%85.gif)

닉네임과 이메일 중복 체크 후 회원가입

![모드락-로그인](public/imgs/gifs/%EB%AA%A8%EB%93%9C%EB%9D%BD-%EB%A1%9C%EA%B7%B8%EC%9D%B8.gif)

로그인

### 2. 피드 CRUD 및 사진 첨부/수정/삭제

![모드락-피드작성](public/imgs/gifs/%EB%AA%A8%EB%93%9C%EB%9D%BD-%ED%94%BC%EB%93%9C%EC%9E%91%EC%84%B1.gif)

피드 작성

![모드락-피드수정](public/imgs/gifs/%EB%AA%A8%EB%93%9C%EB%9D%BD-%ED%94%BC%EB%93%9C%EC%88%98%EC%A0%95.gif)

피드 수정

![모드락-피드삭제](public/imgs/gifs/%EB%AA%A8%EB%93%9C%EB%9D%BD-%ED%94%BC%EB%93%9C%EC%82%AD%EC%A0%9C.gif)

피드 삭제

### 3. 특정 사용자 피드 및 태그 검색 기능 및 필터별 정렬 기능

![모드락-검색](public/imgs/gifs/%EB%AA%A8%EB%93%9C%EB%9D%BD-%EB%8B%89%EB%84%A4%EC%9E%84%EA%B2%80%EC%83%89.gif)

특정 사용자 닉네임 검색 또는 태그 검색

![모드락-피드필터](public/imgs/gifs/%EB%AA%A8%EB%93%9C%EB%9D%BD-%ED%95%84%ED%84%B0.gif)

피드 태그별 필터 (중첩 필터 가능)

### 4. 맛집&숙소 상세정보 조회 및 카카오맵 API를 통한 위치 조회

![모드락-상세정보](public/imgs/gifs/%EB%AA%A8%EB%93%9C%EB%9D%BD-%EC%83%81%EC%84%B8%EC%A0%95%EB%B3%B4.gif)

맛집 또는 숙소 상세정보 및 위치 조회

### 5. 맛집&숙소 리뷰 CRUD 기능

![모드락-리뷰작성](public/imgs/gifs/%EB%AA%A8%EB%93%9C%EB%9D%BD-%EB%A6%AC%EB%B7%B0%EC%9E%91%EC%84%B1.gif)

리뷰 작성

![모드락-리뷰수정](public/imgs/gifs/%EB%AA%A8%EB%93%9C%EB%9D%BD-%EB%A6%AC%EB%B7%B0%EC%88%98%EC%A0%95.gif)

리뷰 수정

![모드락-리뷰삭제](public/imgs/gifs/%EB%AA%A8%EB%93%9C%EB%9D%BD-%EB%A6%AC%EB%B7%B0%20%EC%82%AD%EC%A0%9C.gif)

리뷰 삭제

### 6. 맛집&숙소 지역별/태그별 조회

![모드락-맛집필터](public/imgs/gifs/%EB%AA%A8%EB%93%9C%EB%9D%BD-%EB%A7%9B%EC%A7%91%ED%95%84%ED%84%B0.gif)

맛집 지역/분류/태그별 필터 적용 (중첩 가능)

![모드락-숙소필터](public/imgs/gifs/%EB%AA%A8%EB%93%9C%EB%9D%BD-%EC%88%99%EC%86%8C%ED%95%84%ED%84%B0.gif)

숙소 지역/분류/태그별 필터 적용 (중첩 가능)

### 7. 숙소 날짜별 예약 및 푸시 알림 기능

![모드락-숙소예약](public/imgs/gifs/%EB%AA%A8%EB%93%9C%EB%9D%BD-%EC%88%99%EC%86%8C%EC%98%88%EC%95%BD.gif)

숙소 예약 및 푸시 알림 확인 처리

### 8. 팔로우/언팔로우 기능

![모드락-팔로우](public/imgs/gifs/%EB%AA%A8%EB%93%9C%EB%9D%BD-%ED%8C%94%EB%A1%9C%EC%9A%B0.gif)

팔로우/언팔로우 기능

### 9. 사용자의 피드 및 찜한 맛집&숙소 조회

![모드락-프로필](public/imgs/gifs/%EB%AA%A8%EB%93%9C%EB%9D%BD-%ED%94%84%EB%A1%9C%ED%95%84.gif)

자신 또는 다른 사용자 프로필 조회

# ✍️ 느낀점 및 감상

<p>
  모드락을 완성하기까지 정말 오래 걸렸다. 왜냐하면 현재의 모드락을 완성하기까지 이전의 많은 작은 프로젝트들이 있었고, 그것들의 문제점을 발견하고 더욱 확장시켜서 모드락을 완성시켰다. 아직 부족한 점이 많지만, 제대로 완성시켜냈다는 점에서 정말 애착이 가고 정이 가는 프로젝트다.
</p>
<p>
  모드락을 완성시키면서 가장 신경쓴 점은, 어떻게 하면 보다 효율적으로 데이터를 처리할 수 있을까란 의문을 해결하는 것이었다. 현재 사용자가 나 뿐이기 때문에 그럴 일은 없지만, 만약 사용자가 천만명이고, 게시글이 1억개이며, 어떤 인플루언서의 댓글이 3만개가 달렸다면 그것들을 어떻게 데이터를 효과적으로 처리할 수 있을까, 와 같은 고민들을 했다. 그리고 커스텀 훅을 만들어서 이것들을 조금씩 끊어서 가져올 수 있도록 하는데 중점을 맞췄다.
</p>
<p>
  여전히 부족한 점이 많고 예상치 못한 버그들이 속속 튀어나오고 있지만, 이 버그들을 해결하는 과정 자체에서도 몰랐던 것들을 새로 배우고 있다. 배포까지 하고서 주변 사람들에게 보여주면서 버그가 튀어나오면 부끄럽기도 하지만, 그만큼 주변 사람들이 인정해줄 때 더 큰 기쁨을 느끼고 자신감 또한 얻을 수 있었다. 앞으로도 크고 작은 프로젝트들을 하면서 지금의 모드락을 완성시킨 것처럼 끈기있게 나아가는 개발자가 되고 싶다.
</p>