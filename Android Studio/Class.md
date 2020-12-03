# 클래스 생성자

- 클래스 선언

  ```kotlin
  package com.example.ssafycommunity
  
  // 파일 이름과 클래스의 이름이 일치하지 않아도 된다.
  // 보통은 맞추는 것이 좋다.
  class Human {
      val name = "ji"
  
      fun eatingCake() {
          println("This is YUMMYYYYY~~~~")
      }
  }
  
  fun main() {
      // new 키워드 대신 바로 만들 수 있다.
      val human = Human()
      human.eatingCake()
  
      println("This human's name is ${human.name}")
  }
  
  ```

  ```kotlin
  // out
  This is YUMMYYYYY~~~~
  This human's name is ji
  ```

- 변수를 포함한 클래스

  ```kotlin
  package com.example.ssafycommunity
  
  // constructor를 작성한 후 뒤에 받는 인자와 타입을 작성해준다.
  class Human constructor(name: String) {
      val name = name
  }
  
  // constructor를 생략가능
  // 인자를 바로 생성할 수 있다. -> 바로 사용가능
  // default값도 생성 가능
  class Human(val name: String = "Annonymous") {
  
  }
  
  fun main() {
      val human = Human("지훈")
  
      println("This human's name is ${human.name}")
  }
  
  ```

  ```kotlin
  // out
  This human's name is 지훈
  ```

- init

  ```kotlin
  package com.example.ssafycommunity
  
  // 클래스를 실행함과 동시에 실행되는 함수
  class Human(val name: String = "Annonymous") {
      // 클래스가 생성된다면 아래를 실행한다.
      init {
          println("New human has been born!!")
      }
  }
  
  fun main() {
      val human = Human("지훈")
      val stranger = Human()
  }
  ```

  ```kotlin
  // out
  New human has been born!!
  New human has been born!!
  ```

- 주생성자와 부생성자

  ```kotlin
  package com.example.ssafycommunity
  
  class Human(val name: String = "Annonymous") {
      // 부생성자는 주 생성자의 위임을 받아야 한다.
      // 아래처럼 위임을 해주는 것이다.
      constructor(name: String, age: Int) : this(name){
          println("my name is ${name}, ${age} years old")
      }
  
      // constructor가 위에 있어도 이것부터 실행된다.
      init {
          println("born")
      }
  }
  fun main() {
      val mom = Human("지훈", 27)
  }
  ```

  ```kotlin
  // out
  New human has been born!!
  my name is 지훈, 27 years old
  ```

- 오버라이딩

  ```kotlin
  package com.example.ssafycommunity
  
  // 클래스를 상속할 수 있게 하려면 앞에 open을 사용하여야 한다.
  open class Human() {
      open fun singSong() {
          println("LaLaLa")
      }
  }
  
  // Human class를 상속하겠다. (부모 클래스에 open이 있어야 한다.)
  class Korean : Human() {
      // 오버라이딩을 하려면 위의 함수도 open을 사용해주어야 가능하다.
      override fun singSong() {
          // 부모함수를 사용하고 싶으면 여기서 super함수를 사용해주면 된다.
          super.singSong()
          println("랄랄라")
      }
  }
  
  
  fun main() {
      val korean = Korean()
      korean.singSong()
  }
  ```

  ```kotlin
  // out
  LaLaLa
  랄랄라
  ```

  