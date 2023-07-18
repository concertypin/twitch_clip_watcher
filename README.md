# 아 실수로 클립 링크 지웠다;
를 어지간히도 많이 경험해서(물론 제 실수긴 했습니다만), 디스코드로 알림을 쏘는 프로그램을 만들었습니다.
Docker Compose로 작동합니다. 빵떡이의 `!클립` 명령어와 연계됩니다.

## 실행
example.env 파일을 참고하여 .env 파일일 구성 후 docker-compose.yml의 VERSION 지정 후 실행합니다.

### CLIPPER_DATA
CLIPPER_DATA는 두 가지 사용법이 있습니다.
- http:// 또는 https://로 시작하는 경우
    - CLIPPER_DATA 링크에 쓰여 있는 텍스트를 받아 실행합니다.
- 그렇지 않은 경우
    - CLIPPER_DATA를 UTF-8 base64 인코딩된 값으로 간주해 디코딩 후 실행합니다.
예시 내용은 sample.json에 있습니다.
- username : 유저 *닉네임*입니다.
- priority : 이 유저는 웹훅 전송 시 실패 시 3번까지 재시도하며, Blocking하게 요청합니다.
- webhook : 디스코드의 웹훅 URL입니다.