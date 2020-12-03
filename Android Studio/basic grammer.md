# 기초문법

##### 버전: 4.1.1

##### 언어: Kotiln

##### 1. 함수

- 함수(파라미터 x)

	```kotlin
  package com.example.ssafycommunity

  // 함수는 fun main()으로 시작한다.
  fun main() {
      helloword()
  }

  // 1. 함수(파라미터 x)
  // 무엇을 return하던지 상관없이 항상 fun으로 시작한다.
  // 아무것도 return하지 않는다면 함수명 뒤에 : Unit를 작성해주어야 한다.(없어도 된다.)
  fun helloword() {
      println("hello world")
  }
	```

	```kotlin
	// out: hello world
	```

- 함수2(파라미터 포함)

  ```kotlin
  package com.example.ssafycommunity
  
  fun main() {
  //    입력할때는 add(4,5)만 적어준다 --> 자동으로 a: , b: 가 생성된다.
      println(add(4, 5))
  }
  
  // 2. 파라미터 포함함수
  // 변수명을 먼저 써주고 타입을 뒤에 써준다.
  // int를 Int로 사용하여야 한다.
  // return 타입은 함수 들어가기 직전에 선언해준다.
  fun add(a: Int, b: Int): Int {
    return a+b
  }
  ```
  
    ```kotlin
  // out: 9
    ```


##### 2. val vs var

- val

  ```kotlin
  // val = value => 바뀌지 않는 것
  fun hi() {
      val a: Int = 10
      
  //  a = 100 이라고 100을 다시 선언해주려고 하면 오류가 발생한다.
  //  Int를 생략하더라도 int형태인지 안다.( String도 마찬가지)
      val c = 100
  }
  ```

- var

  ```kotlin
  // var = variable => 변할 수 있는 값
  fun hi() {
      var b: Int = 9
      b = 100
  
  //    Int를 생략하더라도 int형태인지 안다.( String도 마찬가지)
      var d = 100
      
      // 바로 할당하지 않을 때에는 타입형태를 선언해주어야 한다.
      var e: String
  }
  ```


##### 3. String

- String Template

  ```kotlin
  fun main() {
      val name = "ji"
      val last = "kim"
      // $ 뒤에 {}를 안붙여도 된다.(뛰어쓰기 구분을 위해 쓰는 것이 좋다.)
      println("my name is ${name + last} and I'm 27")
      
      // $의 escaep문은 \이다 
      println("this is 2\$a")
  }
  ```

  ```kotlin
  // out: my name is ji
  //		this is 2\$a
  ```

##### 4. 조건식

- if

  ```kotlin
  package com.example.ssafycommunity
  
  fun main() {
      println(maxBy(2, 5))
      println(maxBy2(5, 1))
  }
  
  fun maxBy(a: Int, b: Int) : Int {
      if (a > b) {
          return a
      } else {
          return b
      }
  }
  
  // 삼항 연산자가 없는 대시 아래와 같이 간편하게 표현이 가능하다.
  // 참이면 앞, false면 뒤
  fun maxBy2(a: Int, b: Int) = if(a>b) a else b
  ```

  ```kotlin
  // out: 5
  //      5
  ```

- when

  ```kotlin
  package com.example.ssafycommunity
  
  fun main() {
  	checkNum(2)
  }
  
  fun checkNum(score: Int) {
      // when은 다른 문법의 switch문이라고 생각하면 된다!
      when(score) {
          // score가 0이면
          0 -> println("this is 0")
          // score가 1이면
          1 -> println("this is 1")
          // score가 2또는 3이면
          2,3 -> println("this is 2 or 3")
          // 위의 어느 경우도 아니면 (else는 생략이 가능하다.)
          else -> println("I don't know")
      }
      
      // 아래와 같이 return을 포함하여 사용할 수도 있는데 
      // 이와 같은 경우는 else를 반드시 포함하여야 한다.
      var b: Unit = when(score) {
          // 1이면 1을 return
          1 -> 1
          2 -> 2
          else -> 3
      }
      
      // 구가 조건으로도 사용할 수 있다.  
      when(score) {
          // 90 ~ 100 사이라면
          in 90..100 -> println("You are genius")
          // 10 ~ 80 사이라면
          in 10.. 80 -> println("not bad")
          // 나머지(마찬가지로 여기서는 생략이 가능하다.)
          else -> println("OK")
      }
  }
  
  // 코틀린의 모든 함수는 expression이다.(return 값이 존재(Unit이라도 반환하기 때문에))
  // 자바에서는 if문을 statement로 밖에 사용할 수 없었다면 코틀린에서는 expression으로도 사용할 수 있다.
  
  // expression -> 무언가 반환해서 값을 대입해준다라고 이해를 하면 된다.(위의 var b와 같이)
  ```

  ```kotlin
  // out: this is 2 or 3
  //      2
  //      OK
  ```

##### 5. Array and List

- Array

  ```kotlin
  package com.example.ssafycommunity
  
  fun main() {
      array()
  }
  
  fun array() {
      // array 초기화(array는 기본적으로 Mutable(읽기와 쓰기가 모두 가능한)이다.)
      val array = arrayOf(1,2,3)
      
      // 여러 타입이 동시에 존재할 수 있다.
      val array2 = arrayOf(1, "d", 3.4f)
      
      // array의 0번째 값을 3으로 바꾸겠다.
      array[0] = 3
      
      println(array[0])
  }
  ```

  ```kotlin
  // out: 3
  ```

- List(수정이 불가능한 읽기전용)

  ```kotlin
  package com.example.ssafycommunity
  
  fun main() {
      list()
  }
  
  fun list() {
      // List 초기화
      val list = listOf(1,2,3)
      
      // 리스트도 마찬가지로 여러타입이 동시에 존재할 수 있다.
      val list2 = listOf(1, "d", 11L)
      
      // list[0] = 2 바꾸는 것이 불가능
      var result: Int = list.get(0)    // 가지고 오는 것은 가능
      
      println(list)
  }
  ```

  ```kotlin
  // out: [1, 2, 3]
  ```

- MutableList(수정이 가능한)

  ```kotlin
  package com.example.ssafycommunity
  
  fun main() {
      MutableList()
  }
  
  fun MutableList() {
      // MutableList 생성  
      val arrayList = arrayListOf<Int>()
      // 리스트에 10을 추가(값을 추가하는 것은 주소값이 변경되는 것이 아니기 때문에 val을 사용해도 된다.)
      arrayList.add(10)
      // 리스트에 20을 추가
      arrayList.add(20)
  }
  ```

  ```kotlin
  // out: [10, 20]
  ```

##### 6. For / While

- For

  ```kotlin
  package com.example.ssafycommunity
  
  fun main() {
      for()
  }
  
  fun for() {
      val students = arrayListOf("지훈", "도희", "재경", "동국", "봉조")
  
      for (name in students) {
          println("my name is ${name}")
      }
      
      // withIndex()를 활용함으로서 인덱스를 함께 사용할 수 있다.
      // index가 앞에 온다는 점을 잘 기억하자.
      for ((index, name) in students.withIndex()) {
          println("${index+1}번째 학생: ${name}")
      }
  
      var sum: Int = 0
  
      // 1부터 10까지 더한 값을 구하기
      for (i in 1..10) {
          sum += i
      }
      println(sum)
      
      var sum2: Int = 0
      // 1부터 10까지 2칸씩 뛰어가면서
      // 1 3 5 7 9 를 더하여라
      for (i in 1..10 step 2) {
          sum2 += i
      }
      println(sum2)
      
      // for (i in 10 downTo 1) // 10부터 1까지 떨어지면서
      // for (i in until 100) 1 부터 99까지 (100을 포함 x -> 1..100과 다른점)
  }
  ```

  ```kotlin
  // out
  my name is 지훈
  my name is 도희
  my name is 재경
  my name is 동국
  my name is 봉조
  1번째 학생: 지훈
  2번째 학생: 도희
  3번째 학생: 재경
  4번째 학생: 동국
  5번째 학생: 봉조
  55
  25
  ```

- While

  ```kotlin
  package com.example.ssafycommunity
  
  fun main() {
      for()
  }
  
  fun while() {
      var index = 0
      while(index < 10) {
          println("Current index: ${index}")
          index++
      }
  }
  
  ```

  ```kotlin
  // out
  Current index: 0
  Current index: 1
  Current index: 2
  Current index: 3
  Current index: 4
  Current index: 5
  Current index: 6
  Current index: 7
  Current index: 8
  Current index: 9
  
  ```

##### 7. Nullable/ NonNull

- Nullable/ NonNull

  ```kotlin
  fun nullcheck() {
      // NPE: NULL pointer Exception
  
      // NULL 값이면 안되는 타입
      var name = "ji"
  
      // ?를 사용하게 된다면 NULL값을 사용할 수 있다. (nullable타입이 된다.)
      // nullable타입을 사용하려면 타입 생략이 불가능하다.
      var nullName : String? = null
  
      // name은 nonNull타입이기에 바로 사용할 수 있다.
      var nemeInUpperCase = name.toUpperCase()
  
      // nullable은 다음과 같이 사용하여야 한다(null인지 체크하는 것이다.).
      // null이 아니면 toUpperCase를 실행을 하고 만약 null 이면 전체가 null을 반환한다.
      // default값을 준 것이다.
      var nullNameInUpperCase = nullName?.toUpperCase()
      
      val email: String? = "jh8039@naver.com"
      // email이 null이 아니면 실행을 해라
      // 실행을 하게 되면 email을 참조할 수 있음.
      email?.let{
          println("my email is ${email}")
      }
  }
  ```

- !!

  ```kotlin
  fun ignoreNulls(str: String?) {
      // 절대로 str이 null일리가 없으니까 String을 str로 선언을 해
      // 확실하지 않은 이상 지양하자.
      val mNotNull: String = str!!
  
      // 위에서 null이 아니라고 선언했기에 바로 사용이 가능하다.
      val upper = mNotNull.toUpperCase()
  }
  ```

  