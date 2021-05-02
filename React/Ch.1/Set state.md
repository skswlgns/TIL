# Set state

바뀔 수 있는 상태를 state라고 한다.

예를 들어, 특정한 이벤트의 요청이 왔을 때 값이 바뀌는 경우가 있는데 이 때 바뀐 값을 state라고 한다.

예시)

```html
<script>
    const e = React.createElement;

    class LikeButton extends React.Component {
        constructor(props) {
            super(props);
            // constructor 단에서 초기 state를 설정해준다.
            this.state = {
                liked: false;
            }
        }

        render() {
           return e("button",
                    // 클릭 이벤트 발생 시 liked state를 true로 변경
                    // 이 버튼의 type은 submit
                    {onClick: () => {this.setState({ liked: true})}, type: "submit"},
                    // liked state 값이 true이면 Liked false이면 Like를 화면에 표현
                    this.state.liked === true ? "Liked" : "Like"
                )
        }
    }
    </script>
```
