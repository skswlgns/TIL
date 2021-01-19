# Django

### 1. 모델

- 데이터의 필수적인 필드와 동작을 포함

- 일반적으로, 각각의 모델은 하나의 데이터베이스 테이블에 매핑

- 예제

  ```python
  # 각각의 모델은 파이썬의 클래스로, 하위 클래스인 django.db.models.Model에 속한다.
  from django.db import models
  
  # first_name 과 last_name은 모델의 필드들
  class Person(models.Model):
      first_name = models.CharField(max_length=30)
      last_name = models.CharField(max_length=30)
  ```

  위의 Person 모델은 아래와같이 데이터베이스 테이블을 생성

  ```sqlite
  CREATE TABLE myapp_person(
  	"id" serial NOT NULL PRIMARY KEY,
      "first_name" varchar(30) NOT NULL,
      "last_name" varchar(30) NOT NUL
  );
  ```

- **모델 이용하기**

  - 모델을 정의 후 모델을 이용할 것이라고 설정해주어야 한다.

  - `settings.py`를 수정

    ```python
    INSTALLED_APPS = [
        # ...
        # models.py를 포함하고 있는 '모듈의 이름을 추가'
        'myapp',
        # ...
    ]
    ```

  - 만약 새로운 어플리케이션을 추가하였다면, `python manage.py migrate`를 실행

  - 필요한 경우, `python manage.py makemigrations`를 통해 마이그레이션 파일을 생성

