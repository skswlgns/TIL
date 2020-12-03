# 심화문법

##### 1. 람다(익명함수)

- 우리가 마치 value처럼 다룰 수 있는 익명함수

  - 메소드의 파라미터로 넘겨줄 수 있다. 
  - return 값으로 사용할 수 있다.

- 람다의 기본정의

  - val lamdaName : Type = {argumentList -> codeBody}

  ```kotlin
  package com.example.ssafycommunity
  
  // Int 타입의 input을 넣고 Int 타입의 output을 받는다.
  val square: (Int) -> (Int) = {number -> number*number}
  
  // 타입을 두가지 동시에 사용할 경우
  // 한개를 사용할 경우에도 이러한 방식으로 사용이 가능하다.
  val nameAge = {name: String, age: Int ->
      "my name is ${name}. I'm ${age}"
  }
  
  fun main() {
      println(square(12))
      println(nameAge("지훈", 27))
  }
  ```

  ```kotlin
  // out
  144
  my name is 지훈. I'm 27
  ```

- 람다 - 확장함수

  ```kotlin
  package com.example.ssafycommunity
  
  fun main() {
      val a = "ji said"
      val b = "hoon sad"
      println(a.pizzaIsGreat())
      println(b.pizzaIsGreat())
  
      println(extendString("지훈", 27))
  }
  
  val pizzaIsGreat: String.() -> String = {
      // return 값
      this + "Pizzas is the best!"
  }
  
  fun extendString(name: String, age: Int) : String {
      // this는 확장함수를 콜하는 오브젝트를 가르키는 것이고
      // it은 하나 들어가는 파라미터일 경우에는 it으로 생략이 가능하다.
      val introduceMySelf: String.(Int) -> String = {"I am ${this} and ${it} years old"}
      return name.introduceMySelf(age)
  }
  ```

  ```kotlin
  // out
  ji saidPizzas is the best!
  hoon sadPizzas is the best!
  I am 지훈 and 27 years old
  ```

- 람다 - return

  ```kotlin
  package com.example.ssafycommunity
  
  fun main() {
      println(caculateGrade(90))
  }
  
  val caculateGrade: (Int) -> String = {
      when(it) {
          in 0..40 -> "fail"
          in 41..70 -> "pass"
          in 71..100 -> "perfect"
          else -> "제대로 된 입력값을 입력해주세요."
      }
  }
  ```

  ```kotlin
  // out
  perfect
  ```

- 람다를 표현하는 식

  ```kotlin
  package com.example.ssafycommunity
  
  fun main() {
  
      val lamda = {number: Double ->
          number == 4.312
      }
  
      println(invokeLamda(lamda))
      // 파라미터가 하나일 때 괄호를 생략하여도 된다.
      println(invokeLamda({it > 3.22}))
  }
  
  val caculateGrade: (Int) -> String = {
      when(it) {
          in 0..40 -> "fail"
          in 41..70 -> "pass"
          in 71..100 -> "perfect"
          else -> "제대로 된 입력값을 입력해주세요."
      }
  }
  
  fun invokeLamda(lamda: (Double) -> Boolean) : Boolean {
      return lamda(5.2343)
  }
  ```

##### 2. Data Class

- Class vs data class

  ```kotlin
  package com.example.ssafycommunity
  
  data class Ticket(val companyName: String, val name: String, var date: String, var seatNumber: Int)
  
  class normal(val companyName: String, val name: String, var date: String, var seatNumber: Int)
  
  // toString(), hashCode(), equals(), copy() 메서드를 데이터 클래스를 사용하면 자동으로 만들어준다.
  
  fun main() {
      val ticketA = Ticket("대한항공", "지훈", "2020-12-03",15)
      val ticketB = normal("대한항공", "지훈", "2020-12-03",15)
  
      println(ticketA)
      println(ticketB)
  }
  ```

  ```kotlin
  // out
  Ticket(companyName=대한항공, name=지훈, date=2020-12-03, seatNumber=15)
  // 함수의 주소를 알려주는 것
  com.example.ssafycommunity.normal@5cad8086
  
  // 데이터 클래스는 우리가 알기 쉽게 표현
  ```

##### 3. Companion Object

- private

  ```kotlin
  package com.example.ssafycommunity
  
  // 다른 곳에서 객체를 생성하지 못하게 프라이베이트 컨스트럭터를 사용
  // private 를 읽어 올 수 있도록 하는 것이 companion object라고 생각하면 된다.
  class Book private constructor(val id: Int, val name: String) {
      companion object {
          val myBook = "new book"
  
          fun create() = Book(0,"함께 떠나요 지구여행")
          fun create2() = Book(1, myBook)
      }
  }
  
  class Book2 private constructor(val id: Int, name: String) {
      companion object BookFactory : IdProvider {
          override fun getId() : Int {
              return 444
          }
          val myBook = "new Book"
  
          fun create() = Book2(0, myBook)
      }
  }
  
  interface IdProvider {
      fun getId() : Int
  }
  
  fun main() {
      // Companion은 생략이 가능하다.
      // val book = Book()으로는 사용이 불가능(private)
      val book = Book.Companion.create()
      val bookId = Book2.BookFactory.getId()
      println(bookId)
      println("${book.id} ${book.name}")
  }
  ```