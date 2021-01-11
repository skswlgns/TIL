## 1. JavaScript란?

자바스크립트는 내용이 갱신되는 기능(추가로 변화하는 그래픽, 동영상, 지도 등)을 웹 페이지에 적용할 수 있게 하는 스크립트 혹은 프로그래밍언어이다. 자바스크립트는 표준 웹 기술이라는 레이어 케이크에서 세번째 층이라고 볼 수 있다.

![img](TIL.assets/cake.png)

- `HTML`은 제공할 웹 컨텐츠의 구조와 의미를 문단, 제목, 표, 이미지, 동영상 등으로 정의하고 부여하는 **마크업 언어**이다.
- `CSS`는 배경색, 폰트 등의 레이아웃 등을 지정하여 HTML 컨텐츠를 **꾸며주는 스타일 규칙 언어**이다.
- `JavaScript`는 **동적**으로 컨텐츠를 빠구고, 움직이는 이미지를 그리는 등의 일을 할 수 있는 스크립트 언어이다.
- `JavaScript`를 해석하는 `JavaScript Engine`과 웹 브라우저에 화면을 그리는 `Rendering Engine`은 다른 것이다. `JavaScript Engine`은 Javascript로 작성한 코드를 해석하고 실행하는 **인터프리터**이다.

#### 1) Call Stack

자바스크립트는 단 하나의 호출 스택(call stack)을 사용한다. 하나의 함수가 실행되면 이 함수의 실행이 끝날 떄까지 다른 어떠한 일도 수행할 수 없다. 요청이 들어올 때마다 해당 요청을 순차적으로 호출 스택에 담아 처리한다. 메소드가 실행될 때, Call Stack에 새로운 프레임이 생기고 push되고 메소드의 실행이 끝나면 해당 프레임은 pop되는 원리이다.



#### 2) Heap

동적으로 생성된 객체(인스턴스)는 힙(heap)에 할당된다. 대부분 구조화되지 않는 '더미'같은 메모리 영역을 `heap`이라 표현한다.



#### 3) Task Queue(Event Queue)

자바스크립트의 런타임 환경에서 처리해야 하는 Task들을 임시 저장하는 대기 큐이다. Call Stack이 비어졌을 때 먼저 대기열에 들어온 순서대로 수행된다.

자바스크립트에서는 이벤트에 의해 실행되는 함수들은 비동기로 실행되는데 이는 Call Stack에 쌓이지 않고 Task Queue에 enqueue된다. **Call Stack이 비어있는 경우**에 **queue에서 작업을 꺼내서 Call Stack**에 넣는다. (microtask -> task queue순으로 확인한다.)

```javascript
function test1() {
    console.log("test1");
    test2();
}

function test2() {
    let timer = setTimeout(function() {
        console.log("test2");
    }, 0);
    test3();
}

function test3() {
    console.log("test3");
}

test1();
```

- 처음으로는 "test1"이 console에 찍힌다.
- 그 후, test2()가 호출되면서 **setTimeout 함수가 실행되고 콜스택**에 들어간 다음, 바로 빠져 나온다. 그리고 **내부에 익명 함수는 콜스택에 들어가서 바로 실행되지 않는다**. 이 익명 함수는 call stack이 아닌 event queue 영역으로 들어간다.
- 세 번째로, test3 함수가 콜스택으로 들어간다. "test3"가  console에 찍힌다.
- 작업을 모두 마친 test3가 call stack에서 pop된다. test2, test1 함수도 이어서 pop된다.
- call stack이 비게 되어 queue의 head에서 하나의 event를 가져와 call stack으로 넣는다. 이 이벤트가 setTimeout 함수 내부에 있던 익명함수이다.
- **이벤트에 걸려있는 익명함수는 먼저 실행될 수 없다**.



#### Reference

[JavaScript가 뭔가요?](https://developer.mozilla.org/ko/docs/Learn/JavaScript/First_steps/What_is_JavaScript)

[자바스크립트 비동기](http://sculove.github.io/blog/2018/01/18/javascriptflow/)

[자바스크립트 이벤트 루프에 대해서](https://asfirstalways.tistory.com/362)



## 2. Hoisting(호이스팅)

*ES6 문법이 표준화 되면서 크게 신경쓰지 않아도 되지만, JS라는 언어의 특성을 잘 보여준다.*

함수 안에 있는 선언들을 모두 끌어올려서 해당 함수 유효 범위의 최상단에 선언하는 것이다. 자바스크립트 함수는 실행되기 전에 함수 안에 필요한 변수 값들을 모두 모아서 **유효 범위의 최상단에 선언**한다.

- 유효 범위: 함수 블록 `{}` 안

함수 내에서 아래쪽에 존재하는 내용 중 필요한 값들을 끌어올리는 것으로 실제로 코드가 끌어올려지는 것은 아니며, 자바스크립트 Parser 내부적으로 끌어올려서 처리하는 것이다. 그렇기에, 실제 메모리에는 변화가 없다.



#### 1) 호이스팅의 대상

**var 변수 선언**과 **함수 선언문**에서만 호이스팅이 일어난다.

- var 변수/함수의 선언만 위로 끌어 올려지며, 할당은 끌어올려지지 않는다.
- let/const 변수 선언과 함수 표현식에서는 호이스팅이 발생하지 않는다.

**선언과 할당**

앞서 말했듯이, 선언은 위로 끌어 올려지는 것이고 할당은 끌어올려지지 않는다. 다음과 같은 예시를 통해 알아보자.

**- 변수**

```javascript
function getX() {
    console.log(x); // out: undefined
    var x = 100;
    console.log(x); // out: 100
}
getX();
```

자바스크립트의 경우에는 변수 x를 선언하지 않고 출력하려 해도 오류가 발생하지 않는다. `var x = 100;` 이 구문에서 `var x`를 호이스트하기 때문이다. 그래서 위의 변수 x에는 할당이 되지 않는 undefined가 출력이 되는 것이다.

선언문은 항시 자바스크립트 엔진 구동 시 가장 최우선으로 호이스팅 되고, **할당 구문은 런타임 과정**에서 이루어지기 때문에 호이스팅 되지 않는다.

**- 함수**

함수 선언문 형태로 정의한 함수의 유효 범위는 저체 코드의 맨 처음부터 시작한다. 함수 선언이 함수 실행 부분보다 뒤에 있더라도 자바스크립트 엔진이 함수 선언을 끌어올린다. 여기서도 마찬가지로 함수 호이스팅은 함수를 끌어올리지만 변수의 값은 끌어올리지 않는다.

```javascript
// case 1

foo();
function foo() {
    console.log('hello');
};

// out: hello

// case2
foo2();
var foo2 = function() {
    console.log('hello');
};

//out: Uncaught TypeError: foo2 is not a function
```



#### 2) 변수와 함수 호이스팅의 우선 순위

- 같은 이름의 var 변수 선언과 함수 선언에서의 호이스팅

  ```javascript
  var myName = "jihoon";
  
  function myName() {
      console.log("Kim");
  }
  
  function yourName() {
      console.log("you!");
  }
  
  var yourName = "nice";
  
  console.log(typeof myName);
  console.log(typeof yourName);
  
  // out
  // string
  // string
  ```

  var 변수 선언이 우선 순위를 갖는다.



#### 3) 호이스팅 사용 시 주의

- 코드의 가독성과 유지보수를 위해 호이스팅이 일어나지 않도록 주의한다.
  - 함수와 변수를 가급적 코드 상단부에 선언한다면, 호이스팅으로 인한 스코프 꼬임 현상을 방지 할 수 있다.
  - let/const를 사용한다.



#### Reference

[[JavaScript] 호이스팅(Hoisting)이란](https://gmlwjd9405.github.io/2019/04/22/javascript-hoisting.html)

[Interview_Question_for_Beginner/JavaScript](https://github.com/JaeYeopHan/Interview_Question_for_Beginner/blob/master/JavaScript/README.md)



## 3. Closure

#### 1) 어휘적 범위 지정(Lexical scoping)

```javascript
function init() {
	var name = "jihoon"
    function displayName() {
        alert(name);
    }
    displayName()
}
init();

```

`init()`은 지역 변수 'name'과 'displayName()'을 생성한다. diplayName()은 init()안에 정의된 내부 함수이며 init() 함수 본문에서만 사용할 수 있다. displayName()은 부모 함수 init()에서 선언된 변수 name에 접근할 수 있다. 만약, displayName()가 자신만의 name 변수를 가지고 있었다면, name 대신 this.name을 사용했을 것이다.

이는 어휘적 범위 지정의 한 예로서 여기서 `lexical`이란 어휘적 범위 지정 과정에서 변수가 어디에서 사용가능한지 알기 위해 그 변수가 소스코드 내 어디에서 선언되었는지 고려한다는 것을 의미한다.



#### 2) 클로저(Closure)

생성되는 조건

- 내부 함수가 익명 함수로 되어 외부 함수의 반환값으로 사용된다.
- 내부 함수는 외부 함수의 실행 환경에서 실행된다.
- 내부 함수에서 사용되는 변수 x는 외부 함수의 변수 스코프에 있다.

```javascript
var name = "front"
function outer() {
    var name = "jihoon";
    function display() {
        console.log(name);
    }
    return display;
}

var myFunc = outer();
closure();

// out
// jihoon
```

위의 코드에서 **myFunc**를 클로저라고 한다. console에는 jihoon이 찍힌다. outer함수의 context에 속해 있는 변수를 참조한 것이다. 여기서 outer함수의 지역변수로 존재하는 name변수를 free variable(자유변수)라고 한다.



이처럼 외부 함수 호출이 종료되더라도 외부 함수의 지역 변수 및 변수 스코프 객체의 체인관계를 유지할 수 있는 구조를 클로저라고 한다. 보다 정확히는 **외부 함수에 의해 반환되는 내부 함수**를 가리키는 말이다.



#### Reference

[클로저 - JavaScript | MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Closures)

[Interview_Question_for_Beginner/JavaScript](https://github.com/JaeYeopHan/Interview_Question_for_Beginner/blob/master/JavaScript/README.md)



## 4. this

JavaScript에서 this는 거의 모든 상황에서 객체이며 문법적으로는 '나'와는 단어와 비슷하다. this의 값은 this를 사용하는 **해당 함수를 어떻게 실행하느냐에 따라 값(의미)이 바뀐다.**

#### 1) 일반 함수 실행 방식

```javascript
function foo() {
    console.log(this.name); // this === global object(브라우저상에선 window객체)
}

foo();

```

```javascript
var age = 100;

function foo () {
  var age = 99;
  bar(age);
}

function bar (age) {
  console.log(this.age); // 100
}

foo();
```

일반 함수 실행 방식으로 실행하게 된다면 this는 `window`가 된다.



#### 2) Dot Notation - 점 방식

```javascript
function foo () {
  console.log(this.age);
}
var age = 100;
var ken = {
  age: 36,
  foo: foo
};
var wan = {
  age: 32,
  foo: foo
};
ken.foo(); // 36
wan.foo(); // 32

```

그냥 foo(); 라고 실행시키면 100이 출력이 되지만 dot notation 방식으로 실행을 하게 되면 this가 가리키는 값이 . 앞의 객체로 바뀌게 된다.

