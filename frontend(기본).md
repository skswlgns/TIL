## 1. 브라우저의 동작 원리

![brouser3](TIL.assets/helloworld-59361-3.png)

[사진 출처: 네이버 D2](https://d2.naver.com/helloworld/59361)

1. HTML 마크업을 처리하고 DOM 트리를 빌드한다. (무엇을 렌더링 할지 결정)

2. CSS 마크업을 처리, CSSOM 트리를 빌드한다. (어떠한 방식으로 표현할지 결정)

   * CSSOM: CSS 객체 모델로서 CSS 선택자의 관련 속성이나 스타일을 표현

     ![img](TIL.assets/the-beginners-guide-to-css-object-model-cssom_2.jpg)

3. DOM 및 CSSOM을 결합하여 렌더링 트리를 형성 (display:none과 같은 속성들은 빠지게 된다. 화면에 표시되는 것들만 표현하여 트리를 구성)

   - 페이지에 표시되는 모든 DOM 콘텐츠와 각 노드에 대한 모든 CSSOM 스타일 정보를 표시

     ![img](TIL.assets/render-tree-construction.png)

4. 랜더링 트리에서 레이아웃을 실행, 각 노드의 기하학적 형태를 계산

5. 개별 노드를 화면에 페인트



## 2. DOM(Document Object Model)

DOM은 XML이나 HTML 문서에 접근하기 위한 일종의 인터페이스(혹은 API)이다. 이 객체 모델은 문서 내의 모든 요소를 정의, 각각의 요소에 접근하는 방법을 제공한다.

- 종류

  1) Core DOM: 모든 문서 타입을 위한 DOM 모델

  2) HTML DOM: HTML 문서를 위한 DOM 모델

  3) XML DOM: XML 문서를 위한 DOM 모델

DOM은 브라우저에서 보이는 것이 아니다.(마찬가지로 개발도구에서 보이는 것도 아니다.)

다음과 같은 계층 구조로 표현된다.

![DOM](TIL.assets/DOM.png)

DOM Element로 구성된 하나의 웹페이지는 Window를 최상위로 하는 트리를 생성하게 된다. 



## 3. CORS(Cross-Origin Resource Sharing)

1. **Origin**은 무엇일까?

   서버의 위치를 의미하는 `https://www,google.com`과 같은 URL들은 하나의 문자열 같아 보여도, 사실은 여러가지의 구성 요소로 이루어져 있다.

   ![image-20210110134522164](TIL.assets/image-20210110134522164.png)

   이때 출처는 프로토콜과 호스트, 그리고 보통의 URL에는 나타나지 않는 `:80`, `:443`과 같은 포트 번호까지 모두 합친 것을 의미한다.(서버의 위치를 찾아가기 위해 필요한 가장 기본적인 것들) 포트번호들은 보통 생략이 가능한데, 이는 HTTP, HTTPS 프로토콜의 **기본 포트 번호**가 정해져 있기 때문이다.

   그러나 만약 `https://google.com:443`과 같이 출처에 포트 번호가 명시적으로 포함되어 있다면 이 포트 번호까지 모드 일치해야 같은 출처라고 인정되는 경우가 있다.

2. **SOP(Same-Origin Policy)**

   같은 출처에서만 리소스를 공유할 수 있다라는 규칙을 가진 정책이다. 그러나 다른 출처에 있는 리소스를 가져오는 것을 무작정 막을 수 없는 환경에 몇 가지 예외 조항을 두고 이에 해당한다면 리소스 요청은 출처가 다르더라도 허용한다. 그 중 하나가 **CORS 정책을 지킨 리소스 요청**이다.

   보안을 위해 SOP 정책을 실행하고 있다.

3. `같은 출처`와 `다른 출처`

   두 URL의 구성 요소 중 `Scheme`, `Host`, `Port` 이 3가지만 동일하면 된다.

   예를 들어 이해해보자. `https://jihoon.com`과 같은 출처로 인정이 되는 것은 어떠한 것일까?

   | URL                                | 같은 출처 여부 | 이유                      |
   | ---------------------------------- | -------------- | ------------------------- |
   | `https://jihoon.com/about`         | O              | 스킴, 호스트, 포트 동일   |
   | `https://jihoon.com/about?q=실험`  | O              | 위와 동일                 |
   | `https://user:password@jihoon.com` | O              | 위와 동일                 |
   | `http://jihoon.com`                | X              | 스킴이 다름               |
   | `https://who.github.io`            | X              | 호스트가 다름             |
   | `https://jihoon.naver.com`         | X              | 호스트가 다름             |
   | `https://jihoon.com:8080`          | ?              | 브라우저 구현에 따라 다름 |

   - 서버는 CORS를 위반하더라도 정상적으로 응답을 해준다. 응답의 파기 여부는 브라우저가 결정하는 것이다. 즉, CORS는 브라우저의 구현 스펙에 포함되는 정책이기 때문에, 브라우저를 통하지 않고 서버 간 통신을 할 때는 이 정책이 적용되지 않는다.

4. **CORS는 어떻게 동작**할까?

   웹 클라이언트 어플리케이션이 다른 출처의 리소스를 요청할 때는 HTTP 프로토콜을 사용하여 요청을 보내는데, 이때 브라우저는 요청 헤더에 `Origin`이라는 필드에 요청을 보내는 출처를 함께 담아 보낸다.

   ```http
   Origin: https://jihoon.com
   ```

   이후 서버가 이 요청에 대한 응답을 할 때 응답 헤더의 `Access-Control-Allow-Origin`이라는 값에 이 리소스를 접근하는 것이 허용된 출처를 내려주고, 이후 응답을 받은 브라우저는 자신이 보냈던 요청의 `Origin`과 서버가 보내준 응답의`Access-Control-Allow-Origin`을 비교해본 후 이 응답이 유효한 응답인지 아닌지를 결정한다.

   | HTTP Header                      | 설명                          |
   | -------------------------------- | ----------------------------- |
   | Access-Control-Allow-Origin      | 접근 가능한 `url`설정         |
   | Access-Control-Allow-Credentials | 접근 가능한 `쿠키`설정        |
   | Access-Control-Allow-Headers     | 접근 가능한 `헤더`설정        |
   | Access-Control-Allow-Methods     | 접근 가능한 `http method`설정 |

5. **Preflight Request**

   프리플라이트 방식은 일반적으로 가장 많이 마주치는 시나리오이다. 이 시나리오의 브라우저는 요청을 한번에 보내지 않고 예비 요청과 본 요청으로 나누어서 서버로 전송한다. 이때 예비 요청을 `Preflight`라고 부르며, 예비 요청의 역할은 **본 요청을 보내기 전에 브라우저 스스로 이 요청을 보내는 것이 안전한지 확인**하는 것이다. Preflight 요청은 HTTP의 `OPTION` 메서드를 사용하며 `Access-Control-Request-*`형태의 헤더로 전송한다. 이는 브라우저가 강제하며 HTTP `OPTION` 메서드를 이용해 서버로부터 지원중인 메서드들을 내려 받은 뒤, 서버에서 승인 시 실제로 요청 메서드를 전송한다.

**Reference**

[CORS는 왜 이렇게 우리를 힘들게 하는걸까?](https://evan-moon.github.io/2020/05/21/about-cors/#cors%EB%8A%94-%EC%96%B4%EB%96%BB%EA%B2%8C-%EB%8F%99%EC%9E%91%ED%95%98%EB%82%98%EC%9A%94)

[Interview_Question_for_Beginner/Frontend](https://github.com/JaeYeopHan/Interview_Question_for_Beginner/tree/master/FrontEnd)



## 4. 크로스 브라우징

웹 표준에 따라 개발을 하여 서로 다른 OS 또는 플랫폼에 대응하는 것을 말한다. 즉, 브라우저의 렌더링 엔진이 다른 경우에 인터넷이 이상없이 구현되도록 하는 기술이다. 어떤 환경에서도 이상없이 작동하게 하는 것에 그 목적이 있다.



## 5. 클라이언트 사이드 렌더링 & 서버사이드 렌더링

1. 클라이언트 사이드 렌더링

   SPA 방식으로, 서버는 단지 JSON파일만 보내주는 역할을 했고, html을 그리는 역할은 클라이언트 측에서 자바스크립트가 수행하는 것이다.

   ![image-20210110163434104](TIL.assets/image-20210110163434104.png)



## 6. CSS Methodology

1. SMACSS(Scalable and Modular Architecture for CSS) - CSS를 위한 확장가능한 모듈식 아케텍처

   SMACSS의 핵심은 범주화이며, 스타일을 다섯 가지 유형을 분류하고, 각 유형에 맞는 선택자(selector)와 작명법(naming convention)을 제시한다.

   - 기초(Base)
     - element 스타일의 default값을 지정해주는 것이다. 선택자로는 요소 선택자를 사용한다.
   - 레이아웃(Layout)
     - 구성하고자 하는 페이지를 컴포넌트를 나누고 어떻게 위치해야하는지를 결정한다. id는 CSS에서 class와 성능차이가 없는데, CSS에서 사용하게 되면 재사용성이 떨어지기 때문에 class를 주로 사용한다.
   - 모듈(Module)
     - 레이아웃 요소 안에 들어가는 더 작은 부분들에 대한 스타일을 정의한다. 클래스 선택자를 주로 사용한다.
   - 상태(States)
     - 다른 스타일에 덧붙이거나 덮어씌워서 상태를 나타난대. 그렇기에 자바스크립트에 의존하는 스타일이 된다. `is-` prefix를 붙여 상태를 제어하는 스타일임을 나타낸다.
   - 테마(Theme)
     - 사용자의 설정에 따라서 css를 변경할 수 있는 css를 설정할 때 사용하게 되며 접두어로는 `theme-`를 붙여 표시한다.



## 7. normalize vs reset

1. reset.css

   reset.css는 기본적으로 제공되는 **브라우저 스타일 전부를 제거**하기 위해 사용된다.

   reset.css가 적용되면 `<h1~h6>`, `<p>`, `<span>`,  `<strong>`, `<em>` 등의 표준요소는 완전히 똑같이 보이며 브라우저가 제공하는 기본적인 styling이 없어진다.

2. normalize.css

   브라우저 간 일관된 스타일링을 목표로 한다. `<h1~h6>`과 같은 요서는 브라우저간에 일관된 방식으로 굵게 표시된다. 추가적으로 디자인에 필요한 스타일만 css로 작성해주면 된다. reset.css와는 다르게 기본값을 보존하는 것이다.



전체적인 Reference

[Interview_Question_for_Beginner/Frontend](https://github.com/JaeYeopHan/Interview_Question_for_Beginner/tree/master/FrontEnd)